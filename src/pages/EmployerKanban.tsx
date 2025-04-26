
import React from 'react';
import Layout from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { KanbanHeader } from '@/components/employer/kanban/KanbanHeader';
import { KanbanStageCustomization } from '@/components/employer/kanban/KanbanStageCustomization';
import { useKanbanBoard } from '@/hooks/employer/useKanbanBoard';

const EmployerKanban = () => {
  const {
    stages,
    isEditing,
    newStageTitle,
    setIsEditing,
    setNewStageTitle,
    handleAddStage,
    handleRemoveStage,
    handleMoveItem,
    handleUpdateItem,
  } = useKanbanBoard();

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
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
