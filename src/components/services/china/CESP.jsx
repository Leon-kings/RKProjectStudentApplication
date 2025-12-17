/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookIcon from '@mui/icons-material/Book';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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
import DescriptionIcon from '@mui/icons-material/Description';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import TranslateIcon from '@mui/icons-material/Translate';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FunctionsIcon from '@mui/icons-material/Functions';
import BiotechIcon from '@mui/icons-material/Biotech';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api';

// Constants
const EXAM_TYPES = [
  'All Exams',
  'HSK (Chinese Proficiency)',
  'HSKK (Speaking Test)',
  'BCT (Business Chinese)',
  'YCT (Youth Chinese Test)',
  'CSCA (China Scholastic Assessment)',
  'Gaokao (University Entrance)',
  'Subject-specific Tests'
];

const EXAM_LEVELS = [
  'All Levels',
  'Beginner (HSK 1-2)',
  'Intermediate (HSK 3-4)',
  'Advanced (HSK 5-6)',
  'Business Chinese',
  'Academic Chinese',
  'University Entrance'
];

const STUDY_MODES = [
  'Online Self-paced',
  'Online Live Classes',
  'In-person Intensive',
  'Weekend Classes',
  'One-on-one Tutoring',
  'Group Study'
];

const INITIAL_ENROLLMENT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  currentEducation: '',
  targetExam: '',
  targetLevel: '',
  preferredDate: '',
  studyMode: '',
  hoursPerWeek: '',
  priorExperience: '',
  specificNeeds: ''
};

// Featured exams data
const FEATURED_EXAMS = [
  {
    id: 1,
    name: 'HSK (Hanyu Shuiping Kaoshi)',
    type: 'Chinese Proficiency',
    levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'],
    nextExamDate: 'March 16, 2024',
    registrationDeadline: 'February 28, 2024',
    registrationStatus: 'open',
    duration: '2-3 hours',
    fee: '$30 - $100',
    difficulty: 'Intermediate',
    passingScore: '180/300',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'The official Chinese proficiency test for non-native speakers. Required for university admissions in China.',
    requirements: ['Valid passport', 'Recent photo', 'Registration form'],
    testCenters: ['Beijing', 'Shanghai', 'Guangzhou', 'Online'],
    preparationTime: '3-6 months',
    recommendedFor: ['University applicants', 'Job seekers', 'Language learners']
  },
  {
    id: 2,
    name: 'CSCA (China Scholastic Competency Assessment)',
    type: 'University Entrance',
    levels: ['Undergraduate Entry'],
    nextExamDate: 'May 18, 2024',
    registrationDeadline: 'April 15, 2024',
    registrationStatus: 'open',
    duration: '4 hours',
    fee: '$150',
    difficulty: 'Advanced',
    passingScore: '60%',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'Mandatory exam for international students applying to Chinese undergraduate programs. Tests academic readiness.',
    requirements: ['High school diploma', 'Passport copy', 'Application form'],
    testCenters: ['Designated centers worldwide'],
    preparationTime: '6-12 months',
    recommendedFor: ['Undergraduate applicants to China'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Chinese', 'English']
  },
  {
    id: 3,
    name: 'HSKK (Chinese Speaking Test)',
    type: 'Speaking Proficiency',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    nextExamDate: 'April 20, 2024',
    registrationDeadline: 'March 30, 2024',
    registrationStatus: 'open',
    duration: '30-45 minutes',
    fee: '$40 - $80',
    difficulty: 'Varies by level',
    passingScore: '60/100',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    description: 'Assesses spoken Chinese ability. Often required with HSK for comprehensive language evaluation.',
    requirements: ['HSK registration', 'Audio recording equipment'],
    testCenters: ['Same as HSK centers', 'Online option'],
    preparationTime: '2-4 months',
    recommendedFor: ['Scholarship applicants', 'Teaching positions']
  }
];

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the minimum HSK level required for undergraduate study in China?',
    options: ['HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
    correctAnswer: 1,
    explanation: 'Most Chinese universities require HSK 4 (180 points minimum) for undergraduate programs taught in Chinese.'
  },
  {
    id: 2,
    question: 'How long is the CSCA exam valid?',
    options: ['1 year', '2 years', '3 years', '4 years'],
    correctAnswer: 1,
    explanation: 'CSCA results are valid for 2 years from the exam date.'
  },
  {
    id: 3,
    question: 'Which section has the highest weight in CSCA?',
    options: ['Mathematics', 'Physics', 'Chemistry', 'Chinese'],
    correctAnswer: 0,
    explanation: 'Mathematics carries 40% weight in the CSCA exam, making it the most important section.'
  }
];

