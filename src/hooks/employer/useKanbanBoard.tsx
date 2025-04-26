import { useState, useEffect } from 'react';
import { mockStudentProfiles } from '@/lib/mock-data/students';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { KanbanItem, KanbanStage } from '@/components/employer/kanban/types';

export const useKanbanBoard = () => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newStageTitle, setNewStageTitle] = useState('');

  // Check if user has premium access
  const hasPremium = userProfile?.preferences?.hasPremium === true;

  // Define initial stages based on plan type
  const getInitialStages = () => {
    if (hasPremium) {
      return [
        { id: '1', title: 'Applied', items: [] },
        { id: '2', title: 'Screening', items: [] },
        { id: '3', title: 'Interview', items: [] },
        { id: '4', title: 'Hired', items: [] },
      ];
    }
    return [
      { id: '1', title: 'Applied', items: [] },
      { id: '2', title: 'Interview', items: [] },
      { id: '3', title: 'Hired', items: [] },
    ];
  };

  const [stages, setStages] = useState<KanbanStage[]>(getInitialStages());

  useEffect(() => {
    const initialItems: KanbanItem[] = mockStudentProfiles.map(student => ({
      id: `item-${student.id}`,
      studentId: student.id,
      name: `${student.firstName} ${student.lastName}`,
      grade: student.grade,
      academy: student.academy,
      avatar: student.avatar,
      status: null,
      notes: '',
    }));

    setStages(prevStages => {
      const newStages = [...prevStages];
      initialItems.forEach((item, index) => {
        const stageIndex = index % 2 === 0 ? 0 : 1;
        newStages[stageIndex].items.push(item);
      });
      return newStages;
    });
  }, []);

  const handleAddStage = () => {
    if (!hasPremium) {
      toast({
        title: "Premium Feature",
        description: "Custom pipeline stages are available with our premium plan.",
        variant: "destructive",
      });
      return;
    }

    if (!newStageTitle.trim()) {
      toast({
        title: "Stage name required",
        description: "Please provide a name for the new stage.",
        variant: "destructive",
      });
      return;
    }

    const newStage: KanbanStage = {
      id: `stage-${Date.now()}`,
      title: newStageTitle,
      items: [],
    };

    setStages([...stages, newStage]);
    setNewStageTitle('');
  };

  const handleRemoveStage = (stageId: string) => {
    if (!hasPremium) {
      toast({
        title: "Premium Feature",
        description: "Custom pipeline stages are available with our premium plan.",
        variant: "destructive",
      });
      return;
    }

    const stageToRemove = stages.find(stage => stage.id === stageId);
    if (!stageToRemove) return;

    const newStages = stages.map(stage => {
      if (stage.id === '1') {
        return {
          ...stage,
          items: [...stage.items, ...stageToRemove.items],
        };
      }
      return stage;
    }).filter(stage => stage.id !== stageId);

    setStages(newStages);
  };

  const handleMoveItem = (itemId: string, fromStageId: string, toStageId: string) => {
    const fromStageIndex = stages.findIndex(s => s.id === fromStageId);
    const toStageIndex = stages.findIndex(s => s.id === toStageId);
    
    if (fromStageIndex === -1 || toStageIndex === -1) return;
    
    const item = stages[fromStageIndex].items.find(i => i.id === itemId);
    if (!item) return;
    
    const newStages = [...stages];
    newStages[fromStageIndex] = {
      ...newStages[fromStageIndex],
      items: newStages[fromStageIndex].items.filter(i => i.id !== itemId),
    };
    
    newStages[toStageIndex] = {
      ...newStages[toStageIndex],
      items: [...newStages[toStageIndex].items, item],
    };
    
    setStages(newStages);
    
    toast({
      title: "Candidate moved",
      description: `${item.name} moved to ${stages[toStageIndex].title}`,
    });
  };

  const handleUpdateItem = (itemId: string, stageId: string, updates: Partial<KanbanItem>) => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    if (stageIndex === -1) return;
    
    const itemIndex = stages[stageIndex].items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;
    
    const newStages = [...stages];
    newStages[stageIndex].items[itemIndex] = {
      ...newStages[stageIndex].items[itemIndex],
      ...updates,
    };
    
    setStages(newStages);
  };

  return {
    stages,
    isEditing,
    newStageTitle,
    hasPremium,
    setIsEditing,
    setNewStageTitle,
    handleAddStage,
    handleRemoveStage,
    handleMoveItem,
    handleUpdateItem,
  };
};
