/**
 * Multi-factor Risk Assessment and Success Probability
 */

const assessRisks = (data) => {
    const categories = [
        { name: 'Financial', weight: 0.3, score: data.financialScore || 5 },
        { name: 'Market', weight: 0.25, score: data.marketScore || 5 },
        { name: 'Technical', weight: 0.2, score: data.technicalScore || 5 },
        { name: 'Operational', weight: 0.15, score: data.operationalScore || 5 },
        { name: 'Legal', weight: 0.1, score: data.legalScore || 5 }
    ];

    const riskMap = categories.map(cat => {
        // Invert score for risk (High score = Low risk)
        const riskLevel = 10 - cat.score;
        let classification = 'Low';
        if (riskLevel > 7) classification = 'High';
        else if (riskLevel > 4) classification = 'Medium';

        return {
            category: cat.name,
            score: riskLevel,
            classification,
            mitigation: getMitigation(cat.name, classification)
        };
    });

    // Bayesian-inspired success probability simplified
    const successProbability = categories.reduce((acc, cat) => acc + (cat.score * cat.weight), 0) * 10;

    return {
        riskMap,
        successProbability: Math.min(Math.round(successProbability), 98), // Cap at 98%
        riskLevel: successProbability > 75 ? 'Low' : successProbability > 50 ? 'Medium' : 'High'
    };
};

const getMitigation = (category, level) => {
    if (level === 'Low') return 'Continue monitoring standard indicators.';

    const mitigations = {
        Financial: 'Seek bridge funding or optimize burn rate immediately.',
        Market: 'Pivoting target segment or increasing USP differentiation.',
        Technical: 'Hire senior technical lead or simplify MVP scope.',
        Operational: 'Automate core workflows or outsource non-essential tasks.',
        Legal: 'Consult with specialized counsel for IP/Regulatory compliance.'
    };

    return mitigations[category] || 'General risk oversight required.';
};

module.exports = { assessRisks };
