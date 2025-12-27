// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// // Material Icons
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SendIcon from '@mui/icons-material/Send';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import LanguageIcon from '@mui/icons-material/Language';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import SecurityIcon from '@mui/icons-material/Security';
// import SchoolIcon from '@mui/icons-material/School';
// import PeopleIcon from '@mui/icons-material/People';
// import BusinessIcon from '@mui/icons-material/Business';
// import HelpIcon from '@mui/icons-material/Help';
// import PolicyIcon from '@mui/icons-material/Policy';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ContactSupportIcon from '@mui/icons-material/ContactSupport';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import AppleIcon from '@mui/icons-material/Apple';
// import AndroidIcon from '@mui/icons-material/Android';
// import CopyrightIcon from '@mui/icons-material/Copyright';
// import FlagIcon from '@mui/icons-material/Flag';
// import ScholarshipIcon from '@mui/icons-material/School';
// import VisaIcon from '@mui/icons-material/CardTravel';
// import DocumentIcon from '@mui/icons-material/Description';
// import ExamIcon from '@mui/icons-material/Quiz';
// import DepartureIcon from '@mui/icons-material/FlightTakeoff';
// import PartnershipIcon from '@mui/icons-material/Handshake';
// import { Link } from 'react-router-dom';

// export const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [country, setCountry] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // Handle scroll to show/hide scroll to top button
//   React.useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScrollTop(true);
//       } else {
//         setShowScrollTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   const handleNewsletterSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !validateEmail(email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     try {
//       // Send newsletter subscription data to API
//       const newsletterData = {
//         email: email,
//         name: name || 'Anonymous',
//         country: country || 'Not specified',
//         source: 'footer_newsletter',
//         subscription_date: new Date().toISOString(),
//         preferences: {
//           updates: true,
//           scholarships: true,
//           university_news: true,
//           visa_updates: true
//         }
//       };

//       // Replace with your actual API endpoint
//       const API_URL = 'https://ruziganodejs.onrender.com//newsletter/subscribe'; // Update this to your actual API
      
//       const response = await axios.post(API_URL, newsletterData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });
// console.log('Newsletter subscription successful:',response.data);
//       toast.success('Successfully subscribed to our newsletter!');
//       setEmail('');
//       setName('');
//       setCountry('');
//       setIsSubscribed(true);
      
//       // Reset subscription status after 5 seconds
//       setTimeout(() => setIsSubscribed(false), 5000);
//     } catch (error) {
//       console.error('Subscription error:', error);
//       toast.error('Subscription failed. Please try again.');
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   // Service categories based on RECAPPLY services
//   const serviceCategories = [
//     {
//       title: 'University Admissions',
//       icon: SchoolIcon,
//       services: [
//         { name: 'Country & University Selection', link: '/services/admissions' },
//         { name: 'Course/Major Guidance', link: '/services/major-guidance' },
//         { name: 'Application Processing', link: '/services/application' },
//         { name: 'Admission Support', link: '/services/admission-support' },
//         { name: 'Follow-up & Placement', link: '/services/placement' }
//       ]
//     },
//     {
//       title: 'CSCA Exam Preparation',
//       icon: ExamIcon,
//       services: [
//         { name: 'CSCA Registration Guidance', link: '/services/csca-registration' },
//         { name: 'Subject Selection Assistance', link: '/services/subject-selection' },
//         { name: 'Study Materials & Resources', link: '/services/study-materials' },
//         { name: 'Mock Tests & Strategy', link: '/services/mock-tests' },
//         { name: 'Scholarship Documentation', link: '/services/scholarship-docs' }
//       ]
//     },
//     {
//       title: 'Scholarship Guidance',
//       icon: ScholarshipIcon,
//       services: [
//         { name: 'Fully Funded Scholarships', link: '/services/fully-funded' },
//         { name: 'Partial Scholarships', link: '/services/partial-scholarships' },
//         { name: 'Tuition Waivers', link: '/services/tuition-waivers' },
//         { name: 'Government Subsidies', link: '/services/government-subsidies' },
//         { name: 'Financial Aid Matching', link: '/services/financial-aid' }
//       ]
//     },
//     {
//       title: 'Document Preparation',
//       icon: DocumentIcon,
//       services: [
//         { name: 'Statement of Purpose (SOP)', link: '/services/sop' },
//         { name: 'Study Plan & Motivation Letter', link: '/services/study-plan' },
//         { name: 'CV / Resume Writing', link: '/services/cv-writing' },
//         { name: 'Reference Letters', link: '/services/reference-letters' },
//         { name: 'Sponsor Letters', link: '/services/sponsor-letters' }
//       ]
//     },
//     {
//       title: 'Visa & Pre-Departure',
//       icon: VisaIcon,
//       services: [
//         { name: 'Visa Application Assistance', link: '/services/visa-assistance' },
//         { name: 'Interview Preparation', link: '/services/interview' },
//         { name: 'Document Review', link: '/services/document-review' },
//         { name: 'Accommodation Support', link: '/services/accommodation' },
//         { name: 'Pre-Departure Guidance', link: '/services/pre-departure' }
//       ]
//     }
//   ];

