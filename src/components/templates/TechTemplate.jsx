import React from 'react';

const TechTemplate = ({ data, className = "" }) => {
  // Safely extract data with fallbacks
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className={`bg-gray-50 p-3 w-full text-sm leading-tight ${className}`} style={{ fontSize: '11px', lineHeight: '1.3' }}>
      {/* Header with tech styling */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-3 rounded-lg mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-teal-100 text-xs space-y-1">
              <div>
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.email && personalInfo.phone && " | "}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
              </div>
              {personalInfo.address && <div>{personalInfo.address}</div>}
              {personalInfo.website && <a href={personalInfo.website}>website</a>}
              {personalInfo.linkedin && <a href={personalInfo.linkedin}>Linkedin</a>}
            </div>
          </div>
          <div className="text-4xl opacity-20">💻</div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-white p-3 rounded-lg shadow-sm mb-3 border-l-4 border-teal-500">
          <h2 className="text-sm font-bold text-teal-700 mb-1 flex items-center">
            <span className="mr-1">🎯</span> Professional Summary
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-3">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center">
                <span className="mr-1">💼</span> Professional Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-2 p-2 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-gray-900">{exp.position || ''}</h3>
                      <p className="text-teal-600 font-medium text-xs">{exp.company || ''}</p>
                      {exp.location && <p className="text-gray-500 text-xs">{exp.location}</p>}
                    </div>
                    <span className="text-gray-500 text-xs bg-gray-100 px-1 py-1 rounded whitespace-nowrap ml-2">
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
              <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center">
                <span className="mr-1">🚀</span> Featured Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-2 p-2 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                  <h3 className="text-xs font-semibold text-gray-900 mb-1">{project.title || project.name || ''}</h3>
                  {project.technologies && <p className="text-teal-600 text-xs font-medium">{project.technologies}</p>}
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
                      <span className="text-teal-600 text-xs">🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.link}</a></span>
                    )}
                    {project.githubLink && (
                      <span className="text-teal-600 text-xs">💻 <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Right column */}
        <div className="space-y-3">
          {/* Technical Skills */}
          {skills.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center">
                <span className="mr-1">⚡</span> Technical Skills
              </h2>
              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium text-xs">{skill}</span>
                    <div className="w-12 bg-gray-200 rounded-full h-1">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center">
                <span className="mr-1">🎓</span> Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 p-2 bg-teal-50 rounded-lg">
                  <h3 className="text-xs font-semibold text-gray-900">{edu.degree || ''}</h3>
                  <p className="text-teal-600 font-medium text-xs">{edu.institution || ''}</p>
                  {edu.fieldOfStudy && <p className="text-gray-600 text-xs">{edu.fieldOfStudy}</p>}
                  <p className="text-gray-600 text-xs">{edu.date || ''}</p>
                  {edu.description && <p className="text-gray-700 text-xs mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center">
                <span className="mr-1">🏆</span> Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-1 p-2 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                  <div className="text-xs">
                    <div className="text-gray-900 font-medium">{cert.name || ''}</div>
                    {cert.issuer && <div className="text-teal-600 font-medium">{cert.issuer}</div>}
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

export default TechTemplate;
