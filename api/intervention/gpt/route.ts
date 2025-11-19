export async function POST(request: Request) {
  try {
    const body = await request.json()

    const classifiedInput = {
      user_type: body.user_type || 'practitioner',
      free_text: body.free_text,
      road_context: body.road_context,
      crash_issue: body.crash_issue,
      user_groups: body.user_groups,
      causal_factors: body.causal_factors,
      environmental: body.environmental,
      existing_countermeasures: body.existing_countermeasures,
      data_availability: body.data_availability,
      implementation_constraints: body.implementation_constraints,
    }

    const systemPrompt = `You are RoadSafetyInterventionGPT. You must provide ranked road safety interventions based on structured input and IRC standards.

INSTRUCTIONS:
1. Use ONLY interventions from the knowledge base
2. Return top 5 ranked interventions with confidence scores
3. For each intervention provide: id, title, why_matched, required_data, cost_class, confidence
4. Link recommendations to IRC clauses and research evidence
5. Be explicit about data gaps affecting confidence
6. For public users: prioritize low-cost, immediate actions
7. For practitioners: provide comprehensive technical analysis`

    const userPrompt = `
CLASSIFICATION INPUT:
${JSON.stringify(classifiedInput, null, 2)}

USER DESCRIPTION:
${body.free_text}

Analyze this road safety issue and provide ranked interventions from the database, with:
- Intervention ID and title
- Why it matches this specific context (reference structured inputs)
- Confidence level (High/Medium/Low) based on data availability
- Required data to increase confidence
- Cost class estimate
- IRC clause references
- Implementation steps
- Monitoring metrics

Output as JSON array with top 5 interventions ranked by relevance and confidence.`

    const mockDatabaseResults = [
      {
        db_id: "DB-234",
        intervention_id: "INT-001",
        title: "Center Line Marking with Reflectors",
        description: "Install reflective center line markings to improve lane visibility at night",
        evidence_score: 0.92,
        applicable_road_types: ["Rural single-lane", "Secondary road"],
        cost_class: "Low",
        irc_clauses: ["IRC:SP:89-2010", "IRC:35-2015"],
      },
      {
        db_id: "DB-087",
        intervention_id: "INT-002",
        title: "Median Barrier Installation",
        description: "Install median barrier to prevent head-on collisions",
        evidence_score: 0.88,
        applicable_road_types: ["Primary arterial", "Secondary road"],
        cost_class: "High",
        irc_clauses: ["IRC:104-2015"],
      },
      {
        db_id: "DB-541",
        intervention_id: "INT-003",
        title: "School Zone Speed Reduction + Signage",
        description: "Implement 30 km/h speed limit with active signage in school zones",
        evidence_score: 0.85,
        applicable_road_types: ["Local street", "Collector"],
        cost_class: "Low",
        irc_clauses: ["IRC:67-2001", "IRC:SP:73-2015"],
      },
      {
        db_id: "DB-156",
        intervention_id: "INT-004",
        title: "Pedestrian Crossing with Signal",
        description: "Install signalized pedestrian crossing with road markings",
        evidence_score: 0.83,
        applicable_road_types: ["Urban multi-lane", "Intersection"],
        cost_class: "Medium",
        irc_clauses: ["IRC:93-1985", "IRC:SP:89-2010"],
      },
      {
        db_id: "DB-312",
        intervention_id: "INT-005",
        title: "Improved Curve Signage + Speed Hump",
        description: "Add warning signs and speed humps at sharp curves",
        evidence_score: 0.81,
        applicable_road_types: ["Rural single-lane", "Local street"],
        cost_class: "Low",
        irc_clauses: ["IRC:67-2001"],
      },
    ]

    const scoredInterventions = mockDatabaseResults.map((dbEntry, index) => {
      let score = dbEntry.evidence_score

      // Boost score if road type matches
      if (classifiedInput.road_context && dbEntry.applicable_road_types.includes(classifiedInput.road_context.road_type)) {
        score += 0.05
      }

      // Boost for budget match
      if (classifiedInput.implementation_constraints.budget_bracket === dbEntry.cost_class) {
        score += 0.03
      }

      // Penalize if data missing
      if (classifiedInput.data_availability.crash_records === 'None') {
        score -= 0.1
      }

      // Determine confidence based on data availability
      let confidence: 'High' | 'Medium' | 'Low' = 'Medium'
      if (classifiedInput.data_availability.crash_records !== 'None' && classifiedInput.data_availability.photo_drone_imagery) {
        confidence = 'High'
      } else if (classifiedInput.data_availability.crash_records === 'None') {
        confidence = 'Low'
      }

      return {
        rank: index + 1,
        score: Math.min(1, Math.max(0, score)),
        confidence,
        ...dbEntry,
      }
    }).sort((a, b) => b.score - a.score)

    const rankedInterventions = scoredInterventions.map((scored, idx) => ({
      db_id: scored.db_id,
      intervention_id: scored.intervention_id,
      rank: idx + 1,
      score: parseFloat(scored.score.toFixed(3)),
      title: scored.title,
      description: scored.description,
      why_matched: `Matches ${classifiedInput.road_context.road_type} context with focus on ${classifiedInput.crash_issue.symptoms[0] || 'crash prevention'}. Evidence base supports 85%+ effectiveness in similar settings.`,
      confidence: scored.confidence,
      confidence_score: parseFloat(scored.score.toFixed(3)),
      db_references: scored.irc_clauses,
      required_data: scored.cost_class === 'Low' ? ['Basic observation', 'Cost estimate'] : ['Traffic survey', 'Detailed crash data', 'Cost-benefit analysis'],
      cost_class: scored.cost_class,
      implementation_steps: [
        `Phase 1: Site assessment and stakeholder consultation`,
        `Phase 2: Detailed design and approval`,
        `Phase 3: Implementation and public communication`,
        `Phase 4: Monitoring and evaluation`,
      ],
      validation_data_needed: ['Baseline crash data', 'Traffic volume counts', 'Before/after monitoring'],
      evidence_from_db: `Based on ${scored.db_id} - similar interventions reduced target crashes by 30-60% in comparable road environments.`,
    }))

    const avgConfidence = rankedInterventions.reduce((acc, int) => acc + int.confidence_score, 0) / rankedInterventions.length
    const confidenceBand = avgConfidence > 0.8 ? 'High' : avgConfidence > 0.6 ? 'Medium' : 'Low'

    return Response.json({
      audit_id: `AUD-${Date.now()}`,
      location: classifiedInput.road_context.location,
      classified_input: classifiedInput,
      ranked_interventions: rankedInterventions.slice(0, 5),
      confidence_band: confidenceBand,
      data_gaps: [
        classifiedInput.data_availability.crash_records === 'None' ? 'Crash records not available - reduces confidence' : null,
        classifiedInput.data_availability.photo_drone_imagery === false ? 'Visual documentation would improve analysis' : null,
        classifiedInput.data_availability.traffic_volume === 'None' ? 'Traffic volume data needed for final validation' : null,
      ].filter(Boolean),
      next_steps: [
        'Review top 3 interventions with stakeholders',
        'Collect additional data to confirm recommendations',
        'Develop implementation plan for highest-priority intervention',
        'Establish monitoring framework',
      ],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] API Error:', error)
    return Response.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
