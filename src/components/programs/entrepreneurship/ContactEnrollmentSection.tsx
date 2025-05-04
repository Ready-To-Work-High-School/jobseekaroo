
import React from 'react';
import { sanitizeHtml } from '@/utils/sanitization';

const ContactEnrollmentSection = () => {
  // Sanitize the email address for safe rendering in href
  const safeEmail = sanitizeHtml('school@jobseeker4hs.org');
  
  return <section>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 mb-12 border border-amber-800/30 bg-yellow-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-4">Join Our Academy</h2>
          <p className="text-lg text-gray-300 mb-6">
            Interested in enrolling or learning more about our Entrepreneurship Academy? 
            Contact us today to schedule a visit or speak with our program coordinator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${safeEmail}`} 
              className="inline-flex items-center justify-center px-6 py-3 border border-amber-600 text-base font-medium rounded-md text-amber-200 hover:text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
            >
              Contact Program Coordinator
            </a>
          </div>
        </div>
      </div>
    </section>;
};

export default ContactEnrollmentSection;