//   // Quick links
//   const quickLinks = [
//     { name: 'Home', link: '/' },
//     { name: 'About RECAPPLY', link: '/about' },
//     { name: 'Our Services', link: '/services' },
//     { name: 'Study Destinations', link: '/destinations' },
//     { name: 'Scholarships', link: '/scholarships' },
//     { name: 'CSCA Exam Info', link: '/csca-exam' },
//     { name: 'Success Stories', link: '/success-stories' },
//     { name: 'Contact Us', link: '/contact' }
//   ];

//   // Legal links
//   const legalLinks = [
//     { name: 'Privacy Policy', link: '/privacy-policy' },
//     { name: 'Terms of Service', link: '/terms' },
//     { name: 'Cookie Policy', link: '/cookies' },
//     { name: 'Refund Policy', link: '/refund' },
//     { name: 'Disclaimer', link: '/disclaimer' }
//   ];

//   // Country offices - RECAPPLY locations
//   const countryOffices = [
//     { country: 'Rwanda', city: 'Kigali Office', phone: '+250 783 408 617', address: 'Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door' },
//     { country: 'China', city: 'China Office', phone: '+86 186 5833 2879', address: 'Educational Consultation Office' },
//     { country: 'Headquarters', city: 'REC Ltd', phone: '+250 783 408 617', address: 'Ruziga Enterprise Corporation Ltd' },
//   ];

//   // Study destinations
//   const studyDestinations = [
//     'China', 'Canada', 'Poland', 'Turkey', 'Germany', 'USA', 
//     'UK', 'Australia', 'Malaysia', 'Japan', 'South Korea'
//   ];

//   // Social media links
//   const socialLinks = [
//     { icon: FacebookIcon, link: 'https://facebook.com/recrecapply', color: 'hover:bg-blue-600' },
//     { icon: TwitterIcon, link: 'https://twitter.com/recrecapply', color: 'hover:bg-blue-400' },
//     { icon: InstagramIcon, link: 'https://instagram.com/recrecapply', color: 'hover:bg-pink-600' },
//     { icon: LinkedInIcon, link: 'https://linkedin.com/company/recrecapply', color: 'hover:bg-blue-700' },
//     { icon: YouTubeIcon, link: 'https://youtube.com/recrecapply', color: 'hover:bg-red-600' },
//     { icon: WhatsAppIcon, link: 'https://wa.me/250783408617', color: 'hover:bg-green-500' },
//     { icon: TelegramIcon, link: 'https://t.me/recrecapply', color: 'hover:bg-blue-500' }
//   ];

//   return (
//     <>
//       <ToastContainer 
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
//         >
//           <ArrowUpwardIcon className="h-6 w-6" />
//         </motion.button>
//       )}

//       {/* Main Footer */}
//       <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Top Section - Newsletter & Contact */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
            
//             {/* Newsletter Subscription */}
//             <div className="lg:col-span-2">
//               <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/30">
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-3 flex items-center">
//                       <EmailIcon className="mr-3 h-8 w-8 text-blue-400" />
//                       Get Education Updates & Scholarship Alerts
//                     </h3>
//                     <p className="text-gray-300">
//                       Subscribe for weekly updates on admissions, scholarships, visa changes, and study abroad opportunities
//                     </p>
//                   </div>
                  
