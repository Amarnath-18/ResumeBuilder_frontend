import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ResumeContext } from '../context/ResumeContext';
import TemplatePreview from './templates/TemplatePreview';

const TemplateSelection = () => {
  const { currentTemplate, setCurrentTemplate, resumeData } = useContext(ResumeContext);
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate || 'modern');
  const [previewModal, setPreviewModal] = useState(null);

  // Template configurations
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design with a professional look',
      preview: '📄',
      color: 'blue',
      features: ['Clean layout', 'Modern typography', 'Professional appearance']
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      description: 'Traditional format perfect for conservative industries',
      preview: '📋',
      color: 'gray',
      features: ['Traditional layout', 'Conservative design', 'ATS-friendly']
    },
    {
      id: 'creative',
      name: 'Creative Design',
      description: 'Bold and creative template for design-focused roles',
      preview: '🎨',
      color: 'purple',
      features: ['Creative layout', 'Visual elements', 'Stand-out design']
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Minimalist design focusing on content clarity',
      preview: '📃',
      color: 'green',
      features: ['Minimal design', 'Content-focused', 'Easy to read']
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Premium template for senior-level positions',
      preview: '👔',
      color: 'indigo',
      features: ['Premium design', 'Executive style', 'Leadership focus']
    },
    {
      id: 'tech',
      name: 'Tech Professional',
      description: 'Modern template optimized for tech professionals',
      preview: '💻',
      color: 'teal',
      features: ['Tech-focused', 'Skills highlight', 'Project showcase']
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setCurrentTemplate(templateId);
    
    const templateName = templates.find(t => t.id === templateId)?.name;
    toast.success(`🎨 ${templateName} template selected!`);
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50',
      gray: isSelected 
        ? 'border-gray-500 bg-gray-50 ring-2 ring-gray-200' 
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50',
      green: isSelected 
        ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
        : 'border-gray-200 hover:border-green-300 hover:bg-green-50',
      indigo: isSelected 
        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50',
      teal: isSelected 
        ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200' 
        : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Resume Template
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a professional template that best represents your style and industry. 
          You can always change it later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          return (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`
                relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 
                ${getColorClasses(template.color, isSelected)}
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Template preview */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{template.preview}</div>
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <TemplatePreview 
                    templateId={template.id} 
                    isPreview={true}
                  />
                </div>
              </div>

              {/* Template info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="space-y-1">
                  {template.features.map((feature, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected template info */}
      {selectedTemplate && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Template: {templates.find(t => t.id === selectedTemplate)?.name}
              </h3>
              <p className="text-gray-600">
                {templates.find(t => t.id === selectedTemplate)?.description}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreviewModal(selectedTemplate)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Preview
              </button>
              <button
                onClick={() => {
                  // This would typically navigate to the next step or show confirmation
                  const templateName = templates.find(t => t.id === selectedTemplate)?.name;
                  toast.success(`🎨 Template "${templateName}" is now active and will be used for your resume preview!`);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Preview: {templates.find(t => t.id === previewModal)?.name}
              </h3>
              <button
                onClick={() => setPreviewModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <TemplatePreview 
                templateId={previewModal} 
                resumeData={resumeData}
                isPreview={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Additional info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Don't worry about your choice - you can change your template at any time during the building process.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelection;