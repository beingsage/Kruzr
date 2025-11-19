'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/shared/file-uploader'

interface VideoUploadSectionProps {
  onAnalyze: (baseVideo: File, presentVideo: File) => void
}

export function VideoUploadSection({ onAnalyze }: VideoUploadSectionProps) {
  const [baseVideo, setBaseVideo] = useState<File | null>(null)
  const [presentVideo, setPresentVideo] = useState<File | null>(null)

  const handleBaseVideoSelected = (files: File[]) => {
    if (files.length > 0) setBaseVideo(files[0])
  }

  const handlePresentVideoSelected = (files: File[]) => {
    if (files.length > 0) setPresentVideo(files[0])
  }

  const handleAnalyze = () => {
    if (baseVideo && presentVideo) {
      onAnalyze(baseVideo, presentVideo)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Base Video (Reference)</h2>
        <p className="text-sm text-muted-foreground">
          Upload the original/baseline video of the road condition
        </p>
        <FileUploader
          onFilesSelected={handleBaseVideoSelected}
          accept=".mp4,.mov,.avi"
          multiple={false}
          label="Upload base video"
        />
        {baseVideo && (
          <p className="text-sm text-accent font-medium">
            Selected: {baseVideo.name}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Present Video (Current)</h2>
        <p className="text-sm text-muted-foreground">
          Upload the recent video of the same road segment
        </p>
        <FileUploader
          onFilesSelected={handlePresentVideoSelected}
          accept=".mp4,.mov,.avi"
          multiple={false}
          label="Upload present video"
        />
        {presentVideo && (
          <p className="text-sm text-accent font-medium">
            Selected: {presentVideo.name}
          </p>
        )}
      </div>

      <div className="lg:col-span-2">
        <button
          onClick={handleAnalyze}
          disabled={!baseVideo || !presentVideo}
          className="w-full px-4 py-3 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          Run Comparative Analysis
        </button>
      </div>
    </div>
  )
}
