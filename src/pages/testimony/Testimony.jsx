/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alice M.",
    role: "Client",
    quote:
      "RK Services transformed our workflow. Highly professional and reliable!",
  },
  {
    name: "David K.",
    role: "Partner",
    quote: "Their attention to detail and creative execution is unmatched.",
  },
  {
    name: "Sophia T.",
    role: "Customer",
    quote: "Exceptional service and support. I recommend them to everyone.",
  },
  {
    name: "Sophia T.",
    role: "Customer",
    quote: "Exceptional service and support. I recommend them to everyone.",
  },
  {
    name: "Sophia T.",
    role: "Customer",
    quote: "Exceptional service and support. I recommend them to everyone.",
  },
  {
    name: "Sophia T.",
    role: "Customer",
    quote: "Exceptional service and support. I recommend them to everyone.",
  },
];

// Variants for sliding cards
const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.4,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  }),
};

// Variants for text fade/slide
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Testimony() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Heading with transition */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          custom={0}
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          What People Say About Us
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full"
            >
              {/* Quote */}
              <motion.p
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-gray-700 italic mb-4"
              >
                “{t.quote}”
              </motion.p>

              {/* Name */}
              <motion.h4
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="font-semibold text-blue-600 text-right"
              >
                {t.name}
              </motion.h4>

              {/* Role */}
              <motion.span
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-sm text-gray-500 block text-right"
              >
                {t.role}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
