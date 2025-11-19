'use client'

import { RecommendationOutput, RankedIntervention } from '@/lib/types'

interface InterventionResultsSectionProps {
  result: RecommendationOutput
}

export function InterventionResultsSection({
  result,
}: InterventionResultsSectionProps) {
  const exportToPDF = () => {
    const reportContent = `
KRUZR ROAD SAFETY INTERVENTION REPORT
====================================

Location: ${result.location}
Report ID: ${result.audit_id}
Generated: ${new Date(result.timestamp).toLocaleDateString()}

CLASSIFICATION SUMMARY
${JSON.stringify(result.classified_input, null, 2)}

RANKED INTERVENTIONS (Top ${result.ranked_interventions.length})
${result.ranked_interventions.map((int, idx) => `
${idx + 1}. ${int.title} (Confidence: ${int.confidence})
   Score: ${int.score}
   Cost Class: ${int.cost_class}
   Why Matched: ${int.why_matched}
   IRC References: ${int.db_references.join(', ')}
   Required Data: ${int.required_data.join(', ')}
`).join('\n')}

OVERALL CONFIDENCE: ${result.confidence_band}

DATA GAPS:
${result.data_gaps.join('\n')}

NEXT STEPS:
${result.next_steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}
`
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kruzr-report-${result.audit_id}.txt`
    a.click()
  }

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kruzr-report-${result.audit_id}.json`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-2">Recommendations Summary</h2>
        <p className="text-muted-foreground mb-4">
          Found <span className="font-semibold text-accent">{result.ranked_interventions.length}</span> recommended interventions
        </p>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium text-foreground">{result.location}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Overall Confidence</p>
            <p className="font-medium text-foreground flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${result.confidence_band === 'High' ? 'bg-green-500' : result.confidence_band === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
              {result.confidence_band}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Report ID</p>
            <p className="font-medium text-foreground text-xs">{result.audit_id}</p>
          </div>
        </div>
      </div>

      {/* Ranked Interventions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Ranked Interventions</h3>
        <div className="space-y-3">
          {result.ranked_interventions.map((intervention, idx) => (
            <InterventionResultCard key={intervention.intervention_id} intervention={intervention} rank={idx + 1} />
          ))}
        </div>
      </div>

      {/* Data Gaps */}
      {result.data_gaps.length > 0 && (
        <div className="p-4 rounded-lg border border-border/50 bg-card/50">
          <h4 className="text-sm font-semibold text-foreground mb-2">Data Gaps</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {result.data_gaps.map((gap, idx) => (
              <li key={idx}>• {gap}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Export Buttons */}
      <div className="flex gap-2">
        <button
          onClick={exportToPDF}
          className="flex-1 px-4 py-2 rounded border border-border bg-card hover:bg-card/80 text-foreground transition-colors text-sm font-medium"
        >
          Export Report
        </button>
        <button
          onClick={exportToJSON}
          className="flex-1 px-4 py-2 rounded border border-border bg-card hover:bg-card/80 text-foreground transition-colors text-sm font-medium"
        >
          Export JSON
        </button>
      </div>
    </div>
  )
}

function InterventionResultCard({ intervention, rank }: { intervention: RankedIntervention; rank: number }) {
  const [expanded, setExpanded] = useState(false)
  const [v0_showDetails, setShowDetails] = useState(false)

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-1 rounded">#{rank}</span>
            <h4 className="text-base font-semibold text-foreground">{intervention.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{intervention.description}</p>

          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Score:</span>
              <span className="text-sm font-semibold text-foreground">{(intervention.score * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${intervention.confidence === 'High' ? 'bg-green-500' : intervention.confidence === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
              <span className="text-xs text-muted-foreground">Confidence: {intervention.confidence}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Cost:</span>
              <span className="text-sm font-medium text-foreground">{intervention.cost_class}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 italic">{intervention.why_matched}</p>

          {expanded && (
            <div className="mt-3 p-3 rounded bg-background/50 space-y-2 border border-border/30">
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">IRC References</p>
                <div className="flex flex-wrap gap-1">
                  {intervention.db_references.map((ref, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded bg-border/50 text-muted-foreground">{ref}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Implementation Steps</p>
                <ol className="text-xs text-muted-foreground space-y-1 ml-3">
                  {intervention.implementation_steps.map((step, idx) => (
                    <li key={idx} className="list-decimal">{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Required Data</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {intervention.required_data.map((data, idx) => (
                    <li key={idx}>• {data}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs text-accent hover:text-accent/80 font-medium"
      >
        {expanded ? '▼ Hide Details' : '▶ Show Details'}
      </button>
    </div>
  )
}

import { useState } from 'react'
