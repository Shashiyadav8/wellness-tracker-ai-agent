import React from 'react';
import Card from '../ui/Card';
import { Droplet, Plus, Minus } from 'lucide-react';
import { useWellness } from '../../hooks/useWellnessData';

const WaterTracker = () => {
    const { data, addWater, getProgress } = useWellness();
    const { value, goal, percentage } = getProgress('water');

    return (
        <Card className="water-tracker" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1))' }}>
            <style>{`
                .water-tracker {
                    width: 620px;
                    height: 950px;
                    max-width: 100vw;
                    max-height: 100vh;
                    margin-left: 0;
                    margin-right: auto;
                    padding: 2.5rem 2rem 2.5rem 2rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }
                .water-header {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.75rem;
                    margin-bottom: var(--spacing-md);
                }
                .water-header h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0;
                }
                .water-stats {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.75rem;
                    margin-bottom: var(--spacing-md);
                    width: 100%;
                }
                .water-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--accent-blue);
                }
                .water-goal {
                    color: var(--text-muted);
                }
                .water-percentage {
                    padding: 4px 12px;
                    background: rgba(59,130,246,0.2);
                    border-radius: 1rem;
                    color: var(--accent-blue);
                    font-weight: 500;
                }
                .water-buttons {
                    display: flex;
                    gap: var(--spacing-sm);
                    width: 100%;
                }
                .water-btn {
                    flex: 1;
                    padding: 12px;
                    border-radius: var(--radius-md);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    white-space: nowrap;
                    font-size: 1rem;
                    border: none;
                }
                .water-btn.blue {
                    background: var(--accent-blue);
                }
                .water-btn.teal {
                    background: var(--accent-teal);
                }
                .water-undo-btn {
                    margin-top: var(--spacing-sm);
                    width: 100%;
                    padding: 8px;
                    border-radius: var(--radius-md);
                    background: rgba(255,255,255,0.05);
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.8rem;
                    border: none;
                }
                @media (max-width: 950px) {
                    .water-tracker {
                        width: 98vw;
                        height: auto;
                        min-height: 400px;
                        padding: 1.2rem 0.5rem;
                        margin-left: 0;
                        margin-right: auto;
                    }
                }
                @media (max-width: 620px) {
                    .water-tracker {
                        width: 100vw;
                        height: auto;
                        min-height: 400px;
                        padding: 0.75rem 0.1rem;
                        margin-left: 0;
                        margin-right: auto;
                    }
                    .water-header h3 {
                        font-size: 1.1rem;
                    }
                    .water-value {
                        font-size: 1.4rem;
                    }
                    .water-percentage {
                        font-size: 0.95rem;
                        padding: 3px 8px;
                    }
                    .water-btn {
                        font-size: 0.95rem;
                        padding: 10px;
                    }
                }
                @media (max-width: 480px) {
                    .water-tracker {
                        width: 100%;
                        max-width: 72%;
                        height: auto;
                        min-height: 400px;
                        padding: 0.5rem 0.01rem;
                        margin-left: 0;
                        margin-right: auto;
                    }
                    .water-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    .water-stats {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    .water-buttons {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
                @media (max-width: 400px) {
                    .water-tracker {
                        max-width: 62%;
                    }
                }
            `}</style>
            <div className="water-header">
                <h3>Water Intake</h3>
                <Droplet color="var(--accent-blue)" />
            </div>
            <div className="water-stats">
                <div>
                    <span className="water-value">{value}</span>
                    <span className="water-goal"> / {goal} ml</span>
                </div>
                <div className="water-percentage">
                    {percentage}%
                </div>
            </div>
            <div className="water-buttons">
                <button
                    onClick={() => addWater(250)}
                    className="water-btn blue"
                >
                    <Plus size={16} /> 250ml
                </button>
                <button
                    onClick={() => addWater(500)}
                    className="water-btn teal"
                >
                    <Plus size={16} /> 500ml
                </button>
            </div>
            <button
                onClick={() => addWater(-250)}
                className="water-undo-btn"
            >
                Undo (250ml)
            </button>
        </Card>
    );
};

export default WaterTracker;
