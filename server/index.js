const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { calculateFinancials } = require('./calculators/financials');
const { assessRisks } = require('./calculators/risks');
const { generateRoadmap } = require('./calculators/roadmap');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Evaluation Endpoint
app.post('/api/evaluate', (req, res) => {
    try {
        const input = req.body;

        // 1. Core Success Probability (Advanced Scoring)
        // We combine the simple frontend logic with weighted risk/success probability
        const riskResults = assessRisks({
            financialScore: input.businessScore,
            marketScore: input.marketScore,
            technicalScore: input.executionScore,
            operationalScore: input.executionScore,
            legalScore: input.legalScore || 5
        });

        // 2. Financial Projections
        const financials = calculateFinancials({
            initialInvestment: input.investment || 50000,
            monthlyOpex: input.opex || 2000,
            arpu: input.arpu || 50,
            cac: input.cac || 20,
            monthlyGrowth: (input.marketScore || 5) / 50, // Growth related to market potential
            horizonMonths: 36
        });

        // 3. Strategic Roadmap
        const roadmap = generateRoadmap({
            timeToMarket: input.timeToMarket || 6,
            scores: {
                idea: input.ideaScore || 5,
                market: input.marketScore || 5,
                business: input.businessScore || 5,
                execution: input.executionScore || 5
            }
        });

        // Output synthesis
        res.json({
            successProbability: riskResults.successProbability,
            riskLevel: riskResults.riskLevel,
            riskMap: riskResults.riskMap,
            financials: {
                roi: financials.roi,
                breakEvenMonth: financials.breakEvenMonth,
                totalRevenue: financials.totalRevenue,
                totalCost: financials.totalCost,
                netProfit: financials.netProfit,
                projections: financials.projections
            },
            roadmap
        });
    } catch (error) {
        console.error('Evaluation Error:', error);
        res.status(500).json({ error: 'Failed to process sophisticated evaluation models.' });
    }
});

app.listen(PORT, () => {
    console.log(`BizEvaluator Professional Backend running on port ${PORT}`);
});
