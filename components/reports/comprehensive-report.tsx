'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Mock comprehensive report data
const mockComprehensiveReport = {
  coverPage: {
    title: 'SH-12 Safety Intervention Report',
    location: 'SH-12 km 23.4, Maple Town',
    description: 'High-risk school zone with repeated pedestrian collisions',
    date: '2025-01-20',
    authors: 'Mixture-of-Experts Panel (Engineering • Enforcement • Education • Policy)',
    impactMetric: '6 crashes (Jan 2023–Dec 2024) — 1 fatal, 2 serious injuries; high pedestrian exposure',
  },
  crashTrendData: [
    { month: 'Jan 2023', crashes: 0, speed_avg: 58, pedestrians: 120 },
    { month: 'Feb 2023', crashes: 0, speed_avg: 59, pedestrians: 125 },
    { month: 'Aug 2023', crashes: 1, speed_avg: 60, pedestrians: 130 },
    { month: 'Nov 2023', crashes: 1, speed_avg: 58, pedestrians: 128 },
    { month: 'Feb 2024', crashes: 1, speed_avg: 61, pedestrians: 135 },
    { month: 'May 2024', crashes: 1, speed_avg: 59, pedestrians: 140 },
    { month: 'Sep 2024', crashes: 1, speed_avg: 60, pedestrians: 145 },
    { month: 'Nov 2024', crashes: 1, speed_avg: 58, pedestrians: 138 },
  ],
  riskScores: [
    { factor: 'Pedestrian Exposure', score: 0.95, severity: 'Critical' },
    { factor: 'Speed Environment', score: 0.85, severity: 'High' },
    { factor: 'Infrastructure Gap', score: 0.90, severity: 'High' },
    { factor: 'Lighting Inadequacy', score: 0.70, severity: 'Medium' },
    { factor: 'Sight Distance', score: 0.65, severity: 'Medium' },
    { factor: 'Lane Configuration', score: 0.60, severity: 'Medium' },
  ],
  interventionPackages: [
    {
      rank: 1,
      title: 'School-Zone Protection Package',
      score: 87,
      components: ['Raised Crossing', 'LED Lighting', 'Speed Enforcement', 'School Outreach'],
      timeline: '0-3 months',
      cost: 'Medium',
      confidence: 'High',
      expectedReduction: '40-55%',
    },
    {
      rank: 2,
      title: 'Medium-term Road Safety Upgrade',
      score: 83,
      components: ['Sidewalks', 'Refuge Islands', 'Curb Extensions', 'Traffic Calming'],
      timeline: '3-12 months',
      cost: 'Medium',
      confidence: 'Medium',
      expectedReduction: '30-45%',
    },
    {
      rank: 3,
      title: 'Long-term Complete Street Redesign',
      score: 71,
      components: ['Lane Reallocation', 'Cycle Lane', 'Permanent Medians', 'Signal Redesign'],
      timeline: '12-36 months',
      cost: 'High',
      confidence: 'Medium',
      expectedReduction: '50-70%',
    },
  ],
  costBreakdown: [
    { category: 'Raised Crossing', cost: 85000, phase: 'Immediate' },
    { category: 'LED Lighting', cost: 65000, phase: 'Immediate' },
    { category: 'Speed Enforcement Setup', cost: 15000, phase: 'Immediate' },
    { category: 'School Outreach', cost: 8000, phase: 'Immediate' },
    { category: 'Sidewalk Design', cost: 45000, phase: 'Short-term' },
    { category: 'Refuge Islands', cost: 120000, phase: 'Short-term' },
    { category: 'Curb Extensions', cost: 95000, phase: 'Short-term' },
  ],
  meKPIs: [
    { month: 'Baseline', crashes: 6, speeds_85th: 58, pedestrian_compliance: 35 },
    { month: 'Month 3', crashes: 5, speeds_85th: 48, pedestrian_compliance: 45 },
    { month: 'Month 6', crashes: 3, speeds_85th: 42, pedestrian_compliance: 62 },
    { month: 'Month 12', crashes: 2, speeds_85th: 38, pedestrian_compliance: 75 },
    { month: 'Month 24', crashes: 1, speeds_85th: 35, pedestrian_compliance: 82 },
  ],
  interventionSegments: [
    { id: 1, title: 'Root Cause Analysis', subsections: 8 },
    { id: 2, title: 'Pedestrian Exposure Assessment', subsections: 7 },
    { id: 3, title: 'Speed Profile Analysis', subsections: 6 },
    { id: 4, title: 'Infrastructure Gap Mapping', subsections: 5 },
    { id: 5, title: 'Lighting Impact Study', subsections: 4 },
    { id: 6, title: 'Raised Crossing Design Details', subsections: 10 },
    { id: 7, title: 'LED Retrofit Specifications', subsections: 8 },
    { id: 8, title: 'Speed Enforcement Implementation', subsections: 9 },
    { id: 9, title: 'School Safety Program', subsections: 7 },
    { id: 10, title: 'Sidewalk Construction Plan', subsections: 10 },
    { id: 11, title: 'Refuge Island Design', subsections: 9 },
    { id: 12, title: 'Traffic Calming Measures', subsections: 6 },
    { id: 13, title: 'Lane Reallocation Strategy', subsections: 8 },
    { id: 14, title: 'Cycle Lane Integration', subsections: 7 },
    { id: 15, title: 'Signal Timing Optimization', subsections: 5 },
  ],
}

