
import { Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SchoolGuide from '@/components/guide/SchoolGuide';
import SchoolDashboard from '@/pages/SchoolDashboard';
import CounselorDashboard from '@/pages/CounselorDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';

export const SchoolRoutes = (
  <>
    <Route path="/school-guide" element={
      <Layout>
        <SchoolGuide />
      </Layout>
    } />
    
    <Route path="/school-dashboard" element={
      <ProtectedRoute requiredRoles={['admin', 'teacher', 'counselor']}>
        <Layout>
          <SchoolDashboard />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/counselor-dashboard" element={
      <ProtectedRoute requiredRoles={['admin', 'counselor']}>
        <Layout>
          <CounselorDashboard />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/teacher-dashboard" element={
      <ProtectedRoute requiredRoles={['admin', 'teacher']}>
        <Layout>
          <TeacherDashboard />
        </Layout>
      </ProtectedRoute>
    } />
  </>
);
