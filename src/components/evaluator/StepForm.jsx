import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, DollarSign, Clock, Users } from 'lucide-react';
import { QUESTIONS, CATEGORIES } from '../../utils/scoring';

const StepForm = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState({
        investment: 50000,
        opex: 2000,
        arpu: 50,
        cac: 20,
        timeToMarket: 6
    });

    const handleInputChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: parseFloat(value) }));
    };

    const categories = [...Array.from(new Set(QUESTIONS.map(q => q.category))), 'financials'];
    const totalSteps = categories.length;
    const currentCategory = categories[currentStep];
    const stepQuestions = QUESTIONS.filter(q => q.category === currentCategory);

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            onComplete(responses);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="glass-card animate-in">
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge" style={{ background: 'var(--card-border)', color: 'var(--text-muted)' }}>
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {currentCategory}
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'var(--card-border)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'var(--primary)' }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentCategory}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentCategory !== 'financials' ? (
                        stepQuestions.map(q => (
                            <div key={q.id} style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    {q.label}
                                </label>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                                    {q.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <input
                                        type="range"
                                        min={q.min}
                                        max={q.max}
                                        value={responses[q.id] || 5}
                                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        className="input-range"
                                    />
                                    <span style={{
                                        minWidth: '2.5rem',
                                        height: '2.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700
                                    }}>
                                        {responses[q.id] || 5}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        <DollarSign size={18} color="var(--primary)" /> Initial Investment ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={responses.investment}
                                        onChange={(e) => handleInputChange('investment', e.target.value)}
                                        className="glass-card"
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', width: '100%', borderRadius: '0.75rem', border: '1px solid var(--card-border)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        <Clock size={18} color="var(--primary)" /> Time to Market (Months)
                                    </label>
                                    <input
                                        type="number"
                                        value={responses.timeToMarket}
                                        onChange={(e) => handleInputChange('timeToMarket', e.target.value)}
                                        className="glass-card"
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', width: '100%', borderRadius: '0.75rem', border: '1px solid var(--card-border)', color: 'white' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'block' }}>Monthly OPEX ($)</label>
                                    <input
                                        type="number"
                                        value={responses.opex}
                                        onChange={(e) => handleInputChange('opex', e.target.value)}
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', width: '100%', borderRadius: '0.75rem', border: '1px solid var(--card-border)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'block' }}>Est. ARPU ($)</label>
                                    <input
                                        type="number"
                                        value={responses.arpu}
                                        onChange={(e) => handleInputChange('arpu', e.target.value)}
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', width: '100%', borderRadius: '0.75rem', border: '1px solid var(--card-border)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'block' }}>Est. CAC ($)</label>
                                    <input
                                        type="number"
                                        value={responses.cac}
                                        onChange={(e) => handleInputChange('cac', e.target.value)}
                                        style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', width: '100%', borderRadius: '0.75rem', border: '1px solid var(--card-border)', color: 'white' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="btn btn-outline"
                    style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
                >
                    <ChevronLeft size={20} /> Back
                </button>
                <button onClick={nextStep} className="btn btn-primary">
                    {currentStep === totalSteps - 1 ? (
                        <>Expert Evaluation <CheckCircle2 size={20} /></>
                    ) : (
                        <>Next Section <ChevronRight size={20} /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default StepForm;
