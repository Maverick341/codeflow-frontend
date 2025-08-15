import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  BookOpen,
  Clock,
  Users,
  Play,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Code,
  Star,
  Lock,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CreatePlaylistModal from './CreatePlaylistModal';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { useProblemStore } from '../store/useProblemStore';

const MyPlaylists = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    playlists: originalPlaylists,
    deletePlaylist,
    createPlaylist,
    getAllPlaylists,
  } = usePlaylistStore();
  const { solvedProblems, getSolvedProblemByUser } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  console.log(originalPlaylists);

  const RandomColors = [
    'from-green-500 to-emerald-500',
    'from-red-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-orange-500 to-yellow-500',
  ];

  const playlists = originalPlaylists.map((playlist) => {
    const tagsSet = new Set();
    const difficultyCount = { EASY: 0, MEDIUM: 0, HARD: 0 };
    const problemIds = (playlist.problems || []).map((p) => p.problemId);

    (playlist.problems || []).forEach((p) => {
      p.problem.tags?.forEach((t) => tagsSet.add(t));
      if (p.problem.difficulty) difficultyCount[p.problem.difficulty]++;
    });

    let playlistDifficulty = '';
    const problemsLength = (playlist.problems || []).length;
    const maxCount = Math.max(...Object.values(difficultyCount));
    if (problemsLength === 0) {
      playlistDifficulty = 'N/A';
    } else if (maxCount === 0) {
      playlistDifficulty = 'Mixed';
    } else {
      playlistDifficulty =
        Object.keys(difficultyCount).find(
          (key) => difficultyCount[key] === maxCount
        ) || 'Mixed';
    }

    const completedCount = problemIds.filter((id) =>
      solvedProblems.some((sp) => sp.id === id)
    ).length;

    return {
      id: playlist.id ?? '',
      title: playlist.name ?? 'Untitled Playlist',
      description: playlist.description ?? '',
      createdAt: playlist.createdAt ?? '',
      updatedAt: playlist.updatedAt ?? '',
      problemCount: problemsLength,
      tags: Array.from(tagsSet),
      difficulty: playlistDifficulty,
      color: problemsLength
        ? RandomColors[Math.floor(Math.random() * RandomColors.length)]
        : 'from-gray-400 to-gray-600',
      completedCount,
    };
  });

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const filteredPlaylists = playlists.filter((playlist) => {
    switch (activeFilter) {
      case 'completed':
        return playlist.completedCount === playlist.problemCount;
      case 'in-progress':
        return (
          playlist.completedCount > 0 &&
          playlist.completedCount < playlist.problemCount
        );
      case 'not-started':
        return playlist.completedCount === 0;
      // case 'public':
      //   return playlist.isPublic;
      // case 'private':
      //   return !playlist.isPublic;
      default:
        return true;
    }
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/10';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleDelete = (id) => {
    deletePlaylist(id);
  };

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100) || 0;
  };

  return (
    <div className="card bg-base-100/50 backdrop-blur-sm shadow-xl border border-white/10">
      <div className="card-body p-0">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-base-content">
                My Playlists
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white border-0 gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Playlist
            </motion.button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'completed', label: 'Completed' },
              { key: 'in-progress', label: 'In Progress' },
              { key: 'not-started', label: 'Not Started' },
              // { key: 'public', label: 'Public' },
              // { key: 'private', label: 'Private' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`btn btn-sm ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-codeflow-purple to-codeflow-blue text-white border-0'
                    : 'bg-base-200/50 border-white/20 hover:bg-base-200/70'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="p-6">
          {filteredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlaylists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card bg-base-200/30 backdrop-blur-sm border border-white/10 hover:border-codeflow-purple/30 transition-all duration-300 group"
                >
                  <div className="card-body p-5">
                    {/* Playlist Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${playlist.color}`}
                        ></div>
                        <h3 className="font-semibold text-base-content group-hover:text-codeflow-purple transition-colors">
                          {playlist.title}
                        </h3>
                        {/* {playlist.isPublic ? (
                          <Globe className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-base-content/40" />
                        )} */}
                      </div>

                      <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-xs">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-white/10">
                          {/* <li>
                            <button
                              className="gap-2 flex items-center w-full"
                              // onClick={handleViewDetails}
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </li> */}
                          {/* <li>
                            <button
                              className="gap-2 flex items-center w-full"
                              // onClick={handleEdit}
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>
                          </li> */}
                          <li>
                            <button
                              className="gap-2 flex items-center w-full text-red-400"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure you want to delete this playlist?'
                                  )
                                ) {
                                  handleDelete(playlist.id);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                      {playlist.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-base-content/60">
                          Progress
                        </span>
                        <span className="text-xs font-medium text-base-content">
                          {playlist.completedCount}/{playlist.problemCount}{' '}
                          problems
                        </span>
                      </div>
                      <div className="w-full bg-base-300 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${playlist.color} transition-all duration-300`}
                          style={{
                            width: `${getProgressPercentage(playlist.completedCount, playlist.problemCount)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs font-medium text-codeflow-purple">
                          {getProgressPercentage(
                            playlist.completedCount,
                            playlist.problemCount
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`badge border font-medium text-xs ${getDifficultyColor(playlist.difficulty)}`}
                      >
                        {playlist.difficulty}
                      </span>
                      {/* <span className="badge bg-base-300/50 text-base-content/70 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {playlist.estimatedTime}
                      </span> */}
                      {playlist.problemCount !== 0 &&
                        playlist.completedCount === playlist.problemCount && (
                          <span className="badge bg-green-400/20 text-green-400 border-green-400/30 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {playlist.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge badge-outline text-xs">
                          {tag}
                        </span>
                      ))}
                      {playlist.tags.length > 3 && (
                        <span className="badge bg-base-200/50 text-xs">
                          +{playlist.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="card-actions justify-end">
                      <Link
                        to={`/playlist/${playlist.id}`}
                        className="btn btn-sm bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 hover:from-codeflow-purple/30 hover:to-codeflow-blue/30 text-codeflow-purple border-codeflow-purple/30 gap-1"
                      >
                        <Play className="w-3 h-3" />
                        {playlist.completedCount === 0 ? 'Start' : 'Continue'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-base-200/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-base-content/40" />
              </div>
              <h3 className="text-lg font-semibold text-base-content/70 mb-2">
                No playlists found
              </h3>
              <p className="text-base-content/50 mb-4">
                {activeFilter === 'all'
                  ? 'Create your first playlist to organize your practice problems'
                  : `No playlists match the "${activeFilter}" filter`}
              </p>
              <button
                className="btn bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white border-0 gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Create Your First Playlist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default MyPlaylists;
