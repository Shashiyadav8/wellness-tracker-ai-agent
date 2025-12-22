import React from 'react';
import Card from '../ui/Card';
import { Droplet, Plus, Minus } from 'lucide-react';
import { useWellness } from '../../hooks/useWellnessData';

const WaterTracker = () => {
    const { data, addWater, getProgress } = useWellness();
    const { value, goal, percentage } = getProgress('water');

    return (
        <Card className="water-tracker" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1))' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>Water Intake</h3>
                <Droplet color="var(--accent-blue)" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                <div>
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{value}</span>
                    <span style={{ color: 'var(--text-muted)' }}> / {goal} ml</span>
                </div>
                <div style={{ padding: '4px 12px', background: 'rgba(59,130,246,0.2)', borderRadius: '1rem', color: 'var(--accent-blue)' }}>
                    {percentage}%
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <button
                    onClick={() => addWater(250)}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-blue)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                    }}
                >
                    <Plus size={16} /> 250ml
                </button>
                <button
                    onClick={() => addWater(500)}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-teal)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                    }}
                >
                    <Plus size={16} /> 500ml
                </button>
            </div>
            <button
                onClick={() => addWater(-250)}
                style={{
                    marginTop: 'var(--spacing-sm)',
                    width: '100%',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                }}
            >
                Undo (250ml)
            </button>
        </Card>
    );
};

export default WaterTracker;
