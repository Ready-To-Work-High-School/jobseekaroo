
import { RedemptionCode } from '@/types/redemption';

/**
 * Simple linear regression implementation
 * y = mx + b
 * Where:
 * - x is the independent variable (time)
 * - y is the dependent variable (code usage)
 * - m is the slope
 * - b is the y-intercept
 */
export function linearRegression(data: { x: number, y: number }[]): { slope: number, intercept: number } {
  // Need at least 2 points for regression
  if (data.length < 2) {
    return { slope: 0, intercept: data.length > 0 ? data[0].y : 0 };
  }

  // Calculate the means of x and y
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  // Calculate the slope (m)
  const numerator = data.reduce((sum, point) => {
    return sum + (point.x - meanX) * (point.y - meanY);
  }, 0);
  
  const denominator = data.reduce((sum, point) => {
    return sum + Math.pow(point.x - meanX, 2);
  }, 0);
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  
  // Calculate the y-intercept (b)
  const intercept = meanY - slope * meanX;
  
  return { slope, intercept };
}

/**
 * Predict future values based on linear regression model
 */
export function predictFutureValues(
  model: { slope: number, intercept: number },
  startX: number,
  numPredictions: number
): { x: number, y: number }[] {
  const predictions = [];
  
  for (let i = 0; i < numPredictions; i++) {
    const x = startX + i;
    const y = Math.max(0, Math.round(model.slope * x + model.intercept));
    predictions.push({ x, y });
  }
  
  return predictions;
}

/**
 * Prepare historical usage data for prediction model
 */
export function prepareUsageHistoricalData(
  codes: RedemptionCode[]
): { date: string, count: number }[] {
  // Group codes by usage date
  const usageDateMap = new Map<string, number>();
  
  codes.forEach(code => {
    if (code.used && code.usedAt) {
      const dateStr = new Date(code.usedAt).toISOString().split('T')[0];
      usageDateMap.set(dateStr, (usageDateMap.get(dateStr) || 0) + 1);
    }
  });
  
  // Sort by date
  const sortedDates = Array.from(usageDateMap.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
  
  return sortedDates.map(([date, count]) => ({ date, count }));
}

/**
 * Generate predictions based on historical data
 */
export function generateUsagePredictions(
  historicalData: { date: string, count: number }[],
  daysToPredict: number = 7
): { date: string, count: number, isPrediction: boolean }[] {
  if (historicalData.length === 0) {
    return [];
  }
  
  // Convert data for linear regression
  const regressionData = historicalData.map((item, index) => ({
    x: index,
    y: item.count
  }));
  
  // Create regression model
  const model = linearRegression(regressionData);
  
  // Generate predictions
  const predictions = predictFutureValues(model, regressionData.length, daysToPredict);
  
  // Format predictions with dates
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  const formattedPredictions = predictions.map((pred, i) => {
    const predictionDate = new Date(lastDate);
    predictionDate.setDate(lastDate.getDate() + i + 1);
    const dateStr = predictionDate.toISOString().split('T')[0];
    
    return {
      date: dateStr,
      count: pred.y,
      isPrediction: true
    };
  });
  
  // Combine historical data with predictions
  return [
    ...historicalData.map(item => ({ ...item, isPrediction: false })),
    ...formattedPredictions
  ];
}

/**
 * Analyze redemption patterns and provide insights
 */
export function analyzeRedemptionPatterns(codes: RedemptionCode[]): {
  insights: string[];
  peakUsageDays: string[];
  redemptionRate: number;
  projectedMonthlyUsage: number;
} {
  // Default values if not enough data
  if (codes.length < 5) {
    return {
      insights: ['Not enough data for meaningful analysis'],
      peakUsageDays: [],
      redemptionRate: 0,
      projectedMonthlyUsage: 0
    };
  }
  
  // Calculate redemption rate
  const usedCodes = codes.filter(code => code.used).length;
  const redemptionRate = (usedCodes / codes.length) * 100;
  
  // Prepare usage data by day of week
  const dayUsageMap = new Map<number, number>();
  codes.forEach(code => {
    if (code.used && code.usedAt) {
      const dayOfWeek = new Date(code.usedAt).getDay();
      dayUsageMap.set(dayOfWeek, (dayUsageMap.get(dayOfWeek) || 0) + 1);
    }
  });
  
  // Find peak usage days
  let maxUsage = 0;
  const peakDayIndices: number[] = [];
  
  for (let i = 0; i < 7; i++) {
    const usage = dayUsageMap.get(i) || 0;
    if (usage > maxUsage) {
      maxUsage = usage;
      peakDayIndices.length = 0;
      peakDayIndices.push(i);
    } else if (usage === maxUsage && maxUsage > 0) {
      peakDayIndices.push(i);
    }
  }
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const peakUsageDays = peakDayIndices.map(index => dayNames[index]);
  
  // Project monthly usage
  const historicalData = prepareUsageHistoricalData(codes);
  const model = linearRegression(
    historicalData.map((item, index) => ({ x: index, y: item.count }))
  );
  
  const dayRate = model.slope > 0 ? model.slope : (usedCodes / Math.max(30, historicalData.length));
  const projectedMonthlyUsage = Math.round(dayRate * 30);
  
  // Generate insights
  const insights: string[] = [];
  
  if (peakUsageDays.length > 0) {
    insights.push(`Peak redemption occurs on ${peakUsageDays.join(', ')}`);
  }
  
  if (redemptionRate < 30) {
    insights.push('Low redemption rate detected. Consider email reminders for unused codes.');
  } else if (redemptionRate > 70) {
    insights.push('High redemption rate indicates strong user engagement.');
  }
  
  if (model.slope > 0.5) {
    insights.push('Usage is growing rapidly. Consider increasing code generation capacity.');
  } else if (model.slope < -0.2) {
    insights.push('Usage is declining. Consider promotional campaigns to increase engagement.');
  }
  
  // Check for expiration patterns
  const expiredUnused = codes.filter(code => 
    !code.used && code.expiresAt && new Date(code.expiresAt) < new Date()
  ).length;
  
  if (expiredUnused > codes.length * 0.2) {
    insights.push('Many codes expire unused. Consider extending expiration periods or sending reminders.');
  }
  
  return {
    insights,
    peakUsageDays,
    redemptionRate,
    projectedMonthlyUsage
  };
}
