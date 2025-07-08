import React from 'react';

const CreativeTemplate = ({ data, className = "" }) => {
  // Safely extract data with fallbacks
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 p-3 w-full text-sm leading-tight ${className}`} style={{ fontSize: '11px', lineHeight: '1.3' }}>
      {/* Header with creative design */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg mb-3">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-purple-100 text-xs">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-3 bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
          <h2 className="text-sm font-bold text-purple-700 mb-1 flex items-center">
            <span className="mr-1">✨</span> About Me
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-3">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                <span className="mr-1">💼</span> Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-2 p-2 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-gray-900">{exp.position || ''}</h3>
                      <p className="text-purple-700 font-medium text-xs">{exp.company || ''}</p>
                      {exp.location && <p className="text-gray-600 text-xs">{exp.location}</p>}
                    </div>
                    <span className="text-purple-600 text-xs font-medium bg-purple-100 px-1 py-1 rounded whitespace-nowrap ml-2">
                      {exp.date || ''}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 text-xs">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                <span className="mr-1">🚀</span> Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-2 p-2 bg-pink-50 rounded-lg">
                  <h3 className="text-xs font-semibold text-gray-900">{project.title || project.name || ''}</h3>
                  {project.technologies && <p className="text-purple-600 text-xs font-medium">{project.technologies}</p>}
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
                      <span className="text-purple-600 text-xs">🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.link}</a></span>
                    )}
                    {project.githubLink && (
                      <span className="text-purple-600 text-xs">💻 <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                <span className="mr-1">⚡</span> Skills
              </h2>
              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                <span className="mr-1">🎓</span> Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h3 className="text-xs font-semibold text-gray-900">{edu.degree || ''}</h3>
                  <p className="text-purple-600 font-medium text-xs">{edu.institution || ''}</p>
                  {edu.fieldOfStudy && <p className="text-gray-600 text-xs font-medium">{edu.fieldOfStudy}</p>}
                  <p className="text-gray-600 text-xs">{edu.date || ''}</p>
                  {edu.description && <p className="text-gray-700 text-xs mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                <span className="mr-1">🏆</span> Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-1 p-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded">
                  <div className="text-xs">
                    <div className="text-gray-900 font-medium">{cert.name || ''}</div>
                    {cert.issuer && <div className="text-purple-600">{cert.issuer}</div>}
                    <div className="text-gray-600">{cert.date || ''}</div>
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

export default CreativeTemplate;
