'use client'

import { RoadSafetyReport } from '@/lib/types'

interface ReportsListProps {
  reports: RoadSafetyReport[]
  onSelectReport: (report: RoadSafetyReport) => void
}

export function ReportsList({ reports, onSelectReport }: ReportsListProps) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          onClick={() => onSelectReport(report)}
          className="p-6 rounded-lg border border-border bg-card hover:border-accent hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{report.id}</h3>
              <p className="text-sm text-muted-foreground">Audit ID: {report.audit_id}</p>
            </div>
            <span className="px-3 py-1 rounded text-xs font-medium bg-primary/20 text-primary-foreground">
              {report.interventions.length} Interventions
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{report.summary}</p>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Generated: {report.generated_at.toLocaleDateString()}
            </p>
            <span className="text-accent text-sm font-medium">View Report →</span>
          </div>
        </div>
      ))}
    </div>
  )
}
