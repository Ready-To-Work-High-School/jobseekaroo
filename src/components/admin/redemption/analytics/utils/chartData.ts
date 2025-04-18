
export function prepareUsageDistributionData(usedCodes: number, totalCodes: number) {
  return [
    { name: 'Used', value: usedCodes, color: '#4f46e5' },
    { name: 'Unused', value: totalCodes - usedCodes, color: '#94a3b8' }
  ];
}

export function prepareTypeDistributionData(studentCodes: number, employerCodes: number) {
  return [
    { name: 'Student', value: studentCodes, color: '#6366f1' },
    { name: 'Employer', value: employerCodes, color: '#ec4899' }
  ];
}

export function prepareDefaultUsageData() {
  // Generate mock data for the past 30 days
  const usageOverTime: { date: string; count: number }[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a random number between 0 and 10
    const count = Math.floor(Math.random() * 11);
    
    usageOverTime.push({
      date: date.toISOString().split('T')[0],
      count
    });
  }
  
  return usageOverTime;
}

export function prepareDefaultGenerationData() {
  // Generate mock data for the past 30 days
  const generationOverTime: { date: string; count: number }[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a random number between 0 and 20
    const count = Math.floor(Math.random() * 21);
    
    generationOverTime.push({
      date: date.toISOString().split('T')[0],
      count
    });
  }
  
  return generationOverTime;
}
