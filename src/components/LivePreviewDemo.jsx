import React, { useState } from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import TemplateSelection from '../components/TemplateSelection';
import ResumePreview from '../components/ResumePreview';

const LivePreviewDemo = () => {
  // Sample resume data for demo purposes
  const [demoResumeData] = useState({
    personalInfo: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA",
      website: "www.johnsmith.dev",
      linkedin: "linkedin.com/in/johnsmith",
      summary: "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers."
    },
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        graduationDate: "May 2019",
        gpa: "3.8/4.0"
      }
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Inc.",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 70%. Mentored 3 junior developers and conducted technical interviews."
      },
      {
        position: "Software Engineer",
        company: "StartupXYZ",
        startDate: "Jun 2019",
        endDate: "Dec 2021",
        description: "Developed responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver features ahead of schedule. Optimized database queries resulting in 40% performance improvement."
      }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "Git", "Agile/Scrum"
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, payment processing, and real-time inventory management.",
        link: "github.com/johnsmith/ecommerce-platform"
      },
      {
        name: "Task Management App",
        description: "Developed a collaborative task management application with real-time updates using Socket.io, featuring drag-and-drop functionality and team collaboration tools.",
        link: "github.com/johnsmith/task-manager"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        date: "March 2023",
        issuer: "Amazon Web Services"
      },
      {
        name: "Certified Kubernetes Administrator",
        date: "September 2022",
        issuer: "Cloud Native Computing Foundation"
      }
    ]
  });

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Live Template Preview Demo
            </h1>
            <p className="text-lg text-gray-600">
              Click on any template below and see the live preview update in real-time on the right!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Template Selection - Left Side */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Choose Your Template
              </h2>
              <TemplateSelection />
            </div>
            
            {/* Live Preview - Right Side */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Live Preview
              </h2>
              <div className="transform scale-75 origin-top">
                <ResumePreview resumeData={demoResumeData} />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How It Works:
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <span className="mr-3 text-blue-500">1.</span>
                  <span>Click on any template on the left to select it</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-blue-500">2.</span>
                  <span>The live preview on the right updates instantly with sample data</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-blue-500">3.</span>
                  <span>All resume sections are populated with realistic demo content</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-blue-500">4.</span>
                  <span>Template selection is saved and applied throughout the app</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">💡 Demo Note:</span> This preview uses sample data to showcase all template features. 
                  In the actual builder, your personal information will be displayed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default LivePreviewDemo;
