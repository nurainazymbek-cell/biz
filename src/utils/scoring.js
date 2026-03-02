export const CATEGORIES = {
    IDEA: 'idea',
    MARKET: 'market',
    BUSINESS: 'business',
    EXECUTION: 'execution'
};

export const WEIGHTS = {
    [CATEGORIES.IDEA]: 0.30,
    [CATEGORIES.MARKET]: 0.25,
    [CATEGORIES.BUSINESS]: 0.25,
    [CATEGORIES.EXECUTION]: 0.20
};

export const QUESTIONS = [
    {
        category: CATEGORIES.IDEA,
        id: 'problem_intensity',
        label: 'How intense is the problem you are solving?',
        description: '1: Minor inconvenience, 10: Critical pain point',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.IDEA,
        id: 'solution_uniqueness',
        label: 'How unique is your solution?',
        description: '1: Many alternatives, 10: Truly breakthrough',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.MARKET,
        id: 'market_size',
        label: 'What is the market size/potential?',
        description: '1: Niche/stagnant, 10: Huge/rapidly growing',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.MARKET,
        id: 'competition_level',
        label: 'How is the competition level?',
        description: '1: Crowded/Dominant players, 10: Blue ocean/Weak incumbents',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.BUSINESS,
        id: 'revenue_clarity',
        label: 'How clear is your revenue model?',
        description: '1: Vague/uncertain, 10: Proven/highly predictable',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.BUSINESS,
        id: 'scalability',
        label: 'How scalable is the business?',
        description: '1: Linear/manual, 10: Exponential/automated',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.EXECUTION,
        id: 'team_fit',
        label: 'How well does the team fit the project?',
        description: '1: No relevant experience, 10: Domain experts with track record',
        min: 1, max: 10
    },
    {
        category: CATEGORIES.EXECUTION,
        id: 'speed_to_market',
        label: 'How fast can you launch?',
        description: '1: Years of R&D, 10: MVP ready in weeks',
        min: 1, max: 10
    }
];

export const calculateResults = (responses) => {
    const categoryScores = {
        [CATEGORIES.IDEA]: 0,
        [CATEGORIES.MARKET]: 0,
        [CATEGORIES.BUSINESS]: 0,
        [CATEGORIES.EXECUTION]: 0
    };

    const categoryCounts = {
        [CATEGORIES.IDEA]: 0,
        [CATEGORIES.MARKET]: 0,
        [CATEGORIES.BUSINESS]: 0,
        [CATEGORIES.EXECUTION]: 0
    };

    QUESTIONS.forEach(q => {
        const value = responses[q.id] || 5;
        categoryScores[q.category] += value;
        categoryCounts[q.category]++;
    });

    let totalWeightedScore = 0;
    const breakdown = {};

    Object.keys(CATEGORIES).forEach(key => {
        const cat = CATEGORIES[key];
        const avg = categoryScores[cat] / categoryCounts[cat];
        const normalized = (avg / 10) * 100;
        breakdown[cat] = Math.round(normalized);
        totalWeightedScore += (normalized * WEIGHTS[cat]);
    });

    const finalScore = Math.round(totalWeightedScore);

    let verdict = '';
    let color = '';
    if (finalScore >= 80) {
        verdict = 'High Potential - Go for it!';
        color = '#10b981'; // Emerald
    } else if (finalScore >= 60) {
        verdict = 'Promising - Refine and proceed.';
        color = '#f59e0b'; // Amber
    } else if (finalScore >= 40) {
        verdict = 'Needs Pivot - Re-examine core assumptions.';
        color = '#f97316'; // Orange
    } else {
        verdict = 'High Risk - Back to the drawing board.';
        color = '#ef4444'; // Red
    }

    const sparks = [];
    if (breakdown[CATEGORIES.IDEA] < 50) sparks.push('Your core idea might not be solving a big enough problem. Can you find a sharper pain point?');
    if (breakdown[CATEGORIES.MARKET] < 50) sparks.push('The market conditions look challenging. Consider if there is a more favorable niche.');
    if (breakdown[CATEGORIES.BUSINESS] < 50) sparks.push('The revenue or scale model seems weak. Look for ways to automate or recurring revenue.');
    if (breakdown[CATEGORIES.EXECUTION] < 50) sparks.push('Execution is the biggest risk. Focus on building the right team or simplifying the MVP.');

    return {
        finalScore,
        breakdown,
        verdict,
        color,
        sparks: sparks.length > 0 ? sparks : ['You have a solid foundation across all areas. Focus on aggressive execution!']
    };
};
