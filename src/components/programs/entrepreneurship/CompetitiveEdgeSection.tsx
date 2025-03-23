
import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

const CompetitiveEdgeSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Competitive Edge in the Workforce</h2>
              <p className="text-lg text-gray-700 mb-4">
                Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
                advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification curriculum.
              </p>
              <p className="text-lg text-gray-700">
                Students also learn and earn digital credentials for emerging 21st century technology trends:
              </p>
            </div>
            
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Artificial Intelligence Foundations</h3>
                    <p className="text-sm text-gray-600">Understanding AI principles and applications</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16V8H17V16H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Blockchain</h3>
                    <p className="text-sm text-gray-600">Exploring distributed ledger technologies</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12C10 8.68629 12.6863 6 16 6C19.3137 6 22 8.68629 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 18C5.23858 18 3 15.7614 3 13C3 10.2386 5.23858 8 8 8C9.56719 8 10.9672 8.70142 11.8945 9.80545" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cloud Computing</h3>
                    <p className="text-sm text-gray-600">Learning cloud services and infrastructure</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Emerging Technologies</h3>
                    <p className="text-sm text-gray-600">Staying ahead with cutting-edge tech</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3 sm:col-span-2">
                  <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.5C5 11.1193 6.11929 10 7.5 10C8.88071 10 10 11.1193 10 12.5C10 13.8807 8.88071 15 7.5 15C6.11929 15 5 13.8807 5 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 6.5C16.5 5.11929 17.6193 4 19 4C20.3807 4 21.5 5.11929 21.5 6.5C21.5 7.88071 20.3807 9 19 9C17.6193 9 16.5 7.88071 16.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5H14M14 12.5V8M14 12.5L9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Internet of Things (IoT)</h3>
                    <p className="text-sm text-gray-600">Connecting and automating the physical world through digital technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
