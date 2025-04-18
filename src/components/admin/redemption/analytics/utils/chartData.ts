
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
