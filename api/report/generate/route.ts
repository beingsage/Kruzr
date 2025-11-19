import { NextRequest, NextResponse } from 'next/server'

// Mock evidence database - in production, connect to real vector DB
const MOCK_EVIDENCE_DB: Record<string, any> = {
  'DB-109': {
    id: 'DB-109',
    title: 'Raised Crossings near Schools — Case Study',
    summary: 'Raised zebra crossings + school zone signalling reduced child pedestrian injuries by 44% in similar AADT contexts.',
    evidence_strength: 'High',
    cost_class: 'Medium',
  },
  'DB-234': {
    id: 'DB-234',
    title: 'LED Street Lighting Retrofit',
    summary: 'Targeted LED lighting at crossings cut nighttime crashes by ~30% where illumination was previously inadequate.',
    evidence_strength: 'High',
    cost_class: 'Medium',
  },
  'DB-541': {
    id: 'DB-541',
    title: 'Automated Speed Enforcement in School Zones',
    summary: 'Camera-enforced 30 km/h school zones showed 25–50% reductions in speeding-related crashes in trials.',
    evidence_strength: 'Medium',
    cost_class: 'High',
  },
  'DB-877': {
    id: 'DB-877',
    title: 'Median Refuge & Pedestrian Islands',
    summary: 'Pedestrian islands reduced severe pedestrian outcomes on multi-lane roads by 35% in case studies.',
    evidence_strength: 'Medium',
    cost_class: 'Medium',
  },
  'DB-999': {
    id: 'DB-999',
    title: 'Complete Street Redesign (Sidewalks + Reallocation)',
    summary: 'Comprehensive redesign (continuous sidewalks, cycle lane, curb extensions) produced long-term safety gains but requires major capital.',
    evidence_strength: 'Medium',
    cost_class: 'High',
  },
}

