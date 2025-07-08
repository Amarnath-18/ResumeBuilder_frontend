import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { useForm } from "react-hook-form";

const ExperienceForm = () => {
  // company , position , location , date , description
  const { experience, setExperience } = useContext(ResumeContext);
  const [showAddButton, setShowAddButton] = useState(false);

  const experienceForm = useForm({
    defaultValues: {
      company: "",
      position: "",
      location: "",
      date: "",
      description: "",
    },
  });
  const { register, handleSubmit, reset, formState: { errors } } = experienceForm;

  const onSubmit = (data) => {
    const newExperience = {
      id: Date.now(),
      ...data,
    };
    setExperience(prev => [...prev, newExperience]);
    reset();
    setShowAddButton(false);
  };

  const removeExperience = (id) => {
    setExperience((prev) => prev.filter(exp => exp.id !== id));
  };

  const handleAddExperience = () => {
    setShowAddButton(true);
  };



  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
          {experience.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {experience.length} experience {experience.length === 1 ? 'entry' : 'entries'} added
            </p>
          )}
        </div>
        {!showAddButton && (
          <button
            type="button"
            onClick={handleAddExperience}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            {experience.length === 0 ? 'Add Experience' : 'Add Another Experience'}
          </button>
        )}
      </div>

      {experience.length === 0 && (
        <div className="text-center py-8 text-gray-400 italic">
          No experience added yet. Click “Add Experience” to begin.
        </div>
      )}

      <div className="space-y-6">
        {showAddButton && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              ➕ Add New Experience
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    {...register('company', { required: 'Company name is required' })}
                    type="text"
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    {...register('position', { required: 'Position is required' })}
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    {...register('location')}
                    type="text"
                    placeholder="e.g. Bengaluru, India"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    {...register('date')}
                    type="text"
                    placeholder="e.g., 2020-2024, Sep 2020 - Present"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Describe your responsibilities, achievements, or technologies used..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Experience
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddButton(false)}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                💼 Experience Entry
              </h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition cursor-pointer"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label
                  htmlFor={`experience-company-${exp.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  disabled={1}
                  id={`experience-company-${exp.id}`}
                  type="text"
                  defaultValue={exp.company || ''}
                  placeholder="e.g. Google"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`experience-position-${exp.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position
                </label>
                <input
                  disabled={1}
                  id={`experience-position-${exp.id}`}
                  type="text"
                  defaultValue={exp.position || ''}
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`experience-location-${exp.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  disabled={1}
                  id={`experience-location-${exp.id}`}
                  type="text"
                  defaultValue={exp.location || ''}
                  placeholder="e.g. Bengaluru, India"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor={`date-${exp.id}`}
                  className="text-sm font-medium text-gray-800 mb-2 block"
                >
                  Date
                </label>
                <input
                  disabled={1}
                  id={`date-${exp.id}`}
                  type="text"
                  defaultValue={exp.date || ''}
                  placeholder="e.g., 2020-2024, Sep 2020 - Present, May 2022"
                  aria-label="Date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter date range or single date (e.g., "2020-2024" or
                  "Present")
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor={`experience-description-${exp.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                  disabled={1}
                id={`experience-description-${exp.id}`}
                rows={4}
                defaultValue={exp.description || ''}
                placeholder="Describe your responsibilities, achievements, or technologies used..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ExperienceForm;
