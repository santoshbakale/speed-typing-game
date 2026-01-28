import React, { useState, useEffect, useRef, useCallback } from 'react';

const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Believe you can and you're halfway there.",
    "In the world of software, the best way to predict the future is to invent it. Code is poetry written for machines.",
    "Speed is important, but accuracy is everything. Master the keys and let your fingers dance across the board with precision."
];

const TypingTest = () => {
    const [mode, setMode] = useState('random'); // 'random' or 'custom'
    const [text, setText] = useState('');
    const [customTextDraft, setCustomTextDraft] = useState('');
    const [isCustomInputting, setIsCustomInputting] = useState(false);

    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);
    const inputRef = useRef(null);

    const resetTest = useCallback(() => {
        if (mode === 'random') {
            const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
            setText(randomText);
            setIsCustomInputting(false);
        } else if (mode === 'custom') {
            // Keep the existing custom text if available, otherwise ask for input
            if (!text && !isCustomInputting) {
                setIsCustomInputting(true);
            }
        }

        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
        if (inputRef.current && !isCustomInputting) inputRef.current.focus();
    }, [mode, text, isCustomInputting]);

    useEffect(() => {
        if (mode === 'random') {
            resetTest();
        } else {
            setIsCustomInputting(true);
            setText('');
        }
    }, [mode]);

    const handleStartCustom = () => {
        if (customTextDraft.trim().length > 0) {
            setText(customTextDraft);
            setIsCustomInputting(false);
            setInput('');
            setStartTime(null);
            setWpm(0);
            setAccuracy(100);
            setIsFinished(false);
            // Focus will happen via effect or user click, but let's try to focus immediately after render cycle if possible
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const calculateStats = (currentInput) => {
        if (!startTime) return;

        const words = currentInput.length / 5;
        const timeInMinutes = (Date.now() - startTime) / 60000;
        const currentWpm = Math.round(words / timeInMinutes) || 0;

        let errors = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (currentInput[i] !== text[i]) errors++;
        }

        const currentAccuracy = Math.max(0, Math.round(((currentInput.length - errors) / currentInput.length) * 100));

        setWpm(currentWpm);
        setAccuracy(currentAccuracy);
    };

    const handleChange = (e) => {
        if (isFinished || isCustomInputting) return;

        const value = e.target.value;

        if (!startTime) setStartTime(Date.now());

        setInput(value);
        calculateStats(value);

        if (value.length >= text.length) {
            setIsFinished(true);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Test Your Speed</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        className={`glass-button ${mode === 'random' ? '' : 'secondary'}`}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', opacity: mode === 'random' ? 1 : 0.7 }}
                        onClick={() => setMode('random')}
                    >
                        Random Quotes
                    </button>
                    <button
                        className={`glass-button ${mode === 'custom' ? '' : 'secondary'}`}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', opacity: mode === 'custom' ? 1 : 0.7 }}
                        onClick={() => setMode('custom')}
                    >
                        Custom Text
                    </button>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '3rem',
                marginBottom: '3rem'
            }}>
                <div className="stat-box">
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{wpm}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>WPM</div>
                </div>
                <div className="stat-box">
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--accent-magenta)' }}>{accuracy}%</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Accuracy</div>
                </div>
            </div>

            {isCustomInputting ? (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <textarea
                        className="glass-panel"
                        placeholder="Paste or type your custom text here to practice..."
                        value={customTextDraft}
                        onChange={(e) => setCustomTextDraft(e.target.value)}
                        style={{
                            width: '100%',
                            minHeight: '150px',
                            padding: '1.5rem',
                            color: 'var(--text-primary)',
                            fontSize: '1.25rem',
                            border: '1px solid var(--accent-magenta)',
                            outline: 'none',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-main)'
                        }}
                    />
                    <button
                        className="glass-button secondary"
                        onClick={handleStartCustom}
                        disabled={!customTextDraft.trim()}
                        style={{ opacity: customTextDraft.trim() ? 1 : 0.5 }}
                    >
                        Start Custom Test
                    </button>
                </div>
            ) : (
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'left',
                        lineHeight: '2',
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-mono)',
                        minHeight: '150px',
                        cursor: 'text'
                    }}
                    onClick={() => inputRef.current && inputRef.current.focus()}
                >
                    {/* Render Text overlay */}
                    <div style={{ marginBottom: '1rem', color: '#64748b' }}>
                        {!text && <span style={{ opacity: 0.5 }}>Loading text...</span>}
                        {text.split('').map((char, index) => {
                            let color = '';
                            let bg = '';
                            if (index < input.length) {
                                if (input[index] === char) {
                                    color = 'var(--accent-green)';
                                } else {
                                    color = 'var(--accent-red)';
                                    bg = 'rgba(239, 68, 68, 0.1)';
                                }
                            }
                            // Highlight current cursor position
                            const isCurrent = index === input.length;
                            return (
                                <span key={index} style={{
                                    color,
                                    backgroundColor: bg,
                                    transition: 'all 0.1s',
                                    borderLeft: isCurrent ? '2px solid var(--accent-cyan)' : '2px solid transparent'
                                }}>
                                    {char}
                                </span>
                            );
                        })}
                    </div>

                    {/* Hidden Input */}
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleChange}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'default'
                        }}
                    />
                </div>
            )}

            {isFinished && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease' }}>
                    <h3 className="text-gradient" style={{ marginBottom: '1rem' }}>Test Complete! 🎉</h3>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="glass-button"
                            onClick={() => {
                                setIsFinished(false);
                                setInput('');
                                setStartTime(null);
                                setWpm(0);
                                setAccuracy(100);
                                if (mode === 'random') {
                                    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
                                    setText(randomText);
                                }
                                setTimeout(() => inputRef.current?.focus(), 50);
                            }}
                            style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}
                        >
                            Try Again
                        </button>
                        {mode === 'custom' && (
                            <button
                                className="glass-button secondary"
                                onClick={() => setIsCustomInputting(true)}
                                style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}
                            >
                                Change Text
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
