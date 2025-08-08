import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, User, Mail, Camera, Save, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { authUser } = useAuthStore();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || '',
    username: authUser?.username || authUser?.email?.split('@')[0] || '',
    email: authUser?.email || '',
    avatarUrl: authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy'
  });
  
  const [previewImage, setPreviewImage] = useState(formData.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Image size must be less than 5MB'
        }));
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setFormData(prev => ({
          ...prev,
          avatarFile: file,
          avatarUrl: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        avatar: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make the actual API call to update the profile
      console.log('Profile update data:', formData);
      
      // Success feedback
      onClose();
      // You could add a toast notification here
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        submit: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullname: authUser?.fullname || '',
      username: authUser?.username || authUser?.email?.split('@')[0] || '',
      email: authUser?.email || '',
      avatarUrl: authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy'
    });
    setPreviewImage(authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="card bg-base-100/95 backdrop-blur-sm w-full max-w-md shadow-2xl border border-white/10"
      >
        <div className="card-body p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-base-content">Edit Profile</h3>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-codeflow-purple/30 group-hover:ring-codeflow-purple/50 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-ghost btn-sm mt-2 gap-2"
                disabled={isLoading}
              >
                <Upload className="w-4 h-4" />
                Change Avatar
              </button>
              
              {errors.avatar && (
                <p className="text-red-400 text-xs mt-1">{errors.avatar}</p>
              )}
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-codeflow-purple" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleInputChange}
                className={`input input-bordered bg-base-200/50 border-white/20 focus:border-codeflow-purple/50 ${
                  errors.fullname ? 'border-red-400' : ''
                }`}
                disabled={isLoading}
              />
              {errors.fullname && (
                <p className="text-red-400 text-xs mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-codeflow-blue" />
                  Username
                </span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                className={`input input-bordered bg-base-200/50 border-white/20 focus:border-codeflow-purple/50 ${
                  errors.username ? 'border-red-400' : ''
                }`}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">{errors.username}</p>
              )}
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Username can only contain letters, numbers, and underscores
                </span>
              </label>
            </div>

            {/* Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Email
                </span>
              </label>
              <input
                type="email"
                value={formData.email}
                className="input input-bordered bg-base-300/50 border-white/10 text-base-content/60"
                disabled
                readOnly
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Email cannot be changed
                </span>
              </label>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="alert alert-error">
                <span className="text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-ghost flex-1"
                disabled={isLoading}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn bg-base-200/50 border-white/20 flex-1"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white border-0 flex-1 gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
