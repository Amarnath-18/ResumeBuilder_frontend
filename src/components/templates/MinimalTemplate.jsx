import React from 'react';

const MinimalTemplate = ({ data, className = "" }) => {
  // Safely extract data with fallbacks
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className={`bg-white p-3 w-full text-sm leading-tight ${className}`} style={{ fontSize: '11px', lineHeight: '1.3' }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-gray-600 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-3">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <p className="text-gray-700 text-xs font-light leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-widest">
                Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-light text-gray-900">{exp.position || ''}</h3>
                      <span className="text-gray-500 text-xs whitespace-nowrap ml-2">
                        {exp.date || ''}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs">{exp.company || ''}</p>
                    {exp.location && <p className="text-gray-500 text-xs">{exp.location}</p>}
                    {exp.description && <p className="text-gray-700 font-light text-xs mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-widest">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-light text-gray-900 mb-1">{project.title || project.name || ''}</h3>
                    {project.technologies && <p className="text-gray-600 text-xs font-medium">{project.technologies}</p>}
                    {project.description && <p className="text-gray-700 font-light text-xs">{project.description}</p>}
                    {project.keyHighlights && project.keyHighlights.length > 0 && (
                      <ul className="text-xs text-gray-700 mt-1 ml-3">
                        {project.keyHighlights.map((highlight, idx) => (
                          <li key={idx} className="list-disc font-light">{typeof highlight === 'string' ? highlight : highlight.text}</li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2 mt-1">
                      {project.link && (
                        <span className="text-gray-500 text-xs">🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.link}</a></span>
                      )}
                      {project.githubLink && (
                        <span className="text-gray-500 text-xs">💻 <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-3">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-widest">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-sm font-light text-gray-900">{edu.degree || ''}</h3>
                  <p className="text-gray-600 text-xs">{edu.institution || ''}</p>
                  {edu.fieldOfStudy && <p className="text-gray-500 text-xs">{edu.fieldOfStudy}</p>}
                  <span className="text-gray-500 text-xs">{edu.date || ''}</span>
                  {edu.description && <p className="text-gray-700 text-xs mt-1 font-light">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-widest">
                Skills
              </h2>
              <div className="text-gray-700 font-light text-xs">
                {skills.join(' · ')}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-gray-900 mb-2 uppercase tracking-widest">
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-1">
                  <div className="text-xs">
                    <div className="text-gray-900 font-light">{cert.name || ''}</div>
                    {cert.issuer && <div className="text-gray-600">{cert.issuer}</div>}
                    <div className="text-gray-500">{cert.date || ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
