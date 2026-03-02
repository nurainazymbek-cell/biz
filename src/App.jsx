import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import StepForm from './components/evaluator/StepForm';
import ResultsDashboard from './components/dashboard/ResultsDashboard';
import { evaluateBusiness } from './utils/api';
import { Rocket, ShieldCheck, TrendingUp, Loader2 } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [stage, setStage] = useState('landing'); // landing, evaluating, loading, results
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleEvaluationComplete = async (responses) => {
    setStage('loading');
    setError(null);
    try {
      // Sophisticated Backend Evaluation
      const professionalResults = await evaluateBusiness(responses);
      setResults(professionalResults);
      setStage('results');
    } catch (err) {
      console.error('Evaluation failed:', err);
      setError('Connection to Professional Backend failed. Please ensure the server is running.');
      setStage('evaluating');
    }
  };

  const reset = () => {
    setResults(null);
    setStage('landing');
    setError(null);
  };

  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {stage === 'landing' && (
          <div className="animate-in" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto' }}>
            <h1 className="h1" style={{ marginBottom: '1.5rem' }}>
              Professional <span className="text-gradient">Business Evaluator</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Assess success rates, ROI, and risk factors with our pre-acceleration simulation system.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <Rocket size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Financial Modeling</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Structured ROI & break-even projections.</p>
              </div>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <TrendingUp size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Risk Heatmaps</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Identify & mitigate failure points early.</p>
              </div>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <ShieldCheck size={32} color="var(--success)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Success Probabilities</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Advanced algorithms for accurate forecasts.</p>
              </div>
            </div>

            <button onClick={() => setStage('evaluating')} className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
              Begin Professional Audit <Rocket size={20} />
            </button>
          </div>
        )}

        {stage === 'evaluating' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {error && (
              <div style={{
                padding: '1rem',
                background: 'var(--error)20',
                color: 'var(--error)',
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid var(--error)40'
              }}>
                {error}
              </div>
            )}
            <StepForm onComplete={handleEvaluationComplete} />
          </div>
        )}

        {stage === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '1.5rem' }}>
            <Loader2 size={48} className="animate-spin" color="var(--primary)" />
            <h3 className="h3">Running Professional Simulation Models...</h3>
            <p style={{ color: 'var(--text-muted)' }}>Analyzing market dynamics, financial viability, and execution risks.</p>
          </div>
        )}

        {stage === 'results' && results && (
          <ResultsDashboard results={results} onReset={reset} />
        )}
      </main>

      <footer style={{ marginTop: '4rem', padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} BizEvaluator Pro. Built for serious entrepreneurs.
        </p>
      </footer>
    </div>
  );
}

export default App;
