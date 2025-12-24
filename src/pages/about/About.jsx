/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import {
  School,
  Groups,
  TrendingUp,
  CheckCircle,
  Star,
  People,
  Timer,
  Business,
  Public,
  Lightbulb,
  Security,
  Handshake,
  RocketLaunch,
  ArrowForward,
  Email,
  Phone,
  Language,
  CalendarToday,
  Description,
  VideoCall,
  Book,
  Work,
  PersonAdd,
  EmojiEvents,
  Map,
  Chat,
  SupportAgent,
  VerifiedUser,
  Assignment,
  Analytics,
  Dashboard,
  Assessment,
  Psychology,
  Engineering,
  MedicalServices,
  Computer,
  AccountBalance,
  Science,
  AutoStories,
  LocationOn,
  FourGPlusMobiledata,
  Close,
  FileDownload,
  WhatsApp,
  Send,
  Download,
  Flag,
  Language as LanguageIcon,
  AirportShuttle,
  AccountBalance as PartnershipIcon,
  ErrorOutline,
} from "@mui/icons-material";
import RECAPPLY_Study from '../../assets/pdf/RECAPPLY_Study.pdf'

export const About = () => {
  const [activeWhyCard, setActiveWhyCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Text animation states
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Your Trusted Partner in Global Education & China CSCA Preparation";

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  // Text animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Reset animation after 5 seconds
        setTimeout(() => {
          setAnimatedText("");
          currentIndex = 0;
        }, 5000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // RECAPPLY Introduction
  const recapplyInfo = {
    title: "ABOUT US – RECAPPLY",
    description: "RECAPPLY is the international education division of Ruziga Enterprise Corporation Ltd (REC Ltd), dedicated to helping students access world-class education with accuracy, professionalism, and trust.",
    mission: "to guide every student confidently from application to arrival",
    countries: ["China", "Canada", "Poland", "Turkey", "Germany", "USA"],
    services: [
      {
        icon: <School />,
        title: "University Admissions",
        description: "We help students choose the best country, university, and major based on academic strengths, career goals, budget and scholarship potential, and long-term professional plans.",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: <Book />,
        title: "CSCA Exam Preparation",
        description: "Full support for students applying to China who must sit for the China Scholastic Competency Assessment (CSCA). Includes registration guidance, study materials, mock tests, and documentation assistance.",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: <EmojiEvents />,
        title: "Scholarship Guidance",
        description: "We help students access fully funded scholarships, partial scholarships, tuition waivers, and university & government subsidies matched to their academic and financial situation.",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: <Description />,
        title: "Documents Preparation",
        description: "High-quality documents including Statement of Purpose, Study Plan, CV/Resume, Motivation Letter, Sponsor Letter, Reference Letters, and Visa Explanations.",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: <Flag />,
        title: "Visa Assistance",
        description: "Step-by-step visa support including checklist preparation, financial requirement guidance, document review, explanation letters, and interview preparation.",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: <AirportShuttle />,
        title: "Pre-Departure Guidance",
        description: "We prepare students for life abroad with accommodation search, budget planning, travel guidance, cultural adaptation, and academic expectations support.",
        color: "from-amber-500 to-orange-500"
      },
      {
        icon: <PartnershipIcon />,
        title: "Institutional Partnerships",
        description: "RECAPPLY partners with universities and colleges worldwide that seek reliable and ethical student recruitment across Africa.",
        color: "from-teal-500 to-green-500"
      }
    ]
  };

  // Statistics from screenshot - Updated for RECAPPLY
  const statistics = [
    {
      icon: <Timer />,
      value: "10+",
      label: "Years Experience",
      color: "from-blue-500 to-cyan-500",
      description: "Expertise in international education and student placement",
    },
    {
      icon: <CheckCircle />,
      value: "98%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-500",
      description: "High admission & visa success rate across top universities",
    },
    {
      icon: <People />,
      value: "13,863+",
      label: "Students Helped",
      color: "from-green-500 to-emerald-500",
      description: "Students successfully placed worldwide",
    },
    {
      icon: <School />,
      value: "500+",
      label: "Partner Universities",
      color: "from-orange-500 to-amber-500",
      description: "Global institutional partnerships",
    },
    {
      icon: <LanguageIcon />,
      value: "20+",
      label: "Countries Covered",
      color: "from-indigo-500 to-blue-500",
      description: "Study destinations worldwide including China",
    },
  ];

  // Why Choose RECAPPLY features
  const whyChooseUs = [
    {
      icon: <Assignment />,
      title: "PERSONALIZED STUDY PLANS",
      description: "Tailored guidance based on your academic strengths, career goals, budget, and long-term professional plans.",
      details: [
        "Academic strengths assessment",
        "Career goal matching",
        "Budget and scholarship analysis",
        "Personalized university selection"
      ],
      fullDetails: [
        "Comprehensive academic profile analysis",
        "One-on-one career counseling sessions",
        "Customized country and university selection",
        "Personalized application timeline planning",
        "Scholarship potential assessment",
        "Regular progress reviews and adjustments",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Description />,
      title: "PROFESSIONAL DOCUMENTS PREPARATION",
      description: "High-quality document preparation including SOP, Study Plan, CV, Motivation Letter, and all required visa documents.",
      details: [
        "Statement of Purpose writing",
        "Study Plan development",
        "CV/Resume optimization",
        "Visa documentation support"
      ],
      fullDetails: [
        "Professional document verification",
        "Personal statement writing with multiple editing rounds",
        "University-specific application strategy",
        "Scholarship essay assistance",
        "Visa documentation and interview preparation",
        "Notarization and certification support",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Chat />,
      title: "CSCA EXAM SPECIALIZATION",
      description: "Expert support for China Scholastic Competency Assessment with comprehensive preparation resources and guidance.",
      details: [
        "CSCA registration guidance",
        "Study materials (Math, Physics, Chemistry)",
        "Mock tests & exam strategy",
        "Chinese language preparation"
      ],
      fullDetails: [
        "Full CSCA registration process guidance",
        "Subject selection assistance based on major",
        "Comprehensive study materials for all subjects",
        "Regular mock tests and performance analysis",
        "Exam strategy and time management training",
        "Chinese language preparation support",
        "Scholarship documentation for China admissions",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <EmojiEvents />,
      title: "SCHOLARSHIP MATCHING",
      description: "We match students with appropriate scholarships based on academic achievements and financial situation.",
      details: [
        "Fully funded scholarship access",
        "Partial scholarship identification",
        "Tuition waiver assistance",
        "Government subsidy guidance"
      ],
      fullDetails: [
        "Comprehensive scholarship database access",
        "Personalized scholarship matching algorithm",
        "Scholarship application strategy development",
        "Essay and documentation preparation support",
        "Interview preparation for scholarship panels",
        "Post-scholarship compliance guidance",
        "Multiple scholarship combination strategies",
      ],
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Flag />,
      title: "VISA SUCCESS GUARANTEE",
      description: "Comprehensive visa assistance to avoid common mistakes and maximize approval chances.",
      details: [
        "Checklist preparation",
        "Financial requirement guidance",
        "Document review",
        "Interview preparation"
      ],
      fullDetails: [
        "Complete visa document checklist preparation",
        "Financial documentation and proof guidance",
        "Professional document review and verification",
        "Visa explanation letter writing",
        "Mock interview sessions with feedback",
        "Country-specific visa requirement expertise",
        "Appeal preparation for visa refusals",
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <SupportAgent />,
      title: "END-TO-END SUPPORT",
      description: "Support from initial consultation to post-arrival adjustment in the destination country.",
      details: [
        "Pre-departure orientation",
        "Accommodation assistance",
        "Cultural adaptation",
        "Ongoing student support"
      ],
      fullDetails: [
        "Comprehensive pre-departure briefing",
        "Accommodation search and booking assistance",
        "Airport pickup coordination",
        "Local SIM card and bank account setup",
        "Cultural adaptation workshops",
        "24/7 emergency support in destination",
        "Regular check-ins and progress monitoring",
      ],
      color: "from-teal-500 to-green-500",
    },
  ];

  // Country specializations - Updated with RECAPPLY focus countries
  const countries = [
    {
      name: "China",
      icon: <LocationOn />,
      universities: 150,
      color: "from-red-500 to-orange-500",
      description: "Special expertise in CSCA preparation and Chinese universities"
    },
    {
      name: "Canada",
      icon: <Map />,
      universities: 200,
      color: "from-blue-500 to-cyan-500",
      description: "Popular destination with high success rate"
    },
    {
      name: "Germany",
      icon: <Public />,
      universities: 120,
      color: "from-yellow-500 to-amber-500",
      description: "Quality education with tuition-free options"
    },
    {
      name: "USA",
      icon: <Star />,
      universities: 300,
      color: "from-indigo-500 to-blue-500",
      description: "Top universities with scholarship opportunities"
    },
    {
      name: "Poland",
      icon: <CalendarToday />,
      universities: 80,
      color: "from-purple-500 to-pink-500",
      description: "Affordable European education"
    },
    {
      name: "Turkey",
      icon: <School />,
      universities: 100,
      color: "from-green-500 to-emerald-500",
      description: "Quality education at competitive costs"
    },
  ];

  // Contact Information for RECAPPLY
  const contactInfo = {
    email: "r.educationalconsultance@gmail.com",
    rwandaPhone: "+250 783 408 617",
    chinaPhone: "+86 186 5833 2879",
    office: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
    whatsapp: "+250783408617"
  };

  // Form handlers - FIXED: Prevent page reload
  const handleInputChange = (e) => {
    e.preventDefault(); // Prevent form submission
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true);

    try {
      // Prepare form data based on modal type
      let formPayload = {
        ...formData,
        formType: modalContent?.type || 'contact',
        submissionDate: new Date().toISOString(),
        source: 'RECAPPLY About Page',
        timestamp: Date.now()
      };

      // Send to your API endpoint - REPLACE WITH YOUR ACTUAL API
      const API_ENDPOINT = 'https://api.recrecapply.com/submissions';
      
      // Simulate API call - replace with actual axios.post
      console.log('Submitting form data:', formPayload);
      
      // Simulated API response - remove this in production
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // For production, use:
      // const response = await axios.post(API_ENDPOINT, formPayload, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   }
      // });

      // Success
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        course: "",
        message: "",
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setActiveModal(false);
    setModalContent(null);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = contactInfo.whatsapp;
    const message = "Hello! I'm interested in studying abroad with RECAPPLY. Can you help me?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Open Read More modal
  const openReadMoreModal = (feature) => {
    setModalContent({
      type: "readMore",
      data: feature,
    });
    setActiveModal(true);
  };

  // Open Booking modal
  const openBookingModal = () => {
    setModalContent({
      type: "booking",
      title: "Book Free Consultation with RECAPPLY",
    });
    setActiveModal(true);
  };

  // Open Request Package modal
  const openRequestPackageModal = () => {
    setModalContent({
      type: "requestPackage",
      title: "Request RECAPPLY Information Package",
    });
    setActiveModal(true);
  };

  // Open Download Guide modal
  const openDownloadGuideModal = () => {
    setModalContent({
      type: "downloadGuide",
      title: "Download Study Abroad Guide",
    });
    setActiveModal(true);
  };

  // Open Apply Now modal
  const openApplyNowModal = () => {
    setModalContent({
      type: "applyNow",
      title: "Apply Now with RECAPPLY",
    });
    setActiveModal(true);
  };

  // Success Modal
  const renderSuccessModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={closeAllModals}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Successfully Submitted!
            </h3>
            
            <p className="text-white mb-6">
              Thank you for your interest in RECAPPLY. We have received your information and will contact you within 24 hours.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={closeAllModals}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Continue Browsing
              </button>
              
              <button
                onClick={() => {
                  closeAllModals();
                  handleWhatsAppClick();
                }}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
              >
                <WhatsApp className="w-5 h-5" />
                <span>Chat on WhatsApp Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Error Modal
  const renderErrorModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={closeAllModals}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <ErrorOutline className="w-8 h-8 text-red-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Submission Failed
            </h3>
            
            <p className="text-white mb-6">
              There was an issue submitting your form. Please try again or contact us directly.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={closeAllModals}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Try Again
              </button>
              
              <button
                onClick={() => {
                  closeAllModals();
                  handleWhatsAppClick();
                }}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
              >
                <WhatsApp className="w-5 h-5" />
                <span>Contact via WhatsApp</span>
              </button>
              
              <button
                onClick={() => {
                  closeAllModals();
                  window.location.href = `mailto:${contactInfo.email}`;
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
              >
                <Email className="w-5 h-5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Render modal based on type
  const renderModal = () => {
    if (!activeModal || !modalContent) return null;

    const handleClose = () => {
      setActiveModal(false);
      setModalContent(null);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            className={`sticky top-0 bg-gradient-to-r ${
              modalContent.data?.color
                ?.replace("from-", "from-")
                .replace("to-", "to-") || "from-blue-500 to-purple-500"
            } p-6 text-white`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {modalContent.title || modalContent.data?.title}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 bg-gradient-to-b from-red-600 to-red-800 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <Close className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto">
            {modalContent.type === "readMore" && modalContent.data && (
              <div>
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${modalContent.data.color} mr-4`}
                  >
                    {modalContent.data.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {modalContent.data.title}
                  </h4>
                </div>

                <p className="text-white mb-6 text-lg">
                  {modalContent.data.description}
                </p>

                <h5 className="font-bold text-gray-800 mb-4 text-lg">
                  Complete Service Details:
                </h5>
                <ul className="space-y-3 mb-8">
                  {modalContent.data.fullDetails.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
                  <h6 className="font-bold text-gray-800 mb-2">
                    What You Get:
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modalContent.data.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(modalContent.type === "booking" || 
              modalContent.type === "requestPackage" || 
              modalContent.type === "applyNow") && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  {modalContent.title}
                </h4>
                
                <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {modalContent.type !== "booking" && (
                    <>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Country of Interest
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Country</option>
                          <option value="China">China (CSCA Specialization)</option>
                          <option value="Canada">Canada</option>
                          <option value="Germany">Germany</option>
                          <option value="USA">USA</option>
                          <option value="Poland">Poland</option>
                          <option value="Turkey">Turkey</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Course/Program Interest
                        </label>
                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="e.g., Computer Science, Medicine, Engineering"
                          disabled={isSubmitting}
                        />
                      </div>
                    </>
                  )}

                  {modalContent.type === "booking" && (
                    <>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Preferred Country
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Country</option>
                          <option value="China">China</option>
                          <option value="Canada">Canada</option>
                          <option value="Germany">Germany</option>
                          <option value="USA">USA</option>
                          <option value="Poland">Poland</option>
                          <option value="Turkey">Turkey</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Interested in CSCA Preparation?
                        </label>
                        <select 
                          name="cscaInterest"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Option</option>
                          <option value="yes">Yes, for China admission</option>
                          <option value="no">No, other countries</option>
                          <option value="maybe">Considering it</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Preferred Consultation Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          name="preferredTime"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        />
                      </div>
                    </>
                  )}

                  {modalContent.type === "applyNow" && (
                    <>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Academic Background
                        </label>
                        <select 
                          name="academicBackground"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Highest Qualification</option>
                          <option value="High School">High School</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Scholarship Interest
                        </label>
                        <select 
                          name="scholarshipInterest"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Option</option>
                          <option value="full">Fully Funded Scholarship</option>
                          <option value="partial">Partial Scholarship</option>
                          <option value="tuition">Tuition Waiver</option>
                          <option value="self">Self-funded</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Additional Information
                        </label>
                        <textarea
                          rows="4"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Tell us about your academic goals and expectations..."
                          disabled={isSubmitting}
                        ></textarea>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : modalContent.type === 'applyNow'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" />
                        {modalContent.type === 'booking' && 'Book Consultation with RECAPPLY'}
                        {modalContent.type === 'requestPackage' && 'Request RECAPPLY Package'}
                        {modalContent.type === 'applyNow' && 'Submit Application to RECAPPLY'}
                      </>
                    )}
                  </button>

                  {modalContent.type === 'booking' && (
                    <p className="text-sm text-gray-500 text-center mt-4">
                      We'll contact you within 24 hours to confirm your consultation time.
                    </p>
                  )}
                </form>
              </div>
            )}

            {modalContent.type === "downloadGuide" && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  RECAPPLY Study Abroad Guide
                </h4>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Description className="w-12 h-12 text-blue-600 mr-4" />
                    <div>
                      <h5 className="font-bold text-gray-800">
                        Complete Study Abroad Guide 2024
                      </h5>
                      <p className="text-black">
                        PDF Document • 50 pages • 15MB
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    This comprehensive RECAPPLY guide includes:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex text-gray-700 items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Step-by-step application process
                    </li>
                    <li className="flex text-gray-700 items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      CSCA exam preparation guide
                    </li>
                    <li className="flex text-gray-700 items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Scholarship opportunities worldwide
                    </li>
                    <li className="flex text-gray-700 items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Visa application checklist
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Pre-departure and cultural adaptation
                    </li>
                  </ul>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        // Simulate download
                        const link = document.createElement("a");
                        link.href = {RECAPPLY_Study};
                        link.download = "RECAPPLY_Study_Abroad_Guide_2024.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center"
                    >
                      <Download className="mr-2" />
                      Download PDF
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 text-white dark:from-gray-700 dark:to-gray-900">
      {/* Hero Section - RECAPPLY Focus */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0bg-gradient-to-br from-blue-800 to-indigo-500 text-white dark:from-gray-700 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-white">{recapplyInfo.title}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-16 mb-8"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white max-w-4xl mx-auto"
              >
                {recapplyInfo.description} We support students from Africa and beyond to secure admissions, scholarships, and visas to top universities worldwide.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full">
                  <RocketLaunch className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">
                    Our Mission: <span className="text-purple-600">{recapplyInfo.mission}</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RECAPPLY Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-800 to-indigo-500 text-white dark:from-gray-700 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                WHAT WE DO
              </span>
            </h2>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive services designed for your international education success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recapplyInfo.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
              >
                <div
                  className={`absolute text-gray-800 inset-0 bg-gradient-to-br ${service.color} opacity-0 hover:opacity-5 transition-opacity`}
                />

                <div className="p-6 md:p-8 relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 transform transition-transform duration-300 hover:scale-110`}
                  >
                    <div className="w-8 h-8">{service.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-800 to-indigo-500 text-white dark:from-gray-700 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The RECAPPLY Impact
            </h2>
            <p className="text-xl text-blue-200">
              Key statistics that showcase our expertise and success
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all group"
              >
                <div className="text-center">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-8 h-8 text-white">{stat.icon}</div>
                  </div>

                  <div className="text-4xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>

                  <div className=" font-semibold text-white mb-2">
                    {stat.label}
                  </div>

                  <div className="text-sm text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose RECAPPLY Section */}
      <section className="py-16 md:py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                WHY STUDENTS CHOOSE RECAPPLY
              </span>
            </h2>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
              Clear, honest, and transparent service with professional support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveWhyCard(index)}
                onMouseLeave={() => setActiveWhyCard(null)}
                whileHover={{ y: -10 }}
                className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 ${
                  activeWhyCard === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="p-6 md:p-8 relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${
                      feature.color
                    } text-white mb-6 transform transition-transform duration-300 ${
                      activeWhyCard === index ? "scale-110 rotate-3" : ""
                    }`}
                  >
                    <div className="w-8 h-8">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeWhyCard === index
                        ? "max-h-40 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openReadMoreModal(feature)}
                    className={`mt-6 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeWhyCard === index
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Specialize In */}
      <section className="py-16 md:py-24 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">
                COUNTRIES WE SPECIALIZE IN
              </span>
            </h2>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
              Top destinations including {recapplyInfo.countries.join(", ")} and many others
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${country.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-xl mr-4">
                      {country.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                      <p className="text-white/80">{country.universities}+ Universities</p>
                    </div>
                  </div>
                </div>
                <p className="text-white/90">{country.description}</p>
                {country.name === "China" && (
                  <div className="mt-4 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
                    <Book className="w-4 h-4 mr-1" />
                    CSCA Exam Specialization
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact RECAPPLY Section */}
      <section className="py-16 md:py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                Contact RECAPPLY
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Email className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-700">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-800">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-green-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-700">Rwanda Office</p>
                      <a href={`tel:${contactInfo.rwandaPhone}`} className="text-green-600 hover:text-green-800">
                        {contactInfo.rwandaPhone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-700">China Office</p>
                      <a href={`tel:${contactInfo.chinaPhone}`} className="text-red-600 hover:text-red-800">
                        {contactInfo.chinaPhone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start mb-4">
                    <LocationOn className="w-6 h-6 text-purple-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Office Location</p>
                      <p className="text-black">{contactInfo.office}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Why Choose RECAPPLY?</h4>
                    <ul className="space-y-2 text-black">
                      <li className="flex text-black items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        High admission & visa success rate
                      </li>
                      <li className="flex text-black items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Clear, honest, and transparent service
                      </li>
                      <li className="flex text-black items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Professional academic and visa documentation
                      </li>
                      <li className="flex text-black items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Specialized expertise for China CSCA requirements
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 italic mb-6">
                  We believe in education that builds futures and transforms communities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
                  >
                    <WhatsApp className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openBookingModal}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Book Free Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards your international education dreams with RECAPPLY
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openApplyNowModal}
                className="bg-gradient-to-t from-indigo-500 to-blue-400 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Apply Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openRequestPackageModal}
                className="bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all"
              >
                Request Information Package
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openDownloadGuideModal}
                className="bg-gradient-to-b from-white to-gray-500 border-2 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Download Free Guide
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Render Modals */}
      {renderModal()}
      {showSuccessModal && renderSuccessModal()}
      {showErrorModal && renderErrorModal()}
    </div>
  );
};