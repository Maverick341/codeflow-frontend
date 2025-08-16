import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlaylistStore } from '../store/usePlaylistStore';
import {
  Loader,
  Code,
  Target,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
} from 'lucide-react';
import PlaylistTable from '../components/PlaylistTable';
import { useParams } from 'react-router-dom';
import { useProblemStore } from '../store/useProblemStore';

const PlaylistPage = () => {
  const { id } = useParams();
  const { currentPlaylist, getPlaylistDetails, isLoading } = usePlaylistStore();
  const { solvedProblems, getSolvedProblemByUser } = useProblemStore();

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id]);

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  console.log(currentPlaylist);

  const problemsCount = (currentPlaylist?.problems || []).length;
  const problemIds = (currentPlaylist?.problems || []).map((p) => p.problemId);

  const solvedProblemCount = problemIds.filter((id) =>
    solvedProblems.some((sp) => sp.id === id)
  ).length;

  const tagsSet = new Set();

  (currentPlaylist?.problems || []).forEach((p) => {
    p.problem?.tags?.forEach((t) => tagsSet.add(t));
  });

  const tags =  Array.from(tagsSet);

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100) || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-codeflow-dark via-base-300 to-base-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-base-100/50 backdrop-blur-sm p-8 shadow-2xl border border-white/10"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-codeflow-purple border-t-transparent rounded-full mb-4"
            />
            <p className="text-base-content/70 text-lg">Loading playlist...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-codeflow-dark via-base-300 to-base-200 px-4 py-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-codeflow-purple/20 to-codeflow-blue/20 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-bl from-codeflow-blue/15 to-codeflow-purple/15 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Playlist Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="card bg-base-100/40 backdrop-blur-sm shadow-2xl border border-white/10 p-6">
            {/* Header with Icon and Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-lg shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-base-content">
                {currentPlaylist?.name || 'Playlist Name'}
              </h1>
            </div>

            {/* Description */}
            <p className="text-base text-base-content/70 mb-4 leading-relaxed">
              {currentPlaylist?.description || 'No description available for this playlist.'}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-base-300/80 text-base-content/80 rounded-md text-xs font-medium border border-base-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Progress Section */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-base-content/60 font-medium">
                    Progress: {getProgressPercentage(solvedProblemCount, problemsCount)}% ({solvedProblemCount}/{problemsCount})
                  </span>
                </div>
                <div className="w-full bg-base-300/60 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(solvedProblemCount, problemsCount)}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Difficulty and Completion Status */}
              <div className="flex flex-wrap gap-2">
                {/* Add difficulty badge if available */}
                <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-md text-xs font-medium border border-green-400/30">
                  EASY
                </span>

                {/* Completion status */}
                {problemsCount !== 0 && solvedProblemCount === problemsCount && (
                  <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-md text-xs font-medium border border-green-400/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentPlaylist &&
          Array.isArray(currentPlaylist?.problems) &&
          currentPlaylist.problems.length > 0 ? (
            <PlaylistTable currentPlaylist={currentPlaylist} />
          ) : (
            <div className="card bg-base-100/30 backdrop-blur-sm shadow-xl border border-white/10 p-12">
              <div className="text-center">
                <div className="p-4 bg-base-200/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Code className="w-10 h-10 text-base-content/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No Problems Added
                </h3>
                <p className="text-base-content/60 mb-6">
                  It looks like there are no problems added to this playlist
                  at the moment.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PlaylistPage;
