import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { useForm } from "react-hook-form";

const ProjectsForm = () => {
  const { projects, setProjects } = useContext(ResumeContext);
  const [showAddButton, setShowAddButton] = useState(false);
  const [keyHighlights, setKeyHighlights] = useState([]);
  const [currentHighlight, setCurrentHighlight] = useState("");

  const projectsForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      link: "",
      githubLink: "",
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = projectsForm;

  const onSubmit = (data) => {
    const newProject = {
      id: Date.now(),
      ...data,
      keyHighlights: keyHighlights,
    };
    setProjects((prev) => [...prev, newProject]);
    reset();
    setKeyHighlights([]);
    setShowAddButton(false);
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id != id));
  };

  const handleAddProject = () => {
    setShowAddButton(true);
  };

  const handleCancel = () => {
    setShowAddButton(false);
    setKeyHighlights([]);
    setCurrentHighlight("");
    reset();
  };

  const addKeyHighlight = () => {
    if (currentHighlight.trim()) {
      const newHighlight = {
        id: Date.now(),
        text: currentHighlight.trim(),
      };
      setKeyHighlights([...keyHighlights, newHighlight]);
      setCurrentHighlight(""); // Clear the input
    }
  };

  const removeKeyHighlight = (id) => {
    setKeyHighlights(keyHighlights.filter((highlight) => highlight.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          {projects.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {projects.length} project{projects.length === 1 ? "" : "s"} added
            </p>
          )}
        </div>
        {!showAddButton && (
          <button
            type="button"
            onClick={handleAddProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            {projects.length === 0 ? "Add Project" : "Add Another Project"}
          </button>
        )}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-400 italic">
          No projects added yet. Click "Add Project" to begin.
        </div>
      )}

      <div className="space-y-6">
        {showAddButton && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              🚀 Add New Project
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    {...register("title", {
                      required: "Project title is required",
                    })}
                    type="text"
                    placeholder="e.g. E-commerce Website"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used
                  </label>
                  <input
                    {...register("technologies")}
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live Demo Link
                  </label>
                  <input
                    {...register("link")}
                    type="url"
                    placeholder="https://your-project-demo.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Repository
                  </label>
                  <input
                    {...register("githubLink")}
                    type="url"
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Project description is required",
                  })}
                  rows={4}
                  placeholder="Describe your project, its purpose, and what problems it solves..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Key Highlights Input Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Add Key Highlights
                </label>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
                  <input 
                    value={currentHighlight}
                    onChange={(e) => setCurrentHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter'){
                        e.preventDefault();
                        addKeyHighlight();
                      }
                    }} 
                    type="text" 
                    className="flex-1 p-3 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                    placeholder="Enter a key highlight or achievement..." 
                  />
                  <button
                    type="button"
                    onClick={addKeyHighlight}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    + Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter or click "Add" to add each highlight.
                </p>
              </div>

              {/* Key Highlights Display Section */}
              {keyHighlights.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Added Highlights ({keyHighlights.length})
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="space-y-2">
                      {keyHighlights.map((highlight, index) => (
                        <div
                          key={highlight.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-blue-600 font-bold text-sm">
                              {index + 1}.
                            </span>
                            <span className="text-gray-700 text-sm">
                              {highlight.text}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeKeyHighlight(highlight.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                🚀 Project Entry
              </h3>
              <button
                onClick={() => removeProject(project.id)}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition cursor-pointer"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue={project.title || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue={project.technologies || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Live Demo Link
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue={project.link || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue={project.githubLink || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                disabled
                rows={3}
                defaultValue={project.description || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            {project.keyHighlights && project.keyHighlights.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {project.keyHighlights.map((highlight, index) => (
                    <div
                      key={highlight.id || index}
                      className="flex items-start p-2 gap-2"
                    >
                      <div>
                        <span className="text-gray-500 mt-1 ">•</span>
                        <span className="text-gray-600 text-sm leading-relaxed ">
                          {highlight.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
