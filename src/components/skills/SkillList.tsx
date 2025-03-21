import { useState } from 'react';
import { UserSkill } from '@/types/skills';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { BookOpen, Plus, Trash, Edit, BarChart3, Star, Target } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const skillFormSchema = z.object({
  skill_name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  proficiency_level: z.number().min(1).max(5),
  is_learning: z.boolean().default(false),
  target_level: z.number().min(1).max(5).optional(),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillListProps {
  skills: UserSkill[];
  isLoading: boolean;
  onAddSkill: (skill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onUpdateSkill: (skillId: string, updates: Partial<UserSkill>) => Promise<void>;
  onDeleteSkill: (skillId: string, skillName: string) => Promise<void>;
  onSelectSkill: (skillName: string) => void;
}

const SkillList = ({ 
  skills, 
  isLoading, 
  onAddSkill, 
  onUpdateSkill, 
  onDeleteSkill,
  onSelectSkill 
}: SkillListProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skill_name: "",
      proficiency_level: 1,
      is_learning: false,
      target_level: 3,
    },
  });
  
  const onSubmit = async (values: SkillFormValues) => {
    if (editingSkill) {
      await onUpdateSkill(editingSkill.id, values);
    } else {
      const skillData: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
        skill_name: values.skill_name,
        proficiency_level: values.proficiency_level,
        is_learning: values.is_learning,
        target_level: values.target_level,
      };
      await onAddSkill(skillData);
    }
    
    form.reset({
      skill_name: "",
      proficiency_level: 1,
      is_learning: false,
      target_level: 3,
    });
    
    setShowAddDialog(false);
    setEditingSkill(null);
  };
  
  const handleEdit = (skill: UserSkill) => {
    setEditingSkill(skill);
    form.reset({
      skill_name: skill.skill_name,
      proficiency_level: skill.proficiency_level,
      is_learning: skill.is_learning,
      target_level: skill.target_level,
    });
    setShowAddDialog(true);
  };
  
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Elementary";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Unknown";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Skills</h2>
        <Button onClick={() => {
          setEditingSkill(null);
          form.reset({
            skill_name: "",
            proficiency_level: 1,
            is_learning: false,
            target_level: 3,
          });
          setShowAddDialog(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {skill.skill_name}
                      {skill.is_learning && (
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-300">
                          Learning
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Proficiency: {getProficiencyLabel(skill.proficiency_level)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete '{skill.skill_name}' from your skills?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => onDeleteSkill(skill.id, skill.skill_name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{skill.proficiency_level}/5</span>
                </div>
                
                {skill.is_learning && skill.target_level && (
                  <div className="flex items-center gap-2 mt-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Target: {getProficiencyLabel(skill.target_level)}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onSelectSkill(skill.skill_name)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Find Resources
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/40">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
            <p className="text-muted-foreground mb-4">
              Track your skills and proficiency levels to help match with job opportunities.
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      )}
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
            <DialogDescription>
              {editingSkill 
                ? 'Update your skill information and proficiency level.'
                : 'Add a new skill to your profile. Rate your proficiency from 1 (beginner) to 5 (expert).'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="skill_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. JavaScript, Customer Service" 
                        {...field} 
                        disabled={!!editingSkill}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="proficiency_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level: {getProficiencyLabel(field.value)}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between text-xs mt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_learning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Learning in Progress</FormLabel>
                      <FormDescription>
                        Mark if you're actively learning this skill
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {form.watch('is_learning') && (
                <FormField
                  control={form.control}
                  name="target_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Level: {getProficiencyLabel(field.value || 3)}</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[field.value || 3]}
                          onValueChange={(values) => field.onChange(values[0])}
                        />
                      </FormControl>
                      <FormDescription className="flex justify-between text-xs mt-1">
                        <span>Beginner</span>
                        <span>Expert</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter>
                <Button type="submit">
                  {editingSkill ? 'Save Changes' : 'Add Skill'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillList;
