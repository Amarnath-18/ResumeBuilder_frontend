import React, { useContext, useState, useEffect } from "react";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import StepIndicator from "../components/StepIndicator";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ResumePreview from "../components/ResumePreview";
import ProjectsForm from "../components/forms/ProjectsForm";
import TemplateSelection from "../components/TemplateSelection";
import FinalStep from "../components/FinalStep";
import CertificationForm from '../components/forms/CertificationsForm'
import { ResumeContext } from "../context/ResumeContext";

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const {resumeData , currentTemplate } = useContext(ResumeContext);

  // Show save indicator when data changes
  useEffect(() => {
    setShowSaveIndicator(true);
    const timer = setTimeout(() => {
      setShowSaveIndicator(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [resumeData, currentTemplate]);
  const steps = [
    { title: "Personal Info", component: PersonalInfoForm, icon: "👤" },
    { title: "Education", component: EducationForm, icon: "🎓" },
    { title: "Experience", component: ExperienceForm, icon: "💼" },
    { title: "Skills", component: SkillsForm, icon: "⚡" },
    { title: "Projects", component: ProjectsForm, icon: "🚀" },
    { title: "Certifications" , component : CertificationForm , icon: "🏅"},
    { title: "Template", component: TemplateSelection, icon: "🎨" },
    { title: "Generate", component: FinalStep, icon: "✨" },
  ];
  const CurrentFormComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gray-50">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <div className="max-w-7xl mx-auto p-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="min-w-full  lg:block md:flex sm:flex justify-center items-center ">
            <div className="bg-violet-100 max-w-2xl rounded-lg shadow-lg p-4">
              <CurrentFormComponent />

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentStep === steps.length - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {currentStep === steps.length - 1 ? "Complete" : "Next"}
                </button>
              </div>
            </div>
          </div>

          {/* Resume Preview Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <ResumePreview resumeData={resumeData} template={currentTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
