import React, { useState, useEffect } from 'react';
import { Monitor, Droplet, Footprints, Moon, Flame, Dumbbell, Wheat, Anchor } from 'lucide-react';
import SummaryCard from './SummaryCard';
import { useWellness } from '../../hooks/useWellnessData';
import { healthTips } from '../../data/foodData';
import Card from '../ui/Card';
import WaterTracker from '../features/WaterTracker';
import ActivityTracker from '../features/ActivityTracker';
import NutritionTracker from '../features/NutritionTracker';
import Recommendations from '../features/Recommendations';

const DAILY_GOALS = {
    calories: 2000,
    protein: 60,
    carbs: 250,
    iron: 18
};

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

    // Calculate Macros from Food Log
    const todaysTotals = (data.foodLog || []).reduce((acc, item) => ({
        // calories: acc.calories + (Number(item.calories) || 0), // Already tracked by calProgress
        protein: acc.protein + (Number(item.protein) || 0),
        carbs: acc.carbs + (Number(item.carbs) || 0),
        iron: acc.iron + (Number(item.iron) || 0)
    }), { protein: 0, carbs: 0, iron: 0 });

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

            {/* Nutrition & Wellness Cards */}
            <SummaryCard
                title="Calories"
                value={calProgress.value}
                unit="kcal"
                max={calProgress.goal}
                icon={Flame}
                color="#f97316" // Orange
                subtext={`${calProgress.goal - calProgress.value} kcal remaining`}
            />

            <SummaryCard
                title="Protein"
                value={todaysTotals.protein}
                unit="g"
                max={DAILY_GOALS.protein}
                icon={Dumbbell}
                color="#22c55e" // Green
                subtext={`${Math.max(0, DAILY_GOALS.protein - todaysTotals.protein)}g to goal`}
            />

            <SummaryCard
                title="Carbs"
                value={todaysTotals.carbs}
                unit="g"
                max={DAILY_GOALS.carbs}
                icon={Wheat}
                color="#eab308" // Yellow
                subtext={`${Math.max(0, DAILY_GOALS.carbs - todaysTotals.carbs)}g to goal`}
            />

            <SummaryCard
                title="Iron"
                value={todaysTotals.iron}
                unit="mg"
                max={DAILY_GOALS.iron}
                icon={Anchor} // Anchor as symbol for heavy/iron/strength
                color="#ec4899" // Pink
                subtext={`${Math.max(0, DAILY_GOALS.iron - todaysTotals.iron)}mg to goal`}
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
                value={stepsProgress.sleep || data.sleep}
                unit="hrs"
                max={8}
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

