/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  Close,
  QuestionAnswer,
  Send,
  Email,
  CheckCircle,
  Error,
} from "@mui/icons-material";
import axios from "axios";

// Create Axios instance with better configuration
const api = axios.create({
  baseURL: "https://ruziganodejs.onrender.com/frequent/question", // Added /api to match your routes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method.toUpperCase()} request to:`, config.url);
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response ${response.status} from:`, response.config.url);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response interceptor error details:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      } : null,
      request: error.request ? "Request was made" : "No request was made"
    });
    return Promise.reject(error);
  }
);

const faqs = [
  {
    id: 1,
    question: "What documents are required to apply for Asian universities?",
    answer:
      "Most universities require transcripts, recommendation letters, proof of English proficiency, and a statement of purpose. Some may also require standardized test scores like SAT, GRE, or GMAT depending on the program.",
    category: "admissions",
  },
  {
    id: 2,
    question: "How can I book accommodation before arriving?",
    answer:
      "Universities often provide on-campus housing. You can also book private accommodation via trusted platforms. Many universities have dedicated international student housing offices to assist with accommodation arrangements.",
    category: "accommodation",
  },
  {
    id: 3,
    question: "What is the process for visa application?",
    answer:
      "Apply at the embassy with your admission letter, passport, financial proof, and medical certificates. The process typically takes 4-8 weeks, so apply well in advance of your program start date.",
    category: "visa",
  },
  {
    id: 4,
    question: "Can I work part-time while studying?",
    answer:
      "Many Asian countries allow part-time work with restrictions (e.g., 20 hours per week). However, regulations vary by country, so check with your university's international student office for specific guidelines.",
    category: "work",
  },
  {
    id: 5,
    question: "When should I start preparing my application?",
    answer:
      "Start 9–12 months before intake to prepare documents and meet deadlines. This gives you ample time for test preparation, document gathering, and application submission.",
    category: "planning",
  },
  {
    id: 6,
    question: "Do universities provide support for international students?",
    answer:
      "Yes, most have international student offices for orientation, housing, and visa support. They also offer cultural adaptation programs, language support, and academic advising specifically for international students.",
    category: "support",
  },
  {
    id: 7,
    question: "How do I secure scholarships or financial aid?",
    answer:
      "Check university websites for merit-based scholarships and external funding opportunities. Many governments and private organizations also offer scholarships for international students studying in Asia.",
    category: "funding",
  },
  {
    id: 8,
    question: "Is health insurance mandatory?",
    answer:
      "Yes, most countries require international students to have valid health insurance. Universities often provide affordable health insurance plans specifically designed for international students.",
    category: "health",
  },
  {
    id: 9,
    question: "Can I extend my visa after graduation?",
    answer:
      "Some countries allow extensions for job hunting or work permits. Many Asian countries offer post-study work visas to help graduates transition into the local workforce.",
    category: "visa",
  },
  {
    id: 10,
    question: "How do I adapt to cultural differences?",
    answer:
      "Join student clubs, attend orientation, and engage with local communities. Universities often offer cultural workshops and language exchange programs to help international students adjust.",
    category: "culture",
  },
  {
    id: 11,
    question: "What language requirements are needed?",
    answer:
      "Requirements vary by country and program. Some programs require English proficiency tests (TOEFL/IELTS), while others may require local language proficiency.",
    category: "language",
  },
  {
    id: 12,
    question: "How much does it cost to study in Asia?",
    answer:
      "Costs vary by country and institution. Generally, tuition ranges from $3,000 to $20,000 per year, with living expenses adding $500-$1,500 per month depending on location.",
    category: "cost",
  },
  {
    id: 13,
    question: "Are there any age restrictions for international students?",
    answer:
      "Most universities don't have strict age limits, but some programs may have specific requirements. Generally, as long as you meet academic requirements, age is not a barrier.",
    category: "eligibility",
  },
  {
    id: 14,
    question: "How do I get my educational documents evaluated?",
    answer:
      "Many universities require credential evaluation services. Check with your target universities for their preferred evaluation services and procedures.",
    category: "documents",
  },
  {
    id: 15,
    question: "Can I bring my family with me?",
    answer:
      "This depends on the country's immigration policies. Some allow dependent visas for spouses and children, while others have restrictions.",
    category: "family",
  },
  {
    id: 16,
    question: "What is the academic calendar in Asian universities?",
    answer:
      "Most follow a semester system (Fall and Spring). Some countries like Japan have April intake, while others like China have September intake.",
    category: "academics",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const faqVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  }),
};

const answerVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    marginTop: 0,
  },
  expanded: {
    opacity: 1,
    height: "auto",
    marginTop: 16,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const iconVariants = {
  up: { rotate: 0 },
  down: { rotate: 180 },
};

// Modal variants
const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 50 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 50 },
};

// Success/Fail modal variants
const statusModalVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.8, opacity: 0, y: 30 },
};

export const FAQ = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" or "error"
  const [modalMessage, setModalMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking"); // checking, online, offline

  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("🔍 Testing API connection to:", "https://ruziganodejs.onrender.com/frequent/question");
        const response = await axios.get("https://ruziganodejs.onrender.com/frequent/question", {
          timeout: 10000,
          params: { limit: 1 }
        });
        console.log("✅ API is online. Status:", response.status);
        setApiStatus("online");
      } catch (error) {
        console.warn("⚠️ API connection test failed:", error.message);
        setApiStatus("offline");
      }
    };

    testApiConnection();
  }, []);

  const categories = [
    { id: "all", name: "All Questions", count: faqs.length },
    {
      id: "admissions",
      name: "Admissions",
      count: faqs.filter((f) => f.category === "admissions").length,
    },
    {
      id: "visa",
      name: "Visa",
      count: faqs.filter((f) => f.category === "visa").length,
    },
    {
      id: "accommodation",
      name: "Accommodation",
      count: faqs.filter((f) => f.category === "accommodation").length,
    },
    {
      id: "funding",
      name: "Funding",
      count: faqs.filter((f) => f.category === "funding").length,
    },
    {
      id: "work",
      name: "Work",
      count: faqs.filter((f) => f.category === "work").length,
    },
  ];

  const perPage = 8;
  const start = page * perPage;

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentFaqs = filteredFaqs.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredFaqs.length / perPage);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const validateForm = () => {
    const errors = {};

    if (!question.trim()) {
      errors.question = "Question is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const showStatusNotification = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setShowStatusModal(true);

    // Auto-hide after 5 seconds
    const autoCloseTimer = setTimeout(() => {
      setShowStatusModal(false);
      setModalType(null);
      setModalMessage("");
    }, 5000);

    // Clear timer on unmount
    return () => clearTimeout(autoCloseTimer);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showStatusNotification(
        "error",
        "Please fill in all required fields correctly"
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("sending");

    // Prepare the data according to your Question model
    const questionData = {
      question: question.trim(),
      email: email.trim().toLowerCase(),
      name: name.trim() || "User", // Default to "User" if name not provided
      category: activeCategory !== "all" ? activeCategory : "general",
      source: "faq-page",
      status: "pending"
      // metadata will be added by your backend
    };

    console.log("📤 Submitting question data:", questionData);

    try {
      const response = await api.post('/questions', questionData);
      
      console.log("✅ Question submitted successfully!");
      console.log("Response data:", response.data);
      
      setStatus("success");

      // Show success modal
      showStatusNotification(
        "success",
        `Question sent successfully! We'll respond to ${email} within 24 hours.`
      );

      // Clear form fields after successful submission
      setTimeout(() => {
        setQuestion("");
        setEmail("");
        setName("");
        setFormErrors({});
      }, 500);

      // Auto-close question modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setStatus(null);
        setIsSubmitting(false);
      }, 2000);
      
      setApiStatus("online");

    } catch (err) {
      console.error("❌ Error submitting question:", err);
      setStatus("fail");
      setIsSubmitting(false);

      let errorMessage = "Failed to send question. Please try again.";
      
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        errorMessage = "The server is taking too long to respond. Please try again in 30 seconds.";
      } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Invalid data. Please check your question and email.";
        } else if (err.response.status === 404) {
          errorMessage = "The submission endpoint was not found.";
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
          if (err.response.data && err.response.data.error) {
            errorMessage = `Server error: ${err.response.data.error}`;
          }
        }
      } else if (err.request) {
        errorMessage = "No response received from server. The server might be down.";
      }

      showStatusNotification("error", errorMessage);
    }
  };

  const resetQuestionModal = () => {
    setShowModal(false);
    setStatus(null);
    setQuestion("");
    setEmail("");
    setName("");
    setFormErrors({});
    setIsSubmitting(false);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setModalType(null);
    setModalMessage("");
  };

  // Category button animation
  const categoryButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    active: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <>
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-800 to-indigo-500">
        <div className="container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12">
         
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", damping: 25 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <div className="inline-block mb-3 sm:mb-4">
              <motion.div
                className="flex items-center justify-center mb-2 sm:mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <QuestionAnswer className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
              </motion.div>
              <motion.div
                className="h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-3/4 mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "75%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-4 sm:mt-6"
            >
              Get answers to common questions about studying in Asia. Can't find
              what you're looking for? Ask our experts directly!
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="relative max-w-2xl mx-auto px-2">
              <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                  }}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm"
                />
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 bg-gradient-to-br from-red-800 to-red-500 rounded-full transition-colors hover:from-red-900 hover:to-red-600"
                    >
                      <Close className="h-4 w-4 text-gray-400" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={categoryButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={
                    activeCategory === category.id ? "active" : "initial"
                  }
                  onClick={() => {
                    setActiveCategory(category.id);
                    setPage(0);
                  }}
                  className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 shadow-sm"
                  }`}
                >
                  <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                    {category.name}
                  </span>
                  <motion.span
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {category.count}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            {filteredFaqs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 sm:py-16"
              >
                <QuestionAnswer className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No questions found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Try adjusting your search or category filter
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                  {currentFaqs.map((faq, i) => (
                    <motion.div
                      key={faq.id}
                      custom={i}
                      variants={faqVariants}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                      onClick={() => toggleExpand(faq.id)}
                    >
                      <div className="w-full text-left p-4 sm:p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  faq.category === "admissions"
                                    ? "bg-blue-100 text-blue-600"
                                    : faq.category === "visa"
                                    ? "bg-green-100 text-green-600"
                                    : faq.category === "accommodation"
                                    ? "bg-purple-100 text-purple-600"
                                    : faq.category === "funding"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {categories.find((c) => c.id === faq.category)
                                  ?.name || faq.category}
                              </motion.span>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl mb-2 pr-8">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <motion.div
                              variants={iconVariants}
                              animate={expandedId === faq.id ? "up" : "down"}
                              transition={{ duration: 0.3 }}
                            >
                              {expandedId === faq.id ? (
                                <ArrowUpward className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                              ) : (
                                <ArrowDownward className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                              )}
                            </motion.div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedId === faq.id && (
                            <motion.div
                              variants={answerVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="overflow-hidden border-t border-gray-100"
                            >
                              <div className="pt-4 mt-4">
                                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
                                  {faq.answer}
                                </p>
                                <motion.div
                                  className="mt-4 flex justify-end"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setQuestion(faq.question);
                                      setShowModal(true);
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                                  >
                                    <span>Need more help?</span>
                                    <Send className="h-4 w-4" />
                                  </motion.button>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-0"
                  >
                    <div className="text-sm sm:text-base text-gray-100">
                      Showing {start + 1} -{" "}
                      {Math.min(start + perPage, filteredFaqs.length)} of{" "}
                      {filteredFaqs.length} questions
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base font-medium ${
                          page === 0
                            ? "text-gray-400 cursor-not-allowed bg-gray-100"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        <ArrowBack className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden xs:inline">Previous</span>
                      </motion.button>

                      <div className="flex items-center space-x-1 sm:space-x-2">
                        {[...Array(totalPages)].map((_, i) => {
                          if (
                            i === 0 ||
                            i === totalPages - 1 ||
                            (i >= page - 1 && i <= page + 1)
                          ) {
                            return (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setPage(i)}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium text-sm sm:text-base ${
                                  page === i
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {i + 1}
                              </motion.button>
                            );
                          } else if (i === page - 2 || i === page + 2) {
                            return (
                              <span key={i} className="px-2 text-gray-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setPage(Math.min(totalPages - 1, page + 1))
                        }
                        disabled={page === totalPages - 1}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base font-medium ${
                          page === totalPages - 1
                            ? "text-gray-400 cursor-not-allowed bg-gray-100"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        <span className="hidden xs:inline">Next</span>
                        <ArrowForward className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Ask Question Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="text-center"
          >
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-blue-100 max-w-3xl mx-auto"
              whileHover={{
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                y: -5,
              }}
            >
              <QuestionAnswer className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our team of experts is
                here to help you with any questions about studying in Asia.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base md:text-lg flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Ask a Question</span>
                <Send className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Question Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={resetQuestionModal}
          >
            <motion.div
              variants={modalContentVariants}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      Ask Your Question
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      Our experts will respond within 24 hours
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetQuestionModal}
                    className="p-1.5 sm:p-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-colors hover:bg-red-600"
                  >
                    <Close className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.button>
                </div>

                {/* Name Field (Optional) */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                    <Email className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" });
                        }
                      }}
                      className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base ${
                        formErrors.email
                          ? "border-red-500 ring-2 ring-red-100"
                          : ""
                      }`}
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                    />
                  </motion.div>
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Question Field */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Question *
                  </label>
                  <motion.textarea
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                      if (formErrors.question) {
                        setFormErrors({ ...formErrors, question: "" });
                      }
                    }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base resize-none ${
                      formErrors.question
                        ? "border-red-500 ring-2 ring-red-100"
                        : ""
                    }`}
                    rows="4"
                    placeholder="Type your detailed question here..."
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {formErrors.question && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    >
                      {formErrors.question}
                    </motion.p>
                  )}
                </div>

                {/* Category Selection */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    <option value="general">General</option>
                    {categories
                      .filter(cat => cat.id !== "all")
                      .map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    }
                  </select>
                </div>

                {/* API status warning */}
                {apiStatus === "offline" && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                      ⚠️ <strong>Note:</strong> The server is currently offline.
                      Please try again later or contact support.
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetQuestionModal}
                    disabled={isSubmitting}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    onClick={handleSubmit}
                    disabled={!question.trim() || !email.trim() || isSubmitting}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base flex-1 sm:flex-none flex items-center justify-center space-x-2 ${
                      !question.trim() || !email.trim() || isSubmitting
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Sending...
                        </motion.span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                        />
                      </>
                    ) : (
                      <>
                        <span>Send Question</span>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Error Status Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeStatusModal}
          >
            <motion.div
              variants={statusModalVariants}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className={`mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${
                    modalType === "success" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {modalType === "success" ? (
                    <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                  ) : (
                    <Error className="h-10 w-10 sm:h-12 sm:w-12 text-red-600" />
                  )}
                </motion.div>

                <h3
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    modalType === "success" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {modalType === "success" ? "Success!" : "Oops!"}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mb-6">
                  {modalMessage}
                </p>

                <div className="flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeStatusModal}
                    className={`px-6 py-3 font-medium rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base ${
                      modalType === "success"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {modalType === "success" ? "Got it!" : "Try Again"}
                  </motion.button>

                  {modalType === "error" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        closeStatusModal();
                        setShowModal(true);
                      }}
                      className="px-6 py-3 font-medium rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Edit Question
                    </motion.button>
                  )}
                </div>

                {/* Auto-close timer */}
                <motion.div
                  className={`mt-6 h-1 rounded-full ${
                    modalType === "success" ? "bg-green-200" : "bg-red-200"
                  }`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};