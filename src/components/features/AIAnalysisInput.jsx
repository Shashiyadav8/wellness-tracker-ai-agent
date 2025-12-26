import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import { Sparkles, Loader, ShieldAlert, Image as ImageIcon, X } from 'lucide-react';
import useGemini from '../../hooks/useGemini';
import { GEMINI_API_KEY } from '../../config';

const AIAnalysisInput = ({ onAnalysisComplete }) => {
    const { analyzeFood, loading, error } = useGemini();
    const [foodPrompt, setFoodPrompt] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnalyze = async () => {
        if (!foodPrompt.trim() && !selectedImage) return;

        const result = await analyzeFood(foodPrompt, selectedImage);
        if (result) {
            onAnalysisComplete(result, !!selectedImage);
            setFoodPrompt('');
            handleClearImage();
        }
    };

    const hasValidKey = GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_API_KEY_HERE";

    // Replaced early return with inline warning

    return (
        <Card className="ai-input-card">
            <style>{`
                .ai-input-card {
                    border-color: var(--accent-purple);
                    background: rgba(168, 85, 247, 0.05);
                    max-width: 100%;
                    overflow: hidden;
                }
                @media (max-width: 480px) {
                    .ai-input-card {
                        max-width: 72%;
                    }
                }
                @media (max-width: 400px) {
                    .ai-input-card {
                        max-width: 62%;
                    }
                }
            `}</style>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--spacing-md)' }}>
                <Sparkles color="var(--accent-purple)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>AI Food Scanner</h3>
            </div>

            {!hasValidKey && (
                <div style={{ padding: '12px', marginBottom: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', display: 'flex', gap: '10px', alignItems: 'start' }}>
                    <ShieldAlert color="#ef4444" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        <strong>Configuration Required:</strong> Open <code>src/config.js</code> and add your API Key to use this feature.
                    </div>
                </div>
            )}

            {/* Camera / Image Input Area */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                {!selectedImage ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            id="food-image-upload"
                            style={{ display: 'none' }}
                        />
                        <label
                            className="upload-label"
                            htmlFor="food-image-upload"
                        >
                            <div style={{ padding: '15px', background: 'var(--accent-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ImageIcon size={32} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Scan Meal</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Take a photo or upload</div>
                            </div>
                        </label>
                        <style>{`
                            .upload-label {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                gap: 12px;
                                padding: 30px;
                                border-radius: var(--radius-lg);
                                background: rgba(255,255,255,0.08);
                                color: var(--text-primary);
                                cursor: pointer;
                                border: 2px dashed var(--accent-purple);
                                transition: all 0.2s;
                                text-align: center;
                            }
                            @media (max-width: 600px) {
                                .upload-label {
                                    padding: 20px;
                                }
                            }
                        `}</style>
                    </div>
                ) : (
                    <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }}
                        />
                        <button
                            onClick={handleClearImage}
                            style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'rgba(0,0,0,0.6)', color: 'white',
                                borderRadius: '50%', width: '32px', height: '32px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', padding: 0, border: 'none'
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Optional Text Input */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <textarea
                    placeholder="Add details (optional)... e.g. 'I only ate half'"
                    value={foodPrompt}
                    onChange={(e) => setFoodPrompt(e.target.value)}
                    rows={1}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        resize: 'none',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                    <ShieldAlert size={16} />
                    <span>{error}</span>
                </div>
            )}

            <button
                onClick={handleAnalyze}
                disabled={loading || (!foodPrompt.trim() && !selectedImage) || !hasValidKey}
                style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    cursor: loading || (!foodPrompt.trim() && !selectedImage) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    opacity: loading || (!foodPrompt.trim() && !selectedImage) ? 0.7 : 1,
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                }}
            >
                {loading ? (
                    <>
                        <Loader className="spin" size={20} /> Analyzing Meal...
                    </>
                ) : (
                    <>
                        <Sparkles size={20} /> Calculate Calories
                    </>
                )}
            </button>
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </Card>
    );
};

export default AIAnalysisInput;
