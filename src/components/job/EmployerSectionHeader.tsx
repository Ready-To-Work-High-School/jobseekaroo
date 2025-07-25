import { Building2, TrendingUp } from 'lucide-react';
export const EmployerSectionHeader = () => {
  return <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-800 text-center">Top Paying Employers in Jacksonville, Fl</h2>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <span>Real-time wage data</span>
      </div>
    </div>;
};