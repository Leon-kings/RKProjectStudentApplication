/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What documents are required to apply for Asian universities?",
    answer:
      "Most universities require transcripts, recommendation letters, proof of English proficiency, and a statement of purpose.",
  },
  {
    question: "How can I book accommodation before arriving?",
    answer:
      "Universities often provide on-campus housing. You can also book private accommodation via trusted platforms.",
  },
  {
    question: "What is the process for visa application?",
    answer:
      "Apply at the embassy with your admission letter, passport, financial proof, and medical certificates.",
  },
  {
    question: "Can I work part-time while studying?",
    answer:
      "Many Asian countries allow part-time work with restrictions (e.g., 20 hours per week).",
  },
  {
    question: "When should I start preparing my application?",
    answer:
      "Start 9–12 months before intake to prepare documents and meet deadlines.",
  },
  {
    question: "Do universities provide support for international students?",
    answer:
      "Yes, most have international student offices for orientation, housing, and visa support.",
  },
  {
    question: "How do I secure scholarships or financial aid?",
    answer:
      "Check university websites for merit-based scholarships and external funding opportunities.",
  },
  {
    question: "Is health insurance mandatory?",
    answer:
      "Yes, most countries require international students to have valid health insurance.",
  },
  {
    question: "Can I extend my visa after graduation?",
    answer: "Some countries allow extensions for job hunting or work permits.",
  },
  {
    question: "How do I adapt to cultural differences?",
    answer:
      "Join student clubs, attend orientation, and engage with local communities.",
  },
  // Add more FAQs as needed
];

const faqVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export const FAQ = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState(null);

  const perPage = 8;
  const start = page * perPage;
  const currentFaqs = faqs.slice(start, start + perPage);

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
      } else {
        setStatus("fail");
      }
    } catch (err) {
      setStatus("fail");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-gray-100 to-purple-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={faqVariants}
          custom={0}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {currentFaqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={faqVariants}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <motion.h3
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={faqVariants}
                className="font-semibold text-lg text-blue-600 mb-2"
              >
                {faq.question}
              </motion.h3>
              <motion.p
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={faqVariants}
                className="text-gray-700"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-4">
          {page > 0 && (
            <button
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {start + perPage < faqs.length && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>

        {/* Ask Question Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:opacity-90"
          >
            Ask a Question
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Submit Your Question</h3>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border rounded p-2 mb-4"
                rows="4"
                placeholder="Type your question here..."
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>

              {/* Status Modal */}
              {status === "success" && (
                <p className="mt-4 text-green-600">
                  ✅ Question sent successfully!
                </p>
              )}
              {status === "fail" && (
                <p className="mt-4 text-red-600">
                  ❌ Failed to send question. Try again.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
