'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ModuleCard } from '@/components/module-card'
import { BarChart3, FileText, Video, DollarSign, BookOpen, Settings } from 'lucide-react'

export default function Home() {
  const modules = [
    {
      id: 'intervention',
      title: 'Intervention GPT',
      description: 'AI-powered recommendations based on road audit data',
      icon: BarChart3,
      href: '/intervention-gpt',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'cost',
      title: 'Cost Estimator',
      description: 'Estimate material and labor costs for interventions',
      icon: DollarSign,
      href: '/cost-estimator',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'video',
      title: 'Video Analysis',
      description: 'Comparative analysis of road deterioration from videos',
      icon: Video,
      href: '/video-analysis',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate and manage audit and intervention reports',
      icon: FileText,
      href: '/reports',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'clauses',
      title: 'Standards Explorer',
      description: 'Search and browse IRC road safety standards',
      icon: BookOpen,
      href: '/clauses',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Manage standards, interventions, and ETL pipelines',
      icon: Settings,
      href: '/admin',
      color: 'from-slate-600 to-slate-700',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                Kruzr Road Safety Suite
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive AI-powered platform for road safety interventions, analysis, and governance compliance
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-16">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-muted-foreground">Core Modules</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Standards</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-accent mb-2">AI-Powered</div>
                <div className="text-sm text-muted-foreground">Recommendations</div>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
