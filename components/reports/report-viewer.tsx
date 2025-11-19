'use client'

import { RoadSafetyReport } from '@/lib/types'
import { InterventionCard } from '@/components/shared/intervention-card'
import { useState } from 'react'

interface ReportViewerProps {
  report: RoadSafetyReport
}

export function ReportViewer({ report }: ReportViewerProps) {
  const [message, setMessage] = useState('')

  const exportPDF = () => {
    setMessage('Generating PDF...')
    setTimeout(() => {
      // Create mock PDF download
      const content = `ROAD SAFETY AUDIT REPORT\n\nReport ID: ${report.id}\nAudit ID: ${report.audit_id}\n\nSummary:\n${report.summary}`
      const blob = new Blob([content], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report-${report.id}.pdf`
      link.click()
      setMessage('PDF downloaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  const exportJSON = () => {
    setMessage('Exporting JSON...')
    setTimeout(() => {
      const dataStr = JSON.stringify(report, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report-${report.id}.json`
      link.click()
      setMessage('JSON exported successfully!')
      setTimeout(() => setMessage(''), 3000)
    }, 500)
  }

  const totalCost = report.cost_estimates.reduce((sum, est) => sum + est.total_estimated_cost, 0)

  return (
    <div className="space-y-8">
      {message && (
        <div className="p-4 rounded-lg bg-accent/20 text-accent border border-accent/30">
          {message}
        </div>
      )}

      {/* Report Header */}
      <div className="p-6 rounded-lg border border-border bg-card">
        <h1 className="text-2xl font-bold text-foreground mb-2">Road Safety Audit Report</h1>
        <p className="text-muted-foreground mb-4">{report.summary}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Report ID</p>
            <p className="font-semibold text-foreground">{report.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Audit ID</p>
            <p className="font-semibold text-foreground">{report.audit_id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Generated</p>
            <p className="font-semibold text-foreground">{report.generated_at.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Cost</p>
            <p className="font-semibold text-accent">₹{totalCost.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Interventions Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Recommended Interventions</h2>
        <div className="space-y-4">
          {report.interventions.map((intervention) => (
            <InterventionCard key={intervention.intervention_id} intervention={intervention} />
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      {report.cost_estimates.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Cost Estimates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">Total Material Cost</p>
              <p className="text-2xl font-bold text-accent">
                ₹{report.cost_estimates[0]?.total_material_cost.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">Labor Cost</p>
              <p className="text-2xl font-bold text-accent">
                ₹{report.cost_estimates[0]?.total_labor_cost?.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/20 border border-primary/30">
              <p className="text-sm text-muted-foreground">Total Estimate</p>
              <p className="text-2xl font-bold text-primary-foreground">
                ₹{report.cost_estimates[0]?.total_estimated_cost.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Standards Cited */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Standards Referenced</h2>
        <div className="space-y-3">
          {report.clauses_cited.map((clause) => (
            <div key={clause.id} className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground">{clause.standard} {clause.section}</h3>
                <code className="text-xs bg-input px-2 py-1 rounded text-muted-foreground">{clause.id}</code>
              </div>
              <p className="text-sm text-muted-foreground italic">"{clause.excerpt}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={exportPDF}
          className="flex-1 px-4 py-3 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          Export as PDF
        </button>
        <button
          onClick={exportJSON}
          className="flex-1 px-4 py-3 rounded border border-border bg-card hover:bg-card/80 text-foreground transition-colors"
        >
          Export as JSON
        </button>
      </div>
    </div>
  )
}
