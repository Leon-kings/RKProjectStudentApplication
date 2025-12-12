/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Material Icons
import {
  FormatQuote as QuoteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  ArrowBackIos as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Close as CloseIcon,
  CheckCircle as VerifiedIcon,
} from '@mui/icons-material';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const autoPlayRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === Math.ceil(testimonials.length / 2) - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change every 5 seconds

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isAutoPlaying, testimonials.length]);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        // Simulated data
        const mockData = Array.from({ length: 8 }, (_, index) => ({
          id: index + 1,
          name: ['Zhang Wei', 'Yuki Tanaka', 'Kim Min-ji', 'Ravi Patel', 'Maria Santos', 'Chen Li', 'Hiroshi Yamamoto', 'Ananya Sharma'][index % 8],
          country: ['China', 'Japan', 'South Korea', 'India', 'Philippines', 'China', 'Japan', 'India'][index % 8],
          university: ['Tsinghua University', 'University of Tokyo', 'Seoul National University', 'IIT Delhi', 'University of the Philippines', 'Peking University', 'Kyoto University', 'University of Mumbai'][index % 8],
          program: ['Computer Science', 'Mechanical Engineering', 'Business Administration', 'Electrical Engineering', 'Medicine', 'Economics', 'Robotics', 'Computer Science'][index % 8],
          rating: 4.5 + (index % 5) * 0.5,
          date: `202${index % 3 + 3}-0${index % 9 + 1}-${index % 28 + 1}`,
          duration: '2 years',
          content: `Studying in ${['China', 'Japan', 'South Korea', 'India', 'Philippines', 'China', 'Japan', 'India'][index % 8]} has been an incredible experience. The ${['faculty', 'culture', 'academics', 'technology', 'medical facilities', 'research opportunities', 'innovation', 'education system'][index % 8]} is world-class and the support for international students is exceptional. I highly recommend this program to anyone looking for quality education abroad.`,
          image: `https://images.unsplash.com/photo-${1500000000000 + index * 1000000}?auto=format&fit=crop&w=800&q=80`,
          verified: index % 3 === 0,
        }));

        setTestimonials(mockData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Calculate items per slide (2 testimonials per slide)
  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);
  const startIndex = currentIndex * itemsPerSlide;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsPerSlide);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="text-yellow-500 h-5 w-5" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="text-yellow-500 h-5 w-5" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} className="text-yellow-500 h-5 w-5" />);
    }

    return stars;
  };

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }) => {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setSelectedTestimonial(testimonial)}
      >
        {/* Card Header */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {testimonial.verified && (
                  <VerifiedIcon className="absolute -bottom-1 -right-1 h-6 w-6 text-green-500 bg-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{testimonial.name}</h3>
                <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-600">
                  <LocationIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{testimonial.country}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {renderStars(testimonial.rating)}
            <span className="ml-3 text-base font-semibold text-gray-700">
              {testimonial.rating.toFixed(1)}
            </span>
          </div>

          {/* Content Excerpt */}
          <div className="relative mb-6">
            <QuoteIcon className="absolute -top-3 -left-3 h-10 w-10 text-blue-100" />
            <p className="text-gray-600 text-base sm:text-lg line-clamp-4 pl-4">
              {testimonial.content}
            </p>
          </div>

          {/* University Info */}
          <div className="flex items-center space-x-4 text-sm sm:text-base text-gray-500">
            <div className="flex items-center">
              <SchoolIcon className="h-5 w-5 mr-2" />
              <span>{testimonial.university}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{testimonial.duration}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Detail Modal
  const DetailModal = () => {
    if (!selectedTestimonial) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div className="w-full flex items-center justify-center min-h-full">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl border border-gray-200 my-auto max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 overflow-hidden border-4 border-white/30">
                        <img 
                          src={selectedTestimonial.image} 
                          alt={selectedTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedTestimonial.verified && (
                        <VerifiedIcon className="absolute -bottom-1 -right-1 h-7 w-7 text-green-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedTestimonial.name}
                      </h2>
                      <div className="flex items-center space-x-3 text-base">
                        <div className="flex items-center space-x-1">
                          <LocationIcon className="h-5 w-5" />
                          <span>{selectedTestimonial.country}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SchoolIcon className="h-5 w-5" />
                          <span>{selectedTestimonial.university}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                  <span className="text-xl font-bold text-gray-700">
                    {selectedTestimonial.rating.toFixed(1)}/5.0
                  </span>
                </div>

                {/* Program Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Program Details
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Program:</span> {selectedTestimonial.program}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <span className="font-medium">Duration:</span> {selectedTestimonial.duration}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <span className="font-medium">Date:</span> {selectedTestimonial.date}
                  </p>
                </div>

                {/* Full Content */}
                <div>
                  <div className="relative">
                    <QuoteIcon className="absolute -top-4 -left-4 h-12 w-12 text-blue-100" />
                    <p className="text-gray-700 text-lg leading-relaxed pl-6">
                      {selectedTestimonial.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Testimonials
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Hear directly from students who have studied in Asia
          </p>
        </div>

        {/* Testimonials Slider - 2 Columns */}
        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <motion.div
                key={currentIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              >
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                  />
                ))}
              </motion.div>

      
                

            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-gray-500 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerSlide, testimonials.length)} of {testimonials.length} testimonials
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal />
    </section>
  );
};