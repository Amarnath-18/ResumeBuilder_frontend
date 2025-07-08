import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { MdDelete } from "react-icons/md";

const SkillsForm = () => {
  const { skills, setSkills } = useContext(ResumeContext);
  const [inputSkill, setInputSkill] = useState("");
  const SuggestedSkills = [
    "JavaScript",
    "Java",
    "Communication",
    "Python",
    "Leadership",
  ];
  
  const removeSkill = (skillToRemove) => {
    if (skillToRemove && skills.includes(skillToRemove)) {
      setSkills((prev) => prev.filter((skill) => skill != skillToRemove));
    }
  };
  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };
  const handleInput = () => {
    addSkill(inputSkill);
    setInputSkill("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
        Skills
      </h2>
      {skills.length === 0 && (
        <div className="text-center py-8">
          <h2 className="text-2xl p-1">Add Your Skills</h2>
          <p className=" text-gray-400 italic">
            Include both technical and soft skills relevant to your career
          </p>
        </div>
      )}
      <div className="w-full p-4 bg-gray-50 rounded-md">
        <h2 className="font-semibold p-1">Add Skills</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInput();
          }}
          className="flex justify-between gap-3 p-1"
        >
          <input
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            type="text"
            className="grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a Skill (e.g., JavaScript)"
          />
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500 text-white text-xl font-bold hover:bg-green-600 transition-colors duration-200"
            aria-label="Add Skill"
          >
            +
          </button>
        </form>

        <div className=" p-2">
          <h6 className="">Suggetion Skills:</h6>
          <div className=" p-1 flex flex-wrap gap-2 ">
            {SuggestedSkills.map((SuggestedSkill, index) => (
              <button
                key={index}
                onClick={() => addSkill(SuggestedSkill)}
                className="border border-gray-500 px-1 rounded-full font-extralight bg-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                {SuggestedSkill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2">
        <h2>Your Skills</h2>
        <div>
          {skills.map((skill, index) => (
            <div key={index} className=" py-3 px-6 w-full flex justify-between">
              <h2 className="text-gray-600 font-medium italic">{skill}</h2>
              <button
                onClick={() => removeSkill(skill)}
                className="p-2 cursor-pointer rounded-full bg-red-500"
              >
                <MdDelete color="white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
