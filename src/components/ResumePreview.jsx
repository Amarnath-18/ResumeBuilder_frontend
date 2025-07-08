import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import TemplatePreview from "./templates/TemplatePreview";

const ResumePreview = ({ resumeData: propResumeData, template: propTemplate }) => {
  const { resumeData: contextResumeData, currentTemplate } = useContext(ResumeContext);
  
  // Use prop data if provided, otherwise use context data
  const resumeData = propResumeData || contextResumeData;
  const selectedTemplate = propTemplate || currentTemplate || 'modern';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="mx-auto bg-white shadow-xl min-h-[800px]">
          <TemplatePreview 
            templateId={selectedTemplate}
            resumeData={resumeData}
            isPreview={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;