import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/apis';
import ResumePreview from '../components/ResumePreview';
import { UserContext } from '../context/UserContext';
import { usePdfDownload } from '../hooks/usePdfDownload';
import PdfResumePreview from '../components/PdfResumePreview';

const ResumeViewer = () => {
  const { resumeId } = useParams();
  const { user } = useContext(UserContext);
  const { downloadPdf } = usePdfDownload();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        // First try to fetch as public resume
        try {
          const publicResponse = await API.get(`/resume/public/${resumeId}`);
          if (publicResponse.data.success) {
            setResume(publicResponse.data.data);
            setIsPublic(true);
            toast.info('📄 Public resume loaded successfully');
            return;
          }
        } catch (publicError) {
          // If public fetch fails, try authenticated fetch (for owner access)
          console.log('Public access failed:', publicError.message);
          if (user) {
            try {
              const authResponse = await API.get(`/resume/get-resume/${resumeId}`);
              if (authResponse.data.success) {
                setResume(authResponse.data.data);
                setIsPublic(false);
                toast.info('📄 Resume loaded successfully');
                return;
              }
            } catch (authError) {
              console.error('Both public and auth fetch failed:', authError);
            }
          }
        }
        
        // If both attempts fail
        setError('Resume not found or not accessible');
        toast.error('❌ Resume not found or not accessible');
        
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError('Failed to load resume');
        toast.error('❌ Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, user]);

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      setShowPdfPreview(true);
      
      // Wait a moment for the component to render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const filename = resume.title.replace(/\s+/g, '_') + '_' + resume.template;
      await downloadPdf('pdf-resume-preview', filename);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setShowPdfPreview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a 
            href="/" 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Resume Data</h1>
          <p className="text-gray-600">This resume appears to be empty.</p>
        </div>
      </div>
    );
  }

  const resumeData = {
    personalInfo: resume.personalInfo || {},
    education: resume.education || [],
    experience: resume.experience || [],
    skills: resume.skills || [],
    projects: resume.projects || [],
    certifications: resume.certifications || []
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{resume.title}</h1>
              <p className="text-gray-600">
                {isPublic ? 'Public Resume View' : 'Your Resume'}
                {isPublic && resume.personalInfo?.fullName && (
                  <span className="ml-2">• {resume.personalInfo.fullName}</span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                📄 Download PDF
              </button>
              
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🖨️ Print
              </button>
              
              <a
                href="/"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                🏠 Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg">
          <ResumePreview 
            resumeData={resumeData} 
            template={resume.template} 
            className="print:shadow-none"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm pb-8">
        <p>This resume was created using Resume Builder</p>
        <p>
          Want to create your own? 
          <a href="/" className="text-purple-600 hover:text-purple-800 ml-1">
            Get started here
          </a>
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
            template={resume.template}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;
