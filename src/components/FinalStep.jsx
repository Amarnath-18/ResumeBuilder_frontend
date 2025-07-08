import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ResumeContext } from '../context/ResumeContext';
import { UserContext } from '../context/UserContext.js';
import { createResume } from '../services/resumeServices';
import API from '../services/apis';
import { usePdfDownload } from '../hooks/usePdfDownload';
import PdfResumePreview from './PdfResumePreview';

const FinalStep = () => {
  const navigate = useNavigate();
  const { resumeData, currentTemplate, clearResumeData } = useContext(ResumeContext);
  const { user } = useContext(UserContext);
  const { downloadPdf } = usePdfDownload();
  const [isLoading, setIsLoading] = useState(false);
  const [savedResume, setSavedResume] = useState(null);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [isPublic, setIsPublic] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Calculate completion percentage
  const calculateCompleteness = () => {
    let completed = 0;
    let total = 0;

    // Personal Info (required fields)
    total += 3;
    if (resumeData.personalInfo.fullName) completed++;
    if (resumeData.personalInfo.email) completed++;
    if (resumeData.personalInfo.phone) completed++;

    // Other sections
    total += 5;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.experience.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    if (resumeData.projects.length > 0) completed++;
    if (resumeData.certifications.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const completenessScore = calculateCompleteness();

  // Get improvement suggestions
  const getImprovementSuggestions = () => {
    const suggestions = [];
    
    if (!resumeData.personalInfo.summary) {
      suggestions.push("Add a professional summary to make a strong first impression");
    }
    if (resumeData.experience.length === 0) {
      suggestions.push("Add work experience to showcase your professional background");
    }
    if (resumeData.skills.length < 5) {
      suggestions.push("Add more skills to highlight your technical abilities");
    }
    if (resumeData.projects.length === 0) {
      suggestions.push("Include projects to demonstrate practical experience");
    }
    if (!resumeData.personalInfo.linkedin) {
      suggestions.push("Add LinkedIn profile to improve professional networking");
    }

    return suggestions;
  };

  const suggestions = getImprovementSuggestions();

  // Save resume to database
  const handleSaveResume = async () => {
    if (!user) {
      toast.error('Please log in to save your resume');
      return;
    }

    setIsLoading(true);
    try {
      // Transform projects data to ensure keyHighlights are strings, not objects
      const transformedProjects = resumeData.projects.map(project => ({
        ...project,
        keyHighlights: project.keyHighlights?.map(highlight => 
          typeof highlight === 'string' ? highlight : highlight.text
        ) || []
      }));

      const resumeDataToSend = {
        title: resumeTitle,
        template: currentTemplate,
        personalInfo: resumeData.personalInfo,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: resumeData.skills,
        projects: transformedProjects,
        certifications: resumeData.certifications,
        isPublic: isPublic,
        theme: "professional"
      };

      // Debug logging
      console.log('Sending resume data:', resumeDataToSend);
      console.log('Resume data keys:', Object.keys(resumeDataToSend));
      console.log('Resume data size:', JSON.stringify(resumeDataToSend).length);

      const response = await createResume({
        resumeData: resumeDataToSend
      });

      if (response.data.success) {
        setSavedResume(response.data.data);
        setShowSuccess(true);
        toast.success('🎉 Resume saved successfully!');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.data?.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else {
        toast.error('Failed to save resume. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Generate shareable link
  const generateShareableLink = () => {
    if (savedResume && isPublic) {
      return `${window.location.origin}/resume/${savedResume._id}`;
    }
    return null;
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      setShowPdfPreview(true);
      
      // Wait a moment for the component to render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const filename = resumeTitle.replace(/\s+/g, '_') + '_' + currentTemplate;
      const success = await downloadPdf('pdf-resume-preview', filename);
      
      if (success) {
        // Clear localStorage data after successful download
        clearResumeData();
        
        // Optional: Navigate back to dashboard after a delay
        setTimeout(() => {
          toast.info('🔄 Redirecting to dashboard...');
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF. Please try again.');
    } finally {
      setShowPdfPreview(false);
    }
  };

  const shareableLink = generateShareableLink();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Almost Done!</h2>
        <p className="text-gray-600">Review your resume and choose how to save or share it</p>
      </div>

      {/* Resume Completeness Score */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Completeness</h3>
          <span className={`text-2xl font-bold ${
            completenessScore >= 80 ? 'text-green-600' : 
            completenessScore >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {completenessScore}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              completenessScore >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
              completenessScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
              'bg-gradient-to-r from-red-500 to-red-600'
            }`}
            style={{ width: `${completenessScore}%` }}
          ></div>
        </div>

        {suggestions.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-2">💡 Suggestions to improve:</h4>
            <ul className="space-y-1">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Resume Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Resume Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Template:</span>
              <span className="font-medium capitalize bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                {currentTemplate} ✨
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Education:</span>
              <span className="font-medium">{resumeData.education.length} entries</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium">{resumeData.experience.length} entries</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Skills:</span>
              <span className="font-medium">{resumeData.skills.length} skills</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Projects:</span>
              <span className="font-medium">{resumeData.projects.length} projects</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certifications:</span>
              <span className="font-medium">{resumeData.certifications.length} certificates</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <span className="font-medium">📄 PDF Download:</span> Your resume will be generated using the 
            <span className="font-semibold"> {currentTemplate}</span> template with all styling preserved.
          </p>
        </div>
      </div>

      {/* Save Resume Section */}
      {!savedResume && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💾 Save Your Resume</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume Title
              </label>
              <input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter a title for your resume"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => {
                  setIsPublic(e.target.checked);
                  if (e.target.checked) {
                    toast.info('🌐 Your resume will be publicly accessible via a shareable link');
                  } else {
                    toast.info('🔒 Your resume will be private');
                  }
                }}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                Make this resume public (others can view with a link)
              </label>
            </div>

            <button
              onClick={handleSaveResume}
              disabled={isLoading || !resumeTitle.trim()}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              onMouseEnter={() => {
                if (!resumeTitle.trim()) {
                  toast.info('💡 Please enter a resume title first');
                }
              }}
            >
              {isLoading ? 'Saving...' : '💾 Save Resume'}
            </button>
          </div>
        </div>
      )}

      {/* Success Message & Actions */}
      {showSuccess && savedResume && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Resume Saved Successfully!</h3>
              <p className="text-green-600">Your resume has been saved to your account.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Download Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">📥 Download Options</h4>
              
              <button
                onClick={handleDownloadPDF}
                disabled={isLoading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
              >
                {isLoading ? '🔄 Generating PDF...' : `📄 Download ${currentTemplate} PDF`}
              </button>

              <button
                onClick={() => {
                  window.print();
                  toast.info('🖨️ Opening print dialog...');
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                🖨️ Print Resume
              </button>
            </div>

            {/* Sharing Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">🔗 Sharing Options</h4>
              
              {isPublic && shareableLink ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    🌐 Share Resume Link
                  </button>
                  
                  <button
                    onClick={() => {
                      const subject = `Check out my resume: ${resumeTitle}`;
                      const body = `Hi,\n\nI'd like to share my resume with you: ${shareableLink}\n\nBest regards,\n${resumeData.personalInfo.fullName}`;
                      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                      toast.success('📧 Opening email client to share your resume!');
                    }}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    📧 Email Resume
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600 italic">
                  Enable "Make public" to share your resume
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            clearResumeData();
            toast.success('🗑️ Form data cleared from browser storage!');
          }}
          className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
        >
          🗑️ Clear Form Data
        </button>
        
        <button
          onClick={() => {
            navigate('/builder');
            toast.info('📝 Starting a new resume...');
          }}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          📝 Create New Resume
        </button>
        
        <button
          onClick={() => {
            navigate('/dashboard');
            toast.info('📂 Opening your dashboard...');
          }}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          📂 View All Resumes
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && shareableLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Your Resume</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareableLink);
                      toast.success('📋 Link copied to clipboard!');
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?text=Check out my resume: ${encodeURIComponent(shareableLink)}`);
                    toast.success('🐦 Opening Twitter to share your resume!');
                  }}
                  className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                >
                  🐦 Twitter
                </button>
                
                <button
                  onClick={() => {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`);
                    toast.success('💼 Opening LinkedIn to share your resume!');
                  }}
                  className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                >
                  💼 LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATS Score Info */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">🤖 ATS-Friendly Score</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-700">Applicant Tracking System Compatibility</span>
          <span className="font-bold text-blue-800">
            {completenessScore >= 80 ? 'Excellent' : completenessScore >= 60 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <p className="text-sm text-blue-600">
          Your resume uses clean formatting and standard sections that work well with most ATS systems.
        </p>
      </div>

      {/* Hidden PDF Preview for Generation */}
      {showPdfPreview && (
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px', 
            top: '-9999px',
            width: '210mm',
            backgroundColor: 'white'
          }}
        >
          <PdfResumePreview 
            resumeData={resumeData} 
            template={currentTemplate}
          />
        </div>
      )}
    </div>
  );
};

export default FinalStep;