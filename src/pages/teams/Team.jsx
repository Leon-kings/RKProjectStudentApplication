/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Person,
  Email,
  Phone,
  LinkedIn,
  Twitter,
  Instagram,
  Facebook,
  School as SchoolIcon,
  Work as WorkIcon,
  Language as LanguageIcon,

  PsychologyAlt,
  CorporateFare,
  AttachMoney,
  Translate,
  ConnectWithoutContact,
  Close,
  LocationOn,
  WhatsApp,
  Flag,
  Public,
  Language as LanguageIcon2,
  Timer,
  Map,
  CalendarMonth,
  ArrowUpward,
} from "@mui/icons-material";

export const Team = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: "David Niyonkuru",
      position: "Chief Executive Officer",
      department: "Leadership",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Over 15 years of experience in international education and student placement. Spearheaded RECAPPLY's expansion across Africa with a vision to make quality education accessible to all African students.",
      education: [
        "MBA in International Education Management, Harvard University",
        "BSc in Business Administration, University of Rwanda",
        "Certification in Global Education Leadership, University of Oxford"
      ],
      expertise: [
        "International Education Strategy",
        "University Partnerships",
        "Market Development",
        "Business Expansion",
        "Leadership Development"
      ],
      achievements: [
        "Founded RECAPPLY in 2010",
        "Expanded to 20+ countries",
        "Helped 13,000+ students",
        "Built 500+ university partnerships"
      ],
      languages: ["English", "French", "Kinyarwanda", "Swahili"],
      yearsExperience: 15,
      contact: {
        email: "david.niyonkuru@recapply.com",
        phone: "+250 788 123 456",
        linkedin: "https://linkedin.com/in/davidniyonkuru",
        twitter: "https://twitter.com/davidniyonkuru",
        schedule: "https://calendly.com/david-recapply"
      },
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 2,
      name: "Grace Uwimana",
      position: "Director of Admissions",
      department: "Admissions & Placement",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "10+ years specializing in university admissions and scholarship placements. Has personally guided over 5,000 students to secure admissions in top universities worldwide with a 98% success rate.",
      education: [
        "MSc in Educational Leadership, University of Toronto",
        "BA in International Relations, Makerere University",
        "Certification in Admissions Counseling, NACAC"
      ],
      expertise: [
        "Admissions Strategy",
        "Scholarship Matching",
        "Document Preparation",
        "Interview Coaching",
        "Application Review"
      ],
      achievements: [
        "5,000+ successful admissions",
        "98% admission success rate",
        "$10M+ in scholarships secured",
        "Top performer 5 years running"
      ],
      languages: ["English", "French", "Kinyarwanda"],
      yearsExperience: 10,
      contact: {
        email: "grace.uwimana@recapply.com",
        phone: "+250 788 234 567",
        linkedin: "https://linkedin.com/in/graceuwimana",
        schedule: "https://calendly.com/grace-recapply"
      },
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      name: "James Chen",
      position: "China Education Specialist",
      department: "China Admissions",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Former admission officer at Tsinghua University with 8 years of experience in Chinese education system and CSCA preparation. Fluent in Mandarin and deeply connected with Chinese universities.",
      education: [
        "PhD in Education, Tsinghua University",
        "MA in Chinese Language Education, Beijing University",
        "BSc in Computer Science, Fudan University"
      ],
      expertise: [
        "CSCA Exam Preparation",
        "Chinese University Admissions",
        "Scholarship Applications",
        "Mandarin Tutoring",
        "Cultural Adaptation"
      ],
      achievements: [
        "2,000+ China placements",
        "95% CSCA pass rate",
        "Expert in Chinese scholarship system",
        "Connections with 100+ Chinese universities"
      ],
      languages: ["Mandarin", "English", "French"],
      yearsExperience: 8,
      contact: {
        email: "james.chen@recapply.com",
        phone: "+86 186 5833 2879",
        linkedin: "https://linkedin.com/in/jameschen",
        wechat: "James_Chen_Edu",
        schedule: "https://calendly.com/james-recapply"
      },
      color: "from-red-600 to-orange-600"
    },
    {
      id: 4,
      name: "Sarah Kamau",
      position: "Visa & Compliance Manager",
      department: "Visa Services",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Former visa officer with extensive experience in student visa processing for multiple countries including Canada, UK, USA, and Schengen areas. Specializes in complex cases and appeal processes.",
      education: [
        "LLM in Immigration Law, University of London",
        "BA in Political Science, University of Nairobi",
        "Certification in Visa Processing, IATA"
      ],
      expertise: [
        "Visa Documentation",
        "Compliance Management",
        "Interview Preparation",
        "Appeal Processes",
        "Financial Documentation"
      ],
      achievements: [
        "99% visa success rate",
        "500+ complex cases resolved",
        "Expert in 15+ countries' visa requirements",
        "Zero compliance violations"
      ],
      languages: ["English", "Swahili", "French"],
      yearsExperience: 7,
      contact: {
        email: "sarah.kamau@recapply.com",
        phone: "+250 788 345 678",
        linkedin: "https://linkedin.com/in/sarahkamau",
        schedule: "https://calendly.com/sarah-recapply"
      },
      color: "from-green-600 to-emerald-600"
    },
    {
      id: 5,
      name: "Michael Okafor",
      position: "Student Support Coordinator",
      department: "Student Services",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Dedicated to providing comprehensive pre-departure and post-arrival support to ensure student success abroad. Specializes in cultural adaptation and emergency support coordination.",
      education: [
        "MA in Student Affairs, University of Cape Town",
        "BEd in Guidance & Counseling, University of Lagos",
        "Certification in Crisis Management, Red Cross"
      ],
      expertise: [
        "Student Support",
        "Cultural Adaptation",
        "Accommodation Coordination",
        "Emergency Support",
        "Mental Health Support"
      ],
      achievements: [
        "10,000+ students supported",
        "24/7 emergency hotline",
        "95% student satisfaction rate",
        "Established 200+ accommodation partnerships"
      ],
      languages: ["English", "Yoruba", "French"],
      yearsExperience: 6,
      contact: {
        email: "michael.okafor@recapply.com",
        phone: "+250 788 456 789",
        linkedin: "https://linkedin.com/in/michaelokafor",
        schedule: "https://calendly.com/michael-recapply"
      },
      color: "from-indigo-600 to-blue-600"
    },
    {
      id: 6,
      name: "Amina Diallo",
      position: "Scholarship Coordinator",
      department: "Financial Aid",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Specializes in identifying and securing scholarship opportunities for African students across various disciplines. Has helped students secure over $20 million in scholarships and financial aid.",
      education: [
        "MSc in Educational Finance, University of Oxford",
        "BA in Economics, University of Ghana",
        "Certification in Grant Writing, Stanford University"
      ],
      expertise: [
        "Scholarship Applications",
        "Financial Aid",
        "Grant Writing",
        "Budget Planning",
        "Financial Documentation"
      ],
      achievements: [
        "$20M+ in scholarships secured",
        "500+ full scholarships",
        "Expert in 1000+ scholarship programs",
        "Financial planning workshops"
      ],
      languages: ["English", "French", "Arabic", "Hausa"],
      yearsExperience: 8,
      contact: {
        email: "amina.diallo@recapply.com",
        phone: "+250 788 567 890",
        linkedin: "https://linkedin.com/in/aminadiallo",
        schedule: "https://calendly.com/amina-recapply"
      },
      color: "from-teal-600 to-green-600"
    },
    {
      id: 7,
      name: "Robert Ndayambaje",
      position: "CSCA Exam Trainer",
      department: "Test Preparation",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Specialized in CSCA exam preparation with 5+ years of experience. Develops customized study plans and provides intensive training in Mathematics, Physics, Chemistry, and Chinese language.",
      education: [
        "MSc in Mathematics Education, Peking University",
        "BSc in Physics, University of Rwanda",
        "Certification in Test Preparation, ETS"
      ],
      expertise: [
        "CSCA Mathematics",
        "Physics Training",
        "Chemistry Preparation",
        "Exam Strategies",
        "Mock Test Design"
      ],
      achievements: [
        "98% CSCA pass rate",
        "300+ successful candidates",
        "Customized study materials",
        "Intensive training programs"
      ],
      languages: ["English", "Mandarin", "Kinyarwanda", "French"],
      yearsExperience: 5,
      contact: {
        email: "robert.ndayambaje@recapply.com",
        phone: "+250 788 678 901",
        linkedin: "https://linkedin.com/in/robertndayambaje",
        schedule: "https://calendly.com/robert-recapply"
      },
      color: "from-amber-600 to-orange-600"
    },
    {
      id: 8,
      name: "Esther Mwangi",
      position: "Digital Marketing Manager",
      department: "Marketing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Leads digital marketing efforts to connect with students across Africa. Expert in social media marketing, content creation, and digital outreach strategies for educational services.",
      education: [
        "MBA in Digital Marketing, University of Cape Town",
        "BA in Communications, University of Nairobi",
        "Google Digital Marketing Certification"
      ],
      expertise: [
        "Social Media Marketing",
        "Content Strategy",
        "Brand Management",
        "Student Outreach",
        "Digital Analytics"
      ],
      achievements: [
        "200% social media growth",
        "50,000+ community members",
        "Award-winning campaigns",
        "Increased leads by 300%"
      ],
      languages: ["English", "Swahili", "French"],
      yearsExperience: 6,
      contact: {
        email: "esther.mwangi@recapply.com",
        phone: "+250 788 789 012",
        linkedin: "https://linkedin.com/in/esthermwangi",
        schedule: "https://calendly.com/esther-recapply"
      },
      color: "from-pink-600 to-rose-600"
    }
  ];

  // Departments
  const departments = [
    { name: "Leadership", icon: <CorporateFare />, count: 1 },
    { name: "Admissions", icon: <SchoolIcon />, count: 2 },
    { name: "China Specialists", icon: <LanguageIcon />, count: 2 },
    { name: "Visa Services", icon: <Flag />, count: 1 },
    { name: "Student Support", icon: <ConnectWithoutContact />, count: 2 },
    { name: "Marketing", icon: <PsychologyAlt />, count: 1 }
  ];

  // Contact Information
  const contactInfo = {
    email: "team@recapply.com",
    phone: "+250 783 408 617",
    address: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
    socialMedia: {
      whatsapp: "+250783408617",
      linkedin: "https://linkedin.com/company/recapply",
      twitter: "https://twitter.com/recapply",
      instagram: "https://instagram.com/recapply"
    }
  };

  // Open Team Member Modal
  const openTeamMemberModal = (member) => {
    setModalContent({
      type: "teamMember",
      data: member,
    });
    setActiveModal(true);
  };

  // Open Contact Modal
  const openContactModal = () => {
    setModalContent({
      type: "contact",
      title: "Contact Our Team",
    });
    setActiveModal(true);
  };

  // Render modal
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
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            className={`sticky top-0 bg-gradient-to-r ${
              modalContent.data?.color || "from-blue-500 to-purple-500"
            } p-3 xs:p-4 sm:p-6 text-white`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold truncate">
                  {modalContent.title || modalContent.data?.name}
                </h3>
                {modalContent.data?.position && (
                  <p className="text-sm xs:text-base text-white/90 truncate">
                    {modalContent.data.position}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="ml-2 p-1 xs:p-2 hover:bg-white/10 rounded-full flex-shrink-0"
              >
                <Close className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-3 xs:p-4 sm:p-6">
            {modalContent.type === "teamMember" && modalContent.data && (
              <div className="space-y-4 xs:space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start gap-4 xs:gap-6">
                  <div className="mx-auto sm:mx-0">
                    <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={modalContent.data.image}
                        alt={modalContent.data.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-3 xs:mb-4">
                      <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                        {modalContent.data.name}
                      </h4>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r bg-gray-100 text-gray-700 text-sm">
                          {modalContent.data.department}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                          <Timer className="w-3 h-3 mr-1" />
                          {modalContent.data.yearsExperience} years
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 xs:gap-3">
                      {modalContent.data.contact.email && (
                        <a
                          href={`mailto:${modalContent.data.contact.email}`}
                          className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          <Email className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      )}
                      {modalContent.data.contact.schedule && (
                        <a
                          href={modalContent.data.contact.schedule}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                        >
                          <CalendarMonth className="w-4 h-4 mr-2" />
                          Schedule
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h5 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                    <Person className="w-5 h-5 mr-2 text-blue-600" />
                    Professional Bio
                  </h5>
                  <p className="text-gray-600">{modalContent.data.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  {/* Education */}
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                      <SchoolIcon className="w-5 h-5 mr-2 text-purple-600" />
                      Education
                    </h5>
                    <ul className="space-y-2">
                      {modalContent.data.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</div>
                          <span className="text-gray-700 text-sm xs:text-base">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                      <WorkIcon className="w-5 h-5 mr-2 text-orange-600" />
                      Expertise
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {modalContent.data.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs xs:text-sm"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                      <ArrowUpward className="w-5 h-5 mr-2 text-amber-600" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {modalContent.data.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0">★</div>
                          <span className="text-gray-700 text-sm xs:text-base">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages */}
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                      <LanguageIcon2 className="w-5 h-5 mr-2 text-green-600" />
                      Languages
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {modalContent.data.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs xs:text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 xs:p-6">
                  <h5 className="font-bold text-gray-800 mb-3 text-lg">Contact Details</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                    {modalContent.data.contact.email && (
                      <div className="flex items-center">
                        <Email className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-600">Email</p>
                          <a
                            href={`mailto:${modalContent.data.contact.email}`}
                            className="text-blue-600 hover:text-blue-800 truncate block"
                          >
                            {modalContent.data.contact.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {modalContent.data.contact.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <a
                            href={`tel:${modalContent.data.contact.phone}`}
                            className="text-green-600 hover:text-green-800"
                          >
                            {modalContent.data.contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {modalContent.data.contact.linkedin && (
                      <div className="flex items-center">
                        <LinkedIn className="w-5 h-5 text-blue-700 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">LinkedIn</p>
                          <a
                            href={modalContent.data.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                          >
                            Connect on LinkedIn
                          </a>
                        </div>
                      </div>
                    )}

                    {modalContent.data.contact.wechat && (
                      <div className="flex items-center">
                        <Chat className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">WeChat</p>
                          <span className="text-gray-700">{modalContent.data.contact.wechat}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modalContent.type === "contact" && (
              <div className="space-y-4 xs:space-y-6">
                <div>
                  <h4 className="text-xl xs:text-2xl font-bold text-gray-800 mb-4">
                    Get in Touch with Our Team
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Our team is ready to assist you with your international education journey. 
                    Feel free to reach out through any of the following channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-3 text-lg">Contact Information</h5>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Email className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">Team Email</p>
                          <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-800">
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">Support Line</p>
                          <a href={`tel:${contactInfo.phone}`} className="text-green-600 hover:text-green-800">
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <LocationOn className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">Head Office</p>
                          <p className="text-gray-600">{contactInfo.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-800 mb-3 text-lg">Connect With Us</h5>
                    <div className="flex space-x-3">
                      <a
                        href={`https://wa.me/${contactInfo.socialMedia.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
                      >
                        <WhatsApp className="w-5 h-5" />
                      </a>
                      <a
                        href={contactInfo.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all"
                      >
                        <LinkedIn className="w-5 h-5" />
                      </a>
                      <a
                        href={contactInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <div className="mt-6">
                      <h6 className="font-medium text-gray-700 mb-2">Department Contacts</h6>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          • Admissions: admissions@recapply.com
                        </p>
                        <p className="text-sm text-gray-600">
                          • Visa Support: visa@recapply.com
                        </p>
                        <p className="text-sm text-gray-600">
                          • Scholarships: scholarships@recapply.com
                        </p>
                      </div>
                    </div>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-8 md:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8 md:mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
              >
                <span className="text-gray-900">MEET THE </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  RECAPPLY TEAM
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base xs:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-3"
              >
                Our team of dedicated professionals brings decades of combined experience in international education, 
                admissions, visa processing, and student support to guide you every step of the way.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                OUR DEPARTMENTS
              </span>
            </h2>
            <p className="text-gray-600 text-base xs:text-lg md:text-xl max-w-3xl mx-auto px-3">
              8 experts across 6 specialized departments working together for your success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 xs:gap-4 md:gap-6 max-w-6xl mx-auto">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl xs:rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 mb-3">
                  <div className="w-6 h-6 xs:w-8 xs:h-8">{dept.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm xs:text-base mb-1">{dept.name}</h3>
                <p className="text-blue-600 font-semibold text-xs xs:text-sm">{dept.count} Expert{dept.count > 1 ? 's' : ''}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                OUR EXPERT TEAM
              </span>
            </h2>
            <p className="text-gray-600 text-base xs:text-lg md:text-xl max-w-3xl mx-auto px-3">
              Meet the professionals dedicated to making your study abroad dreams a reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl xs:rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-200 group"
              >
                {/* Color Bar */}
                <div className={`h-2 bg-gradient-to-r ${member.color}`} />
                
                <div className="p-4 xs:p-6">
                  {/* Profile Image and Info */}
                  <div className="flex items-start mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r bg-white border-2 border-white shadow-sm flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${member.color}`} />
                      </div>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 truncate">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-medium text-sm xs:text-base truncate">
                        {member.position}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {member.department}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          {member.yearsExperience}yrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  <p className="text-gray-600 text-sm xs:text-base mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 3).map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {exp}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{member.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openTeamMemberModal(member)}
                    className={`w-full py-2 xs:py-3 rounded-lg font-medium hover:shadow-lg transition-all text-sm xs:text-base bg-gradient-to-r ${member.color} text-white`}
                  >
                    View Full Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                8
              </div>
              <div className="text-sm xs:text-base md:text-lg font-semibold text-blue-200">
                Expert Team Members
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                69+
              </div>
              <div className="text-sm xs:text-base md:text-lg font-semibold text-blue-200">
                Combined Years Experience
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                15+
              </div>
              <div className="text-sm xs:text-base md:text-lg font-semibold text-blue-200">
                Languages Spoken
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-sm xs:text-base md:text-lg font-semibold text-blue-200">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 md:p-12 text-white text-center"
            >
              <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Ready to Work With Our Team?
              </h2>
              
              <p className="text-blue-100 mb-6 md:mb-8 text-base xs:text-lg md:text-xl">
                Schedule a consultation with one of our experts or contact our team for more information
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openContactModal}
                  className="bg-white text-blue-900 px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Contact Our Team
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://calendly.com/recapply', '_blank')}
                  className="bg-transparent border-2 border-white text-white px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Book Consultation
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