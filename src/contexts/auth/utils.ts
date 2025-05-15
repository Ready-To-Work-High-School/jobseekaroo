
import { UserProfile } from '@/types/user';

export const formatUserProfile = (data: any): UserProfile => {
  if (!data) return null;
  
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    bio: data.bio,
    location: data.location,
    resume_url: data.resume_url,
    skills: data.skills || [],
    preferences: data.preferences || {},
    user_type: data.user_type,
    avatar_url: data.avatar_url,
    email: data.email,
    company_name: data.company_name,
    company_website: data.company_website,
    job_title: data.job_title,
    employer_verification_status: data.employer_verification_status,
    verification_notes: data.verification_notes,
    resume_data_encrypted: data.resume_data_encrypted,
    contact_details_encrypted: data.contact_details_encrypted,
    created_at: data.created_at,
    updated_at: data.updated_at,
    redeemed_at: data.redeemed_at,
    redeemed_code: data.redeemed_code,
    accessibility_settings: data.accessibility_settings,
    badges: data.badges,
    student_badges: data.student_badges
  };
};
