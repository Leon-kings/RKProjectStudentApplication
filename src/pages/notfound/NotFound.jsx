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
  Search as SearchIcon,
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
  const API_URL = "https://ruziganodejs.onrender.com";

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
      const response = await axios.post(`${API_URL}/assistance`, {
        ...assistanceData
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

      <div className="min-h-[70vh] flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center w-full">
          {/* Animated background elements */}
          <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 -left-4 sm:-left-6 md:-left-8 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-2xl sm:blur-3xl opacity-50"></div>
            <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 -right-4 sm:-right-6 md:-right-8 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-red-200 to-pink-200 dark:from-red-900/20 dark:to-pink-900/20 rounded-full blur-2xl sm:blur-3xl opacity-50"></div>

            <div className="relative">
              <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                404
              </h1>
              <div className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-lg sm:blur-xl opacity-30 animate-ping"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center text-4xl xs:text-5xl sm:text-6xl shadow-xl sm:shadow-2xl">
                  🚫
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-red-400 px-2">
            Page Not Found
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-400 mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto px-3">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>

          {/* Error details */}
          <div className="mb-8 sm:mb-10 md:mb-12 max-w-md mx-auto px-3">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg text-left">
              <div className="flex items-center mb-2">
                <ErrorIcon className="text-red-500 mr-2 h-5 w-5" />
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Error Details:
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                URL:{" "}
                <span className="font-mono text-gray-800 dark:text-gray-300 text-xs sm:text-sm break-all">
                  {window.location.pathname}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                Status:{" "}
                <span className="font-semibold text-red-600 dark:text-red-400">
                  404 - Not Found
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-3">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Go Back Home</span>
            </motion.a>

            <motion.button
              onClick={() => setIsAssistanceModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              <HelpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Request Assistance</span>
            </motion.button>
          </div>

          {/* Helpful tips */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 px-3">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-gray-300">
              Helpful Tips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl">
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  Check the URL for typos
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl">
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  Use the search function
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-100 dark:border-green-800/30">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl">
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] overflow-y-auto flex items-start justify-center p-3 xs:p-4 sm:p-6 md:p-8"
            >
              {/* Modal Container - Now properly centered with overflow */}
              <div className="w-full flex items-center justify-center min-h-full">
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-200 dark:border-gray-700 my-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className={`${gradientPresets.info} p-4 sm:p-5 md:p-6 text-white`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm flex-shrink-0">
                          <HelpIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </div>
                        <div>
                          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                            Request Assistance
                          </h2>
                          <p className="opacity-90 text-xs sm:text-sm md:text-base mt-1">
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
                        className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-600 rounded-full transition-all disabled:opacity-50 flex-shrink-0 ml-2"
                        disabled={isLoading}
                      >
                        <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Success Message */}
                  {requestSent ? (
                    <div className="p-6 sm:p-8 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl">
                        ✓
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 dark:text-white">
                        Request Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                        Our admin team has received your request and will contact
                        you shortly.
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        You'll be redirected in a moment...
                      </p>
                    </div>
                  ) : (
                    /* Assistance Form */
                    <form
                      onSubmit={handleAssistanceSubmit}
                      className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto"
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center text-sm sm:text-base">
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
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                          placeholder="John Doe"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center text-sm sm:text-base">
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
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                          placeholder="your@email.com"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center text-sm sm:text-base">
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
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base appearance-none"
                          disabled={isLoading}
                        >
                          {issueTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold flex items-center text-sm sm:text-base">
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
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base resize-none"
                          rows="3"
                          placeholder="Please describe what you were trying to do and what went wrong..."
                          required
                          disabled={isLoading}
                        />
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Page URL:{" "}
                          <span className="font-mono text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-all">
                            {assistanceData.pageUrl}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="collectData"
                            className="mt-1 mr-2 flex-shrink-0"
                            required
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="collectData"
                            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
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
                        className={`w-full ${gradientPresets.info} text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base`}
                      >
                        {isLoading ? (
                          <>
                            <motion.span
                              variants={loadingVariants}
                              animate="animate"
                            >
                              <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.span>
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Send Request to Admin</span>
                            <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
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
        className="lg:hidden fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <HelpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </>
  );
};