/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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

// Separate Contact Form Component to prevent re-renders
const ContactForm = React.memo(
  ({ formData, onInputChange, onSubmit, colors }) => {
    console.log("ContactForm rendering with data:", formData.name); // Debug log

    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
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
              value={formData.email}
              onChange={onInputChange}
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
              value={formData.phone}
              onChange={onInputChange}
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
            value={formData.country}
            onChange={onInputChange}
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
            value={formData.interest}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select your interest</option>
            <option value="university">University Admissions</option>
            <option value="scholarship">Scholarships & Funding</option>
            <option value="csca">CSCA Exam Preparation</option>
            <option value="visa">Visa Processing</option>
            <option value="accommodation">Accommodation Services</option>
            <option value="career">Career Support</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onInputChange}
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
    );
  }
);

ContactForm.displayName = "ContactForm";

// Separate Contact Modal Component
const ContactModalComponent = React.memo(
  ({
    isOpen,
    onClose,
    contactModalContent,
    contactFormData,
    handleInputChange,
    handleSubmitForm,
    getColorClasses,
    recapplyContact,
  }) => {
    console.log("ContactModalComponent rendering"); // Debug log

    if (!isOpen) return null;

    const colors = getColorClasses("blue");

    return (
      <motion.div
        variants={{
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
        }}
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
              onClick={onClose}
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

            {/* Quick Contact Form - Using separate component */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Inquiry Form
              </h3>
              <ContactForm
                formData={contactFormData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmitForm}
                colors={colors}
              />
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
  }
);

ContactModalComponent.displayName = "ContactModalComponent";

// Separate Modal Content Component
const ModalContentComponent = React.memo(
  ({ slide, onClose, openContactModal, recapplyContact, getColorClasses }) => {
    const colors = getColorClasses(slide.colorScheme);

    return (
      <motion.div
        variants={{
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
        }}
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
              onClick={onClose}
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
                    onClose();
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
  }
);

ModalContentComponent.displayName = "ModalContentComponent";

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

  // Ref to track if modal is open
  const modalOpenRef = useRef(false);
  // Ref to track auto-slide interval
  const intervalRef = useRef(null);

  // RECAPPLY Contact Information
  const recapplyContact = useMemo(
    () => ({
      email: "r.educationalconsultance@gmail.com",
      rwandaPhone: "+250 783 408 617",
      chinaPhone: "+86 186 5833 2879",
      whatsapp: "+250783408617",
      office: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
      workingHours: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM",
    }),
    []
  );

  // Enhanced slide data with RECAPPLY focus
  const slides = useMemo(
    () => [
      {
        id: 1,
        title: "Study Abroad with RECAPPLY",
        subtitle: "Your Gateway to World-Class Education",
        description:
          "Get comprehensive admission guidance, scholarship assistance, and visa support for top universities worldwide with RECAPPLY's expert team guiding you every step of the way.",
        image:
          "https://westminster.ac.th/wp-content/uploads/2025/02/Frame-1000007644.png",
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
                {
                  icon: <CorporateFare />,
                  text: "Top 500 Global Universities",
                },
                { icon: <LocationOn />, text: "20+ Countries Coverage" },
                { icon: <Star />, text: "Direct Partner Relationships" },
                {
                  icon: <Public />,
                  text: "Global Recognition & Accreditation",
                },
              ],
            },
            {
              title: "Admission Support",
              description:
                "End-to-end guidance through the admission process with CSCA specialization",
              items: [
                { icon: <Assignment />, text: "Application Document Review" },
                { icon: <Book />, text: "CSCA Exam Preparation" },
                {
                  icon: <VerifiedUser />,
                  text: "Admission Guarantee Programs",
                },
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
          "https://daadscholarship.com/wp-content/uploads/2025/11/Fully-Funded-Scholarships-2026-Worldwide-Openings.jpg",
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
          "https://www.china-admissions.com/wp-content/uploads/2024/12/Westlake-Uni-campus.png",
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
    ],
    []
  );

  // Contact modal content with RECAPPLY focus
  const contactModalContent = useMemo(
    () => ({
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
    }),
    [recapplyContact]
  );

  // Auto slide transition - STOPS when modal is open
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only start auto-slide if no modal is open
    if (!modalOpenRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length, modalOpenRef.current]);

  // Update modal open ref when activeModal changes
  useEffect(() => {
    modalOpenRef.current = !!activeModal;

    // If modal opens, stop auto-slide
    if (activeModal) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      // If modal closes, restart auto-slide
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
      }
    }
  }, [activeModal, slides.length]);

  // Animation variants - memoized to prevent re-renders
  const slideVariants = useMemo(
    () => ({
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
    }),
    []
  );

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: 0.2,
        },
      },
    }),
    []
  );

  const hoverContentVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const getColorClasses = useCallback((scheme) => {
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
  }, []);

  const openModal = useCallback((modalType) => {
    setActiveModal(modalType);
  }, []);

  const openContactModal = useCallback(() => {
    setActiveModal("contact");
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setContactFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      interest: "",
      message: "",
    });
  }, []);

  // Optimized input change handler with useCallback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Form submitted to RECAPPLY:", contactFormData);
      alert(
        "Thank you for your inquiry! RECAPPLY team will contact you shortly."
      );
      closeModal();
    },
    [contactFormData, closeModal]
  );

  // Navigation controls
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Memoized current slide content
  const currentSlideData = useMemo(
    () => slides[currentSlide],
    [currentSlide, slides]
  );

  // Get the current modal slide
  const currentModalSlide = useMemo(
    () =>
      activeModal && activeModal !== "contact"
        ? slides.find((s) => s.id === activeModal)
        : null,
    [activeModal, slides]
  );

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 overflow-hidden">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideData.id}
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
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        getColorClasses(currentSlideData.colorScheme).bg
                      }/30 via-black/50 to-transparent`}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Featured Content */}
                  <div className="relative z-10 h-full p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                    <motion.div variants={contentVariants} className="max-w-lg">
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
                            getColorClasses(currentSlideData.colorScheme).light
                          } backdrop-blur-sm`}
                        >
                          <span
                            className={`text-sm font-semibold ${
                              getColorClasses(currentSlideData.colorScheme).text
                            }`}
                          >
                            {currentSlideData.id === 3
                              ? "China Specialization"
                              : "Featured Program"}
                          </span>
                        </div>
                      </div>

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {currentSlideData.title}
                      </h1>

                      <p className="text-lg md:text-xl text-gray-200 mb-4">
                        {currentSlideData.subtitle}
                      </p>

                      <p className="text-base md:text-lg text-gray-300 mb-8">
                        {currentSlideData.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal(currentSlideData.id)}
                          className={`px-6 py-3.5 bg-gradient-to-r ${
                            getColorClasses(currentSlideData.colorScheme)
                              .gradient
                          } text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center justify-center space-x-2`}
                        >
                          <span>{currentSlideData.ctaText}</span>
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
                <motion.div variants={hoverContentVariants} className="h-full">
                  <div
                    className={`${
                      getColorClasses(currentSlideData.colorScheme).hoverBg
                    } backdrop-blur-lg rounded-3xl h-full p-6 md:p-8 lg:p-10 border border-white/10`}
                  >
                    <div className="h-full flex flex-col">
                      {/* Title and Description */}
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {currentSlideData.hoverContent.title}
                        </h3>
                        <p className="text-gray-200 text-lg">
                          {currentSlideData.hoverContent.description}
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
                            {currentSlideData.hoverContent.features.map(
                              (feature, i) => (
                                <motion.li
                                  key={i}
                                  custom={i}
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
                            {currentSlideData.hoverContent.stats.map(
                              (stat, i) => (
                                <motion.div
                                  key={i}
                                  custom={i}
                                  initial="hidden"
                                  animate="visible"
                                  className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
                                >
                                  <div className="flex items-center mb-2">
                                    <div
                                      className={`p-2 rounded-lg ${
                                        getColorClasses(
                                          currentSlideData.colorScheme
                                        ).light
                                      } mr-3`}
                                    >
                                      {stat.icon}
                                    </div>
                                    <div
                                      className={`text-3xl font-bold ${
                                        getColorClasses(
                                          currentSlideData.colorScheme
                                        ).text
                                      }`}
                                    >
                                      {stat.value}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-200 ml-12">
                                    {stat.label}
                                  </div>
                                </motion.div>
                              )
                            )}
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
                            onClick={() => openModal(currentSlideData.id)}
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
                <ContactModalComponent
                  isOpen={true}
                  onClose={closeModal}
                  contactModalContent={contactModalContent}
                  contactFormData={contactFormData}
                  handleInputChange={handleInputChange}
                  handleSubmitForm={handleSubmitForm}
                  getColorClasses={getColorClasses}
                  recapplyContact={recapplyContact}
                />
              ) : currentModalSlide ? (
                <ModalContentComponent
                  slide={currentModalSlide}
                  onClose={closeModal}
                  openContactModal={openContactModal}
                  recapplyContact={recapplyContact}
                  getColorClasses={getColorClasses}
                />
              ) : null}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
