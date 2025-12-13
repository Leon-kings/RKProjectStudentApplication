/* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/static-components */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   School,
//   Book,
//   Groups,
//   LocationOn,
//   TrendingUp,
//   CheckCircle,
//   Info,
//   Phone,
//   Email,
//   Language,
//   CalendarMonth,
//   Payment,
//   Description,
//   Person,
//   ArrowRight,
//   ExpandMore,
//   Star,
//   People,
//   Timer,
//   LibraryBooks,
//   CorporateFare,
//   Public,
//   Computer,
//   Business,
//   Science,
//   Engineering,
//   MedicalServices,
//   EmojiEvents,
//   ArticleSharp,
//   Close,
//   EventAvailable,
//   Work,
//   Security,
//   VerifiedUser,
//   ContactSupport,
//   WhatsApp,
//   Chat,
//   Schedule,
//   Message,
// } from "@mui/icons-material";

// export const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeModal, setActiveModal] = useState(null);
//   const [contactFormData, setContactFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     interest: "",
//   });

//   // Enhanced slide data with modal content
//   const slides = [
//     {
//       id: 1,
//       title: "Study at Asia's Top Universities",
//       subtitle: "Your Gateway to World-Class Education",
//       description:
//         "Get admission guidance, scholarship assistance, and visa support for premier Asian universities with our expert team guiding you every step of the way.",
//       image:
//         "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2022/11/10081744/4-1.jpg",
//       hoverContent: {
//         title: "500+ Partner Universities",
//         description: "Access to top-ranked institutions across Asia",
//         features: [
//           "Direct admission partnerships",
//           "Priority application processing",
//           "Scholarship coordination",
//           "Alumni network access",
//         ],
//         stats: [
//           { value: "95%", label: "Acceptance Rate" },
//           { value: "48h", label: "Fast Response" },
//           { value: "24/7", label: "Support" },
//         ],
//       },
//       ctaText: "Explore Universities",
//       colorScheme: "blue",
//       modalContent: {
//         title: "University Admissions Program",
//         subtitle: "Comprehensive Support for Top Asian Universities",
//         icon: <School className="w-12 h-12" />,
//         sections: [
//           {
//             title: "University Network",
//             description:
//               "Access our extensive network of prestigious Asian universities",
//             items: [
//               { icon: <CorporateFare />, text: "Top 100 Asian Universities" },
//               { icon: <LocationOn />, text: "15+ Asian Countries Coverage" },
//               { icon: <Star />, text: "Direct Partner Relationships" },
//               { icon: <Public />, text: "Global Recognition & Accreditation" },
//             ],
//           },
//           {
//             title: "Admission Support",
//             description: "End-to-end guidance through the admission process",
//             items: [
//               { icon: <Description />, text: "Application Document Review" },
//               { icon: <CalendarMonth />, text: "Deadline Management" },
//               { icon: <VerifiedUser />, text: "Admission Guarantee Programs" },
//               { icon: <ContactSupport />, text: "24/7 Counselor Support" },
//             ],
//           },
//           {
//             title: "Program Benefits",
//             description: "Exclusive benefits for enrolled students",
//             items: [
//               { icon: <CheckCircle />, text: "95% Admission Success Rate" },
//               { icon: <Timer />, text: "48-hour Application Review" },
//               { icon: <Groups />, text: "Alumni Mentorship Program" },
//               { icon: <Security />, text: "Visa Success Guarantee" },
//             ],
//           },
//         ],
//         testimonials: [
//           {
//             name: "Sarah Chen",
//             university: "Tokyo University",
//             text: "Thanks to their guidance, I got admitted to my dream university with a full scholarship!",
//           },
//           {
//             name: "Raj Patel",
//             university: "NUS Singapore",
//             text: "The application process was seamless. Their experts handled everything professionally.",
//           },
//         ],
//       },
//     },
//     {
//       id: 2,
//       title: "Scholarships Up to 100%",
//       subtitle: "Fully Funded Opportunities Await",
//       description:
//         "Access exclusive scholarships, grants, and financial aid packages tailored for international students from developing countries.",
//       image:
//         "https://images.unsplash.com/photo-1576495199011-ebd36d1d32f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       hoverContent: {
//         title: "Financial Support Programs",
//         description: "Comprehensive funding solutions for your education",
//         features: [
//           "Merit-based scholarships",
//           "Need-based grants",
//           "Research fellowships",
//           "Travel grants available",
//         ],
//         stats: [
//           { value: "$5M+", label: "Awarded" },
//           { value: "85%", label: "Success Rate" },
//           { value: "100+", label: "Sponsors" },
//         ],
//       },
//       ctaText: "Find Scholarships",
//       colorScheme: "purple",
//       modalContent: {
//         title: "Scholarship Assistance Program",
//         subtitle: "Maximize Your Funding Opportunities",
//         icon: <Payment className="w-12 h-12" />,
//         sections: [
//           {
//             title: "Scholarship Types",
//             description: "Various funding options available",
//             items: [
//               { icon: <EmojiEvents />, text: "Merit-Based Scholarships" },
//               { icon: <Person />, text: "Need-Based Financial Aid" },
//               { icon: <Science />, text: "Research Fellowships" },
//               { icon: <TrendingUp />, text: "Travel & Conference Grants" },
//             ],
//           },
//           {
//             title: "Application Support",
//             description: "Expert assistance for scholarship applications",
//             items: [
//               { icon: <Description />, text: "Essay & SOP Writing" },
//               { icon: <Book />, text: "Document Preparation" },
//               { icon: <VerifiedUser />, text: "Recommendation Letters" },
//               { icon: <ContactSupport />, text: "Interview Preparation" },
//             ],
//           },
//           {
//             title: "Success Metrics",
//             description: "Our track record speaks for itself",
//             items: [
//               { icon: <CheckCircle />, text: "$5M+ Awarded Annually" },
//               { icon: <Star />, text: "85% Success Rate" },
//               { icon: <People />, text: "1000+ Funded Students" },
//               { icon: <Timer />, text: "Fast Processing Time" },
//             ],
//           },
//         ],
//         testimonials: [
//           {
//             name: "Amina Hassan",
//             scholarship: "Full Scholarship",
//             text: "Received a full scholarship to Seoul National University. Life-changing!",
//           },
//           {
//             name: "David Kim",
//             scholarship: "Research Grant",
//             text: "Secured a research fellowship at Peking University through their network.",
//           },
//         ],
//       },
//     },
//     {
//       id: 3,
//       title: "Visa & Application Support",
//       subtitle: "End-to-End Expert Assistance",
//       description:
//         "From document preparation to visa interview coaching, we ensure a smooth journey to your dream university abroad.",
//       image:
//         "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       hoverContent: {
//         title: "Complete Application Management",
//         description: "Professional handling of your entire application process",
//         features: [
//           "Document verification",
//           "Visa application filing",
//           "Interview preparation",
//           "Accommodation assistance",
//         ],
//         stats: [
//           { value: "98%", label: "Visa Success" },
//           { value: "1000+", label: "Processed" },
//           { value: "50+", label: "Countries" },
//         ],
//       },
//       ctaText: "Start Application",
//       colorScheme: "green",
//       modalContent: {
//         title: "Visa & Application Services",
//         subtitle: "Hassle-Free Immigration Process",
//         icon: <Description className="w-12 h-12" />,
//         sections: [
//           {
//             title: "Documentation Services",
//             description: "Comprehensive document handling",
//             items: [
//               { icon: <VerifiedUser />, text: "Document Verification" },
//               { icon: <Description />, text: "Application Filing" },
//               { icon: <Security />, text: "Background Check Support" },
//               { icon: <Book />, text: "Academic Transcript Evaluation" },
//             ],
//           },
//           {
//             title: "Visa Assistance",
//             description: "Complete visa processing support",
//             items: [
//               { icon: <EventAvailable />, text: "Appointment Scheduling" },
//               { icon: <ContactSupport />, text: "Interview Preparation" },
//               { icon: <Timer />, text: "Priority Processing" },
//               { icon: <CheckCircle />, text: "98% Success Rate" },
//             ],
//           },
//           {
//             title: "Post-Approval Support",
//             description: "Services after visa approval",
//             items: [
//               { icon: <LocationOn />, text: "Accommodation Assistance" },
//               { icon: <Groups />, text: "Airport Pickup Arrangement" },
//               { icon: <Public />, text: "Cultural Orientation" },
//               { icon: <Phone />, text: "24/7 Emergency Support" },
//             ],
//           },
//         ],
//         testimonials: [
//           {
//             name: "Maria Gonzalez",
//             country: "Studying in Japan",
//             text: "Visa process was completed in record time. Excellent guidance throughout!",
//           },
//           {
//             name: "Wei Zhang",
//             country: "Studying in Singapore",
//             text: "The interview preparation sessions were incredibly helpful. Got my visa approved!",
//           },
//         ],
//       },
//     },
//     {
//       id: 4,
//       title: "Career & Placement Support",
//       subtitle: "Beyond Graduation Success",
//       description:
//         "Connect with global employers and build your international career with our extensive industry partnerships.",
//       image:
//         "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       hoverContent: {
//         title: "Career Development Programs",
//         description: "Building pathways to global employment opportunities",
//         features: [
//           "Internship placements",
//           "Industry mentorship",
//           "Career counseling",
//           "Alumni networking",
//         ],
//         stats: [
//           { value: "90%", label: "Placement Rate" },
//           { value: "200+", label: "Partners" },
//           { value: "10+", label: "Industries" },
//         ],
//       },
//       ctaText: "Career Services",
//       colorScheme: "orange",
//       modalContent: {
//         title: "Career Development Program",
//         subtitle: "Launch Your Global Career",
//         icon: <Work className="w-12 h-12" />,
//         sections: [
//           {
//             title: "Career Services",
//             description: "Comprehensive career development support",
//             items: [
//               { icon: <Groups />, text: "Industry Mentorship" },
//               { icon: <Business />, text: "Internship Placements" },
//               { icon: <Person />, text: "Career Counseling" },
//               { icon: <Public />, text: "Global Job Opportunities" },
//             ],
//           },
//           {
//             title: "Skill Development",
//             description: "Enhance your employability skills",
//             items: [
//               { icon: <Computer />, text: "Technical Skill Workshops" },
//               { icon: <Language />, text: "Language Training" },
//               { icon: <Book />, text: "Resume Building" },
//               { icon: <ContactSupport />, text: "Mock Interviews" },
//             ],
//           },
//           {
//             title: "Network & Connections",
//             description: "Access to extensive professional networks",
//             items: [
//               { icon: <CorporateFare />, text: "200+ Partner Companies" },
//               { icon: <People />, text: "Alumni Network Access" },
//               { icon: <EventAvailable />, text: "Career Fairs & Events" },
//               { icon: <Star />, text: "Industry Leader Sessions" },
//             ],
//           },
//         ],
//         testimonials: [
//           {
//             name: "Kenji Tanaka",
//             position: "Software Engineer at Samsung",
//             text: "The career services helped me secure my dream job right after graduation!",
//           },
//           {
//             name: "Lisa Wong",
//             position: "Research Analyst at HSBC",
//             text: "Industry connections made through their network were invaluable for my career.",
//           },
//         ],
//       },
//     },
//   ];

