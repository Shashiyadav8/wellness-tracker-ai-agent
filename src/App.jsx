import { useState, useEffect } from 'react'
import { Monitor, Droplet, Footprints, Utensils, Home, BarChart2 } from 'lucide-react'
import { WellnessProvider } from './hooks/useWellnessData'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <WellnessProvider>
      <div className="app-container">
        <header style={{
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Wellness Tracker
          </h1>
          {/* Simple Tab Nav placeholder for now */}
          <nav style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button style={{ color: 'var(--text-primary)', background: 'transparent' }}><Home size={24} /></button>
          </nav>
        </header>

        <main style={{ padding: 'var(--spacing-lg)', maxWidth: '1200px', margin: '0 auto' }}>
          <Dashboard />
        </main>
      </div>
    </WellnessProvider>
  )
}

export default App
