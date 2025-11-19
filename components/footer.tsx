export function Footer() {
  return (
    <footer className="border-t border-border bg-card/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Kruzr</h3>
            <p className="text-sm text-muted-foreground">
              Road Safety Intervention GPT Suite
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Modules</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/intervention-gpt" className="hover:text-accent transition-colors">Intervention GPT</a></li>
              <li><a href="/cost-estimator" className="hover:text-accent transition-colors">Cost Estimator</a></li>
              <li><a href="/video-analysis" className="hover:text-accent transition-colors">Video Analysis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Standards</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>IRC 35: Code of Road Accidents</li>
              <li>IRC 67: Road Signs and Road Markings</li>
              <li>IRC 99: Facilities for Non-Motorized Users</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Kruzr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
