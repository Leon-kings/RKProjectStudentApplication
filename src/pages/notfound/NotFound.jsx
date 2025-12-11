/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons
import {
  Send as SendIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Help as HelpIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

export const NotFound = () => {
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Assistance request form state
  const [assistanceData, setAssistanceData] = useState({
    name: "",
    email: "",
    issueType: "technical",
    message: "",
    pageUrl: window.location.pathname,
  });

  // Issue types for dropdown
  const issueTypes = [
    { value: "technical", label: "Technical Issue" },
    { value: "missing", label: "Missing Page" },
    { value: "access", label: "Access Problem" },
    { value: "bug", label: "Bug Report" },
    { value: "other", label: "Other" },
  ];

  // API Base URL
  const API_URL = "http://localhost:5000/api";

  // Loading animation variants
  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Modal animations
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Handle assistance request submission
  const handleAssistanceSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/assistance/request`, {
        ...assistanceData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      if (response.data.success) {
        toast.success(
          "Assistance request sent successfully! We'll contact you soon.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );

        setRequestSent(true);
        setTimeout(() => {
          setIsAssistanceModalOpen(false);
          setRequestSent(false);
          setAssistanceData({
            name: "",
            email: "",
            issueType: "technical",
            message: "",
            pageUrl: window.location.pathname,
          });
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to send request. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gradient presets
  const gradientPresets = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
    secondary: "bg-gradient-to-r from-green-500 to-emerald-600",
    danger: "bg-gradient-to-r from-red-500 to-rose-600",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-600",
    success: "bg-gradient-to-r from-teal-500 to-green-600",
    info: "bg-gradient-to-r from-cyan-500 to-blue-600",
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated background elements */}
          <div className="relative mb-12">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 dark:from-red-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-50"></div>

            <div className="relative">
              <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                404
              </h1>
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-30 animate-ping"></div>
                <div className="relative w-48 h-48 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center text-6xl shadow-2xl">
                  🚫
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-200">
            Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>

          {/* Error details */}
          <div className="mb-10 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-l-4 border-red-500 p-4 rounded-r-lg text-left">
              <div className="flex items-center mb-2">
                <ErrorIcon className="text-red-500 mr-2" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Error Details:
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                URL:{" "}
                <span className="font-mono text-gray-800 dark:text-gray-300">
                  {window.location.pathname}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Status:{" "}
                <span className="font-semibold text-red-600 dark:text-red-400">
                  404 - Not Found
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <HomeIcon className="w-5 h-5" />
              Go Back Home
            </motion.a>

            <motion.button
              onClick={() => setIsAssistanceModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <HelpIcon className="w-5 h-5" />
              Request Assistance
            </motion.button>
          </div>

          {/* Helpful tips */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-300">
              Helpful Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl">
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Check the URL for typos
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Use the search function
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-100 dark:border-green-800/30">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl">
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Contact support for help
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistance Request Modal */}
      <AnimatePresence>
        {isAssistanceModalOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => !isLoading && setIsAssistanceModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] overflow-y-auto"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-[70]"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className={`${gradientPresets.info} p-6 text-white`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <HelpIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          Request Assistance
                        </h2>
                        <p className="opacity-90">
                          Get help from our admin team
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        !isLoading && setIsAssistanceModalOpen(false)
                      }
                      className="p-2 bg-gradient-to-t from-red-500 to-red-600 rounded-full transition-all disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <CloseIcon className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Success Message */}
                {requestSent ? (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold mb-3 dark:text-white">
                      Request Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Our admin team has received your request and will contact
                      you shortly.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You'll be redirected in a moment...
                    </p>
                  </div>
                ) : (
                  /* Assistance Form */
                  <form
                    onSubmit={handleAssistanceSubmit}
                    className="p-6 space-y-5 overflow-y-auto"
                  >
                    <div className="space-y-2">
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        <PersonIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={assistanceData.name}
                        onChange={(e) =>
                          setAssistanceData({
                            ...assistanceData,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        <EmailIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={assistanceData.email}
                        onChange={(e) =>
                          setAssistanceData({
                            ...assistanceData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="your@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        <HelpIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Issue Type
                      </label>
                      <select
                        value={assistanceData.issueType}
                        onChange={(e) =>
                          setAssistanceData({
                            ...assistanceData,
                            issueType: e.target.value,
                          })
                        }
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        disabled={isLoading}
                      >
                        {issueTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        <MessageIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Describe the Issue
                      </label>
                      <textarea
                        value={assistanceData.message}
                        onChange={(e) =>
                          setAssistanceData({
                            ...assistanceData,
                            message: e.target.value,
                          })
                        }
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                        rows="4"
                        placeholder="Please describe what you were trying to do and what went wrong..."
                        required
                        disabled={isLoading}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Page URL:{" "}
                        <span className="font-mono text-gray-700 dark:text-gray-300">
                          {assistanceData.pageUrl}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="collectData"
                          className="mt-1 mr-2"
                          required
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="collectData"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          I agree to share my browser information and error
                          details to help resolve this issue faster.
                        </label>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By submitting this form, you agree that an admin will
                        review your request and may contact you via email to
                        provide assistance.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full ${gradientPresets.info} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3`}
                    >
                      {isLoading ? (
                        <>
                          <motion.span
                            variants={loadingVariants}
                            animate="animate"
                          >
                            <RefreshIcon className="w-5 h-5" />
                          </motion.span>
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-5 h-5" />
                          <span>Send Request to Admin</span>
                          <ArrowForwardIcon className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating help button for mobile */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsAssistanceModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <HelpIcon className="w-6 h-6" />
      </motion.button>
    </>
  );
};
