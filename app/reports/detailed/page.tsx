'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ComprehensiveReport } from '@/components/reports/comprehensive-report'

export default function DetailedReportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Comprehensive Intervention Report</h1>
            <p className="text-muted-foreground">
              20-30 page detailed analysis with 40+ intervention segments, advanced visualizations, and tailored summaries
            </p>
          </div>

          <ComprehensiveReport />
        </div>
      </main>

      <Footer />
    </div>
  )
}
