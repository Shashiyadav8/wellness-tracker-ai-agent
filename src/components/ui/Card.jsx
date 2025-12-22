import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-card ${className}`}
            style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
