import React, { useState } from 'react';
import Card from '../ui/Card';
import { useWellness } from '../../hooks/useWellnessData';
import AIAnalysisInput from './AIAnalysisInput';

const NutritionTracker = () => {
    const { data, addFood } = useWellness();

    const handleAIComplete = (result, isImage) => {
        if (isImage) {
            // Auto-add for image uploads
            addFood({
                id: Date.now(),
                name: result.name,
                calories: Number(result.calories),
                protein: Number(result.protein) || 0,
                carbs: Number(result.carbs) || 0,
                fats: Number(result.fats) || 0,
                sugar: Number(result.sugar) || 0,
                fiber: Number(result.fiber) || 0,
                iron: Number(result.iron) || 0,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
        // Text analysis no longer supported via manual form here (per request logic implies removing manual add completely).
        // However, if text input is still allowed in AIAnalysisInput, we need to handle it.
        // Assuming "remove manual adding" means removing the big form. 
        // If text AI result comes back, we should probably auto-add it too for consistency, 
        // OR simply just support image auto-add and ignore text based on "remove manual adding".
        // Let's safe-guard: if result comes back (text or image), just auto-add it since the manual form is gone.
        else {
            addFood({
                id: Date.now(),
                name: result.name,
                calories: Number(result.calories),
                protein: Number(result.protein) || 0,
                carbs: Number(result.carbs) || 0,
                fats: Number(result.fats) || 0,
                sugar: Number(result.sugar) || 0,
                fiber: Number(result.fiber) || 0,
                iron: Number(result.iron) || 0,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
    };

    return (
        <div className="nutrition-grid">
            <style>{`
                .nutrition-grid {
                    display: grid;
                    gap: var(--spacing-lg);
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                @media (max-width: 768px) {
                    .nutrition-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 480px) {
                    .todays-log-card {
                        max-width: 72%;
                    }
                }
                @media (max-width: 400px) {
                    .todays-log-card {
                        max-width: 62%;
                    }
                }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {/* AI Input */}
                <AIAnalysisInput onAnalysisComplete={handleAIComplete} />
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
                                        <span>• {item.calories} Cal</span>
                                        <span>• P: {item.protein}g</span>
                                        <span>• C: {item.carbs}g</span>
                                        <span>• F: {item.fats}g</span>
                                        {(item.iron > 0) && <span>• Iron: {item.iron}mg</span>}
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
