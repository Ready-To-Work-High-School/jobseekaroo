
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Award, Check, Star } from 'lucide-react';
import { BadgeIcon, badgeIconMap } from '@/components/badges/BadgeIcon';
import { UserBadge } from '@/types/badges';
import { awardBadge } from '@/utils/badge-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

// Define the form schema with Zod
const formSchema = z.object({
  studentId: z.string().uuid({
    message: "Please select a student",
  }),
  badgeId: z.string().min(1, {
    message: "Please select a badge to award",
  }),
  endorsementText: z.string().min(10, {
    message: "Please provide at least 10 characters explaining why this badge is being awarded",
  }).max(500, {
    message: "Endorsement text cannot exceed 500 characters"
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface StudentOption {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface BadgeOption {
  id: string;
  name: string;
}

const BadgeAwardForm: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>("");
  
  // Available badges that can be awarded
  const availableBadges: BadgeOption[] = [
    { id: 'reliable', name: 'Reliable' },
    { id: 'team_player', name: 'Team Player' },
    { id: 'problem_solver', name: 'Problem Solver' },
    { id: 'professional', name: 'Professional' },
    { id: 'adaptable', name: 'Adaptable' },
    { id: 'ethical', name: 'Ethical' },
    { id: 'leader', name: 'Leader' },
    { id: 'punctual', name: 'Punctual' },
    { id: 'creative', name: 'Creative' }
  ];
  
  // Set up react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      badgeId: "",
      endorsementText: "",
    },
  });

  // Fetch list of student users
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email, avatar_url')
          .eq('user_type', 'student');
          
        if (error) throw error;
        
        const studentOptions: StudentOption[] = data.map(student => ({
          id: student.id,
          name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
          email: student.email || '',
          avatarUrl: student.avatar_url
        }));
        
        setStudents(studentOptions);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
      }
    };

    fetchStudents();
  }, []);
  
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error('You must be logged in to award badges');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Find the badge name from the selected badge ID
      const selectedBadge = availableBadges.find(badge => badge.id === values.badgeId);
      if (!selectedBadge) throw new Error('Selected badge not found');
      
      // Award the badge to the student
      await awardBadge(values.studentId, values.badgeId, selectedBadge.name);
      
      // Record the endorsement
      const { error: endorsementError } = await supabase
        .from('employer_endorsements')
        .insert({
          employer_id: user.id,
          student_id: values.studentId,
          badge_ids: [values.badgeId],
          endorsement_text: values.endorsementText
        });
      
      if (endorsementError) throw endorsementError;
      
      // Success notification and reset form
      toast.success('Badge successfully awarded');
      form.reset();
      setSelectedBadgeId("");
      
    } catch (error: any) {
      console.error('Error awarding badge:', error);
      toast.error(error.message || 'Failed to award badge');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-500" />
          Award Student Badge
        </CardTitle>
        <CardDescription>
          Recognize student skills and character traits to help them in their career journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Student</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student to award badge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="badgeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Badge</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedBadgeId(value);
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select badge to award" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableBadges.map((badge) => (
                        <SelectItem key={badge.id} value={badge.id}>
                          <div className="flex items-center gap-2">
                            <BadgeIcon badgeId={badge.id} className="text-amber-500" />
                            {badge.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedBadgeId && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <p className="text-sm text-amber-800 font-medium mb-2">Preview of badge</p>
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-amber-100"
                >
                  <BadgeIcon badgeId={selectedBadgeId} className="text-amber-500" />
                  <span className="font-medium">
                    {availableBadges.find(b => b.id === selectedBadgeId)?.name}
                  </span>
                </motion.div>
              </motion.div>
            )}
            
            <FormField
              control={form.control}
              name="endorsementText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endorsement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why you are awarding this badge to the student..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your endorsement will help the student understand the qualities that earned them this recognition.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Check className="h-4 w-4" />
              )}
              Award Badge
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BadgeAwardForm;
