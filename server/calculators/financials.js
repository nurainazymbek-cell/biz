/**
 * Sophisticated Financial Calculations for Pre-Acceleration
 */

const calculateFinancials = (data) => {
    const {
        initialInvestment = 0,
        monthlyOpex = 0,
        arpu = 0, // Average Revenue Per User
        cac = 0,  // Customer Acquisition Cost
        conversionRate = 0.02, // 2% default
        monthlyGrowth = 0.1,   // 10% monthly growth default
        horizonMonths = 36     // 3-year projection
    } = data;

    let cumulativeRevenue = 0;
    let cumulativeCosts = initialInvestment;
    let users = 100; // Starting baseline
    let breakEvenMonth = -1;
    const projections = [];

    for (let m = 1; m <= horizonMonths; m++) {
        // Marketing math
        const newUsers = users * monthlyGrowth;
        const monthlyMarketingSpend = newUsers * cac;

        // Revenue math
        const monthlyRevenue = users * arpu;
        const monthlyTotalCost = monthlyOpex + monthlyMarketingSpend;

        cumulativeRevenue += monthlyRevenue;
        cumulativeCosts += monthlyTotalCost;

        projections.push({
            month: m,
            revenue: Math.round(monthlyRevenue),
            cost: Math.round(monthlyTotalCost),
            users: Math.round(users),
            profit: Math.round(monthlyRevenue - monthlyTotalCost)
        });

        if (breakEvenMonth === -1 && cumulativeRevenue >= cumulativeCosts) {
            breakEvenMonth = m;
        }

        users += newUsers;
    }

    const totalRevenue = projections.reduce((acc, p) => acc + p.revenue, 0);
    const totalCost = projections.reduce((acc, p) => acc + p.cost, 0);
    const netProfit = totalRevenue - totalCost;
    const roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;

    return {
        roi: Math.round(roi),
        breakEvenMonth,
        totalRevenue: Math.round(totalRevenue),
        totalCost: Math.round(totalCost),
        netProfit: Math.round(netProfit),
        projections: projections.filter((_, i) => i % 6 === 0) // Every 6 months for results summary
    };
};

module.exports = { calculateFinancials };
