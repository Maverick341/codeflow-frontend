import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { X, Code, Copy, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeViewModal = ({ isOpen, onClose, submission }) => {
  if (!submission) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(submission.sourceCode);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const getLanguageForEditor = (language) => {
    const languageMap = {
      'JavaScript': 'javascript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cpp',
      'C': 'c',
      'Go': 'go',
      'Rust': 'rust',
      'TypeScript': 'typescript',
    };
    return languageMap[language] || 'javascript';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4"
          >
            <div className="card bg-base-100/95 backdrop-blur-sm shadow-2xl border border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-codeflow-purple to-codeflow-blue rounded-lg">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-base-content">Submitted Code</h3>
                    <div className="flex items-center gap-4 text-sm text-base-content/70">
                      <div className="flex items-center gap-1">
                        {submission.status === 'ACCEPTED' ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-error" />
                        )}
                        <span>{submission.status === 'ACCEPTED' ? 'Accepted' : 'Wrong Answer'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="badge badge-neutral badge-sm">
                        {submission.language}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyCode}
                    className="btn btn-sm bg-codeflow-purple/20 hover:bg-codeflow-purple/30 text-codeflow-purple border-codeflow-purple/30 gap-1"
                    title="Copy code to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="btn btn-ghost btn-circle btn-sm"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-4">
                <div className="w-full h-[60vh] border border-white/10 rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    language={getLanguageForEditor(submission.language)}
                    theme="vs-dark"
                    value={submission.sourceCode || '// No code available'}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      lineHeight: 20,
                      contextmenu: true,
                      selectOnLineNumbers: true,
                      selectionHighlight: true,
                      occurrencesHighlight: true,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-white/10 bg-base-200/30">
                <div className="text-sm text-base-content/60">
                  Read-only view of submitted solution
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-sm bg-base-200/50 border-white/20"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CodeViewModal;
