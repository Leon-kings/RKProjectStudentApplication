import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  FormatQuote
} from '@mui/icons-material';

export const Testimonials = () => {
  // State management
  const [testimonials, setTestimonials] = useState([]);
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
      const response = await axios.get('https://your-api.com/testimonials');
      
      if (response.data) {
        setTestimonials(response.data);
        toast.success('Testimonials loaded successfully!');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load testimonials';
      setError(errorMsg);
      toast.error(errorMsg);
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
        setCurrentSlide((prev) => 
          prev === Math.ceil(testimonials.length / slidesPerView) - 1 ? 0 : prev + 1
        );
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, testimonials.length]);

  // Navigation functions
  const nextSlide = () => {
    const totalSlides = Math.ceil(testimonials.length / slidesPerView);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const totalSlides = Math.ceil(testimonials.length / slidesPerView);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
    toast.info(`Auto-play ${!autoPlay ? 'enabled' : 'disabled'}`);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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
    const startIndex = currentSlide * slidesPerView;
    return testimonials.slice(startIndex, startIndex + slidesPerView);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
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
    <div className="py-12 bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Student Testimonials
        </h1>
        <p className="text-gray-600 text-lg">
          Real experiences from our students
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={toggleAutoPlay}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          {autoPlay ? <Pause /> : <PlayArrow />}
          <span>Auto-play {autoPlay ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Testimonials Slider */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ArrowBackIos />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ArrowForwardIos />
        </button>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getVisibleTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleSelectTestimonial(testimonial)}
            >
              {/* Student Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={testimonial.image || '/default-avatar.png'}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {testimonial.verified && (
                    <CheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <LocationOn className="w-4 h-4" />
                    <span>{testimonial.country}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <School className="w-4 h-4" />
                    <span>{testimonial.university}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="font-semibold text-gray-700">
                  {testimonial.rating.toFixed(1)}
                </span>
              </div>

              {/* Testimonial Excerpt */}
              <div className="relative mb-4">
                <FormatQuote className="absolute -top-2 -left-2 text-gray-200 w-8 h-8" />
                <p className="text-gray-600 line-clamp-3 pl-2">
                  {testimonial.content}
                </p>
              </div>

              {/* Program Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarToday className="w-4 h-4" />
                  <span>{testimonial.duration}</span>
                </div>
                <span>•</span>
                <span className="font-medium">{testimonial.program}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / slidesPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

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
                className="p-2 hover:bg-gray-100 rounded-full"
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
                    src={selectedTestimonial.image || '/default-avatar.png'}
                    alt={selectedTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {selectedTestimonial.verified && (
                    <CheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedTestimonial.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <LocationOn className="w-5 h-5" />
                    <span>{selectedTestimonial.country}</span>
                  </div>
                </div>
              </div>

              {/* Full Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {selectedTestimonial.rating.toFixed(1)}/5.0
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Reviewed on {selectedTestimonial.date}
                </p>
              </div>

              {/* Program Details */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Program Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">University</p>
                    <p className="font-medium">{selectedTestimonial.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Program</p>
                    <p className="font-medium">{selectedTestimonial.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{selectedTestimonial.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">
                      {selectedTestimonial.verified ? 'Verified Student' : 'Student'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Testimonial */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Full Experience</h4>
                <div className="relative">
                  <FormatQuote className="absolute -top-4 -left-4 text-gray-200 w-10 h-10" />
                  <p className="text-gray-700 leading-relaxed pl-4">
                    {selectedTestimonial.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  toast.info('Testimonial closed');
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

