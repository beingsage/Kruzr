'use client'

import { VideoAnalysis, ChangeDetection } from '@/lib/types'

interface VideoAnalysisResultsProps {
  analysis: VideoAnalysis
  videos: { base?: File; present?: File }
}

export function VideoAnalysisResults({ analysis, videos }: VideoAnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-yellow-900/30 text-yellow-300'
      case 'Medium':
        return 'bg-orange-900/30 text-orange-300'
      case 'High':
        return 'bg-red-900/30 text-red-300'
      default:
        return 'bg-gray-900/30 text-gray-300'
    }
  }

  const getElementIcon = (element: string) => {
    const icons: Record<string, string> = {
      pavement: '🛣️',
      markings: '⚪',
      signage: '🚧',
      delineators: '🔴',
      hazard: '⚠️',
    }
    return icons[element] || '📍'
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Analysis Summary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-input border border-border">
            <p className="text-sm text-muted-foreground mb-1">Deterioration Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-accent">
                {Math.round(analysis.deterioration_score * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">of baseline</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-input border border-border">
            <p className="text-sm text-muted-foreground mb-1">Changes Detected</p>
            <p className="text-3xl font-bold text-foreground">
              {analysis.detected_changes.length}
            </p>
          </div>
        </div>

        {analysis.recommendation && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-sm font-medium text-foreground mb-2">Recommendation</p>
            <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Detected Changes</h2>
        <div className="space-y-3">
          {analysis.detected_changes.map((change, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getElementIcon(change.element_type)}</span>
                  <div>
                    <h3 className="font-semibold text-foreground capitalize">
                      {change.element_type}
                    </h3>
                    <p className="text-sm text-muted-foreground">{change.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-medium ${getSeverityColor(change.severity)}`}>
                  {change.severity}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="font-medium text-foreground">{Math.round(change.confidence * 100)}%</p>
                </div>
                {change.location_frame && (
                  <div>
                    <p className="text-muted-foreground">Location (Frame)</p>
                    <p className="font-medium text-foreground">@ {change.location_frame}s</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Changes by Element</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['pavement', 'markings', 'signage', 'delineators', 'hazard'].map((element) => {
            const count = analysis.detected_changes.filter(
              (c) => c.element_type === element
            ).length
            return (
              <div key={element} className="p-3 rounded-lg bg-card border border-border text-center">
                <p className="text-2xl mb-1">{getElementIcon(element)}</p>
                <p className="text-sm font-semibold text-foreground capitalize">{element}</p>
                <p className="text-lg font-bold text-accent">{count}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 rounded border border-border bg-card hover:bg-card/80 text-foreground transition-colors">
          Export Analysis
        </button>
        <button className="flex-1 px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
          Generate Recommendations
        </button>
      </div>
    </div>
  )
}
