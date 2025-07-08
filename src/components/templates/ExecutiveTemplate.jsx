import React from 'react';

const ExecutiveTemplate = ({ data, className = "" }) => {
  // Safely extract data with fallbacks
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className={`bg-white p-3 w-full text-sm leading-tight ${className}`} style={{ fontSize: '11px', lineHeight: '1.3' }}>
      {/* Header with executive styling */}
      <div className="bg-gray-900 text-white p-3 mb-3 rounded-lg">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-gray-300 text-xs">
          <div className="flex items-center">
            <span className="mr-1">✉</span>
            {personalInfo.email || ''}
          </div>
          <div className="flex items-center">
            <span className="mr-1">☎</span>
            {personalInfo.phone || ''}
          </div>
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            {personalInfo.address || ''}
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="mr-1">💼</span>
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <span className="mr-1">🌐</span>
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-3">
          {/* Executive Summary */}
          {personalInfo.summary && (
            <div className="p-2 bg-gray-50 border-l-4 border-gray-900">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Executive Summary</h2>
              <p className="text-gray-700 text-xs leading-relaxed font-medium">{personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">
                Professional Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-2 p-2 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-gray-900">{exp.position || ''}</h3>
                      <p className="text-gray-700 font-semibold text-xs">{exp.company || ''}</p>
                      {exp.location && <p className="text-gray-600 text-xs">{exp.location}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap ml-2">
                        {exp.date || ''}
                      </span>
                    </div>
                  </div>
                  {exp.description && <p className="text-gray-700 text-xs mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">
                Key Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-2 p-2 border-l-4 border-gray-900 bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-900">{project.title || project.name || ''}</h3>
                  {project.technologies && <p className="text-gray-600 text-xs font-medium">{project.technologies}</p>}
                  {project.description && <p className="text-gray-700 text-xs">{project.description}</p>}
                  {project.keyHighlights && project.keyHighlights.length > 0 && (
                    <ul className="text-xs text-gray-700 mt-1 ml-3">
                      {project.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className="list-disc">{typeof highlight === 'string' ? highlight : highlight.text}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2 mt-1">
                    {project.link && (
                      <span className="text-gray-600 text-xs">🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.link}</a></span>
                    )}
                    {project.githubLink && (
                      <span className="text-gray-600 text-xs">💻 <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-3">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded-lg">
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree || ''}</h3>
                  <p className="text-gray-700 font-semibold text-xs">{edu.institution || ''}</p>
                  {edu.fieldOfStudy && <p className="text-gray-600 text-xs">{edu.fieldOfStudy}</p>}
                  <p className="text-gray-600 text-xs">{edu.date || ''}</p>
                  {edu.description && <p className="text-gray-700 text-xs mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-1">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center p-1 bg-gray-50 rounded">
                    <div className="w-1 h-1 bg-gray-900 rounded-full mr-2"></div>
                    <span className="text-gray-900 font-medium text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">
                Professional Certifications
              </h2>
              <div className="grid grid-cols-1 gap-1">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs">
                      <div className="text-gray-900 font-bold">{cert.name || ''}</div>
                      {cert.issuer && <div className="text-gray-600">{cert.issuer}</div>}
                      <div className="text-gray-600">{cert.date || ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
