import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, max, color = 'var(--accent-blue)', label }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className="progress-container" style={{ width: '100%' }}>
            {label && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>{label}</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div
                style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        height: '100%',
                        background: color,
                        borderRadius: '999px'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
