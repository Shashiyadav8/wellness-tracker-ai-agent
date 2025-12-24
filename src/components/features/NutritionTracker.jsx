import React, { useState } from 'react';
import Card from '../ui/Card';
import { Utensils, Plus, Trash2 } from 'lucide-react';
import { useWellness } from '../../hooks/useWellnessData';
import AIAnalysisInput from './AIAnalysisInput';

const NutritionTracker = () => {
    const { data, addFood } = useWellness();
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [sugar, setSugar] = useState('');
    const [fiber, setFiber] = useState('');

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!foodName || !calories) return;

        addFood({
            id: Date.now(),
            name: foodName,
            calories: Number(calories),
            protein: Number(protein) || 0,
            carbs: Number(carbs) || 0,
            fats: Number(fats) || 0,
            sugar: Number(sugar) || 0,
            fiber: Number(fiber) || 0,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        setFoodName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        setSugar('');
        setFiber('');
    };

    const handleAIComplete = (result) => {
        setFoodName(result.name);
        setCalories(result.calories);
        setProtein(result.protein);
        setCarbs(result.carbs);
        setFats(result.fats);
        setSugar(result.sugar);
        setFiber(result.fiber);
    };

    return (
        <div className="nutrition-grid">
            <style>{`
                .nutrition-grid {
                    display: grid;
                    gap: var(--spacing-lg);
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                .nutrition-input-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
                    gap: var(--spacing-md);
                }
                @media (max-width: 768px) {
                    .nutrition-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 480px) {
                    .nutrition-input-grid {
                        grid-template-columns: 1fr 1fr; /* Force 2 columns on mobile for better touch targets */
                        gap: var(--spacing-sm);
                    }
                    .manual-editor-card,
                    .todays-log-card {
                        max-width: 72%;
                    }
                }
                @media (max-width: 400px) {
                    .manual-editor-card,
                    .todays-log-card {
                        max-width: 62%;
                    }
                }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {/* AI Input */}
                <AIAnalysisInput onAnalysisComplete={handleAIComplete} />

                {/* Add Food Form */}
                <Card className="manual-editor-card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
                        <Utensils display="inline" size={20} style={{ marginRight: '8px' }} />
                        Manual / Editor
                    </h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Food Name (e.g., Oat Meal)"
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <div className="nutrition-input-grid">
                            <input
                                type="number"
                                placeholder="Calories"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                            <input
                                type="number"
                                placeholder="Protein (g)"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                            <input
                                type="number"
                                placeholder="Carbs (g)"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                            <input
                                type="number"
                                placeholder="Fats (g)"
                                value={fats}
                                onChange={(e) => setFats(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                            <input
                                type="number"
                                placeholder="Sugar (g)"
                                value={sugar}
                                onChange={(e) => setSugar(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                            <input
                                type="number"
                                placeholder="Fiber (g)"
                                value={fiber}
                                onChange={(e) => setFiber(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            <Plus size={18} /> Add Food
                        </button>
                    </form>
                </Card>
            </div>

            {/* Food Log List */}
            <Card className="todays-log-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Today's Log</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {data.foodLog && data.foodLog.length > 0 ? (
                        data.foodLog.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ flex: 1, minWidth: 0, paddingRight: '10px' }}>
                                    <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                                        <span>{item.timestamp}</span>
                                        <span>• Calories: {item.calories}</span>
                                        <span>• Proteins: {item.protein}g</span>
                                        <span>• Carbohydrates: {item.carbs}g</span>
                                        <span>• Fats: {item.fats}g</span>
                                        {(item.sugar > 0) && <span>• Sugar: {item.sugar}g</span>}
                                        {(item.fiber > 0) && <span>• Fiber: {item.fiber}g</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: '20px 0' }}>No food logged today.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default NutritionTracker;
