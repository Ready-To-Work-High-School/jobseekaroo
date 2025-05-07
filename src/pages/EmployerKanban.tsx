
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { KanbanHeader } from '@/components/employer/kanban/KanbanHeader';
import { KanbanStageCustomization } from '@/components/employer/kanban/KanbanStageCustomization';
import { useKanbanBoard } from '@/hooks/employer/useKanbanBoard';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';

const EmployerKanban = () => {
  const {
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
    loadKanbanData,
  } = useKanbanBoard();

  const { toast } = useToast();

  useEffect(() => {
    // Load kanban data when component mounts
    loadKanbanData();
  }, [loadKanbanData]);

  // Show toast when kanban board is loaded
  useEffect(() => {
    if (stages && stages.length > 0) {
      console.log("Kanban board stages loaded:", stages);
    }
  }, [stages]);

  const handleStageEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Stages updated",
        description: "Your candidate pipeline has been updated."
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Candidate Pipeline | Employer Dashboard</title>
      </Helmet>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Candidate Pipeline</h1>
          <p className="text-muted-foreground">Manage candidates through your hiring stages</p>
        </div>
        
        <KanbanHeader 
          isEditing={isEditing}
          onEditingToggle={handleStageEdit}
        />

        {isEditing && (
          <KanbanStageCustomization
            stages={stages}
            newStageTitle={newStageTitle}
            onNewStageTitleChange={setNewStageTitle}
            onAddStage={handleAddStage}
            onRemoveStage={handleRemoveStage}
            hasPremium={hasPremium}
          />
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
