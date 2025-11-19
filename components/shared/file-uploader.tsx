'use client'

import { useRef, useState } from 'react'

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  label?: string
}

export function FileUploader({
  onFilesSelected,
  accept = '.pdf,.jpg,.jpeg,.png,.mp4',
  multiple = true,
  label = 'Upload Files'
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => inputRef.current?.click()

  const handleFiles = (files: FileList | null) => {
    if (files) {
      onFilesSelected(Array.from(files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        isDragging
          ? 'border-accent bg-accent/10'
          : 'border-border hover:border-accent/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="text-center">
        <div className="text-3xl mb-2">📁</div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop files here or click to browse
        </p>
      </div>
    </div>
  )
}
