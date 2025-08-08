import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Timer,
  Zap,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useProblemStore } from '../store/useProblemStore';
import { getLanguageId } from '../lib/lang';
import { useExecutionStore } from '../store/useExecutionStore';
import { useSubmissionStore } from '../store/useSubmissionStore';
import Submission from '../components/Submission';
import SubmissionsList from '../components/SubmissionList';
import ExecutionResults from '../components/ExecutionResults';

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const {
    executeCode,
    runCode,
    submission,
    execution,
    isExecuting,
    isRunning,
  } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      // If selectedLanguage is not set or not available for this problem, pick the first available language
      const availableLangs = Object.keys(problem.codeSnippets || {});
      let lang = selectedLanguage;
      if (!lang || !availableLangs.includes(lang)) {
        lang = availableLangs[0] || null;
        setSelectedLanguage(lang);
      }
      setCode(
        problem.codeSnippets?.[lang] || submission?.sourceCode || ''
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage, submission]);

  useEffect(() => {
    if (activeTab === 'submissions' && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  console.log('submission', submissions);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || '');
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log('Error submitting code', error);
    }
  };

  const handleRunCodeOnly = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      runCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log('Error executing code', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (isProblemLoading || !problem) {
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
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-codeflow-purple border-t-transparent rounded-full mb-4"
            />
            <p className="text-base-content/70 text-lg">Loading problem...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose max-w-none text-base-content"
          >
            <div className="mb-6">
              <p className="text-lg leading-relaxed text-base-content/90">{problem.description}</p>
            </div>

            {problem.examples && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-codeflow-purple">Examples:</h3>
                <div className="space-y-6">
                  {Object.entries(problem.examples).map(
                    ([lang, example], idx) => (
                      <motion.div
                        key={lang}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-base-200/50 to-base-300/30 p-6 rounded-xl border border-white/10 backdrop-blur-sm"
                      >
                        <div className="mb-4">
                          <div className="text-codeflow-blue mb-2 text-base font-semibold flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            Input:
                          </div>
                          <code className="bg-black/50 px-4 py-2 rounded-lg font-mono text-green-400 block">
                            {example.input}
                          </code>
                        </div>
                        <div className="mb-4">
                          <div className="text-codeflow-blue mb-2 text-base font-semibold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Output:
                          </div>
                          <code className="bg-black/50 px-4 py-2 rounded-lg font-mono text-green-400 block">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <div className="text-yellow-400 mb-2 text-base font-semibold flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              Explanation:
                            </div>
                            <p className="text-base-content/80 text-base leading-relaxed bg-black/30 p-3 rounded-lg">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            )}

            {problem.constraints && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-codeflow-purple">Constraints:</h3>
                <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 p-6 rounded-xl border border-white/10">
                  <pre className="text-base-content/80 text-sm leading-relaxed whitespace-pre-wrap">
                    {problem.constraints}
                  </pre>
                </div>
              </div>
            )}

            {problem.topics && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-codeflow-purple">Topics:</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 text-codeflow-purple rounded-full text-sm font-medium border border-codeflow-purple/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
      case 'submissions':
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case 'discussion':
        return (
          <div className="p-8 text-center">
            <MessageSquare className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/70 text-lg">No discussions yet</p>
            <p className="text-base-content/50 text-sm mt-2">Be the first to start a discussion!</p>
          </div>
        );
      case 'hints':
        return (
          <div className="p-4">
            {problem?.hints ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-lg font-semibold text-yellow-400">Hint</h4>
                </div>
                <p className="text-base-content/80 leading-relaxed">
                  {problem.hints}
                </p>
              </motion.div>
            ) : (
              <div className="text-center text-base-content/70 p-8">
                <Lightbulb className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                <p className="text-lg">No hints available</p>
                <p className="text-sm mt-2 text-base-content/50">Try to solve it on your own first!</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-codeflow-dark via-base-300 to-base-200 w-full">
      {/* Enhanced Header */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100/80 backdrop-blur-sm shadow-2xl border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={'/'} className="flex items-center gap-2 text-codeflow-purple hover:text-codeflow-blue transition-colors">
                <Home className="w-6 h-6" />
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-base-content">{problem.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty || 'Easy'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      Updated {new Date(problem.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{submissionCount} Submissions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{problem.acceptance || 95}% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`btn btn-ghost btn-circle ${isBookmarked ? 'text-yellow-400' : 'text-base-content/60'}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-ghost btn-circle text-base-content/60 hover:text-codeflow-blue"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              
              <select
                className="select select-bordered bg-base-200/50 border-white/20 text-base-content w-40"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                {Object.keys(problem.codeSnippets || {}).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Problem Description Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100/50 backdrop-blur-sm shadow-2xl border border-white/10"
          >
            <div className="card-body p-0">
              <div className="tabs tabs-boxed bg-transparent p-4 border-b border-white/10">
                {[
                  { key: 'description', icon: FileText, label: 'Description' },
                  { key: 'submissions', icon: Code2, label: 'Submissions' },
                  { key: 'discussion', icon: MessageSquare, label: 'Discussion' },
                  { key: 'hints', icon: Lightbulb, label: 'Hints' }
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    className={`tab gap-2 transition-all duration-200 ${
                      activeTab === key 
                        ? 'tab-active bg-gradient-to-r from-codeflow-purple to-codeflow-blue text-white' 
                        : 'hover:bg-base-200/50'
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="min-h-[500px] max-h-[700px] overflow-y-auto p-6">
                {renderTabContent()}
              </div>
            </div>
          </motion.div>

          {/* Code Editor Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card bg-base-100/50 backdrop-blur-sm shadow-2xl border border-white/10"
          >
            <div className="card-body p-0">
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-base-200/30">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-codeflow-purple" />
                  <span className="font-semibold text-base-content">Code Editor</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <Zap className="w-4 h-4" />
                  <span>Auto-save enabled</span>
                </div>
              </div>

              <div className="h-[600px] w-full relative">
                <Editor
                  height="100%"
                  language={selectedLanguage ? selectedLanguage.toLowerCase() : ''}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    lineHeight: 20,
                  }}
                />
              </div>

              <div className="p-4 bg-base-200/30 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 gap-2 ${
                      isRunning ? 'loading' : ''
                    }`}
                    onClick={handleRunCodeOnly}
                    disabled={isRunning}
                  >
                    {!isRunning && <Play className="w-4 h-4" />}
                    Run Code
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`btn bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 gap-2 ${
                      isExecuting ? 'loading' : ''
                    }`}
                    onClick={handleSubmitCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Award className="w-4 h-4" />}
                    Submit Solution
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-base-100/50 backdrop-blur-sm shadow-2xl mt-6 border border-white/10"
        >
          <div className="card-body">
            {submission ? (
              <Submission submission={submission} />
            ) : execution ? (
              <ExecutionResults execution={execution} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-lg">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content">Test Cases</h3>
                  </div>
                  <span className="text-sm text-base-content/60">{testcases.length} test cases</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="border-white/10">
                        <th className="text-codeflow-purple font-semibold">Input</th>
                        <th className="text-codeflow-purple font-semibold">Expected Output</th>
                        <th className="text-codeflow-purple font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <motion.tr 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-white/10 hover:bg-base-200/30"
                        >
                          <td className="font-mono text-sm bg-black/30 rounded p-2">{testCase.input}</td>
                          <td className="font-mono text-sm bg-black/30 rounded p-2">{testCase.output}</td>
                          <td>
                            <div className="flex items-center gap-2 text-base-content/60">
                              <Timer className="w-4 h-4" />
                              <span className="text-sm">Pending</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemPage;
