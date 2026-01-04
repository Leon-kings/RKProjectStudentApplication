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

  // Team Members Data - Only 3 members
  const teamMembers = [
    {
      id: 1,
      name: "KING RUZIGA",
      position: "Chief Executive Officer",
      department: "Leadership",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Visionary leader with extensive experience in international education consulting. Founded RECApply to bridge the gap between African students and global educational opportunities.",
      contact: {
        email: "r.educationalconsultance@gmail.com",
        phone: "+8618658332879",
      },
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 2,
      name: "MANZI ALI SHARIF",
      position: "Admission Officer",
      department: "Admissions",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Dedicated admission specialist with expertise in guiding students through complex application processes. Committed to helping students secure placements in their dream institutions.",
      contact: {
        email: "Office.recapply@gmail.com",
        phone: "+250783408617",
      },
      color: "from-green-600 to-teal-600",
    },
    {
      id: 3,
      name: "PRINCE RUZIGA",
      position: "Student Success Officer",
      department: "Student Services",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Passionate about student welfare and success. Provides comprehensive support from pre-departure preparation to post-arrival adjustment, ensuring students thrive in their new academic environments.",
      contact: {
        email: "Recapply.students@gmail.com",
        phone: "+250783408617",
      },
      color: "from-purple-600 to-indigo-600",
    },
  ];

  // Departments
  const departments = [
    { name: "Leadership", icon: <CorporateFare />, count: 1 },
    { name: "Admissions", icon: <SchoolIcon />, count: 1 },
    { name: "Student Support", icon: <ConnectWithoutContact />, count: 1 },
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
      instagram: "https://instagram.com/recapply",
    },
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

                {/* Contact Details */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 xs:p-6">
                  <h5 className="font-bold text-gray-800 mb-3 text-lg">
                    Contact Details
                  </h5>
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
                    Our team is ready to assist you with your international
                    education journey. Feel free to reach out through any of the
                    following channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-3 text-lg">
                      Contact Information
                    </h5>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Email className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">
                            Team Email
                          </p>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">
                            Support Line
                          </p>
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="text-green-600 hover:text-green-800"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <LocationOn className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-700">
                            Head Office
                          </p>
                          <p className="text-gray-600">{contactInfo.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-800 mb-3 text-lg">
                      Connect With Us
                    </h5>
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
                      <h6 className="font-medium text-gray-700 mb-2">
                        Department Contacts
                      </h6>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500">
      {/* Hero Section */}
      <section className="relative py-8 md:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br bg-gradient-to-br from-blue-800 to-indigo-500" />
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
                <span className="text-white">MEET THE RECAPPLY TEAM</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base xs:text-lg md:text-xl text-white max-w-4xl mx-auto px-3"
              >
                Our team of dedicated professionals brings decades of combined
                experience in international education, admissions, visa
                processing, and student support to guide you every step of the
                way.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-8 md:py-16 ">
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
            <p className="text-white text-base xs:text-lg md:text-xl max-w-3xl mx-auto px-3">
              3 experts across 3 specialized departments working together for
              your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-3 gap-3 xs:gap-4 md:gap-6 max-w-4xl mx-auto">
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
                <h3 className="font-bold text-gray-900 text-sm xs:text-base mb-1">
                  {dept.name}
                </h3>
                <p className="text-blue-600 font-semibold text-xs xs:text-sm">
                  {dept.count} Expert{dept.count > 1 ? "s" : ""}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12 md:py-20 ">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              <span className="text-transparent bg-clip-text text-white bg-gradient-to-r from-blue-600 to-purple-600">
                OUR EXPERT TEAM
              </span>
            </h2>
            <p className="text-gray-100 text-base xs:text-lg md:text-xl max-w-3xl mx-auto px-3">
              Meet the professionals dedicated to making your study abroad
              dreams a reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 md:gap-8 max-w-6xl mx-auto">
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
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${member.color}`}
                        />
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
                      </div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  <p className="text-gray-600 text-sm xs:text-base mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openTeamMemberModal(member)}
                    className={`w-full py-2 xs:py-3 rounded-lg font-medium hover:shadow-lg transition-all text-sm xs:text-base bg-gradient-to-r ${member.color} text-white`}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-20 ">
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
                Schedule a consultation with one of our experts or contact our
                team for more information
              </p>

              <div className="flex flex-col gap-3 xs:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openContactModal}
                  className="bg-white text-blue-900 px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Contact Our Team
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