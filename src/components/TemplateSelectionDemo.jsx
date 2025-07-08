import React from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import TemplateSelection from '../components/TemplateSelection';

const TemplateSelectionDemo = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Resume Template Selection Demo
            </h1>
            <p className="text-lg text-gray-600">
              Experience our interactive template selection with live previews
            </p>
          </div>
          
          <TemplateSelection />
          
          <div className="mt-12 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Features of Our Template Selection:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>6 Professional Templates</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Live Preview</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Responsive Design</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Easy Template Switching</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Industry-Specific Designs</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>ATS-Friendly Options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default TemplateSelectionDemo;
