
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
