"use client"

import React from 'react'
import Link from 'next/link'

interface ModuleCardProps {
  title: string
  description: string
  icon: React.ElementType
  href: string
}

export function ModuleCard({ title, description, icon: Icon, href }: ModuleCardProps) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-lg border border-border bg-card hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        <div className="text-4xl mb-3">
          <Icon />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
