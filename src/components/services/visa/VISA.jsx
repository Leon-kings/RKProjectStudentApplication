/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookIcon from '@mui/icons-material/Book';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';

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
  'Spain',
  'New Zealand',
  'Ireland',
  'Denmark',
  'Norway',
  'Finland'
];

const VISA_CATEGORIES = [
  'All Categories',
  'Student Visa',
  'Tourist Visa',
  'Business Visa',
  'Work Visa',
  'Family Visa',
  'Medical Visa',
  'Transit Visa',
  'Diplomatic Visa',
  'Permanent Residence'
];

const PROCESSING_TIMES = [
  'All Processing Times',
  'Express (1-3 days)',
  'Fast (1-2 weeks)',
  'Standard (3-4 weeks)',
  'Normal (4-8 weeks)',
  'Extended (8+ weeks)'
];

const SUCCESS_RATES = [
  'All Success Rates',
  'Very High (95%+)',
  'High (85-95%)',
  'Medium (70-85%)',
  'Standard (50-70%)'
];

// Initial form state
const INITIAL_APPLICATION_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  passportNumber: '',
  passportExpiry: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  currentAddress: '',
  countryOfResidence: '',
  travelPurpose: '',
  targetCountry: '',
  visaType: '',
  intendedTravelDate: '',
  durationOfStay: '',
  sponsor: '',
  employmentStatus: '',
  monthlyIncome: '',
  educationLevel: '',
  previousTravelHistory: '',
  additionalInfo: ''
};

// Featured visa types data
const FEATURED_VISA_TYPES = [
  {
    id: 1,
    name: 'Chinese Student Visa (X1/X2)',
    country: 'China',
    category: 'Student Visa',
    processingTime: '2-4 weeks',
    successRate: '92%',
    fee: '$140 - $280',
    validity: '30 days to 5 years',
    entryType: 'Single/Multiple',
    requirements: ['Admission letter', 'JW201/JW202 form', 'Physical exam', 'Financial proof'],
    documents: ['Passport', 'Photos', 'Application form', 'University documents'],
    interviewRequired: 'Yes',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'For international students admitted to Chinese educational institutions. X1 for long-term (>180 days), X2 for short-term.',
    processingSteps: ['University admission', 'JW form issuance', 'Visa application', 'Medical check', 'Visa collection'],
    embassyLocations: ['Beijing', 'Shanghai', 'Guangzhou', 'Chengdu'],
    tips: ['Apply 2-3 months before semester start', 'Ensure all university documents are original', 'Prepare for possible interview']
  },
  {
    id: 2,
    name: 'Canadian Study Permit',
    country: 'Canada',
    category: 'Student Visa',
    processingTime: '8-16 weeks',
    successRate: '85%',
    fee: '$150 CAD',
    validity: 'Duration of study + 90 days',
    entryType: 'Multiple',
    requirements: ['Letter of Acceptance', 'Proof of funds', 'Medical exam', 'Police certificate'],
    documents: ['Passport', 'Photos', 'Application forms', 'Biometrics'],
    interviewRequired: 'Sometimes',
    image: 'https://images.unsplash.com/photo-1519677100203-7c61d0b01354?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'Required for international students studying in Canada for more than 6 months.',
    processingSteps: ['Get acceptance letter', 'Create online account', 'Submit application', 'Biometrics', 'Medical exam', 'Decision'],
    embassyLocations: ['Visa Application Centers worldwide'],
    tips: ['Show strong ties to home country', 'Provide clear study plan', 'Demonstrate sufficient funds']
  },
  {
    id: 3,
    name: 'Schengen Student Visa',
    country: 'Multiple European Countries',
    category: 'Student Visa',
    processingTime: '4-8 weeks',
    successRate: '88%',
    fee: '€80',
    validity: 'Duration of course',
    entryType: 'Multiple',
    requirements: ['University admission', 'Travel insurance', 'Accommodation proof', 'Financial means'],
    documents: ['Passport', 'Application form', 'Photos', 'Academic records'],
    interviewRequired: 'Yes',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'For studies in Schengen Area countries (Germany, France, Netherlands, etc.)',
    processingSteps: ['Book appointment', 'Submit documents', 'Interview', 'Biometrics', 'Processing', 'Decision'],
    embassyLocations: ['Embassy of main destination country'],
    tips: ['Apply to country of main stay', 'Get Schengen travel insurance', 'Book refundable flights']
  }
];

