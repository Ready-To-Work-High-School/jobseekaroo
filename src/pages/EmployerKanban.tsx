
import React from 'react';
import Layout from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { KanbanHeader } from '@/components/employer/kanban/KanbanHeader';
import { KanbanStageCustomization } from '@/components/employer/kanban/KanbanStageCustomization';
import { useKanbanBoard } from '@/hooks/employer/useKanbanBoard';
import { Helmet } from 'react-helmet';

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
  } = useKanbanBoard();

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
          onEditingToggle={() => setIsEditing(!isEditing)}
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
