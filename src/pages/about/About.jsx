/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "@mui/icons-material";

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

  // Text animation states
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Your Trusted Partner in Study in China & Global Education";

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

  // Statistics from screenshot
  const statistics = [
    {
      icon: <Timer />,
      value: "10+",
      label: "Years Experience",
      color: "from-blue-500 to-cyan-500",
      description: "Decades of expertise in international education",
    },
    {
      icon: <CheckCircle />,
      value: "98%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-500",
      description: "Admission success across top universities",
    },
    {
      icon: <People />,
      value: "13,863+",
      label: "Number of Students",
      color: "from-green-500 to-emerald-500",
      description: "Students successfully placed worldwide",
    },
    {
      icon: <School />,
      value: "500+",
      label: "University Partners",
      color: "from-orange-500 to-amber-500",
      description: "Partnered with top institutions globally",
    },
    {
      icon: <VerifiedUser />,
      value: "95%",
      label: "Satisfied Parents",
      color: "from-indigo-500 to-blue-500",
      description: "Parent satisfaction and trust rate",
    },
  ];

  // Why Choose Us features from screenshot
  const whyChooseUs = [
    {
      icon: <Assignment />,
      title: "PERSONALIZED STUDY PLANS",
      description:
        "Tailored guidance and support, ensuring you choose the right university and program to match your career aspirations and personal goals.",
      details: [
        "Individual academic assessment",
        "Career path matching",
        "Customized university shortlisting",
        "Personal timeline planning",
      ],
      fullDetails: [
        "Comprehensive academic profile analysis to identify strengths and areas for improvement",
        "One-on-one career counseling sessions with industry experts",
        "Customized university selection based on 100+ parameters",
        "Personalized application timeline with milestone tracking",
        "Regular progress reviews and strategy adjustments",
        "Access to exclusive university partnerships and early admission programs",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Work />,
      title: "PLACEMENT ASSISTANCE",
      description:
        "Leveraging our extensive network of partnered universities and industry contacts, we provide robust placement support to help you secure internships and job opportunities post-graduation.",
      details: [
        "Industry partnership network",
        "Internship placement support",
        "Career counseling sessions",
        "Job placement assistance",
      ],
      fullDetails: [
        "Direct partnerships with 500+ global companies for internships",
        "Dedicated career coach assigned to each student",
        "Resume building workshops and LinkedIn profile optimization",
        "Mock interview sessions with industry professionals",
        "Access to exclusive job fairs and recruitment events",
        "Post-placement follow-up and career progression support",
        "Alumni network access for mentorship opportunities",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Chat />,
      title: "EASY ACCESS TO EXPERTS",
      description:
        "Our consultants are readily available through multiple channels, including video chats, emails, and phone calls, ensuring you get the help and advice you need at any time.",
      details: [
        "24/7 consultant availability",
        "Multiple communication channels",
        "Quick response time",
        "Dedicated student manager",
      ],
      fullDetails: [
        "Round-the-clock support via WhatsApp, email, and phone",
        "Dedicated student manager with average response time < 2 hours",
        "Weekly progress update calls and reports",
        "Emergency support hotline for urgent queries",
        "Parent communication portal for regular updates",
        "Multilingual support team covering 15+ languages",
        "Regular webinars and Q&A sessions with university representatives",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Description />,
      title: "COMPREHENSIVE APPLICATION SUPPORT",
      description:
        "From crafting compelling personal statements to preparing documents and interview coaching, we guide you through every step of the application process.",
      details: [
        "Document preparation",
        "Personal statement writing",
        "Interview preparation",
        "Application review",
      ],
      fullDetails: [
        "Professional document verification and notarization services",
        "Personal statement writing with 5+ rounds of editing",
        "University-specific application strategy development",
        "Interview preparation with former admission officers",
        "Scholarship application assistance and essay writing",
        "Visa documentation and interview preparation",
        "Pre-departure orientation and cultural training",
      ],
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Book />,
      title: "FLEXIBLE LEARNING RESOURCES",
      description:
        "Access a wealth of resources, including guides, webinars, and tools designed to help you succeed in your academic journey abroad.",
      details: [
        "Study guides and materials",
        "Online webinars",
        "Language preparation resources",
        "Cultural orientation",
      ],
      fullDetails: [
        "Digital library with 1000+ study materials and e-books",
        "Live webinars with successful alumni and industry leaders",
        "Language preparation courses (IELTS, TOEFL, Mandarin, etc.)",
        "Cultural adaptation workshops and country-specific guides",
        "Mobile app with personalized study plans and progress tracking",
        "Access to online tutoring and subject matter experts",
        "Financial planning tools and scholarship databases",
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <FourGPlusMobiledata />,
      title: "INNOVATIVE LEARNING TRANSITION",
      description:
        "We assist you in transitioning to a new academic environment with cultural orientation and ongoing support throughout your study abroad journey.",
      details: [
        "Cultural orientation programs",
        "Pre-departure briefings",
        "Accommodation assistance",
        "Ongoing student support",
      ],
      fullDetails: [
        "Comprehensive pre-departure orientation covering legal, academic, and cultural aspects",
        "Accommodation assistance with verified housing partners",
        "Airport pickup and local orientation upon arrival",
        "Local SIM card and bank account setup assistance",
        "24/7 emergency support in destination country",
        "Regular check-ins and academic progress monitoring",
        "Alumni meetups and networking events in host country",
      ],
      color: "from-teal-500 to-green-500",
    },
  ];

  // Country specializations
  const countries = [
    {
      name: "China",
      icon: <LocationOn />,
      universities: 150,
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Italy",
      icon: <Map />,
      universities: 80,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Malaysia",
      icon: <Public />,
      universities: 120,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Canada",
      icon: <CalendarToday />,
      universities: 200,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "USA",
      icon: <Star />,
      universities: 300,
      color: "from-indigo-500 to-blue-500",
    },
    {
      name: "UK",
      icon: <School />,
      universities: 150,
      color: "from-amber-500 to-orange-500",
    },
  ];

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your submission! We'll contact you soon.");
    setActiveModal(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      course: "",
      message: "",
    });
  };

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "+1234567890"; // Replace with your WhatsApp number
    const message =
      "Hello! I'm interested in studying abroad. Can you help me?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
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
      title: "Book Free Consultation",
    });
    setActiveModal(true);
  };

  // Open Request Package modal
  const openRequestPackageModal = () => {
    setModalContent({
      type: "requestPackage",
      title: "Request Information Package",
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
      title: "Apply Now - Complete Your Application",
    });
    setActiveModal(true);
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
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <Close className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
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

                <p className="text-gray-600 mb-6 text-lg">
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

            {modalContent.type === "booking" && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Schedule Your Free Consultation
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Preferred Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Country</option>
                      <option value="China">China</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Preferred Consultation Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Book Consultation
                  </button>
                </form>
              </div>
            )}

            {modalContent.type === "requestPackage" && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Request Information Package
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Country of Interest
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Country</option>
                      <option value="China">China</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., MBA, Computer Science, Medicine"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Request Package
                  </button>
                </form>
              </div>
            )}

            {modalContent.type === "downloadGuide" && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Study Abroad Guide
                </h4>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Description className="w-12 h-12 text-blue-600 mr-4" />
                    <div>
                      <h5 className="font-bold text-gray-800">
                        Complete Study Abroad Guide 2024
                      </h5>
                      <p className="text-gray-600">
                        PDF Document • 45 pages • 12MB
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    This comprehensive guide includes:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Step-by-step application process
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      University selection criteria
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Scholarship opportunities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Visa application checklist
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Pre-departure checklist
                    </li>
                  </ul>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        // Simulate download
                        const link = document.createElement("a");
                        link.href = "/sample-guide.pdf"; // Replace with actual PDF URL
                        link.download = "Study_Abroad_Guide_2024.pdf";
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

            {modalContent.type === "applyNow" && (
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Complete Your Application
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Country of Citizenship
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="China">China</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Academic Background
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Highest Qualification</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's Degree">
                        Bachelor's Degree
                      </option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Target Country *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="China">China</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Target Course/Program *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., MBA, Computer Science"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your goals and expectations..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
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
                <span className="text-gray-900">ABOUT </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  US
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-16 mb-8"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto"
              >
                At <span className="font-bold text-blue-600">RK Edu</span>, we
                believe in the transformative power of education and the
                boundless opportunities that studying abroad can offer.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The Numbers Say It All
            </h2>
            <p className="text-xl text-blue-200">
              Key statistics that showcase our impact and expertise
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

                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>

                  <div className="text-lg font-semibold text-white mb-2">
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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                WHY CHOOSE US
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive services designed for your international education
              success
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

                  <p className="text-gray-600 mb-6 leading-relaxed">
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
                            className="flex items-center text-sm text-gray-600"
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

      {/* Additional Features */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600">Holistic Approach</span> to
                Education Consulting
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <VideoCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Virtual Campus Tours
                    </h3>
                    <p className="text-gray-600">
                      Experience university campuses through immersive virtual
                      tours before making your decision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <SupportAgent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Post-Arrival Support
                    </h3>
                    <p className="text-gray-600">
                      Continued assistance with accommodation, cultural
                      adaptation, and academic transition after you arrive.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Start Your Journey Today
                  </h3>
                  <p className="opacity-90">
                    Get personalized guidance for your international education
                    dreams
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openBookingModal}
                    className="w-full bg-white text-blue-900 py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-3"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Book Free Consultation</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openRequestPackageModal}
                    className="w-full bg-transparent border-2 border-white text-white py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center space-x-3"
                  >
                    <Email className="w-5 h-5" />
                    <span>Request Information Package</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openDownloadGuideModal}
                    className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center space-x-3"
                  >
                    <Assignment className="w-5 h-5" />
                    <span>Download Study Abroad Guide</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Begin Your International Education Journey?
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Join thousands of successful students who achieved their dreams
                with our guidance. Let us help you write your own success story.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openApplyNowModal}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-3"
                >
                  <PersonAdd className="w-5 h-5" />
                  <span>Apply Now</span>
                  <ArrowForward className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold border-2 border-blue-200 hover:border-blue-300 transition-all flex items-center justify-center space-x-3"
                >
                  <WhatsApp className="w-5 h-5 text-green-500" />
                  <span>Chat with Advisor</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Render Modal */}
      {renderModal()}
    </div>
  );
};
