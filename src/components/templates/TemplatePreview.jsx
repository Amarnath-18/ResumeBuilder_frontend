import React from 'react';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';

const TemplatePreview = ({ templateId, resumeData, isPreview = true }) => {
  const sampleData = {
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      address: "New York, NY",
      website: "johndoe.com",
      linkedin: "linkedin.com/in/johndoe",
      summary: "Experienced professional with a passion for innovation and results-driven solutions."
    },
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        startDate: "2020",
        endDate: "Present",
        description: "Led development of scalable web applications"
      }
    ],
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Computer Science",
        graduationDate: "2020"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python"],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce solution"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        date: "2023"
      }
    ]
  };

  const data = resumeData || sampleData;
  const previewProps = {
    data,
    isPreview,
    className: isPreview ? "scale-75 transform-origin-top" : ""
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate {...previewProps} />;
      case 'classic':
        return <ClassicTemplate {...previewProps} />;
      case 'creative':
        return <CreativeTemplate {...previewProps} />;
      case 'minimal':
        return <MinimalTemplate {...previewProps} />;
      case 'executive':
        return <ExecutiveTemplate {...previewProps} />;
      case 'tech':
        return <TechTemplate {...previewProps} />;
      default:
        return <ModernTemplate {...previewProps} />;
    }
  };

  return (
    <div className={`bg-white shadow-lg ${isPreview ? 'rounded-lg overflow-hidden' : ''}`}>
      {renderTemplate()}
    </div>
  );
};

export default TemplatePreview;
