
import React from 'react';
import { GraduationCap, Briefcase, School, ShieldCheck, Code2, Building } from 'lucide-react';

export type UserTypeInfo = {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  emailDomainExample: string;
}

export const userTypes: Record<string, UserTypeInfo> = {
  student: {
    value: 'student',
    label: 'Students',
    icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
    description: 'Generate codes for student access to job search and training resources',
    emailDomainExample: 'students.westsidehigh.edu'
  },
  employer: {
    value: 'employer',
    label: 'Employers',
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    description: 'Generate codes for employers to post jobs and access candidate profiles',
    emailDomainExample: 'company.com'
  },
  teacher: {
    value: 'teacher',
    label: 'Teachers',
    icon: <School className="h-5 w-5 text-emerald-500" />,
    description: 'Generate codes for teachers to access educational resources and monitor students',
    emailDomainExample: 'teachers.westsidehigh.edu'
  },
  admin: {
    value: 'admin',
    label: 'Administrators',
    icon: <ShieldCheck className="h-5 w-5 text-red-500" />,
    description: 'Generate codes for school administrators with full platform access',
    emailDomainExample: 'admin.westsidehigh.edu'
  },
  partner: {
    value: 'partner',
    label: 'Developers/Partners',
    icon: <Code2 className="h-5 w-5 text-blue-500" />,
    description: 'Generate codes for technical partners and platform developers',
    emailDomainExample: 'partner.westsidehigh.edu'
  },
  school: {
    value: 'school',
    label: 'Schools',
    icon: <Building className="h-5 w-5 text-purple-500" />,
    description: 'Generate codes for school institutional accounts',
    emailDomainExample: 'westsidehigh.edu'
  }
};
