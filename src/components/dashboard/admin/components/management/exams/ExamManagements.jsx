/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material UI Icons
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  GridView as GridIcon,
  List as ListIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as UncheckedIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  ContentCopy as CopyIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service Functions
const examApi = {
  // Get all exams with pagination support
  getAllExams: async (params = {}) => {
    try {
      const response = await api.get("/exams", { params });
      
      // Check if response has the expected structure
      if (response.data && response.data.success && response.data.data) {
        console.log(response.data);
        return response.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      toast.error("Failed to load exams");
      return [];
    }
  },

  // Get all exams with pagination metadata
  getAllExamsWithPagination: async (params = {}) => {
    try {
      const response = await api.get("/exams", { params });
      
      // Return the full response with metadata
      return {
        success: response.data?.success || false,
        count: response.data?.count || 0,
        total: response.data?.total || 0,
        totalPages: response.data?.totalPages || 1,
        currentPage: response.data?.currentPage || 1,
        data: Array.isArray(response.data?.data) ? response.data.data : [],
        ...response.data
      };
    } catch (error) {
      console.error("Error fetching exams with pagination:", error);
      toast.error("Failed to load exams");
      return {
        success: false,
        count: 0,
        total: 0,
        totalPages: 1,
        currentPage: 1,
        data: []
      };
    }
  },

  // Get single exam by ID
  getExamById: async (id) => {
    try {
      const response = await api.get(`/exams/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching exam:", error);
      throw error;
    }
  },

  // Create new exam
  createExam: async (examData) => {
    try {
      const response = await api.post("/exams", examData);
      return response.data;
    } catch (error) {
      console.error("Error creating exam:", error);
      throw error;
    }
  },

  // Update exam
  updateExam: async (id, examData) => {
    try {
      const response = await api.put(`/exams/${id}`, examData);
      return response.data;
    } catch (error) {
      console.error("Error updating exam:", error);
      throw error;
    }
  },

  // Delete exam
  deleteExam: async (id) => {
    try {
      const response = await api.delete(`/exams/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting exam:", error);
      throw error;
    }
  },

  // Upload image via API endpoint
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await api.post("/exams/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Update exam status
  updateExamStatus: async (id, status) => {
    try {
      const response = await api.patch(`/exams/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating exam status:", error);
      throw error;
    }
  },

  // Toggle featured status
  toggleFeatured: async (id, featured) => {
    try {
      const response = await api.patch(`/exams/${id}/featured`, { featured });
      return response.data;
    } catch (error) {
      console.error("Error toggling featured:", error);
      throw error;
    }
  },

  // Get exam statistics
  getExamStatistics: async () => {
    try {
      const response = await api.get("/exams/statistics/overview");
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return {
        totalExams: 0,
        activeExams: 0,
        featuredExams: 0,
        upcomingExams: 0,
        totalRegistrations: 0,
        averagePassRate: 0,
      };
    }
  },
};

// Options for dropdowns
const EXAM_TYPES = ["General", "Specialized", "Certification"];
const LEVELS = ["Undergraduate Level", "Graduate Level", "PhD Level"];
const REGISTRATION_STATUS = ["open", "closed", "upcoming", "full"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"];
const CURRENCIES = ["USD", "EUR", "GBP", "CNY", "RWF"];

export const ExamManagement = () => {
  // State management
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [paginatedExams, setPaginatedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nextExamDate");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Form states
  const [currentExam, setCurrentExam] = useState({
    name: "",
    type: "General",
    levels: [],
    nextExamDate: new Date().toISOString().split("T")[0],
    registrationDeadline: new Date().toISOString().split("T")[0],
    registrationStatus: "open",
    duration: "",
    fee: {
      amount: 0,
      currency: "USD",
    },
    difficulty: "Intermediate",
    passingScore: 70,
    image: "",
    featured: false,
    description: "",
    requirements: [""],
    testCenters: [""],
    preparationTime: "",
    recommendedFor: [""],
    topics: [""],
    isActive: true,
  });

  const [selectedExam, setSelectedExam] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Statistics state
  const [statistics, setStatistics] = useState({
    totalExams: 0,
    activeExams: 0,
    featuredExams: 0,
    upcomingExams: 0,
    totalRegistrations: 0,
    averagePassRate: 0,
  });

  const fileInputRef = useRef(null);

  // Fetch exams on component mount
  useEffect(() => {
    fetchExams();
    fetchStatistics();
  }, []);

  // Filter, sort, and paginate exams
  useEffect(() => {
    filterAndSortExams();
  }, [exams, searchTerm, typeFilter, statusFilter, difficultyFilter, featuredFilter, sortBy, sortOrder, currentPage, itemsPerPage]);

  // Update pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredExams.slice(startIndex, endIndex);
    setPaginatedExams(paginatedData);
    
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredExams, currentPage, itemsPerPage]);

  // Fetch exams from API
  const fetchExams = async () => {
    try {
      setLoading(true);
      const data = await examApi.getAllExams();
      setExams(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error in fetchExams:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const data = await examApi.getExamStatistics();
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Filter and sort exams
  const filterAndSortExams = () => {
    // Ensure exams is an array
    const examsArray = Array.isArray(exams) ? exams : [];
    
    let filtered = [...examsArray];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          (exam.name && exam.name.toLowerCase().includes(term)) ||
          (exam.description && exam.description.toLowerCase().includes(term)) ||
          (exam.type && exam.type.toLowerCase().includes(term))
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((exam) => exam.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((exam) => exam.registrationStatus === statusFilter);
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((exam) => exam.difficulty === difficultyFilter);
    }

    // Apply featured filter
    if (featuredFilter !== "all") {
      const isFeatured = featuredFilter === "featured";
      filtered = filtered.filter((exam) => exam.featured === isFeatured);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "nextExamDate":
          aValue = a.nextExamDate ? new Date(a.nextExamDate) : new Date(0);
          bValue = b.nextExamDate ? new Date(b.nextExamDate) : new Date(0);
          break;
        case "registrationDeadline":
          aValue = a.registrationDeadline ? new Date(a.registrationDeadline) : new Date(0);
          bValue = b.registrationDeadline ? new Date(b.registrationDeadline) : new Date(0);
          break;
        case "name":
          aValue = a.name ? a.name.toLowerCase() : "";
          bValue = b.name ? b.name.toLowerCase() : "";
          break;
        case "totalRegistrations":
          aValue = (a.statistics && a.statistics.totalRegistrations) || 0;
          bValue = (b.statistics && b.statistics.totalRegistrations) || 0;
          break;
        case "passRate":
          aValue = (a.statistics && a.statistics.passRate) || 0;
          bValue = (b.statistics && b.statistics.passRate) || 0;
          break;
        case "fee":
          aValue = (a.fee && a.fee.amount) || 0;
          bValue = (b.fee && b.fee.amount) || 0;
          break;
        default:
          aValue = a[sortBy] || "";
          bValue = b[sortBy] || "";
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredExams(filtered);
  };

  // Pagination functions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!currentExam.name.trim()) newErrors.name = "Exam name is required";
    if (!currentExam.type) newErrors.type = "Exam type is required";
    if (!currentExam.nextExamDate) newErrors.nextExamDate = "Next exam date is required";
    if (!currentExam.registrationDeadline) newErrors.registrationDeadline = "Registration deadline is required";
    if (currentExam.levels.length === 0) newErrors.levels = "At least one level is required";
    if (currentExam.fee.amount < 0) newErrors.fee = "Fee amount cannot be negative";
    if (currentExam.passingScore < 0 || currentExam.passingScore > 100) newErrors.passingScore = "Passing score must be between 0 and 100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCurrentExam((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "number" ? parseFloat(value) || 0 : value,
        },
      }));
    } else if (type === "checkbox") {
      setCurrentExam((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setCurrentExam((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setCurrentExam((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field if exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle array field changes
  const handleArrayInputChange = (field, index, value) => {
    setCurrentExam((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Add new item to array field
  const addArrayItem = (field) => {
    setCurrentExam((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove item from array field
  const removeArrayItem = (field, index) => {
    setCurrentExam((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle level selection
  const handleLevelChange = (level) => {
    setCurrentExam((prev) => {
      const levels = prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...prev.levels, level];
      return { ...prev, levels };
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingImage(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload via API
      const uploadResult = await examApi.uploadImage(file);
      
      setCurrentExam((prev) => ({
        ...prev,
        image: uploadResult.imageUrl || "",
      }));
      
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setCurrentExam((prev) => ({
      ...prev,
      image: "",
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Create new exam
  const handleCreateExam = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await examApi.createExam(currentExam);
      toast.success("Exam created successfully");
      setShowAddModal(false);
      resetForm();
      fetchExams();
      fetchStatistics();
    } catch (error) {
      toast.error("Failed to create exam");
    }
  };

  // Update exam
  const handleUpdateExam = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await examApi.updateExam(selectedExam._id, currentExam);
      toast.success("Exam updated successfully");
      setShowEditModal(false);
      resetForm();
      fetchExams();
      fetchStatistics();
    } catch (error) {
      toast.error("Failed to update exam");
    }
  };

  // Delete exam
  const handleDeleteExam = async () => {
    if (!selectedExam) return;

    try {
      await examApi.deleteExam(selectedExam._id);
      toast.success("Exam deleted successfully");
      setShowDeleteModal(false);
      fetchExams();
      fetchStatistics();
    } catch (error) {
      toast.error("Failed to delete exam");
    }
  };

  // Update exam status
  const handleUpdateStatus = async (status) => {
    if (!selectedExam) return;

    try {
      await examApi.updateExamStatus(selectedExam._id, status);
      toast.success(`Status updated to ${status}`);
      setShowStatusModal(false);
      fetchExams();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async () => {
    if (!selectedExam) return;

    try {
      await examApi.toggleFeatured(selectedExam._id, !selectedExam.featured);
      toast.success(`Featured status ${!selectedExam.featured ? "enabled" : "disabled"}`);
      setShowFeaturedModal(false);
      fetchExams();
      fetchStatistics();
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentExam({
      name: "",
      type: "General",
      levels: [],
      nextExamDate: new Date().toISOString().split("T")[0],
      registrationDeadline: new Date().toISOString().split("T")[0],
      registrationStatus: "open",
      duration: "",
      fee: {
        amount: 0,
        currency: "USD",
      },
      difficulty: "Intermediate",
      passingScore: 70,
      image: "",
      featured: false,
      description: "",
      requirements: [""],
      testCenters: [""],
      preparationTime: "",
      recommendedFor: [""],
      topics: [""],
      isActive: true,
    });
    setErrors({});
    setImagePreview(null);
  };

  // Open modals
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setCurrentExam({
      name: exam.name || "",
      type: exam.type || "General",
      levels: exam.levels || [],
      nextExamDate: exam.nextExamDate ? new Date(exam.nextExamDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      registrationDeadline: exam.registrationDeadline ? new Date(exam.registrationDeadline).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      registrationStatus: exam.registrationStatus || "open",
      duration: exam.duration || "",
      fee: {
        amount: exam.fee?.amount || 0,
        currency: exam.fee?.currency || "USD",
      },
      difficulty: exam.difficulty || "Intermediate",
      passingScore: exam.passingScore || 70,
      image: exam.image || "",
      featured: exam.featured || false,
      description: exam.description || "",
      requirements: exam.requirements && exam.requirements.length > 0 ? exam.requirements : [""],
      testCenters: exam.testCenters && exam.testCenters.length > 0 ? exam.testCenters : [""],
      preparationTime: exam.preparationTime || "",
      recommendedFor: exam.recommendedFor && exam.recommendedFor.length > 0 ? exam.recommendedFor : [""],
      topics: exam.topics && exam.topics.length > 0 ? exam.topics : [""],
      isActive: exam.isActive !== false,
    });
    setImagePreview(exam.image || null);
    setShowEditModal(true);
  };

  const openViewModal = (exam) => {
    setSelectedExam(exam);
    setShowViewModal(true);
  };

  const openDeleteModal = (exam) => {
    setSelectedExam(exam);
    setShowDeleteModal(true);
  };

  const openStatusModal = (exam) => {
    setSelectedExam(exam);
    setShowStatusModal(true);
  };

  const openFeaturedModal = (exam) => {
    setSelectedExam(exam);
    setShowFeaturedModal(true);
  };

  const openImageModal = (exam) => {
    setSelectedExam(exam);
    setShowImageModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate days until exam
  const daysUntilExam = (dateString) => {
    if (!dateString) return 0;
    try {
      const now = new Date();
      const examDate = new Date(dateString);
      const diffTime = examDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (error) {
      return 0;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "full":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      case "Expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
      >
        <div className="flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4 sm:gap-5">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Exam Management
            </h1>
            <p className="text-gray-600 mt-1 xs:mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base">
              Manage all exams, registrations, and statistics
            </p>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
            {[
              { label: "Total Exams", value: statistics.totalExams, icon: <SchoolIcon />, color: "bg-blue-500" },
              { label: "Active", value: statistics.activeExams, icon: <CheckIcon />, color: "bg-green-500" },
              { label: "Featured", value: statistics.featuredExams, icon: <StarIcon />, color: "bg-yellow-500" },
              { label: "Upcoming", value: statistics.upcomingExams, icon: <CalendarIcon />, color: "bg-purple-500" },
              { label: "Registrations", value: statistics.totalRegistrations, icon: <PeopleIcon />, color: "bg-orange-500" },
              { label: "Avg Pass Rate", value: `${statistics.averagePassRate}%`, icon: <TrendingUpIcon />, color: "bg-teal-500" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg xs:rounded-xl sm:rounded-xl shadow-sm p-2 xs:p-2.5 sm:p-3">
                <div className=" items-center justify-between">
                  <div>
                    <div className="text-[10px] xs:text-xs sm:text-xs text-gray-500">{stat.label}</div>
                    <div className="text-sm xs:text-base sm:text-lg font-bold text-gray-800">{stat.value}</div>
                  </div>
                  <div className={`p-1.5 xs:p-2 sm:p-2 rounded-lg ${stat.color} text-white`}>
                    {React.cloneElement(stat.icon, { className: "w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg p-3 xs:p-4 sm:p-5 md:p-6 mb-4 xs:mb-5 sm:mb-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4 sm:gap-5">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 xs:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 xs:w-5 xs:h-5" />
            <input
              type="text"
              placeholder="Search exams..."
              className="w-full pl-9 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 border-0 bg-gray-50 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm xs:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {/* Type Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {EXAM_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <FilterIcon className="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>

              {/* Status Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {REGISTRATION_STATUS.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  {DIFFICULTIES.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={featuredFilter}
                  onChange={(e) => setFeaturedFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="featured">Featured Only</option>
                  <option value="not-featured">Not Featured</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2">
              {/* Sort Controls */}
              <div className="relative">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="nextExamDate">Sort by Exam Date</option>
                  <option value="registrationDeadline">Sort by Deadline</option>
                  <option value="name">Sort by Name</option>
                  <option value="totalRegistrations">Sort by Registrations</option>
                  <option value="passRate">Sort by Pass Rate</option>
                  <option value="fee">Sort by Fee</option>
                </select>
                <div className="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 flex flex-col -space-y-1">
                  <div
                    onClick={() => setSortOrder("asc")}
                    className={`text-xs ${sortOrder === "asc" ? "text-blue-500" : "text-gray-400"}`}
                  >
                    ↑
                  </div>
                  <div
                    onClick={() => setSortOrder("desc")}
                    className={`text-xs ${sortOrder === "desc" ? "text-blue-500" : "text-gray-400"}`}
                  >
                    ↓
                  </div>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg xs:rounded-xl p-0.5 xs:p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 xs:p-2 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  title="Grid View"
                >
                  <GridIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 xs:p-2 rounded-lg ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  title="List View"
                >
                  <ListIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 xs:gap-2">
                <button
                  onClick={fetchExams}
                  className="p-1.5 xs:p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg xs:rounded-xl transition-colors"
                  title="Refresh"
                >
                  <RefreshIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openAddModal}
                  className="px-3 xs:px-4 py-2 xs:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg xs:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                >
                  <AddIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="hidden xs:inline">Add Exam</span>
                  <span className="xs:hidden">Add</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Exams Display */}
      {viewMode === "grid" ? (
        // Grid View
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
        >
          {paginatedExams.map((exam) => (
            <motion.div
              key={exam._id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-xl xs:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image Section */}
              <div className="h-28 xs:h-32 sm:h-36 md:h-40 bg-gradient-to-r from-blue-400 to-purple-400 relative overflow-hidden">
                {exam.image ? (
                  <img
                    src={exam.image}
                    alt={exam.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openImageModal(exam)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <SchoolIcon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white opacity-30" />
                  </div>
                )}
                {exam.featured && (
                  <div className="absolute top-2 left-2 xs:top-3 xs:left-3 bg-yellow-500 text-white px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold flex items-center gap-0.5 xs:gap-1">
                    <StarIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                    <span className="hidden xs:inline">Featured</span>
                    <span className="xs:hidden">Feat</span>
                  </div>
                )}
                <div className={`absolute top-2 right-2 xs:top-3 xs:right-3 px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold ${getStatusColor(exam.registrationStatus)}`}>
                  {exam.registrationStatus ? (
                    <>
                      <span className="hidden xs:inline">
                        {exam.registrationStatus.charAt(0).toUpperCase() + exam.registrationStatus.slice(1)}
                      </span>
                      <span className="xs:hidden">
                        {exam.registrationStatus.charAt(0).toUpperCase()}
                      </span>
                    </>
                  ) : "Unknown"}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-3 xs:p-4 sm:p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-2 xs:mb-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-bold text-sm xs:text-base sm:text-lg text-gray-800 truncate">
                      {exam.name || "Unnamed Exam"}
                    </h3>
                    <div className="flex items-center gap-1.5 xs:gap-2 mt-0.5 xs:mt-1">
                      <span className="text-xs xs:text-sm text-gray-500">{exam.type || "Unknown"}</span>
                      <span className={`px-1.5 py-0.5 xs:px-2 xs:py-0.5 rounded-full text-[10px] xs:text-xs ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty ? exam.difficulty.substring(0, 3) : "Int"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base xs:text-lg sm:text-xl font-bold text-blue-600">
                      {exam.fee?.amount ? (
                        <>
                          <span className="text-xs xs:text-sm">{exam.fee?.currency || "USD"}</span>{" "}
                          {exam.fee?.amount}
                        </>
                      ) : "Free"}
                    </div>
                    <div className="text-[10px] xs:text-xs text-gray-500">Exam Fee</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs xs:text-sm mb-3 xs:mb-4 line-clamp-2">
                  {exam.description || "No description available"}
                </p>

                {/* Details */}
                <div className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4">
                  <div className="flex items-center justify-between text-xs xs:text-sm">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-gray-600">
                      <CalendarIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                      <span>Exam Date</span>
                    </div>
                    <span className="font-medium text-xs xs:text-sm">{formatDate(exam.nextExamDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs xs:text-sm">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-gray-600">
                      <ScheduleIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                      <span>Deadline</span>
                    </div>
                    <span className="font-medium text-xs xs:text-sm">{formatDate(exam.registrationDeadline)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs xs:text-sm">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-gray-600">
                      <PeopleIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                      <span>Registrations</span>
                    </div>
                    <span className="font-medium text-xs xs:text-sm">{exam.statistics?.totalRegistrations || 0}</span>
                  </div>
                </div>

                {/* Levels */}
                <div className="mb-3 xs:mb-4">
                  <div className="text-[10px] xs:text-xs font-medium text-gray-500 mb-1">Levels:</div>
                  <div className="flex flex-wrap gap-1">
                    {exam.levels?.slice(0, 2).map((level, index) => (
                      <span key={index} className="px-1.5 py-0.5 xs:px-2 xs:py-1 bg-gray-100 text-gray-700 rounded text-[10px] xs:text-xs">
                        {level.substring(0, 3)}
                      </span>
                    ))}
                    {exam.levels?.length > 2 && (
                      <span className="px-1.5 py-0.5 xs:px-2 xs:py-1 bg-gray-100 text-gray-700 rounded text-[10px] xs:text-xs">
                        +{exam.levels.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 xs:pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openViewModal(exam)}
                      className="text-xs xs:text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="flex items-center gap-0.5 xs:gap-1">
                    <button
                      onClick={() => openStatusModal(exam)}
                      className="p-1 xs:p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Change Status"
                    >
                      <MoreIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => openEditModal(exam)}
                      className="p-1 xs:p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <EditIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(exam)}
                      className="p-1 xs:p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <DeleteIcon className="w-3 h-3 xs:w-4 xs:h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // List View
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl xs:rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] xs:min-w-[700px] sm:min-w-[800px]">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Exam
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type & Level
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status & Stats
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedExams.map((exam) => (
                  <motion.tr
                    key={exam._id}
                    variants={itemVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center mr-2 xs:mr-3 overflow-hidden">
                          {exam.image ? (
                            <img
                              src={exam.image}
                              alt={exam.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <SchoolIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm xs:text-base">
                            {exam.name || "Unnamed Exam"}
                            {exam.featured && (
                              <StarIcon className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500 inline-block ml-1 xs:ml-2" />
                            )}
                          </div>
                          <div className="text-xs xs:text-sm text-gray-500">
                            {exam.duration || "No duration specified"}
                          </div>
                          <div className="flex items-center gap-0.5 xs:gap-1 mt-0.5 xs:mt-1">
                            <MoneyIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-gray-400" />
                            <span className="text-xs xs:text-sm font-medium">
                              {exam.fee?.amount ? `${exam.fee?.currency || "USD"} ${exam.fee?.amount}` : "Free"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm xs:text-base">{exam.type || "Unknown"}</span>
                        <div className="flex flex-wrap gap-1 mt-0.5 xs:mt-1">
                          {exam.levels?.slice(0, 2).map((level, index) => (
                            <span key={index} className="px-1.5 py-0.5 xs:px-2 xs:py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] xs:text-xs">
                              {level.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                        <div className="mt-1 xs:mt-2">
                          <span className={`px-1.5 py-0.5 xs:px-2 xs:py-0.5 rounded-full text-[10px] xs:text-xs ${getDifficultyColor(exam.difficulty)}`}>
                            {exam.difficulty ? exam.difficulty.substring(0, 3) : "Int"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <div className="mb-1 xs:mb-2">
                          <div className="text-[10px] xs:text-xs text-gray-500">Exam Date</div>
                          <div className="font-medium text-sm xs:text-base">{formatDate(exam.nextExamDate)}</div>
                          <div className="text-[10px] xs:text-xs text-gray-500">
                            ({daysUntilExam(exam.nextExamDate)} days)
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] xs:text-xs text-gray-500">Deadline</div>
                          <div className="font-medium text-sm xs:text-base">{formatDate(exam.registrationDeadline)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <span className={`px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-medium w-fit ${getStatusColor(exam.registrationStatus)}`}>
                          {exam.registrationStatus ? exam.registrationStatus.charAt(0).toUpperCase() + exam.registrationStatus.slice(1) : "Unknown"}
                        </span>
                        <div className="grid grid-cols-2 gap-1 xs:gap-2 mt-2 xs:mt-3">
                          <div className="text-center">
                            <div className="text-base xs:text-lg font-bold text-blue-600">
                              {exam.statistics?.totalRegistrations || 0}
                            </div>
                            <div className="text-[10px] xs:text-xs text-gray-500">Registrations</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base xs:text-lg font-bold text-green-600">
                              {exam.statistics?.passRate || 0}%
                            </div>
                            <div className="text-[10px] xs:text-xs text-gray-500">Pass Rate</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex items-center gap-1 xs:gap-2">
                        <button
                          onClick={() => openViewModal(exam)}
                          className="p-1.5 xs:p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <ViewIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(exam)}
                          className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <EditIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openStatusModal(exam)}
                          className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                          title="Change Status"
                        >
                          <MoreIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(exam)}
                          className="p-1.5 xs:p-2 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <DeleteIcon className="w-3 h-3 xs:w-4 xs:h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 xs:py-12 sm:py-16"
        >
          <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-6 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center">
            <SchoolIcon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h3 className="text-lg xs:text-xl sm:text-2xl font-medium text-gray-700 mb-2 xs:mb-3">
            {exams.length === 0 ? "No exams available" : "No exams found"}
          </h3>
          <p className="text-gray-500 max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-6 xs:mb-8 text-sm xs:text-base">
            {searchTerm || typeFilter !== "all" || statusFilter !== "all" || difficultyFilter !== "all" || featuredFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No exams available. Create your first exam to get started!"}
          </p>
          {(searchTerm || typeFilter !== "all" || statusFilter !== "all" || difficultyFilter !== "all" || featuredFilter !== "all") ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setStatusFilter("all");
                setDifficultyFilter("all");
                setFeaturedFilter("all");
              }}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-lg xs:rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm xs:text-base"
            >
              Clear All Filters
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg xs:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1.5 xs:gap-2 mx-auto text-sm xs:text-base"
            >
              <AddIcon className="w-4 h-4 xs:w-5 xs:h-5" />
              Create Your First Exam
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Pagination Controls */}
      {filteredExams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4"
        >
          <div className="flex items-center gap-3 xs:gap-4">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <span className="text-xs xs:text-sm text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 rounded-lg text-xs xs:text-sm bg-white"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
              <span className="text-xs xs:text-sm text-gray-600">per page</span>
            </div>
            
            <div className="text-xs xs:text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredExams.length)}
              </span>
              {" to "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredExams.length)}
              </span>
              {" of "}
              <span className="font-medium">{filteredExams.length}</span>{" "}
              exams
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg ${currentPage === 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 xs:w-10 xs:h-10 rounded-lg ${currentPage === pageNum 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-1 xs:px-2 text-xs xs:text-sm">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 text-xs xs:text-sm"
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg ${currentPage === totalPages 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Add/Edit Exam Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                      {showAddModal ? "Create New Exam" : "Edit Exam"}
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      {showAddModal ? "Add a new exam to the system" : "Update exam information"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
                    {/* Left Column */}
                    <div className="space-y-3 xs:space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exam Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={currentExam.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                          placeholder="Enter exam name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exam Type *
                        </label>
                        <select
                          name="type"
                          value={currentExam.type}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.type ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                        >
                          {EXAM_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.type && (
                          <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                        )}
                      </div>

                      {/* Levels */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Levels *
                        </label>
                        <div className="space-y-1.5 xs:space-y-2">
                          {LEVELS.map((level) => (
                            <div key={level} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`level-${level}`}
                                checked={currentExam.levels.includes(level)}
                                onChange={() => handleLevelChange(level)}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`level-${level}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.levels && (
                          <p className="text-red-500 text-xs mt-1">{errors.levels}</p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 xs:space-y-4">
                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-3 xs:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Next Exam Date *
                          </label>
                          <input
                            type="date"
                            name="nextExamDate"
                            value={currentExam.nextExamDate}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.nextExamDate ? "border-red-500" : "border-gray-300"
                            } text-sm xs:text-base`}
                          />
                          {errors.nextExamDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.nextExamDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration Deadline *
                          </label>
                          <input
                            type="date"
                            name="registrationDeadline"
                            value={currentExam.registrationDeadline}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.registrationDeadline ? "border-red-500" : "border-gray-300"
                            } text-sm xs:text-base`}
                          />
                          {errors.registrationDeadline && (
                            <p className="text-red-500 text-xs mt-1">{errors.registrationDeadline}</p>
                          )}
                        </div>
                      </div>

                      {/* Fee */}
                      <div className="grid grid-cols-2 gap-3 xs:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fee Amount
                          </label>
                          <input
                            type="number"
                            name="fee.amount"
                            value={currentExam.fee.amount}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.fee ? "border-red-500" : "border-gray-300"
                            } text-sm xs:text-base`}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                          {errors.fee && (
                            <p className="text-red-500 text-xs mt-1">{errors.fee}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                          </label>
                          <select
                            name="fee.currency"
                            value={currentExam.fee.currency}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                          >
                            {CURRENCIES.map((currency) => (
                              <option key={currency} value={currency}>
                                {currency}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Difficulty
                        </label>
                        <select
                          name="difficulty"
                          value={currentExam.difficulty}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                        >
                          {DIFFICULTIES.map((diff) => (
                            <option key={diff} value={diff}>
                              {diff}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <div className="w-full">
                        <div className="flex items-center justify-center w-full">
                          {imagePreview || currentExam.image ? (
                            <div className="relative w-full max-w-md mx-auto">
                              <img
                                src={imagePreview || currentExam.image}
                                alt="Exam preview"
                                className="w-full h-40 xs:h-48 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-1.5 xs:p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <CloseIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="w-full">
                              <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                              />
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-40 xs:h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <CloudUploadIcon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 xs:mb-4" />
                                  <p className="mb-2 text-xs xs:text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 5MB
                                  </p>
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        {uploadingImage && (
                          <div className="text-center mt-2">
                            <div className="inline-block animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-xs xs:text-sm text-gray-600">Uploading...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={currentExam.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                      placeholder="Enter exam description..."
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    <div className="space-y-1.5 xs:space-y-2">
                      {currentExam.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleArrayInputChange("requirements", index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                            placeholder="Enter requirement"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("requirements", index)}
                            className="p-1.5 xs:p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <CloseIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem("requirements")}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 text-blue-600 hover:text-blue-800 hover:underline text-xs xs:text-sm font-medium"
                      >
                        + Add Requirement
                      </button>
                    </div>
                  </div>

                  {/* Registration Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Status
                    </label>
                    <select
                      name="registrationStatus"
                      value={currentExam.registrationStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                    >
                      {REGISTRATION_STATUS.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Checkboxes */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={currentExam.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Mark as Featured
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={currentExam.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Active Exam
                      </label>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-2 xs:gap-3 mt-6 xs:mt-8 pt-4 xs:pt-6 border-t">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleCreateExam : handleUpdateExam}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                  >
                    <SaveIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    {showAddModal ? "Create Exam" : "Update Exam"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Exam Modal */}
      <AnimatePresence>
        {showViewModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                      {selectedExam.name || "Unnamed Exam"}
                    </h2>
                    <div className="flex items-center gap-1.5 xs:gap-2 mt-0.5 xs:mt-1">
                      <span className="px-2 py-0.5 xs:px-2 xs:py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {selectedExam.type || "Unknown"}
                      </span>
                      {selectedExam.featured && (
                        <span className="px-2 py-0.5 xs:px-2 xs:py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-0.5 xs:gap-1">
                          <StarIcon className="w-3 h-3" />
                          <span className="hidden xs:inline">Featured</span>
                          <span className="xs:hidden">Feat</span>
                        </span>
                      )}
                      <span className={`px-2 py-0.5 xs:px-2 xs:py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExam.registrationStatus)}`}>
                        {selectedExam.registrationStatus ? (
                          <>
                            <span className="hidden xs:inline">
                              {selectedExam.registrationStatus.charAt(0).toUpperCase() + selectedExam.registrationStatus.slice(1)}
                            </span>
                            <span className="xs:hidden">
                              {selectedExam.registrationStatus.charAt(0).toUpperCase()}
                            </span>
                          </>
                        ) : "Unknown"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-4 xs:space-y-5">
                    {/* Image */}
                    {selectedExam.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={selectedExam.image}
                          alt={selectedExam.name}
                          className="w-full h-48 xs:h-56 sm:h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                      <p className="text-gray-600 text-sm xs:text-base">{selectedExam.description || "No description available."}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 xs:space-y-5">
                    {/* Exam Details */}
                    <div className="bg-gray-50 rounded-lg p-3 xs:p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 xs:mb-3">Exam Details</h3>
                      <div className="space-y-2 xs:space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Duration:</span>
                          <span className="font-medium text-sm xs:text-base">{selectedExam.duration || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Difficulty:</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(selectedExam.difficulty)}`}>
                            {selectedExam.difficulty || "Intermediate"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Fee:</span>
                          <span className="font-medium text-sm xs:text-base">
                            {selectedExam.fee?.amount ? `${selectedExam.fee?.currency || "USD"} ${selectedExam.fee?.amount}` : "Free"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Passing Score:</span>
                          <span className="font-medium text-sm xs:text-base">{selectedExam.passingScore || 70}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-blue-50 rounded-lg p-3 xs:p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 xs:mb-3">Important Dates</h3>
                      <div className="space-y-2 xs:space-y-3">
                        <div>
                          <div className="text-xs xs:text-sm text-gray-500">Next Exam Date</div>
                          <div className="font-medium text-sm xs:text-base">{formatDate(selectedExam.nextExamDate)}</div>
                          <div className="text-xs xs:text-sm text-gray-500">
                            ({daysUntilExam(selectedExam.nextExamDate)} days from now)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs xs:text-sm text-gray-500">Registration Deadline</div>
                          <div className="font-medium text-sm xs:text-base">{formatDate(selectedExam.registrationDeadline)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Levels */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Levels</h3>
                      <div className="space-y-1.5 xs:space-y-2">
                        {selectedExam.levels?.map((level, index) => (
                          <div key={index} className="flex items-center">
                            <CheckIcon className="w-3 h-3 xs:w-4 xs:h-4 text-green-500 mr-1.5 xs:mr-2" />
                            <span className="text-sm xs:text-base">{level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-2 xs:gap-3 mt-6 xs:mt-8 pt-4 xs:pt-6 border-t">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      openEditModal(selectedExam);
                    }}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base"
                  >
                    Edit Exam
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                <div className="text-center mb-4 xs:mb-5 sm:mb-6">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                    <DeleteIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-800 mb-1.5 xs:mb-2">Delete Exam</h3>
                  <p className="text-gray-600 text-sm xs:text-base">
                    Are you sure you want to delete the exam{" "}
                    <span className="font-semibold">{selectedExam.name}</span>?
                    This action cannot be undone and will remove all related data.
                  </p>
                </div>

                <div className="flex justify-center gap-2 xs:gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteExam}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                  >
                    <DeleteIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    Delete Exam
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
                  <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                    Update Registration Status
                  </h2>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base">
                  Update registration status for{" "}
                  <span className="font-semibold">{selectedExam.name}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  {REGISTRATION_STATUS.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(status)}
                      className={`p-3 xs:p-4 rounded-lg border-2 transition-all ${
                        selectedExam.registrationStatus === status
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 xs:gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium text-sm xs:text-base">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-4 xs:mt-5 sm:mt-6 pt-4 xs:pt-5 sm:pt-6 border-t">
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Toggle Modal */}
      <AnimatePresence>
        {showFeaturedModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                <div className="text-center mb-4 xs:mb-5 sm:mb-6">
                  <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 ${
                    selectedExam.featured ? "bg-yellow-100" : "bg-gray-100"
                  }`}>
                    <StarIcon className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 ${
                      selectedExam.featured ? "text-yellow-600" : "text-gray-400"
                    }`} />
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-800 mb-1.5 xs:mb-2">
                    {selectedExam.featured ? "Remove from Featured" : "Mark as Featured"}
                  </h3>
                  <p className="text-gray-600 text-sm xs:text-base">
                    {selectedExam.featured
                      ? "This exam will no longer be shown in featured sections."
                      : "This exam will be highlighted in featured sections across the platform."}
                  </p>
                </div>

                <div className="flex justify-center gap-2 xs:gap-3">
                  <button
                    onClick={() => setShowFeaturedModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleToggleFeatured}
                    className={`px-3 xs:px-4 py-1.5 xs:py-2 ${
                      selectedExam.featured
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white rounded-lg transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base`}
                  >
                    <StarIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    {selectedExam.featured ? "Remove Featured" : "Mark as Featured"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && selectedExam && selectedExam.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedExam.image}
                alt={selectedExam.name}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
              >
                <CloseIcon className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}