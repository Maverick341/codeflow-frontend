import React, { useEffect, useState } from 'react';
import { X, Plus, Loader, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlaylistStore } from '../store/usePlaylistStore';

const AddToPlaylist = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

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
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal Container with Dark Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
        className="relative w-full max-w-md"
      >
        {/* Dark Glassmorphism Background */}
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 opacity-60" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <List className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Add to Playlist</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 border border-gray-600/30"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-200">Select Playlist</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  className="select bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 focus:border-blue-500/50 focus:bg-gray-800/80 text-white w-full transition-all duration-200"
                  value={selectedPlaylist}
                  onChange={(e) => setSelectedPlaylist(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select a playlist</option>
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id} className="bg-gray-800 text-white">
                      {playlist.name}
                    </option>
                  ))}
                </motion.select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="btn bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-600/30 backdrop-blur-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg disabled:opacity-50"
                  disabled={!selectedPlaylist || isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Add to Playlist
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddToPlaylist;
