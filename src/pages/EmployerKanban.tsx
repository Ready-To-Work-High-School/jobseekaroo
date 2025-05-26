import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from '@/components/employer/kanban/KanbanBoard';
import { KanbanHeader } from '@/components/employer/kanban/KanbanHeader';
import { KanbanStageCustomization } from '@/components/employer/kanban/KanbanStageCustomization';
import { useKanbanBoard } from '@/hooks/employer/useKanbanBoard';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import { QuickNavigationMenu } from '@/components/employer/QuickNavigationMenu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, GraduationCap, MapPin, Clock } from 'lucide-react';

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

  // Sample candidates data
  const sampleCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      grade: "12th Grade",
      academy: "Business Academy",
      skills: ["Customer Service", "Microsoft Office", "Communication"],
      stage: "Applied",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL",
      appliedDate: "2 days ago",
      email: "sarah.j@email.com"
    },
    {
      id: 2,
      name: "Marcus Williams",
      grade: "11th Grade",
      academy: "IT Academy",
      skills: ["Computer Science", "Problem Solving", "Teamwork"],
      stage: "Screening",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL",
      appliedDate: "1 day ago",
      email: "marcus.w@email.com"
    },
    {
      id: 3,
      name: "Emma Davis",
      grade: "12th Grade",
      academy: "Health Sciences",
      skills: ["First Aid", "Organization", "Leadership"],
      stage: "Interview",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL",
      appliedDate: "3 days ago",
      email: "emma.d@email.com"
    },
    {
      id: 4,
      name: "Jordan Martinez",
      grade: "11th Grade",
      academy: "Engineering",
      skills: ["Problem Solving", "Critical Thinking", "Adaptability"],
      stage: "Hired",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL",
      appliedDate: "1 week ago",
      email: "jordan.m@email.com"
    }
  ];

  const kanbanStages = [
    { id: 'applied', title: 'Applied', candidates: sampleCandidates.filter(c => c.stage === 'Applied') },
    { id: 'screening', title: 'Screening', candidates: sampleCandidates.filter(c => c.stage === 'Screening') },
    { id: 'interview', title: 'Interview', candidates: sampleCandidates.filter(c => c.stage === 'Interview') },
    { id: 'hired', title: 'Hired', candidates: sampleCandidates.filter(c => c.stage === 'Hired') }
  ];

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

        {/* Sample Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {kanbanStages.map((stage) => (
            <Card key={stage.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {stage.candidates.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {stage.candidates.map((candidate) => (
                  <Card key={candidate.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-xs">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.grade}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        <span className="truncate">{candidate.academy}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{candidate.location}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Applied {candidate.appliedDate}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-[10px] px-1 py-0">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            +{candidate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className="mt-8">
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Interactive Pipeline Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The drag-and-drop functionality will be available once you start receiving applications.
              </p>
            </div>
          </div>
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
