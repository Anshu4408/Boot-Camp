'use client';
import React, { useState, useEffect } from 'react';

const EditProfileForm = ({ userDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Update form when userDetails is received
  useEffect(() => {
    console.log('userDetails received in form:', userDetails);
    if (userDetails) {
      // Handle nested data structure
      const userData = userDetails.data || userDetails.user || userDetails;
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
      });
      console.log('Form data updated with:', userData);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full">
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-20 w-full ">
        <div>
          <label className="block text-sm  text-gray-800 my-4">
             Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-[#F5F6FA] border border-gray-200 rounded-lg  focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm  text-gray-800 my-4">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>
        {/* <div>
          <label className="block text-sm  text-gray-800 my-4">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div> */}
      </div>

      {/* Email and Phone Number */}
      <div className="grid grid-cols-2 gap-20 w-full">
        {/* <div>
          <label className="block text-sm  text-gray-800 my-4">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div> */}
        {/* <div>
          <label className="block text-sm  text-gray-800 my-4">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div> */}
      </div>

      {/* Date of Birth and Gender
      <div className="grid grid-cols-2 gap-20">
        <div>
          <label className="block text-sm  text-gray-800 my-4">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="Enter your birthdate"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>
        <div className='mb-10'>
          <label className="block text-sm  text-gray-800 my-4 ">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#F5F6FA] focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div> */}

      {/* Submit Button */}
      <div className="flex justify-center mt-6 ">
        <button
          type="submit"
          className="px-20 py-3 bg-gradient-to-r from-[#8150E8] to-[#758FF0] text-white rounded-lg font-semibold text-sm hover:from-[#9166EF] hover:to-[#7F9BF5] transition shadow-md hover:shadow-lg"
        >
          Add Now
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
