'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const audienceSummaries = {
  general_public: {
    title: 'For General Public',
    icon: '👥',
    content: `Safety Advisory: Maple Public School Zone

Your neighborhood has seen 6 road crashes near the school since 2023, including 1 serious incident. 

What will change:
• Raised crossing at school entrance (safer for children)
• Better streetlights for evening visibility
• Speed enforcement during school hours (target: 30 km/h)
• Crossing guards during school start/end times

Your role:
• Use designated crosswalks (coming soon)
• Cross only at marked crossings
• Report hazards to municipal helpline: 1-800-SAFE-ROAD
• Support school safety campaigns`,
  },
  practitioners: {
    title: 'For Practitioners & Action Takers',
    icon: '🔧',
    content: `Field Implementation Checklist: Immediate Phase (0-3 months)

Week 1-2: Site Mobilization
☐ Clear temporary raised platform location
☐ Mark work zone (50m radius)
☐ Notify schools and residents
☐ Prepare utilities coordination (drainage, utilities)

Week 3-4: Raised Crossing Installation
☐ Construct temporary prefab platform (300mm height)
☐ Install tactile warning surface
☐ Verify drainage integration
☐ Paint zebra markings (per IRC standards)

Week 5-6: Lighting Retrofit
☐ Survey existing poles and electrical
☐ Install LED luminaires (3000K, 80+ CRI)
☐ Verify illuminance ≥ 50 lux at crossing
☐ Test evening/dawn visibility

Week 7-8: Speed Enforcement & School Outreach
☐ Deploy mobile ANPR camera (during school hours)
☐ Begin school outreach program
☐ Train volunteer crossing guards
☐ Post signage (30 km/h school zone)`,
  },
  researchers: {
    title: 'For Researchers & Academics',
    icon: '📚',
    content: `Research Opportunity & Data Gaps

Data Available:
• 6-crash dataset (2023-2024) with severity coding
• Hourly AADT estimates (8,500 annual)
• Speed profiles (baseline: 85th %ile 58 km/h)
• Site photos and drone imagery

Research Questions:
1. Does raised crossing reduce pedestrian hesitation compared to flat zebra?
2. What is the LED lighting elasticity on evening crash reduction?
3. How does temporary speed enforcement change behavior during/after active periods?
4. What is the pedestrian compliance curve post-intervention?

Suggested Study Design:
• Controlled before-after (24-month baseline + 24-month post)
• Comparison site: similar school zone without intervention
• Mixed-methods: automated counts + video coding + surveys
• Subgroup analysis: school hours vs. off-hours, day vs. evening

Data Access:
Full crash records, speed distributions, and baseline counts available in project folder for registered researchers.`,
  },
  ministry: {
    title: 'For Ministry & Policy Makers',
    icon: '🏛️',
    content: `Executive Brief: Budget & Policy Requirements

Investment Ask:
• Immediate Phase (0-3 months): ₹173,000 (raised crossing, lighting, enforcement setup)
• Short-term Phase (3-12 months): ₹260,000 (sidewalks, refuge islands, signage)
• Total 12-month commitment: ₹433,000

Expected ROI:
• Pedestrian injury reduction: 40-55% (High confidence)
• Crash severity reduction: expected 1-2 fewer serious injuries annually
• Cost per prevented serious injury: ₹216,500

Regulatory Action Required:
☐ Formal 30 km/h school zone speed limit (gazette notification)
☐ Temporary mobile ANPR authorization (90-day pilot)
☐ Road closure permit for construction (2-week phase)

KPI Commitments (24-month targets):
• Crash count: 6 → ≤1
• Serious injury count: 2 → 0-1
• 85th %ile speed: 58 km/h → ≤35 km/h
• Pedestrian compliance: 35% → ≥75%

Monitoring & reporting: Monthly dashboards + 6-month public summaries.`,
  },
  investigation: {
    title: 'For Investigation & Detailed Study',
    icon: '🔍',
    content: `Full Data Annex & Forensic Notes

Crash Records (Available):
• 2023-08-12: Pedestrian struck, child, ~17:45 (pre-dusk)
• 2023-11-05: Minor fender-bender, ~09:30 (school hours)
• 2024-02-14: Serious injury (motorcyclist), ~19:15 (dark)
• 2024-05-08: Minor property damage, ~08:00 (morning)
• 2024-09-21: Serious injury (adult pedestrian), ~18:00 (dusk)
• 2024-11-03: Fatal (child pedestrian), ~17:30 (pre-dusk)

Forensic Investigation Pointers:
• 4 of 6 crashes in low-light conditions (post-dusk, night)
• 3 crashes involve pedestrians; highest severity cluster near school entrance
• No surveillance cameras currently; legal request for business/CCTV feeds
• Witness statement collection pending (school records available)

Suggested Investigative Angles:
1. Geometric sight distance from driver positions (use site photos)
2. Speed reconstruction using skid marks (where available)
3. Pedestrian origin-destination pattern (school drop-off survey)
4. Lighting conditions correlation (photometric measurements taken)
5. Vehicle-pedestrian interaction modeling (video forensics toolkit recommended)

Scaling Potential:
This intervention model applicable to 12+ similar school zones statewide. Recommend pilot evaluation for state-wide policy adoption.`,
  },
}

export function AudienceSummaries() {
  const [selectedAudience, setSelectedAudience] = useState<keyof typeof audienceSummaries>('general_public')

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Tailored Stakeholder Summaries</CardTitle>
          <CardDescription>5 audience-specific one-page summaries from the comprehensive report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(audienceSummaries).map(([key, summary]) => (
              <Button
                key={key}
                variant={selectedAudience === key ? 'default' : 'outline'}
                onClick={() => setSelectedAudience(key as keyof typeof audienceSummaries)}
                className="gap-2"
              >
                {summary.icon} {summary.title}
              </Button>
            ))}
          </div>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {audienceSummaries[selectedAudience].icon}
                {audienceSummaries[selectedAudience].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                {audienceSummaries[selectedAudience].content}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
