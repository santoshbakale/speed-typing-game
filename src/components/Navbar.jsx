import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="glass-panel" style={{
            margin: '1.5rem auto',
            maxWidth: '1200px',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '1rem',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>TurboType</h3>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    className={`glass-button ${activeTab === 'test' ? '' : 'ghost'}`}
                    style={{
                        background: activeTab === 'test' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                        borderColor: activeTab === 'test' ? 'var(--accent-cyan)' : 'transparent'
                    }}
                    onClick={() => setActiveTab('test')}
                >
                    Speed Test
                </button>
                <button
                    className={`glass-button secondary ${activeTab === 'learn' ? '' : 'ghost'}`}
                    style={{
                        background: activeTab === 'learn' ? 'rgba(217, 70, 239, 0.2)' : 'transparent',
                        borderColor: activeTab === 'learn' ? 'var(--accent-magenta)' : 'transparent',
                        color: activeTab === 'learn' ? 'var(--accent-magenta)' : 'var(--text-secondary)'
                    }}
                    onClick={() => setActiveTab('learn')}
                >
                    Learn & Improve
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