//                   <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Your Name"
//                         className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email Address"
//                         required
//                         className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       <input
//                         type="text"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         placeholder="Country"
//                         className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <button
//                         type="submit"
//                         disabled={isSubscribed}
//                         className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
//                           isSubscribed
//                             ? 'bg-gradient-to-r from-green-500 to-emerald-500'
//                             : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl'
//                         }`}
//                       >
//                         {isSubscribed ? (
//                           <>
//                             <VerifiedIcon className="h-5 w-5" />
//                             Subscribed!
//                           </>
//                         ) : (
//                           <>
//                             <SendIcon className="h-5 w-5" />
//                             Subscribe Now
//                           </>
//                         )}
//                       </button>
//                     </div>
//                     <p className="text-gray-400 text-sm mt-3">
//                       By subscribing, you agree to our Privacy Policy. We'll send you educational updates and scholarship opportunities.
//                     </p>
//                   </form>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-6">
//               <div className="flex items-start space-x-4">
//                 <div className="p-3 bg-blue-900/30 rounded-xl">
//                   <PhoneIcon className="h-6 w-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-1">Contact RECAPPLY</h4>
//                   <a href="tel:+250783408617" className="text-gray-300 hover:text-white transition-colors">
//                     Rwanda: +250 783 408 617
//                   </a>
//                   <br />
//                   <a href="tel:+8618658332879" className="text-gray-300 hover:text-white transition-colors">
//                     China: +86 186 5833 2879
//                   </a>
//                   <p className="text-sm text-gray-400 mt-1">Available for consultation</p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4">
//                 <div className="p-3 bg-blue-900/30 rounded-xl">
//                   <EmailIcon className="h-6 w-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-1">Email Us</h4>
//                   <a href="mailto:r.educationalconsultance@gmail.com" className="text-gray-300 hover:text-white transition-colors break-all">
//                     r.educationalconsultance@gmail.com
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4">
//                 <div className="p-3 bg-blue-900/30 rounded-xl">
//                   <LocationOnIcon className="h-6 w-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-1">Kigali Office</h4>
//                   <p className="text-gray-300 text-sm">
//                     Kicukiro Centre, Sangwa Plaza,<br />
//                     1st Floor, R6 Door,<br />
//                     Kigali, Rwanda
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4">
//                 <div className="p-3 bg-blue-900/30 rounded-xl">
//                   <AccessTimeIcon className="h-6 w-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-1">Working Hours</h4>
//                   <p className="text-gray-300 text-sm">
//                     Monday - Friday: 8:00 - 18:00<br />
//                     Saturday: 9:00 - 15:00<br />
//                     Sunday: By Appointment
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Middle Section - Links & Services */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
//             {/* Company Info */}
//             <div className="lg:col-span-2">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4">
//                   <SchoolIcon className="h-8 w-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold">RECAPPLY</h2>
//                   <p className="text-gray-400">International Education Division of REC Ltd</p>
//                 </div>
//               </div>
              
//               <p className="text-gray-300 mb-6">
//                 RECAPPLY is dedicated to helping students from Africa and beyond access world-class education 
//                 with accuracy, professionalism, and trust. We guide students from application to arrival 
//                 at top universities worldwide.
//               </p>
              
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="flex items-center space-x-2">
//                   <VerifiedIcon className="h-5 w-5 text-green-400" />
//                   <span className="text-sm">Professional Service</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <FlagIcon className="h-5 w-5 text-blue-400" />
//                   <span className="text-sm">Multiple Countries</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <PeopleIcon className="h-5 w-5 text-purple-400" />
//                   <span className="text-sm">Personalized Support</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <SecurityIcon className="h-5 w-5 text-yellow-400" />
//                   <span className="text-sm">High Success Rate</span>
//                 </div>
//               </div>

