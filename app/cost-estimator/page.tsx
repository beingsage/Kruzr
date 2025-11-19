'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CostEstimatorForm } from '@/components/cost-estimator/cost-estimator-form'
import { CostBreakdownTable } from '@/components/cost-estimator/cost-breakdown-table'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileJson } from 'lucide-react'

export default function CostEstimatorPage() {
  const [estimate, setEstimate] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleEstimate = async (formData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/cost/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setEstimate(data)
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = () => {
    if (!estimate) return
    alert('PDF export would be generated here with estimate details')
  }

  const handleExportJSON = () => {
    if (!estimate) return
    const dataStr = JSON.stringify(estimate, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `estimate-${Date.now()}.json`
    link.click()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Cost Estimator</h1>
              <p className="text-muted-foreground">
                Calculate material and labor costs for road interventions
              </p>
            </div>
            {estimate && (
              <div className="flex gap-2">
                <Button onClick={handleExportPDF} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button onClick={handleExportJSON} variant="outline" size="sm">
                  <FileJson className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Add Interventions</h2>
                <CostEstimatorForm onEstimate={handleEstimate} loading={loading} />
              </Card>
            </div>

            <div className="lg:col-span-2">
              {estimate ? (
                <CostBreakdownTable estimate={estimate} />
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  Add interventions to see cost breakdown
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