//   // Contact modal content
//   const contactModalContent = {
//     title: "Contact Us for Free Consultation",
//     subtitle: "Get personalized guidance from our education experts",
//     icon: <ContactSupport className="w-12 h-12" />,
//     contactMethods: [
//       {
//         title: "Schedule a Call",
//         description: "Book a one-on-one consultation with our expert",
//         icon: <Schedule />,
//         action: "Book Now",
//         details: "30-minute free consultation",
//       },
//       {
//         title: "WhatsApp Chat",
//         description: "Instant messaging with our advisors",
//         icon: <WhatsApp />,
//         action: "Chat Now",
//         details: "24/7 support available",
//       },
//       {
//         title: "Email Inquiry",
//         description: "Send us your detailed questions",
//         icon: <Email />,
//         action: "Send Email",
//         details: "Response within 24 hours",
//       },
//       {
//         title: "Live Chat",
//         description: "Real-time chat with our support team",
//         icon: <Chat />,
//         action: "Start Chat",
//         details: "Available 9 AM - 9 PM",
//       },
//     ],
//     supportHours: {
//       title: "Support Hours",
//       items: [
//         { day: "Monday - Friday", hours: "9:00 AM - 9:00 PM" },
//         { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
//         { day: "Sunday", hours: "12:00 PM - 4:00 PM" },
//       ],
//     },
//     contactInfo: {
//       phone: "+1 (555) 123-4567",
//       email: "support@universityguide.com",
//       address: "123 Education Street, Knowledge City, 12345",
//     },
//   };

//   // Auto slide transition
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animation variants
//   const slideVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeInOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: 100,
//       transition: {
//         duration: 0.4,
//       },
//     },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         delay: 0.2,
//       },
//     },
//   };

//   const hoverContentVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.9, y: 50 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.95,
//       y: 30,
//       transition: {
//         duration: 0.3,
//       },
//     },
//   };

//   const statItemVariants = {
//     hidden: { scale: 0, opacity: 0 },
//     visible: (i) => ({
//       scale: 1,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.4,
//       },
//     }),
//   };

//   const featureItemVariants = {
//     hidden: { x: -20, opacity: 0 },
//     visible: (i) => ({
//       x: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.3,
//       },
//     }),
//   };

