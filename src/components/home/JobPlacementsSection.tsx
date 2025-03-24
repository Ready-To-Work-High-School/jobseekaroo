import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { BriefcaseBusiness, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Job placement metrics
const metrics = [{
  id: 1,
  label: "Students Placed",
  value: "90%",
  icon: <GraduationCap className="h-8 w-8 text-amber-500" />,
  description: "of credentialed students found employment within 3 months"
}, {
  id: 2,
  label: "Employers Hiring",
  value: "52+",
  icon: <BriefcaseBusiness className="h-8 w-8 text-blue-500" />,
  description: "local employers actively recruiting from our platform"
}, {
  id: 3,
  label: "Community Growth",
  value: "200+",
  icon: <Users className="h-8 w-8 text-green-500" />,
  description: "students joined our community in the past year"
}];
const JobPlacementsSection = () => {
  const fadeInSlow = useFadeIn(600);
  return <section className={cn("py-16 bg-white", fadeInSlow)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-amber-400 opacity-75 blur-sm"></div>
            <Card className="relative inline-block border-blue-300 bg-blue-50 shadow-md mb-4">
              <CardContent className="px-8 py-3">
                <h2 className="text-3xl font-bold text-gray-900">Projected Goals</h2>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects credentialed high school students with meaningful career opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map(metric => <div key={metric.id} className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-sky-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-50 p-3 rounded-full">
                  {metric.icon}
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-center text-gray-900">{metric.value}</h3>
              <p className="text-lg font-medium text-center text-gray-700 mt-2">{metric.label}</p>
              <p className="text-gray-500 text-center mt-2">{metric.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default JobPlacementsSection;