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
} from "@mui/icons-material";

export const Testimonials = () => {
  // State management
  const [testimonials, setTestimonials] = useState([]); // Initialize as empty array
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const autoPlayRef = useRef(null);
  const slidesPerView = 2;

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      // Replace with your actual API endpoint
      const response = await axios.get(
        "https://ruziganodejs.onrender.com/testimonials"
      );

      console.log("API Response:", response.data); // Debug log

      // Handle different response formats
      let testimonialData = [];

      if (Array.isArray(response.data)) {
        testimonialData = response.data;
      } else if (response.data && Array.isArray(response.data.testimonials)) {
        testimonialData = response.data.testimonials;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        testimonialData = response.data.data;
      } else {
        // If no array found, use empty array
        console.warn("No testimonials array found in response");
      }

      setTestimonials(testimonialData);

      if (testimonialData.length > 0) {
        toast.success(`Loaded ${testimonialData.length} testimonials`);
      } else {
        toast.info("No testimonials found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load testimonials";
      setError(errorMsg);
      toast.error(errorMsg);

      // Use mock data as fallback
      const mockTestimonials = [
        {
          id: 1,
          name: "John Doe",
          country: "Rwanda",
          university: "University of Rwanda",
          rating: 4.5,
          content:
            "Great service! RECAPPLY helped me get admission to my dream university in China.",
          duration: "4 years",
          program: "Computer Science",
          verified: true,
          date: "2024-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          country: "Kenya",
          university: "Beijing University",
          rating: 5.0,
          content:
            "Excellent guidance throughout the application process. Highly recommended!",
          duration: "3 years",
          program: "Business Administration",
          verified: true,
          date: "2024-02-20",
        },
        {
          id: 3,
          name: "David Johnson",
          country: "Uganda",
          university: "Tsinghua University",
          rating: 4.0,
          content:
            "Professional service with great support for scholarship applications.",
          duration: "2 years",
          program: "Engineering",
          verified: false,
          date: "2024-03-10",
        },
      ];

      setTestimonials(mockTestimonials);
      toast.info("Using sample testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (autoPlay && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        const totalSlides = Math.ceil(testimonials.length / slidesPerView);
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, testimonials.length]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const validRating = typeof rating === "number" ? rating : 0;
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

  // Get current visible testimonials - FIXED with safe array check
  const getVisibleTestimonials = () => {
    // Always ensure testimonials is an array
    const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];

    if (safeTestimonials.length === 0) {
      return [];
    }

    const startIndex = currentSlide * slidesPerView;
    const endIndex = startIndex + slidesPerView;

    return safeTestimonials.slice(startIndex, endIndex);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get testimonials for display
  const visibleTestimonials = getVisibleTestimonials();

  // If no testimonials after loading
  if (!loading && testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No testimonials available yet.</p>
        <button
          onClick={fetchTestimonials}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  // Error state
  if (error && testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-blue-800 to-indigo-500 text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Student Testimonials
        </h1>
        <p className="text-gray-100 text-lg">
         Read verified success stories of students who secured scholarships <br /> to 37 countries through REC Apply's expert guidance. 92% success rate. <br /> Free assessment available.
        </p>
      </div>

      {/* Testimonials Slider - Only show if we have testimonials */}
      {testimonials.length > 0 && (
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id || testimonial._id || Math.random()}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleSelectTestimonial(testimonial)}
              >
                {/* Student Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name }
                      className="w-16 h-16 rounded-full object-cover bg-gray-200"
                  
                    />
                    {testimonial.verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {testimonial.name || "Anonymous Student"}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <LocationOn className="w-4 h-4" />
                      <span>{testimonial.country || "Not specified"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <School className="w-4 h-4" />
                      <span>{testimonial.university || "Not specified"}</span>
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
                </div>

                {/* Testimonial Excerpt */}
                <div className="relative mb-4">
                  <FormatQuote className="absolute -top-2 -left-2 text-gray-200 w-8 h-8" />
                  <p className="text-gray-600 line-clamp-3 pl-2">
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
                    <span>
                      {testimonial.duration ||
                        testimonial.programDuration ||
                        "Not specified"}
                    </span>
                  </div>
                  <span>•</span>
                  <span className="font-medium">
                    {testimonial.program ||
                      testimonial.course ||
                      "Not specified"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gradient-to-br from-red-800 to-red-500 rounded-full"
              >
                <Close />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Student Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={selectedTestimonial.image || "/default-avatar.png"}
                    alt={selectedTestimonial.name || "Student"}
                    className="w-20 h-20 rounded-full object-cover bg-gray-200"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  {selectedTestimonial.verified && (
                    <CheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedTestimonial.name || "Anonymous Student"}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <LocationOn className="w-5 h-5" />
                    <span>
                      {selectedTestimonial.country || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {renderStars(selectedTestimonial.rating || 0)}
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {(selectedTestimonial.rating || 0).toFixed(1)}/5.0
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Reviewed on{" "}
                  {selectedTestimonial.date ||
                    selectedTestimonial.createdAt ||
                    "Unknown date"}
                </p>
              </div>

              {/* Program Details */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-800 mb-2">
                  Program Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">University</p>
                    <p className="font-medium">
                      {selectedTestimonial.university || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Program</p>
                    <p className="font-medium">
                      {selectedTestimonial.program ||
                        selectedTestimonial.course ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">
                      {selectedTestimonial.duration ||
                        selectedTestimonial.programDuration ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">
                      {selectedTestimonial.verified
                        ? "Verified Student"
                        : "Student"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Testimonial */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Full Experience
                </h4>
                <div className="relative">
                  <FormatQuote className="absolute -top-4 -left-4 text-gray-200 w-10 h-10" />
                  <p className="text-gray-700 leading-relaxed pl-4">
                    {selectedTestimonial.content ||
                      selectedTestimonial.testimonial ||
                      selectedTestimonial.message ||
                      "No testimonial content available."}
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
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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
