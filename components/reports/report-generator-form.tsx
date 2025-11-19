'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ReportGeneratorFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function ReportGeneratorForm({ onSubmit, isLoading }: ReportGeneratorFormProps) {
  const [formData, setFormData] = useState({
    title: 'SH-12 near Maple Public School',
    location: 'SH-12 km 23.4, Maple Town',
    road_type: 'Urban multi-lane',
    posted_speed: 50,
    operating_speed_est: 58,
    aadt: 8500,
    period: 'Jan 2023 - Dec 2024',
    crash_count: 6,
    fatalities: 1,
    serious_injuries: 2,
    minor_injuries: 3,
    user_groups: ['pedestrians', 'school children', 'motorcycles'],
    factors: ['inadequate crossing', 'no sidewalk', 'poor lighting', 'speeding'],
    existing_countermeasures: ['signage only'],
    budget: 'medium',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Road location"
          className="bg-background border-border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Road Type</label>
        <Input
          name="road_type"
          value={formData.road_type}
          onChange={handleChange}
          placeholder="e.g., Urban multi-lane"
          className="bg-background border-border"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">Posted Speed</label>
          <Input
            type="number"
            name="posted_speed"
            value={formData.posted_speed}
            onChange={handleChange}
            placeholder="km/h"
            className="bg-background border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Operating Speed</label>
          <Input
            type="number"
            name="operating_speed_est"
            value={formData.operating_speed_est}
            onChange={handleChange}
            placeholder="km/h"
            className="bg-background border-border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">AADT</label>
        <Input
          type="number"
          name="aadt"
          value={formData.aadt}
          onChange={handleChange}
          placeholder="Annual Average Daily Traffic"
          className="bg-background border-border"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">Crashes</label>
          <Input
            type="number"
            name="crash_count"
            value={formData.crash_count}
            onChange={handleChange}
            className="bg-background border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fatalities</label>
          <Input
            type="number"
            name="fatalities"
            value={formData.fatalities}
            onChange={handleChange}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">Serious Injuries</label>
          <Input
            type="number"
            name="serious_injuries"
            value={formData.serious_injuries}
            onChange={handleChange}
            className="bg-background border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Minor Injuries</label>
          <Input
            type="number"
            name="minor_injuries"
            value={formData.minor_injuries}
            onChange={handleChange}
            className="bg-background border-border"
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Report'}
      </Button>
    </form>
  )
}