//   const getColorClasses = (scheme) => {
//     switch (scheme) {
//       case "blue":
//         return {
//           bg: "bg-blue-500",
//           gradient: "from-blue-500 to-blue-400",
//           light: "bg-blue-400/20",
//           text: "text-blue-50",
//           border: "border-blue-400",
//           hoverBg: "bg-blue-300",
//         };

//       case "purple":
//         return {
//           bg: "bg-purple-500",
//           gradient: "from-purple-500 to-purple-400",
//           light: "bg-purple-400/20",
//           text: "text-purple-50",
//           border: "border-purple-400",
//           hoverBg: "bg-purple-300",
//         };

//       case "green":
//         return {
//           bg: "bg-emerald-500",
//           gradient: "from-emerald-500 to-emerald-400",
//           light: "bg-emerald-400/20",
//           text: "text-emerald-50",
//           border: "border-emerald-400",
//           hoverBg: "bg-emerald-300",
//         };

//       case "orange":
//         return {
//           bg: "bg-orange-500",
//           gradient: "from-orange-500 to-orange-400",
//           light: "bg-orange-400/20",
//           text: "text-orange-50",
//           border: "border-orange-400",
//           hoverBg: "bg-orange-300",
//         };

//       default:
//         return {
//           bg: "bg-blue-500",
//           gradient: "from-blue-500 to-blue-400",
//           light: "bg-blue-400/20",
//           text: "text-blue-50",
//           border: "border-blue-400",
//           hoverBg: "bg-blue-600",
//         };
//     }
//   };

//   const openModal = (modalType) => {
//     setActiveModal(modalType);
//   };

//   const openContactModal = () => {
//     setActiveModal("contact");
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//     setContactFormData({
//       name: "",
//       email: "",
//       phone: "",
//       country: "",
//       interest: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setContactFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", contactFormData);
//     alert("Thank you for your inquiry! We will contact you shortly.");
//     closeModal();
//   };

//   // Modal Components
//   const ModalContent = ({ slide }) => {
//     const colors = getColorClasses(slide.colorScheme);