// Memoized Exam Card Component
const ExamCard = React.memo(({ exam, isSaved, onToggleSave, onViewDetails }) => {
  const daysUntilExam = Math.ceil((new Date(exam.nextExamDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isUpcoming = daysUntilExam <= 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={exam.image}
          alt={exam.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
            exam.type.includes('Proficiency') ? 'bg-blue-600' : 
            exam.type.includes('Entrance') ? 'bg-purple-600' : 
            exam.type.includes('Business') ? 'bg-green-600' : 'bg-orange-600'
          }`}>
            {exam.type.split(' ')[0]}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(exam.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            {isSaved ? (
              <BookmarkIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          {exam.featured && (
            <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
              Featured
            </div>
          )}
        </div>
        {isUpcoming && (
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              {daysUntilExam <= 30 ? 'Register Now!' : 'Upcoming'}
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{exam.name}</h3>
            <div className="flex items-center text-gray-600">
              <AssessmentIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{exam.type}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Difficulty</div>
            <div className={`font-semibold ${
              exam.difficulty === 'Beginner' ? 'text-green-600' :
              exam.difficulty === 'Intermediate' ? 'text-yellow-600' :
              exam.difficulty === 'Advanced' ? 'text-orange-600' : 'text-red-600'
            }`}>
              {exam.difficulty}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <CalendarMonthIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Next Exam</span>
            </div>
            <p className="text-sm text-gray-600 font-bold">{exam.nextExamDate}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <AttachMoneyIcon className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Fee</span>
            </div>
            <p className="text-sm text-gray-600">{exam.fee}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Levels</h4>
          <div className="flex flex-wrap gap-2">
            {exam.levels.slice(0, 3).map((level, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {level}
              </span>
            ))}
            {exam.levels.length > 3 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                +{exam.levels.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              exam.registrationStatus === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              Registration {exam.registrationStatus.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => onViewDetails(exam)}
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

// Exam Detail Modal Component
const ExamDetailModal = React.memo(({ exam, isSaved, onToggleSave, onClose, onEnroll }) => {
  if (!exam) return null;

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
                  exam.type.includes('Proficiency') ? 'bg-blue-600' : 
                  exam.type.includes('Entrance') ? 'bg-purple-600' : 
                  exam.type.includes('Business') ? 'bg-green-600' : 'bg-orange-600'
                }`}>
                  {exam.type}
                </div>
                {exam.featured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    Featured Exam
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{exam.name}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <TimerIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{exam.duration}</span>
                </div>
                <div className="flex items-center">
                  <AssessmentIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className={`font-semibold ${
                    exam.difficulty === 'Beginner' ? 'text-green-600' :
                    exam.difficulty === 'Intermediate' ? 'text-yellow-600' :
                    exam.difficulty === 'Advanced' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {exam.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onToggleSave(exam.id)}
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
                  src={exam.image}
                  alt={exam.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Exam Overview</h3>
                <p className="text-gray-700 mb-4">{exam.description}</p>
                
                {exam.subjects && (
                  <div className="bg-blue-50 p-4 rounded-xl mb-4">
                    <h4 className="font-bold text-blue-800 mb-2">Test Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exam.subjects.map((subject, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <CalendarMonthIcon className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-gray-800">Next Exam Date</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{exam.nextExamDate}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Registration until: {exam.registrationDeadline}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <SpeedIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-800">Preparation Time</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{exam.preparationTime}</p>
                  <p className="text-sm text-gray-600 mt-1">Recommended study duration</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Exam Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Passing Score</p>
                    <p className="font-semibold text-gray-900">{exam.passingScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Exam Fee</p>
                    <p className="font-semibold text-gray-900">{exam.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Registration Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      exam.registrationStatus === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {exam.registrationStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5 rounded-xl text-white">
                <h4 className="font-bold mb-4">Recommended For</h4>
                <ul className="space-y-2">
                  {exam.recommendedFor.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onEnroll(exam)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Enroll in Preparation Course
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Test Centers</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {exam.testCenters.map((center, index) => (
                    <li key={index} className="flex items-start">
                      <LocationOnIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{center}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {exam.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <DescriptionIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <ErrorIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• Registration closes on {exam.registrationDeadline}</li>
                  <li>• Late registrations may incur additional fees</li>
                  <li>• Test results are typically available 4-6 weeks after the exam</li>
                  <li>• Bring valid identification to the test center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Enrollment Modal Component with local state to prevent cursor issues
const EnrollmentModal = React.memo(({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialForm, 
  exams 
}) => {
  const [localForm, setLocalForm] = useState(initialForm);
  const formRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalForm(initialForm);
      // Focus first input after a short delay to ensure modal is fully rendered
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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(localForm);
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
              <h2 className="text-2xl font-bold text-gray-900">Exam Preparation Enrollment</h2>
              <p className="text-gray-600 mt-1">Join our specialized preparation courses for Chinese exams</p>
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
                  <option value="other">Other</option>
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
                  <option value="">Select level</option>
                  <option value="high-school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="working-professional">Working Professional</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Exam *
                </label>
                <select
                  required
                  value={localForm.targetExam}
                  onChange={(e) => handleLocalChange('targetExam', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select exam</option>
                  {exams.map((exam, index) => (
                    <option key={index} value={exam.name}>{exam.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Level *
                </label>
                <select
                  required
                  value={localForm.targetLevel}
                  onChange={(e) => handleLocalChange('targetLevel', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner (HSK 1-2)</option>
                  <option value="intermediate">Intermediate (HSK 3-4)</option>
                  <option value="advanced">Advanced (HSK 5-6)</option>
                  <option value="university">University Entrance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Study Mode *
                </label>
                <select
                  required
                  value={localForm.studyMode}
                  onChange={(e) => handleLocalChange('studyMode', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select mode</option>
                  {STUDY_MODES.map((mode, index) => (
                    <option key={index} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hours Available Per Week *
                </label>
                <select
                  required
                  value={localForm.hoursPerWeek}
                  onChange={(e) => handleLocalChange('hoursPerWeek', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select hours</option>
                  <option value="5-10">5-10 hours</option>
                  <option value="10-15">10-15 hours</option>
                  <option value="15-20">15-20 hours</option>
                  <option value="20+">20+ hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prior Chinese Language Experience
              </label>
              <textarea
                rows="2"
                value={localForm.priorExperience}
                onChange={(e) => handleLocalChange('priorExperience', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Describe any previous Chinese language study or exposure..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specific Learning Needs or Goals
              </label>
              <textarea
                rows="2"
                value={localForm.specificNeeds}
                onChange={(e) => handleLocalChange('specificNeeds', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Any specific areas you want to focus on or target scores..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Submit Enrollment Request
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Quiz Modal Component
const QuizModal = React.memo(({ 
  isOpen, 
  onClose, 
  questions, 
  currentQuestion, 
  testResults, 
  onAnswer 
}) => {
  if (!isOpen || currentQuestion >= questions.length) return null;

  const currentQ = questions[currentQuestion];

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Knowledge Quiz</h2>
              <p className="text-gray-600 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <QuizIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{currentQ.question}</h3>
            </div>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  className="w-full p-4 text-left border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      testResults[currentQ.id] !== undefined 
                        ? index === currentQ.correctAnswer 
                          ? 'border-green-500 bg-green-100' 
                          : 'border-gray-300'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            Test your knowledge about Chinese exams and requirements
          </div>
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

// Main CESP Component
export const CESP = () => {
  // State Management
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [savedExams, setSavedExams] = useState([]);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    examType: '',
    level: '',
    date: '',
    registrationStatus: 'open'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [examsPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState('all');
  const [testResults, setTestResults] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [enrollmentForm, setEnrollmentForm] = useState(INITIAL_ENROLLMENT_FORM);

  // Fetch exams data
  const fetchExams = useCallback(async () => {
    setLoading(true);
    try {
      const sampleData = [
        ...FEATURED_EXAMS,
        {
          id: 4,
          name: 'BCT (Business Chinese Test)',
          type: 'Business Chinese',
          levels: ['BCT (A)', 'BCT (B)'],
          nextExamDate: 'June 15, 2024',
          registrationDeadline: 'May 30, 2024',
          registrationStatus: 'open',
          duration: '3 hours',
          fee: '$50 - $120',
          difficulty: 'Intermediate to Advanced',
          passingScore: '180/300',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Assesses Chinese language ability in business and workplace contexts.',
          requirements: ['Work experience helpful', 'Business vocabulary'],
          testCenters: ['Major cities worldwide'],
          preparationTime: '4-6 months',
          recommendedFor: ['Business professionals', 'Corporate employees']
        },
        {
          id: 5,
          name: 'YCT (Youth Chinese Test)',
          type: 'Youth Chinese',
          levels: ['YCT 1', 'YCT 2', 'YCT 3', 'YCT 4'],
          nextExamDate: 'July 10, 2024',
          registrationDeadline: 'June 25, 2024',
          registrationStatus: 'open',
          duration: '1-2 hours',
          fee: '$20 - $60',
          difficulty: 'Beginner to Intermediate',
          passingScore: '120/200',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Designed for primary and secondary school students learning Chinese.',
          requirements: ['Student status', 'Parental consent for minors'],
          testCenters: ['Schools', 'Confucius Institutes'],
          preparationTime: '2-4 months',
          recommendedFor: ['School students', 'Young learners']
        },
        {
          id: 6,
          name: 'Mathematics Entrance Test',
          type: 'Subject-specific',
          levels: ['Undergraduate Level'],
          nextExamDate: 'August 5, 2024',
          registrationDeadline: 'July 20, 2024',
          registrationStatus: 'open',
          duration: '3 hours',
          fee: '$100',
          difficulty: 'Advanced',
          passingScore: '60%',
          image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Specialized mathematics test for engineering and science programs.',
          requirements: ['High school mathematics', 'Calculator'],
          testCenters: ['Designated centers'],
          preparationTime: '3-6 months',
          recommendedFor: ['Engineering applicants', 'Science majors'],
          topics: ['Calculus', 'Algebra', 'Geometry', 'Statistics']
        },
        {
          id: 7,
          name: 'Medical Chinese Test',
          type: 'Subject-specific',
          levels: ['Professional Level'],
          nextExamDate: 'September 12, 2024',
          registrationDeadline: 'August 28, 2024',
          registrationStatus: 'open',
          duration: '4 hours',
          fee: '$200',
          difficulty: 'Expert',
          passingScore: '70%',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'For medical professionals seeking to practice or study medicine in China.',
          requirements: ['Medical background', 'HSK 5 minimum'],
          testCenters: ['Medical universities'],
          preparationTime: '6-12 months',
          recommendedFor: ['Medical students', 'Healthcare professionals']
        },
        {
          id: 8,
          name: 'Legal Chinese Test',
          type: 'Subject-specific',
          levels: ['Professional Level'],
          nextExamDate: 'October 20, 2024',
          registrationDeadline: 'October 5, 2024',
          registrationStatus: 'open',
          duration: '3.5 hours',
          fee: '$180',
          difficulty: 'Expert',
          passingScore: '65%',
          image: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Specialized test for legal professionals and law students.',
          requirements: ['Legal background', 'HSK 5 minimum'],
          testCenters: ['Law schools', 'Legal institutes'],
          preparationTime: '6-9 months',
          recommendedFor: ['Law students', 'Legal professionals']
        }
      ];

      setExams(sampleData);
      setFilteredExams(sampleData);
    } catch (error) {
      console.error('Error fetching exams:', error);
      toast.error('Failed to load exam data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...exams];

    if (searchQuery) {
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.levels.some(level => level.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.examType && filters.examType !== 'All Exams') {
      filtered = filtered.filter(exam => exam.type.includes(filters.examType.split(' ')[0]));
    }

    if (filters.level && filters.level !== 'All Levels') {
      filtered = filtered.filter(exam => 
        exam.levels.some(level => level.toLowerCase().includes(filters.level.toLowerCase().split(' ')[0]))
      );
    }

    if (filters.registrationStatus) {
      filtered = filtered.filter(exam => exam.registrationStatus === filters.registrationStatus);
    }

    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.nextExamDate) - new Date(b.nextExamDate));
        break;
      case 'difficulty':
        const difficultyOrder = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        filtered.sort((a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty));
        break;
      case 'fee':
        filtered.sort((a, b) => {
          const aFee = parseInt(a.fee.replace(/[^0-9]/g, ''));
          const bFee = parseInt(b.fee.replace(/[^0-9]/g, ''));
          return aFee - bFee;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => new Date(a.nextExamDate) - new Date(b.nextExamDate));
    }

    setFilteredExams(filtered);
    setCurrentPage(1);
  }, [exams, filters, searchQuery, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Pagination
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toggle save exam
  const toggleSaveExam = useCallback((examId) => {
    setSavedExams(prev => {
      if (prev.includes(examId)) {
        toast.info('Removed from saved exams');
        return prev.filter(id => id !== examId);
      } else {
        toast.success('Exam saved to favorites');
        return [...prev, examId];
      }
    });
  }, []);

  // Handle quiz answer
  const handleQuizAnswer = useCallback((selectedOption) => {
    const currentQ = QUIZ_QUESTIONS[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    setTestResults(prev => ({
      ...prev,
      [currentQ.id]: isCorrect
    }));

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      toast.success('Correct! ' + currentQ.explanation);
    } else {
      toast.error('Incorrect. ' + currentQ.explanation);
    }

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 1500);
    } else {
      setTimeout(() => {
        setShowQuiz(false);
        toast.success(`Quiz completed! Score: ${quizScore + (isCorrect ? 1 : 0)}/${QUIZ_QUESTIONS.length}`);
        setCurrentQuestion(0);
        setQuizScore(0);
        setTestResults({});
      }, 1500);
    }
  }, [currentQuestion, quizScore]);

  // Handle enrollment submission
  const handleEnrollmentSubmit = useCallback(async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/exam-enrollment`, {
        ...formData,
        timestamp: new Date().toISOString(),
        examType: selectedExam?.name
      });

      toast.success('Enrollment submitted successfully! Our consultant will contact you within 24 hours.');
      setEnrollmentModalOpen(false);
      setEnrollmentForm(INITIAL_ENROLLMENT_FORM);
    } catch (error) {
      toast.error('Error submitting enrollment. Please try again.');
      console.error('Enrollment error:', error);
    }
  }, [selectedExam]);

  // Handle exam enrollment
  const handleExamEnrollment = useCallback((exam) => {
    setEnrollmentForm(prev => ({
      ...prev,
      targetExam: exam.name,
      targetLevel: exam.levels[0]
    }));
    setEnrollmentModalOpen(true);
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      examType: '',
      level: '',
      date: '',
      registrationStatus: 'open'
    });
    setSearchQuery('');
    setActiveTab('all');
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'HSK Tests') {
      setFilters(prev => ({...prev, examType: 'HSK (Chinese Proficiency)'}));
    } else if (tab === 'CSCA Prep') {
      setFilters(prev => ({...prev, examType: 'CSCA (China Scholastic Assessment)'}));
    } else if (tab === 'Speaking Tests') {
      setSearchQuery('Speaking');
    } else if (tab === 'Business Chinese') {
      setSearchQuery('Business');
    } else if (tab === 'Subject Tests') {
      setFilters(prev => ({...prev, examType: 'Subject-specific Tests'}));
    } else {
      setFilters(prev => ({...prev, examType: ''}));
      setSearchQuery('');
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
            China Exams Specialist Program
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert preparation for HSK, CSCA, and all Chinese language proficiency and university entrance exams
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
            { icon: GroupsIcon, value: '95%', label: 'Pass Rate' },
            { icon: EmojiEventsIcon, value: '2,000+', label: 'Students Trained' },
            { icon: TrendingUpIcon, value: 'HSK 4+', label: 'Average Score' },
            { icon: CheckCircleIcon, value: '100%', label: 'Satisfaction Rate' }
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
            onClick={() => setShowQuiz(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <QuizIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Quick Knowledge Quiz</h3>
            <p className="opacity-90">Test your knowledge about Chinese exams</p>
          </button>
          
          <button
            onClick={() => setEnrollmentModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <SchoolIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Free Assessment</h3>
            <p className="opacity-90">Get personalized study plan</p>
          </button>
          
          <a
            href="#materials"
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <DownloadIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Free Materials</h3>
            <p className="opacity-90">Download study guides and practice tests</p>
          </a>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Exams</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by exam name or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Exam Type</label>
              <select
                value={filters.examType}
                onChange={(e) => setFilters(prev => ({...prev, examType: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {EXAM_TYPES.map((type, index) => (
                  <option key={index} value={type === 'All Exams' ? '' : type}>
                    {type}
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
                <option value="date">Exam Date</option>
                <option value="difficulty">Difficulty Level</option>
                <option value="fee">Exam Fee</option>
                <option value="name">Exam Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({...prev, level: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {EXAM_LEVELS.map((level, index) => (
                  <option key={index} value={level === 'All Levels' ? '' : level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Status</label>
              <select
                value={filters.registrationStatus}
                onChange={(e) => setFilters(prev => ({...prev, registrationStatus: e.target.value}))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="open">Open Registration</option>
                <option value="closed">Closed Registration</option>
                <option value="">All Status</option>
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
            {['All Exams', 'HSK Tests', 'CSCA Prep', 'Speaking Tests', 'Business Chinese', 'Subject Tests'].map((tab) => (
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

        {/* Featured Exams Section */}
        {activeTab === 'All Exams' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Exams</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_EXAMS.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  isSaved={savedExams.includes(exam.id)}
                  onToggleSave={toggleSaveExam}
                  onViewDetails={setSelectedExam}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Exams Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading exams...</p>
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No exams found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredExams.length} Exams Available
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setEnrollmentModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Free Consultation
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentExams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    isSaved={savedExams.includes(exam.id)}
                    onToggleSave={toggleSaveExam}
                    onViewDetails={setSelectedExam}
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

        {/* Study Materials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          id="materials"
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Free Study Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'HSK Vocabulary Lists',
                description: 'Complete word lists for HSK 1-6 with example sentences',
                icon: TranslateIcon,
                format: 'PDF',
                size: '2.4 MB'
              },
              {
                title: 'CSCA Practice Tests',
                description: 'Full-length mock tests with answer keys',
                icon: ArticleIcon,
                format: 'PDF + Audio',
                size: '15.2 MB'
              },
              {
                title: 'Grammar Guides',
                description: 'Comprehensive Chinese grammar explanations',
                icon: MenuBookIcon,
                format: 'PDF',
                size: '3.8 MB'
              },
              {
                title: 'Speaking Practice',
                description: 'Audio files for pronunciation and conversation',
                icon: PlayCircleIcon,
                format: 'MP3',
                size: '45.6 MB'
              }
            ].map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <material.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{material.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{material.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{material.format}</span>
                  <span>{material.size}</span>
                </div>
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Our Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RECAPPLY CESP?</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Expert Chinese Teachers',
                  description: 'Native speakers with 10+ years teaching experience'
                },
                {
                  title: 'Proven Success Record',
                  description: '95% of our students pass their target exams'
                },
                {
                  title: 'Personalized Study Plans',
                  description: 'Customized preparation based on your level and goals'
                },
                {
                  title: 'Comprehensive Materials',
                  description: 'Access to exclusive practice tests and resources'
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
            <h2 className="text-2xl font-bold mb-6">Program Features</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <CalculateIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Mathematics Focus</h3>
                  <p className="opacity-90">Special emphasis on CSCA mathematics section</p>
                </div>
              </div>
              <div className="flex items-center">
                <ScienceIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Science Preparation</h3>
                  <p className="opacity-90">Physics and Chemistry for engineering applicants</p>
                </div>
              </div>
              <div className="flex items-center">
                <PsychologyIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Test Strategies</h3>
                  <p className="opacity-90">Learn time management and question tactics</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Chinese Exam Preparation Today!</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful students who have achieved their target scores with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setEnrollmentModalOpen(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Enroll Now
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Take Free Assessment
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedExam && (
        <ExamDetailModal
          exam={selectedExam}
          isSaved={savedExams.includes(selectedExam.id)}
          onToggleSave={toggleSaveExam}
          onClose={() => setSelectedExam(null)}
          onEnroll={handleExamEnrollment}
        />
      )}

      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        onSubmit={handleEnrollmentSubmit}
        initialForm={enrollmentForm}
        exams={exams}
      />

      <QuizModal
        isOpen={showQuiz}
        onClose={() => {
          setShowQuiz(false);
          setCurrentQuestion(0);
          setQuizScore(0);
          setTestResults({});
        }}
        questions={QUIZ_QUESTIONS}
        currentQuestion={currentQuestion}
        testResults={testResults}
        onAnswer={handleQuizAnswer}
      />
    </div>
  );
};