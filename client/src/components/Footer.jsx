import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mb-6">
          {/* NotesSwift Column */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">NotesSwift</h4>
            <p className="text-gray-400">
              Providing Notes, Assignments, Solutions, Formulas, and Questions
              to Class 11 and 12 students, for both SCIENCE and COMMERCE
              Streams.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-400">
                <FaLinkedin size="1.5em" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaInstagram size="1.5em" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <IoMailOutline size="1.5em" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaGithub size="1.5em" />
              </a>
            </div>
          </div>

          {/* Shortcut Column */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Shortcut</h4>
            <ul className="text-gray-400">
              <li className="mb-2 hover:text-white">
                <a href="#">BTech</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">MTech</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">BPharma</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">MPharma</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">MBA</a>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Useful Links</h4>
            <ul className="text-gray-400">
              <li className="mb-2 hover:text-white">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Contact Us</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Terms and Conditions</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="/">Sitemap</a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-1">
            <h4 className="text-2xl font-semibold mb-4">Contact</h4>
            <p className="flex items-center text-gray-400">
              <FaMapMarkerAlt className="mr-2" />
              11 mile, Bhopal, M.P. India
            </p>
            <p className="flex items-center text-gray-400">
              <IoMailOutline className="mr-2" />
              <a
                href="mailto:connectwithsiddh@gmail.com"
                className="hover:text-white"
              >
                connectwithsiddh@gmail.com
              </a>
            </p>
            <p className="flex items-center text-gray-400">
              <LuPhone className="mr-2" />
              986562**** / 986556****
            </p>
          </div>
        </div>

        {/* Sub-Footer Attribution */}
        <div className="sub-footer border-t border-gray-700 pt-6 mt-6 text-center ">
          <p className="text-gray-500">
            <span>💙</span> Designed & Developed by{" "}
            <a
              href="mailto:connectwithsiddh@gmail.com"
              className="text-white hover:text-gray-400"
            >
              Siddharth Patel <IoMailOutline className="inline ml-1" />
            </a>
          </p>
          <p className="text-gray-500">
            Connect with me on LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/siddharth-patel-b1ba53270"
              className="text-white hover:text-gray-400"
            >
              My LinkedIn Profile <FaLinkedin className="inline ml-1" />
            </a>
          </p>
        </div>

        <div className="text-center text-gray-500 mt-4 text-sm">
          © 2024 NotesSwift – All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
