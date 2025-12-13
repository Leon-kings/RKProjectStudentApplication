/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DescriptionIcon from '@mui/icons-material/Description';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api';

export const Admission = () => {
  // State Management
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [savedUniversities, setSavedUniversities] = useState([]);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    programType: '',
    tuitionRange: '',
    language: '',
    scholarship: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('ranking');
  const [currentPage, setCurrentPage] = useState(1);
  const [universitiesPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState('all');

  // Filter options
  const countries = [
    'All Countries',
    'China',
    'Canada',
    'Germany',
    'Poland',
    'Turkey',
    'USA',
    'Japan',
    'South Korea',
    'Singapore',
    'Malaysia',
    'Australia',
    'UK',
    'France',
    'Netherlands'
  ];

  const programTypes = [
    'All Programs',
    'Undergraduate',
    'Postgraduate',
    'PhD',
    'Diploma',
    'Foundation'
  ];

  const tuitionRanges = [
    'All Tuition',
    'Under $2,000',
    '$2,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    'Above $20,000'
  ];

  const languages = [
    'All Languages',
    'English',
    'Chinese',
    'German',
    'French',
    'Spanish',
    'Korean',
    'Japanese'
  ];

  // Featured universities data
  const featuredUniversities = [
    {
      id: 1,
      name: 'Tsinghua University',
      country: 'China',
      ranking: 1,
      programs: ['Engineering', 'Business', 'Computer Science'],
      tuition: '$3,000 - $6,000/year',
      language: 'Chinese/English',
      deadline: 'April 30, 2024',
      scholarships: 'CSC Scholarships Available',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      name: 'University of Toronto',
      country: 'Canada',
      ranking: 2,
      programs: ['Medicine', 'Law', 'Arts'],
      tuition: '$25,000 - $45,000/year',
      language: 'English',
      deadline: 'January 15, 2024',
      scholarships: 'International Scholarships',
      image: 'https://images.unsplash.com/photo-1579600161224-cac5a2971069?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 3,
      name: 'Technical University of Munich',
      country: 'Germany',
      ranking: 3,
      programs: ['Engineering', 'Technology', 'Science'],
      tuition: '€0 - €1,500/semester',
      language: 'German/English',
      deadline: 'July 15, 2024',
      scholarships: 'DAAD Scholarships',
      image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
      featured: true
    }
  ];

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    university: '',
    intake: '',
    education: '',
    documents: '',
    message: ''
  });

  // Fetch universities data
  useEffect(() => {
    fetchUniversities();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, sortBy, universities]);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      // Sample university data
      const sampleData = [
        {
          id: 1,
          name: 'Tsinghua University',
          country: 'China',
          city: 'Beijing',
          ranking: 1,
          worldRanking: 23,
          programs: ['Computer Science', 'Engineering', 'Business', 'Architecture'],
          tuition: '$3,000 - $6,000/year',
          language: 'Chinese/English',
          deadline: 'April 30, 2024',
          scholarships: ['CSC Scholarship', 'University Scholarship'],
          requirements: ['HSK Level 4', 'High School Diploma', 'SAT/ACT'],
          acceptanceRate: '15%',
          studentPopulation: '38,000',
          internationalStudents: '4,000',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
          featured: true,
          description: 'One of the most prestigious universities in China, known for engineering and technology.'
        },
        {
          id: 2,
          name: 'University of Toronto',
          country: 'Canada',
          city: 'Toronto',
          ranking: 2,
          worldRanking: 25,
          programs: ['Medicine', 'Law', 'Engineering', 'Arts'],
          tuition: '$25,000 - $45,000/year',
          language: 'English',
          deadline: 'January 15, 2024',
          scholarships: ['International Scholarship', 'Faculty Scholarship'],
          requirements: ['IELTS 6.5+', 'High School Transcripts', 'Personal Statement'],
          acceptanceRate: '43%',
          studentPopulation: '95,000',
          internationalStudents: '25,000',
          image: 'https://images.unsplash.com/photo-1579600161224-cac5a2971069?auto=format&fit=crop&w=800&q=80',
          featured: true,
          description: 'Top-ranked Canadian university with excellent research facilities.'
        },
        {
          id: 3,
          name: 'Technical University of Munich',
          country: 'Germany',
          city: 'Munich',
          ranking: 3,
          worldRanking: 50,
          programs: ['Engineering', 'Computer Science', 'Natural Sciences'],
          tuition: '€0 - €1,500/semester',
          language: 'German/English',
          deadline: 'July 15, 2024',
          scholarships: ['DAAD Scholarship', 'TUM Scholarship'],
          requirements: ['German Language Certificate', 'Abitur/Equivalent'],
          acceptanceRate: '35%',
          studentPopulation: '42,000',
          internationalStudents: '10,000',
          image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
          featured: true,
          description: 'Leading technical university in Europe with strong industry connections.'
        },
        {
          id: 4,
          name: 'University of Warsaw',
          country: 'Poland',
          city: 'Warsaw',
          ranking: 4,
          worldRanking: 301,
          programs: ['Medicine', 'Law', 'Economics', 'Humanities'],
          tuition: '€2,000 - €4,000/year',
          language: 'Polish/English',
          deadline: 'August 31, 2024',
          scholarships: ['Polish Government Scholarship', 'University Grants'],
          requirements: ['High School Diploma', 'English Certificate'],
          acceptanceRate: '55%',
          studentPopulation: '45,000',
          internationalStudents: '5,000',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Oldest and largest university in Poland with comprehensive programs.'
        },
        {
          id: 5,
          name: 'Istanbul University',
          country: 'Turkey',
          city: 'Istanbul',
          ranking: 5,
          worldRanking: 401,
          programs: ['Medicine', 'Engineering', 'Business', 'Social Sciences'],
          tuition: '$500 - $2,000/year',
          language: 'Turkish/English',
          deadline: 'September 15, 2024',
          scholarships: ['Türkiye Scholarships', 'University Scholarships'],
          requirements: ['High School Diploma', 'Language Proficiency'],
          acceptanceRate: '40%',
          studentPopulation: '90,000',
          internationalStudents: '8,000',
          image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Historic university with strong academic traditions and modern facilities.'
        },
        {
          id: 6,
          name: 'Harvard University',
          country: 'USA',
          city: 'Cambridge',
          ranking: 6,
          worldRanking: 1,
          programs: ['Law', 'Medicine', 'Business', 'Arts & Sciences'],
          tuition: '$55,000 - $60,000/year',
          language: 'English',
          deadline: 'January 1, 2024',
          scholarships: ['Need-based Financial Aid', 'Merit Scholarships'],
          requirements: ['SAT/ACT', 'High GPA', 'Extracurricular Activities'],
          acceptanceRate: '5%',
          studentPopulation: '22,000',
          internationalStudents: '5,000',
          image: 'https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'World-renowned Ivy League university with exceptional academic programs.'
        },
        {
          id: 7,
          name: 'University of Tokyo',
          country: 'Japan',
          city: 'Tokyo',
          ranking: 7,
          worldRanking: 28,
          programs: ['Engineering', 'Science', 'Medicine', 'Humanities'],
          tuition: '¥535,800/year',
          language: 'Japanese/English',
          deadline: 'January 31, 2024',
          scholarships: ['MEXT Scholarship', 'JASSO Scholarship'],
          requirements: ['EJU Examination', 'Japanese Language Proficiency'],
          acceptanceRate: '20%',
          studentPopulation: '28,000',
          internationalStudents: '4,000',
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Premier Japanese university known for research and innovation.'
        },
        {
          id: 8,
          name: 'Seoul National University',
          country: 'South Korea',
          city: 'Seoul',
          ranking: 8,
          worldRanking: 41,
          programs: ['Engineering', 'Business', 'Medicine', 'Social Sciences'],
          tuition: '₩3,000,000 - ₩6,000,000/semester',
          language: 'Korean/English',
          deadline: 'September 30, 2024',
          scholarships: ['Korean Government Scholarship', 'SNU Scholarships'],
          requirements: ['Korean Language Proficiency', 'Academic Records'],
          acceptanceRate: '25%',
          studentPopulation: '28,000',
          internationalStudents: '3,500',
          image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Top-ranked university in South Korea with excellent academic reputation.'
        },
        {
          id: 9,
          name: 'University of Melbourne',
          country: 'Australia',
          city: 'Melbourne',
          ranking: 9,
          worldRanking: 33,
          programs: ['Medicine', 'Law', 'Engineering', 'Arts'],
          tuition: 'AUD$30,000 - $45,000/year',
          language: 'English',
          deadline: 'October 31, 2024',
          scholarships: ['International Undergraduate Scholarship', 'Graduate Scholarships'],
          requirements: ['IELTS 6.5+', 'High School Transcripts'],
          acceptanceRate: '30%',
          studentPopulation: '50,000',
          internationalStudents: '20,000',
          image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80',
          featured: false,
          description: 'Leading Australian university with global recognition and research excellence.'
        }
      ];

      setUniversities(sampleData);
      setFilteredUniversities(sampleData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching universities:', error);
      setLoading(false);
      toast.error('Failed to load university data');
    }
  };

  const applyFilters = () => {
    let filtered = [...universities];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.programs.some(program => 
          program.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply country filter
    if (filters.country && filters.country !== 'All Countries') {
      filtered = filtered.filter(uni => uni.country === filters.country);
    }

    // Apply program type filter (simplified)
    if (filters.programType && filters.programType !== 'All Programs') {
      filtered = filtered.filter(uni => 
        uni.programs.some(program => 
          program.toLowerCase().includes(filters.programType.toLowerCase())
        )
      );
    }

    // Apply language filter
    if (filters.language && filters.language !== 'All Languages') {
      filtered = filtered.filter(uni => 
        uni.language.toLowerCase().includes(filters.language.toLowerCase())
      );
    }

    // Apply scholarship filter
    if (filters.scholarship) {
      filtered = filtered.filter(uni => uni.scholarships.length > 0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'ranking':
        filtered.sort((a, b) => a.ranking - b.ranking);
        break;
      case 'tuition-low':
        filtered.sort((a, b) => {
          const aTuition = parseInt(a.tuition.replace(/[^0-9]/g, ''));
          const bTuition = parseInt(b.tuition.replace(/[^0-9]/g, ''));
          return aTuition - bTuition;
        });
        break;
      case 'tuition-high':
        filtered.sort((a, b) => {
          const aTuition = parseInt(a.tuition.replace(/[^0-9]/g, ''));
          const bTuition = parseInt(b.tuition.replace(/[^0-9]/g, ''));
          return bTuition - aTuition;
        });
        break;
      case 'deadline':
        // Simplified sorting - earlier deadlines first
        filtered.sort((a, b) => {
          const aDate = new Date(a.deadline);
          const bDate = new Date(b.deadline);
          return aDate - bDate;
        });
        break;
      default:
        filtered.sort((a, b) => a.ranking - b.ranking);
    }

    setFilteredUniversities(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination logic
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save university to favorites
  const toggleSaveUniversity = (universityId) => {
    if (savedUniversities.includes(universityId)) {
      setSavedUniversities(savedUniversities.filter(id => id !== universityId));
      toast.info('Removed from saved universities');
    } else {
      setSavedUniversities([...savedUniversities, universityId]);
      toast.success('University saved to favorites');
    }
  };

  // Add/remove from compare list
  const toggleCompareUniversity = (universityId) => {
    if (compareList.includes(universityId)) {
      setCompareList(compareList.filter(id => id !== universityId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, universityId]);
      } else {
        toast.error('You can compare up to 3 universities at a time');
      }
    }
  };

  // Application form handling
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/submit-application`, {
        ...applicationForm,
        timestamp: new Date().toISOString()
      });

      toast.success('Application submitted successfully! We will contact you within 48 hours.');
      setApplicationModalOpen(false);
      setApplicationForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        program: '',
        university: '',
        intake: '',
        education: '',
        documents: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
      console.error('Application error:', error);
    }
  };

  // University Card Component
  const UniversityCard = ({ university }) => {
    const isSaved = savedUniversities.includes(university.id);
    const inCompareList = compareList.includes(university.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={university.image}
            alt={university.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
              #{university.ranking}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveUniversity(university.id);
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isSaved ? (
                <BookmarkIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompareUniversity(university.id);
              }}
              className={`p-2 rounded-full ${
                inCompareList
                  ? 'bg-green-100 text-green-600'
                  : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white'
              }`}
            >
              <CheckCircleIcon className="h-5 w-5" />
            </button>
          </div>
          {university.featured && (
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                Featured
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{university.name}</h3>
              <div className="flex items-center text-gray-600">
                <LocationOnIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">{university.city}, {university.country}</span>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                i < 4 ? (
                  <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarBorderIcon key={i} className="h-4 w-4 text-yellow-400" />
                )
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <AttachMoneyIcon className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Tuition</span>
              </div>
              <p className="text-sm text-gray-600">{university.tuition}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <LanguageIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Language</span>
              </div>
              <p className="text-sm text-gray-600">{university.language}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Programs</h4>
            <div className="flex flex-wrap gap-2">
              {university.programs.slice(0, 3).map((program, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <CalendarMonthIcon className="h-4 w-4 inline mr-1" />
              Deadline: {university.deadline}
            </div>
            <button
              onClick={() => setSelectedUniversity(university)}
              className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700"
            >
              View Details
              <ArrowForwardIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // University Detail Modal
  const UniversityDetailModal = () => {
    if (!selectedUniversity) return null;

    const isSaved = savedUniversities.includes(selectedUniversity.id);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={() => setSelectedUniversity(null)}
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
                <h2 className="text-2xl font-bold text-gray-900">{selectedUniversity.name}</h2>
                <div className="flex items-center mt-2">
                  <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{selectedUniversity.city}, {selectedUniversity.country}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleSaveUniversity(selectedUniversity.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isSaved ? (
                    <BookmarkIcon className="h-6 w-6 text-blue-600" />
                  ) : (
                    <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedUniversity(null)}
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
                    src={selectedUniversity.image}
                    alt={selectedUniversity.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About University</h3>
                  <p className="text-gray-700">{selectedUniversity.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <PeopleIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-800">Student Population</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{selectedUniversity.studentPopulation.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedUniversity.internationalStudents.toLocaleString()} international students</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <TrendingUpIcon className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-800">Acceptance Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{selectedUniversity.acceptanceRate}</p>
                    <p className="text-sm text-gray-600 mt-1">Highly competitive</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">World Ranking</p>
                      <p className="font-semibold text-gray-900">#{selectedUniversity.worldRanking}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tuition Fees</p>
                      <p className="font-semibold text-gray-900">{selectedUniversity.tuition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Language of Instruction</p>
                      <p className="font-semibold text-gray-900">{selectedUniversity.language}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                      <p className="font-semibold text-gray-900">{selectedUniversity.deadline}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
                  <h4 className="font-bold mb-4">Available Scholarships</h4>
                  <ul className="space-y-2">
                    {selectedUniversity.scholarships.map((scholarship, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        {scholarship}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setApplicationForm(prev => ({
                      ...prev,
                      university: selectedUniversity.name
                    }));
                    setApplicationModalOpen(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Programs Offered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedUniversity.programs.map((program, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <SchoolIcon className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-semibold text-gray-800">{program}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Admission Requirements</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <ul className="space-y-3">
                  {selectedUniversity.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Application Modal
  const ApplicationModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={() => setApplicationModalOpen(false)}
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
                <h2 className="text-2xl font-bold text-gray-900">University Application</h2>
                <p className="text-gray-600 mt-1">Fill out the form below and our experts will assist you</p>
              </div>
              <button
                onClick={() => setApplicationModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationForm.firstName}
                    onChange={(e) => setApplicationForm({...applicationForm, firstName: e.target.value})}
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
                    value={applicationForm.lastName}
                    onChange={(e) => setApplicationForm({...applicationForm, lastName: e.target.value})}
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
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
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
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country of Citizenship *
                  </label>
                  <select
                    required
                    value={applicationForm.country}
                    onChange={(e) => setApplicationForm({...applicationForm, country: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select your country</option>
                    <option value="rwanda">Rwanda</option>
                    <option value="kenya">Kenya</option>
                    <option value="uganda">Uganda</option>
                    <option value="tanzania">Tanzania</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="ghana">Ghana</option>
                    <option value="south-africa">South Africa</option>
                    <option value="other">Other African Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Program *
                  </label>
                  <select
                    required
                    value={applicationForm.program}
                    onChange={(e) => setApplicationForm({...applicationForm, program: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select program</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="business">Business Administration</option>
                    <option value="law">Law</option>
                    <option value="architecture">Architecture</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationForm.university}
                    onChange={(e) => setApplicationForm({...applicationForm, university: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="University name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Intake *
                  </label>
                  <select
                    required
                    value={applicationForm.intake}
                    onChange={(e) => setApplicationForm({...applicationForm, intake: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select intake</option>
                    <option value="fall-2024">Fall 2024</option>
                    <option value="spring-2025">Spring 2025</option>
                    <option value="fall-2025">Fall 2025</option>
                    <option value="spring-2026">Spring 2026</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Educational Background *
                </label>
                <textarea
                  rows="2"
                  required
                  value={applicationForm.education}
                  onChange={(e) => setApplicationForm({...applicationForm, education: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Your current or highest education level, GPA, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  rows="3"
                  value={applicationForm.message}
                  onChange={(e) => setApplicationForm({...applicationForm, message: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Any additional information or questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Submit Application Request
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Comparison Modal
  const ComparisonModal = () => {
    const compareUniversities = universities.filter(uni => compareList.includes(uni.id));

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={() => setComparisonModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Compare Universities</h2>
                <p className="text-gray-600 mt-1">Compare up to 3 universities side by side</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setComparisonModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            {compareUniversities.length === 0 ? (
              <div className="text-center py-12">
                <InfoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No universities selected</h3>
                <p className="text-gray-500">Select up to 3 universities to compare</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left font-semibold text-gray-700">Criteria</th>
                      {compareUniversities.map((uni, index) => (
                        <th key={index} className="p-4 text-left">
                          <div className="flex items-center space-x-3">
                            <img
                              src={uni.image}
                              alt={uni.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <div className="font-bold text-gray-900">{uni.name}</div>
                              <div className="text-sm text-gray-600">{uni.country}</div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">World Ranking</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            #{uni.worldRanking}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Tuition Fees</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">{uni.tuition}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Language</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">{uni.language}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Application Deadline</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">{uni.deadline}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Acceptance Rate</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">{uni.acceptanceRate}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Scholarships</td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">
                          <ul className="space-y-1">
                            {uni.scholarships.map((scholarship, i) => (
                              <li key={i} className="text-sm">{scholarship}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4"></td>
                      {compareUniversities.map((uni, index) => (
                        <td key={index} className="p-4">
                          <button
                            onClick={() => {
                              setSelectedUniversity(uni);
                              setComparisonModalOpen(false);
                            }}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(number)}
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
          onClick={() => handlePageChange(currentPage + 1)}
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
  };

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
            University Admissions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Find and apply to top universities worldwide with expert guidance from RECAPPLY
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
            { icon: SchoolIcon, value: '200+', label: 'Partner Universities' },
            { icon: PeopleIcon, value: '5,000+', label: 'Students Placed' },
            { icon: CheckCircleIcon, value: '95%', label: 'Acceptance Rate' },
            { icon: BeenhereIcon, value: '50+', label: 'Countries Covered' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Universities</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, country, or program..."
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
                onChange={(e) => setFilters({...filters, country: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {countries.map((country, index) => (
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
                <option value="ranking">Ranking</option>
                <option value="tuition-low">Tuition: Low to High</option>
                <option value="tuition-high">Tuition: High to Low</option>
                <option value="deadline">Application Deadline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Program Type</label>
              <select
                value={filters.programType}
                onChange={(e) => setFilters({...filters, programType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {programTypes.map((program, index) => (
                  <option key={index} value={program === 'All Programs' ? '' : program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {languages.map((language, index) => (
                  <option key={index} value={language === 'All Languages' ? '' : language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.scholarship}
                  onChange={(e) => setFilters({...filters, scholarship: e.target.checked})}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span className="text-gray-700">Show only universities with scholarships</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-white rounded-xl shadow-xl p-4 flex items-center space-x-4"
          >
            <span className="font-semibold text-gray-900">
              {compareList.length} university selected
            </span>
            <button
              onClick={() => setComparisonModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCompareList([])}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear
            </button>
          </motion.div>
        )}

        {/* Universities Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading universities...</p>
            </div>
          ) : filteredUniversities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No universities found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Found {filteredUniversities.length} Universities
                </h2>
                <button
                  onClick={() => setApplicationModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Apply to Multiple Universities
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentUniversities.map((university) => (
                  <UniversityCard key={university.id} university={university} />
                ))}
              </div>

              <Pagination />
            </>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right University?</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Our education consultants will help you find the perfect university based on your academic background, career goals, and budget.
          </p>
          <button
            onClick={() => setApplicationModalOpen(true)}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
          >
            Get Free Consultation
          </button>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedUniversity && <UniversityDetailModal />}
      {applicationModalOpen && <ApplicationModal />}
      {comparisonModalOpen && <ComparisonModal />}
    </div>
  );
};