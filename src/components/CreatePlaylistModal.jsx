import { X, BookOpen, Lock, Globe, Sparkles } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const isPublic = watch('isPublic', true);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Enhanced Backdrop with Smoother Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal Container with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
        className="relative w-full max-w-md"
      >
        {/* Glassmorphism Background with Gradient Border */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-codeflow-purple/20 via-transparent to-codeflow-blue/20 opacity-50" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-xl shadow-lg"
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">Create New Playlist</h3>
                  <p className="text-sm text-white/60">Organize your coding journey</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
              {/* Playlist Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white/90 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-codeflow-purple" />
                    Playlist Name
                  </span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="input bg-white/10 backdrop-blur-sm border border-white/20 focus:border-codeflow-purple/50 focus:bg-white/15 text-white placeholder:text-white/50 transition-all duration-200"
                  placeholder="Enter an awesome playlist name"
                  {...register('name', { required: 'Playlist name is required' })}
                />
                {errors.name && (
                  <motion.label
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="label"
                  >
                    <span className="label-text-alt text-red-400 flex items-center gap-1">
                      {errors.name.message}
                    </span>
                  </motion.label>
                )}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white/90">Description</span>
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  className="textarea bg-white/10 backdrop-blur-sm border border-white/20 focus:border-codeflow-purple/50 focus:bg-white/15 text-white placeholder:text-white/50 h-24 resize-none transition-all duration-200"
                  placeholder="Describe what this playlist is about..."
                  {...register('description')}
                />
              </div>

              {/* Privacy Toggle */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-white/90">Privacy</span>
                </label>
                <div className="flex gap-3">
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isPublic
                        ? 'bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 border-codeflow-purple/40 text-white'
                        : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      value={true}
                      className="radio radio-sm radio-primary"
                      {...register('isPublic')}
                    />
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">Public</span>
                  </motion.label>
                  
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      !isPublic
                        ? 'bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 border-codeflow-purple/40 text-white'
                        : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      value={false}
                      className="radio radio-sm radio-primary"
                      {...register('isPublic')}
                    />
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">Private</span>
                  </motion.label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="btn bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 backdrop-blur-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white border-0 shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  Create Playlist
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatePlaylistModal;
