
import React from 'react';

const ContactEnrollmentSection = () => {
  return (
    <section>
      <div className="bg-blue-50 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Join Our Academy</h2>
          <p className="text-lg text-gray-700 mb-6">
            Interested in enrolling or learning more about our Entrepreneurship Academy? 
            Contact us today to schedule a visit or speak with our program coordinator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:ColemanP3@duvalschools.org" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Program Coordinator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactEnrollmentSection;