//               {/* Study Destinations */}
//               <div className="mb-6">
//                 <h4 className="font-bold mb-3 flex items-center">
//                   <LanguageIcon className="mr-2 h-5 w-5" />
//                   Our Study Destinations
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {studyDestinations.map((country, index) => (
//                     <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
//                       {country}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="text-xl font-bold mb-6 flex items-center">
//                 <BusinessIcon className="mr-2 h-5 w-5 text-blue-400" />
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 {quickLinks.map((link, index) => (
//                   <li key={index}>
//                     <a 
//                       href={link.link}
//                       className="text-gray-300 hover:text-white transition-colors flex items-center group"
//                     >
//                       <ArrowUpwardIcon className="h-4 w-4 mr-2 transform rotate-45 group-hover:translate-x-1 transition-transform" />
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Services */}
//             <div>
//               <h3 className="text-xl font-bold mb-6 flex items-center">
//                 <DescriptionIcon className="mr-2 h-5 w-5 text-green-400" />
//                 Our Services
//               </h3>
//               <div className="space-y-4">
//                 {serviceCategories.slice(0, 3).map((category, index) => {
//                   const Icon = category.icon;
//                   return (
//                     <div key={index} className="group">
//                       <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
//                         <Icon className="mr-2 h-4 w-4" />
//                         {category.title}
//                       </h4>
//                       <ul className="space-y-1 mb-4">
//                         {category.services.slice(0, 3).map((service, sIndex) => (
//                           <li key={sIndex}>
//                             <a 
//                               href={service.link}
//                               className="text-gray-300 hover:text-white transition-colors text-sm hover:pl-2 duration-200"
//                             >
//                               • {service.name}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   );
//                 })}
//                 <a href="/services" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
//                   View All Services →
//                 </a>
//               </div>
//             </div>

//             {/* Country Offices */}
//             <div>
//               <h3 className="text-xl font-bold mb-6 flex items-center">
//                 <LocationOnIcon className="mr-2 h-5 w-5 text-purple-400" />
//                 Our Offices
//               </h3>
//               <div className="space-y-4">
//                 {countryOffices.map((office, index) => (
//                   <div key={index} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group">
//                     <div className="flex items-start space-x-3">
//                       <FlagIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 mt-1" />
//                       <div>
//                         <h4 className="font-semibold">{office.city}</h4>
//                         <p className="text-sm text-gray-400">{office.country}</p>
//                         <p className="text-xs text-gray-500 mt-1">{office.address}</p>
//                         <a 
//                           href={`tel:${office.phone.replace(/\s+/g, '')}`}
//                           className="text-blue-400 hover:text-blue-300 text-sm block mt-2"
//                         >
//                           {office.phone}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Why Choose RECAPPLY Section */}
//           <div className="mb-12 bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
//             <h3 className="text-2xl font-bold mb-6 text-center">Why Students Choose RECAPPLY</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 { icon: VerifiedIcon, title: 'High Success Rate', desc: 'Proven track record of admissions & visas' },
//                 { icon: DescriptionIcon, title: 'Professional Documents', desc: 'High-quality SOPs and application materials' },
//                 { icon: PeopleIcon, title: 'Personalized Support', desc: 'One-on-one guidance throughout the process' },
//                 { icon: PartnershipIcon, title: 'University Partnerships', desc: 'Direct connections with institutions worldwide' },
//               ].map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={index} className="text-center p-4">
//                     <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/30 rounded-xl mb-4">
//                       <Icon className="h-6 w-6 text-blue-400" />
//                     </div>
//                     <h4 className="font-bold mb-2">{item.title}</h4>
//                     <p className="text-gray-400 text-sm">{item.desc}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div className="pt-8 border-t border-gray-800">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
//               {/* Social Media */}
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-400">Connect with us:</span>
//                 <div className="flex space-x-2">
//                   {socialLinks.map((social, index) => {
//                     const Icon = social.icon;
//                     return (
//                       <Link
//                         key={index}
//                         to={social.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`p-2 bg-gray-800 rounded-lg ${social.color} transition-all duration-300 hover:text-white transform hover:-translate-y-1`}
//                       >
//                         <Icon className="h-5 w-5" />
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Legal Links */}
//               <div className="flex flex-wrap justify-center gap-4">
//                 {legalLinks.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link.link}
//                     className="text-gray-400 hover:text-white transition-colors text-sm"
//                   >
//                     {link.name}
//                   </a>
//                 ))}
//               </div>

//               {/* Copyright */}
//               <div className="flex items-center space-x-2 text-gray-400 text-sm">
//                 <CopyrightIcon className="h-4 w-4" />
//                 <span>© 2024 RECAPPLY - Ruziga Enterprise Corporation Ltd. All rights reserved.</span>
//               </div>
//             </div>

//             {/* Additional Info */}
//             <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
//               <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
//                 <div className="flex items-center space-x-2">
//                   <HelpIcon className="h-4 w-4" />
//                   <span>FAQs & Support</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <PolicyIcon className="h-4 w-4" />
//                   <span>Compliance & Ethics</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <ContactSupportIcon className="h-4 w-4" />
//                   <span>Student Support Center</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <PartnershipIcon className="h-4 w-4" />
//                   <span>University Partnerships</span>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-600 mt-4 max-w-3xl mx-auto">
//                 RECAPPLY is the international education division of Ruziga Enterprise Corporation Ltd (REC Ltd). 
//                 We provide professional educational consultancy services to help students secure admissions, 
//                 scholarships, and visas to universities worldwide. We are not directly affiliated with any 
//                 universities but work as authorized educational consultants.
//               </p>
//               <p className="text-xs text-gray-500 mt-2">
//                 Mission: To guide every student confidently from application to arrival.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };



/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import HelpIcon from '@mui/icons-material/Help';
import PolicyIcon from '@mui/icons-material/Policy';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FlagIcon from '@mui/icons-material/Flag';
import ScholarshipIcon from '@mui/icons-material/School';
import VisaIcon from '@mui/icons-material/CardTravel';
import DocumentIcon from '@mui/icons-material/Description';
import ExamIcon from '@mui/icons-material/Quiz';
import DepartureIcon from '@mui/icons-material/FlightTakeoff';
import PartnershipIcon from '@mui/icons-material/Handshake';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle scroll to show/hide scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      toast.error('Please enter a valid email address');
      setSubscriptionStatus({
        type: 'error',
        message: 'Invalid email format',
        details: 'Please check your email address and try again'
      });
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus(null);

    try {
      // Send newsletter subscription data to API
      const newsletterData = {
        email: email,
        name: name || 'Anonymous',
        country: country || 'Not specified',
        source: 'footer_newsletter',
        subscription_date: new Date().toISOString(),
        preferences: {
          updates: true,
          scholarships: true,
          university_news: true,
          visa_updates: true
        }
      };

      // Replace with your actual API endpoint
      const API_URL = 'https://ruziganodejs.onrender.com/newsletter/subscribe'; 
      
      const response = await axios.post(API_URL, newsletterData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Newsletter subscription successful:', response.data);
      
      // Show success toast
      toast.success('Successfully subscribed to our newsletter!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Set subscription status with detailed information
      setSubscriptionStatus({
        type: 'success',
        message: 'Subscription Successful!',
        details: `Welcome ${name || 'to RECAPPLY newsletter'}`,
        email: email,
        timestamp: new Date().toLocaleTimeString(),
        subscriptionId: response.data.id || 'N/A',
        preferences: newsletterData.preferences
      });

      // Reset form
      setEmail('');
      setName('');
      setCountry('');
      setIsSubscribed(true);
      
      // Reset subscription status after 8 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setSubscriptionStatus(null);
      }, 8000);

    } catch (error) {
      console.error('Subscription error:', error);
      
      // Determine error type
      let errorMessage = 'Subscription failed. Please try again.';
      let errorDetails = 'Unknown error occurred';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = `Server Error: ${error.response.status}`;
        errorDetails = error.response.data?.message || 'Please try again later';
      } else if (error.request) {
        // No response received
        errorMessage = 'Network Error';
        errorDetails = 'Unable to reach the server. Please check your connection';
      } else {
        // Request setup error
        errorDetails = error.message;
      }

      // Show error toast
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Set error status
      setSubscriptionStatus({
        type: 'error',
        message: errorMessage,
        details: errorDetails,
        timestamp: new Date().toLocaleTimeString(),
        suggestion: 'Please check your internet connection or try again later'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Service categories based on RECAPPLY services
  const serviceCategories = [
    {
      title: 'University Admissions',
      icon: SchoolIcon,
      services: [
        { name: 'Country & University Selection', link: '/services/admissions' },
        { name: 'Course/Major Guidance', link: '/services/major-guidance' },
        { name: 'Application Processing', link: '/services/application' },
        { name: 'Admission Support', link: '/services/admission-support' },
        { name: 'Follow-up & Placement', link: '/services/placement' }
      ]
    },
    {
      title: 'CSCA Exam Preparation',
      icon: ExamIcon,
      services: [
        { name: 'CSCA Registration Guidance', link: '/services/csca-registration' },
        { name: 'Subject Selection Assistance', link: '/services/subject-selection' },
        { name: 'Study Materials & Resources', link: '/services/study-materials' },
        { name: 'Mock Tests & Strategy', link: '/services/mock-tests' },
        { name: 'Scholarship Documentation', link: '/services/scholarship-docs' }
      ]
    },
    {
      title: 'Scholarship Guidance',
      icon: ScholarshipIcon,
      services: [
        { name: 'Fully Funded Scholarships', link: '/services/fully-funded' },
        { name: 'Partial Scholarships', link: '/services/partial-scholarships' },
        { name: 'Tuition Waivers', link: '/services/tuition-waivers' },
        { name: 'Government Subsidies', link: '/services/government-subsidies' },
        { name: 'Financial Aid Matching', link: '/services/financial-aid' }
      ]
    },
    {
      title: 'Document Preparation',
      icon: DocumentIcon,
      services: [
        { name: 'Statement of Purpose (SOP)', link: '/services/sop' },
        { name: 'Study Plan & Motivation Letter', link: '/services/study-plan' },
        { name: 'CV / Resume Writing', link: '/services/cv-writing' },
        { name: 'Reference Letters', link: '/services/reference-letters' },
        { name: 'Sponsor Letters', link: '/services/sponsor-letters' }
      ]
    },
    {
      title: 'Visa & Pre-Departure',
      icon: VisaIcon,
      services: [
        { name: 'Visa Application Assistance', link: '/services/visa-assistance' },
        { name: 'Interview Preparation', link: '/services/interview' },
        { name: 'Document Review', link: '/services/document-review' },
        { name: 'Accommodation Support', link: '/services/accommodation' },
        { name: 'Pre-Departure Guidance', link: '/services/pre-departure' }
      ]
    }
  ];

  // Quick links
  const quickLinks = [
    { name: 'Home', link: '/' },
    { name: 'About RECAPPLY', link: '/about' },
    { name: 'Our Services', link: '/services' },
    { name: 'Study Destinations', link: '/destinations' },
    { name: 'Scholarships', link: '/scholarships' },
    { name: 'CSCA Exam Info', link: '/csca-exam' },
    { name: 'Success Stories', link: '/success-stories' },
    { name: 'Contact Us', link: '/contact' }
  ];

  // Legal links
  const legalLinks = [
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms of Service', link: '/terms' },
    { name: 'Cookie Policy', link: '/cookies' },
    { name: 'Refund Policy', link: '/refund' },
    { name: 'Disclaimer', link: '/disclaimer' }
  ];

  // Country offices - RECAPPLY locations
  const countryOffices = [
    { country: 'Rwanda', city: 'Kigali Office', phone: '+250 783 408 617', address: 'Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door' },
    { country: 'China', city: 'China Office', phone: '+86 186 5833 2879', address: 'Educational Consultation Office' },
    { country: 'Headquarters', city: 'REC Ltd', phone: '+250 783 408 617', address: 'Ruziga Enterprise Corporation Ltd' },
  ];

  // Study destinations
  const studyDestinations = [
    'China', 'Canada', 'Poland', 'Turkey', 'Germany', 'USA', 
    'UK', 'Australia', 'Malaysia', 'Japan', 'South Korea'
  ];

  // Social media links
  const socialLinks = [
    { icon: FacebookIcon, link: 'https://facebook.com/recrecapply', color: 'hover:bg-blue-600' },
    { icon: TwitterIcon, link: 'https://twitter.com/recrecapply', color: 'hover:bg-blue-400' },
    { icon: InstagramIcon, link: 'https://instagram.com/recrecapply', color: 'hover:bg-pink-600' },
    { icon: LinkedInIcon, link: 'https://linkedin.com/company/recrecapply', color: 'hover:bg-blue-700' },
    { icon: YouTubeIcon, link: 'https://youtube.com/recrecapply', color: 'hover:bg-red-600' },
    { icon: WhatsAppIcon, link: 'https://wa.me/250783408617', color: 'hover:bg-green-500' },
    { icon: TelegramIcon, link: 'https://t.me/recrecapply', color: 'hover:bg-blue-500' }
  ];

  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
        >
          <ArrowUpwardIcon className="h-6 w-6" />
        </motion.button>
      )}

      {/* Subscription Status Display */}
      {subscriptionStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed bottom-24 right-8 z-50 max-w-sm ${
            subscriptionStatus.type === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-orange-600'
          } text-white rounded-xl shadow-2xl p-4 border border-white/20`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {subscriptionStatus.type === 'success' ? (
                <VerifiedIcon className="h-6 w-6 text-white" />
              ) : (
                <HelpIcon className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="ml-3">
              <h4 className="font-bold text-lg mb-1">
                {subscriptionStatus.message}
              </h4>
              <p className="text-sm mb-2">{subscriptionStatus.details}</p>
              
              {subscriptionStatus.type === 'success' && (
                <div className="space-y-1 text-sm bg-black/20 p-2 rounded">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email:</span>
                    <span className="font-medium">{subscriptionStatus.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Time:</span>
                    <span className="font-medium">{subscriptionStatus.timestamp}</span>
                  </div>
                  {subscriptionStatus.subscriptionId && subscriptionStatus.subscriptionId !== 'N/A' && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">ID:</span>
                      <span className="font-medium">{subscriptionStatus.subscriptionId}</span>
                    </div>
                  )}
                </div>
              )}
              
              {subscriptionStatus.type === 'error' && subscriptionStatus.suggestion && (
                <p className="text-sm italic mt-2">{subscriptionStatus.suggestion}</p>
              )}
              
              <button
                onClick={() => setSubscriptionStatus(null)}
                className="mt-3 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section - Newsletter & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
            
            {/* Newsletter Subscription */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/30">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      <EmailIcon className="mr-3 h-8 w-8 text-blue-400" />
                      Get Education Updates & Scholarship Alerts
                    </h3>
                    <p className="text-gray-300">
                      Subscribe for weekly updates on admissions, scholarships, visa changes, and study abroad opportunities
                    </p>
                    
                    {/* Subscription Status Info */}
                    {subscriptionStatus && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10"
                      >
                        <div className="flex items-center">
                          <div className={`p-1 rounded-full mr-3 ${
                            subscriptionStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {subscriptionStatus.type === 'success' ? (
                              <VerifiedIcon className="h-4 w-4" />
                            ) : (
                              <HelpIcon className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <span className="font-medium">{subscriptionStatus.message}</span>
                            <span className="text-sm text-gray-400 ml-2">• {subscriptionStatus.timestamp}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        className="px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isSubscribed || isSubmitting}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                          isSubscribed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl'
                        } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : isSubscribed ? (
                          <>
                            <VerifiedIcon className="h-5 w-5" />
                            Subscribed!
                          </>
                        ) : (
                          <>
                            <SendIcon className="h-5 w-5" />
                            Subscribe Now
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      By subscribing, you agree to our Privacy Policy. We'll send you educational updates and scholarship opportunities.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <PhoneIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Contact RECAPPLY</h4>
                  <a href="tel:+250783408617" className="text-gray-300 hover:text-white transition-colors">
                    Rwanda: +250 783 408 617
                  </a>
                  <br />
                  <a href="tel:+8618658332879" className="text-gray-300 hover:text-white transition-colors">
                    China: +86 186 5833 2879
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Available for consultation</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <EmailIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Us</h4>
                  <a href="mailto:r.educationalconsultance@gmail.com" className="text-gray-300 hover:text-white transition-colors break-all">
                    r.educationalconsultance@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <LocationOnIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Kigali Office</h4>
                  <p className="text-gray-300 text-sm">
                    Kicukiro Centre, Sangwa Plaza,<br />
                    1st Floor, R6 Door,<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <AccessTimeIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                  <p className="text-gray-300 text-sm">
                    Monday - Friday: 8:00 - 18:00<br />
                    Saturday: 9:00 - 15:00<br />
                    Sunday: By Appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Links & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4">
                  <SchoolIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">RECAPPLY</h2>
                  <p className="text-gray-400">International Education Division of REC Ltd</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                RECAPPLY is dedicated to helping students from Africa and beyond access world-class education 
                with accuracy, professionalism, and trust. We guide students from application to arrival 
                at top universities worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <VerifiedIcon className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Professional Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FlagIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Multiple Countries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PeopleIcon className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">Personalized Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SecurityIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">High Success Rate</span>
                </div>
              </div>

              {/* Study Destinations */}
              <div className="mb-6">
                <h4 className="font-bold mb-3 flex items-center">
                  <LanguageIcon className="mr-2 h-5 w-5" />
                  Our Study Destinations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {studyDestinations.map((country, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <BusinessIcon className="mr-2 h-5 w-5 text-blue-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.link}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowUpwardIcon className="h-4 w-4 mr-2 transform rotate-45 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <DescriptionIcon className="mr-2 h-5 w-5 text-green-400" />
                Our Services
              </h3>
              <div className="space-y-4">
                {serviceCategories.slice(0, 3).map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="group">
                      <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                        <Icon className="mr-2 h-4 w-4" />
                        {category.title}
                      </h4>
                      <ul className="space-y-1 mb-4">
                        {category.services.slice(0, 3).map((service, sIndex) => (
                          <li key={sIndex}>
                            <a 
                              href={service.link}
                              className="text-gray-300 hover:text-white transition-colors text-sm hover:pl-2 duration-200"
                            >
                              • {service.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <a href="/services" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                  View All Services →
                </a>
              </div>
            </div>

            {/* Country Offices */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <LocationOnIcon className="mr-2 h-5 w-5 text-purple-400" />
                Our Offices
              </h3>
              <div className="space-y-4">
                {countryOffices.map((office, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group">
                    <div className="flex items-start space-x-3">
                      <FlagIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold">{office.city}</h4>
                        <p className="text-sm text-gray-400">{office.country}</p>
                        <p className="text-xs text-gray-500 mt-1">{office.address}</p>
                        <a 
                          href={`tel:${office.phone.replace(/\s+/g, '')}`}
                          className="text-blue-400 hover:text-blue-300 text-sm block mt-2"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose RECAPPLY Section */}
          <div className="mb-12 bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Students Choose RECAPPLY</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: VerifiedIcon, title: 'High Success Rate', desc: 'Proven track record of admissions & visas' },
                { icon: DescriptionIcon, title: 'Professional Documents', desc: 'High-quality SOPs and application materials' },
                { icon: PeopleIcon, title: 'Personalized Support', desc: 'One-on-one guidance throughout the process' },
                { icon: PartnershipIcon, title: 'University Partnerships', desc: 'Direct connections with institutions worldwide' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/30 rounded-xl mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Connect with us:</span>
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={index}
                        to={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 bg-gray-800 rounded-lg ${social.color} transition-all duration-300 hover:text-white transform hover:-translate-y-1`}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <CopyrightIcon className="h-4 w-4" />
                <span>© 2024 RECAPPLY - Ruziga Enterprise Corporation Ltd. All rights reserved.</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <HelpIcon className="h-4 w-4" />
                  <span>FAQs & Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PolicyIcon className="h-4 w-4" />
                  <span>Compliance & Ethics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ContactSupportIcon className="h-4 w-4" />
                  <span>Student Support Center</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PartnershipIcon className="h-4 w-4" />
                  <span>University Partnerships</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 max-w-3xl mx-auto">
                RECAPPLY is the international education division of Ruziga Enterprise Corporation Ltd (REC Ltd). 
                We provide professional educational consultancy services to help students secure admissions, 
                scholarships, and visas to universities worldwide. We are not directly affiliated with any 
                universities but work as authorized educational consultants.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Mission: To guide every student confidently from application to arrival.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};