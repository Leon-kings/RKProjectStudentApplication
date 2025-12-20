/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import DescriptionIcon from '@mui/icons-material/Description';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FlagIcon from '@mui/icons-material/Flag';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api';

// Constants
const COUNTRIES = [
  'All Countries',
  'China',
  'Canada',
  'Germany',
  'Poland',
  'Turkey',
  'USA',
  'UK',
  'Australia',
  'Japan',
  'South Korea',
  'Singapore',
  'Malaysia',
  'France',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Italy',
  'Spain'
];

const SCHOLARSHIP_TYPES = [
  'All Types',
  'Fully Funded',
  'Partial Scholarship',
  'Tuition Waiver',
  'Research Grant',
  'Merit-based',
  'Need-based',
  'Government Scholarship',
  'University Scholarship'
];

const STUDY_LEVELS = [
  'All Levels',
  'Undergraduate',
  'Master\'s',
  'PhD',
  'Postdoctoral',
  'Diploma',
  'Foundation Program'
];

const FUNDING_AMOUNTS = [
  'All Amounts',
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Above $50,000',
  'Full Coverage'
];

const DEADLINE_FILTERS = [
  'All Deadlines',
  'Within 1 Month',
  'Within 3 Months',
  'Within 6 Months',
  '2024 Intake',
  '2025 Intake'
];

// Initial form state
const INITIAL_APPLICATION_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  currentEducation: '',
  gpa: '',
  targetUniversity: '',
  targetCountry: '',
  targetProgram: '',
  scholarshipInterest: '',
  intakeYear: '',
  documents: '',
  essay: '',
  additionalInfo: ''
};

// Featured scholarships data
const FEATURED_SCHOLARSHIPS = [
  {
    id: 1,
    title: 'Chinese Government Scholarship (CSC)',
    provider: 'Government of China',
    country: 'China',
    type: 'Fully Funded',
    studyLevel: 'Bachelor/Master/PhD',
    fundingAmount: 'Full Coverage + Stipend',
    deadline: 'March 31, 2024',
    applicationStatus: 'open',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    eligibility: 'All nationalities, excellent academic record',
    benefits: ['Full tuition waiver', 'Accommodation', 'Monthly stipend', 'Medical insurance'],
    requirements: ['Academic transcripts', 'HSK certificate', 'Research proposal', 'Two recommendation letters']
  },
  {
    id: 2,
    title: 'DAAD Scholarships for Developing Countries',
    provider: 'German Academic Exchange Service',
    country: 'Germany',
    type: 'Fully Funded',
    studyLevel: 'Master/PhD',
    fundingAmount: '€850 - €1,200/month',
    deadline: 'October 15, 2024',
    applicationStatus: 'open',
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    eligibility: 'Developing country nationals, 2+ years work experience',
    benefits: ['Monthly stipend', 'Travel allowance', 'Health insurance', 'Research allowance'],
    requirements: ['Bachelor/Master degree', 'English/German proficiency', 'Work experience', 'Motivation letter']
  },
  {
    id: 3,
    title: 'Vanier Canada Graduate Scholarships',
    provider: 'Government of Canada',
    country: 'Canada',
    type: 'Fully Funded',
    studyLevel: 'PhD',
    fundingAmount: '$50,000/year for 3 years',
    deadline: 'November 1, 2024',
    applicationStatus: 'open',
    image: 'https://images.unsplash.com/photo-1519677100203-7c61d0b01354?auto=format&fit=crop&w=800&q=80',
    featured: true,
    eligibility: 'International PhD students, academic excellence',
    benefits: ['Generous stipend', 'Research support', 'Professional development'],
    requirements: ['Nomination by university', 'Research proposal', 'Academic transcripts', 'Reference letters']
  }
];

