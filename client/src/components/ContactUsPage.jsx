import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  // Add more countries if needed
];

const ContactUsPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    countrycode: "+91",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "Please enter your first name.";
    if (!formData.email) newErrors.email = "Please enter your email address.";
    if (
      !formData.phoneNo ||
      formData.phoneNo.length < 10 ||
      formData.phoneNo.length > 12
    ) {
      newErrors.phoneNo = "Please enter a valid phone number.";
    }
    if (!formData.message) newErrors.message = "Please enter your message.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/reach/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        countrycode: "+91",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full  max-w-3xl mx-auto py-10 px-8 mb-10">
      <h2 className="text-[48px] font-bold text-center mb-8 text-gray-900">Contact Form</h2>
      <form
        className="flex flex-col gap-6 p-6 md:px-14 rounded-lg shadow-md border border-gray-200 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="text-start mb-4 md:pl-8 pt-8">
          <p className="text-4xl font-bold text-gray-700">
            Got an Idea? We'll help.
          </p>
          <p className="text-4xl font-bold text-gray-700"> Let's team up!</p>
          <p className="text-lg text-gray-500 pt-4">
            Tell us more about yourself and what you have in mind.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="firstname" className="text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <span className="text-blue-500 text-sm">
                {errors.firstname}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="lastname" className="text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-blue-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="text-gray-700">
            Phone Number
          </label>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/4">
              <select
                name="countrycode"
                id="countrycode"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
                value={formData.countrycode}
                onChange={handleChange}
              >
                {countryCodes.map((code, index) => (
                  <option key={index} value={code.code}>
                    {code.code} - {code.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-3/4">
              <input
                type="text"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345 67890"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="text-blue-500 text-sm">{errors.phoneNo}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            placeholder="Enter your message here"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className="text-blue-500 text-sm">{errors.message}</span>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full max-w-lg rounded-lg py-3 px-6 transition-all duration-200 hover:scale-95 hover:bg-blue-700 focus:outline-none"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ContactUsPage;
