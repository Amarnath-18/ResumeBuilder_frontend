import React from 'react'

const StepIndicator = ({steps , currentStep , onStepClick}) => {
  return (
    <div className="flex justify-center items-center p-4 bg-gradient-to-r from-cyan-200 to-purple-600 min-w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center overflow-x-auto">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <SectionCard 
              title={step.title} 
              icon={step.icon}
              stepNumber={index + 1}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              onClick={() => onStepClick && onStepClick(index)}
            />
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-white/30 relative">
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    currentStep > index ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator


const SectionCard = ({title, icon, stepNumber, isActive, isCompleted, onClick}) => {
  return (
    <div 
      className={`flex flex-col items-center space-y-2 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
        isActive ? 'bg-white/20 backdrop-blur-sm' : ''
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center space-x-3">
        <button 
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
            isCompleted 
              ? 'bg-green-500 border-green-500 text-white' 
              : isActive 
                ? 'bg-white border-white text-purple-600 shadow-lg' 
                : 'bg-transparent border-white/50 text-white hover:border-white hover:bg-white/10'
          }`}
          aria-hidden="true"
        >
          {isCompleted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            stepNumber
          )}
        </button>
        <div className="flex flex-col items-start">
          <p className={`text-sm font-medium truncate max-w-24 ${
            isActive ? 'text-white font-semibold' : 'text-white/90'
          }`}>
            {title}
          </p>
          <div className={`text-xs ${isActive ? 'text-white' : 'text-white/70'}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};