
// Utility functions for preparing chart data

export const prepareDefaultUsageData = () => [
  { date: '2023-10', count: 5 },
  { date: '2023-11', count: 8 },
  { date: '2023-12', count: 12 },
  { date: '2024-01', count: 15 },
  { date: '2024-02', count: 9 },
  { date: '2024-03', count: 18 }
];

export const prepareDefaultGenerationData = () => [
  { date: '2023-10', count: 10 },
  { date: '2023-11', count: 15 },
  { date: '2023-12', count: 20 },
  { date: '2024-01', count: 25 },
  { date: '2024-02', count: 18 },
  { date: '2024-03', count: 30 }
];

export const prepareUsageDistributionData = (usedCodes: number, totalCodes: number) => [
  { name: 'Used', value: usedCodes, color: '#4f46e5' },
  { name: 'Unused', value: totalCodes - usedCodes, color: '#94a3b8' }
];

export const prepareTypeDistributionData = (studentCodes: number, employerCodes: number) => [
  { name: 'Student', value: studentCodes, color: '#6366f1' },
  { name: 'Employer', value: employerCodes, color: '#ec4899' }
];

export const chartConfig = {
  used: { color: '#4f46e5' },
  unused: { color: '#94a3b8' },
  student: { color: '#6366f1' },
  employer: { color: '#ec4899' },
  total: { color: '#0ea5e9' },
  expiring: { color: '#ef4444' },
};
