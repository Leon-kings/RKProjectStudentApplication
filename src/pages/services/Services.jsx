/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookingStep, setBookingStep] = useState(1);

  const serviceCategories = [
    {
      id: "application",
      name: "Application Services",
      description: "Complete university application support across Asia",
      icon: AssignmentTurnedInIcon,
      color: "from-blue-500 to-cyan-500",
      services: [
        {
          id: 1,
          title: "University Admissions",
          icon: SchoolIcon,
          description:
            "End-to-end university application support for top Asian universities",
          details:
            "We guide you through selecting the right university, preparing application documents, and securing admission letters from prestigious institutions across China, India, Japan, South Korea, Malaysia, and Singapore.",
          features: [
            "University selection & counseling session",
            "Application documentation support (transcripts, letters)",
            "Admission letter processing",
            "Scholarship and financial aid guidance",
            "Document verification and authentication",
            "Interview preparation sessions",
            "Follow-up with admission offices",
          ],
          countries: [
            "China",
            "India",
            "Japan",
            "South Korea",
            "Malaysia",
            "Singapore",
            "Thailand",
            "Taiwan",
          ],
          processingTime: "2-4 weeks",
          successRate: "95%",
          price: "Starting from $299",
        },
        {
          id: 2,
          title: "Document Translation",
          icon: TranslateIcon,
          description: "Professional translation of academic documents",
          details:
            "Certified translation services for academic transcripts, diplomas, recommendation letters, and other required documents for university applications.",
          features: [
            "Certified translation services",
            "Academic transcript translation",
            "Diploma and certificate translation",
            "Recommendation letter translation",
            "Notarization services",
            "Express translation option",
          ],
          processingTime: "3-7 business days",
          price: "Starting from $49/document",
        },
        {
          id: 3,
          title: "Scholarship Applications",
          icon: LocalAtmIcon,
          description: "Maximize your scholarship opportunities",
          details:
            "Comprehensive scholarship search and application support for government, university, and private scholarships across Asian countries.",
          features: [
            "Scholarship database access",
            "Eligibility assessment",
            "Application strategy development",
            "Essay and personal statement review",
            "Interview preparation",
            "Financial documentation support",
          ],
          countries: [
            "China (CSC)",
            "India (ICCR)",
            "Japan (MEXT)",
            "South Korea (KGSP)",
          ],
          successRate: "85%",
          price: "Starting from $199",
        },
      ],
    },
    {
      id: "airport",
      name: "Airport Services",
      description: "Complete arrival and transportation solutions",
      icon: AirportShuttleIcon,
      color: "from-green-500 to-emerald-500",
      services: [
        {
          id: 4,
          title: "Airport Pickup Service",
          icon: DirectionsCarIcon,
          description: "24/7 airport pickup and transfer to accommodation",
          details:
            "Professional airport pickup service with English-speaking drivers, comfortable vehicles, and welcome packages for new students.",
          features: [
            "24/7 airport pickup service",
            "English-speaking driver",
            "Comfortable AC vehicles",
            "Welcome package (SIM card, map, essentials)",
            "Direct transfer to accommodation",
            "Flight tracking for delays",
            "Multiple vehicle options",
          ],
          countries: ["All major airports in Asia"],
          responseTime: "15-30 minutes",
          vehicleTypes: ["Sedan", "SUV", "Van", "Luxury"],
          price: "Starting from $35",
        },
        {
          id: 5,
          title: "Airport Assistance",
          icon: SupportAgentIcon,
          description: "Personal airport assistance and guidance",
          details:
            "Dedicated airport assistant to help with arrival procedures, immigration, baggage claim, and initial orientation.",
          features: [
            "Personal airport assistant",
            "Immigration procedure guidance",
            "Baggage claim assistance",
            "Currency exchange help",
            "Local SIM card setup",
            "Initial orientation briefing",
            "Emergency support",
          ],
          serviceHours: "24/7",
          languages: ["English", "Chinese", "Hindi", "Korean", "Japanese"],
          price: "Starting from $75",
        },
        {
          id: 6,
          title: "City Transfer Package",
          icon: ApartmentIcon,
          description: "Complete city transfer and orientation",
          details:
            "Comprehensive package including airport transfer, city tour, and essential locations orientation.",
          features: [
            "Airport to accommodation transfer",
            "City orientation tour",
            "Bank account opening assistance",
            "Local mobile plan setup",
            "Essential shopping assistance",
            "Public transport orientation",
            "Emergency contact setup",
          ],
          duration: "3-5 hours",
          price: "Starting from $120",
        },
      ],
    },
    {
      id: "hotel",
      name: "Hotel & Accommodation",
      description: "Premium accommodation solutions",
      icon: HotelIcon,
      color: "from-purple-500 to-pink-500",
      services: [
        {
          id: 7,
          title: "Hotel Booking",
          icon: HotelIcon,
          description:
            "Premium hotels near universities with student discounts",
          details:
            "Exclusive access to student-friendly hotels with special rates, flexible check-in/out, and proximity to universities.",
          features: [
            "Student discount rates (up to 40% off)",
            "Flexible check-in/out times",
            "Proximity to universities",
            "Free WiFi and breakfast",
            "24-hour reception",
            "Laundry facilities",
            "Study areas",
          ],
          amenities: [
            "WiFi",
            "Breakfast",
            "Gym",
            "Laundry",
            "Study Room",
            "24/7 Security",
          ],
          priceRange: "$25 - $150/night",
          minimumStay: "1 night",
        },
        {
          id: 8,
          title: "Student Hostels",
          icon: GroupsIcon,
          description: "Budget-friendly student hostels and dorms",
          details:
            "Affordable hostel accommodation specifically for students with community spaces and study facilities.",
          features: [
            "Budget-friendly options",
            "Shared and private rooms",
            "Common study areas",
            "Kitchen facilities",
            "Laundry services",
            "Student community events",
            "Monthly payment plans",
          ],
          amenities: [
            "Shared Kitchen",
            "Study Lounge",
            "Laundry",
            "Common Room",
            "Security",
            "WiFi",
          ],
          priceRange: "$10 - $40/night",
          minimumStay: "1 week",
        },
        {
          id: 9,
          title: "Apartment Rental",
          icon: ApartmentIcon,
          description: "Fully furnished apartments for long-term stay",
          details:
            "Complete apartment solutions with all utilities included, perfect for semester or year-long stays.",
          features: [
            "Fully furnished apartments",
            "All utilities included",
            "High-speed internet",
            "Kitchen equipped",
            "Monthly cleaning service",
            "24/7 maintenance",
            "Flexible lease terms",
          ],
          apartmentTypes: ["Studio", "1 Bedroom", "2 Bedroom", "Shared"],
          minimumStay: "3 months",
          priceRange: "$300 - $800/month",
        },
      ],
    },
    {
      id: "other",
      name: "Other Services",
      description: "Additional support services for students",
      icon: PublicIcon,
      color: "from-orange-500 to-red-500",
      services: [
        {
          id: 10,
          title: "Visa Processing",
          icon: DescriptionIcon,
          description: "Complete visa application and processing",
          details:
            "End-to-end visa processing for study visas including document preparation, appointment booking, and follow-up.",
          features: [
            "Visa application filing",
            "Document checklist and preparation",
            "Appointment scheduling",
            "Interview preparation",
            "Application tracking",
            "Emergency processing",
            "Multi-entry visa assistance",
          ],
          countries: [
            "China (X1/X2)",
            "India (Student Visa)",
            "Japan (Student Visa)",
            "South Korea (D-2)",
          ],
          processingTime: "2-6 weeks",
          successRate: "98%",
          price: "Starting from $149",
        },
        {
          id: 11,
          title: "Online Learning Platform",
          icon: ComputerIcon,
          description: "Access to digital learning resources",
          details:
            "Comprehensive online learning platform with course materials, virtual classrooms, and certification programs.",
          features: [
            "Course registration assistance",
            "E-learning platform access",
            "Online certification programs",
            "Virtual classrooms",
            "Digital study materials",
            "24/7 tutor support",
            "Progress tracking",
          ],
          courses: [
            "Language Courses",
            "Prep Courses",
            "Certification Programs",
            "Skill Development",
          ],
          access: "6-12 months",
          price: "Starting from $99",
        },
        {
          id: 12,
          title: "Flight Booking",
          icon: FlightIcon,
          description: "Best deals on international student flights",
          details:
            "Exclusive student discounts on flights to Asian destinations with extra baggage allowance and flexible dates.",
          features: [
            "Student discount fares (up to 30% off)",
            "Extra baggage allowance",
            "Travel insurance included",
            "Date change flexibility",
            "Multi-city bookings",
            "24/7 customer support",
            "Emergency assistance",
          ],
          airlines: ["20+ International Airlines"],
          baggage: "Up to 40kg allowance",
          price: "Market competitive rates",
        },
      ],
    },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Booking submitted successfully! Our team will contact you within 24 hours.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    setSelectedService(null);
    setBookingStep(1);
  };

  const ServiceCard = ({ service, category }) => {
    const Icon = service.icon;
    const CategoryIcon = category.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group"
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
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {service.price && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Starting from</span>
                <span className="text-lg font-bold text-gray-800">
                  {service.price}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() =>
              setSelectedService({ ...service, category: category.id })
            }
            className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group/btn`}
          >
            <span>Book Now</span>
            <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
    );
  };

  const BookingModal = () => {
    if (!selectedService) return null;
    const Icon = selectedService.icon;
    const category = serviceCategories.find(
      (cat) => cat.id === selectedService.category
    );

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
          onClick={() => {
            setSelectedService(null);
            setBookingStep(1);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
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
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedService.title}
                    </h2>
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
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setBookingStep(1);
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

                  <div className="grid grid-cols-2 gap-4">
                    {selectedService.successRate && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedService.successRate}
                        </div>
                        <div className="text-sm text-gray-600">
                          Success Rate
                        </div>
                      </div>
                    )}
                    {selectedService.price && (
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedService.price}
                        </div>
                        <div className="text-sm text-gray-600">
                          Package Price
                        </div>
                      </div>
                    )}
                  </div>
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
                      Book This Service
                    </h3>
                    <p className="text-gray-300">
                      Complete the form below and our team will contact you
                      within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
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
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => setBookingStep(2)}
                          className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300`}
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
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Country *
                          </label>
                          <select
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          >
                            <option value="">Select a country</option>
                            {selectedService.countries?.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Start Date *
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setBookingStep(1)}
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingStep(3)}
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
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Requirements
                          </label>
                          <textarea
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="Please specify any special requirements, preferred budget, or additional services needed..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How did you hear about us?
                          </label>
                          <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                            <option value="">Select an option</option>
                            <option value="friend">Friend/Family</option>
                            <option value="social">Social Media</option>
                            <option value="search">Search Engine</option>
                            <option value="university">
                              University Referral
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setBookingStep(2)}
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className={`flex-1 py-3 px-6 rounded-xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                          >
                            <AssignmentTurnedInIcon className="mr-2 h-5 w-5" />
                            Submit Booking
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <EmailIcon className="h-4 w-4 mr-2" />
                        <span>bookings@studyasia.com</span>
                      </div>
                      <div className="flex items-center">
                        <AccessTimeIcon className="h-4 w-4 mr-2" />
                        <span>24/7 Support</span>
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
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
        {/* Header with Text Marker Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            className="relative inline-block"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 inline-block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.1 }}
                className="inline-block"
              >
                {"Premium Student Services".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 origin-left transform -skew-x-12"
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mt-10 leading-relaxed"
          >
            Complete support package for graduate students pursuing education
            across
            <motion.span
              initial={{ backgroundSize: "0% 100%" }}
              animate={{ backgroundSize: "100% 100%" }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold mx-2"
              style={{
                backgroundImage: "linear-gradient(to right, #3b82f6, #2563eb)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                transition: "background-size 1.5s ease-in-out",
              }}
            >
              China, India, Japan, South Korea, Malaysia, and Singapore
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl"
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
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-3 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCategories
            .filter(
              (cat) => activeCategory === "all" || cat.id === activeCategory
            )
            .flatMap((category) =>
              category.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  category={category}
                />
              ))
            )}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              value: "5000+",
              label: "Students Placed",
              color: "from-blue-500 to-cyan-500",
            },
            {
              value: "95%",
              label: "Success Rate",
              color: "from-green-500 to-emerald-500",
            },
            {
              value: "50+",
              label: "Partner Universities",
              color: "from-purple-500 to-pink-500",
            },
            {
              value: "24/7",
              label: "Support Available",
              color: "from-orange-500 to-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <div
                className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              >
                {stat.value}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
      </div>

      <BookingModal />
    </div>
  );
};
