import { useContext, useEffect, useState, useCallback } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { useForm } from "react-hook-form";

// Example implementations for different optimization approaches

// APPROACH 1: Debounced Live Preview (Best for real-time updates)
export const PersonalInfoFormDebounced = () => {
  const { setPersonalInfo } = useContext(ResumeContext);
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      fullName: "", email: "", phone: "", address: "", 
      website: "", linkedin: "", summary: ""
    }
  });

  const watchedFields = watch();
  const [debouncedFields, setDebouncedFields] = useState(watchedFields);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFields(watchedFields);
    }, 300);
    return () => clearTimeout(timer);
  }, [watchedFields]);

  // Update context with debounced values
  useEffect(() => {
    setPersonalInfo(debouncedFields);
  }, [debouncedFields, setPersonalInfo]);

  return (
    <form>
      <input {...register('fullName')} placeholder="Full Name" />
      <input {...register('email')} placeholder="Email" />
      {/* Other fields... */}
    </form>
  );
};

// APPROACH 2: Selective Field Watching (Best for specific important fields)
export const PersonalInfoFormSelective = () => {
  const { setPersonalInfo } = useContext(ResumeContext);
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      fullName: "", email: "", phone: "", address: "", 
      website: "", linkedin: "", summary: ""
    }
  });

  // Only watch critical fields for live preview
  const fullName = watch('fullName');
  const email = watch('email');
  const summary = watch('summary');

  useEffect(() => {
    setPersonalInfo(prev => ({
      ...prev,
      fullName,
      email,
      summary
    }));
  }, [fullName, email, summary, setPersonalInfo]);

  // Update other fields only on form submission
  const onSubmit = (data) => {
    setPersonalInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder="Full Name" />
      <input {...register('email')} placeholder="Email" />
      <textarea {...register('summary')} placeholder="Summary" />
      {/* Other fields... */}
      <button type="submit">Save</button>
    </form>
  );
};

// APPROACH 3: Manual Control with onBlur (Best for minimal updates)
export const PersonalInfoFormManual = () => {
  const { personalInfo, setPersonalInfo } = useContext(ResumeContext);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: personalInfo
  });

  const updateField = useCallback((fieldName, value) => {
    setPersonalInfo(prev => ({ ...prev, [fieldName]: value }));
  }, [setPersonalInfo]);

  const onSubmit = (data) => {
    setPersonalInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('fullName')} 
        onBlur={(e) => updateField('fullName', e.target.value)}
        placeholder="Full Name" 
      />
      <input 
        {...register('email')} 
        onBlur={(e) => updateField('email', e.target.value)}
        placeholder="Email" 
      />
      <textarea 
        {...register('summary')} 
        onBlur={(e) => updateField('summary', e.target.value)}
        placeholder="Summary" 
      />
      {/* Other fields... */}
      <button type="submit">Save All</button>
    </form>
  );
};

// APPROACH 4: Hybrid - Real-time for preview fields, manual for others
export const PersonalInfoFormHybrid = () => {
  const { setPersonalInfo } = useContext(ResumeContext);
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      fullName: "", email: "", phone: "", address: "", 
      website: "", linkedin: "", summary: ""
    }
  });

  // Watch only fields that need real-time preview
  const previewFields = watch(['fullName', 'email', 'summary']);
  
  useEffect(() => {
    const [fullName, email, summary] = previewFields;
    setPersonalInfo(prev => ({
      ...prev,
      fullName,
      email,
      summary
    }));
  }, [previewFields, setPersonalInfo]);

  // Handle other fields on form submission
  const onSubmit = (data) => {
    setPersonalInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Real-time preview fields */}
      <input {...register('fullName')} placeholder="Full Name" />
      <input {...register('email')} placeholder="Email" />
      <textarea {...register('summary')} placeholder="Summary" />
      
      {/* Manual update fields */}
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('address')} placeholder="Address" />
      <input {...register('website')} placeholder="Website" />
      <input {...register('linkedin')} placeholder="LinkedIn" />
      
      <button type="submit">Save All</button>
    </form>
  );
};
