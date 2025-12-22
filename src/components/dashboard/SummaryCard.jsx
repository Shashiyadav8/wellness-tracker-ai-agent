import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const SummaryCard = ({ title, value, unit, icon: Icon, color, max, progressValue, subtext }) => {
    return (
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{title}</h3>
                {Icon && <Icon size={20} color={color} />}
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
                {unit && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginLeft: '4px' }}>{unit}</span>}
            </div>

            {max && (
                <ProgressBar value={progressValue || value} max={max} color={color} />
            )}

            {subtext && (
                <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {subtext}
                </p>
            )}
        </Card>
    );
};

export default SummaryCard;
