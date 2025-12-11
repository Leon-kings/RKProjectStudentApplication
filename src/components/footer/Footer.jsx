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

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      return;
    }

    try {
      // Simulate API call
      await axios.post('https://your-api.com/subscribe', {
        email,
        source: 'footer_newsletter',
        timestamp: new Date().toISOString()
      });

      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setIsSubscribed(true);
      
      // Reset subscription status after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Service categories
  const serviceCategories = [
    {
      title: 'University Services',
      services: [
        { name: 'University Admissions', link: '/services/admissions' },
        { name: 'Scholarship Guidance', link: '/services/scholarships' },
        { name: 'Application Processing', link: '/services/application' },
        { name: 'Document Translation', link: '/services/translation' },
        { name: 'Interview Preparation', link: '/services/interview' }
      ]
    },

  ];

  // Quick links
  const quickLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Universities', link: '/universities' },
    { name: 'Blog', link: '/blog' },
    { name: 'Testimonials', link: '/testimonials' },
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

  // Country offices
  const countryOffices = [
    { country: 'China', city: 'Beijing', phone: '+86 10 1234 5678' },
    { country: 'India', city: 'New Delhi', phone: '+91 11 2345 6789' },
    { country: 'Japan', city: 'Tokyo', phone: '+81 3 1234 5678' },

  ];

  // Social media links
  const socialLinks = [
    { icon: FacebookIcon, link: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { icon: TwitterIcon, link: 'https://twitter.com', color: 'hover:bg-blue-400' },
    { icon: InstagramIcon, link: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { icon: LinkedInIcon, link: 'https://linkedin.com', color: 'hover:bg-blue-700' },
    { icon: YouTubeIcon, link: 'https://youtube.com', color: 'hover:bg-red-600' },
    { icon: WhatsAppIcon, link: 'https://wa.me', color: 'hover:bg-green-500' },
    { icon: TelegramIcon, link: 'https://t.me', color: 'hover:bg-blue-500' }
  ];

  // Partner universities
  const partnerUniversities = [
    'Tsinghua University',
    'Peking University',
    'University of Tokyo',
    'National University of Singapore',
    'Seoul National University',
    'University of Hong Kong',
    'Indian Institute of Technology',
    'University of Malaya'
  ];

  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
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
                      Stay Updated with Study Abroad News
                    </h3>
                    <p className="text-gray-300">
                      Get weekly updates on scholarships, visa changes, and university admissions
                    </p>
                  </div>
                  
                  <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="px-6 py-3 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[300px]"
                      />
                      <button
                        type="submit"
                        disabled={isSubscribed}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                          isSubscribed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl'
                        }`}
                      >
                        {isSubscribed ? (
                          <>
                            <VerifiedIcon className="h-5 w-5" />
                            Subscribed!
                          </>
                        ) : (
                          <>
                            <SendIcon className="h-5 w-5" />
                            Subscribe
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      By subscribing, you agree to our Privacy Policy
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
                  <h4 className="font-bold text-lg mb-1">24/7 Support</h4>
                  <a href="tel:+11234567890" className="text-gray-300 hover:text-white transition-colors">
                    +1 (123) 456-7890
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Available in multiple languages</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <LocationOnIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Head Office</h4>
                  <p className="text-gray-300">
                    123 Education Street,<br />
                    Academic District,<br />
                    Singapore 123456
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  <AccessTimeIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 - 18:00<br />
                    Saturday: 10:00 - 16:00<br />
                    Sunday: Emergency Support Only
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
                  <h2 className="text-2xl font-bold">Study Asia Connect</h2>
                  <p className="text-gray-400">Your Gateway to Asian Education</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                We bridge the gap between international students and premier educational institutions 
                across Asia. With over 10,000 successful placements, we're your trusted partner for 
                study abroad success.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <VerifiedIcon className="h-5 w-5 text-green-400" />
                  <span className="text-sm">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SecurityIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Data Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PeopleIcon className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">10,000+ Students</span>
                </div>
              </div>

              {/* App Download */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Download Our App</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <AppleIcon className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="font-bold">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <AndroidIcon className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </button>
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
                {serviceCategories.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-blue-300 mb-2">{category.title}</h4>
                    <ul className="space-y-2 mb-4">
                      {category.services.map((service, sIndex) => (
                        <li key={sIndex}>
                          <a 
                            href={service.link}
                            className="text-gray-300 hover:text-white transition-colors text-sm"
                          >
                            • {service.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Offices */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <LanguageIcon className="mr-2 h-5 w-5 text-purple-400" />
                Our Offices
              </h3>
              <div className="space-y-4">
                {countryOffices.map((office, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{office.city}</h4>
                        <p className="text-sm text-gray-400">{office.country}</p>
                      </div>
                      <a 
                        href={`tel:${office.phone.replace(/\s+/g, '')}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner Universities */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">Partner Universities</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {partnerUniversities.map((university, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span className="text-gray-300">{university}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Follow us:</span>
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 bg-gray-800 rounded-lg ${social.color} transition-all duration-300 hover:text-white transform hover:-translate-y-1`}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
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
                <span>© 2024 Study Asia Connect. All rights reserved.</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <HelpIcon className="h-4 w-4" />
                  <span>FAQs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PolicyIcon className="h-4 w-4" />
                  <span>Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ContactSupportIcon className="h-4 w-4" />
                  <span>Support Center</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BusinessIcon className="h-4 w-4" />
                  <span>Careers</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Study Asia Connect is an ISO 9001:2015 certified education consultancy. 
                We are not directly affiliated with any universities. We provide consultancy 
                services to help students with their applications.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

