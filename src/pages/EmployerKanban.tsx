
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Settings, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { mockStudentProfiles } from '@/lib/mock-data/students';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KanbanStage {
  id: string;
  title: string;
  items: KanbanItem[];
}

interface KanbanItem {
  id: string;
  studentId: string;
  name: string;
  grade: number;
  academy: string;
  avatar?: string;
  status: 'pending' | 'interviewing' | 'selected' | 'rejected' | 'hired' | null;
  notes: string;
}

const EmployerKanban = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newStageTitle, setNewStageTitle] = useState('');
  const [stages, setStages] = useState<KanbanStage[]>([
    { id: '1', title: 'Applied', items: [] },
    { id: '2', title: 'Screening', items: [] },
    { id: '3', title: 'Interview', items: [] },
    { id: '4', title: 'Hired', items: [] },
  ]);

  // Initialize with mock student data
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

    // Distribute students randomly among the first two stages
    setStages(prevStages => {
      const newStages = [...prevStages];
      initialItems.forEach((item, index) => {
        // Place in either Applied or Screening stage
        const stageIndex = index % 2 === 0 ? 0 : 1;
        newStages[stageIndex].items.push(item);
      });
      return newStages;
    });
  }, []);

  const handleAddStage = () => {
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
    // Find stage to remove
    const stageToRemove = stages.find(stage => stage.id === stageId);
    if (!stageToRemove) return;

    // Move items from removed stage to Applied stage
    const newStages = stages.map(stage => {
      if (stage.id === '1') { // Applied stage id
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
    
    // Create new stages array with the item moved
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

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Candidate Pipeline</h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop candidates between stages to track their progress
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
            {isEditing ? 'Save Layout' : 'Edit Stages'}
          </Button>
        </div>

        {isEditing && (
          <Card className="mb-6 bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Customize Pipeline Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {stages.map(stage => (
                    <Badge key={stage.id} variant="outline" className="px-3 py-1.5 text-sm flex items-center gap-1 bg-card">
                      {stage.title}
                      {/* Don't allow removing the Applied stage */}
                      {stage.id !== '1' && (
                        <button 
                          onClick={() => handleRemoveStage(stage.id)}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="New Stage Name"
                    value={newStageTitle}
                    onChange={(e) => setNewStageTitle(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={handleAddStage} className="gap-1">
                    <Plus className="h-4 w-4" /> Add Stage
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Note: Items from deleted stages will be moved back to the Applied stage.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <DndProvider backend={HTML5Backend}>
          <KanbanBoard 
            stages={stages} 
            onMoveItem={handleMoveItem} 
            onUpdateItem={handleUpdateItem} 
          />
        </DndProvider>
      </div>
    </Layout>
  );
};

export default EmployerKanban;
