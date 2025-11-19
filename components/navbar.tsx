'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)

  const isActive = (href: string) => pathname === href

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsSignedIn(true)
      setShowAuthModal(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  return (
    <>
      <nav className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-accent flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Kruzr</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {[
                { href: '/intervention-gpt', label: 'Intervention' },
                { href: '/cost-estimator', label: 'Cost' },
                { href: '/video-analysis', label: 'Analysis' },
                { href: '/reports', label: 'Reports' },
                { href: '/clauses', label: 'Standards' },
                { href: '/admin', label: 'Admin' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded text-sm transition-colors ${
                    isActive(href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-card/50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {isSignedIn ? (
                <>
                  <span className="text-sm text-foreground">{email}</span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-card border border-border rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Sign In to Kruzr</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-input border border-border text-foreground"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-input border border-border text-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 rounded border border-border text-foreground hover:bg-card/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
