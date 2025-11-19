'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ReportsList } from '@/components/reports/reports-list'
import { ReportViewer } from '@/components/reports/report-viewer'
import { RoadSafetyReport } from '@/lib/types'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<RoadSafetyReport | null>(null)
  const [reports] = useState<RoadSafetyReport[]>([
    {
      id: 'RPT-001',
      audit_id: 'AUD-001',
      interventions: [
        {
          intervention_id: 'INT-001',
          title: 'Road Resurfacing',
          rationale: 'Poor pavement condition',
          clauses: [{ id: 'IRC35-5.2', excerpt: 'Pavement standards', standard: 'IRC 35', section: '5.2' }],
          confidence: 0.92,
          alternatives: ['Overlay', 'Patch'],
          category: 'Pavement',
          estimated_cost: 450000,
        },
      ],
      cost_estimates: [
        {
          id: 'EST-001',
          intervention_id: 'INT-001',
          items: [
            {
              item_code: 'CPWD-001',
              description: 'Bituminous Concrete Layer',
              unit: 'MT',
              quantity: 450,
              unit_rate: 5500,
              total_cost: 2475000,
              source: 'CPWD',
            },
          ],
          total_material_cost: 2475000,
          total_labor_cost: 371250,
          total_estimated_cost: 2846250,
          unit: 'km',
          source: 'CPWD',
        },
      ],
      clauses_cited: [
        { id: 'IRC35-5.2', excerpt: 'All pavements shall be maintained in safe condition', standard: 'IRC 35', section: '5.2' },
      ],
      summary: 'Road segment requires urgent intervention for pavement restoration and safety markings.',
      generated_at: new Date('2025-01-15'),
    },
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
            <p className="text-muted-foreground">
              View and manage road safety audit reports
            </p>
          </div>

          {!selectedReport ? (
            <ReportsList reports={reports} onSelectReport={setSelectedReport} />
          ) : (
            <div>
              <button
                onClick={() => setSelectedReport(null)}
                className="mb-6 px-3 py-2 rounded border border-border text-foreground hover:bg-card/50 transition-colors text-sm"
              >
                ← Back to Reports
              </button>
              <ReportViewer report={selectedReport} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
