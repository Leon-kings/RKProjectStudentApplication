/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import HotelIcon from "@mui/icons-material/Hotel";
import ComputerIcon from "@mui/icons-material/Computer";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import FlightIcon from "@mui/icons-material/Flight";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TranslateIcon from "@mui/icons-material/Translate";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import FlagIcon from "@mui/icons-material/Flag";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { RocketLaunch, Person, Work, AttachMoney } from "@mui/icons-material";

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Axios interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data.message || "Bad request. Please check your input.");
          break;
        case 401:
          toast.error("Session expired. Please refresh the page.");
          break;
        case 403:
          toast.error("You don't have permission to perform this action.");
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 422:
          toast.error("Validation error. Please check your input.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(data.message || "An error occurred. Please try again.");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

// Modal Components
const SuccessModal = React.memo(
  ({
    showSuccessModal,
    setShowSuccessModal,
    selectedService,
    handleCloseModal,
    retryPendingSubmissions,
  }) => {
    if (!showSuccessModal) return null;

    const pendingSubmissions = JSON.parse(
      localStorage.getItem("pendingSubmissions") || "[]"
    );
    const hasPendingSubmissions = pendingSubmissions.length > 0;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Booking Successful!
              </h3>

              <p className="text-gray-600 mb-6">
                Thank you for booking {selectedService?.title}. Our RECAPPLY team will contact you within 24 hours.
              </p>

              {hasPendingSubmissions && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AccessTimeIcon className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">
                      {pendingSubmissions.length} pending submission
                      {pendingSubmissions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Some submissions are waiting to sync with the server.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowSuccessModal(false);
                    handleCloseModal(e);
                  }}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                >
                  Close & Continue Browsing
                </button>

                {hasPendingSubmissions && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const result = await retryPendingSubmissions();
                      if (result.successfulRetries.length > 0) {
                        toast.success(
                          `Synced ${result.successfulRetries.length} pending submission(s)`
                        );
                      }
                      setShowSuccessModal(false);
                    }}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Try Syncing Pending Submissions
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

const ErrorModal = React.memo(
  ({ showErrorModal, setShowErrorModal, contactInfo }) => {
    if (!showErrorModal) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
          onClick={() => setShowErrorModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <CloseIcon className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Submission Failed
              </h3>
              <p className="text-gray-600 mb-6">
                We encountered an issue processing your booking. Please try
                again or contact our support team directly.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowErrorModal(false);
                  }}
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                >
                  Try Again
                </button>
                <a
                  href={`tel:${contactInfo.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Call Support
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

const BookingModal = React.memo(
  ({
    selectedService,
    bookingStep,
    formData,
    isSubmitting,
    formKey,
    handleInputChange,
    handleBookingSubmit,
    handleCloseModal,
    serviceCategories,
    contactInfo,
    setBookingStep,
  }) => {
    if (!selectedService) return null;

    const Icon = selectedService.icon;
    const category =
      selectedService.categoryObj ||
      serviceCategories.find((cat) => cat.id === selectedService.category);

    if (!category) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {selectedService.title}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                        {category.name}
                      </span>
                      {selectedService.processingTime && (
                        <span className="flex items-center text-sm text-gray-600">
                          <AccessTimeIcon className="h-4 w-4 mr-1" />
                          {selectedService.processingTime}
                        </span>
                      )}
                      {selectedService.successRate && (
                        <span className="flex items-center text-sm text-green-600 font-semibold">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          {selectedService.successRate} Success Rate
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleCloseModal(e);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <CloseIcon className="h-7 w-7 text-gray-500" />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Panel - Service Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Service Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedService.details}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Complete Features
                    </h3>
                    <div className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {selectedService.countries && (
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Available Countries
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedService.countries.map((country, index) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {country}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Right Panel - Booking Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-2">
                      Book Service: {selectedService.title}
                    </h3>
                    <p className="text-gray-300">
                      Complete the form below and our RECAPPLY team will contact
                      you within 24 hours
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    key={formKey}
                    onSubmit={handleBookingSubmit}
                    className="space-y-4"
                    id="booking-form"
                  >
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-6">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              bookingStep >= step
                                ? `bg-gradient-to-r ${category.color} text-white`
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {step}
                          </div>
                          {step < 3 && (
                            <div
                              className={`h-1 w-20 ${
                                bookingStep > step
                                  ? `bg-gradient-to-r ${category.color}`
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {bookingStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <Person className="h-4 w-4 mr-2 text-gray-500" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <EmailIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                            placeholder="+250 XXX XXX XXX"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setBookingStep(2);
                          }}
                          className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300 mt-6`}
                        >
                          Continue
                          <ArrowForwardIcon className="ml-2 h-5 w-5 inline" />
                        </button>
                      </motion.div>
                    )}

                    {bookingStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FlagIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Target Country *
                          </label>
                          <select
                            name="targetCountry"
                            value={formData.targetCountry || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                          >
                            <option value="">Select a country</option>
                            <option value="China">China (CSCA Required)</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="USA">USA</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Poland">Poland</option>
                            <option value="Turkey">Turkey</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <Work className="h-4 w-4 mr-2 text-gray-500" />
                            Interested Program *
                          </label>
                          <input
                            type="text"
                            name="program"
                            value={formData.program || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                            placeholder="e.g., Computer Science, Medicine, Engineering"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <CalendarTodayIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Preferred Start Date *
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate || ""}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setBookingStep(1);
                            }}
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setBookingStep(3);
                            }}
                            className={`flex-1 py-3 px-6 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300`}
                          >
                            Continue
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <SchoolIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Academic Background
                          </label>
                          <select
                            name="educationLevel"
                            value={formData.educationLevel || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200"
                          >
                            <option value="">
                              Select highest qualification
                            </option>
                            <option value="highschool">High School</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="phd">PhD</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <DescriptionIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Additional Requirements
                          </label>
                          <textarea
                            name="requirements"
                            value={formData.requirements || ""}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 resize-none"
                            placeholder="Please specify any special requirements, scholarship needs, or additional services required..."
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setBookingStep(2);
                            }}
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3 px-6 rounded-xl bg-gradient-to-r ${
                              category.color
                            } text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                              isSubmitting
                                ? "opacity-75 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 mr-2 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <AssignmentTurnedInIcon className="mr-2 h-5 w-5" />
                                Submit Booking
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        <div>
                          <div>Rwanda: {contactInfo.phone}</div>
                          <div className="text-xs text-gray-500">
                            China: {contactInfo.chinaPhone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <EmailIcon className="h-4 w-4 mr-2" />
                        <span>{contactInfo.email}</span>
                      </div>
                      <div className="flex items-center">
                        <AccessTimeIcon className="h-4 w-4 mr-2" />
                        <span className="text-xs">24/7 Support Available</span>
                      </div>
                      <div className="flex items-center">
                        <LocationOnIcon className="h-4 w-4 mr-2" />
                        <span className="text-xs">Kigali, Rwanda</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formKey, setFormKey] = useState(Date.now());
  const servicesPerPage = 6;

  // Form data ref
  const formDataRef = useRef({
    fullName: "",
    email: "",
    phone: "",
    targetCountry: "",
    program: "",
    startDate: "",
    educationLevel: "",
    budget: "",
    requirements: "",
  });

  // Initialize formData from ref
  const [formData, setFormData] = useState(() => formDataRef.current);

  useEffect(() => {
    // Check for pending submissions every 30 seconds
    const interval = setInterval(checkForPendingSubmissions, 30000);
    return () => clearInterval(interval);
  }, []);

  // Save to local storage
  const saveToLocalStorage = (data) => {
    try {
      const pendingSubmissions = JSON.parse(
        localStorage.getItem("pendingSubmissions") || "[]"
      );
      pendingSubmissions.push({
        ...data,
        timestamp: new Date().toISOString(),
        retryCount: 0,
        lastRetry: null,
      });
      localStorage.setItem(
        "pendingSubmissions",
        JSON.stringify(pendingSubmissions)
      );
      console.log("Saved to local storage");
      return true;
    } catch (error) {
      console.error("Error saving to local storage:", error);
      return false;
    }
  };

  // Check for pending submissions
  const checkForPendingSubmissions = async () => {
    try {
      const pendingSubmissions = JSON.parse(
        localStorage.getItem("pendingSubmissions") || "[]"
      );
      if (pendingSubmissions.length > 0) {
        await retryPendingSubmissions();
      }
    } catch (error) {
      console.error("Error checking pending submissions:", error);
    }
  };

  // Retry pending submissions
  const retryPendingSubmissions = async () => {
    try {
      const pendingSubmissions = JSON.parse(
        localStorage.getItem("pendingSubmissions") || "[]"
      );

      if (pendingSubmissions.length === 0)
        return { successfulRetries: [], failedRetries: [] };

      const successfulRetries = [];
      const failedRetries = [];

      for (const submission of pendingSubmissions) {
        try {
          // Check if we should retry
          const shouldRetry =
            submission.retryCount < 3 &&
            (!submission.lastRetry ||
              Date.now() - new Date(submission.lastRetry).getTime() > 3600000);

          if (shouldRetry) {
            const response = await api.post(
              "/main/services",
              submission.customer
            );

            if (response.data.success) {
              successfulRetries.push(submission);
            }
          }
        } catch (error) {
          console.error("Failed to retry submission:", error);
          failedRetries.push(submission);
        }
      }

      // Update local storage
      if (successfulRetries.length > 0) {
        const updatedPending = pendingSubmissions.filter(
          (sub) => !successfulRetries.includes(sub)
        );
        localStorage.setItem(
          "pendingSubmissions",
          JSON.stringify(updatedPending)
        );
      }

      return { successfulRetries, failedRetries };
    } catch (error) {
      console.error("Error retrying pending submissions:", error);
      return { successfulRetries: [], failedRetries: [] };
    }
  };

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      formDataRef.current = newData;
      return newData;
    });
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    const emptyForm = {
      fullName: "",
      email: "",
      phone: "",
      targetCountry: "",
      program: "",
      startDate: "",
      educationLevel: "",
      budget: "",
      requirements: "",
    };

    setFormData(emptyForm);
    formDataRef.current = emptyForm;
    setBookingStep(1);
    setCurrentPage(1);
    setFormKey(Date.now());
  }, []);

  // Handle service select
  const handleServiceSelect = useCallback((service, category, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    setBookingStep(1);

    setSelectedService({
      ...service,
      category: category.id,
      categoryObj: category,
    });
  }, []);

  // Handle close modal
  const handleCloseModal = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    setSelectedService(null);
    setBookingStep(1);
  }, []);

  // RECAPPLY Information
  const recapplyInfo = useMemo(
    () => ({
      title: "RECAPPLY SERVICES",
      description:
        "Comprehensive international education services from application to arrival and beyond",
      mission: "to guide every student confidently from application to arrival",
      focusCountries: [
        {
          name: "China",
          flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaD9OMaQnNRIknoxXl2VbvUXoCeoaY_vJGw&s",
          description: "CSCA Specialization",
        },
        {
          name: "Canada",
          flag: "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Canada_%28leaf%29.svg",
          description: "Top Destination",
        },
        {
          name: "Germany",
          flag: "https://www.rjtravelagency.com/wp-content/uploads/2024/06/Germany-Flag.jpg",
          description: "Tuition-Free Options",
        },
        {
          name: "USA",
          flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png",
          description: "Scholarship Opportunities",
        },
        {
          name: "Poland",
          flag: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/330px-Flag_of_Poland.svg.png",
          description: "European Education",
        },
        {
          name: "Turkey",
          flag: "https://flagemoji.com/wp-content/uploads/2020/02/Flag_of_Turkey.svg",
          description: "Quality & Affordable",
        },
      ],
    }),
    []
  );

  // Service Categories
  const serviceCategories = useMemo(
    () => [
      {
        id: "admissions",
        name: "Admissions Services",
        description: "Complete university application and admission support",
        icon: SchoolIcon,
        color: "from-blue-600 to-cyan-600",
        services: [
          {
            id: 1,
            title: "University Admissions",
            icon: SchoolIcon,
            description:
              "End-to-end university application support for global universities",
            details:
              "We guide you through selecting the right university, preparing application documents, and securing admission letters from prestigious institutions worldwide with special expertise in China admissions and CSCA requirements.",
            features: [
              "University selection & career counseling",
              "Academic profile assessment",
              "Application documentation support",
              "CSCA exam preparation guidance (for China)",
              "Admission letter processing",
              "Scholarship matching and applications",
              "Document verification and authentication",
              "Interview preparation sessions",
              "Follow-up with admission offices",
              "Multiple university applications",
            ],
            countries: [
              "China (CSCA Specialization)",
              "Canada",
              "Germany",
              "USA",
              "Poland",
              "Turkey",
              "UK",
              "Australia",
              "Malaysia",
              "Singapore",
            ],
            processingTime: "2-8 weeks",
            successRate: "98%",
            specialNote: "Free initial consultation and profile assessment",
          },
          {
            id: 2,
            title: "CSCA Exam Preparation",
            icon: BookIcon,
            description:
              "Specialized China Scholastic Competency Assessment preparation",
            details:
              "Complete support for students applying to Chinese universities requiring the CSCA exam. Our comprehensive preparation program includes study materials, mock tests, and expert guidance.",
            features: [
              "CSCA registration guidance",
              "Subject selection assistance (Math, Physics, Chemistry)",
              "Comprehensive study materials",
              "Weekly mock tests and assessments",
              "Chinese language preparation",
              "Exam strategy and time management",
              "Progress tracking and feedback",
              "Scholarship documentation support",
              "University-specific preparation",
              "24/7 tutor support",
            ],
            subjects: [
              "Mathematics",
              "Physics",
              "Chemistry",
              "Chinese Language",
            ],
            successRate: "95%",
            specialNote: "Includes access to exclusive study materials",
          },
          {
            id: 3,
            title: "Document Preparation",
            icon: AssignmentIcon,
            description:
              "Professional academic document preparation and translation",
            details:
              "High-quality document preparation including SOP, Study Plan, CV, Motivation Letter, and all required visa documents with certified translation services.",
            features: [
              "Statement of Purpose writing",
              "Study Plan development",
              "CV/Resume optimization",
              "Motivation Letter preparation",
              "Reference letter writing",
              "Academic transcript translation",
              "Diploma and certificate translation",
              "Notarization and certification",
              "University-specific formatting",
              "Unlimited revisions",
            ],
            processingTime: "5-10 business days",
            languages: ["English", "Chinese", "French", "German", "Spanish"],
            specialNote: "Certified translation services available",
          },
        ],
      },
      {
        id: "scholarship",
        name: "Scholarship Services",
        description:
          "Maximize your scholarship and financial aid opportunities",
        icon: EmojiEventsIcon,
        color: "from-purple-600 to-pink-600",
        services: [
          {
            id: 4,
            title: "Scholarship Guidance",
            icon: EmojiEventsIcon,
            description:
              "Comprehensive scholarship search and application support",
            details:
              "Expert guidance in identifying and securing scholarship opportunities including fully funded scholarships, partial scholarships, tuition waivers, and government subsidies.",
            features: [
              "Scholarship database access (1000+ programs)",
              "Eligibility assessment",
              "Application strategy development",
              "Essay and personal statement review",
              "Financial documentation support",
              "Interview preparation",
              "Multiple scholarship applications",
              "Post-application follow-up",
              "Financial planning assistance",
              "Success rate tracking",
            ],
            scholarshipTypes: [
              "Fully Funded Scholarships",
              "Partial Scholarships",
              "Tuition Waivers",
              "Government Subsidies",
              "University Scholarships",
              "Private Scholarships",
            ],
            successRate: "85%",
            specialNote: "Free scholarship matching service",
          },
          {
            id: 5,
            title: "Financial Aid Support",
            icon: PaymentIcon,
            description:
              "Complete financial planning and aid application support",
            details:
              "Assistance with financial documentation, bank statements, sponsor letters, and all financial requirements for university and visa applications.",
            features: [
              "Financial requirement analysis",
              "Bank statement preparation",
              "Sponsor letter drafting",
              "Financial affidavit support",
              "Budget planning assistance",
              "Currency conversion guidance",
              "Bank verification support",
              "Financial guarantee letters",
              "Cost of living estimates",
              "Payment plan setup",
            ],
            processingTime: "3-7 business days",
            specialNote: "Includes financial planning consultation",
          },
          {
            id: 6,
            title: "Grant Writing",
            icon: DescriptionIcon,
            description: "Professional grant and proposal writing services",
            details:
              "Expert assistance with research grants, project proposals, and funding applications for postgraduate and research students.",
            features: [
              "Grant proposal writing",
              "Research project proposals",
              "Funding application support",
              "Budget justification preparation",
              "Impact statement writing",
              "Review and editing services",
              "Compliance checking",
              "Submission guidance",
              "Follow-up support",
              "Success tracking",
            ],
            successRate: "80%",
            specialNote: "Specialized for research students",
          },
        ],
      },
      {
        id: "visa",
        name: "Visa & Immigration",
        description: "Complete visa processing and immigration support",
        icon: VerifiedUserIcon,
        color: "from-green-600 to-emerald-600",
        services: [
          {
            id: 7,
            title: "Student Visa Processing",
            icon: FlagIcon,
            description: "End-to-end student visa application support",
            details:
              "Complete visa processing for study visas including document preparation, appointment booking, interview preparation, and follow-up for multiple countries.",
            features: [
              "Visa requirement assessment",
              "Document checklist preparation",
              "Application form assistance",
              "Appointment scheduling",
              "Interview preparation sessions",
              "Financial documentation support",
              "Health insurance guidance",
              "Application tracking",
              "Emergency processing",
              "Multi-entry visa assistance",
            ],
            countries: [
              "China (X1/X2 Visa)",
              "Canada (Study Permit)",
              "USA (F-1 Visa)",
              "Germany (Student Visa)",
              "UK (Student Route)",
              "Australia (Student Visa)",
            ],
            processingTime: "2-8 weeks",
            successRate: "98%",
            specialNote: "Includes mock interview sessions",
          },
          {
            id: 8,
            title: "Post-Study Visa Guidance",
            icon: ConnectWithoutContactIcon,
            description: "Work permit and post-study visa assistance",
            details:
              "Guidance on work permits, post-study work options, and immigration pathways after graduation in various countries.",
            features: [
              "Post-study work permit information",
              "Work visa application support",
              "Permanent residency pathways",
              "Job search assistance",
              "Employer sponsorship guidance",
              "Immigration consultation",
              "Document preparation",
              "Application timeline planning",
              "Compliance guidance",
              "Future planning",
            ],
            countries: ["Canada", "Germany", "Australia", "UK", "New Zealand"],
            specialNote: "Free initial immigration consultation",
          },
        ],
      },
      {
        id: "support",
        name: "Student Support",
        description: "Pre-departure and ongoing student support services",
        icon: SupportAgentIcon,
        color: "from-orange-600 to-red-600",
        services: [
          {
            id: 9,
            title: "Pre-Departure Orientation",
            icon: AirportShuttleIcon,
            description: "Complete preparation for international study",
            details:
              "Comprehensive orientation covering travel preparation, cultural adaptation, academic expectations, and essential logistics for studying abroad.",
            features: [
              "Travel preparation checklist",
              "Cultural adaptation training",
              "Academic expectation briefing",
              "Health and safety guidance",
              "Accommodation assistance",
              "Travel insurance setup",
              "Banking and finance setup",
              "Emergency contact setup",
              "Language preparation resources",
              "Country-specific orientation",
            ],
            orientationDuration: "3-5 hours",
            languages: ["English", "French", "Chinese", "German"],
            specialNote: "Includes digital orientation package",
          },
          {
            id: 10,
            title: "Accommodation Assistance",
            icon: ApartmentIcon,
            description: "University accommodation and housing support",
            details:
              "Assistance with finding and securing suitable accommodation including university dorms, shared apartments, and private housing options.",
            features: [
              "University dormitory booking",
              "Private apartment search",
              "Homestay arrangements",
              "Rental agreement review",
              "Deposit payment assistance",
              "Utility setup guidance",
              "Neighborhood orientation",
              "Safety assessment",
              "Roommate matching",
              "Move-in coordination",
            ],
            accommodationTypes: [
              "University Dorms",
              "Shared Apartments",
              "Private Studios",
              "Homestays",
              "Student Residences",
            ],
            specialNote: "Free accommodation search service",
          },
          {
            id: 11,
            title: "Airport & Travel Services",
            icon: FlightIcon,
            description: "Complete travel and arrival assistance",
            details:
              "24/7 airport pickup, transfer services, and travel arrangements to ensure smooth arrival and transition to your study destination.",
            features: [
              "24/7 airport pickup service",
              "English-speaking driver",
              "Accommodation transfer",
              "Welcome package (SIM card, maps)",
              "Local transportation orientation",
              "Flight booking assistance",
              "Travel insurance setup",
              "Luggage shipping assistance",
              "Emergency travel support",
              "Multi-city transfers",
            ],
            serviceHours: "24/7",
            vehicleTypes: ["Standard", "Premium", "Group", "VIP"],
            specialNote: "Includes welcome orientation",
          },
          {
            id: 12,
            title: "Ongoing Student Support",
            icon: GroupsIcon,
            description: "Continuous support throughout your studies",
            details:
              "24/7 support services including academic assistance, cultural adaptation, emergency support, and regular check-ins throughout your study period.",
            features: [
              "24/7 emergency support line",
              "Academic progress monitoring",
              "Cultural adaptation counseling",
              "Health and wellness support",
              "Legal assistance referral",
              "Financial guidance",
              "Career counseling",
              "Social integration events",
              "Alumni network access",
              "Regular progress reviews",
            ],
            supportHours: "24/7",
            languages: ["English", "Chinese", "French", "German", "Spanish"],
            specialNote: "Free first month of support",
          },
        ],
      },
    ],
    []
  );

  // Contact Information
  const contactInfo = useMemo(
    () => ({
      email: "services@recapply.com",
      phone: "+250 783 408 617",
      whatsapp: "+250783408617",
      chinaPhone: "+86 186 5833 2879",
      office: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
      workingHours:
        "Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 2:00 PM",
    }),
    []
  );

  // Get filtered services
  const filteredServices = useMemo(() => {
    const services = serviceCategories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .flatMap((cat) =>
        cat.services.map((service) => ({
          ...service,
          categoryObj: cat,
        }))
      );

    return services;
  }, [activeCategory, serviceCategories]);

  // Get paginated services
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  // Map education level to enum
  const mapEducationLevelToEnum = (level) => {
    const map = {
      highschool: "High School",
      bachelor: "Bachelor's Degree",
      master: "Master's Degree",
      phd: "PhD",
      "High School": "High School",
      "Bachelor's Degree": "Bachelor's Degree",
      "Master's Degree": "Master's Degree",
      PhD: "PhD",
    };
    return map[level] || level;
  };

  // Handle booking submission
  const handleBookingSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!selectedService) return;

      setIsSubmitting(true);

      try {
        // Prepare form data for API
        const formDataToSend = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          targetCountry: formData.targetCountry,
          program: formData.program.trim(),
          startDate: formData.startDate,
          educationLevel: mapEducationLevelToEnum(formData.educationLevel),
          requirements: formData.requirements?.trim() || "",
          serviceId: selectedService.id,
          serviceName: selectedService.title,
          serviceCategory: selectedService.category,
        };

        console.log("Submitting to API:", formDataToSend);

        try {
          const response = await api.post("/form", formDataToSend);

          if (response.data.success) {
            // Show success message
            toast.success(response.data.message || "Booking submitted successfully!");

            // Show success modal
            setShowSuccessModal(true);

            // Reset form
            resetForm();
          } else {
            throw new Error(response.data.message || "Submission failed");
          }
        } catch (apiError) {
          console.error("API submission failed:", apiError);
          // Save to local storage for later retry
          const savedLocally = saveToLocalStorage({
            customer: formDataToSend,
            service: {
              id: selectedService.id,
              title: selectedService.title,
            },
          });

          if (savedLocally) {
            // Show success message
            toast.success("Form saved locally. We'll sync with the server when connection is restored.");

            // Show success modal
            setShowSuccessModal(true);

            // Reset form
            resetForm();
          } else {
            throw new Error("Failed to save data locally");
          }
        }
      } catch (error) {
        console.error("Booking submission error:", error);

        // Show error modal
        setShowErrorModal(true);

        // Show error toast
        toast.error(
          <div>
            <p>Submission failed!</p>
            <p>Error: {error.message}</p>
            <p>Please try again or contact support.</p>
          </div>,
          { autoClose: 7000 }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedService, formData, resetForm]
  );

  // ServiceCard Component
  const ServiceCard = useCallback(
    ({ service, category }) => {
      const Icon = service.icon;
      const CategoryIcon = category.icon;

      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          onClick={(e) => handleServiceSelect(service, category, e)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${category.color} transform group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <CategoryIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-500">
                  {category.name}
                </span>
              </div>
            </div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
            >
              {service.title}
            </motion.h3>

            <p className="text-gray-600 mb-4">{service.description}</p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                Key Features:
              </h4>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.specialNote && (
              <p className="text-sm text-blue-600 mb-6">
                {service.specialNote}
              </p>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleServiceSelect(service, category, e);
              }}
              className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group/btn`}
            >
              <span>Book Service</span>
              <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      );
    },
    [handleServiceSelect]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 py-12 md:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-7xl mx-auto">
        {/* Header with RECAPPLY Branding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4 md:mb-6"
          >
            Premium International Education Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg xs:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Complete support package from application to arrival with special
            expertise in China CSCA preparation and global admissions
          </motion.p>

          {/* Focus Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <h3 className="text-lg font-bold text-green-700 mb-4">
              Our Specialized Countries:
            </h3>
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4">
              {recapplyInfo.focusCountries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={country.flag}
                    alt=''
                    className="h-8 w-8 rounded-2xl mr-2"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">
                      {country.name}
                    </div>
                    <div className="text-xs text-blue-600">
                      {country.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-12 md:mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <RocketLaunch className="h-6 w-6 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              {recapplyInfo.mission}
            </p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
            <button
              onClick={() => {
                setActiveCategory("all");
                setCurrentPage(1);
              }}
              className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-bold text-sm xs:text-base transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-300"
              }`}
            >
              All Services
            </button>
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-bold text-sm xs:text-base transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 xs:space-x-3 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <Icon className="h-4 w-4 xs:h-5 xs:w-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8 mb-12"
        >
          {paginatedServices.map((item) => (
            <ServiceCard
              key={`${item.id}-${item.categoryObj.id}`}
              service={item}
              category={item.categoryObj}
            />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center space-x-4"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-full font-bold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200"
              }`}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Page Info */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            Showing {(currentPage - 1) * servicesPerPage + 1} -{" "}
            {Math.min(currentPage * servicesPerPage, filteredServices.length)}{" "}
            of {filteredServices.length} services
          </p>
        </div>
      </div>

      {/* Modals - Now using the memoized components */}
      {selectedService && (
        <BookingModal
          selectedService={selectedService}
          bookingStep={bookingStep}
          formData={formData}
          isSubmitting={isSubmitting}
          formKey={formKey}
          handleInputChange={handleInputChange}
          handleBookingSubmit={handleBookingSubmit}
          handleCloseModal={handleCloseModal}
          serviceCategories={serviceCategories}
          contactInfo={contactInfo}
          setBookingStep={setBookingStep}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          selectedService={selectedService}
          handleCloseModal={handleCloseModal}
          retryPendingSubmissions={retryPendingSubmissions}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          contactInfo={contactInfo}
        />
      )}
    </div>
  );
};