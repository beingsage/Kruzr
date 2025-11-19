import { Intervention } from '@/lib/types'

interface InterventionCardProps {
  intervention: Intervention
  onSelect?: () => void
}

export function InterventionCard({ intervention, onSelect }: InterventionCardProps) {
  return (
    <div
      onClick={onSelect}
      className="p-6 rounded-lg border border-border bg-card hover:border-accent hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-foreground">{intervention.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          intervention.confidence > 0.8
            ? 'bg-green-900/30 text-green-300'
            : intervention.confidence > 0.6
            ? 'bg-yellow-900/30 text-yellow-300'
            : 'bg-orange-900/30 text-orange-300'
        }`}>
          {Math.round(intervention.confidence * 100)}% confidence
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{intervention.rationale}</p>

      <div className="mb-4">
        <h4 className="text-xs font-medium text-foreground mb-2 uppercase">Standards Referenced</h4>
        <div className="flex flex-wrap gap-2">
          {intervention.clauses.map((clause) => (
            <span
              key={clause.id}
              className="px-2 py-1 bg-primary/20 text-accent text-xs rounded"
            >
              {clause.standard} {clause.section}
            </span>
          ))}
        </div>
      </div>

      {intervention.estimated_cost && (
        <div className="pt-3 border-t border-border">
          <p className="text-sm">
            <span className="text-muted-foreground">Est. Cost: </span>
            <span className="font-semibold text-foreground">
              ₹{intervention.estimated_cost.toLocaleString('en-IN')}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
