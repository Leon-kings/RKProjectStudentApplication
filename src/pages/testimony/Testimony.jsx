/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI Icons
import {
  Star,
  StarBorder,
  StarHalf,
  LocationOn,
  School,
  CalendarToday,
  ArrowBackIos,
  ArrowForwardIos,
  PlayArrow,
  Pause,
  Close,
  CheckCircle,
  FormatQuote,
  Email,
  VerifiedUser,
  Refresh,
  Warning,
  PendingActions,
  Block,
} from "@mui/icons-material";

export const Testimonials = () => {
  // State management
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  const autoPlayRef = useRef(null);
  const slidesPerView = 2;

  // API Base URL
  const API_URL = "https://ruziganodejs.onrender.com";

  // Fetch ALL testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      // console.log("🔍 Fetching ALL testimonials from API...");

      const response = await axios.get(`${API_URL}/testimonials`);

      // console.log("📥 API Response:", response.data);

      let testimonialData = [];

      // Handle different response formats
      if (response.data && response.data.success) {
        if (Array.isArray(response.data.data)) {
          testimonialData = response.data.data;
          console.log(`✅ Received ${testimonialData.length} testimonials`);

          // Log all statuses for debugging
          const statusCount = {};
          testimonialData.forEach((item) => {
            const status = item.status || "unknown";
            statusCount[status] = (statusCount[status] || 0) + 1;
          });
          // console.log("📊 Status distribution:", statusCount);
        } else {
          console.warn(
            "Response data.data is not an array:",
            response.data.data
          );
          toast.error("Invalid data format received from server");
        }
      } else if (Array.isArray(response.data)) {
        testimonialData = response.data;
      } else {
        console.warn("Unexpected API response format:", response.data);
        toast.warning("Unexpected data format from server");
      }

      setTestimonials(testimonialData);
      setFilteredTestimonials(testimonialData);

      if (testimonialData.length > 0) {
        toast.success(`Loaded ${testimonialData.length} testimonials`);
        // console.log("📊 First testimonial:", testimonialData[0]);
      } else {
        console.log("📭 No testimonials found in database");
        toast.info("No testimonials available yet");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      console.error("📡 Error details:", err.response?.data);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load testimonials";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    if (testimonials.length === 0) return;

    let filtered = [...testimonials];

    switch (filter) {
      case "approved":
        filtered = filtered.filter((item) => item.status === "approved");
        break;
      case "pending":
        filtered = filtered.filter((item) => item.status === "pending");
        break;
      case "rejected":
        filtered = filtered.filter((item) => item.status === "rejected");
        break;
      case "verified":
        filtered = filtered.filter((item) => item.verified === true);
        break;
      case "all":
      default:
        // Show ALL testimonials
        break;
    }

    setFilteredTestimonials(filtered);
    setCurrentSlide(0); // Reset to first slide when filter changes
  }, [filter, testimonials]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (autoPlay && filteredTestimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        const totalSlides = Math.ceil(
          filteredTestimonials.length / slidesPerView
        );
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, filteredTestimonials.length]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const validRating =
      typeof rating === "number" ? rating : parseFloat(rating) || 0;
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-500" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-yellow-500" />);
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorder key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  // Handle testimonial selection
  const handleSelectTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  // Get current visible testimonials
  const getVisibleTestimonials = () => {
    if (
      !Array.isArray(filteredTestimonials) ||
      filteredTestimonials.length === 0
    ) {
      return [];
    }

    const startIndex = currentSlide * slidesPerView;
    const endIndex = startIndex + slidesPerView;

    return filteredTestimonials.slice(startIndex, endIndex);
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const badges = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-12 bg-gradient-to-br from-blue-800 to-indigo-500">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Student Testimonials
          </h1>
          <p className="text-gray-100 text-lg">Loading testimonials...</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Get visible testimonials
  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="py-12 bg-gradient-to-br from-blue-800 to-indigo-500 text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Student Testimonials
        </h1>
        <p className="text-gray-100 text-lg">
          Read success stories of students who secured scholarships <br />
          to 37 countries through REC Apply's expert guidance. 92% success rate.{" "}
          <br />
          Free assessment available.
        </p>

        {/* Stats */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold">{testimonials.length}</div>
            <div className="text-gray-200">Total Testimonials</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">92%</div>
            <div className="text-gray-200">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">37</div>
            <div className="text-gray-200">Countries</div>
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="text-center mb-4 text-sm">
        <span className="bg-white/20 px-3 py-1 rounded">
          Showing {filteredTestimonials.length} testimonials
          {filter !== "all" && ` (${filter} only)`}
        </span>
      </div>

      {/* Testimonials Slider */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Testimonials Grid */}
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial._id || testimonial.id || Math.random()}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleSelectTestimonial(testimonial)}
              >
                {/* Student Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={
                        testimonial.image?.url ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      }
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                      }}
                    />
                    {testimonial.verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {testimonial.name || "Anonymous Student"}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-600">
                          <LocationOn className="w-4 h-4" />
                          <span>{testimonial.country || "Not specified"}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          testimonial.status
                        )}`}
                      >
                        {testimonial.status || "unknown"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                      <School className="w-4 h-4" />
                      <span className="font-medium">
                        {testimonial.university || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {renderStars(testimonial.rating || 0)}
                  </div>
                  <span className="font-semibold text-gray-700">
                    {(testimonial.rating || 0).toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm">/5.0</span>
                </div>

                {/* Testimonial Excerpt */}
                <div className="relative mb-4">
                  <FormatQuote className="absolute -top-2 -left-2 text-gray-200 w-8 h-8" />
                  <p className="text-gray-600 line-clamp-3 pl-4">
                    {testimonial.content ||
                      testimonial.testimonial ||
                      testimonial.message ||
                      "No testimonial content available."}
                  </p>
                </div>

                {/* Program Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarToday className="w-4 h-4" />
                    <span>{testimonial.duration || "Not specified"}</span>
                  </div>
                  <span>•</span>
                  <span className="font-medium text-blue-600">
                    {testimonial.program || "Not specified"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <div className="text-white/50 mb-4">
              <FormatQuote className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No testimonials found
            </h3>
            <p className="text-gray-200 mb-4">
              {testimonials.length > 0 ? (
                <>
                  No testimonials match the "{filter}" filter
                  <br />
                  <button
                    onClick={() => setFilter("all")}
                    className="mt-2 px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100"
                  >
                    Show All Testimonials
                  </button>
                </>
              ) : (
                "No testimonials in the database yet"
              )}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full transition-colors"
              >
                <Close className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Student Profile */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="relative">
                  <img
                    src={selectedTestimonial.image?.url}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                    }}
                  />
                  {selectedTestimonial.verified && (
                    <CheckCircle className="absolute -bottom-2 -right-2 text-green-500 bg-white rounded-full p-1 shadow" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedTestimonial.name || "Anonymous Student"}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        selectedTestimonial.status
                      )}`}
                    >
                      {selectedTestimonial.status || "unknown"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <LocationOn className="w-5 h-5" />
                      <span>
                        {selectedTestimonial.country || "Not specified"}
                      </span>
                    </div>
                    {selectedTestimonial.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Email className="w-5 h-5" />
                        <span>{selectedTestimonial.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Rating */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {renderStars(selectedTestimonial.rating || 0)}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    {(selectedTestimonial.rating || 0).toFixed(1)}/5.0
                  </span>
                </div>
                {selectedTestimonial.createdAt && (
                  <p className="text-gray-500 text-sm">
                    Submitted on{" "}
                    {new Date(selectedTestimonial.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>

              {/* Program Details */}
              <div className="bg-blue-50 rounded-xl p-5 mb-8">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">
                  Academic Journey
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">University</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <School className="w-4 h-4" />
                      {selectedTestimonial.university || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Program</p>
                    <p className="font-medium text-gray-800">
                      {selectedTestimonial.program || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <CalendarToday className="w-4 h-4" />
                      {selectedTestimonial.duration || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Verification</p>
                    <p className="font-medium text-gray-800">
                      {selectedTestimonial.verified
                        ? "✓ Verified Student"
                        : "Not Verified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Testimonial */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 text-lg">
                  Full Experience
                </h4>
                <div className="relative bg-gray-50 rounded-xl p-6">
                  <FormatQuote className="absolute -top-4 -left-4 text-gray-200 w-12 h-12" />
                  <FormatQuote className="absolute -bottom-4 -right-4 text-gray-200 w-12 h-12 transform rotate-180" />
                  <p className="text-gray-700 leading-relaxed text-lg pl-4">
                    "
                    {selectedTestimonial.content ||
                      selectedTestimonial.testimonial ||
                      selectedTestimonial.message ||
                      "No testimonial content available."}
                    "
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  toast.info("Testimonial closed");
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
