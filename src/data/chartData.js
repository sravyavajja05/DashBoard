// ── Activities line/area chart data matching Figma design (Week 1 to Week 4) ──
export const activitiesData = [
    { name: 'Week 1', guest: 500, user: 400 },
    { name: 'Week 2', guest: 350, user: 450 },
    { name: 'Week 3', guest: 200, user: 300 },
    { name: 'Week 4', guest: 400, user: 350 },
];

// ── Top Products donut chart matching exact Figma screenshot ──
export const topProductsData = [
    { name: 'Basic Tees', value: 55, color: '#98D89E' },
    { name: 'Custom Short Pants', value: 31, color: '#F6DC7D' },
    { name: 'Super Hoodies', value: 14, color: '#EE8484' },
];

// ── Stats cards ──
export const statsData = [
    {
        id: 1,
        title: 'Total Revenues',
        value: '$2,129,430',
        change: '+2.4%',
        positive: true,
    },
    {
        id: 2,
        title: 'Total Transactions',
        value: '1,520',
        change: '-0.8%',
        positive: false,
    },
    {
        id: 3,
        title: 'Total Likes',
        value: '9,721',
        change: '+1.2%',
        positive: true,
    },
    {
        id: 4,
        title: 'Total Users',
        value: '892',
        change: '+2.1%',
        positive: true,
    },
];

// ── Today's Schedule matching exact Figma screenshot ──
export const scheduleData = [
    {
        id: 1,
        title: 'Meeting with suppliers from Kuta Bali',
        time: '14.00-15.00',
        location: 'at Sunset Road, Kuta, Bali',
        color: '#9BDD7C',
    },
    {
        id: 2,
        title: 'Check operation at Giga Factory 1',
        time: '18.00-20.00',
        location: 'at Central Jakarta',
        color: '#60A5FA',
    },
];

// ── Revenue/analytics data (used on analytics page) ──
export const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 28000 },
    { month: 'Feb', revenue: 51000, expenses: 32000 },
    { month: 'Mar', revenue: 47000, expenses: 30000 },
    { month: 'Apr', revenue: 63000, expenses: 38000 },
    { month: 'May', revenue: 58000, expenses: 35000 },
    { month: 'Jun', revenue: 72000, expenses: 42000 },
];

export const weeklyVisitors = [
    { day: 'Mon', visitors: 1200, pageViews: 3400 },
    { day: 'Tue', visitors: 1900, pageViews: 4800 },
    { day: 'Wed', visitors: 1500, pageViews: 3900 },
    { day: 'Thu', visitors: 2200, pageViews: 5600 },
    { day: 'Fri', visitors: 2800, pageViews: 7200 },
    { day: 'Sat', visitors: 1800, pageViews: 4500 },
    { day: 'Sun', visitors: 1100, pageViews: 2800 },
];

export const trafficSources = [
    { name: 'Organic Search', value: 38, color: '#98D89E' },
    { name: 'Direct', value: 24, color: '#F6DC7D' },
    { name: 'Social Media', value: 20, color: '#60A5FA' },
    { name: 'Referral', value: 12, color: '#EE8484' },
    { name: 'Email', value: 6, color: '#FBBF24' },
];
