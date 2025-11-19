'use client'

import { CostEstimate } from '@/lib/types'

interface CostBreakdownTableProps {
  estimate: CostEstimate
}

export function CostBreakdownTable({ estimate }: CostBreakdownTableProps) {
  const downloadEstimate = () => {
    console.log('Downloading estimate...')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Material Cost</p>
          <p className="text-2xl font-bold text-accent">
            ₹{estimate.total_material_cost.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Labor Cost</p>
          <p className="text-2xl font-bold text-accent">
            ₹{(estimate.total_labor_cost || 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-primary/20 border border-primary/30">
          <p className="text-sm text-muted-foreground mb-1">Total Estimate</p>
          <p className="text-2xl font-bold text-primary-foreground">
            ₹{estimate.total_estimated_cost.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-card/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Item Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Qty</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Unit</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Rate</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {estimate.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-card/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-foreground">{item.item_code}</td>
                <td className="px-4 py-3 text-sm text-foreground">{item.description}</td>
                <td className="px-4 py-3 text-sm text-right text-foreground">
                  {item.quantity.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-foreground">{item.unit}</td>
                <td className="px-4 py-3 text-sm text-right text-foreground">
                  ₹{item.unit_rate.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-accent">
                  ₹{item.total_cost.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-lg bg-card/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Source:</span> {estimate.source}
          {estimate.validity_date && (
            <span className="ml-4">
              Valid till: {new Date(estimate.validity_date).toLocaleDateString()}
            </span>
          )}
        </p>
      </div>

      <button
        onClick={downloadEstimate}
        className="w-full px-4 py-2 rounded border border-border bg-card hover:bg-card/80 text-foreground transition-colors"
      >
        Download Estimate
      </button>
    </div>
  )
}
