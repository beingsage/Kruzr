'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ReportPreviewProps {
  report: any
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const [viewMode, setViewMode] = useState<'full' | 'public' | 'practitioners' | 'research' | 'policy' | 'investigation'>('full')

  const handleExportPDF = async () => {
    try {
      const response = await fetch('/api/report/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report }),
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `report-${report.id}.pdf`
        a.click()
      }
    } catch (error) {
      console.error('[v0] PDF export error:', error)
    }
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(report, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = window.URL.createObjectURL(dataBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${report.id}.json`
    a.click()
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={viewMode === 'full' ? 'default' : 'outline'}
            onClick={() => setViewMode('full')}
            size="sm"
          >
            Full Report
          </Button>
          <Button
            variant={viewMode === 'public' ? 'default' : 'outline'}
            onClick={() => setViewMode('public')}
            size="sm"
          >
            Public Summary
          </Button>
          <Button
            variant={viewMode === 'practitioners' ? 'default' : 'outline'}
            onClick={() => setViewMode('practitioners')}
            size="sm"
          >
            Practitioners
          </Button>
          <Button
            variant={viewMode === 'research' ? 'default' : 'outline'}
            onClick={() => setViewMode('research')}
            size="sm"
          >
            Research
          </Button>
          <Button
            variant={viewMode === 'policy' ? 'default' : 'outline'}
            onClick={() => setViewMode('policy')}
            size="sm"
          >
            Policy
          </Button>
        </div>

        <div className="mb-6 flex gap-2">
          <Button onClick={handleExportPDF} variant="secondary" size="sm">
            Export PDF
          </Button>
          <Button onClick={handleExportJSON} variant="secondary" size="sm">
            Export JSON
          </Button>
        </div>
      </Card>

      <Card className="p-8 bg-card/50 min-h-96">
        <div className="prose prose-sm max-w-none text-foreground">
          <pre className="whitespace-pre-wrap text-sm font-mono bg-background p-4 rounded border border-border overflow-auto max-h-96">
            {viewMode === 'full' && report.content}
            {viewMode === 'public' && (
              <span>
                {report.content.split('For General Public')[1]?.split('For Practitioners')[0] || 'Loading summary...'}
              </span>
            )}
            {viewMode === 'practitioners' && (
              <span>
                {report.content.split('For Practitioners')[1]?.split('For Researchers')[0] || 'Loading summary...'}
              </span>
            )}
            {viewMode === 'research' && (
              <span>
                {report.content.split('For Researchers')[1]?.split('For Ministry')[0] || 'Loading summary...'}
              </span>
            )}
            {viewMode === 'policy' && (
              <span>
                {report.content.split('For Ministry')[1]?.split('For Investigation')[0] || 'Loading summary...'}
              </span>
            )}
            {viewMode === 'investigation' && (
              <span>
                {report.content.split('For Investigation')[1]?.split('8 Appendices')[0] || 'Loading summary...'}
              </span>
            )}
          </pre>
        </div>
      </Card>
    </div>
  )
}
