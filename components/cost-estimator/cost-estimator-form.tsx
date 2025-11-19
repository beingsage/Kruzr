'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/shared/file-uploader'

interface CostEstimatorFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function CostEstimatorForm({ onSubmit, isLoading }: CostEstimatorFormProps) {
  const [interventions, setInterventions] = useState<string[]>([
    'Road Resurfacing',
    'Road Markings Installation',
  ])
  const [newIntervention, setNewIntervention] = useState('')
  const [priceSource, setPriceSource] = useState<'CPWD' | 'GeM' | 'Both'>('Both')

  const addIntervention = () => {
    if (newIntervention.trim()) {
      setInterventions([...interventions, newIntervention])
      setNewIntervention('')
    }
  }

  const removeIntervention = (index: number) => {
    setInterventions(interventions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (interventions.length === 0) {
      alert('Please add at least one intervention')
      return
    }

    onSubmit({
      interventions,
      price_source: priceSource,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-6 rounded-lg border border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Cost Estimation</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Source
          </label>
          <div className="flex gap-3">
            {['CPWD', 'GeM', 'Both'].map((source) => (
              <label key={source} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="source"
                  value={source}
                  checked={priceSource === source}
                  onChange={(e) => setPriceSource(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">{source}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Interventions
          </label>

          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {interventions.map((intervention, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-input rounded border border-border"
              >
                <span className="text-sm text-foreground">{intervention}</span>
                <button
                  type="button"
                  onClick={() => removeIntervention(index)}
                  className="text-xs px-2 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newIntervention}
              onChange={(e) => setNewIntervention(e.target.value)}
              placeholder="Add intervention..."
              className="flex-1 px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addIntervention()
                }
              }}
            />
            <button
              type="button"
              onClick={addIntervention}
              className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-sm font-medium text-foreground mb-3">Or Upload Report (Optional)</h3>
        <FileUploader
          onFilesSelected={() => {}}
          accept=".pdf"
          multiple={false}
          label="Upload intervention report"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Calculating...' : 'Calculate Cost'}
      </button>
    </form>
  )
}
