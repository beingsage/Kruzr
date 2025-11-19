'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/shared/file-uploader'

interface InterventionFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function InterventionForm({ onSubmit, isLoading }: InterventionFormProps) {
  const [userType, setUserType] = useState<'public' | 'practitioner'>('public')
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  
  const [formData, setFormData] = useState({
    road_type: 'Secondary road',
    cross_section: 'Two-way',
    shoulders_present: false,
    posted_speed: 50,
    typical_speed: 60,
    location: '',
    symptoms: [] as string[],
    frequency: 'cluster',
    fatalities: false,
    serious_injuries: false,
    affected_groups: [] as string[],
    causal_factors: [] as string[],
    lighting: 'Daylight',
    weather: [] as string[],
    land_use: 'Residential',
    existing_measures: [] as string[],
    crash_records: 'None',
    traffic_volume: 'None',
    road_geometry: 'None',
    photo_available: false,
    budget_bracket: 'Medium',
    timeline: 'Medium (months)',
    legal_constraints: '',
    stakeholder_priority: 'Safety',
    desired_scope: 'Engineering redesign',
    free_text: '',
    gps_start: '',
    gps_end: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles(Array.from(files))
      console.log('[v0] Media files uploaded:', Array.from(files).map(f => ({ name: f.name, size: f.size, type: f.type })))
    }
  }

