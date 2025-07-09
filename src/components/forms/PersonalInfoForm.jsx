import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { IoPersonOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { CiLink, CiLinkedin } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa6";
import { TiPhoneOutline } from "react-icons/ti";
import { useForm } from "react-hook-form";

const PersonalInfoForm = () => {
  const { setPersonalInfo } = useContext(ResumeContext);
  const personalInfoForm = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      summary: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = personalInfoForm;

  const onSubmit = (data) => {
    setPersonalInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <IoPersonOutline />
            <h4 className="text-gray-600 font-semibold">Full Name*</h4>
          </div>

          <input
            {...register("fullName", { required: "Full Name is required" })}
            required={true}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Full Name"
            type="text"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <MdMailOutline />
            <h4 className="text-gray-600 font-semibold">Email*</h4>
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            required={true}
            placeholder="Enter Your Email Address"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <TiPhoneOutline />
            <h4 className="text-gray-600 font-semibold">Phone No</h4>
          </div>
          <input
            {...register("phone")}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Phone Number"
            type="tel"
          />
        </div>

        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <FaAddressCard />
            <h4 className="text-gray-600 font-semibold">Address</h4>
          </div>
          <input
            {...register("address")}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Address"
            type="text"
          />
        </div>

        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <CiLink />
            <h4 className="text-gray-600 font-semibold">WebSite</h4>
          </div>
          <input
            {...register("website")}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Portfolio or github link"
            type="url"
          />
        </div>

        <div className="p-2 ">
          <div className="flex items-center gap-0.5  ">
            <CiLinkedin />
            <h4 className="text-gray-600 font-semibold">Linkedin</h4>
          </div>
          <input
            {...register("linkedin")}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your linkedin link"
            type="url"
          />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Professional Summary
        </h2>
        <textarea
          {...register("summary")}
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          placeholder="Briefly describe your professional background, skills, and goals..."
        />
      </div>

      <div className="p-4">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Save Personal Information
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
