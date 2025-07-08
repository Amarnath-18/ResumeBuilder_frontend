import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { useForm } from "react-hook-form";

const EducationForm = () => {
  const { education, setEducation } =
    useContext(ResumeContext);
  const [showAddForm, setShowAddForm] = useState(false);


  const educationForm = useForm({
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      date: "",
      description: "",
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = educationForm;

  const onSubmit = (data) => {
    const newEducation = {
      id: Date.now(),
      ...data
    };
    setEducation(prev => [...prev, newEducation]);
    reset();
  };

  const removeEducation = (id)=>{
    setEducation(prev => prev.filter(edu => edu.id !== id));
  }

  const onSaveAndClose = (data) => {
    const newEducation = {
      id: Date.now(),
      ...data
    };
    setEducation(prev => [...prev, newEducation]);
    reset();
    setShowAddForm(false);
  };

  const handleAddEducation = () => {
    setShowAddForm(true);
  };

  console.log("rendered in edu");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          {education.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {education.length} education {education.length === 1 ? 'entry' : 'entries'} added
            </p>
          )}
        </div>
        {!showAddForm && (
          <button
            type="button"
            onClick={handleAddEducation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {education.length === 0 ? 'Add Education' : 'Add Another Education'}
          </button>
        )}
      </div>

      {/* Add Education Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Add New Education</h3>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                reset();
              }}
              className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                {...register('institution', { 
                  required: 'Institution is required',
                  minLength: { value: 2, message: 'Institution must be at least 2 characters' }
                })}
                placeholder="University/School name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.institution ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.institution && (
                <p className="text-red-600 text-sm mt-1">{errors.institution.message}</p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                {...register('degree', { 
                  required: 'Degree is required',
                  minLength: { value: 2, message: 'Degree must be at least 2 characters' }
                })}
                placeholder="Bachelor's, Master's, etc."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.degree ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.degree && (
                <p className="text-red-600 text-sm mt-1">{errors.degree.message}</p>
              )}
            </div>
          </div>

          {/* Field of Study */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <input
              type="text"
              {...register('fieldOfStudy')}
              placeholder="Computer Science, Business, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="text"
              {...register('date', { 
                required: 'Date is required'
              })}
              placeholder="e.g., 2020-2024, Sep 2020 - Present, May 2022"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter date range or single date (e.g., "2020-2024" or "Present")
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              {...register('description')}
              placeholder="Relevant coursework, achievements, GPA, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSubmit(onSaveAndClose)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save & Close
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save & Add Another
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                reset();
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Existing Education Entries */}
      {education.map((educationItem) => (
        <div
          key={educationItem.id}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Education Entry
            </h3>
            <button
              type="button"
              onClick={() => removeEducation(educationItem.id)}
              className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Institution */}
            <div>
              <label
                htmlFor={`institution-${educationItem.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution
              </label>
              <input
              disabled={true}
                id={`institution-${educationItem.id}`}
                type="text"
                value={educationItem.institution}
                placeholder="University/School name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Degree */}
            <div>
              <label
                htmlFor={`degree-${educationItem.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Degree
              </label>
              <input
              disabled={true}
                id={`degree-${educationItem.id}`}
                type="text"
                value={educationItem.degree}
                placeholder="Bachelor's, Master's, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Field of Study */}
          <div className="mb-4">
            <label
              htmlFor={`fieldOfStudy-${educationItem.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Field of Study
            </label>
            <input
            disabled={1}
              id={`fieldOfStudy-${educationItem.id}`}
              type="text"
              value={educationItem.fieldOfStudy}
              placeholder="Computer Science, Business, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date field */}
          <div className="mb-6">
            <label
              htmlFor={`date-${educationItem.id}`}
              className="text-sm font-medium text-gray-800 mb-2 block"
            >
              Date
            </label>
            <input
              id={`date-${educationItem.id}`}
              type="text"
              value={educationItem.date}
              disabled={1}
              placeholder="e.g., 2020-2024, Sep 2020 - Present, May 2022"
              aria-label="Date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter date range or single date (e.g., "2020-2024" or "Present")
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor={`description-${educationItem.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (Optional)
            </label>
            <textarea
            disabled={1}
              id={`description-${educationItem.id}`}
              rows="3"
              value={educationItem.description}
              placeholder="Relevant coursework, achievements, GPA, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}

      {education.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
