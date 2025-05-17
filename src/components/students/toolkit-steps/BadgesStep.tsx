
import React, { useState } from 'react';
import StudentBadges, { StudentBadge } from '@/components/students/badges/StudentBadges';
import EmployerEndorsements, { EmployerEndorsement } from '@/components/students/badges/EmployerEndorsements';
import BadgeQuiz from '@/components/students/badges/BadgeQuiz';
import { Brain, Briefcase, Clock, Shield, Star, Users } from 'lucide-react';

const BadgesStep: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<StudentBadge | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [badges, setBadges] = useState<StudentBadge[]>([
    {
      id: 'reliable',
      name: 'Reliable',
      description: 'Demonstrates punctuality, dependability, and consistent follow-through',
      icon: <Clock className="h-5 w-5" />,
      earned: false,
      type: 'character'
    },
    {
      id: 'team-player',
      name: 'Team Player',
      description: 'Works well with others and contributes positively to group dynamics',
      icon: <Users className="h-5 w-5" />,
      earned: false,
      type: 'character'
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: 'Approaches challenges with creativity and finds effective solutions',
      icon: <Brain className="h-5 w-5" />,
      earned: true,
      earnedDate: '2023-11-15',
      type: 'skill'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Maintains appropriate workplace behavior and communication',
      icon: <Briefcase className="h-5 w-5" />,
      earned: false,
      type: 'character'
    },
    {
      id: 'adaptable',
      name: 'Adaptable',
      description: 'Adjusts well to changing conditions and requirements',
      icon: <Star className="h-5 w-5" />,
      earned: false,
      type: 'character'
    },
    {
      id: 'ethical',
      name: 'Ethical Worker',
      description: 'Demonstrates integrity and ethical behavior in workplace situations',
      icon: <Shield className="h-5 w-5" />,
      earned: true,
      earnedDate: '2023-10-22',
      type: 'character'
    }
  ]);

  const endorsements: EmployerEndorsement[] = [
    {
      id: 'end-1',
      employerName: 'Sarah Johnson',
      companyName: 'TechStart Inc.',
      endorsementText: "This student demonstrated excellent problem-solving skills during their internship. They approached challenges methodically and weren't afraid to ask questions when needed.",
      badgeIds: ['problem-solver', 'ethical'],
      date: 'October 22, 2023'
    }
  ];

  const handleEarnBadgeClick = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (badge && !badge.earned) {
      setSelectedBadge(badge);
      setQuizOpen(true);
    }
  };

  const handleBadgeEarned = (badgeId: string) => {
    setBadges(prevBadges => 
      prevBadges.map(badge => 
        badge.id === badgeId 
          ? {
              ...badge,
              earned: true,
              earnedDate: new Date().toISOString().split('T')[0]
            }
          : badge
      )
    );
  };

  return (
    <div className="space-y-6">
      <StudentBadges 
        badges={badges} 
        showEarnBadgeButton={true}
        onEarnBadgeClick={handleEarnBadgeClick}
      />
      
      <EmployerEndorsements 
        endorsements={endorsements} 
        studentBadges={badges.map(badge => ({ id: badge.id, name: badge.name }))} 
      />
      
      {selectedBadge && (
        <BadgeQuiz 
          open={quizOpen}
          onClose={() => setQuizOpen(false)}
          badge={selectedBadge}
          onBadgeEarned={handleBadgeEarned}
        />
      )}
    </div>
  );
};

export default BadgesStep;
