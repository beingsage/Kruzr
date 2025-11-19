'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InterventionForm } from '@/components/intervention-gpt/intervention-form'
import { InterventionResultsSection } from '@/components/intervention-gpt/intervention-results-section'
import { Card } from '@/components/ui/card'
import { getInterventionRecommendations } from './actions'
import { ComprehensiveReport } from '@/components/reports/comprehensive-report'

export default function InterventionGPTPage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: any) => {
    setLoading(true)
    setError('')
    try {
      console.log('[v0] Submitting intervention form', formData)
      const data = await getInterventionRecommendations(formData)
      console.log('[v0] Received recommendations:', data)
      setResults(data)
      setTimeout(() => {
        document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    } catch (err) {
      console.error('[v0] Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Intervention GPT</h1>
          <p className="text-muted-foreground mb-8">
            Analyze road audit data and get AI-powered intervention recommendations
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Road Audit Details</h2>
              <InterventionForm onSubmit={handleSubmit} isLoading={loading} />
            </Card>

            <div>
              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                  {error}
                </div>
              )}
              {loading && (
                <Card className="p-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin h-5 w-5 border-2 border-accent border-t-transparent rounded-full"></div>
                    <p className="text-muted-foreground">Generating recommendations...</p>
                  </div>
                </Card>
              )}
              {!loading && !results && (
                <Card className="p-6 text-center text-muted-foreground">
                  Fill in the audit details and submit to see recommendations
                </Card>
              )}
            </div>
          </div>

          {results && (
            <div id="report-section" className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Generated Safety Intervention Report</h2>
              <ComprehensiveReport />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
