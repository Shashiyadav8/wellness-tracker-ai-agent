import React, { useState, useEffect } from 'react';
import { Monitor, Droplet, Footprints, Moon, Flame } from 'lucide-react';
import SummaryCard from './SummaryCard';
import { useWellness } from '../../hooks/useWellnessData';
import { healthTips } from '../../data/foodData';
import Card from '../ui/Card';
import WaterTracker from '../features/WaterTracker';
import ActivityTracker from '../features/ActivityTracker';
import NutritionTracker from '../features/NutritionTracker';
import Recommendations from '../features/Recommendations';

const Dashboard = () => {
    const { data, getProgress } = useWellness();
    const [tip, setTip] = useState('');

    useEffect(() => {
        // Random tip on mount
        setTip(healthTips[Math.floor(Math.random() * healthTips.length)]);
    }, []);

    const calProgress = getProgress('calories');
    const waterProgress = getProgress('water');
    const stepsProgress = getProgress('steps');
    const sleepProgress = getProgress('sleep');

    return (
        <div className="dashboard-grid">
            <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--spacing-lg);
          padding-bottom: var(--spacing-xl);
        }
        .hero-section {
          grid-column: 1 / -1;
          margin-bottom: var(--spacing-md);
        }
        @media (max-width: 600px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }
        @media (max-width: 768px) {
          .quick-actions-grid {
             grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="hero-section">
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>
                    Hello, User
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Here is your daily wellness overview.
                </p>
            </div>

            {/* Food Scan Section (Top Priority) */}
            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-lg)' }}>
                <NutritionTracker />
            </div>

            <SummaryCard
                title="Calories"
                value={calProgress.value}
                unit="kcal"
                max={calProgress.goal}
                icon={Flame}
                color="var(--text-primary)" // White/Orange for flame?
                subtext={`${calProgress.goal - calProgress.value} kcal remaining`}
            />

            <SummaryCard
                title="Water"
                value={waterProgress.value}
                unit="ml"
                max={waterProgress.goal}
                icon={Droplet}
                color="var(--accent-blue)"
                subtext={`${Math.max(0, waterProgress.goal - waterProgress.value)} ml to goal`}
            />

            <SummaryCard
                title="Steps"
                value={stepsProgress.value}
                unit="steps"
                max={stepsProgress.goal}
                icon={Footprints}
                color="var(--accent-green)"
                subtext={`${Math.max(0, stepsProgress.goal - stepsProgress.value)} steps to goal`}
            />

            <SummaryCard
                title="Sleep"
                value={stepsProgress.sleep || data.sleep} // Fix variable
                unit="hrs"
                max={stepsProgress.goal || 8} // Sleep goal usually 8
                icon={Moon}
                color="var(--accent-purple)"
                subtext={data.sleep >= 7 ? "Great rest!" : "Aim for 8 hours"}
            />

            {/* Health Tip Card */}
            <Card className="tip-card" style={{ gridColumn: '1 / -1', background: 'var(--gradient-card)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-sm)', color: 'var(--accent-teal)' }}>
                    <Monitor size={18} /> Daily Insight
                </h3>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    "{tip}"
                </p>
            </Card>
            {/* Trackers Section */}
            <div style={{ gridColumn: '1 / -1', marginTop: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Quick Actions</h3>
                <div className="quick-actions-grid">
                    <WaterTracker />
                    <ActivityTracker />
                </div>
                <div style={{ marginTop: 'var(--spacing-lg)' }}>
                    <Recommendations />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;

