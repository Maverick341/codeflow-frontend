import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useProblemStore } from '../store/useProblemStore';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Code,
  Play,
} from 'lucide-react';

const PlaylistTable = ({ currentPlaylist }) => {
  const { authUser } = useAuthStore();
  const { solvedProblems } = useProblemStore();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const problems = currentPlaylist?.problems || [];

  const filteredProblems = useMemo(() => {
    return problems
      .filter((problemItem) =>
        problemItem.problem?.title?.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problemItem) =>
        difficulty === 'ALL' ? true : problemItem.problem?.difficulty === difficulty
      );
  }, [problems, search, difficulty]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const difficulties = ['EASY', 'MEDIUM', 'HARD'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HARD': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isProblemSolved = (problemId) => {
    return solvedProblems.some((sp) => sp.id === problemId);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100/30 backdrop-blur-sm shadow-xl border border-white/10 p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-base-content">Sheet Problems</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
            <input
              type="text"
              placeholder="Search problems by title..."
              className="input input-bordered w-full pl-10 bg-base-200/50 border-white/20 focus:border-codeflow-purple/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
            <select
              className="select select-bordered bg-base-200/50 border-white/20 pl-10 min-w-48"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="ALL">All Difficulties</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(search || difficulty !== 'ALL') && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
            <span className="text-sm text-base-content/60">Active filters:</span>
            {search && (
              <span className="badge bg-codeflow-purple/20 text-codeflow-purple border-codeflow-purple/30">
                Search: "{search}"
              </span>
            )}
            {difficulty !== 'ALL' && (
              <span className="badge bg-codeflow-blue/20 text-codeflow-blue border-codeflow-blue/30">
                {difficulty.toLowerCase()}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-base-100/30 backdrop-blur-sm shadow-xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead className="bg-base-200/50">
              <tr className="border-white/10">
                <th className="text-base-content/80 font-semibold">Status</th>
                <th className="text-base-content/80 font-semibold">Problems</th>
                <th className="text-base-content/80 font-semibold">Difficulty</th>
                <th className="text-base-content/80 font-semibold">Solve</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problemItem, index) => {
                  const problem = problemItem.problem;
                  const isSolved = isProblemSolved(problem.id);
                  
                  return (
                    <motion.tr 
                      key={problem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-white/10 hover:bg-base-200/30 transition-colors"
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Clock className="w-5 h-5 text-red-400" />
                          )}
                          <span className={`text-sm font-medium ${isSolved ? 'text-green-400' : 'text-red-400'}`}>
                            {isSolved ? 'Solved' : 'Unsolved'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <Link
                            to={`/problem/${problem.id}`}
                            className="font-semibold text-base-content hover:text-codeflow-purple transition-colors hover:underline mb-2 block"
                          >
                            {problem.title}
                          </Link>
                          <div className="flex flex-wrap gap-1">
                            {(problem.tags || []).slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="badge bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {(problem.tags || []).length > 3 && (
                              <span className="badge bg-base-200/50 text-base-content/60 text-xs">
                                +{(problem.tags || []).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge border font-semibold text-xs ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/problem/${problem.id}`}
                          className="btn btn-sm bg-codeflow-purple/20 hover:bg-codeflow-purple/30 text-codeflow-purple border-codeflow-purple/30 gap-1"
                        >
                          <Play className="w-4 h-4" />
                          Solve
                        </Link>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-base-200/50 rounded-full mb-4">
                        <Search className="w-8 h-8 text-base-content/40" />
                      </div>
                      <h3 className="text-lg font-semibold text-base-content/70 mb-2">No problems found</h3>
                      <p className="text-base-content/50">Try adjusting your filters or search terms</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-6 border-t border-white/10 bg-base-200/30">
            <div className="text-sm text-base-content/60">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm bg-base-200/50 border-white/20"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </motion.button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      className={`btn btn-sm ${currentPage === page 
                        ? 'bg-gradient-to-r from-codeflow-purple to-codeflow-blue text-white border-0' 
                        : 'bg-base-200/50 border-white/20'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-base-content/40">...</span>
                    <button
                      className={`btn btn-sm ${currentPage === totalPages 
                        ? 'bg-gradient-to-r from-codeflow-purple to-codeflow-blue text-white border-0' 
                        : 'bg-base-200/50 border-white/20'
                      }`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm bg-base-200/50 border-white/20"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PlaylistTable;