// Interview tips
const INTERVIEW_TIPS = [
  {
    id: 1,
    title: 'Dress Professionally',
    description: 'Wear formal or business casual attire. First impressions matter.',
    icon: BusinessIcon
  },
  {
    id: 2,
    title: 'Know Your Documents',
    description: 'Be familiar with every document in your application.',
    icon: DescriptionIcon
  },
  {
    id: 3,
    title: 'Be Clear and Concise',
    description: 'Answer questions directly without unnecessary details.',
    icon: PsychologyIcon
  },
  {
    id: 4,
    title: 'Show Strong Ties',
    description: 'Demonstrate connections to your home country.',
    icon: FamilyRestroomIcon
  },
  {
    id: 5,
    title: 'Practice Common Questions',
    description: 'Rehearse answers to typical visa interview questions.',
    icon: MenuBookIcon
  }
];

// Memoized Visa Card Component
const VisaCard = React.memo(({ visa, isSaved, onToggleSave, onViewDetails, onGenerateChecklist }) => {
  const successRateNum = parseFloat(visa.successRate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={visa.image}
          alt={visa.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
            visa.category === 'Student Visa' ? 'bg-blue-600' : 
            visa.category === 'Tourist Visa' ? 'bg-green-600' : 
            visa.category === 'Work Visa' ? 'bg-purple-600' : 'bg-orange-600'
          }`}>
            {visa.category}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(visa.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            {isSaved ? (
              <BookmarkIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          {visa.featured && (
            <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
              Featured
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full">
            <LocationOnIcon className="h-3 w-3 mr-1" />
            <span className="text-xs font-bold">{visa.country}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{visa.name}</h3>
            <div className="flex items-center text-gray-600">
              <FlightTakeoffIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{visa.country}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Success Rate</div>
            <div className={`font-semibold ${
              successRateNum >= 90 ? 'text-green-600' :
              successRateNum >= 80 ? 'text-yellow-600' : 'text-orange-600'
            }`}>
              {visa.successRate}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <ScheduleIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Processing</span>
            </div>
            <p className="text-sm text-gray-600">{visa.processingTime}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <AttachMoneyIcon className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Fee</span>
            </div>
            <p className="text-sm text-gray-600">{visa.fee}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {visa.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {req}
              </span>
            ))}
            {visa.requirements.length > 3 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                +{visa.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              visa.interviewRequired === 'Yes' 
                ? 'bg-orange-100 text-orange-800' 
                : visa.interviewRequired === 'Sometimes'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              Interview: {visa.interviewRequired}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onGenerateChecklist(visa)}
              className="text-blue-600 font-semibold text-sm hover:text-blue-700"
            >
              Checklist
            </button>
            <button
              onClick={() => onViewDetails(visa)}
              className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700"
            >
              Details
              <ArrowForwardIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Visa Detail Modal Component
const VisaDetailModal = React.memo(({ visa, isSaved, onToggleSave, onClose, onApply, onGenerateChecklist }) => {
  if (!visa) return null;

  const successRateNum = parseFloat(visa.successRate);

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
                  visa.category === 'Student Visa' ? 'bg-blue-600' : 
                  visa.category === 'Tourist Visa' ? 'bg-green-600' : 
                  visa.category === 'Work Visa' ? 'bg-purple-600' : 'bg-orange-600'
                }`}>
                  {visa.category}
                </div>
                {visa.featured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    Featured Visa
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{visa.name}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{visa.country}</span>
                </div>
                <div className="flex items-center">
                  <AccessTimeIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{visa.processingTime}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onToggleSave(visa.id)}
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
                  src={visa.image}
                  alt={visa.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visa Overview</h3>
                <p className="text-gray-700 mb-4">{visa.description}</p>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <h4 className="font-bold text-blue-800 mb-2">Processing Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    {visa.processingSteps.map((step, index) => (
                      <li key={index} className="text-blue-700">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${
                  successRateNum >= 90 ? 'bg-green-50' :
                  successRateNum >= 80 ? 'bg-yellow-50' : 'bg-orange-50'
                }`}>
                  <div className="flex items-center mb-2">
                    <TrendingUpIcon className={`h-6 w-6 ${
                      successRateNum >= 90 ? 'text-green-600' :
                      successRateNum >= 80 ? 'text-yellow-600' : 'text-orange-600'
                    } mr-2`} />
                    <span className="font-semibold text-gray-800">Success Rate</span>
                  </div>
                  <p className={`text-2xl font-bold ${
                    successRateNum >= 90 ? 'text-green-700' :
                    successRateNum >= 80 ? 'text-yellow-700' : 'text-orange-700'
                  }`}>{visa.successRate}</p>
                  <p className="text-sm text-gray-600 mt-1">Based on RECAPPLY applications</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <CalendarMonthIcon className="h-6 w-6 text-purple-600 mr-2" />
                    <span className="font-semibold text-gray-800">Visa Validity</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">{visa.validity}</p>
                  <p className="text-sm text-gray-600 mt-1">{visa.entryType} entry</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Visa Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                    <p className="font-semibold text-gray-900">{visa.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                    <p className="font-semibold text-gray-900">{visa.processingTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Interview Required</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      visa.interviewRequired === 'Yes' 
                        ? 'bg-orange-100 text-orange-800' 
                        : visa.interviewRequired === 'Sometimes'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {visa.interviewRequired}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
                <h4 className="font-bold mb-4">Required Documents</h4>
                <ul className="space-y-2">
                  {visa.documents.map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <ChecklistIcon className="h-4 w-4 mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onApply(visa)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Apply for this Visa
                </button>
                <button
                  onClick={() => onGenerateChecklist(visa)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Generate Document Checklist
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Embassy Locations</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {visa.embassyLocations.map((location, index) => (
                    <li key={index} className="flex items-start">
                      <LocationOnIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {visa.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <VerifiedIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Expert Tips</h4>
                <ul className="text-yellow-700 space-y-2">
                  {visa.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Document Checklist Modal Component
const DocumentChecklistModal = React.memo(({ isOpen, onClose, checklist, onChecklistChange, onDownloadTemplate }) => {
  const [localChecklist, setLocalChecklist] = useState(checklist);

  useEffect(() => {
    if (isOpen) {
      setLocalChecklist(checklist);
    }
  }, [isOpen, checklist]);

  const handleCheckboxChange = (id) => {
    const updatedChecklist = localChecklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setLocalChecklist(updatedChecklist);
    onChecklistChange(updatedChecklist);
  };

  if (!isOpen) return null;

  const completed = localChecklist.filter(doc => doc.completed).length;
  const total = localChecklist.length;

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
              <h2 className="text-2xl font-bold text-gray-900">Document Checklist</h2>
              <p className="text-gray-600 mt-1">Track your visa application documents</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Required Documents</h3>
              <span className="text-sm text-gray-600">
                {completed} of {total} completed
              </span>
            </div>
            
            <div className="space-y-3">
              {localChecklist.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={doc.completed}
                      onChange={() => handleCheckboxChange(doc.id)}
                      className="h-5 w-5 text-blue-600 rounded mr-3 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-600">{doc.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onDownloadTemplate(doc.name)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <DownloadIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <h4 className="font-bold text-blue-800 mb-2">Document Preparation Tips:</h4>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• All documents must be in English or officially translated</li>
              <li>• Keep original documents and copies ready</li>
              <li>• Documents should be recent (usually within 3-6 months)</li>
              <li>• Photocopies should be clear and legible</li>
              <li>• Organize documents in the order specified by the embassy</li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (completed === total) {
                toast.success('All documents are ready! You can proceed with application.');
              } else {
                toast.info(`You have ${completed} of ${total} documents ready.`);
              }
            }}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Check Document Status
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Interview Tips Modal Component
const InterviewTipsModal = React.memo(({ isOpen, onClose }) => {
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
              <h2 className="text-2xl font-bold text-gray-900">Visa Interview Tips</h2>
              <p className="text-gray-600 mt-1">Prepare for your visa interview with expert guidance</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {INTERVIEW_TIPS.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.id} className="flex items-start p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-700">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-xl">
            <h4 className="font-bold text-green-800 mb-2">Common Interview Questions:</h4>
            <ul className="text-green-700 space-y-2">
              <li>• Why do you want to study in [country]?</li>
              <li>• What are your plans after completing your studies?</li>
              <li>• How will you fund your education and living expenses?</li>
              <li>• Why did you choose this specific university/program?</li>
              <li>• What are your career goals?</li>
              <li>• Do you have any relatives in [country]?</li>
            </ul>
          </div>

          <button
            onClick={() => toast.success('Practice session scheduled! Our consultant will contact you.')}
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Schedule Mock Interview
          </button>
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
  visaTypes 
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
              <h2 className="text-2xl font-bold text-gray-900">Visa Application</h2>
              <p className="text-gray-600 mt-1">Our experts will handle your complete visa process</p>
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
            {/* Personal Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            </div>

            {/* Passport Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Passport Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={localForm.passportNumber}
                    onChange={(e) => handleLocalChange('passportNumber', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="AB1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passport Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={localForm.passportExpiry}
                    onChange={(e) => handleLocalChange('passportExpiry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={localForm.dateOfBirth}
                    onChange={(e) => handleLocalChange('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    required
                    value={localForm.gender}
                    onChange={(e) => handleLocalChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destination Country *
                  </label>
                  <select
                    required
                    value={localForm.targetCountry}
                    onChange={(e) => handleLocalChange('targetCountry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.filter(c => c !== 'All Countries').map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Visa Type *
                  </label>
                  <select
                    required
                    value={localForm.visaType}
                    onChange={(e) => handleLocalChange('visaType', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select visa type</option>
                    {visaTypes.map((visa, index) => (
                      <option key={index} value={visa.name}>{visa.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Intended Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={localForm.intendedTravelDate}
                    onChange={(e) => handleLocalChange('intendedTravelDate', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration of Stay *
                  </label>
                  <select
                    required
                    value={localForm.durationOfStay}
                    onChange={(e) => handleLocalChange('durationOfStay', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select duration</option>
                    <option value="short-term">Short-term (up to 3 months)</option>
                    <option value="medium-term">Medium-term (3-12 months)</option>
                    <option value="long-term">Long-term (1+ years)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employment Status *
                  </label>
                  <select
                    required
                    value={localForm.employmentStatus}
                    onChange={(e) => handleLocalChange('employmentStatus', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select status</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Income (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={localForm.monthlyIncome}
                    onChange={(e) => handleLocalChange('monthlyIncome', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g., 1000"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sponsor Information
                </label>
                <textarea
                  rows="2"
                  value={localForm.sponsor}
                  onChange={(e) => handleLocalChange('sponsor', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="If sponsored, provide sponsor details..."
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                rows="3"
                value={localForm.additionalInfo}
                onChange={(e) => handleLocalChange('additionalInfo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Any additional information about your application..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Submit Visa Application Request
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

// Main VISA Component
export const VISA = () => {
  // State Management
  const [visaTypes, setVisaTypes] = useState([]);
  const [filteredVisaTypes, setFilteredVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [savedVisas, setSavedVisas] = useState([]);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [documentCheckModalOpen, setDocumentCheckModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    visaCategory: '',
    processingTime: '',
    successRate: '',
    applicationStatus: 'open'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('processing');
  const [currentPage, setCurrentPage] = useState(1);
  const [visasPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState('all');
  const [documentChecklist, setDocumentChecklist] = useState([]);
  const [showInterviewTips, setShowInterviewTips] = useState(false);
  const [applicationForm, setApplicationForm] = useState(INITIAL_APPLICATION_FORM);

  // Fetch visa types data
  const fetchVisaTypes = useCallback(async () => {
    setLoading(true);
    try {
      const sampleData = [
        ...FEATURED_VISA_TYPES,
        {
          id: 4,
          name: 'US F-1 Student Visa',
          country: 'USA',
          category: 'Student Visa',
          processingTime: '3-5 weeks',
          successRate: '78%',
          fee: '$185',
          validity: 'Duration of study',
          entryType: 'Multiple',
          requirements: ['Form I-20', 'SEVIS fee payment', 'Strong ties to home country', 'Academic qualifications'],
          documents: ['Passport', 'DS-160 confirmation', 'Photo', 'Form I-20', 'Financial documents'],
          interviewRequired: 'Yes',
          image: 'https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For academic studies in the United States at accredited institutions.',
          processingSteps: ['Get I-20 form', 'Pay SEVIS fee', 'Complete DS-160', 'Schedule interview', 'Attend interview', 'Processing'],
          embassyLocations: ['US Embassy/Consulate in home country'],
          tips: ['Book interview early', 'Be prepared for tough questions', 'Show clear post-study plans']
        },
        {
          id: 5,
          name: 'Australian Student Visa (Subclass 500)',
          country: 'Australia',
          category: 'Student Visa',
          processingTime: '4-8 weeks',
          successRate: '90%',
          fee: '$630 AUD',
          validity: 'Course duration',
          entryType: 'Multiple',
          requirements: ['CoE from institution', 'English proficiency', 'Health insurance', 'Genuine temporary entrant'],
          documents: ['Passport', 'Application form', 'CoE', 'Financial proof', 'Health exam'],
          interviewRequired: 'Sometimes',
          image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For full-time study in Australia at registered institutions.',
          processingSteps: ['Get CoE', 'Create ImmiAccount', 'Submit application', 'Health checks', 'Biometrics', 'Decision'],
          embassyLocations: ['Online application'],
          tips: ['Maintain genuine temporary entrant status', 'Show sufficient funds', 'Meet English requirements']
        },
        {
          id: 6,
          name: 'UK Student Visa (Tier 4)',
          country: 'UK',
          category: 'Student Visa',
          processingTime: '3 weeks',
          successRate: '86%',
          fee: '£348',
          validity: 'Course length + extra time',
          entryType: 'Multiple',
          requirements: ['CAS from institution', 'English language', 'Financial requirements', 'Tuberculosis test'],
          documents: ['Passport', 'CAS', 'Financial evidence', 'Academic documents', 'TB certificate'],
          interviewRequired: 'Sometimes',
          image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For studying at UK educational institutions (now called Student Visa).',
          processingSteps: ['Get CAS', 'Prepare documents', 'Apply online', 'Biometrics', 'Decision', 'BRP collection'],
          embassyLocations: ['Visa Application Centers'],
          tips: ['Apply 3 months before course start', 'Meet maintenance requirements', 'Check English requirements']
        },
        {
          id: 7,
          name: 'German National Visa for Studies',
          country: 'Germany',
          category: 'Student Visa',
          processingTime: '4-12 weeks',
          successRate: '89%',
          fee: '€75',
          validity: '3 months (convert to residence permit)',
          entryType: 'Single',
          requirements: ['University admission', 'Health insurance', 'Blocked account', 'Language proficiency'],
          documents: ['Passport', 'Application forms', 'Admission letter', 'Financial proof', 'Health insurance'],
          interviewRequired: 'Yes',
          image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For long-term studies in Germany (converted to residence permit after arrival).',
          processingSteps: ['Get admission', 'Open blocked account', 'Book appointment', 'Submit application', 'Interview', 'Processing'],
          embassyLocations: ['German Embassy/Consulate'],
          tips: ['Open blocked account with €11,208', 'Get German health insurance', 'Prepare for language test if required']
        },
        {
          id: 8,
          name: 'Japanese Student Visa',
          country: 'Japan',
          category: 'Student Visa',
          processingTime: '5-10 business days',
          successRate: '94%',
          fee: '¥3,000',
          validity: '1-2 years',
          entryType: 'Multiple',
          requirements: ['COE from school', 'Financial support', 'Educational background', 'Purpose of study'],
          documents: ['Passport', 'Visa application', 'Photo', 'COE', 'Flight itinerary'],
          interviewRequired: 'Rarely',
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For studying at Japanese language schools, universities, or vocational schools.',
          processingSteps: ['School applies for COE', 'Receive COE', 'Apply for visa', 'Submit documents', 'Processing', 'Collection'],
          embassyLocations: ['Japanese Embassy/Consulate'],
          tips: ['Apply through accredited schools', 'COE processing takes 1-3 months', 'Show stable financial support']
        },
        {
          id: 9,
          name: 'South Korean Student Visa (D-2)',
          country: 'South Korea',
          category: 'Student Visa',
          processingTime: '2-4 weeks',
          successRate: '91%',
          fee: '$60',
          validity: 'Up to 2 years',
          entryType: 'Single',
          requirements: ['Certificate of Admission', 'Financial proof', 'Academic transcripts', 'Study plan'],
          documents: ['Passport', 'Application form', 'Photos', 'Admission documents', 'Financial statements'],
          interviewRequired: 'Sometimes',
          image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For degree programs at Korean universities and colleges.',
          processingSteps: ['University admission', 'Receive admission packet', 'Apply for visa', 'Submit documents', 'Processing'],
          embassyLocations: ['Korean Embassy/Consulate'],
          tips: ['Apply 3 months before semester', 'Show minimum $10,000 balance', 'Prepare detailed study plan']
        },
        {
          id: 10,
          name: 'Turkish Student Visa',
          country: 'Turkey',
          category: 'Student Visa',
          processingTime: '2-3 weeks',
          successRate: '95%',
          fee: '$140',
          validity: '1 year renewable',
          entryType: 'Single',
          requirements: ['University acceptance', 'Financial means', 'Health insurance', 'Accommodation proof'],
          documents: ['Passport', 'Application form', 'Photos', 'Acceptance letter', 'Financial documents'],
          interviewRequired: 'No',
          image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For international students studying at Turkish universities.',
          processingSteps: ['Get acceptance', 'Complete e-visa application', 'Submit documents', 'Processing', 'Receive visa'],
          embassyLocations: ['Turkish Embassy/Consulate or online'],
          tips: ['Apply through e-visa system', 'Get residence permit within 1 month of arrival', 'Register with police']
        },
        {
          id: 11,
          name: 'Polish Student Visa',
          country: 'Poland',
          category: 'Student Visa',
          processingTime: '10-15 days',
          successRate: '93%',
          fee: '€80',
          validity: '90 days (extend in Poland)',
          entryType: 'Single',
          requirements: ['University admission', 'Health insurance', 'Financial proof', 'Accommodation'],
          documents: ['Passport', 'Application form', 'Photos', 'Admission letter', 'Insurance policy'],
          interviewRequired: 'Sometimes',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For studies in Poland (national visa converted to temporary residence card).',
          processingSteps: ['University admission', 'Book appointment', 'Submit application', 'Interview if required', 'Processing'],
          embassyLocations: ['Polish Consulate'],
          tips: ['Apply for temporary residence after arrival', 'Get Polish health insurance', 'Show €2,000+ per year funds']
        }
      ];

      setVisaTypes(sampleData);
      setFilteredVisaTypes(sampleData);
    } catch (error) {
      console.error('Error fetching visa types:', error);
      toast.error('Failed to load visa data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisaTypes();
  }, [fetchVisaTypes]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...visaTypes];

    if (searchQuery) {
      filtered = filtered.filter(visa =>
        visa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visa.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visa.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.country && filters.country !== 'All Countries') {
      filtered = filtered.filter(visa => visa.country === filters.country);
    }

    if (filters.visaCategory && filters.visaCategory !== 'All Categories') {
      filtered = filtered.filter(visa => visa.category === filters.visaCategory);
    }

    if (filters.processingTime && filters.processingTime !== 'All Processing Times') {
      filtered = filtered.filter(visa => {
        const time = visa.processingTime.toLowerCase();
        if (filters.processingTime.includes('Express')) return time.includes('days') || time.includes('week');
        if (filters.processingTime.includes('Fast')) return time.includes('week') && !time.includes('month');
        if (filters.processingTime.includes('Standard')) return time.includes('3-4') || time.includes('4-8');
        if (filters.processingTime.includes('Normal')) return time.includes('4-8') || time.includes('8+');
        if (filters.processingTime.includes('Extended')) return time.includes('8+') || time.includes('12');
        return true;
      });
    }

    if (filters.successRate && filters.successRate !== 'All Success Rates') {
      filtered = filtered.filter(visa => {
        const rate = parseFloat(visa.successRate);
        if (filters.successRate.includes('Very High')) return rate >= 95;
        if (filters.successRate.includes('High')) return rate >= 85 && rate < 95;
        if (filters.successRate.includes('Medium')) return rate >= 70 && rate < 85;
        if (filters.successRate.includes('Standard')) return rate >= 50 && rate < 70;
        return true;
      });
    }

    switch (sortBy) {
      case 'processing':
        filtered.sort((a, b) => {
          const getWeeks = (time) => {
            if (time.includes('days')) return parseInt(time) / 7;
            if (time.includes('week')) return parseInt(time);
            if (time.includes('month')) return parseInt(time) * 4;
            return 999;
          };
          return getWeeks(a.processingTime) - getWeeks(b.processingTime);
        });
        break;
      case 'success':
        filtered.sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate));
        break;
      case 'fee':
        filtered.sort((a, b) => {
          const getFee = (fee) => parseFloat(fee.replace(/[^0-9.]/g, ''));
          return getFee(a.fee) - getFee(b.fee);
        });
        break;
      case 'country':
        filtered.sort((a, b) => a.country.localeCompare(b.country));
        break;
      default:
        filtered.sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate));
    }

    setFilteredVisaTypes(filtered);
    setCurrentPage(1);
  }, [visaTypes, filters, searchQuery, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Pagination
  const indexOfLastVisa = currentPage * visasPerPage;
  const indexOfFirstVisa = indexOfLastVisa - visasPerPage;
  const currentVisas = filteredVisaTypes.slice(indexOfFirstVisa, indexOfLastVisa);
  const totalPages = Math.ceil(filteredVisaTypes.length / visasPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toggle save visa
  const toggleSaveVisa = useCallback((visaId) => {
    setSavedVisas(prev => {
      if (prev.includes(visaId)) {
        toast.info('Removed from saved visas');
        return prev.filter(id => id !== visaId);
      } else {
        toast.success('Visa saved to favorites');
        return [...prev, visaId];
      }
    });
  }, []);

  // Generate document checklist
  const generateChecklist = useCallback((visa) => {
    const checklist = [
      { id: 1, name: 'Valid Passport', description: 'Minimum 6 months validity', completed: false },
      { id: 2, name: 'Passport Photos', description: 'Recent color photos as per specifications', completed: false },
      { id: 3, name: 'Completed Application Form', description: 'Signed and dated', completed: false },
      { id: 4, name: 'Proof of Financial Means', description: 'Bank statements, sponsorship letters', completed: false },
      { id: 5, name: 'Travel Itinerary', description: 'Flight bookings, accommodation details', completed: false },
      { id: 6, name: 'Health Insurance', description: 'Valid for destination country', completed: false },
      { id: 7, name: 'Police Clearance Certificate', description: 'If required by destination', completed: false },
      { id: 8, name: 'Medical Examination Report', description: 'If required by destination', completed: false }
    ];

    if (visa.category === 'Student Visa') {
      checklist.push(
        { id: 9, name: 'Admission Letter', description: 'From educational institution', completed: false },
        { id: 10, name: 'Academic Transcripts', description: 'Previous educational records', completed: false },
        { id: 11, name: 'Language Proficiency', description: 'Test scores if required', completed: false }
      );
    }

    setDocumentChecklist(checklist);
    setDocumentCheckModalOpen(true);
  }, []);

  // Handle checklist update
  const handleChecklistUpdate = useCallback((updatedChecklist) => {
    setDocumentChecklist(updatedChecklist);
  }, []);

  // Handle download template
  const handleDownloadTemplate = useCallback((docName) => {
    toast.info(`Downloading template for ${docName}`);
  }, []);

  // Handle application submission
  const handleApplicationSubmit = useCallback(async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}/visa-application`, {
        ...formData,
        timestamp: new Date().toISOString(),
        visaType: selectedVisa?.name
      });

      toast.success('Visa application submitted successfully! Our consultant will contact you within 24 hours.');
      setApplicationModalOpen(false);
      setApplicationForm(INITIAL_APPLICATION_FORM);
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
      console.error('Application error:', error);
    }
  }, [selectedVisa]);

  // Handle visa application
  const handleVisaApplication = useCallback((visa) => {
    setApplicationForm(prev => ({
      ...prev,
      visaType: visa.name,
      targetCountry: visa.country
    }));
    setApplicationModalOpen(true);
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      country: '',
      visaCategory: '',
      processingTime: '',
      successRate: '',
      applicationStatus: 'open'
    });
    setSearchQuery('');
    setActiveTab('all');
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'Student Visas') {
      setFilters(prev => ({...prev, visaCategory: 'Student Visa'}));
    } else if (tab === 'Tourist Visas') {
      setFilters(prev => ({...prev, visaCategory: 'Tourist Visa'}));
    } else if (tab === 'Work Visas') {
      setFilters(prev => ({...prev, visaCategory: 'Work Visa'}));
    } else if (tab === 'Fast Processing') {
      setFilters(prev => ({...prev, processingTime: 'Express (1-3 days)'}));
    } else if (tab === 'High Success') {
      setFilters(prev => ({...prev, successRate: 'Very High (95%+)'}));
    } else {
      setFilters({
        country: '',
        visaCategory: '',
        processingTime: '',
        successRate: '',
        applicationStatus: 'open'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Visa Application Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert visa processing with 95% success rate for students, tourists, and professionals
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
            { icon: FlightTakeoffIcon, value: '5,000+', label: 'Visas Processed' },
            { icon: CheckCircleIcon, value: '95%', label: 'Success Rate' },
            { icon: GroupsIcon, value: '50+', label: 'Countries Covered' },
            { icon: EmojiEventsIcon, value: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={() => setApplicationModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <DescriptionIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Start Visa Application</h3>
            <p className="opacity-90">Get expert help with your visa process</p>
          </button>
          
          <button
            onClick={() => setDocumentCheckModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <ChecklistIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Document Checklist</h3>
            <p className="opacity-90">Track your visa documents</p>
          </button>
          
          <button
            onClick={() => setShowInterviewTips(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <PsychologyIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Interview Preparation</h3>
            <p className="opacity-90">Get ready for visa interview</p>
          </button>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Visas</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by country, visa type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
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
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="processing">Processing Time</option>
                <option value="success">Success Rate</option>
                <option value="fee">Visa Fee</option>
                <option value="country">Country</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Visa Category</label>
              <select
                value={filters.visaCategory}
                onChange={(e) => setFilters(prev => ({...prev, visaCategory: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {VISA_CATEGORIES.map((category, index) => (
                  <option key={index} value={category === 'All Categories' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Processing Time</label>
              <select
                value={filters.processingTime}
                onChange={(e) => setFilters(prev => ({...prev, processingTime: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {PROCESSING_TIMES.map((time, index) => (
                  <option key={index} value={time === 'All Processing Times' ? '' : time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Success Rate</label>
              <select
                value={filters.successRate}
                onChange={(e) => setFilters(prev => ({...prev, successRate: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {SUCCESS_RATES.map((rate, index) => (
                  <option key={index} value={rate === 'All Success Rates' ? '' : rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {['All Visas', 'Student Visas', 'Tourist Visas', 'Work Visas', 'Fast Processing', 'High Success'].map((tab) => (
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

        {/* Featured Visas Section */}
        {activeTab === 'All Visas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Student Visas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_VISA_TYPES.map((visa) => (
                <VisaCard
                  key={visa.id}
                  visa={visa}
                  isSaved={savedVisas.includes(visa.id)}
                  onToggleSave={toggleSaveVisa}
                  onViewDetails={setSelectedVisa}
                  onGenerateChecklist={generateChecklist}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Visas Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading visa information...</p>
            </div>
          ) : filteredVisaTypes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No visas found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredVisaTypes.length} Visa Types Available
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setApplicationModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Free Consultation
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentVisas.map((visa) => (
                  <VisaCard
                    key={visa.id}
                    visa={visa}
                    isSaved={savedVisas.includes(visa.id)}
                    onToggleSave={toggleSaveVisa}
                    onViewDetails={setSelectedVisa}
                    onGenerateChecklist={generateChecklist}
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

        {/* Why Choose Our Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RECAPPLY Visa Services?</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Expert Visa Consultants',
                  description: 'Experienced professionals with 10+ years in visa processing'
                },
                {
                  title: '95% Success Rate',
                  description: 'Proven track record of successful visa applications'
                },
                {
                  title: 'End-to-End Support',
                  description: 'From document preparation to interview training'
                },
                {
                  title: 'Fast Processing',
                  description: 'Priority processing with embassy connections'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-6">Our Visa Services Include</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <DescriptionIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Document Preparation</h3>
                  <p className="opacity-90">We prepare and verify all required documents</p>
                </div>
              </div>
              <div className="flex items-center">
                <ChecklistIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Application Review</h3>
                  <p className="opacity-90">Thorough review to eliminate errors</p>
                </div>
              </div>
              <div className="flex items-center">
                <PsychologyIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Interview Coaching</h3>
                  <p className="opacity-90">Mock interviews and preparation tips</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Visa Application Today!</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful applicants who have obtained their visas with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setApplicationModalOpen(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Apply for Visa Now
            </button>
            <button
              onClick={() => setDocumentCheckModalOpen(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Get Document Checklist
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedVisa && (
        <VisaDetailModal
          visa={selectedVisa}
          isSaved={savedVisas.includes(selectedVisa.id)}
          onToggleSave={toggleSaveVisa}
          onClose={() => setSelectedVisa(null)}
          onApply={handleVisaApplication}
          onGenerateChecklist={generateChecklist}
        />
      )}

      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        initialForm={applicationForm}
        visaTypes={visaTypes}
      />

      <DocumentChecklistModal
        isOpen={documentCheckModalOpen}
        onClose={() => setDocumentCheckModalOpen(false)}
        checklist={documentChecklist}
        onChecklistChange={handleChecklistUpdate}
        onDownloadTemplate={handleDownloadTemplate}
      />

      <InterviewTipsModal
        isOpen={showInterviewTips}
        onClose={() => setShowInterviewTips(false)}
      />
    </div>
  );
};