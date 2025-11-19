export interface RoadContext {
  road_type: 'Motorway' | 'Primary arterial' | 'Secondary road' | 'Collector' | 'Local street' | 'Rural single-lane' | 'Urban multi-lane' | 'Roundabout' | 'Intersection'
  cross_section: 'Two-way' | 'One-way' | 'Median present' | 'No median'
  shoulders_present: boolean
  posted_speed: number
  typical_speed: number
  location: string
}

export interface CrashIssue {
  symptoms: ('Single-vehicle run-off' | 'Head-on' | 'Rear-end' | 'Angle' | 'Pedestrian struck' | 'Cyclist struck' | 'Sideswipe' | 'Multi-vehicle pile-up' | 'Skidding' | 'Visibility-related')[]
  frequency: 'single' | 'repeated' | 'cluster' | 'hotspot'
  severity_profile: {
    fatalities: boolean
    serious_injuries: boolean
    property_damage_only: boolean
  }
}

export interface UserGroups {
  affected_groups: ('Motor vehicles' | 'Motorcyclists' | 'Pedestrians' | 'Cyclists' | 'Heavy vehicles' | 'School children' | 'Elderly')[]
}

export interface CausalFactors {
  factors: ('Speeding' | 'Poor sight distance' | 'Sharp curve' | 'Poor pavement' | 'Narrow shoulder' | 'Missing signage' | 'Inadequate lighting' | 'Poor drainage' | 'Intersection complexity' | 'Non-compliance' | 'High pedestrian exposure' | 'Vehicle mix' | 'Alcohol/Drug use')[]
}

export interface EnvironmentalContext {
  lighting: 'Daylight' | 'Night' | 'Dawn-Dusk'
  weather: ('Dry' | 'Wet' | 'Fog' | 'Ice' | 'Snow' | 'Seasonal extremes')[]
  land_use: 'Residential' | 'Commercial' | 'Industrial' | 'Rural' | 'School zone'
}

export interface ExistingCountermeasures {
  measures: ('Signs only' | 'Markings only' | 'Speed enforcement' | 'Signal' | 'Roundabout' | 'Pedestrian crossing' | 'Speed hump' | 'Median' | 'Guardrail' | 'Lighting' | 'Shoulder' | 'Bike lane')[]
}

export interface DataAvailability {
  crash_records: 'CSV' | 'Shapefile' | 'Anecdotal' | 'None'
  traffic_volume: 'AADT available' | 'Estimate available' | 'None'
  road_geometry: 'Plans available' | 'Estimate' | 'None'
  photo_drone_imagery: boolean
}

export interface ImplementationConstraints {
  budget_bracket: 'Very low' | 'Low' | 'Medium' | 'High'
  timeline: 'Immediate' | 'Short (weeks)' | 'Medium (months)' | 'Long (years)'
  legal_policy_constraints: string
  stakeholder_priority: 'Safety' | 'Traffic flow' | 'Freight' | 'Environment'
  desired_scope: 'Quick fix' | 'Low-cost infrastructure' | 'Engineering redesign' | 'Behavioural' | 'Enforcement' | 'Policy' | 'Multi-layered'
}

export interface ClassifiedInput {
  user_type: 'public' | 'practitioner' | 'ministry'
  free_text: string
  road_context: RoadContext
  crash_issue: CrashIssue
  user_groups: UserGroups
  causal_factors: CausalFactors
  environmental: EnvironmentalContext
  existing_countermeasures: ExistingCountermeasures
  data_availability: DataAvailability
  implementation_constraints: ImplementationConstraints
}

export interface RankedIntervention {
  db_id: string
  intervention_id: string
  rank: number
  score: number
  title: string
  description: string
  why_matched: string
  confidence: 'High' | 'Medium' | 'Low'
  confidence_score: number
  db_references: string[]
  required_data: string[]
  cost_class: 'Very low' | 'Low' | 'Medium' | 'High'
  implementation_steps: string[]
  validation_data_needed: string[]
  evidence_from_db: string
}

export interface RecommendationOutput {
  audit_id: string
  location: string
  classified_input: ClassifiedInput
  ranked_interventions: RankedIntervention[]
  confidence_band: 'High' | 'Medium' | 'Low'
  data_gaps: string[]
  next_steps: string[]
  timestamp: string
}

export interface Intervention {
  intervention_id: string
  type: string
  severity: string
  confidence: number
  ircClause: string
  description: string
  cost: number
  why_matched?: string
  confidence_score?: number
}

export interface ReportDatabase {
  id: string
  title: string
  summary: string
  evidence_strength: 'High' | 'Medium' | 'Low'
  cost_class: 'Very low' | 'Low' | 'Medium' | 'High'
  category: string
  components?: string[]
}

export interface InterventionPackage {
  title: string
  rank: number
  components: {
    engineering?: string
    enforcement?: string
    education?: string
    policy?: string
  }
  why_matched: string
  required_data: string[]
  cost_class: string
  timeline: string
  confidence: string
  what_would_change: string
}

export interface RoadSafetyReport {
  id: string
  audit_id: string
  location: string
  road_type: string
  posted_speed: number
  operating_speed_est: number
  aadt: number
  period: string
  crash_count: number
  fatalities: number
  serious_injuries: number
  minor_injuries: number
  user_groups: string[]
  factors: string[]
  existing_countermeasures: string[]
  cover_page: {
    title: string
    location: string
    description: string
    date: string
    authors: string
    impact_metric: string
  }
  executive_summary: {
    problem: string
    top_packages: InterventionPackage[]
    expected_impact: string
    confidence_band: string
    next_step: string
  }
  situation_snapshot: Record<string, any>
  analysis: {
    root_causes: Array<{ cause: string; evidence_ref: string }>
    risk_scores: Record<string, number>
  }
  packages: InterventionPackage[]
  implementation_plan: {
    immediate: string[]
    short_term: string[]
    medium_term: string[]
    responsibilities: Record<string, string>
    permits: string[]
  }
  monitoring_evaluation: {
    kpis: Array<{ name: string; baseline: string; target: string }>
    data_collection: string
    cadence: string
  }
  summaries: {
    general_public: string
    practitioners: string
    researchers: string
    ministry: string
    investigation: string
  }
  appendices: {
    data_table: string
    db_references: Array<{ id: string; title: string; evidence_strength: string }>
    cost_estimates: string
  }
  generated_at: Date
  interventions: Intervention[]
  cost_estimates: any[]
  clauses_cited: any[]
  summary: string
}

export interface CostEstimate {
  id: string
  intervention_id: string
  items: Array<{
    item_code: string
    description: string
    unit: string
    quantity: number
    unit_rate: number
    total_cost: number
    source: 'CPWD' | 'GeM' | 'Market'
  }>
  total_material_cost: number
  total_labor_cost: number
  total_estimated_cost: number
  unit: string
  source: string
}

export interface VideoAnalysis {
  id: string
  audit_id: string
  base_video_url: string
  present_video_url: string
  analysis_status: 'processing' | 'completed' | 'failed'
  detected_elements: {
    pavement: ChangeDetection
    markings: ChangeDetection
    signage: ChangeDetection
    delineators: ChangeDetection
    hazards: ChangeDetection
  }
  overall_deterioration_score: number
  recommendations: string[]
  created_at: Date
  updated_at: Date
}

export interface ChangeDetection {
  detected: boolean
  severity: 'Low' | 'Medium' | 'High'
  confidence: number
  description: string
  area_affected?: string
}
