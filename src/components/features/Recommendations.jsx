import React, { useState } from 'react';
import Card from '../ui/Card';
import { nutrientCategories, foodRecommendations } from '../../data/foodData';
import { Star } from 'lucide-react';

const Recommendations = () => {
    const [selectedCategory, setSelectedCategory] = useState('protein');

    const currentFoods = foodRecommendations[selectedCategory] || [];

    return (
        <Card className="recommendations-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
                <Star display="inline" size={20} style={{ marginRight: '8px', color: 'var(--accent-yellow, #eab308)' }} />
                Best Foods Guide
            </h3>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: 'var(--spacing-md)' }}>
                {nutrientCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            background: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.05)',
                            color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${selectedCategory === cat.id ? cat.color : 'var(--border-color)'}`,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-sm)' }}>
                {currentFoods.length > 0 ? (
                    currentFoods.map((food, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                itemsAlign: 'center'
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{food.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{food.amount}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--accent-blue)' }}>{food.value}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{food.cal} kcal</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Select a category to see recommendations.</p>
                )}
            </div>
        </Card>
    );
};

export default Recommendations;
