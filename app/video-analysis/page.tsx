'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { VideoUploadSection } from '@/components/video-analysis/video-upload-section'
import { VideoAnalysisResults } from '@/components/video-analysis/video-analysis-results'
import { Card } from '@/components/ui/card'

export default function VideoAnalysisPage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async (files: { base: File; present: File }) => {
    setLoading(true)
    setError('')
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('baseVideo', files.base)
      formData.append('presentVideo', files.present)

      const response = await fetch('/api/video/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Analysis failed')
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Video Comparative Analysis</h1>
          <p className="text-muted-foreground mb-8">
            Upload base and present road videos to detect deterioration and changes
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Upload Videos</h2>
              <VideoUploadSection onAnalyze={handleAnalyze} loading={loading} />
            </Card>

            <div>
              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                  {error}
                </div>
              )}
              {results && <VideoAnalysisResults results={results} />}
              {!results && !loading && (
                <Card className="p-6 text-center text-muted-foreground">
                  Upload videos to analyze road deterioration
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
