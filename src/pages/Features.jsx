import React, { useContext } from 'react';
import { 
  FaBolt, 
  FaRocket, 
  FaShieldAlt, 
  FaPaintBrush, 
  FaDownload, 
  FaEye, 
  FaMobile, 
  FaCloud, 
  FaUsers, 
  FaChartLine,
  FaLightbulb,
  FaGraduationCap
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Features = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleCreateResume = () => {
    if (!user) {
      toast.warn("Please login to create a resume.");
      navigate('/signin');
    } else {
      navigate('/builder');
    }
  };

  const features = [
    {
      icon: <FaBolt className="w-8 h-8" />,
      title: "Lightning Fast Builder",
      description: "Create professional resumes in minutes with our intuitive drag-and-drop interface. No design skills required.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "ATS-Optimized Templates", 
      description: "All templates are designed to pass Applicant Tracking Systems while maintaining beautiful, professional designs.",
      color: "from-blue-500 to-purple-500",
      bgColor: "from-blue-50 to-purple-50"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. We never share your information with third parties. GDPR compliant.",
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50"
    },
    {
      icon: <FaPaintBrush className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Choose from 10+ carefully crafted templates designed by HR professionals and graphic designers.",
      color: "from-pink-500 to-red-500",
      bgColor: "from-pink-50 to-red-50"
    },
    {
      icon: <FaDownload className="w-8 h-8" />,
      title: "Multiple Export Formats",
      description: "Download your resume in PDF, Word, or plain text format. Perfect for any application requirement.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50"
    },
    {
      icon: <FaEye className="w-8 h-8" />,
      title: "Real-time Preview",
      description: "See exactly how your resume will look as you build it. Make changes and see instant results.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: "Mobile Responsive",
      description: "Build and edit your resume on any device. Fully responsive design works on desktop, tablet, and mobile.",
      color: "from-gray-500 to-gray-700",
      bgColor: "from-gray-50 to-gray-100"
    },
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: "Cloud Storage",
      description: "Your resumes are automatically saved to the cloud. Access them from anywhere, anytime.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50"
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Smart Suggestions",
      description: "AI-powered content suggestions help you write compelling bullet points and descriptions.",
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Users", icon: <FaUsers /> },
    { number: "95%", label: "Interview Rate", icon: <FaChartLine /> },
    { number: "4.9★", label: "User Rating", icon: <FaGraduationCap /> },
    { number: "5min", label: "Avg. Build Time", icon: <FaBolt /> }
  ];

  const templates = [
    {
      name: "Modern Professional",
      description: "Clean, minimalist design perfect for corporate roles",
      preview: "🎯"
    },
    {
      name: "Creative Designer",
      description: "Bold and colorful layout for creative professionals",
      preview: "🎨"
    },
    {
      name: "Tech Specialist",
      description: "Technical focus with skills highlighting",
      preview: "💻"
    },
    {
      name: "Executive Leadership",
      description: "Sophisticated design for senior positions",
      preview: "👔"
    },
    {
      name: "Academic Scholar",
      description: "Research-focused layout for academic careers",
      preview: "📚"
    },
    {
      name: "Classic Traditional",
      description: "Timeless design suitable for any industry",
      preview: "📋"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Powerful Features for
            <span className="block">Your Success</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Everything you need to create a professional resume that gets you noticed by recruiters and hiring managers
          </p>
          <button 
            onClick={handleCreateResume}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Building Now →
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="text-3xl text-blue-600 mb-2">{stat.icon}</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resume Builder?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Packed with features designed to help you create the perfect resume and land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Preview Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Templates
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                For Every Industry
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates, each optimized for different industries and career levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl text-center mb-4">{template.preview}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{template.name}</h3>
                <p className="text-gray-600 text-center">{template.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleCreateResume}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Browse All Templates
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your professional resume in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h3>
              <p className="text-gray-600">
                Select from our collection of professional, ATS-friendly templates designed for your industry
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Your Information</h3>
              <p className="text-gray-600">
                Fill in your details with our guided forms and smart suggestions to highlight your best qualities
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download & Apply</h3>
              <p className="text-gray-600">
                Export your resume in multiple formats and start applying to your dream jobs with confidence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with our powerful resume builder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCreateResume}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Building Now
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <FaShieldAlt className="mr-2" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center">
              <FaBolt className="mr-2" />
              <span>5min Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