export function ComprehensiveReport() {
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'summary' | 'detailed' | 'segments'>('summary')

  const crashSeverityData = [
    { name: 'Minor', value: 3, fill: '#fbbf24' },
    { name: 'Serious', value: 2, fill: '#f97316' },
    { name: 'Fatal', value: 1, fill: '#dc2626' },
  ]

  return (
    <div className="space-y-8">
      {/* Cover Page Section */}
      <Card className="border-border bg-card">
        <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
          <CardTitle className="text-3xl">{mockComprehensiveReport.coverPage.title}</CardTitle>
          <CardDescription className="text-blue-100">{mockComprehensiveReport.coverPage.location}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-semibold">{mockComprehensiveReport.coverPage.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Date</p>
              <p className="font-semibold">{mockComprehensiveReport.coverPage.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Authors</p>
              <p className="text-sm">{mockComprehensiveReport.coverPage.authors}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Impact Metric</p>
              <p className="text-sm font-semibold text-red-600">{mockComprehensiveReport.coverPage.impactMetric}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'summary' ? 'default' : 'outline'}
          onClick={() => setViewMode('summary')}
          className="gap-2"
        >
          Summary View
        </Button>
        <Button
          variant={viewMode === 'detailed' ? 'default' : 'outline'}
          onClick={() => setViewMode('detailed')}
          className="gap-2"
        >
          Detailed Charts
        </Button>
        <Button
          variant={viewMode === 'segments' ? 'default' : 'outline'}
          onClick={() => setViewMode('segments')}
          className="gap-2"
        >
          40 Intervention Segments
        </Button>
      </div>

      {/* Summary View */}
      {viewMode === 'summary' && (
        <div className="space-y-6">
          {/* Crash Severity Pie Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Crash Severity Distribution</CardTitle>
              <CardDescription>6 crashes over 24 months (Jan 2023 - Dec 2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ minor: { color: '#fbbf24' }, serious: { color: '#f97316' }, fatal: { color: '#dc2626' } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={crashSeverityData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                      {crashSeverityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Scores */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Risk Factor Scoring</CardTitle>
              <CardDescription>Factors contributing to high-risk site (0-1 scale)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={Object.fromEntries(mockComprehensiveReport.riskScores.map(r => [r.factor.replace(/\s/g, '_'), { color: r.score > 0.8 ? '#dc2626' : r.score > 0.6 ? '#f97316' : '#fbbf24' }]))} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockComprehensiveReport.riskScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 1]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Intervention Packages Overview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Top 3 Intervention Packages</CardTitle>
              <CardDescription>Ranked by effectiveness and cost-benefit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComprehensiveReport.interventionPackages.map((pkg) => (
                  <div key={pkg.rank} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">#{pkg.rank} {pkg.title}</h4>
                        <p className="text-sm text-muted-foreground">Effectiveness Score: {pkg.score}% | Confidence: {pkg.confidence}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm font-semibold">{pkg.expectedReduction} Reduction</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div><span className="text-xs text-muted-foreground">Timeline:</span> <span className="text-sm">{pkg.timeline}</span></div>
                      <div><span className="text-xs text-muted-foreground">Cost:</span> <span className="text-sm">{pkg.cost}</span></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pkg.components.map((comp) => (
                        <span key={comp} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">{comp}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Charts View */}
      {viewMode === 'detailed' && (
        <div className="space-y-6">
          {/* Crash Trend Line Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Crash Trend Analysis (24 Months)</CardTitle>
              <CardDescription>Correlation with speed and pedestrian exposure</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ crashes: { color: '#dc2626' }, speed_avg: { color: '#3b82f6' }, pedestrians: { color: '#10b981' } }} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockComprehensiveReport.crashTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" label={{ value: 'Crashes', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Speed (km/h) / Pedestrians', angle: 90, position: 'insideRight' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="crashes" fill="#dc2626" name="Crashes" />
                    <Line yAxisId="right" type="monotone" dataKey="speed_avg" stroke="#3b82f6" name="Avg Speed" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="pedestrians" stroke="#10b981" name="Pedestrian Count" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Cost Breakdown by Phase</CardTitle>
              <CardDescription>Total estimated investment: ₹533,000</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ cost: { color: '#8b5cf6' } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockComprehensiveReport.costBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" width={180} type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill="#8b5cf6" name="Cost (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* M&E KPI Projections */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Monitoring & Evaluation Projections</CardTitle>
              <CardDescription>Expected KPI improvements over 24 months post-intervention</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ crashes: { color: '#dc2626' }, speeds_85th: { color: '#3b82f6' }, pedestrian_compliance: { color: '#10b981' } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockComprehensiveReport.meKPIs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="crashes" stroke="#dc2626" name="Crash Count" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="speeds_85th" stroke="#3b82f6" name="85th %ile Speed" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="pedestrian_compliance" stroke="#10b981" name="Pedestrian Compliance %" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Factors Scatter */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Risk Factor Correlation Matrix</CardTitle>
              <CardDescription>Severity vs. Confidence assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ score: { color: '#3b82f6' } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" name="Risk Score" domain={[0, 1]} />
                    <YAxis dataKey="score" name="Severity" />
                    <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                    <Scatter name="Risk Factors" data={mockComprehensiveReport.riskScores} fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 40 Intervention Segments View */}
      {viewMode === 'segments' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">40 Detailed Intervention Segments</h3>
            <p className="text-sm text-blue-800">Each segment contains in-depth analysis, design specifications, implementation checklists, and validation requirements.</p>
          </div>

          <div className="grid gap-3">
            {mockComprehensiveReport.interventionSegments.map((segment) => (
              <Card
                key={segment.id}
                className="border-border cursor-pointer hover:bg-card/70 transition-colors"
                onClick={() => setExpandedSegment(expandedSegment === segment.id ? null : segment.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-foreground">Segment {segment.id}: {segment.title}</h4>
                      <p className="text-sm text-muted-foreground">{segment.subsections} detailed subsections</p>
                    </div>
                    <span className="text-2xl text-muted-foreground">{expandedSegment === segment.id ? '−' : '+'}</span>
                  </div>

                  {expandedSegment === segment.id && (
                    <div className="mt-4 pt-4 border-t border-border space-y-3">
                      {Array.from({ length: segment.subsections }).map((_, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-medium text-foreground">Subsection {i + 1}: {['Analysis', 'Design Details', 'Field Implementation', 'Quality Assurance', 'Risk Mitigation', 'Stakeholder Engagement', 'Timeline', 'Resource Allocation', 'Compliance', 'Monitoring'][i]}</p>
                          <p className="text-muted-foreground mt-1">
                            Detailed technical specifications, drawings, checklists, and validation criteria for this aspect of the intervention.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Report Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Segments:</span>
                <span className="font-semibold">15 major intervention areas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Subsections:</span>
                <span className="font-semibold">110 detailed subsections</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Report Length:</span>
                <span className="font-semibold">25-30 pages (comprehensive)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Charts & Visualizations:</span>
                <span className="font-semibold">12+ detailed charts</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Export Options */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" className="gap-2">
          📊 Export as PDF
        </Button>
        <Button variant="outline" className="gap-2">
          📋 Export as JSON
        </Button>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          🖨️ Print Report
        </Button>
      </div>
    </div>
  )
}
