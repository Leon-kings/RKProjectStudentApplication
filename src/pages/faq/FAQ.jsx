/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, Close, QuestionAnswer, Send } from "@mui/icons-material";


const faqs = [
  {
    id: 1,
    question: "What documents are required to apply for Asian universities?",
    answer: "Most universities require transcripts, recommendation letters, proof of English proficiency, and a statement of purpose. Some may also require standardized test scores like SAT, GRE, or GMAT depending on the program.",
    category: "admissions",
    expanded: false
  },
  {
    id: 2,
    question: "How can I book accommodation before arriving?",
    answer: "Universities often provide on-campus housing. You can also book private accommodation via trusted platforms. Many universities have dedicated international student housing offices to assist with accommodation arrangements.",
    category: "accommodation",
    expanded: false
  },
  {
    id: 3,
    question: "What is the process for visa application?",
    answer: "Apply at the embassy with your admission letter, passport, financial proof, and medical certificates. The process typically takes 4-8 weeks, so apply well in advance of your program start date.",
    category: "visa",
    expanded: false
  },
  {
    id: 4,
    question: "Can I work part-time while studying?",
    answer: "Many Asian countries allow part-time work with restrictions (e.g., 20 hours per week). However, regulations vary by country, so check with your university's international student office for specific guidelines.",
    category: "work",
    expanded: false
  },
  {
    id: 5,
    question: "When should I start preparing my application?",
    answer: "Start 9–12 months before intake to prepare documents and meet deadlines. This gives you ample time for test preparation, document gathering, and application submission.",
    category: "planning",
    expanded: false
  },
  {
    id: 6,
    question: "Do universities provide support for international students?",
    answer: "Yes, most have international student offices for orientation, housing, and visa support. They also offer cultural adaptation programs, language support, and academic advising specifically for international students.",
    category: "support",
    expanded: false
  },
  {
    id: 7,
    question: "How do I secure scholarships or financial aid?",
    answer: "Check university websites for merit-based scholarships and external funding opportunities. Many governments and private organizations also offer scholarships for international students studying in Asia.",
    category: "funding",
    expanded: false
  },
  {
    id: 8,
    question: "Is health insurance mandatory?",
    answer: "Yes, most countries require international students to have valid health insurance. Universities often provide affordable health insurance plans specifically designed for international students.",
    category: "health",
    expanded: false
  },
  {
    id: 9,
    question: "Can I extend my visa after graduation?",
    answer: "Some countries allow extensions for job hunting or work permits. Many Asian countries offer post-study work visas to help graduates transition into the local workforce.",
    category: "visa",
    expanded: false
  },
  {
    id: 10,
    question: "How do I adapt to cultural differences?",
    answer: "Join student clubs, attend orientation, and engage with local communities. Universities often offer cultural workshops and language exchange programs to help international students adjust.",
    category: "culture",
    expanded: false
  },
  {
    id: 11,
    question: "What language requirements are needed?",
    answer: "Requirements vary by country and program. Some programs require English proficiency tests (TOEFL/IELTS), while others may require local language proficiency.",
    category: "language",
    expanded: false
  },
  {
    id: 12,
    question: "How much does it cost to study in Asia?",
    answer: "Costs vary by country and institution. Generally, tuition ranges from $3,000 to $20,000 per year, with living expenses adding $500-$1,500 per month depending on location.",
    category: "cost",
    expanded: false
  },
  {
    id: 13,
    question: "Are there any age restrictions for international students?",
    answer: "Most universities don't have strict age limits, but some programs may have specific requirements. Generally, as long as you meet academic requirements, age is not a barrier.",
    category: "eligibility",
    expanded: false
  },
  {
    id: 14,
    question: "How do I get my educational documents evaluated?",
    answer: "Many universities require credential evaluation services. Check with your target universities for their preferred evaluation services and procedures.",
    category: "documents",
    expanded: false
  },
  {
    id: 15,
    question: "Can I bring my family with me?",
    answer: "This depends on the country's immigration policies. Some allow dependent visas for spouses and children, while others have restrictions.",
    category: "family",
    expanded: false
  },
  {
    id: 16,
    question: "What is the academic calendar in Asian universities?",
    answer: "Most follow a semester system (Fall and Spring). Some countries like Japan have April intake, while others like China have September intake.",
    category: "academics",
    expanded: false
  },
];

const faqVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export const FAQ = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Questions", count: faqs.length },
    { id: "admissions", name: "Admissions", count: faqs.filter(f => f.category === "admissions").length },
    { id: "visa", name: "Visa", count: faqs.filter(f => f.category === "visa").length },
    { id: "accommodation", name: "Accommodation", count: faqs.filter(f => f.category === "accommodation").length },
    { id: "funding", name: "Funding", count: faqs.filter(f => f.category === "funding").length },
    { id: "work", name: "Work", count: faqs.filter(f => f.category === "work").length },
  ];

  const perPage = 8;
  const start = page * perPage;

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentFaqs = filteredFaqs.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredFaqs.length / perPage);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://your-api-server.com/api/submit-question",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        }
      );
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setShowModal(false);
          setStatus(null);
          setQuestion("");
        }, 2000);
      } else {
        setStatus("fail");
      }
    } catch (err) {
      setStatus("fail");
    }
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <div className="inline-block mb-3 sm:mb-4">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <QuestionAnswer className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-3/4 mx-auto" />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-4 sm:mt-6"
          >
            Get answers to common questions about studying in Asia. Can't find what you're looking for? Ask our experts directly!
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="relative max-w-2xl mx-auto px-2">
            <div className="relative">
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
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Close className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setPage(0);
                }}
                className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-1.5 sm:space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 shadow-sm'
                }`}
              >
                <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {category.name}
                </span>
                <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <QuestionAnswer className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
              <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                {currentFaqs.map((faq, i) => (
                  <motion.div
                    key={faq.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={faqVariants}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full text-left p-4 sm:p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                              faq.category === 'admissions' ? 'bg-blue-100 text-blue-600' :
                              faq.category === 'visa' ? 'bg-green-100 text-green-600' :
                              faq.category === 'accommodation' ? 'bg-purple-100 text-purple-600' :
                              faq.category === 'funding' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {categories.find(c => c.id === faq.category)?.name || faq.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl mb-2 pr-8">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {expandedId === faq.id ? (
                            <ArrowUpward className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                          ) : (
                            <ArrowDownward className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {expandedId === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuestion(faq.question);
                                setShowModal(true);
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                            >
                              <span>Need more help?</span>
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </button>
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
                  <div className="text-sm sm:text-base text-gray-600">
                    Showing {start + 1} - {Math.min(start + perPage, filteredFaqs.length)} of {filteredFaqs.length} questions
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base font-medium ${
                        page === 0
                          ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      <ArrowBack className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden xs:inline">Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {[...Array(totalPages)].map((_, i) => {
                        if (
                          i === 0 ||
                          i === totalPages - 1 ||
                          (i >= page - 1 && i <= page + 1)
                        ) {
                          return (
                            <button
                              key={i}
                              onClick={() => setPage(i)}
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium text-sm sm:text-base ${
                                page === i
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {i + 1}
                            </button>
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
                    
                    <button
                      onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                      disabled={page === totalPages - 1}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base font-medium ${
                        page === totalPages - 1
                          ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      <span className="hidden xs:inline">Next</span>
                      <ArrowForward className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-blue-100 max-w-3xl mx-auto">
            <QuestionAnswer className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team of experts is here to help you with any questions about studying in Asia.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base md:text-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Ask a Question</span>
              <Send className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Ask Your Question</h3>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">Our experts will respond within 24 hours</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setStatus(null);
                      setQuestion("");
                    }}
                    className="p-1.5 sm:p-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-colors"
                  >
                    <Close className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Question *
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base resize-none"
                    rows="4"
                    placeholder="Type your detailed question here..."
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Please provide as much detail as possible for a comprehensive answer
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setStatus(null);
                      setQuestion("");
                    }}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!question.trim()}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base flex-1 sm:flex-none flex items-center justify-center space-x-2 ${
                      question.trim()
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Send Question</span>
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 font-medium text-sm sm:text-base">
                        Question sent successfully! We'll get back to you soon.
                      </span>
                    </div>
                  </motion.div>
                )}
                
                {status === "fail" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-red-700 font-medium text-sm sm:text-base">
                        Failed to send question. Please try again.
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};