'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StandardsManagement } from '@/components/admin/standards-management'
import { InterventionManagement } from '@/components/admin/intervention-management'
import { ETLPipelineStatus } from '@/components/admin/etl-pipeline-status'

type AdminTab = 'standards' | 'interventions' | 'pipelines'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('standards')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Administration</h1>
            <p className="text-muted-foreground">
              Manage IRC standards, interventions, and ETL pipelines
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-border pb-0">
            {[
              { id: 'standards', label: 'Standards Management' },
              { id: 'interventions', label: 'Interventions' },
              { id: 'pipelines', label: 'ETL Pipelines' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="rounded-lg border border-border bg-card">
            {activeTab === 'standards' && <StandardsManagement />}
            {activeTab === 'interventions' && <InterventionManagement />}
            {activeTab === 'pipelines' && <ETLPipelineStatus />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
