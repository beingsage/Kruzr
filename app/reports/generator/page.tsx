'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ReportGeneratorForm } from '@/components/reports/report-generator-form'
import { ReportPreview } from '@/components/reports/report-preview'
import { Card } from '@/components/ui/card'

export default function ReportGeneratorPage() {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerateReport = async (formData: any) => {
    setLoading(true)
    setError('')
    try {
      console.log('[v0] Generating report with data:', formData)
      const response = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Failed to generate report')
      const data = await response.json()
      console.log('[v0] Report generated:', data)
      setReport(data)
    } catch (err) {
      console.error('[v0] Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Generate Report</h1>
            <p className="text-muted-foreground">
              Create comprehensive road safety intervention reports with GPT-powered analysis
            </p>
          </div>

          {!report ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-6">Road Audit Input</h2>
                  <ReportGeneratorForm onSubmit={handleGenerateReport} isLoading={loading} />
                </Card>
              </div>

              <div className="lg:col-span-2">
                {error && (
                  <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                    {error}
                  </div>
                )}
                {loading && (
                  <Card className="p-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      <span className="ml-4 text-muted-foreground">Generating report...</span>
                    </div>
                  </Card>
                )}
                {!loading && !report && (
                  <Card className="p-8 text-center text-muted-foreground">
                    Fill in the road audit details to generate a comprehensive safety report
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setReport(null)}
                className="mb-6 px-4 py-2 rounded border border-border text-foreground hover:bg-card/50 transition-colors"
              >
                ← Generate Another Report
              </button>
              <ReportPreview report={report} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
