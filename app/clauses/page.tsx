'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ClausesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStandard, setSelectedStandard] = useState('IRC 35')

  const allClauses = [
    {
      id: 'IRC35-5.2',
      standard: 'IRC 35',
      section: '5.2',
      title: 'Pavement Condition Standards',
      content:
        'All pavements shall be maintained in a safe condition with maximum rut depth of 20mm and pothole-free surface.',
    },
    {
      id: 'IRC35-6.1',
      standard: 'IRC 35',
      section: '6.1',
      title: 'Safety Requirements',
      content:
        'Road designs must incorporate safety measures including proper drainage, slope, and surface friction.',
    },
    {
      id: 'IRC67-3.4',
      standard: 'IRC 67',
      section: '3.4',
      title: 'Road Signs Placement',
      content: 'All road signs must be placed at minimum 2 meters from the road edge and clearly visible.',
    },
    {
      id: 'IRC99-2.1',
      standard: 'IRC 99',
      section: '2.1',
      title: 'Non-Motorized User Facilities',
      content: 'Adequate pedestrian and cycle facilities must be provided on all roads.',
    },
  ]

  const filteredClauses = useMemo(() => {
    return allClauses.filter(clause => {
      const matchesStandard = clause.standard === selectedStandard
      const matchesSearch = searchQuery === '' || 
        clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clause.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clause.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesStandard && matchesSearch
    })
  }, [searchQuery, selectedStandard])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Clause Explorer</h1>
            <p className="text-muted-foreground">
              Search and explore IRC standards and requirements
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clauses by title, content, or ID..."
              className="w-full px-4 py-3 rounded bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {searchQuery && (
              <p className="text-xs text-muted-foreground mt-2">
                Found {filteredClauses.length} result{filteredClauses.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Standards Filter */}
          <div className="mb-8 flex gap-2 flex-wrap">
            {['IRC 35', 'IRC 67', 'IRC 99', 'SP 84', 'SP 87'].map((std) => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedStandard === std
                    ? 'bg-accent text-accent-foreground'
                    : 'border border-border bg-card hover:border-accent'
                }`}
              >
                {std}
              </button>
            ))}
          </div>

          {/* Clauses List */}
          <div className="space-y-4">
            {filteredClauses.length > 0 ? (
              filteredClauses.map((clause) => (
                <div key={clause.id} className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{clause.title}</h3>
                      <p className="text-sm text-accent">
                        {clause.standard} Section {clause.section}
                      </p>
                    </div>
                    <code className="text-xs bg-input px-3 py-1 rounded text-muted-foreground">
                      {clause.id}
                    </code>
                  </div>
                  <p className="text-muted-foreground italic">"{clause.content}"</p>
                </div>
              ))
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No clauses found matching your search
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
