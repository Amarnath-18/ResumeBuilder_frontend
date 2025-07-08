import React, { useContext } from "react";
import { FiAlignRight } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import { logoutAPI } from "../services/authServices";
import {toast} from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async()=>{
    try {
      await logoutAPI();
      setUser(null);
      toast("Logout successfully");
      navigate('/signin');
    } catch (error) {
      toast(error.message);
    }
  }
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-800 w-full h-16 fixed top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <div onClick={()=>navigate('/')} className="text-white text-xl font-bold cursor-pointer hover:text-blue-200 transition-colors duration-200">
          ResumeBuilder
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Features
          </Link>
          <Link to="/dashboard" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Dashboard
          </Link>
          <div className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Pricing
          </div>
          {!user ? (
            <>
              <button onClick={()=>navigate('/signup')} className="text-blue-700 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-white">
                Sign Up
              </button>
              <button onClick={()=>navigate('/signin')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md">
                Login
              </button>
            </>
          ) : (<>
            <Link to="/profile" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
              My Profile
            </Link>
            
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md">
              logout
            </button>
          </>)}
        </div>
        {/* for mobile */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-blue-200 transition-colors cursor-pointer duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            <FiAlignRight />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 bg-opacity-95 absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-6 shadow-lg z-50">
          <Link to="/features" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Features
          </Link>
          <Link to="/dashboard" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Dashboard
          </Link>
          <div className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
            Pricing
          </div>
          {!user ? (
            <>
              <button onClick={()=>navigate('/signup')} className="text-blue-700 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-white w-4/5">
                Sign Up
              </button>
              <button onClick={()=>navigate('/signin')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md w-4/5">
                Login
              </button>
            </>
          ) : (<>
            <Link to="/profile" className="text-white cursor-pointer hover:text-blue-200 transition-colors duration-200 font-medium">
              My Profile
            </Link>
            
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md w-4/5">
              logout
            </button>
          </>)}
        </div>
      )}
    </div>
  );
};

export default NavBar;
