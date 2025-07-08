import { createContext, useState, useEffect } from "react";
const ResumeContext = createContext(null);

const ResumeProvider = ({children})=>{
        // Load initial data from localStorage or use defaults
        const loadFromStorage = (key, defaultValue) => {
            try {
                const saved = localStorage.getItem(key);
                return saved ? JSON.parse(saved) : defaultValue;
            } catch (error) {
                console.error(`Error loading ${key} from localStorage:`, error);
                return defaultValue;
            }
        };

        const [personalInfo , setPersonalInfo] = useState(() => loadFromStorage('resumePersonalInfo', {
            fullName : "",
            email:"",
            phone:"",
            address:"",
            website:"",
            linkedin:"",
            summary:"",
        }));
        const [education , setEducation] = useState(() => loadFromStorage('resumeEducation', []));
        const [experience, setExperience] = useState(() => loadFromStorage('resumeExperience', []));
        const [skills, setSkills] = useState(() => loadFromStorage('resumeSkills', []));
        const [projects, setProjects] = useState(() => loadFromStorage('resumeProjects', []));
        const [certifications, setCertifications] = useState(() => loadFromStorage('resumeCertifications', []));
        const [resumeData , setResumeData] = useState({
            personalInfo,
            education,
            experience,
            skills,
            projects,
            certifications,
        });
        const [currentTemplate , setCurrentTemplate] = useState(() => loadFromStorage('resumeTemplate', 'modern'));

        // Save to localStorage whenever data changes
        useEffect(() => {
            localStorage.setItem('resumePersonalInfo', JSON.stringify(personalInfo));
        }, [personalInfo]);

        useEffect(() => {
            localStorage.setItem('resumeEducation', JSON.stringify(education));
        }, [education]);

        useEffect(() => {
            localStorage.setItem('resumeExperience', JSON.stringify(experience));
        }, [experience]);

        useEffect(() => {
            localStorage.setItem('resumeSkills', JSON.stringify(skills));
        }, [skills]);

        useEffect(() => {
            localStorage.setItem('resumeProjects', JSON.stringify(projects));
        }, [projects]);

        useEffect(() => {
            localStorage.setItem('resumeCertifications', JSON.stringify(certifications));
        }, [certifications]);

        useEffect(() => {
            localStorage.setItem('resumeTemplate', JSON.stringify(currentTemplate));
        }, [currentTemplate]);

        // Update resumeData whenever any detail changes for live preview
        useEffect(() => {
            setResumeData({
                personalInfo,
                education,
                experience,
                skills,
                projects,
                certifications,
            });
        }, [personalInfo, education, experience, skills, projects, certifications]);

        // Function to clear all localStorage data
        const clearResumeData = () => {
            localStorage.removeItem('resumePersonalInfo');
            localStorage.removeItem('resumeEducation');
            localStorage.removeItem('resumeExperience');
            localStorage.removeItem('resumeSkills');
            localStorage.removeItem('resumeProjects');
            localStorage.removeItem('resumeCertifications');
            localStorage.removeItem('resumeTemplate');
            
            // Reset all state to defaults
            setPersonalInfo({
                fullName : "",
                email:"",
                phone:"",
                address:"",
                website:"",
                linkedin:"",
                summary:"",
            });
            setEducation([]);
            setExperience([]);
            setSkills([]);
            setProjects([]);
            setCertifications([]);
            setCurrentTemplate('modern');
        };

        // Function to manually save current state to localStorage
        const saveToLocalStorage = () => {
            try {
                localStorage.setItem('resumePersonalInfo', JSON.stringify(personalInfo));
                localStorage.setItem('resumeEducation', JSON.stringify(education));
                localStorage.setItem('resumeExperience', JSON.stringify(experience));
                localStorage.setItem('resumeSkills', JSON.stringify(skills));
                localStorage.setItem('resumeProjects', JSON.stringify(projects));
                localStorage.setItem('resumeCertifications', JSON.stringify(certifications));
                localStorage.setItem('resumeTemplate', JSON.stringify(currentTemplate));
                console.log('Resume data saved to localStorage');
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        };
        

    return (
        <ResumeContext.Provider value={{
            personalInfo, 
            setPersonalInfo,
            education,
            setEducation,
            experience,
            setExperience,
            skills,
            setSkills,
            projects,
            setProjects,
            certifications,
            setCertifications,
            resumeData,
            setResumeData,
            currentTemplate,
            setCurrentTemplate,
            clearResumeData,
            saveToLocalStorage,
        }}>
            {children}
        </ResumeContext.Provider>
    )
}

export { ResumeContext, ResumeProvider };