// Memoized Scholarship Card Component
const ScholarshipCard = React.memo(({ scholarship, isSaved, onToggleSave, onViewDetails }) => {
  const daysUntilDeadline = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilDeadline <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={scholarship.image}
          alt={scholarship.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
            scholarship.type === 'Fully Funded' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {scholarship.type}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(scholarship.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            {isSaved ? (
              <BookmarkIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          {scholarship.featured && (
            <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
              Featured
            </div>
          )}
        </div>
        {isUrgent && (
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
              Apply Soon!
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{scholarship.title}</h3>
            <div className="flex items-center text-gray-600">
              <LocationOnIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{scholarship.country}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Provider</div>
            <div className="font-semibold text-gray-900">{scholarship.provider}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <AttachMoneyIcon className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Funding</span>
            </div>
            <p className="text-sm text-gray-600 font-bold">{scholarship.fundingAmount}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <SchoolIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Level</span>
            </div>
            <p className="text-sm text-gray-600">{scholarship.studyLevel}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Application Deadline</span>
            <span className={`text-sm font-bold ${isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
              {scholarship.deadline}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.max(10, 100 - (daysUntilDeadline / 365) * 100)}%` }}
            ></div>
          </div>
          {isUrgent && (
            <p className="text-xs text-red-600 mt-1">
              Only {daysUntilDeadline} days left to apply!
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              scholarship.applicationStatus === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {scholarship.applicationStatus.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => onViewDetails(scholarship)}
            className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700"
          >
            View Details
            <ArrowForwardIcon className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// Scholarship Detail Modal Component
const ScholarshipDetailModal = React.memo(({ scholarship, isSaved, onToggleSave, onClose, onApply }) => {
  if (!scholarship) return null;

  const daysUntilDeadline = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
                  scholarship.type === 'Fully Funded' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {scholarship.type}
                </div>
                {scholarship.featured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{scholarship.title}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{scholarship.country}</span>
                </div>
                <div className="flex items-center">
                  <SchoolIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{scholarship.studyLevel}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onToggleSave(scholarship.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSaved ? (
                  <BookmarkIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={scholarship.image}
                  alt={scholarship.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scholarship Description</h3>
                <p className="text-gray-700 mb-4">
                  The {scholarship.title} is a prestigious scholarship program offered by {scholarship.provider} 
                  for international students seeking to pursue {scholarship.studyLevel.toLowerCase()} studies in {scholarship.country}.
                </p>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2">Provider: {scholarship.provider}</h4>
                  <p className="text-blue-700">
                    {scholarship.provider} is committed to promoting international education and cultural exchange through 
                    this scholarship program.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <AttachMoneyIcon className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-gray-800">Funding Amount</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{scholarship.fundingAmount}</p>
                  <p className="text-sm text-gray-600 mt-1">Complete financial package</p>
                </div>
                <div className={`p-4 rounded-xl ${daysUntilDeadline <= 30 ? 'bg-red-50' : 'bg-yellow-50'}`}>
                  <div className="flex items-center mb-2">
                    <CalendarMonthIcon className={`h-6 w-6 ${daysUntilDeadline <= 30 ? 'text-red-600' : 'text-yellow-600'} mr-2`} />
                    <span className="font-semibold text-gray-800">Application Deadline</span>
                  </div>
                  <p className={`text-2xl font-bold ${daysUntilDeadline <= 30 ? 'text-red-700' : 'text-yellow-700'}`}>
                    {scholarship.deadline}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {daysUntilDeadline <= 30 
                      ? `Only ${daysUntilDeadline} days remaining!` 
                      : 'Apply before deadline'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Quick Overview</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Scholarship Type</p>
                    <p className="font-semibold text-gray-900">{scholarship.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Study Level</p>
                    <p className="font-semibold text-gray-900">{scholarship.studyLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Application Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      scholarship.applicationStatus === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {scholarship.applicationStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-5 rounded-xl text-white">
                <h4 className="font-bold mb-4">Scholarship Benefits</h4>
                <ul className="space-y-2">
                  {scholarship.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onApply(scholarship)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Apply for this Scholarship
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {scholarship.eligibility.split(', ').map((criterion, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {scholarship.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <DescriptionIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <WarningIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• Applications must be submitted before the deadline (no exceptions)</li>
                  <li>• All documents must be in English or officially translated</li>
                  <li>• Incomplete applications will not be considered</li>
                  <li>• Shortlisted candidates may be invited for an interview</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Application Modal Component with local state
const ApplicationModal = React.memo(({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialForm,
  countries: countriesList 
}) => {
  const [localForm, setLocalForm] = useState(initialForm);
  const formRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLocalForm(initialForm);
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input, select, textarea');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }, [isOpen, initialForm]);

  const handleLocalChange = useCallback((field, value) => {
    setLocalForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await onSubmit(localForm);
  }, [localForm, onSubmit]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Scholarship Application</h2>
              <p className="text-gray-600 mt-1">Our experts will help you prepare a winning application</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={localForm.firstName}
                  onChange={(e) => handleLocalChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={localForm.lastName}
                  onChange={(e) => handleLocalChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={localForm.email}
                  onChange={(e) => handleLocalChange('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={localForm.phone}
                  onChange={(e) => handleLocalChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="+250 783 408 617"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality *
                </label>
                <select
                  required
                  value={localForm.nationality}
                  onChange={(e) => handleLocalChange('nationality', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select nationality</option>
                  <option value="rwandan">Rwandan</option>
                  <option value="kenyan">Kenyan</option>
                  <option value="ugandan">Ugandan</option>
                  <option value="tanzanian">Tanzanian</option>
                  <option value="nigerian">Nigerian</option>
                  <option value="ghanaian">Ghanaian</option>
                  <option value="south-african">South African</option>
                  <option value="other">Other African</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Education Level *
                </label>
                <select
                  required
                  value={localForm.currentEducation}
                  onChange={(e) => handleLocalChange('currentEducation', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GPA/CGPA *
                </label>
                <input
                  type="text"
                  required
                  value={localForm.gpa}
                  onChange={(e) => handleLocalChange('gpa', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="e.g., 3.5/4.0 or 85%"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Country *
                </label>
                <select
                  required
                  value={localForm.targetCountry}
                  onChange={(e) => handleLocalChange('targetCountry', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  {countriesList.filter(c => c !== 'All Countries').map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Program *
                </label>
                <select
                  required
                  value={localForm.targetProgram}
                  onChange={(e) => handleLocalChange('targetProgram', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select program</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="medicine">Medicine</option>
                  <option value="business">Business Administration</option>
                  <option value="law">Law</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="humanities">Humanities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scholarship of Interest *
                </label>
                <input
                  type="text"
                  required
                  value={localForm.scholarshipInterest}
                  onChange={(e) => handleLocalChange('scholarshipInterest', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="e.g., Chinese Government Scholarship"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Why do you deserve this scholarship? *
              </label>
              <textarea
                rows="3"
                required
                value={localForm.essay}
                onChange={(e) => handleLocalChange('essay', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Write a brief statement about your achievements, goals, and why you should receive this scholarship..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                rows="2"
                value={localForm.additionalInfo}
                onChange={(e) => handleLocalChange('additionalInfo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Any additional information about your background, achievements, or questions..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Submit Scholarship Application
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Pagination Component
const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Previous
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 rounded-lg font-semibold ${
            currentPage === number
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Next
      </button>
    </div>
  );
});

// Main Scholarship Component
export const Scholarship = () => {
  // State Management
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    scholarshipType: '',
    studyLevel: '',
    deadline: '',
    fundingAmount: '',
    applicationStatus: 'open'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState('all');
  const [applicationForm, setApplicationForm] = useState(INITIAL_APPLICATION_FORM);

  // Fetch scholarships data
  const fetchScholarships = useCallback(async () => {
    setLoading(true);
    try {
      const sampleData = [
        ...FEATURED_SCHOLARSHIPS,
        {
          id: 4,
          title: 'Türkiye Scholarships',
          provider: 'Government of Turkey',
          country: 'Turkey',
          type: 'Fully Funded',
          studyLevel: 'Bachelor/Master/PhD',
          fundingAmount: 'Full Coverage + Monthly Stipend',
          deadline: 'February 20, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'All nationalities, under 21 for bachelor, under 30 for master',
          benefits: ['Tuition fees', 'Accommodation', 'Health insurance', 'Turkish language course'],
          requirements: ['Academic transcripts', 'Diploma', 'Passport copy', 'Exam results']
        },
        {
          id: 5,
          title: 'MEXT Scholarship Japan',
          provider: 'Japanese Government',
          country: 'Japan',
          type: 'Fully Funded',
          studyLevel: 'Bachelor/Master/PhD',
          fundingAmount: '¥117,000 - ¥242,000/month',
          deadline: 'May 19, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'Non-Japanese citizens, excellent academic record',
          benefits: ['Tuition exemption', 'Monthly allowance', 'Travel costs', 'Japanese language training'],
          requirements: ['Academic transcripts', 'Health certificate', 'Recommendation letters', 'Study plan']
        },
        {
          id: 6,
          title: 'Fulbright Foreign Student Program',
          provider: 'U.S. Government',
          country: 'USA',
          type: 'Fully Funded',
          studyLevel: 'Master/PhD',
          fundingAmount: 'Full Coverage + Living Expenses',
          deadline: 'October 11, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'International students, leadership potential',
          benefits: ['Tuition fees', 'Living stipend', 'Health insurance', 'Travel allowance'],
          requirements: ['Bachelor degree', 'English proficiency', 'Academic transcripts', 'Personal statement']
        },
        {
          id: 7,
          title: 'Chevening Scholarships UK',
          provider: 'UK Government',
          country: 'UK',
          type: 'Fully Funded',
          studyLevel: 'Master\'s',
          fundingAmount: 'Full Coverage + Monthly Stipend',
          deadline: 'November 7, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'Leadership qualities, work experience',
          benefits: ['University tuition', 'Monthly stipend', 'Travel costs', 'Thesis grant'],
          requirements: ['Undergraduate degree', 'Work experience', 'English proficiency', 'Leadership evidence']
        },
        {
          id: 8,
          title: 'Australia Awards Scholarships',
          provider: 'Australian Government',
          country: 'Australia',
          type: 'Fully Funded',
          studyLevel: 'Master/PhD',
          fundingAmount: 'Full Coverage + Living Allowance',
          deadline: 'April 30, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'Developing country citizens, work experience',
          benefits: ['Full tuition', 'Return airfare', 'Establishment allowance', 'Overseas student health cover'],
          requirements: ['Bachelor degree', 'Work experience', 'English proficiency', 'Development impact plan']
        },
        {
          id: 9,
          title: 'Erasmus Mundus Joint Masters',
          provider: 'European Union',
          country: 'Multiple European Countries',
          type: 'Fully Funded',
          studyLevel: 'Master\'s',
          fundingAmount: '€1,400 - €1,800/month',
          deadline: 'January 15, 2025',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'All nationalities, bachelor degree holders',
          benefits: ['Participation costs', 'Monthly allowance', 'Travel contribution', 'Installation costs'],
          requirements: ['Bachelor degree', 'English proficiency', 'Motivation letter', 'Academic transcripts']
        },
        {
          id: 10,
          title: 'Korean Government Scholarship (KGSP)',
          provider: 'Korean Government',
          country: 'South Korea',
          type: 'Fully Funded',
          studyLevel: 'Bachelor/Master/PhD',
          fundingAmount: '₩800,000 - ₩900,000/month',
          deadline: 'September 30, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'Non-Korean citizens, excellent academic record',
          benefits: ['Airfare', 'Monthly allowance', 'Research support', 'Korean language training'],
          requirements: ['Academic transcripts', 'Personal statement', 'Study plan', 'Recommendation letters']
        },
        {
          id: 11,
          title: 'Swiss Government Excellence Scholarships',
          provider: 'Swiss Government',
          country: 'Switzerland',
          type: 'Fully Funded',
          studyLevel: 'PhD/Postdoctoral',
          fundingAmount: 'CHF 1,920/month',
          deadline: 'November 30, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'Research potential, academic excellence',
          benefits: ['Monthly payment', 'Tuition fee waiver', 'Health insurance', 'Travel allowance'],
          requirements: ['Research proposal', 'Academic transcripts', 'Language proficiency', 'CV']
        },
        {
          id: 12,
          title: 'University of Toronto International Scholarships',
          provider: 'University of Toronto',
          country: 'Canada',
          type: 'Partial Scholarship',
          studyLevel: 'Undergraduate',
          fundingAmount: '$10,000 - $100,000',
          deadline: 'January 15, 2024',
          applicationStatus: 'open',
          image: 'https://images.unsplash.com/photo-1579600161224-cac5a2971069?auto=format&fit=crop&w=800&q=80',
          featured: false,
          eligibility: 'International students, academic excellence',
          benefits: ['Tuition coverage', 'Residence support', 'Mentorship'],
          requirements: ['Academic excellence', 'Leadership experience', 'Personal statement', 'Reference letters']
        }
      ];

      setScholarships(sampleData);
      setFilteredScholarships(sampleData);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast.error('Failed to load scholarship data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...scholarships];

    if (searchQuery) {
      filtered = filtered.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.country && filters.country !== 'All Countries') {
      filtered = filtered.filter(scholarship => 
        scholarship.country.includes(filters.country)
      );
    }

    if (filters.scholarshipType && filters.scholarshipType !== 'All Types') {
      filtered = filtered.filter(scholarship => 
        scholarship.type === filters.scholarshipType
      );
    }

    if (filters.studyLevel && filters.studyLevel !== 'All Levels') {
      filtered = filtered.filter(scholarship =>
        scholarship.studyLevel.includes(filters.studyLevel.split("'")[0])
      );
    }

    if (filters.applicationStatus) {
      filtered = filtered.filter(scholarship =>
        scholarship.applicationStatus === filters.applicationStatus
      );
    }

    switch (sortBy) {
      case 'deadline':
        filtered.sort((a, b) => {
          const aDate = new Date(a.deadline);
          const bDate = new Date(b.deadline);
          return aDate - bDate;
        });
        break;
      case 'funding-high':
        filtered.sort((a, b) => {
          const getAmount = (str) => {
            const match = str.match(/\$(\d+,?\d*)/) || str.match(/€(\d+,?\d*)/) || str.match(/¥(\d+,?\d*)/) || str.match(/₩(\d+,?\d*)/);
            return match ? parseInt(match[1].replace(/,/g, '')) : 0;
          };
          return getAmount(b.fundingAmount) - getAmount(a.fundingAmount);
        });
        break;
      case 'popularity':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      case 'country':
        filtered.sort((a, b) => a.country.localeCompare(b.country));
        break;
      default:
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  }, [scholarships, filters, searchQuery, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Pagination
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);
  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toggle save scholarship
  const toggleSaveScholarship = useCallback((scholarshipId) => {
    setSavedScholarships(prev => {
      if (prev.includes(scholarshipId)) {
        toast.info('Removed from saved scholarships');
        return prev.filter(id => id !== scholarshipId);
      } else {
        toast.success('Scholarship saved to favorites');
        return [...prev, scholarshipId];
      }
    });
  }, []);

  // Handle application submission
  const handleApplicationSubmit = useCallback(async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}/scholarship-application`, {
        ...formData,
        timestamp: new Date().toISOString(),
        scholarshipTitle: selectedScholarship?.title
      });

      toast.success('Scholarship application submitted successfully! We will contact you within 48 hours.');
      setApplicationModalOpen(false);
      setApplicationForm(INITIAL_APPLICATION_FORM);
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
      console.error('Application error:', error);
    }
  }, [selectedScholarship]);

  // Handle scholarship application
  const handleScholarshipApplication = useCallback((scholarship) => {
    setApplicationForm(prev => ({
      ...prev,
      scholarshipInterest: scholarship.title
    }));
    setApplicationModalOpen(true);
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      country: '',
      scholarshipType: '',
      studyLevel: '',
      deadline: '',
      fundingAmount: '',
      applicationStatus: 'open'
    });
    setSearchQuery('');
    setActiveTab('all');
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'Fully Funded') {
      setFilters(prev => ({...prev, scholarshipType: 'Fully Funded'}));
    } else if (tab === 'Government') {
      setSearchQuery('Government');
    } else if (tab === 'University') {
      setSearchQuery('University');
    } else if (tab === 'Urgent Deadlines') {
      setFilters(prev => ({...prev, deadline: 'Within 1 Month'}));
    } else {
      setFilters({
        country: '',
        scholarshipType: '',
        studyLevel: '',
        deadline: '',
        fundingAmount: '',
        applicationStatus: 'open'
      });
      setSearchQuery('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 text-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Scholarships & Funding
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto">
            Discover fully funded scholarships, grants, and financial aid opportunities for international students
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: AttachMoneyIcon, value: '$50M+', label: 'Total Funding Available' },
            { icon: SchoolIcon, value: '300+', label: 'Scholarship Programs' },
            { icon: BeenhereIcon, value: '85%', label: 'Success Rate' },
            { icon: PublicIcon, value: '60+', label: 'Countries Covered' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Scholarships</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, country, or provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({...prev, country: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {COUNTRIES.map((country, index) => (
                  <option key={index} value={country === 'All Countries' ? '' : country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="deadline">Application Deadline</option>
                <option value="funding-high">Funding Amount (High to Low)</option>
                <option value="popularity">Popularity</option>
                <option value="country">Country</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scholarship Type</label>
              <select
                value={filters.scholarshipType}
                onChange={(e) => setFilters(prev => ({...prev, scholarshipType: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {SCHOLARSHIP_TYPES.map((type, index) => (
                  <option key={index} value={type === 'All Types' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Study Level</label>
              <select
                value={filters.studyLevel}
                onChange={(e) => setFilters(prev => ({...prev, studyLevel: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {STUDY_LEVELS.map((level, index) => (
                  <option key={index} value={level === 'All Levels' ? '' : level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='text-black'>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Amount</label>
              <select
                value={filters.fundingAmount}
                onChange={(e) => setFilters(prev => ({...prev, fundingAmount: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {FUNDING_AMOUNTS.map((amount, index) => (
                  <option key={index} value={amount === 'All Amounts' ? '' : amount}>
                    {amount}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.applicationStatus === 'open'}
                  onChange={(e) => setFilters(prev => ({...prev, applicationStatus: e.target.checked ? 'open' : ''}))}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Show only open applications</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {['All Scholarships', 'Fully Funded', 'Government', 'University', 'Urgent Deadlines'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Scholarships Section */}
        {activeTab === 'All Scholarships' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Scholarships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_SCHOLARSHIPS.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  isSaved={savedScholarships.includes(scholarship.id)}
                  onToggleSave={toggleSaveScholarship}
                  onViewDetails={setSelectedScholarship}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Scholarships Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading scholarships...</p>
            </div>
          ) : filteredScholarships.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700">
                  {filteredScholarships.length} Scholarships Available
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setApplicationModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Application Help
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    isSaved={savedScholarships.includes(scholarship.id)}
                    onToggleSave={toggleSaveScholarship}
                    onViewDetails={setSelectedScholarship}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        {/* Scholarship Application Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Scholarship Application Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Start Early',
                description: 'Begin your application 3-6 months before the deadline. This gives you time to gather documents and write strong essays.',
                icon: CalendarMonthIcon
              },
              {
                title: 'Tailor Your Application',
                description: 'Customize each application to match the scholarship criteria. Show how you align with their values and goals.',
                icon: CheckCircleIcon
              },
              {
                title: 'Get Professional Help',
                description: 'Our experts can review your application, improve your essays, and increase your chances of success.',
                icon: TrendingUpIcon
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <tip.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Expert Scholarship Guidance?</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Our scholarship consultants have helped students secure over $10 million in funding. Let us help you craft a winning application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setApplicationModalOpen(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Apply for Scholarship Assistance
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">
              Download Application Checklist
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isSaved={savedScholarships.includes(selectedScholarship.id)}
          onToggleSave={toggleSaveScholarship}
          onClose={() => setSelectedScholarship(null)}
          onApply={handleScholarshipApplication}
        />
      )}

      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        initialForm={applicationForm}
        countries={COUNTRIES}
      />
    </div>
  );
};