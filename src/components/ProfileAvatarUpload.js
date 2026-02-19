'use client';
import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const ProfileAvatarUpload = () => {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="relative ">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera size={40} className="text-gray-400" />
          )}
        </div>
        <label className=" text-blue-600 text-xs font-medium hover:text-blue-700 transition   cursor-pointer text-center">
            Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
     
    </div>
  );
};

export default ProfileAvatarUpload;