//     return (
//       <motion.div
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
//       >
//         {/* Modal Header */}
//         <div className={`${colors.bg} text-white p-8`}>
//           <div className="flex justify-between items-start">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-white/20 rounded-xl">
//                 {slide.modalContent.icon}
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold mb-2">
//                   {slide.modalContent.title}
//                 </h2>
//                 <p className="text-lg opacity-90">
//                   {slide.modalContent.subtitle}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={closeModal}
//               className="p-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-colors"
//             >
//               <Close className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {/* Sections */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//             {slide.modalContent.sections.map((section, index) => (
//               <div key={index} className="space-y-4">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {section.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{section.description}</p>
//                 <div className="space-y-3">
//                   {section.items.map((item, itemIndex) => (
//                     <div
//                       key={itemIndex}
//                       className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
//                     >
//                       <div className={`p-2 rounded-lg ${colors.bg} text-white`}>
//                         {item.icon}
//                       </div>
//                       <span className="font-medium">{item.text}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Testimonials */}
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               Success Stories
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {slide.modalContent.testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className={`p-6 rounded-xl border ${colors.border} bg-gradient-to-br from-white to-gray-50`}
//                 >
//                   <div className="flex items-center mb-4">
//                     <div
//                       className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center text-white mr-3`}
//                     >
//                       <Person />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-800">
//                         {testimonial.name}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {testimonial.university ||
//                           testimonial.scholarship ||
//                           testimonial.country ||
//                           testimonial.position}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 italic">"{testimonial.text}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div
//             className={`p-6 rounded-2xl bg-gradient-to-r ${colors.gradient}`}
//           >
//             <div className="flex flex-col md:flex-row items-center justify-between">
//               <div className="text-white mb-4 md:mb-0">
//                 <h4 className="text-xl font-bold mb-2">
//                   Ready to Get Started?
//                 </h4>
//                 <p>Schedule a free consultation with our experts</p>
//               </div>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={openContactModal}
//                   className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   Book Consultation
//                 </button>
//                 <button
//                   onClick={() => {
//                     closeModal();
//                   }}
//                   className="px-6 py-3 bg-black/20 text-white font-semibold rounded-lg hover:bg-black/30 transition-colors"
//                 >
//                   Start Application
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   // Contact Modal Component
//   const ContactModal = () => {
//     const colors = getColorClasses("blue");

//     return (
//       <motion.div
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
//       >
//         {/* Modal Header */}
//         <div className={`${colors.bg} text-white p-8`}>
//           <div className="flex justify-between items-start">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-white/20 rounded-xl">
//                 {contactModalContent.icon}
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold mb-2">
//                   {contactModalContent.title}
//                 </h2>
//                 <p className="text-lg opacity-90">
//                   {contactModalContent.subtitle}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={closeModal}
//               className="p-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-colors"
//             >
//               <Close className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Contact Methods */}
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Ways to Contact Us
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {contactModalContent.contactMethods.map((method, index) => (
//                   <div
//                     key={index}
//                     className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors"
//                   >
//                     <div className="flex items-center mb-4">
//                       <div
//                         className={`p-3 rounded-lg ${colors.bg} text-white mr-4`}
//                       >
//                         {method.icon}
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-gray-800">
//                           {method.title}
//                         </h4>
//                         <p className="text-sm text-gray-600">
//                           {method.details}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-gray-700 mb-4">{method.description}</p>
//                     <button
//                       onClick={() => {
//                         switch (method.title) {
//                           case "Schedule a Call":
//                             window.open(
//                               "https://calendly.com/your-link",
//                               "_blank"
//                             );
//                             break;
//                           case "WhatsApp Chat":
//                             window.open("https://wa.me/15551234567", "_blank");
//                             break;
//                           case "Email Inquiry":
//                             window.location.href =
//                               "mailto:support@universityguide.com";
//                             break;
//                           case "Live Chat":
//                             console.log("Opening live chat");
//                             break;
//                           default:
//                             break;
//                         }
//                       }}
//                       className={`w-full py-3 ${colors.bg} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
//                     >
//                       {method.action}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Contact Form */}
//             <div className="space-y-6 overflow-y-auto">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Quick Inquiry Form
//               </h3>
//               <form
//                 onSubmit={handleSubmitForm}
//                 className="space-y-4 overflow-y-auto"
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={contactFormData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={contactFormData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="your@email.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={contactFormData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+1 (555) 123-4567"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Country of Residence *
//                   </label>
//                   <select
//                     name="country"
//                     value={contactFormData.country}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select your country</option>
//                     <option value="USA">United States</option>
//                     <option value="UK">United Kingdom</option>
//                     <option value="Canada">Canada</option>
//                     <option value="Australia">Australia</option>
//                     <option value="India">India</option>
//                     <option value="China">China</option>
//                     <option value="Others">Others</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Area of Interest *
//                   </label>
//                   <select
//                     name="interest"
//                     value={contactFormData.interest}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select your interest</option>
//                     <option value="undergraduate">
//                       Undergraduate Programs
//                     </option>
//                     <option value="graduate">Graduate Programs</option>
//                     <option value="scholarship">Scholarships & Funding</option>
//                     <option value="visa">Visa Assistance</option>
//                     <option value="career">Career Services</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className={`w-full py-4 ${colors.bg} text-white bg-gradient-to-t from-blue-500 to-indigo-400 font-bold text-lg rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2`}
//                 >
//                   <Message className="w-5 h-5" />
//                   <span>Submit Inquiry</span>
//                 </button>

//                 <p className="text-sm text-gray-500 text-center">
//                   We respect your privacy. Your information will not be shared.
//                 </p>
//               </form>
//             </div>
//           </div>

//           {/* Additional Contact Info */}
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-4">
//                 <Phone className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
//                 <h4 className="font-bold text-gray-800">Phone</h4>
//                 <p className="text-gray-600">
//                   {contactModalContent.contactInfo.phone}
//                 </p>
//               </div>

//               <div className="text-center p-4">
//                 <Email className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
//                 <h4 className="font-bold text-gray-800">Email</h4>
//                 <p className="text-gray-600">
//                   {contactModalContent.contactInfo.email}
//                 </p>
//               </div>

//               <div className="text-center p-4">
//                 <LocationOn className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
//                 <h4 className="font-bold text-gray-800">Office</h4>
//                 <p className="text-gray-600">
//                   {contactModalContent.contactInfo.address}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Support Hours */}
//           <div className="mt-6 p-6 bg-gray-50 rounded-xl">
//             <h4 className="font-bold text-gray-800 mb-4 flex items-center">
//               <Timer className="w-5 h-5 mr-2" />
//               {contactModalContent.supportHours.title}
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {contactModalContent.supportHours.items.map((item, index) => (
//                 <div key={index} className="text-center p-3">
//                   <div className="font-medium text-gray-800">{item.day}</div>
//                   <div className="text-gray-600">{item.hours}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <>
//       <section className="relative min-h-screen bg-gray-900 overflow-hidden">
//         <div className="container mx-auto px-4 py-8 lg:py-16">
//           <AnimatePresence mode="wait">
//             {slides.map(
//               (slide, index) =>
//                 index === currentSlide && (
//                   <motion.div
//                     key={slide.id}
//                     variants={slideVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     className="w-full"
//                   >
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[600px]">
//                       {/* Left Column - Featured Content */}
//                       <div className="relative rounded-3xl overflow-hidden group">
//                         {/* Background Image with Overlay */}
//                         <div className="absolute inset-0">
//                           <img
//                             src={slide.image}
//                             alt=""
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                           <div
//                             className={`absolute inset-0 bg-gradient-to-t ${
//                               getColorClasses(slide.colorScheme).bg
//                             }/30 via-black/50 to-transparent`}
//                           />
//                           <div className="absolute inset-0 bg-black/20" />
//                         </div>

//                         {/* Featured Content */}
//                         <div className="relative z-10 h-full p-6 md:p-8 lg:p-10 flex flex-col justify-end">
//                           <motion.div
//                             variants={contentVariants}
//                             className="max-w-lg"
//                           >
//                             <div className="inline-flex items-center space-x-2 mb-4">
//                               <div
//                                 className={`px-4 py-1 rounded-full ${
//                                   getColorClasses(slide.colorScheme).light
//                                 } backdrop-blur-sm`}
//                               >
//                                 <span
//                                   className={`text-sm font-semibold ${
//                                     getColorClasses(slide.colorScheme).text
//                                   }`}
//                                 >
//                                   Featured Program
//                                 </span>
//                               </div>
//                             </div>

//                             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
//                               {slide.title}
//                             </h1>

//                             <p className="text-lg md:text-xl text-gray-200 mb-4">
//                               {slide.subtitle}
//                             </p>

//                             <p className="text-base md:text-lg text-gray-300 mb-8">
//                               {slide.description}
//                             </p>

//                             <div className="flex flex-col sm:flex-row gap-4">
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => openModal(slide.id)}
//                                 className={`px-6 py-3 bg-gradient-to-r ${
//                                   getColorClasses(slide.colorScheme).gradient
//                                 } text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center justify-center space-x-2`}
//                               >
//                                 <span>{slide.ctaText}</span>
//                                 <ArrowRight className="w-5 h-5" />
//                               </motion.button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={openContactModal}
//                                 className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center space-x-2"
//                               >
//                                 <Phone className="w-5 h-5" />
//                                 <span>Free Consultation</span>
//                               </motion.button>
//                             </div>
//                           </motion.div>
//                         </div>

//                         {/* Slide Indicator */}
//                         <div className="absolute bottom-6 right-6 z-20">
//                           <div className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
//                             <span className="font-bold">
//                               {currentSlide + 1}
//                             </span>
//                             <span className="mx-2">/</span>
//                             <span>{slides.length}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right Column - Hover Content (Always Visible) */}
//                       <motion.div
//                         variants={hoverContentVariants}
//                         className="h-full "
//                       >
//                         <div
//                           className={`${
//                             getColorClasses(slide.colorScheme).hoverBg
//                           } backdrop-blur-lg rounded-3xl h-full p-6 md:p-8 lg:p-10`}
//                         >
//                           <div className="h-full flex flex-col">
//                             {/* Title and Description */}
//                             <div className="mb-8">
//                               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                                 {slide.hoverContent.title}
//                               </h3>
//                               <p className="text-gray-200 text-lg">
//                                 {slide.hoverContent.description}
//                               </p>
//                             </div>

//                             {/* Grid Layout for Features and Stats */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-grow">
//                               {/* Features Section */}
//                               <div>
//                                 <h4 className="text-lg font-semibold text-white mb-6 flex items-center pb-3 border-b border-white/20">
//                                   <CheckCircle className="w-5 h-5 mr-2" />
//                                   Key Features
//                                 </h4>
//                                 <ul className="space-y-4 list-none">
//                                   {slide.hoverContent.features.map(
//                                     (feature, i) => (
//                                       <motion.li
//                                         key={i}
//                                         custom={i}
//                                         variants={featureItemVariants}
//                                         initial="hidden"
//                                         animate="visible"
//                                         className="flex items-start"
//                                       >
//                                         <div
//                                           className={`w-2 h-2 rounded-full ${
//                                             getColorClasses(slide.colorScheme)
//                                               .light
//                                           } mt-2 mr-3 flex-shrink-0`}
//                                         />
//                                         <CheckCircle className="w-5 h-5 mr-2" />
//                                         <span>{feature}</span>
//                                       </motion.li>
//                                     )
//                                   )}
//                                 </ul>
//                               </div>

//                               {/* Stats Section */}
//                               <div>
//                                 <h4 className="text-lg font-semibold text-white mb-6 flex items-center pb-3 border-b border-white/20">
//                                   <TrendingUp className="w-5 h-5 mr-2" />
//                                   Performance Metrics
//                                 </h4>
//                                 <div className="grid grid-cols-1 gap-6">
//                                   {slide.hoverContent.stats.map((stat, i) => (
//                                     <motion.div
//                                       key={i}
//                                       custom={i}
//                                       variants={statItemVariants}
//                                       initial="hidden"
//                                       animate="visible"
//                                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                                     >
//                                       <div
//                                         className={`text-3xl font-bold ${
//                                           getColorClasses(slide.colorScheme)
//                                             .text
//                                         } mb-1`}
//                                       >
//                                         {stat.value}
//                                       </div>
//                                       <div className="text-sm text-gray-700">
//                                         {stat.label}
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Additional Info */}
//                             <div className="mt-8 pt-6 border-t border-white/20">
//                               <div className="flex items-center justify-between text-gray-300">
//                                 <div className="flex items-center">
//                                   <Info className="w-4 h-4 mr-2" />
//                                   <span className="text-sm">
//                                     Click for detailed information
//                                   </span>
//                                 </div>
//                                 <motion.button
//                                   whileHover={{ x: 5 }}
//                                   onClick={() => openModal(slide.id)}
//                                   className="text-white hover:text-white/80 transition-colors flex items-center"
//                                 >
//                                   <span className="text-sm font-medium">
//                                     Learn More
//                                   </span>
//                                   <ArrowRight className="w-4 h-4 ml-1" />
//                                 </motion.button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 )
//             )}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* Modal Overlay */}
//       <AnimatePresence>
//         {activeModal && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
//               onClick={closeModal}
//             />
//             <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//               {activeModal === "contact" ? (
//                 <ContactModal />
//               ) : (
//                 <ModalContent
//                   slide={slides.find((s) => s.id === activeModal)}
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  School,
  Book,
  Groups,
  LocationOn,
  TrendingUp,
  CheckCircle,
  Info,
  Phone,
  Email,
  Language,
  CalendarMonth,
  Payment,
  Description,
  Person,
  ArrowRight,
  ExpandMore,
  Star,
  People,
  Timer,
  LibraryBooks,
  CorporateFare,
  Public,
  Computer,
  Business,
  Science,
  Engineering,
  MedicalServices,
  EmojiEvents,
  Close,
  EventAvailable,
  Work,
  Security,
  VerifiedUser,
  ContactSupport,
  WhatsApp,
  Chat,
  Schedule,
  Message,
  RocketLaunch,
  Flag,
  Assignment,
  Translate,
  AirportShuttle,
  Apartment,
  SupportAgent,
  LocalAtm,
  AccessTime,
  Wifi,
  Restaurant,
  LocalLaundryService,
  AssignmentTurnedIn,
  PersonAdd,
  AttachMoney,
  Language as LanguageIcon,
  ConnectWithoutContact,
} from "@mui/icons-material";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    interest: "",
    message: "",
  });

  // RECAPPLY Contact Information
  const recapplyContact = {
    email: "r.educationalconsultance@gmail.com",
    rwandaPhone: "+250 783 408 617",
    chinaPhone: "+86 186 5833 2879",
    whatsapp: "+250783408617",
    office: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
    workingHours: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM",
  };

  // Enhanced slide data with RECAPPLY focus
  const slides = [
    {
      id: 1,
      title: "Study Abroad with RECAPPLY",
      subtitle: "Your Gateway to World-Class Education",
      description:
        "Get comprehensive admission guidance, scholarship assistance, and visa support for top universities worldwide with RECAPPLY's expert team guiding you every step of the way.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      hoverContent: {
        title: "500+ Partner Universities",
        description: "Access to top-ranked institutions across the globe",
        features: [
          "China CSCA specialization",
          "Direct admission partnerships",
          "Priority application processing",
          "Global university network access",
        ],
        stats: [
          { value: "98%", label: "Acceptance Rate", icon: <CheckCircle /> },
          { value: "48h", label: "Fast Response", icon: <Timer /> },
          { value: "24/7", label: "Support", icon: <SupportAgent /> },
        ],
      },
      ctaText: "Explore Universities",
      colorScheme: "blue",
      modalContent: {
        title: "RECAPPLY University Admissions",
        subtitle: "Comprehensive Support for Global Universities",
        icon: <School className="w-12 h-12" />,
        sections: [
          {
            title: "Our University Network",
            description:
              "Access our extensive network of prestigious global universities with special expertise in China",
            items: [
              { icon: <CorporateFare />, text: "Top 500 Global Universities" },
              { icon: <LocationOn />, text: "20+ Countries Coverage" },
              { icon: <Star />, text: "Direct Partner Relationships" },
              { icon: <Public />, text: "Global Recognition & Accreditation" },
            ],
          },
          {
            title: "Admission Support",
            description:
              "End-to-end guidance through the admission process with CSCA specialization",
            items: [
              { icon: <Assignment />, text: "Application Document Review" },
              { icon: <Book />, text: "CSCA Exam Preparation" },
              { icon: <VerifiedUser />, text: "Admission Guarantee Programs" },
              { icon: <ContactSupport />, text: "24/7 Counselor Support" },
            ],
          },
          {
            title: "Program Benefits",
            description: "Exclusive benefits for RECAPPLY students",
            items: [
              { icon: <CheckCircle />, text: "98% Admission Success Rate" },
              { icon: <Timer />, text: "48-hour Application Review" },
              { icon: <Groups />, text: "Alumni Mentorship Program" },
              { icon: <Security />, text: "Visa Success Guarantee" },
            ],
          },
        ],
        testimonials: [
          {
            name: "Sarah Chen",
            university: "Peking University, China",
            text: "Thanks to RECAPPLY's CSCA guidance, I got admitted to my dream university with a full scholarship!",
          },
          {
            name: "David Niyonkuru",
            university: "University of Toronto, Canada",
            text: "The application process was seamless. RECAPPLY experts handled everything professionally.",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Scholarships & Financial Aid",
      subtitle: "Fully Funded Opportunities Worldwide",
      description:
        "Access exclusive scholarships, grants, and financial aid packages tailored for African students with RECAPPLY's specialized guidance.",
      image:
        "https://images.unsplash.com/photo-1576495199011-ebd36d1d32f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      hoverContent: {
        title: "Financial Support Programs",
        description:
          "Comprehensive funding solutions for your education journey",
        features: [
          "China CSC scholarships",
          "Merit-based scholarships",
          "Need-based grants",
          "Research fellowships",
        ],
        stats: [
          { value: "$10M+", label: "Awarded", icon: <AttachMoney /> },
          { value: "85%", label: "Success Rate", icon: <TrendingUp /> },
          { value: "200+", label: "Sponsors", icon: <CorporateFare /> },
        ],
      },
      ctaText: "Find Scholarships",
      colorScheme: "purple",
      modalContent: {
        title: "RECAPPLY Scholarship Assistance",
        subtitle: "Maximize Your Funding Opportunities",
        icon: <LocalAtm className="w-12 h-12" />,
        sections: [
          {
            title: "Scholarship Types",
            description:
              "Various funding options available with China specialization",
            items: [
              { icon: <EmojiEvents />, text: "China CSC Scholarships" },
              { icon: <Person />, text: "Need-Based Financial Aid" },
              { icon: <Science />, text: "Research Fellowships" },
              { icon: <TrendingUp />, text: "University Specific Grants" },
            ],
          },
          {
            title: "Application Support",
            description: "Expert assistance for scholarship applications",
            items: [
              { icon: <Description />, text: "Essay & SOP Writing" },
              { icon: <Book />, text: "Document Preparation" },
              { icon: <VerifiedUser />, text: "Recommendation Letters" },
              { icon: <ContactSupport />, text: "Interview Preparation" },
            ],
          },
          {
            title: "Success Metrics",
            description: "RECAPPLY's track record speaks for itself",
            items: [
              { icon: <CheckCircle />, text: "$10M+ Awarded Annually" },
              { icon: <Star />, text: "85% Success Rate" },
              { icon: <People />, text: "13,000+ Funded Students" },
              { icon: <Timer />, text: "Fast Processing Time" },
            ],
          },
        ],
        testimonials: [
          {
            name: "Amina Hassan",
            scholarship: "Full CSC Scholarship",
            text: "Received a full scholarship to Tsinghua University through RECAPPLY. Life-changing opportunity!",
          },
          {
            name: "James Okafor",
            scholarship: "Canada Research Grant",
            text: "Secured a research fellowship at University of Toronto through RECAPPLY's network.",
          },
        ],
      },
    },
    {
      id: 3,
      title: "China CSCA Exam Preparation",
      subtitle: "Specialized Support for Chinese Universities",
      description:
        "Complete CSCA exam preparation with expert guidance, study materials, and coaching for successful admission to top Chinese universities.",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      hoverContent: {
        title: "CSCA Specialization",
        description:
          "Expert preparation for China Scholastic Competency Assessment",
        features: [
          "Comprehensive study materials",
          "Mock tests & assessments",
          "Chinese language preparation",
          "Exam strategy coaching",
        ],
        stats: [
          { value: "95%", label: "Pass Rate", icon: <CheckCircle /> },
          { value: "2000+", label: "Students", icon: <People /> },
          { value: "12+", label: "Years", icon: <AccessTime /> },
        ],
      },
      ctaText: "Start Preparation",
      colorScheme: "red",
      modalContent: {
        title: "CSCA Exam Preparation Program",
        subtitle: "Expert Guidance for China Admissions",
        icon: <Book className="w-12 h-12" />,
        sections: [
          {
            title: "Exam Components",
            description: "Comprehensive coverage of all CSCA subjects",
            items: [
              { icon: <Science />, text: "Mathematics" },
              { icon: <Engineering />, text: "Physics" },
              { icon: <MedicalServices />, text: "Chemistry" },
              { icon: <LanguageIcon />, text: "Chinese Language" },
            ],
          },
          {
            title: "Preparation Support",
            description: "Complete preparation package for CSCA success",
            items: [
              { icon: <LibraryBooks />, text: "Study Materials & Guides" },
              {
                icon: <AssignmentTurnedIn />,
                text: "Mock Tests & Assessments",
              },
              { icon: <VerifiedUser />, text: "Exam Strategy Sessions" },
              { icon: <ContactSupport />, text: "24/7 Tutor Support" },
            ],
          },
          {
            title: "Program Benefits",
            description: "Why choose RECAPPLY for CSCA preparation",
            items: [
              { icon: <CheckCircle />, text: "95% Pass Rate" },
              { icon: <Star />, text: "Expert Chinese Tutors" },
              { icon: <Timer />, text: "Flexible Schedule" },
              { icon: <Security />, text: "Success Guarantee" },
            ],
          },
        ],
        testimonials: [
          {
            name: "Robert Ndayambaje",
            university: "Zhejiang University",
            text: "RECAPPLY's CSCA preparation was outstanding. Scored 98% and got into my top choice university!",
          },
          {
            name: "Grace Uwimana",
            university: "Fudan University",
            text: "The mock tests and study materials were incredibly helpful for my CSCA preparation.",
          },
        ],
      },
    },
    {
      id: 4,
      title: "Visa & Arrival Support",
      subtitle: "Complete International Student Services",
      description:
        "End-to-end visa processing, accommodation assistance, airport pickup, and cultural orientation for a smooth transition to your study destination.",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      hoverContent: {
        title: "Complete Student Services",
        description: "From visa application to arrival and settlement",
        features: [
          "Visa application support",
          "Accommodation arrangement",
          "Airport pickup service",
          "Cultural orientation",
        ],
        stats: [
          { value: "98%", label: "Visa Success", icon: <VerifiedUser /> },
          { value: "1000+", label: "Processed", icon: <Assignment /> },
          { value: "20+", label: "Countries", icon: <Public /> },
        ],
      },
      ctaText: "Get Support",
      colorScheme: "green",
      modalContent: {
        title: "Visa & Student Support Services",
        subtitle: "Hassle-Free International Education Journey",
        icon: <AirportShuttle className="w-12 h-12" />,
        sections: [
          {
            title: "Visa Services",
            description:
              "Complete visa processing support for multiple countries",
            items: [
              { icon: <Flag />, text: "China X1/X2 Visa" },
              { icon: <VerifiedUser />, text: "Canada Study Permit" },
              { icon: <Security />, text: "USA F-1 Visa" },
              { icon: <Book />, text: "Document Preparation" },
            ],
          },
          {
            title: "Arrival Support",
            description: "Complete assistance upon arrival",
            items: [
              { icon: <AirportShuttle />, text: "Airport Pickup" },
              { icon: <Apartment />, text: "Accommodation Arrangement" },
              { icon: <Timer />, text: "Bank Account Setup" },
              { icon: <Wifi />, text: "Local SIM & Internet" },
            ],
          },
          {
            title: "Settlement Services",
            description: "Help with settling in your new country",
            items: [
              { icon: <LocationOn />, text: "City Orientation" },
              { icon: <Restaurant />, text: "Cultural Adaptation" },
              {
                icon: <LocalLaundryService />,
                text: "Essential Services Setup",
              },
              { icon: <Phone />, text: "24/7 Emergency Support" },
            ],
          },
        ],
        testimonials: [
          {
            name: "Michael Kamanzi",
            country: "Studying in Germany",
            text: "RECAPPLY handled everything from visa to accommodation. Made my transition so smooth!",
          },
          {
            name: "Esther Mwangi",
            country: "Studying in Turkey",
            text: "The airport pickup and orientation were incredibly helpful for settling in.",
          },
        ],
      },
    },
  ];

  // Contact modal content with RECAPPLY focus
  const contactModalContent = {
    title: "Contact RECAPPLY for Free Consultation",
    subtitle:
      "Get personalized guidance from our international education experts",
    icon: <ContactSupport className="w-12 h-12" />,
    contactMethods: [
      {
        title: "WhatsApp Chat",
        description: "Instant messaging with our education advisors",
        icon: <WhatsApp />,
        action: "Chat on WhatsApp",
        details: "24/7 support available",
        actionFunc: () =>
          window.open(`https://wa.me/${recapplyContact.whatsapp}`, "_blank"),
      },
      {
        title: "Schedule a Call",
        description: "Book a one-on-one consultation with our expert",
        icon: <Schedule />,
        action: "Book Consultation",
        details: "30-minute free consultation",
        actionFunc: () =>
          window.open("https://calendly.com/recapply", "_blank"),
      },
      {
        title: "Email Inquiry",
        description: "Send us your detailed questions",
        icon: <Email />,
        action: "Send Email",
        details: "Response within 24 hours",
        // eslint-disable-next-line react-hooks/immutability
        actionFunc: () =>
          (window.location.href = `mailto:${recapplyContact.email}`),
      },
      {
        title: "Phone Call",
        description: "Speak directly with our consultants",
        icon: <Phone />,
        action: "Call Now",
        details: "Rwanda & China offices",
        actionFunc: () =>
          (window.location.href = `tel:${recapplyContact.rwandaPhone}`),
      },
    ],
    supportHours: {
      title: "RECAPPLY Support Hours",
      items: [
        { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
        { day: "Sunday", hours: "Emergency Support Only" },
      ],
    },
    contactInfo: {
      phone: recapplyContact.rwandaPhone,
      chinaPhone: recapplyContact.chinaPhone,
      email: recapplyContact.email,
      address: recapplyContact.office,
    },
  };

  // Auto slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.4,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const hoverContentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 30,
      transition: {
        duration: 0.3,
      },
    },
  };

  const statItemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  const featureItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const getColorClasses = (scheme) => {
    switch (scheme) {
      case "blue":
        return {
          bg: "bg-blue-600",
          gradient: "from-blue-600 to-purple-600",
          light: "bg-blue-400/20",
          text: "text-blue-50",
          border: "border-blue-400",
          hoverBg: "bg-blue-300",
          modalHeader: "bg-gradient-to-r from-blue-600 to-purple-600",
        };
      case "purple":
        return {
          bg: "bg-purple-600",
          gradient: "from-purple-600 to-indigo-600",
          light: "bg-purple-400/20",
          text: "text-purple-50",
          border: "border-purple-400",
          hoverBg: "bg-purple-300",
          modalHeader: "bg-gradient-to-r from-purple-600 to-indigo-600",
        };
      case "red":
        return {
          bg: "bg-red-600",
          gradient: "from-red-600 to-orange-600",
          light: "bg-red-400/20",
          text: "text-red-50",
          border: "border-red-400",
          hoverBg: "bg-red-300",
          modalHeader: "bg-gradient-to-r from-red-600 to-orange-600",
        };
      case "green":
        return {
          bg: "bg-emerald-600",
          gradient: "from-emerald-600 to-green-600",
          light: "bg-emerald-400/20",
          text: "text-emerald-50",
          border: "border-emerald-400",
          hoverBg: "bg-emerald-300",
          modalHeader: "bg-gradient-to-r from-emerald-600 to-green-600",
        };
      default:
        return {
          bg: "bg-blue-600",
          gradient: "from-blue-600 to-purple-600",
          light: "bg-blue-400/20",
          text: "text-blue-50",
          border: "border-blue-400",
          hoverBg: "bg-blue-600",
          modalHeader: "bg-gradient-to-r from-blue-600 to-purple-600",
        };
    }
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const openContactModal = () => {
    setActiveModal("contact");
  };

  const closeModal = () => {
    setActiveModal(null);
    setContactFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      interest: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted to RECAPPLY:", contactFormData);
    alert(
      "Thank you for your inquiry! RECAPPLY team will contact you shortly."
    );
    closeModal();
  };

  // Navigation controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Modal Components
  const ModalContent = ({ slide }) => {
    const colors = getColorClasses(slide.colorScheme);

    return (
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className={`${colors.modalHeader} text-white p-8`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {slide.modalContent.icon}
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <RocketLaunch className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold opacity-90">
                    RECAPPLY
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-1">
                  {slide.modalContent.title}
                </h2>
                <p className="text-lg opacity-90">
                  {slide.modalContent.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full hover:bg-red-600 transition-colors"
            >
              <Close className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {slide.modalContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${colors.bg} text-white`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-800">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              RECAPPLY Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.modalContent.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${colors.border} bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center text-white mr-3`}
                    >
                      <Person />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.university ||
                          testimonial.scholarship ||
                          testimonial.country}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`p-6 rounded-2xl ${colors.modalHeader}`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h4 className="text-xl font-bold mb-2">
                  Ready to Start Your Journey with RECAPPLY?
                </h4>
                <p>
                  Schedule a free consultation with our international education
                  experts
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openContactModal}
                  className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Schedule className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/${recapplyContact.whatsapp}`,
                      "_blank"
                    );
                    closeModal();
                  }}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <WhatsApp className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Contact Modal Component
  const ContactModal = () => {
    const colors = getColorClasses("blue");

    return (
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className={`${colors.modalHeader} text-white p-8`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {contactModalContent.icon}
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <RocketLaunch className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold opacity-90">
                    RECAPPLY
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-1">
                  {contactModalContent.title}
                </h2>
                <p className="text-lg opacity-90">
                  {contactModalContent.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full hover:bg-red-600 transition-colors"
            >
              <Close className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Contact RECAPPLY
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactModalContent.contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-lg ${
                          method.title === "WhatsApp Chat"
                            ? "bg-green-500"
                            : colors.bg
                        } text-white mr-4`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {method.details}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{method.description}</p>
                    <button
                      onClick={method.actionFunc}
                      className={`w-full py-3 ${
                        method.title === "WhatsApp Chat"
                          ? "bg-green-500 hover:bg-green-600"
                          : `${colors.bg} hover:opacity-90`
                      } text-white font-semibold rounded-lg transition-all flex items-center justify-center`}
                    >
                      {method.action}
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  RECAPPLY Quick Stats
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      13,863+
                    </div>
                    <div className="text-sm text-gray-600">Students Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      10+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Inquiry Form
              </h3>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of Interest *
                  </label>
                  <select
                    name="country"
                    value={contactFormData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select country</option>
                    <option value="China">China (CSCA Specialization)</option>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Poland">Poland</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Other">Other Countries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area of Interest *
                  </label>
                  <select
                    name="interest"
                    value={contactFormData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select your interest</option>
                    <option value="university">University Admissions</option>
                    <option value="scholarship">Scholarships & Funding</option>
                    <option value="csca">CSCA Exam Preparation</option>
                    <option value="visa">Visa Processing</option>
                    <option value="accommodation">
                      Accommodation Services
                    </option>
                    <option value="career">Career Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={contactFormData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your study abroad plans..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 ${colors.modalHeader} text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2`}
                >
                  <Message className="w-5 h-5" />
                  <span>Submit to RECAPPLY</span>
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We respect your privacy. Your information will not be shared.
                </p>
              </form>
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Phone className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
                <h4 className="font-bold text-gray-800">Rwanda Office</h4>
                <p className="text-gray-600">
                  {contactModalContent.contactInfo.phone}
                </p>
              </div>

              <div className="text-center p-4">
                <LanguageIcon
                  className={`w-8 h-8 ${colors.text} mx-auto mb-3`}
                />
                <h4 className="font-bold text-gray-800">China Office</h4>
                <p className="text-gray-600">
                  {contactModalContent.contactInfo.chinaPhone}
                </p>
              </div>

              <div className="text-center p-4">
                <Email className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
                <h4 className="font-bold text-gray-800">Email</h4>
                <p className="text-gray-600">
                  {contactModalContent.contactInfo.email}
                </p>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <AccessTime className="w-5 h-5 mr-2 text-blue-600" />
              {contactModalContent.supportHours.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactModalContent.supportHours.items.map((item, index) => (
                <div key={index} className="text-center p-3">
                  <div className="font-medium text-gray-800">{item.day}</div>
                  <div className="text-gray-600">{item.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <section className="relative min-h-screen bg-gray-900 overflow-hidden">
  
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[600px]">
                      {/* Left Column - Featured Content */}
                      <div className="relative rounded-3xl overflow-hidden group">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${
                              getColorClasses(slide.colorScheme).bg
                            }/30 via-black/50 to-transparent`}
                          />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Featured Content */}
                        <div className="relative z-10 h-full p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                          <motion.div
                            variants={contentVariants}
                            className="max-w-lg"
                          >
                            {/* RECAPPLY Badge */}
                            <div className="inline-flex items-center space-x-2 mb-4">
                              <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                                <span className="text-sm font-semibold text-white flex items-center">
                                  <RocketLaunch className="w-4 h-4 mr-2" />
                                  RECAPPLY
                                </span>
                              </div>
                              <div
                                className={`px-4 py-1.5 rounded-full ${
                                  getColorClasses(slide.colorScheme).light
                                } backdrop-blur-sm`}
                              >
                                <span
                                  className={`text-sm font-semibold ${
                                    getColorClasses(slide.colorScheme).text
                                  }`}
                                >
                                  {slide.id === 3
                                    ? "China Specialization"
                                    : "Featured Program"}
                                </span>
                              </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                              {slide.title}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-200 mb-4">
                              {slide.subtitle}
                            </p>

                            <p className="text-base md:text-lg text-gray-300 mb-8">
                              {slide.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openModal(slide.id)}
                                className={`px-6 py-3.5 bg-gradient-to-r ${
                                  getColorClasses(slide.colorScheme).gradient
                                } text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center justify-center space-x-2`}
                              >
                                <span>{slide.ctaText}</span>
                                <ArrowRight className="w-5 h-5" />
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openContactModal}
                                className="px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center space-x-2"
                              >
                                <Phone className="w-5 h-5" />
                                <span>Free Consultation</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>

             
                      </div>

                      {/* Right Column - Hover Content */}
                      <motion.div
                        variants={hoverContentVariants}
                        className="h-full"
                      >
                        <div
                          className={`${
                            getColorClasses(slide.colorScheme).hoverBg
                          } backdrop-blur-lg rounded-3xl h-full p-6 md:p-8 lg:p-10 border border-white/10`}
                        >
                          <div className="h-full flex flex-col">
                            {/* Title and Description */}
                            <div className="mb-8">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {slide.hoverContent.title}
                              </h3>
                              <p className="text-gray-200 text-lg">
                                {slide.hoverContent.description}
                              </p>
                            </div>

                            {/* Grid Layout for Features and Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-grow">
                              {/* Features Section */}
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-6 flex items-center pb-3 border-b border-white/20">
                                  <CheckCircle className="w-5 h-5 mr-2" />
                                  Key Features
                                </h4>
                                <ul className="space-y-4">
                                  {slide.hoverContent.features.map(
                                    (feature, i) => (
                                      <motion.li
                                        key={i}
                                        custom={i}
                                        variants={featureItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex items-start text-white"
                                      >
                                        <div className="w-2 h-2 rounded-full bg-white mt-2 mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                      </motion.li>
                                    )
                                  )}
                                </ul>
                              </div>

                              {/* Stats Section */}
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-6 flex items-center pb-3 border-b border-white/20">
                                  <TrendingUp className="w-5 h-5 mr-2" />
                                  Performance Metrics
                                </h4>
                                <div className="grid grid-cols-1 gap-6">
                                  {slide.hoverContent.stats.map((stat, i) => (
                                    <motion.div
                                      key={i}
                                      custom={i}
                                      variants={statItemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
                                    >
                                      <div className="flex items-center mb-2">
                                        <div
                                          className={`p-2 rounded-lg ${
                                            getColorClasses(slide.colorScheme)
                                              .light
                                          } mr-3`}
                                        >
                                          {stat.icon}
                                        </div>
                                        <div
                                          className={`text-3xl font-bold ${
                                            getColorClasses(slide.colorScheme)
                                              .text
                                          }`}
                                        >
                                          {stat.value}
                                        </div>
                                      </div>
                                      <div className="text-sm text-gray-200 ml-12">
                                        {stat.label}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 pt-6 border-t border-white/20">
                              <div className="flex items-center justify-between text-gray-300">
                                <div className="flex items-center">
                                  <Info className="w-4 h-4 mr-2" />
                                  <span className="text-sm">
                                    Click for detailed information
                                  </span>
                                </div>
                                <motion.button
                                  whileHover={{ x: 5 }}
                                  onClick={() => openModal(slide.id)}
                                  className="text-white hover:text-white/80 transition-colors flex items-center"
                                >
                                  <span className="text-sm font-medium">
                                    Learn More
                                  </span>
                                  <ArrowRight className="w-4 h-4 ml-1" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

        
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
              onClick={closeModal}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              {activeModal === "contact" ? (
                <ContactModal />
              ) : (
                <ModalContent
                  slide={slides.find((s) => s.id === activeModal)}
                />
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
