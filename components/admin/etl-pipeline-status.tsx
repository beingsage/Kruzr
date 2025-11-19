'use client'

import { useState } from 'react'

export function ETLPipelineStatus() {
  const [pipelines, setPipelines] = useState([
    {
      id: 'ETL-001',
      type: 'standards',
      status: 'completed',
      startedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      recordsProcessed: 245,
    },
    {
      id: 'ETL-002',
      type: 'interventions',
      status: 'running',
      startedAt: new Date(Date.now() - 3600000),
      completedAt: null,
      recordsProcessed: 156,
    },
    {
      id: 'ETL-003',
      type: 'costs',
      status: 'completed',
      startedAt: new Date(Date.now() - 172800000),
      completedAt: new Date(Date.now() - 169200000),
      recordsProcessed: 892,
    },
  ])
  const [message, setMessage] = useState('')
  const [showLogs, setShowLogs] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-300'
      case 'running':
        return 'bg-blue-900/30 text-blue-300'
      case 'failed':
        return 'bg-red-900/30 text-red-300'
      default:
        return 'bg-gray-900/30 text-gray-300'
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      standards: 'IRC Standards',
      interventions: 'Interventions DB',
      costs: 'CPWD/GeM Pricing',
      videos: 'Video ML Models',
    }
    return labels[type] || type
  }

  const triggerPipeline = (pipelineId: string) => {
    setMessage(`Re-running pipeline ${pipelineId}...`)
    setTimeout(() => {
      setMessage(`Pipeline ${pipelineId} completed successfully`)
      setTimeout(() => setMessage(''), 3000)
    }, 1500)
  }

  const runAllPipelines = async () => {
    setMessage('Running all pipelines...')
    try {
      const response = await fetch('/api/admin/run-pipelines', {
        method: 'POST',
      })
      if (response.ok) {
        setMessage('All pipelines started successfully')
      }
    } catch (err) {
      setMessage('Error running pipelines')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const handleViewLogs = () => {
    setShowLogs(!showLogs)
  }

  const handlePipelineSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className="p-6 space-y-6">
      {message && (
        <div className="p-4 rounded-lg bg-accent/20 text-accent border border-accent/30">
          {message}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">ETL Pipeline Status</h3>

        <div className="space-y-3">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className="p-4 rounded-lg border border-border bg-input/30 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{getTypeLabel(pipeline.type)}</h4>
                  <p className="text-xs text-muted-foreground">{pipeline.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}>
                  {pipeline.status}
                  {pipeline.status === 'running' && (
                    <span className="ml-2 animate-spin">⚙️</span>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Started</p>
                  <p className="text-foreground">
                    {pipeline.startedAt.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="text-foreground">
                    {pipeline.completedAt
                      ? `${Math.round((pipeline.completedAt.getTime() - pipeline.startedAt.getTime()) / 60000)}m`
                      : 'Running...'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Records</p>
                  <p className="text-foreground">{pipeline.recordsProcessed}</p>
                </div>
                <div>
                  <button
                    onClick={() => triggerPipeline(pipeline.id)}
                    disabled={pipeline.status === 'running'}
                    className="text-accent hover:underline disabled:opacity-50 transition-opacity"
                  >
                    {pipeline.status === 'running' ? 'Running' : 'Re-run'}
                  </button>
                </div>
              </div>

              {pipeline.status === 'running' && (
                <div className="w-full bg-card rounded h-2">
                  <div className="bg-accent h-2 rounded animate-pulse" style={{ width: '65%' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
        <h4 className="font-semibold text-foreground mb-2">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={runAllPipelines}
            className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
          >
            Run All Pipelines
          </button>
          <button 
            onClick={handleViewLogs}
            className="px-3 py-2 rounded border border-border text-foreground text-sm hover:bg-card/50 transition-colors"
          >
            {showLogs ? 'Hide' : 'View'} Logs
          </button>
          <button 
            onClick={handlePipelineSettings}
            className="px-3 py-2 rounded border border-border text-foreground text-sm hover:bg-card/50 transition-colors"
          >
            {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>
      </div>

      {showLogs && (
        <div className="p-4 rounded-lg bg-card border border-border">
          <h4 className="font-semibold text-foreground mb-3">Pipeline Logs</h4>
          <div className="bg-input/50 p-3 rounded text-xs font-mono text-muted-foreground space-y-1 max-h-40 overflow-y-auto">
            <div>[2025-01-18 10:30:45] Pipeline ETL-001 started</div>
            <div>[2025-01-18 10:31:12] Processing 245 standards records</div>
            <div>[2025-01-18 10:32:03] Building vector embeddings</div>
            <div>[2025-01-18 10:33:45] Pipeline ETL-001 completed successfully</div>
            <div>[2025-01-18 10:35:20] Pipeline ETL-002 started</div>
            <div>[2025-01-18 10:35:21] Processing interventions database...</div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="p-4 rounded-lg bg-card border border-border">
          <h4 className="font-semibold text-foreground mb-3">Pipeline Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-foreground mb-1">Max Batch Size</label>
              <input 
                type="number" 
                defaultValue="1000"
                className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1">Retry Attempts</label>
              <input 
                type="number" 
                defaultValue="3"
                className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
              />
            </div>
            <button className="w-full px-3 py-2 rounded bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
