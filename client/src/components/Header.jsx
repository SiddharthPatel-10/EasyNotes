import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  Bars3Icon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '.././features/auth/authSlice';
import { toast } from "react-hot-toast";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              EasyNotes
            </Link>
          </div>

          {/* Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-gray-900">
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Navigation and Actions */}
          <nav className={`md:flex md:items-center md:space-x-8 absolute md:static top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-500 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 px-4 md:px-0">Home</a>
              <a href="/placement" className="text-gray-700 hover:text-gray-900 px-4 md:px-0">Placement</a>
              <a href="/products" className="text-gray-700 hover:text-gray-900 px-4 md:px-0">Notes</a>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 px-4 md:px-0">Contact</Link>
            </div>

            {/* Login/Signup or User Dropdown */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:ml-auto md:space-x-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-4 md:px-0"
                  >
                    <UserIcon className="w-6 h-6" />
                    <ChevronDownIcon className="w-5 h-5 ml-1" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md md:px-6 md:py-2 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md md:px-6 md:py-2 transition-colors duration-200"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
