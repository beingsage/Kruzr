'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/shared/file-uploader'

export function StandardsManagement() {
  const [standards, setStandards] = useState([
    { code: 'IRC 35', title: 'Code of Road Accidents', status: 'indexed', clauses: 245 },
    { code: 'IRC 67', title: 'Road Signs and Markings', status: 'indexed', clauses: 156 },
    { code: 'IRC 99', title: 'Non-Motorized Users', status: 'indexed', clauses: 89 },
  ])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (files: File[]) => {
    setUploading(true)
    setMessage('Uploading standards...')
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMessage(`Successfully uploaded ${files.length} standard(s)`)
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setUploading(false)
    }
  }

  const triggerEmbedding = async () => {
    setMessage('Building embeddings...')
    try {
      const response = await fetch('/api/admin/build-embeddings', {
        method: 'POST',
      })
      if (response.ok) {
        setMessage('Embeddings built successfully!')
      } else {
        setMessage('Error building embeddings')
      }
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {message && (
        <div className="p-4 rounded-lg bg-accent/20 text-accent border border-accent/30">
          {message}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload New Standards</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload IRC standard PDFs to ingest into the system
        </p>
        <FileUploader
          onFilesSelected={handleUpload}
          accept=".pdf"
          multiple={true}
          label="Upload IRC Standards"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Indexed Standards</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Code</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Title</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Clauses</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {standards.map((std) => (
                <tr key={std.code} className="border-b border-border hover:bg-input/30">
                  <td className="px-4 py-3 font-medium text-foreground">{std.code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{std.title}</td>
                  <td className="px-4 py-3 text-center text-foreground">{std.clauses}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-300">
                      {std.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-xs text-accent hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
        <h4 className="font-semibold text-foreground mb-2">Vector Database Status</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Total indexed clauses: 490 | Embeddings: Generated | Last updated: 2 days ago
        </p>
        <button
          onClick={triggerEmbedding}
          className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
        >
          Rebuild Embeddings
        </button>
      </div>
    </div>
  )
}
