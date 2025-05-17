
import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { KanbanHeader } from '@/components/employer/kanban/KanbanHeader';
import { KanbanStageCustomization } from '@/components/employer/kanban/KanbanStageCustomization';
import { useKanbanBoard } from '@/hooks/employer/useKanbanBoard';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { QuickNavigationMenu } from '@/components/employer/QuickNavigationMenu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showImportDialog, setShowImportDialog] = useState(false);

  useEffect(() => {
    // Load kanban data when component mounts
    loadKanbanData();
    // Show navigation menu on first load
    const hasSeenNavigation = localStorage.getItem('hasSeenNavigation');
    if (!hasSeenNavigation) {
      setShowNavigation(true);
      localStorage.setItem('hasSeenNavigation', 'true');
    }
  }, [loadKanbanData]);

  const handleStageEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Stages updated",
        description: "Your candidate pipeline has been updated."
      });
    }
  };

  const handleRefresh = useCallback(() => {
    loadKanbanData();
    toast({
      title: "Refreshed",
      description: "Candidate data has been refreshed."
    });
  }, [loadKanbanData, toast]);

  const handleAddCandidate = useCallback(() => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add candidates manually will be available soon."
    });
  }, [toast]);

  const handleFilterChange = useCallback((filter: string) => {
    setCurrentFilter(filter);
    toast({
      title: "Filter applied",
      description: `Showing ${filter} candidates.`
    });
  }, [toast]);

  const handleExport = useCallback(() => {
    toast({
      title: "Export started",
      description: "Your candidate data is being prepared for export."
    });
  }, [toast]);

  const handleImport = useCallback(() => {
    setShowImportDialog(true);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Candidate Pipeline</title>
        <meta name="description" content="Manage candidates through your hiring stages" />
      </Helmet>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Candidate Pipeline</h1>
          <p className="text-muted-foreground">Manage candidates through your hiring stages</p>
        </div>
        
        {showNavigation && (
          <QuickNavigationMenu className="mb-6" />
        )}
        
        <KanbanHeader 
          isEditing={isEditing}
          onEditingToggle={handleStageEdit}
          onRefresh={handleRefresh}
          onAddCandidate={handleAddCandidate}
          onFilterChange={handleFilterChange}
          onExport={handleExport}
          onImport={handleImport}
          hasPremium={hasPremium}
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

      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Candidates</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a CSV file with candidate information to import them into your pipeline.
              {!hasPremium && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm">
                  This feature requires a premium account. Upgrade to import candidates in bulk.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (!hasPremium) {
                window.location.href = '/employer/premium-features';
              } else {
                toast({
                  title: "Feature coming soon",
                  description: "The import feature will be available soon."
                });
              }
            }}>
              {hasPremium ? 'Import' : 'Upgrade'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default EmployerKanban;