async function generateReportWithGPT(inputData: any, retrievalSummaries: string) {
  // In production, call actual GPT-4 via AI SDK
  // For now, return structured mock report following the spec exactly

  const mockReport = `SH-12 (km 23.4) — Safety Intervention Report

Maple Town — Date: 2025-11-20
Prepared by: Mixture-of-Experts Panel (Engineering • Enforcement • Education • Policy)
One-line impact metric: ${inputData.crash_count} crashes (${inputData.period}) — ${inputData.fatalities} fatal, ${inputData.serious_injuries} serious injuries; high pedestrian exposure near school.

1 Executive summary

Problem: Repeated pedestrian strikes near ${inputData.location} where no formal crossing or sidewalks exist; night-time visibility and speeding are contributing factors. (Input summary; DB evidence: DB-109, DB-234).

Top 3 recommended packages (ranked):

School-Zone Protection Package (Top) — Raised crossing + LED lighting + temporary 30 km/h enforcement + school outreach. Expected: ≈40–55% reduction in pedestrian injuries. Confidence: High. (DB-109, DB-234, DB-541)

Medium-term Road Safety Upgrade — Pedestrian refuge islands + continuous sidewalk + curb extensions + speed management. Expected: 30–45% reduction in severe outcomes. Confidence: Medium. (DB-877, DB-999)

Long-term Complete Street Redesign — Reallocation of carriageway, separated cycle lane, permanent traffic calming. Expected long-term transformational safety but requires major capital. Confidence: Medium. (DB-999)

Recommended immediate action: implement School-Zone Protection Package as a prioritized 0–3 month intervention while planning medium-term upgrades.

2 Situation & data snapshot

Location: ${inputData.location}
Road type: ${inputData.road_type}
Posted speed: ${inputData.posted_speed} km/h
Operating speed (est.): ${inputData.operating_speed_est} km/h
AADT: ${inputData.aadt.toLocaleString()}
Crash count (${inputData.period}): ${inputData.crash_count} (${inputData.fatalities} fatal; ${inputData.serious_injuries} serious; ${inputData.minor_injuries} minor)
Affected users: ${inputData.user_groups.join(', ')}
Key factors: ${inputData.factors.join(', ')}
Existing measures: ${inputData.existing_countermeasures.join(', ')}
Budget: Medium
Data available: Crash CSV, site photos
Supporting DB refs: DB-109, DB-234, DB-541, DB-877, DB-999

3 Analysis — root causes (evidence-linked)

Absence of protected crossing & sidewalks → pedestrians cross in mixed traffic, high exposure near school. (DB-109 shows similar context with 44% reduction when raised crossings used).

Poor night-time visibility → collisions concentrated after dusk; LED retrofit evidence supports crash reduction. (DB-234).

Speeding above posted limit → operating speed ~${inputData.operating_speed_est} km/h; overtaking and lane encroachments increase pedestrian exposure (DB-541 supports enforcement effect).

Road cross-section not forgiving for pedestrians → multi-lane crossing distance increases exposure; refuge islands can halve severe outcomes (DB-877).

Risk scoring (0–1; higher = greater risk): pedestrian exposure 0.95; speed environment 0.85; lighting 0.70; infrastructure gap (sidewalks) 0.90.

4 Recommended intervention packages (mixture-of-experts)

Package 1 — School-Zone Protection Package (Priority — Immediate)

Components

Engineering: Raised zebra crossing immediately at school entrance; temporary curb ramps for accessibility. (DB-109)

Lighting: Targeted LED streetlight upgrade focused on crossing and approaches. (DB-234)

Enforcement: Temporary mobile automated speed enforcement during school hours (target 30 km/h). (DB-541)

Education: School outreach program and crossing guards during term start/end times.

Why matched

Matches high pedestrian exposure and absence of crossing; DB-109 shows rapid injury reduction where raised crossings paired with school measures used. Lighting addresses night-time factor (DB-234). Enforcement mitigates higher operating speeds (DB-541).

Required data to confirm

Hourly pedestrian counts (AM/PM), observed crossing locations, speed profile by hour.

Cost class & timeline

Medium cost; timeline Immediate (0–3 months for crossing + lighting retrofits; enforcement can be deployed within days).

Confidence

High (multiple supporting DBs; limited capital; high expected near-term impact).

What would change this recommendation

If pedestrian volumes are negligible outside school hours, prioritize targeted enforcement and lighting only.

Package 2 — Medium-term Road Safety Upgrade

Components

Engineering: Install continuous sidewalks on both sides; curb extensions at crossing; two-stage pedestrian refuges for multi-lane crossing (DB-877).

Traffic-calming: Raised tables at minor crosswalks and tightening lane widths.

Policy: Formal school zone signage and permanent 30 km/h speed limit during school hours.

Why matched

Addresses infrastructure gap to reduce exposure and crossing distance. Evidence indicates refuge islands reduce severity (DB-877).

Required data

Cross-section dimensions, drainage/utility conflicts, ROW availability.

Cost & timeline

Medium cost; timeline Short (3–12 months).

Confidence

Medium

What would change this recommendation

If utility relocation costs exceed budget, consider phased sidewalk delivery with temporary pedestrian routing.

Package 3 — Long-term Complete Street Redesign

Components

Engineering: Reallocate road space for continuous sidewalks, protected cycle lane, narrower vehicle lanes, permanent medians.

Enforcement & Policy: Convert to design speed 40 km/h, redesign signals if needed.

Why matched

Long-term removal of root causes; effective where urban growth and sustained safety investment planned (DB-999).

Cost & timeline

High cost; timeline Medium-Long (12–36 months).

Confidence

Medium

What would change this recommendation

If regional planner commits to corridor upgrades or funding becomes available — prioritize.

5 Implementation plan — phased checklist

Immediate (0–3 months)

Deploy temporary raised crossing (contract local contractor). Responsible: Municipal Works.
Install targeted LED luminaires at crossing approaches. Responsible: Utilities & Works.
Deploy mobile automated speed enforcement during school sessions. Responsible: Traffic Police.
School outreach & volunteer crossing guards. Responsible: School + NGO.

Short (3–12 months)

Design and construct permanent raised crossing and curb extensions.
Install pedestrian refuge islands where cross-section allows.
Establish formal school zone speed limit (regulatory action).

Medium (12–36 months)

Construct continuous sidewalks.
Evaluate need for lane reallocation or permanent median.
Plan for full corridor "complete street" if funding permits.

Permits, stakeholder consultations, utility coordination and procurement to start in parallel with immediate works.

6 Monitoring & Evaluation (M&E)

KPIs:

Crash count (all severity) at site — baseline 6 (24 months); target: ≤3 in next 24 months (50% reduction).
Pedestrian injury count — baseline 3 serious+fatal; target: 0–1.
85th percentile speed during school hours — baseline 58 km/h; target: ≤40 km/h.
Pedestrian compliance at crossing (observed %) — baseline TBD; target: ≥70%.

Data collection & cadence:

Baseline: week-long pedestrian counts, automated speed monitoring for one week pre-works.
Post-intervention: monthly checks for first 6 months; quarterly afterwards.
Success thresholds and adaptive triggers defined in monitoring plan.

7 Tailored one-page summaries

For General Public (plain language):

${inputData.location} area has seen repeated collisions — including one fatal. We recommend an immediate raised crossing at the school entrance, better streetlights, and speed enforcement during school hours. These changes are low-disruption and expected to make crossing safer within weeks. Please avoid jaywalking, use designated crosswalk, and report hazards to the municipal helpline.

For Practitioners / Action Takers:

Immediate deliverables: temporary raised platform, LED lighting at crossing, mobile ASE during school hours, school outreach program. Field checklist: verify crosswalk sightlines (30 m), confirm drainage for raised platform, coordinate with utilities. Use DB-109 & DB-234 case methods for design details. Proceed with procurement under emergency works clause.

For Researchers / Academics:

Data gaps: hourly pedestrian flows, origin-destination of school trips, fine-grained speed distributions by hour. Suggested evaluation: controlled before-after with comparison site; metrics: pedestrian injury incidence, 85th percentile speeds, vehicle yielding rates. Consider mixed-methods study combining video counts with surveys.

For Ministry / Policy Makers:

Budget ask: medium (immediate package) with clear ROI: predicted 30–50% reduction in pedestrian injuries per DB evidence. Regulatory ask: enable temporary mobile ASE and formal school zone speed regulation. Recommend funding conditional on M&E plan and 24-month milestone.

For Investigation / Detailed Study:

Appendix contains crash CSV and photos. Investigators should correlate crash times with light levels and surveillance. Forensic request: collect witness statements for each collision and check camera records (if any). Data sub-sets to be used for any legal proceedings are preserved in the project folder.

8 Appendices

A — Data table (summary)

Period: ${inputData.period}

Crashes: ${inputData.crash_count} — [Full details in supporting CSV]

Time band: 4 crashes after dusk (17:30–20:00).

Pedestrian peak times align with school drop-off/pick-up.

B — DB references (used)

DB-109 — Raised Crossings near Schools — case evidence (High).
DB-234 — LED Street Lighting Retrofit — case evidence (High).
DB-541 — Automated Speed Enforcement in School Zones — evidence (Med).
DB-877 — Pedestrian Refuge & Islands — evidence (Med).
DB-999 — Complete Street Redesign — evidence (Med).

C — Quick cost & resource note (order of magnitude)

Temporary raised crossing + lighting: Medium (~local municipal capex).
Mobile enforcement: Low recurring operational cost (police resources / contractor).
Sidewalks & islands: Medium; dependent on ROW and drainage.
Full redesign: High — requires capital program.

Closing recommendations (one-liner)

Implement the School-Zone Protection Package immediately (0–3 months), start the medium-term sidewalk and refuge design concurrently, and plan the complete street redesign only if corridor funding and land-acquisition constraints are resolved. Prioritize collecting pedestrian counts and high-resolution speed data before and after intervention to validate impact.`

  return {
    id: `RPT-${Date.now()}`,
    location: inputData.location,
    road_type: inputData.road_type,
    posted_speed: inputData.posted_speed,
    operating_speed_est: inputData.operating_speed_est,
    aadt: inputData.aadt,
    period: inputData.period,
    crash_count: inputData.crash_count,
    fatalities: inputData.fatalities,
    serious_injuries: inputData.serious_injuries,
    minor_injuries: inputData.minor_injuries,
    user_groups: inputData.user_groups,
    factors: inputData.factors,
    existing_countermeasures: inputData.existing_countermeasures,
    content: mockReport,
    generated_at: new Date(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const inputData = await request.json()
    console.log('[v0] Report generation request:', inputData)

    // Simulate retrieval from evidence database
    const retrievedEvidence = Object.values(MOCK_EVIDENCE_DB)
      .map((ev: any) => `{id:"${ev.id}", title:"${ev.title}", summary:"${ev.summary}", evidence_strength: "${ev.evidence_strength}", cost_class:"${ev.cost_class}"}`)
      .join('\n')

    // Generate report using mock GPT
    const report = await generateReportWithGPT(inputData, retrievedEvidence)

    return NextResponse.json(report)
  } catch (error) {
    console.error('[v0] Report generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}
