/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  Paid as PaidIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  DateRange as DateIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CreditCard as CreditCardIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

const API_BASE_URL = "https://ruziganodejs.onrender.com";

export const CSCEManagementExams = () => {
  // State management
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [bookmarkedExams, setBookmarkedExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [bookingStep, setBookingStep] = useState("list"); // 'list', 'details', 'booking', 'confirmation'
  const [bookingData, setBookingData] = useState({
    examId: "",
    examName: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    organization: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    agreeToTerms: false,
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Fetch exams from API
  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/exams`);
      let examsData = [];
      if (Array.isArray(response.data)) {
        examsData = response.data;
      } else if (response.data && Array.isArray(response.data.exams)) {
        examsData = response.data.exams;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        examsData = response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        examsData = Object.values(response.data);
      }
      
      // Filter only active exams with open registration
      const activeExams = examsData.filter(exam => 
        exam.isActive !== false && 
        exam.registrationStatus === 'open'
      );
      
      setExams(activeExams);
      setFilteredExams(activeExams);
    } catch (error) {
      console.error("Error fetching exams:", error);
      showNotification("Failed to load exams. Please try again later.", "error");
      setExams([]);
      setFilteredExams([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchExams();
    
    // Load bookmarked exams from localStorage
    const savedBookmarks = localStorage.getItem('csceBookmarks');
    if (savedBookmarks) {
      setBookmarkedExams(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('csceBookmarks', JSON.stringify(bookmarkedExams));
  }, [bookmarkedExams]);

  // Filter exams
  useEffect(() => {
    let filtered = [...exams];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          exam.name?.toLowerCase().includes(term) ||
          exam.description?.toLowerCase().includes(term) ||
          exam.type?.toLowerCase().includes(term)
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((exam) => exam.type === typeFilter);
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(
        (exam) => exam.difficulty === difficultyFilter
      );
    }

    setFilteredExams(filtered);
  }, [exams, searchTerm, typeFilter, difficultyFilter]);

  // Toggle bookmark
  const toggleBookmark = (examId) => {
    setBookmarkedExams(prev => {
      if (prev.includes(examId)) {
        return prev.filter(id => id !== examId);
      } else {
        return [...prev, examId];
      }
    });
  };

  // View exam details
  const handleViewDetails = (exam) => {
    setSelectedExam(exam);
    setBookingStep("details");
  };

  // Start booking process
  const handleStartBooking = (exam) => {
    setSelectedExam(exam);
    setBookingData(prev => ({
      ...prev,
      examId: exam._id || exam.id,
      examName: exam.name,
    }));
    setBookingStep("booking");
  };

  // Handle booking form input changes
  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (bookingErrors[name]) {
      setBookingErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate booking form
  const validateBookingForm = () => {
    const errors = {};
    
    if (!bookingData.userName?.trim()) errors.userName = "Full name is required";
    if (!bookingData.userEmail?.trim()) errors.userEmail = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.userEmail)) errors.userEmail = "Invalid email format";
    if (!bookingData.userPhone?.trim()) errors.userPhone = "Phone number is required";
    if (bookingData.paymentMethod === 'card') {
      if (!bookingData.cardNumber?.trim()) errors.cardNumber = "Card number is required";
      if (!bookingData.cardExpiry?.trim()) errors.cardExpiry = "Expiry date is required";
      if (!bookingData.cardCVC?.trim()) errors.cardCVC = "CVC is required";
    }
    if (!bookingData.agreeToTerms) errors.agreeToTerms = "You must agree to the terms and conditions";
    
    setBookingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit booking
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!validateBookingForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create registration data
      const registrationData = {
        examId: bookingData.examId,
        userId: localStorage.getItem("userId") || "guest",
        userName: bookingData.userName,
        userEmail: bookingData.userEmail,
        userPhone: bookingData.userPhone,
        organization: bookingData.organization,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: bookingData.paymentMethod,
        paymentDetails: bookingData.paymentMethod === 'card' ? {
          last4: bookingData.cardNumber.slice(-4),
          method: 'card'
        } : { method: 'cash' }
      };
      
      // Send registration to API
      const response = await axios.post(`${API_BASE_URL}/exams/${bookingData.examId}/register`, registrationData);
      
      if (response.data.success) {
        setBookingStep("confirmation");
        showNotification("Registration submitted successfully!", "success");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      showNotification(error.response?.data?.message || "Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });
    
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    const numAmount = Number(amount) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(numAmount);
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty) => {
    const colorClass = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-orange-100 text-orange-800",
      Expert: "bg-red-100 text-red-800",
    }[difficulty] || "bg-gray-100 text-gray-800";

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
        {difficulty || 'Unknown'}
      </span>
    );
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const colorClass = {
      open: "bg-green-100 text-green-800",
      closed: "bg-red-100 text-red-800",
      upcoming: "bg-blue-100 text-blue-800",
      full: "bg-yellow-100 text-yellow-800",
    }[status] || "bg-gray-100 text-gray-800";

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  // Notification component
  const Notification = () => {
    if (!notification.show) return null;

    const bgColor = {
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    }[notification.type];

    const icon = {
      success: <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
      error: <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      warning: <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />,
      info: <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
    }[notification.type];

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md`}>
        <div className="flex items-start">
          {icon}
          <div className="ml-3 flex-1">
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Exam List View
  const ExamListView = () => (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Available CSCE Exams
        </h1>
        <p className="text-gray-600">
          Browse and register for upcoming Center for Scholastic Competence Examinations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exams by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm"
            >
              <option value="all">All Types</option>
              <option value="General">General</option>
              <option value="Specialized">Specialized</option>
              <option value="Certification">Certification</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <SchoolIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Exams</p>
              <p className="text-xl font-bold text-gray-900">{filteredExams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <BookmarkIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Bookmarked</p>
              <p className="text-xl font-bold text-gray-900">{bookmarkedExams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <TrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Registrations</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredExams.filter(e => e.registrationStatus === 'open').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exams...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <SchoolIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No exams found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try a different search term" : "No exams are currently available for registration"}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setDifficultyFilter("all");
            }}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredExams.map((exam) => (
              <div
                key={exam._id || exam.id}
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={exam.image || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"}
                    alt={exam.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(exam._id || exam.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition-colors"
                  >
                    {bookmarkedExams.includes(exam._id || exam.id) ? (
                      <BookmarkIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <BookmarkBorderIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(exam.registrationStatus)}
                  </div>
                  
                  {/* Featured Badge */}
                  {exam.featured && (
                    <div className="absolute top-12 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {exam.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <SchoolIcon className="w-4 h-4 mr-1" />
                        {exam.type || "General"}
                      </div>
                    </div>
                    {getDifficultyBadge(exam.difficulty)}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {exam.description || "No description available"}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">Exam Date:</span>
                      <span className="ml-2">{formatDate(exam.nextExamDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <TimeIcon className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium">Duration:</span>
                      <span className="ml-2">{exam.duration || "N/A"}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <LocationIcon className="w-4 h-4 mr-2 text-red-500" />
                      <span className="font-medium">Test Centers:</span>
                      <span className="ml-2">
                        {exam.testCenters?.length || 0} locations
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500">Registration Fee</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(exam.fee?.amount || exam.fee, exam.fee?.currency)}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(exam)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleStartBooking(exam)}
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  // Exam Details View
  const ExamDetailsView = () => (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => setBookingStep("list")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowBackIcon className="w-5 h-5 mr-2" />
        Back to Exams
      </button>

      {/* Exam Details Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header Image */}
        <div className="relative">
          <img
            src={selectedExam.image || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"}
            alt={selectedExam.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 left-4">
            {getStatusBadge(selectedExam.registrationStatus)}
          </div>
          {selectedExam.featured && (
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              FEATURED EXAM
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {selectedExam.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <SchoolIcon className="w-5 h-5 mr-2 text-blue-500" />
              {selectedExam.type}
            </div>
            <div className="flex items-center text-gray-600">
              {getDifficultyBadge(selectedExam.difficulty)}
            </div>
            <div className="flex items-center text-gray-600">
              <PaidIcon className="w-5 h-5 mr-2 text-green-500" />
              {formatCurrency(selectedExam.fee?.amount || selectedExam.fee, selectedExam.fee?.currency)}
            </div>
          </div>

          <p className="text-gray-700 mb-8">{selectedExam.description}</p>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Exam Schedule
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Exam Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(selectedExam.nextExamDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registration Deadline</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(selectedExam.registrationDeadline)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium text-gray-900">
                    {selectedExam.duration || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <InfoIcon className="w-5 h-5 mr-2 text-green-500" />
                Exam Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Passing Score</p>
                  <p className="font-medium text-gray-900">
                    {selectedExam.passingScore || 70}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preparation Time</p>
                  <p className="font-medium text-gray-900">
                    {selectedExam.preparationTime || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Levels</p>
                  <p className="font-medium text-gray-900">
                    {selectedExam.levels?.join(", ") || "All Levels"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {selectedExam.requirements?.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {selectedExam.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedExam.testCenters?.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Centers</h3>
                <ul className="space-y-2">
                  {selectedExam.testCenters.map((center, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <LocationIcon className="w-4 h-4 mr-2 text-red-500" />
                      {center}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => toggleBookmark(selectedExam._id || selectedExam.id)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              {bookmarkedExams.includes(selectedExam._id || selectedExam.id) ? (
                <>
                  <BookmarkIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Remove Bookmark
                </>
              ) : (
                <>
                  <BookmarkBorderIcon className="w-5 h-5 mr-2" />
                  Bookmark Exam
                </>
              )}
            </button>
            <button
              onClick={() => handleStartBooking(selectedExam)}
              className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Form View
  const BookingFormView = () => (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setBookingStep("details")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowBackIcon className="w-5 h-5 mr-2" />
          Back to Details
        </button>
        
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              1
            </div>
            <div className="ml-2 text-sm font-medium text-blue-500">Details</div>
          </div>
          <div className="w-16 h-1 bg-blue-500 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              2
            </div>
            <div className="ml-2 text-sm font-medium text-blue-500">Booking</div>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
              3
            </div>
            <div className="ml-2 text-sm font-medium text-gray-500">Confirmation</div>
          </div>
        </div>
      </div>

      {/* Exam Summary */}
      <div className="bg-blue-50 rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Exam Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Exam Name</p>
            <p className="font-medium text-gray-900">{selectedExam?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Exam Date</p>
            <p className="font-medium text-gray-900">{formatDate(selectedExam?.nextExamDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Registration Fee</p>
            <p className="font-medium text-gray-900">
              {formatCurrency(selectedExam?.fee?.amount || selectedExam?.fee, selectedExam?.fee?.currency)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">{selectedExam?.duration || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Registration Form</h2>
        
        <form onSubmit={handleSubmitBooking}>
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PersonIcon className="w-5 h-5 mr-2 text-blue-500" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={bookingData.userName}
                  onChange={handleBookingChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                    bookingErrors.userName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {bookingErrors.userName && (
                  <p className="mt-1 text-sm text-red-600">{bookingErrors.userName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={bookingData.organization}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Company/School Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={bookingData.userEmail}
                  onChange={handleBookingChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                    bookingErrors.userEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {bookingErrors.userEmail && (
                  <p className="mt-1 text-sm text-red-600">{bookingErrors.userEmail}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  value={bookingData.userPhone}
                  onChange={handleBookingChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                    bookingErrors.userPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+250 78X XXX XXX"
                />
                {bookingErrors.userPhone && (
                  <p className="mt-1 text-sm text-red-600">{bookingErrors.userPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2 text-blue-500" />
              Payment Method
            </h3>
            
            <div className="mb-4">
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={bookingData.paymentMethod === 'card'}
                    onChange={handleBookingChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={bookingData.paymentMethod === 'cash'}
                    onChange={handleBookingChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Pay at Center</span>
                </label>
              </div>
            </div>
            
            {bookingData.paymentMethod === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={bookingData.cardNumber}
                    onChange={handleBookingChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                      bookingErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="4242 4242 4242 4242"
                    maxLength="19"
                  />
                  {bookingErrors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{bookingErrors.cardNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={bookingData.cardExpiry}
                    onChange={handleBookingChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                      bookingErrors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {bookingErrors.cardExpiry && (
                    <p className="mt-1 text-sm text-red-600">{bookingErrors.cardExpiry}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC *
                  </label>
                  <input
                    type="text"
                    name="cardCVC"
                    value={bookingData.cardCVC}
                    onChange={handleBookingChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                      bookingErrors.cardCVC ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123"
                    maxLength="3"
                  />
                  {bookingErrors.cardCVC && (
                    <p className="mt-1 text-sm text-red-600">{bookingErrors.cardCVC}</p>
                  )}
                </div>
              </div>
            )}
            
            {bookingData.paymentMethod === 'cash' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  You will pay the registration fee at the test center when you arrive for the exam.
                  Please bring exact change if possible.
                </p>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={bookingData.agreeToTerms}
                onChange={handleBookingChange}
                className="h-5 w-5 text-blue-600 mt-0.5"
              />
              <label className="ml-2 text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
                *
              </label>
            </div>
            {bookingErrors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{bookingErrors.agreeToTerms}</p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Registration Fee:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(selectedExam?.fee?.amount || selectedExam?.fee, selectedExam?.fee?.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Fee:</span>
              <span className="font-semibold text-gray-900">$0.00</span>
            </div>
            <div className="border-t border-gray-300 mt-3 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(selectedExam?.fee?.amount || selectedExam?.fee, selectedExam?.fee?.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Complete Registration
                  <CheckIcon className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Confirmation View
  const ConfirmationView = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Registration Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your registration for <span className="font-semibold text-gray-900">{selectedExam?.name}</span> has been received successfully.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
          <ul className="text-left text-gray-700 space-y-2">
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              You will receive a confirmation email within 24 hours
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              Please bring your ID and confirmation email to the test center
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              Arrive at least 30 minutes before the exam starts
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-5 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Registration Details:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600">Exam Name</p>
              <p className="font-medium text-gray-900">{selectedExam?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Exam Date</p>
              <p className="font-medium text-gray-900">{formatDate(selectedExam?.nextExamDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration ID</p>
              <p className="font-medium text-gray-900">REG-{Date.now().toString().slice(-8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className="font-medium text-gray-900">
                {bookingData.paymentMethod === 'cash' ? 'Pending' : 'Processing'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Print Confirmation
          </button>
          <button
            onClick={() => {
              setBookingStep("list");
              setSelectedExam(null);
              setBookingData({
                examId: "",
                examName: "",
                userName: "",
                userEmail: "",
                userPhone: "",
                organization: "",
                paymentMethod: "card",
                cardNumber: "",
                cardExpiry: "",
                cardCVC: "",
                agreeToTerms: false,
              });
            }}
            className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse More Exams
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        <Notification />
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            CSCE Exam Registration
          </h1>
          <p className="text-gray-600">
            Register for Center for Scholastic Competence Examinations
          </p>
        </div>
        
        {/* Render Current View */}
        {bookingStep === "list" && <ExamListView />}
        {bookingStep === "details" && <ExamDetailsView />}
        {bookingStep === "booking" && <BookingFormView />}
        {bookingStep === "confirmation" && <ConfirmationView />}
      </div>
    </div>
  );
};