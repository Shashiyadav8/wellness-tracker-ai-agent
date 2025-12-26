import React from 'react';
import Card from '../ui/Card';
import { Utensils } from 'lucide-react';
import { useWellness } from '../../hooks/useWellnessData';

const DAILY_GOALS = {
    calories: 2000,
    protein: 60,
    carbs: 250,
    iron: 18
};

const NutritionIntakeCard = () => {
    const { data } = useWellness();

    const todaysTotals = (data.foodLog || []).reduce((acc, item) => ({
        calories: acc.calories + (Number(item.calories) || 0),
        protein: acc.protein + (Number(item.protein) || 0),
        carbs: acc.carbs + (Number(item.carbs) || 0),
        iron: acc.iron + (Number(item.iron) || 0)
    }), { calories: 0, protein: 0, carbs: 0, iron: 0 });

    const getProgress = (current, goal) => Math.min(Math.round((current / goal) * 100), 100);

    return (
        <Card className="summary-card" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <style>{`
                .nutrient-row {
                    margin-bottom: 12px;
                }
                .nutrient-label {
                    display: flex;
                    justify-content: space-between;
                    color: var(--text-muted); /* Match SummaryCard subtext color */
                    font-size: 0.85rem;
                    margin-bottom: 6px;
                }
                .progress-bg {
                    height: 6px;
                    background: var(--bg-secondary); /* Use var for consistency */
                    border-radius: 10px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s ease-out;
                }
                /* Reuse media query from SummaryCard if needed, but 'summary-card' class might handle it */
            `}</style>

            {/* Header matching SummaryCard: Title Left, Icon Right */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Nutrition Intake</h3>
                <Utensils size={20} color="var(--text-primary)" />
            </div>

            <div className="nutrient-row">
                <div className="nutrient-label">
                    <span>Calories</span>
                    <span>{getProgress(todaysTotals.calories, DAILY_GOALS.calories)}%</span>
                </div>
                <div className="progress-bg">
                    <div
                        className="progress-fill"
                        style={{ width: `${getProgress(todaysTotals.calories, DAILY_GOALS.calories)}%`, background: '#3b82f6' }}
                    ></div>
                </div>
            </div>

            <div className="nutrient-row">
                <div className="nutrient-label">
                    <span>Protein</span>
                    <span>{getProgress(todaysTotals.protein, DAILY_GOALS.protein)}%</span>
                </div>
                <div className="progress-bg">
                    <div
                        className="progress-fill"
                        style={{ width: `${getProgress(todaysTotals.protein, DAILY_GOALS.protein)}%`, background: '#22c55e' }}
                    ></div>
                </div>
            </div>

            <div className="nutrient-row">
                <div className="nutrient-label">
                    <span>Carbs</span>
                    <span>{getProgress(todaysTotals.carbs, DAILY_GOALS.carbs)}%</span>
                </div>
                <div className="progress-bg">
                    <div
                        className="progress-fill"
                        style={{ width: `${getProgress(todaysTotals.carbs, DAILY_GOALS.carbs)}%`, background: '#eab308' }}
                    ></div>
                </div>
            </div>

            <div className="nutrient-row">
                <div className="nutrient-label">
                    <span>Iron</span>
                    <span>{getProgress(todaysTotals.iron, DAILY_GOALS.iron)}%</span>
                </div>
                <div className="progress-bg">
                    <div
                        className="progress-fill"
                        style={{ width: `${getProgress(todaysTotals.iron, DAILY_GOALS.iron)}%`, background: '#ec4899' }}
                    ></div>
                </div>
            </div>

            {/* Removed the big blue button to better match the 'passive' look of other summary cards, 
                or we can keep it but style it subtly? 
                User said "display like other sections... like water and steps". 
                Water/Steps don't have big buttons. I'll make it a link or text if needed, 
                but for now I'll remove the button to match the clean look. 
                If interaction is needed, the whole card could be clickable. */}

        </Card>
    );
};

export default NutritionIntakeCard;
