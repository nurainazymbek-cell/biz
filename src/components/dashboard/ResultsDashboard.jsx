import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import {
    RotateCcw, AlertTriangle, TrendingUp, Zap,
    Target, Shield, Map, PieChart as PieChartIcon,
    ArrowUpRight, DollarSign, Calendar
} from 'lucide-react';

const ResultsDashboard = ({ results, onReset }) => {
    // Map risk items for easier display
    const riskMap = results.riskMap || [];
    const financials = results.financials || {};
    const roadmap = results.roadmap || [];

    return (
        <div className="animate-in" style={{ display: 'grid', gap: '2rem' }}>
            {/* 1. Executive Summary & Verdict */}
            <div className="glass-card" style={{ textAlign: 'center' }}>
                <h2 className="h2" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <Target size={32} color="var(--primary)" /> Executive Verdict
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                        {results.successProbability}%
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Success Rate</span>
                </div>
                <div className="badge" style={{
                    background: results.riskLevel === 'Low' ? 'var(--success)20' : results.riskLevel === 'Medium' ? 'var(--warning)20' : 'var(--error)20',
                    color: results.riskLevel === 'Low' ? 'var(--success)' : results.riskLevel === 'Medium' ? 'var(--warning)' : 'var(--error)',
                    fontSize: '1.125rem',
                    padding: '0.5rem 2rem',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {results.riskLevel} Risk Profile
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {/* 2. Financial Projection Chart */}
                <div className="glass-card" style={{ minHeight: '400px' }}>
                    <h3 className="h3" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingUp size={24} color="var(--success)" /> Year 1-3 Projections
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={financials.projections}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                            <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)' }} tick={{ fill: 'var(--text-muted)' }} />
                            <YAxis tick={{ fill: 'var(--text-muted)' }} />
                            <Tooltip
                                contentStyle={{ background: 'var(--bg-gradient)', border: '1px solid var(--card-border)', borderRadius: '0.75rem' }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRev)" />
                            <Area type="monotone" dataKey="cost" stroke="var(--secondary)" fill="transparent" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '1rem', border: '1px solid var(--card-border)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Est. ROI</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{financials.roi}%</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '1rem', border: '1px solid var(--card-border)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Break-even</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Month {financials.breakEvenMonth > 0 ? financials.breakEvenMonth : '>36'}</div>
                        </div>
                    </div>
                </div>

                {/* 3. Risk Heatmap / Matrix */}
                <div className="glass-card">
                    <h3 className="h3" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Shield size={24} color="var(--error)" /> Risk Assessment Matrix
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {riskMap.map((risk, index) => (
                            <div key={index} style={{
                                padding: '1.25rem',
                                background: 'var(--card-bg)',
                                borderRadius: '1rem',
                                border: '1px solid var(--card-border)',
                                display: 'grid',
                                gap: '0.5rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700 }}>{risk.category}</span>
                                    <span className="badge" style={{
                                        background: risk.classification === 'Low' ? 'var(--success)20' : risk.classification === 'Medium' ? 'var(--warning)20' : 'var(--error)20',
                                        color: risk.classification === 'Low' ? 'var(--success)' : risk.classification === 'Medium' ? 'var(--warning)' : 'var(--error)'
                                    }}>
                                        {risk.classification}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    <Zap size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
                                    {risk.mitigation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Strategic Roadmap Gantt-style */}
            <div className="glass-card">
                <h3 className="h3" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Map size={24} color="var(--primary)" /> Pre-Acceleration Roadmap
                </h3>
                <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--primary)' }}>
                    {roadmap.map((phase, index) => (
                        <div key={index} style={{ marginBottom: '2.5rem', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '-2.6rem',
                                top: '0',
                                width: '1.2rem',
                                height: '1.2rem',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                boxShadow: '0 0 10px var(--primary)'
                            }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{phase.name}</h4>
                                <span className="badge" style={{ background: 'var(--card-border)', color: 'var(--text-muted)' }}>
                                    <Calendar size={14} style={{ marginRight: '4px' }} /> {phase.duration}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {phase.tasks.map((task, tidx) => (
                                    <div key={tidx} style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.875rem',
                                        display: 'flex',
                                        gap: '0.5rem'
                                    }}>
                                        <ArrowUpRight size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        {task}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={onReset} className="btn btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                    <RotateCcw size={20} /> New Evaluation Cycle
                </button>
            </div>
        </div>
    );
};

export default ResultsDashboard;
