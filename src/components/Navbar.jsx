import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activeTab, setActiveTab }) => {
    const { logout, user } = useAuth();

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
                {user && <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginLeft: '0.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '1rem'
                }}>{user.email}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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

                <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>

                <button
                    onClick={logout}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.borderColor = 'var(--accent-red)';
                        e.target.style.color = 'var(--accent-red)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.borderColor = 'var(--glass-border)';
                        e.target.style.color = 'var(--text-secondary)';
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
