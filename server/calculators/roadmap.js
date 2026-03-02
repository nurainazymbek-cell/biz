/**
 * Automated Strategic Roadmap Generation
 */

const generateRoadmap = (data) => {
    const {
        timeToMarket = 6,
        scores = { idea: 5, market: 5, business: 5, execution: 5 }
    } = data;

    const phases = [];

    // Phase 1: Foundations
    phases.push({
        name: 'Foundation & Validation',
        duration: 'Month 1-2',
        tasks: [
            'Refine USP based on competitor gap analysis',
            scores.idea < 7 ? 'Deepen customer discovery interviews' : 'Finalize prototype specs',
            'Legal entity formation and IP protection'
        ]
    });

    // Phase 2: Build & MVP
    const buildStart = 3;
    const buildEnd = Math.max(buildStart + 1, timeToMarket - 1);
    phases.push({
        name: 'Product Velocity',
        duration: `Month ${buildStart}-${buildEnd}`,
        tasks: [
            'MVP development and internal alpha testing',
            'Landing page optimization for early-waitlist',
            scores.execution < 6 ? 'Recruit technical co-founder or lead' : 'Scale dev team capacity'
        ]
    });

    // Phase 3: Launch
    phases.push({
        name: 'Market Entry',
        duration: `Month ${buildEnd + 1}`,
        tasks: [
            'Public Beta launch on ProductHunt/IndieHackers',
            'Initial B2B outreach and pilot programs',
            scores.market < 7 ? 'Aggressive SEO and content marketing push' : 'Direct sales expansion'
        ]
    });

    // Phase 4: Scale
    phases.push({
        name: 'Sustainability & Growth',
        duration: `Month ${buildEnd + 2}+`,
        tasks: [
            'Feedback loop integration and V2 planning',
            'Series A / Seed funding round preparations',
            scores.business < 7 ? 'Pivot monetization data models' : 'Global market expansion'
        ]
    });

    return phases;
};

module.exports = { generateRoadmap };
