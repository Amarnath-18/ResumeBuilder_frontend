import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';


const PdfResumePreview = ({ resumeData, template, className = "" }) => {
  const getTemplateComponent = () => {
    switch (template) {
      case 'modern':
        return ModernTemplate;
      case 'classic':
        return ClassicTemplate;
      case 'creative':
        return CreativeTemplate;
      case 'executive':
        return ExecutiveTemplate;
      case 'minimal':
        return MinimalTemplate;
      case 'tech':
        return TechTemplate;
      default:
        return ModernTemplate;
    }
  };

  const TemplateComponent = getTemplateComponent();

  return (
    <div 
      id="pdf-resume-preview"
      className={`bg-white shadow-lg pdf-optimized ${className}`}
      style={{
        width: '210mm', // A4 width
        minHeight: '297mm', // A4 height
        margin: '0 auto',
        padding: '2mm', // Minimal padding for maximum content space
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
        color: '#000000'
      }}
    >
      <TemplateComponent 
        data={resumeData} 
        className="pdf-optimized"
      />
    </div>
  );
};

export default PdfResumePreview;
