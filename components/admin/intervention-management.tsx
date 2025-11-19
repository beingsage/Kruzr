'use client'

import { useState } from 'react'

export function InterventionManagement() {
  const [interventions] = useState([
    {
      id: 'INT-001',
      title: 'Road Resurfacing',
      category: 'Pavement',
      clauses: 3,
      active: true,
    },
    {
      id: 'INT-002',
      title: 'Road Markings Installation',
      category: 'Markings',
      clauses: 2,
      active: true,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Adding intervention:', formData)
    setFormData({ title: '', category: 'Other', description: '' })
    setShowForm(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Intervention Database</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-colors"
        >
          Add Intervention
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-input border border-border space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded bg-card border border-border text-foreground text-sm"
              placeholder="Intervention title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded bg-card border border-border text-foreground text-sm"
            >
              <option>Pavement</option>
              <option>Markings</option>
              <option>Signage</option>
              <option>Delineators</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded bg-card border border-border text-foreground text-sm"
              placeholder="Intervention description"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-3 py-2 rounded border border-border text-foreground text-sm hover:bg-card/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Title</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground">Category</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground">Clauses</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((int) => (
              <tr key={int.id} className="border-b border-border hover:bg-input/30">
                <td className="px-4 py-3 font-medium text-foreground">{int.id}</td>
                <td className="px-4 py-3 text-muted-foreground">{int.title}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 rounded text-xs bg-secondary/30 text-secondary-foreground">
                    {int.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-foreground">{int.clauses}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    int.active
                      ? 'bg-green-900/30 text-green-300'
                      : 'bg-gray-900/30 text-gray-300'
                  }`}>
                    {int.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
