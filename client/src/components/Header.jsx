import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  Bars3Icon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
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
          <div className="hidden md:flex md:flex-grow  justify-center items-center">
            {/* Centered Links */}
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/placement" className="text-gray-700 hover:text-gray-900">Placement</a>
              <a href="/products" className="text-gray-700 hover:text-gray-900">Notes</a>
              <Link to="/contactuspage" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </nav>
          </div>

          {/* Login/Signup or User Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <UserIcon className="w-6 h-6" />
                  <ChevronDownIcon className="w-5 h-5 ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:rounded-xl shadow-xl"
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
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md transition-colors duration-200"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} px-6 pb-4`}>
          <nav className="flex flex-col items-center space-y-4">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/placement" className="text-gray-700 hover:text-gray-900">Placement</a>
            <a href="/products" className="text-gray-700 hover:text-gray-900">Notes</a>
            <Link to="/contactuspage" className="text-gray-700 hover:text-gray-900">Contact</Link>

            {/* Login/Signup for Mobile */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-left rounded-md transition-colors duration-200 px-4 py-2 border-gray-300 border text-gray-700 hover:bg-gray-100 hover:rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md transition-colors duration-200"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