  const handleCheckboxGroup = (name: string, value: string) => {
    setFormData(prev => {
      const arr = (prev as any)[name] as string[]
      if (arr.includes(value)) {
        return { ...prev, [name]: arr.filter(v => v !== value) }
      } else {
        return { ...prev, [name]: [...arr, value] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.free_text.trim()) {
      alert('Please describe the road safety issue')
      return
    }

    onSubmit({
      user_type: userType,
      free_text: formData.free_text,
      road_context: {
        road_type: formData.road_type,
        cross_section: formData.cross_section,
        shoulders_present: formData.shoulders_present,
        posted_speed: formData.posted_speed,
        typical_speed: formData.typical_speed,
        location: formData.location,
      },
      crash_issue: {
        symptoms: formData.symptoms,
        frequency: formData.frequency,
        severity_profile: {
          fatalities: formData.fatalities,
          serious_injuries: formData.serious_injuries,
          property_damage_only: !formData.fatalities && !formData.serious_injuries,
        },
      },
      user_groups: { affected_groups: formData.affected_groups },
      causal_factors: { factors: formData.causal_factors },
      environmental: {
        lighting: formData.lighting,
        weather: formData.weather,
        land_use: formData.land_use,
      },
      existing_countermeasures: { measures: formData.existing_measures },
      data_availability: {
        crash_records: formData.crash_records,
        traffic_volume: formData.traffic_volume,
        road_geometry: formData.road_geometry,
        photo_drone_imagery: formData.photo_available,
      },
      implementation_constraints: {
        budget_bracket: formData.budget_bracket,
        timeline: formData.timeline,
        legal_policy_constraints: formData.legal_constraints,
        stakeholder_priority: formData.stakeholder_priority,
        desired_scope: formData.desired_scope,
      },
      uploaded_media: uploadedFiles,
    })
  }

  // Quick path for general public
  if (userType === 'public') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setUserType('public')}
            className="px-4 py-2 rounded bg-accent text-accent-foreground text-sm font-medium"
          >
            Quick Report
          </button>
          <button
            type="button"
            onClick={() => setUserType('practitioner')}
            className="px-4 py-2 rounded border border-border bg-card text-foreground text-sm font-medium hover:bg-card/80"
          >
            Advanced Analysis
          </button>
        </div>

        <div className="p-6 rounded-lg border border-border bg-card space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Report Road Safety Issue</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Street name or intersection"
              className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Road Type *</label>
            <select
              name="road_type"
              value={formData.road_type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
            >
              <option>Motorway</option>
              <option>Primary arterial</option>
              <option>Secondary road</option>
              <option>Local street</option>
              <option>Urban multi-lane</option>
              <option>Roundabout</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">What Happened? *</label>
            <textarea
              name="free_text"
              value={formData.free_text}
              onChange={handleChange}
              placeholder="Describe the incident or safety concern (e.g., pedestrian was hit, vehicles colliding at this spot, poor visibility at night)"
              rows={4}
              className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
            />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowMediaUpload(!showMediaUpload)}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium"
            >
              <span>{showMediaUpload ? '−' : '+'}</span>
              I have photos or video
            </button>

            {showMediaUpload && (
              <div className="pl-4 border-l border-accent space-y-3">
                <div className="bg-accent/10 rounded-lg p-4">
                  <label className="block text-sm font-medium text-foreground mb-3">Upload Photos or Videos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm cursor-pointer"
                  />
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-foreground">{uploadedFiles.length} file(s) selected:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-xs">📎</span>
                            {file.name} ({(file.size / 1024).toFixed(0)} KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Get Recommendations'}
        </button>
      </form>
    )
  }

  // Advanced path for practitioners
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUserType('public')}
          className="px-4 py-2 rounded border border-border bg-card text-foreground text-sm font-medium hover:bg-card/80"
        >
          Quick Report
        </button>
        <button
          type="button"
          onClick={() => setUserType('practitioner')}
          className="px-4 py-2 rounded bg-accent text-accent-foreground text-sm font-medium"
        >
          Advanced Analysis
        </button>
      </div>

      {/* Road Context Section */}
      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-base font-semibold text-foreground">Road Context</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Road Type</label>
            <select name="road_type" value={formData.road_type} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option>Motorway</option>
              <option>Primary arterial</option>
              <option>Secondary road</option>
              <option>Collector</option>
              <option>Local street</option>
              <option>Rural single-lane</option>
              <option>Urban multi-lane</option>
              <option>Roundabout</option>
              <option>Intersection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cross-section</label>
            <select name="cross_section" value={formData.cross_section} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option>Two-way</option>
              <option>One-way</option>
              <option>Median present</option>
              <option>No median</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Posted Speed (km/h)</label>
            <input type="number" name="posted_speed" value={formData.posted_speed} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Typical Speed (km/h)</label>
            <input type="number" name="typical_speed" value={formData.typical_speed} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm" />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="shoulders_present" checked={formData.shoulders_present} onChange={handleChange} className="rounded" />
            <span className="text-sm text-foreground">Shoulders present</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Street name or lat,lon" className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm" />
        </div>
      </div>

      {/* Crash/Issue Type Section */}
      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-base font-semibold text-foreground">Crash/Issue Type</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Symptoms</label>
          <div className="grid grid-cols-2 gap-2">
            {['Single-vehicle run-off', 'Head-on', 'Rear-end', 'Angle', 'Pedestrian struck', 'Cyclist struck', 'Sideswipe', 'Skidding'].map(symptom => (
              <label key={symptom} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => handleCheckboxGroup('symptoms', symptom)}
                  className="rounded"
                />
                <span className="text-sm text-foreground">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Frequency</label>
            <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option value="single">Single crash</option>
              <option value="repeated">Repeated crashes</option>
              <option value="cluster">Cluster</option>
              <option value="hotspot">Hotspot</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.fatalities} onChange={() => setFormData(prev => ({ ...prev, fatalities: !prev.fatalities }))} className="rounded" />
              <span className="text-sm text-foreground">Fatalities present</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.serious_injuries} onChange={() => setFormData(prev => ({ ...prev, serious_injuries: !prev.serious_injuries }))} className="rounded" />
              <span className="text-sm text-foreground">Serious injuries</span>
            </label>
          </div>
        </div>
      </div>

      {/* User Groups & Causal Factors Section */}
      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-base font-semibold text-foreground">Affected Groups & Factors</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Affected User Groups</label>
          <div className="grid grid-cols-2 gap-2">
            {['Motor vehicles', 'Motorcyclists', 'Pedestrians', 'Cyclists', 'Heavy vehicles', 'School children'].map(group => (
              <label key={group} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.affected_groups.includes(group)}
                  onChange={() => handleCheckboxGroup('affected_groups', group)}
                  className="rounded"
                />
                <span className="text-sm text-foreground">{group}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Causal Factors</label>
          <div className="grid grid-cols-2 gap-2">
            {['Speeding', 'Poor sight distance', 'Sharp curve', 'Poor pavement', 'Narrow shoulder', 'Missing signage', 'Inadequate lighting', 'Vehicle mix'].map(factor => (
              <label key={factor} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.causal_factors.includes(factor)}
                  onChange={() => handleCheckboxGroup('causal_factors', factor)}
                  className="rounded"
                />
                <span className="text-sm text-foreground">{factor}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental & Implementation Section */}
      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-base font-semibold text-foreground">Environment & Constraints</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Lighting</label>
            <select name="lighting" value={formData.lighting} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option>Daylight</option>
              <option>Night</option>
              <option>Dawn-Dusk</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Land Use</label>
            <select name="land_use" value={formData.land_use} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
              <option>Rural</option>
              <option>School zone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Budget</label>
            <select name="budget_bracket" value={formData.budget_bracket} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option value="Very low">Very low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Timeline</label>
            <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
              <option>Immediate</option>
              <option>Short (weeks)</option>
              <option>Medium (months)</option>
              <option>Long (years)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Desired Scope</label>
          <select name="desired_scope" value={formData.desired_scope} onChange={handleChange} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm">
            <option>Quick fix</option>
            <option>Low-cost infrastructure</option>
            <option>Engineering redesign</option>
            <option>Behavioural</option>
            <option>Enforcement</option>
            <option>Multi-layered</option>
          </select>
        </div>
      </div>

      {/* Free Text Section */}
      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-base font-semibold text-foreground">Additional Context</h3>
        <textarea
          name="free_text"
          value={formData.free_text}
          onChange={handleChange}
          placeholder="Describe local context, observed patterns, and any specific concerns not covered above..."
          rows={4}
          className="w-full px-3 py-2 rounded bg-input border border-border text-foreground text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Generate Recommendations'}
      </button>
    </form>
  )
}
