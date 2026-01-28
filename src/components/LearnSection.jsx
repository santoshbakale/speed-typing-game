import React from 'react';

const VIDEOS = [
    {
        id: 'F8_ME4VwTiw',
        title: '10 Tips to Type Faster',
        channel: 'Ali Abdaal',
        thumbnail: 'https://img.youtube.com/vi/F8_ME4VwTiw/maxresdefault.jpg'
    },
    {
        id: 's4thQzgC8G8',
        title: 'How to Type Faster (Keybr)',
        channel: 'Mike K',
        thumbnail: 'https://img.youtube.com/vi/s4thQzgC8G8/maxresdefault.jpg'
    },
    {
        id: '0_Pq0xYr3L4',
        title: 'Touch Typing Basics',
        channel: 'GCFGlobal',
        thumbnail: 'https://img.youtube.com/vi/0_Pq0xYr3L4/maxresdefault.jpg'
    },
    {
        id: 'ro859lZfC_k',
        title: 'Proper Hand Placement',
        channel: 'TypingGuide',
        thumbnail: 'https://img.youtube.com/vi/ro859lZfC_k/maxresdefault.jpg'
    }
];

const LearnSection = () => {
    return (
        <div style={{ marginTop: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Master Your Skills</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Curated tutorials to improve your typing speed and efficiency.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {VIDEOS.map((video) => (
                    <a
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-panel"
                        style={{
                            textDecoration: 'none',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            display: 'block'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0,0,0,0.6)',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                <div style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '8px solid transparent',
                                    borderBottom: '8px solid transparent',
                                    borderLeft: '14px solid white',
                                    marginLeft: '4px'
                                }} />
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                marginBottom: '0.5rem',
                                color: 'var(--text-primary)',
                                background: 'none',
                                WebkitTextFillColor: 'inherit'
                            }}>
                                {video.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                {video.channel}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LearnSection;
