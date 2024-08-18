import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        formData
      );
      if (response.status === 200) {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
      <div className="flex gap-x-4">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
            First Name <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
            Last Name <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
          />
        </label>
      </div>
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
          Email Address <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
        />
      </label>
      <div className="flex gap-x-4">
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
            Create Password <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 !pr-10 focus:outline-blue-600"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#6B7280" />
            )}
          </span>
        </label>
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
            Confirm Password <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 !pr-10 focus:outline-blue-600"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#6B7280" />
            )}
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;

























// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../../../slices/authSlice";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// function SignupForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { firstName, lastName, email, password, confirmPassword } = formData;

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       // Dispatch the signupUser action
//       await dispatch(signupUser({
//         firstName,
//         lastName,
//         email,
//         password,
//       }));

//       // Navigate to the home page on successful signup
//       navigate("/");
//       console.log('Form Data:', formData);

//     } catch (error) {
//       // Handle error if necessary
//       console.error("Signup failed:", error);
//       alert("Signup failed: " + (error.response?.data?.message || error.message));
//     }

//     // Reset form
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
//       <div className="flex gap-x-4">
//         <label className="w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
//             First Name <sup className="text-red-500">*</sup>
//           </p>
//           <input
//             required
//             type="text"
//             name="firstName"
//             value={firstName}
//             onChange={handleOnChange}
//             placeholder="Enter first name"
//             className="form-style w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
//           />
//         </label>
//         <label className="w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
//             Last Name <sup className="text-red-500">*</sup>
//           </p>
//           <input
//             required
//             type="text"
//             name="lastName"
//             value={lastName}
//             onChange={handleOnChange}
//             placeholder="Enter last name"
//             className="form-style w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
//           />
//         </label>
//       </div>
//       <label className="w-full">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
//           Email Address <sup className="text-red-500">*</sup>
//         </p>
//         <input
//           required
//           type="email"
//           name="email"
//           value={email}
//           onChange={handleOnChange}
//           placeholder="Enter email address"
//           className="form-style w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-600"
//         />
//       </label>
//       <div className="flex gap-x-4">
//         <label className="relative w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
//             Create Password <sup className="text-red-500">*</sup>
//           </p>
//           <input
//             required
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={password}
//             onChange={handleOnChange}
//             placeholder="Enter Password"
//             className="form-style w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 !pr-10 focus:outline-blue-600"
//           />
//           <span
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//           >
//             {showPassword ? (
//               <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
//             ) : (
//               <AiOutlineEye fontSize={24} fill="#6B7280" />
//             )}
//           </span>
//         </label>
//         <label className="relative w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
//             Confirm Password <sup className="text-red-500">*</sup>
//           </p>
//           <input
//             required
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={handleOnChange}
//             placeholder="Confirm Password"
//             className="form-style w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 !pr-10 focus:outline-blue-600"
//           />
//           <span
//             onClick={() => setShowConfirmPassword((prev) => !prev)}
//             className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//           >
//             {showConfirmPassword ? (
//               <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
//             ) : (
//               <AiOutlineEye fontSize={24} fill="#6B7280" />
//             )}
//           </span>
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="mt-6 rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//       >
//         Create Account
//       </button>
//     </form>
//   );
// }

// export default SignupForm;
