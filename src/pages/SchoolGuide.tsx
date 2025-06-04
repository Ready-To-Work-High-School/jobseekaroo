
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { useFadeIn } from '@/utils/animations';
import SchoolGuideHeader from '@/components/school/SchoolGuideHeader';
import ResourcesSection from '@/components/school/ResourcesSection';
import ExclusiveFeaturesSection from '@/components/school/ExclusiveFeaturesSection';
import ContactSection from '@/components/school/ContactSection';
import SchoolGuideLogo from '@/components/school/SchoolGuideLogo';

const SchoolGuide = () => {
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <Helmet>
        <title>School Guide | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Resources and guides for school administrators and teachers to help students prepare for their first jobs."
        />
      </Helmet>

      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Main content */}
          <div>
            <SchoolGuideHeader />
            <ResourcesSection />
            <ExclusiveFeaturesSection />
            <ContactSection />
          </div>

          {/* Right side - Large logo */}
          <SchoolGuideLogo />
        </div>
      </div>
    </Layout>
  );
};

export default SchoolGuide;
