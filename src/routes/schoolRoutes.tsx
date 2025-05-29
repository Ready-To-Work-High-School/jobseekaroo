
import { Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SchoolGuide from '@/components/guide/SchoolGuide';
import SchoolDashboard from '@/pages/SchoolDashboard';
import CounselorDashboard from '@/pages/CounselorDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import SchoolAuth from '@/pages/SchoolAuth';
import SchoolLanding from '@/pages/SchoolLanding';

export const SchoolRoutes = (
  <>
    <Route path="/school-guide" element={
      <Layout>
        <SchoolGuide />
      </Layout>
    } />
    
    <Route path="/school-auth" element={<SchoolAuth />} />
    
    <Route path="/school-landing" element={<SchoolLanding />} />
    
    <Route path="/school-dashboard" element={
      <Layout>
        <ProtectedRoute requiredRoles={['admin', 'teacher', 'counselor']}>
          <SchoolDashboard />
        </ProtectedRoute>
      </Layout>
    } />
    
    <Route path="/counselor-dashboard" element={
      <Layout>
        <ProtectedRoute requiredRoles={['admin', 'counselor']}>
          <CounselorDashboard />
        </ProtectedRoute>
      </Layout>
    } />
    
    <Route path="/teacher-dashboard" element={
      <Layout>
        <ProtectedRoute requiredRoles={['admin', 'teacher']}>
          <TeacherDashboard />
        </ProtectedRoute>
      </Layout>
    } />
  </>
);
