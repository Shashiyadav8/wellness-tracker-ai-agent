import React, { useState } from 'react';
import Card from '../ui/Card';
import { Footprints, Moon, Save } from 'lucide-react';
import { useWellness } from '../../hooks/useWellnessData';

const ActivityTracker = () => {
    const { data, updateSteps, updateSleep } = useWellness();
    const [stepsInput, setStepsInput] = useState(data.steps || '');
    const [sleepInput, setSleepInput] = useState(data.sleep || '');

    const handleStepSave = () => {
        updateSteps(Number(stepsInput));
    };

    const handleSleepSave = () => {
        updateSleep(Number(sleepInput));
    };

    return (
        <Card className="activity-tracker">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Daily Activity</h3>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '0.9rem' }}>
                    <Footprints size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '5px' }} />
                    Steps Count
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="number"
                        value={stepsInput}
                        onChange={(e) => setStepsInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)'
                        }}
                        placeholder="0"
                    />
                    <button
                        onClick={handleStepSave}
                        style={{
                            padding: '10px 15px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--accent-green)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={18} />
                    </button>
                </div>
            </div>

            <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '0.9rem' }}>
                    <Moon size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '5px' }} />
                    Sleep Duration (Hours)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="number"
                        value={sleepInput}
                        onChange={(e) => setSleepInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)'
                        }}
                        placeholder="0"
                    />
                    <button
                        onClick={handleSleepSave}
                        style={{
                            padding: '10px 15px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--accent-purple)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={18} />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default ActivityTracker;
