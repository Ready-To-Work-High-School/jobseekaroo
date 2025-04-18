
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Building, Plus, Trash2, Save, Upload, X } from 'lucide-react';

type CompanyProfile = {
  id?: string;
  company_name: string;
  description: string;
  culture_description: string;
  benefits: string[];
  industry: string;
  company_size: string;
  website_url: string;
  logo_url?: string;
};

const CompanyProfileTab = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CompanyProfile>({
    defaultValues: {
      company_name: '',
      description: '',
      culture_description: '',
      benefits: [],
      industry: '',
      company_size: '',
      website_url: '',
    }
  });

  useEffect(() => {
    if (user) {
      fetchCompanyProfile();
    }
  }, [user]);

  const fetchCompanyProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching company profile:', error);
      } else if (data) {
        setProfile(data);
        setBenefits(data.benefits || []);
        setValue('company_name', data.company_name);
        setValue('description', data.description || '');
        setValue('culture_description', data.culture_description || '');
        setValue('industry', data.industry || '');
        setValue('company_size', data.company_size || '');
        setValue('website_url', data.website_url || '');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: CompanyProfile) => {
    if (!user) return;
    
    setLoading(true);
    
    let logoUrl = profile?.logo_url || '';
    
    // Upload logo if there is one
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('company-logos')
        .upload(fileName, logoFile);
      
      if (uploadError) {
        toast({
          title: "Error uploading logo",
          description: uploadError.message,
          variant: "destructive",
        });
      } else {
        const { data } = supabase.storage.from('company-logos').getPublicUrl(fileName);
        logoUrl = data.publicUrl;
      }
    }
    
    // Include benefits array from state
    const updatedProfile = {
      ...formData,
      benefits,
      logo_url: logoUrl,
      user_id: user.id
    };
    
    try {
      const { error } = profile?.id
        ? await supabase
            .from('company_profiles')
            .update(updatedProfile)
            .eq('id', profile.id)
        : await supabase
            .from('company_profiles')
            .insert([updatedProfile]);
      
      if (error) throw error;
      
      toast({
        title: "Profile saved",
        description: "Your company profile has been updated.",
      });
      
      fetchCompanyProfile(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (benefit: string) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <Building className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Company Profile</CardTitle>
        </div>
        <CardDescription>
          Create and customize your company profile to showcase your brand and culture to students
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input 
              id="company_name" 
              placeholder="Enter company name"
              {...register('company_name', { required: 'Company name is required' })}
            />
            {errors.company_name && (
              <p className="text-sm text-red-500">{errors.company_name.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select 
                onValueChange={(value) => setValue('industry', value)} 
                defaultValue={profile?.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_size">Company Size</Label>
              <Select 
                onValueChange={(value) => setValue('company_size', value)} 
                defaultValue={profile?.company_size}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website_url">Company Website</Label>
            <Input 
              id="website_url" 
              placeholder="https://www.yourcompany.com"
              {...register('website_url')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what your company does..."
              className="min-h-[100px]"
              {...register('description')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="culture_description">Culture and Values</Label>
            <Textarea 
              id="culture_description" 
              placeholder="Describe your company culture and values..."
              className="min-h-[100px]"
              {...register('culture_description')}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-4">
              {profile?.logo_url && (
                <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                  <img 
                    src={profile.logo_url} 
                    alt="Company logo" 
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setLogoFile(file);
                  }}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 400x400px. Max 2MB.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Employee Benefits</Label>
            
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
                  <span className="text-sm">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(benefit)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add a benefit (e.g., Healthcare, Flexible hours)"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddBenefit}
                disabled={!newBenefit.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t pt-6">
          <Button disabled={loading} type="submit">
            {loading ? 'Saving...' : 'Save Profile'}
            {!loading && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CompanyProfileTab;
