import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import { getResumeOfUser, deleteResume } from '../services/resumeServices';
import { usePdfDownload } from '../hooks/usePdfDownload';
import PdfResumePreview from '../components/PdfResumePreview';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { downloadPdf } = usePdfDownload();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfPreviewData, setPdfPreviewData] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await getResumeOfUser();
        if (response.data.success) {
          setResumes(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchResumes();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Handle PDF download for a specific resume
  const handleDownloadPDF = async (resume) => {
    try {
      setPdfPreviewData(resume);
      
      // Wait a moment for the component to render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const filename = resume.title.replace(/\s+/g, '_') + '_' + resume.template;
      await downloadPdf('pdf-resume-preview', filename);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setPdfPreviewData(null);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      const response = await deleteResume({ resumeId });
      if (response.data.success) {
        toast.success('Resume Deleted Successfully!!');
        // Update local state to remove the deleted resume
        setResumes(prevResumes => prevResumes.filter(resume => resume._id !== resumeId));
      } else {
        toast.error('Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error(error.response?.data?.message || 'Error deleting resume');
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your dashboard</p>
          <a 
            href="/signin" 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage your resumes and create new ones</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/builder')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group text-left cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Create New Resume</h3>
                <p className="text-purple-100">Start building a new resume from scratch</p>
              </div>
              <div className="text-3xl group-hover:scale-110 transition-transform">✨</div>
            </div>
          </button>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Resumes</h3>
                <p className="text-3xl font-bold text-purple-600">{resumes.length}</p>
              </div>
              <div className="text-3xl">📄</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Resumes</h3>
                <p className="text-3xl font-bold text-green-600">
                  {resumes.filter(resume => resume.isPublic).length}
                </p>
              </div>
              <div className="text-3xl">🌐</div>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Resumes</h2>
          </div>

          {resumes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
              <p className="text-gray-600 mb-6">Create your first resume to get started</p>
              <button
                onClick={() => navigate('/builder')}
                className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {resumes.map((resume) => (
                <div key={resume._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{resume.title}</h3>
                        {resume.isPublic && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Public
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                        <span>Template: {resume.template}</span>
                        <span>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => window.open(`/resume/${resume._id}`, '_blank')}
                        className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium"
                      >
                        Preview
                      </button>

                      <button
                        onClick={() => handleDownloadPDF(resume)}
                        className="text-red-600 hover:text-red-800 cursor-pointer font-medium"
                      >
                        Download PDF
                      </button>

                      <button className="text-gray-600 cursor-pointer hover:text-gray-800 font-medium">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteResume(resume._id)} 
                        className="text-red-600 cursor-pointer hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hidden PDF Preview for Generation */}
      {pdfPreviewData && (
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
            resumeData={pdfPreviewData} 
            template={pdfPreviewData.template}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
