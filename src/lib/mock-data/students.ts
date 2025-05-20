
import { v4 as uuidv4 } from 'uuid';

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  academy: 'Entrepreneurship' | 'General';
  skills: string[];
  certifications: string[];
  interests: string[];
  availability: {
    afterSchool: boolean;
    weekends: boolean;
    summer: boolean;
  };
  avatar?: string;
  bio: string;
  workEligible: boolean;
  preferredJobTypes: string[];
}

export const mockStudentProfiles: StudentProfile[] = [
  {
    id: uuidv4(),
    firstName: 'Emily',
    lastName: 'Johnson',
    grade: 12,
    academy: 'Entrepreneurship',
    skills: ['Customer Service', 'Social Media', 'Microsoft Office'],
    certifications: ['ESB (Entrepreneurship and Small Business)', 'First Aid'],
    interests: ['Business', 'Marketing', 'Technology'],
    availability: {
      afterSchool: true,
      weekends: true,
      summer: true,
    },
    avatar: '/lovable-uploads/7518f1a5-62ad-490c-9c24-0bbc649ab7ff.png',
    bio: 'A motivated senior with entrepreneurship certification seeking part-time retail or office experience.',
    workEligible: true,
    preferredJobTypes: ['retail', 'office', 'customer service']
  },
  {
    id: uuidv4(),
    firstName: 'Tyler',
    lastName: 'Smith',
    grade: 10,
    academy: 'General',
    skills: ['Computer Repair', 'Programming Basics', 'Hardware Installation'],
    certifications: ['IT Fundamentals'],
    interests: ['Technology', 'Computers', 'Gaming'],
    availability: {
      afterSchool: true,
      weekends: true,
      summer: true,
    },
    bio: 'Sophomore with technical skills looking for IT support or retail tech positions.',
    workEligible: true,
    preferredJobTypes: ['tech', 'customer service', 'retail']
  },
  {
    id: uuidv4(),
    firstName: 'Aisha',
    lastName: 'Washington',
    grade: 12,
    academy: 'Entrepreneurship',
    skills: ['Sales', 'Public Speaking', 'Leadership'],
    certifications: ['ESB', 'Sales Associate Professional'],
    interests: ['Finance', 'Real Estate', 'Public Relations'],
    availability: {
      afterSchool: true,
      weekends: true,
      summer: true,
    },
    avatar: '/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg',
    bio: 'Senior with strong leadership skills seeking business or sales opportunities.',
    workEligible: true,
    preferredJobTypes: ['sales', 'office', 'customer service']
  },
  {
    id: uuidv4(),
    firstName: 'Jamal',
    lastName: 'Thompson',
    grade: 11,
    academy: 'Entrepreneurship',
    skills: ['Graphic Design', 'Social Media Marketing', 'Video Editing'],
    certifications: ['Adobe Creative Suite', 'Digital Marketing'],
    interests: ['Design', 'Marketing', 'Entertainment'],
    availability: {
      afterSchool: true,
      weekends: false,
      summer: true,
    },
    bio: 'Creative junior seeking opportunities in marketing, design, or media.',
    workEligible: true,
    preferredJobTypes: ['media', 'marketing', 'tech']
  },
  {
    id: uuidv4(),
    firstName: 'Emma',
    lastName: 'Chen',
    grade: 12,
    academy: 'Entrepreneurship',
    skills: ['Organization', 'Communication', 'Basic Business Skills'],
    certifications: ['ESB', 'Marketing Fundamentals'],
    interests: ['Marketing', 'Business Management', 'Entrepreneurship'],
    availability: {
      afterSchool: false,
      weekends: true,
      summer: true,
    },
    bio: 'Senior interested in business management and marketing.',
    workEligible: true,
    preferredJobTypes: ['marketing', 'office', 'retail']
  }
];

export const getRandomStudents = (count: number = 3): StudentProfile[] => {
  const shuffled = [...mockStudentProfiles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, mockStudentProfiles.length));
};
