import React from 'react';
import { Lightbulb, Moon, Sun } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="glass-card" style={{
            padding: '1rem 2rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Lightbulb size={24} color="white" />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                    Biz<span className="text-gradient">Evaluator</span>
                </span>
            </div>

            <button
                onClick={toggleTheme}
                className="btn"
                style={{
                    background: 'var(--card-border)',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    color: 'var(--text-main)'
                }}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </nav>
    );
};

export default Navbar;
