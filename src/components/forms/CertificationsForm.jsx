import React, { useContext } from 'react'
import { ResumeContext } from '../../context/ResumeContext'
import { useForm } from 'react-hook-form'
import { MdDelete, MdDateRange, MdBusiness } from 'react-icons/md'
import { PiCertificateFill } from 'react-icons/pi'

const CertificationsForm = () => {
  const { certifications, setCertifications } = useContext(ResumeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      issuer: "",
      date: "",
    }
  });

  const addCertificate = (data) => {
    if (!data.name.trim() || !data.issuer.trim() || !data.date.trim()) {
      return;
    }

    const newCertificate = {
      id: Date.now(),
      ...data,
    }
    setCertifications((prev) => [...prev, newCertificate]);
    reset();
  }

  const removeCertificate = (id) => {
    setCertifications((prev) => prev.filter(c => c.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
        Certifications
      </h2>
      
      {certifications.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Add Your Certifications</h3>
          <p className="text-gray-500 italic">
            Include relevant certifications that showcase your expertise
          </p>
        </div>
      )}

      {/* Add Certification Form */}
      <div className="w-full p-6 bg-gray-50 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Certification</h3>
        <form onSubmit={handleSubmit(addCertificate)} className="space-y-4">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {/* Certificate Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PiCertificateFill className="text-blue-600" />
                <label className="text-gray-700 font-medium">Certificate Name*</label>
              </div>
              <input
                {...register("name", { 
                  required: "Certificate name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Issuing Organization */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MdBusiness className="text-green-600" />
                <label className="text-gray-700 font-medium">Issuing Organization*</label>
              </div>
              <input
                {...register("issuer", { 
                  required: "Issuing organization is required",
                  minLength: { value: 2, message: "Organization name must be at least 2 characters" }
                })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Amazon Web Services"
              />
              {errors.issuer && (
                <p className="text-red-500 text-sm mt-1">{errors.issuer.message}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="lg:w-1/2 md:w-1/2 w-full">
            <div className="flex items-center gap-2 mb-2">
              <MdDateRange className="text-purple-600" />
              <label className="text-gray-700 font-medium">Date Obtained*</label>
            </div>
            <input
              {...register("date", { 
                required: "Date is required"
              })}
              type="month"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <span>+</span>
            Add Certification
          </button>
        </form>
      </div>

      {/* Display Existing Certifications */}
      {certifications.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Certifications ({certifications.length})
          </h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">{cert.name}</h4>
                    <p className="text-gray-600 mt-1">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Obtained: {new Date(cert.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                    aria-label="Remove certification"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificationsForm