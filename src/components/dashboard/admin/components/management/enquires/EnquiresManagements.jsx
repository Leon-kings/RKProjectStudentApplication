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
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Flag as FlagIcon,
  PriorityHigh as PriorityIcon,
  Comment as CommentIcon,
  NoteAdd as NoteAddIcon,
  Mail as MailIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  MoreVert as MoreIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Sort as SortIcon,
  GridView as GridIcon,
  List as ListIcon,
  BarChart as ChartIcon,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Schedule as ScheduleIcon,
  Archive as ArchiveIcon,
  RestoreFromTrash as RestoreIcon,
  VisibilityOff as InvisibleIcon,
  Send as SendIcon,
  AttachFile as AttachIcon,
  Chat as ChatIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  DeleteForever as DeleteForeverIcon,
  Warning as WarningIcon,
  HourglassEmpty as HourglassIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  DoneAll as DoneAllIcon,
  Pending as PendingIcon,
  Loop as LoopIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  DateRange as DateRangeIcon,
  Timelapse as TimelapseIcon,
  InsertComment as InsertCommentIcon,
  ChatBubbleOutline as ChatBubbleIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Eye } from "lucide-react";

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service Functions - UPDATED FOR NEW RESPONSE FORMAT
const enquiryApi = {
  // Get all enquiries with pagination and filters
  getEnquiries: async (page = 1, limit = 8, filters = {}) => {
    try {
      const params = {
        page,
        limit,
        ...filters
      };
      const response = await api.get("/enquiries", { params });
      if (response.data.success) {
        console.log(response.data);
        return response.data;
      } else {
        toast.error("Failed to load enquiries");
        return {
          success: false,
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          },
          filters: {}
        };
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Failed to load enquiries");
      return {
        success: false,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        },
        filters: {}
      };
    }
  },

  // Get single enquiry by ID
  getEnquiryById: async (id) => {
    try {
      const response = await api.get(`/enquiries/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to load enquiry");
        throw new Error("Failed to load enquiry");
      }
    } catch (error) {
      console.error("Error fetching enquiry:", error);
      throw error;
    }
  },

  // Create new enquiry
  createEnquiry: async (enquiryData) => {
    try {
      const response = await api.post("/enquiries", enquiryData);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to create enquiry");
        throw new Error("Failed to create enquiry");
      }
    } catch (error) {
      console.error("Error creating enquiry:", error);
      throw error;
    }
  },

  // Update enquiry
  updateEnquiry: async (id, enquiryData) => {
    try {
      const response = await api.put(`/enquiries/${id}`, enquiryData);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to update enquiry");
        throw new Error("Failed to update enquiry");
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
      throw error;
    }
  },

  // Delete enquiry
  deleteEnquiry: async (id) => {
    try {
      const response = await api.delete(`/enquiries/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to delete enquiry");
        throw new Error("Failed to delete enquiry");
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      throw error;
    }
  },

  // Soft delete enquiry
  softDeleteEnquiry: async (id) => {
    try {
      const response = await api.patch(`/enquiries/${id}/soft-delete`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to move enquiry to trash");
        throw new Error("Failed to move enquiry to trash");
      }
    } catch (error) {
      console.error("Error soft deleting enquiry:", error);
      throw error;
    }
  },

  // Restore enquiry
  restoreEnquiry: async (id) => {
    try {
      const response = await api.patch(`/enquiries/${id}/restore`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to restore enquiry");
        throw new Error("Failed to restore enquiry");
      }
    } catch (error) {
      console.error("Error restoring enquiry:", error);
      throw error;
    }
  },

  // Update enquiry status
  updateEnquiryStatus: async (id, status) => {
    try {
      const response = await api.patch(`/enquiries/${id}/status`, { status });
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to update enquiry status");
        throw new Error("Failed to update enquiry status");
      }
    } catch (error) {
      console.error("Error updating enquiry status:", error);
      throw error;
    }
  },

  // Update enquiry priority
  updateEnquiryPriority: async (id, priority) => {
    try {
      const response = await api.patch(`/enquiries/${id}/priority`, { priority });
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to update enquiry priority");
        throw new Error("Failed to update enquiry priority");
      }
    } catch (error) {
      console.error("Error updating enquiry priority:", error);
      throw error;
    }
  },

  // Add note to enquiry
  addNoteToEnquiry: async (id, noteData) => {
    try {
      const response = await api.post(`/enquiries/${id}/notes`, noteData);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to add note");
        throw new Error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },

  // Get enquiry statistics
  getEnquiryStatistics: async () => {
    try {
      const response = await api.get("/enquiries/statistics");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to load statistics");
        return {
          total: 0,
          today: 0,
          yesterday: 0,
          last7Days: 0,
          last30Days: 0,
          statusSummary: [],
          topCourses: [],
          topCountries: []
        };
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return {
        total: 0,
        today: 0,
        yesterday: 0,
        last7Days: 0,
        last30Days: 0,
        statusSummary: [],
        topCourses: [],
        topCountries: []
      };
    }
  },

  // Get enquiry dashboard summary
  getDashboardSummary: async () => {
    try {
      const response = await api.get("/enquiries/dashboard-summary");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error("Failed to load dashboard summary");
        return {
          total: 0,
          today: 0,
          yesterday: 0,
          last7Days: 0,
          last30Days: 0,
          statusSummary: [],
          topCourses: [],
          topCountries: []
        };
      }
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      return {
        total: 0,
        today: 0,
        yesterday: 0,
        last7Days: 0,
        last30Days: 0,
        statusSummary: [],
        topCourses: [],
        topCountries: []
      };
    }
  },

  // Find recent duplicates
  findRecentDuplicates: async (email, hours = 24) => {
    try {
      const response = await api.get(`/enquiries/duplicates/${encodeURIComponent(email)}?hours=${hours}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error finding duplicates:", error);
      return [];
    }
  },
};

// Options for dropdowns
const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800", icon: <PendingIcon /> },
  { value: "contacted", label: "Contacted", color: "bg-purple-100 text-purple-800", icon: <ChatIcon /> },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-100 text-yellow-800", icon: <LoopIcon /> },
  { value: "qualified", label: "Qualified", color: "bg-green-100 text-green-800", icon: <CheckIcon /> },
  { value: "converted", label: "Converted", color: "bg-teal-100 text-teal-800", icon: <DoneAllIcon /> },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: <CancelIcon /> },
  { value: "on_hold", label: "On Hold", color: "bg-gray-100 text-gray-800", icon: <HourglassIcon /> },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800", icon: <ArrowDownIcon /> },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800", icon: <SortIcon /> },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800", icon: <PriorityIcon /> },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800", icon: <WarningIcon /> },
];

const COUNTRY_OPTIONS = [
  "United States", "United Kingdom", "Canada", "Australia", "India", 
  "Germany", "France", "China", "Japan", "Brazil", "South Africa",
  "Nigeria", "Kenya", "Rwanda", "Uganda", "Tanzania", "Ethiopia"
];

const COURSE_OPTIONS = [
  "Computer Science", "Business Administration", "Engineering", "Medicine",
  "Law", "Psychology", "Economics", "Mathematics", "Physics", "Chemistry",
  "Biology", "History", "English Literature", "Political Science",
  "International Relations", "Environmental Science", "Data Science",
  "Artificial Intelligence", "Cybersecurity", "Digital Marketing"
];

const SOURCE_OPTIONS = ["website", "phone", "email", "referral", "social_media", "event", "other"];

export const EnquiresManagements = () => {
  // State management - UPDATED FOR NEW RESPONSE FORMAT
  const [enquiriesData, setEnquiriesData] = useState({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      hasNext: false,
      hasPrev: false,
      itemsPerPage: 8
    },
    filters: {
      sortBy: "createdAt",
      sortOrder: "desc"
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showDeleted, setShowDeleted] = useState(false);
  
  // Local filters that will be sent to API
  const [apiFilters, setApiFilters] = useState({
    search: "",
    status: "",
    priority: "",
    country: "",
    course: "",
    dateRange: "",
    isDeleted: false,
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Form states
  const [currentEnquiry, setCurrentEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: "",
    message: "",
    status: "new",
    priority: "medium",
    source: "website",
    notes: [],
    followUpDate: "",
  });

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedEnquiries, setSelectedEnquiries] = useState([]);
  const [errors, setErrors] = useState({});
  const [newNote, setNewNote] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [duplicateEnquiries, setDuplicateEnquiries] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);

  // Statistics state
  const [statistics, setStatistics] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    last7Days: 0,
    last30Days: 0,
    statusSummary: [],
    topCourses: [],
    topCountries: []
  });

  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    last7Days: 0,
    last30Days: 0,
    statusSummary: [],
    topCourses: [],
    topCountries: []
  });

  const fileInputRef = useRef(null);

  // Fetch enquiries on component mount and when filters change
  useEffect(() => {
    fetchEnquiries();
    fetchStatistics();
    fetchDashboardSummary();
  }, [enquiriesData.pagination.currentPage, apiFilters]);

  // Update local filters when UI filters change (with debounce for search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newFilters = {
        ...apiFilters,
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : "",
        priority: priorityFilter !== "all" ? priorityFilter : "",
        country: countryFilter !== "all" ? countryFilter : "",
        course: courseFilter !== "all" ? courseFilter : "",
        isDeleted: showDeleted,
        dateRange: dateFilter !== "all" ? dateFilter : "",
        sortBy: enquiriesData.filters.sortBy,
        sortOrder: enquiriesData.filters.sortOrder
      };
      
      // Only update if filters actually changed
      if (JSON.stringify(newFilters) !== JSON.stringify(apiFilters)) {
        setApiFilters(newFilters);
        // Reset to first page when filters change
        setEnquiriesData(prev => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            currentPage: 1
          }
        }));
      }
    }, 500); // 500ms debounce for search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, priorityFilter, countryFilter, courseFilter, dateFilter, showDeleted]);

  // Fetch enquiries from API with pagination and filters
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const result = await enquiryApi.getEnquiries(
        enquiriesData.pagination.currentPage,
        enquiriesData.pagination.itemsPerPage,
        apiFilters
      );
      
      if (result.success) {
        setEnquiriesData({
          data: result.data || [],
          pagination: result.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false,
            itemsPerPage: enquiriesData.pagination.itemsPerPage
          },
          filters: result.filters || {
            sortBy: "createdAt",
            sortOrder: "desc"
          }
        });
      } else {
        setEnquiriesData({
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false,
            itemsPerPage: enquiriesData.pagination.itemsPerPage
          },
          filters: {
            sortBy: "createdAt",
            sortOrder: "desc"
          }
        });
      }
    } catch (error) {
      console.error("Error in fetchEnquiries:", error);
      setEnquiriesData({
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false,
          itemsPerPage: enquiriesData.pagination.itemsPerPage
        },
        filters: {
          sortBy: "createdAt",
          sortOrder: "desc"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      setStatsLoading(true);
      const data = await enquiryApi.getEnquiryStatistics();
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch dashboard summary
  const fetchDashboardSummary = async () => {
    try {
      const data = await enquiryApi.getDashboardSummary();
      setDashboardStats(data);
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    }
  };

  // Pagination functions - UPDATED
  const handlePageChange = (page) => {
    if (page >= 1 && page <= enquiriesData.pagination.totalPages) {
      setEnquiriesData(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          currentPage: page
        }
      }));
    }
  };

  const handleItemsPerPageChange = (value) => {
    setEnquiriesData(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        itemsPerPage: parseInt(value),
        currentPage: 1 // Reset to first page
      }
    }));
  };

  // Handle sorting
  const handleSortChange = (sortBy) => {
    setEnquiriesData(prev => {
      const newSortOrder = prev.filters.sortBy === sortBy && prev.filters.sortOrder === "desc" ? "asc" : "desc";
      return {
        ...prev,
        filters: {
          sortBy,
          sortOrder: newSortOrder
        }
      };
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!currentEnquiry.name.trim()) newErrors.name = "Name is required";
    if (!currentEnquiry.email.trim()) newErrors.email = "Email is required";
    if (!currentEnquiry.phone.trim()) newErrors.phone = "Phone number is required";
    if (!currentEnquiry.country.trim()) newErrors.country = "Country is required";
    if (!currentEnquiry.course.trim()) newErrors.course = "Course is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (currentEnquiry.email && !emailRegex.test(currentEnquiry.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setCurrentEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Create new enquiry
  const handleCreateEnquiry = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Check for duplicates
    try {
      const duplicates = await enquiryApi.findRecentDuplicates(currentEnquiry.email);
      if (duplicates.length > 0) {
        setDuplicateEnquiries(duplicates);
        setShowDuplicateModal(true);
        return;
      }
    } catch (error) {
      console.error("Error checking duplicates:", error);
    }

    try {
      await enquiryApi.createEnquiry(currentEnquiry);
      toast.success("Enquiry created successfully");
      setShowAddModal(false);
      resetForm();
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to create enquiry");
    }
  };

  // Update enquiry
  const handleUpdateEnquiry = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await enquiryApi.updateEnquiry(selectedEnquiry._id, currentEnquiry);
      toast.success("Enquiry updated successfully");
      setShowEditModal(false);
      resetForm();
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to update enquiry");
    }
  };

  // Delete enquiry
  const handleDeleteEnquiry = async () => {
    if (!selectedEnquiry) return;

    try {
      await enquiryApi.deleteEnquiry(selectedEnquiry._id);
      toast.success("Enquiry deleted permanently");
      setShowDeleteModal(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  // Soft delete enquiry
  const handleSoftDeleteEnquiry = async () => {
    if (!selectedEnquiry) return;

    try {
      await enquiryApi.softDeleteEnquiry(selectedEnquiry._id);
      toast.success("Enquiry moved to trash");
      setShowDeleteModal(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to move enquiry to trash");
    }
  };

  // Restore enquiry
  const handleRestoreEnquiry = async () => {
    if (!selectedEnquiry) return;

    try {
      await enquiryApi.restoreEnquiry(selectedEnquiry._id);
      toast.success("Enquiry restored successfully");
      setShowDeleteModal(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to restore enquiry");
    }
  };

  // Update enquiry status
  const handleUpdateStatus = async (status) => {
    if (!selectedEnquiry) return;

    try {
      await enquiryApi.updateEnquiryStatus(selectedEnquiry._id, status);
      toast.success(`Status updated to ${STATUS_OPTIONS.find(s => s.value === status)?.label}`);
      setShowStatusModal(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Update enquiry priority
  const handleUpdatePriority = async (priority) => {
    if (!selectedEnquiry) return;

    try {
      await enquiryApi.updateEnquiryPriority(selectedEnquiry._id, priority);
      toast.success(`Priority updated to ${PRIORITY_OPTIONS.find(p => p.value === priority)?.label}`);
      setShowPriorityModal(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to update priority");
    }
  };

  // Add note to enquiry
  const handleAddNote = async () => {
    if (!selectedEnquiry || !newNote.trim()) return;

    try {
      await enquiryApi.addNoteToEnquiry(selectedEnquiry._id, {
        content: newNote.trim(),
        createdBy: "Admin"
      });
      toast.success("Note added successfully");
      setNewNote("");
      setShowNoteModal(false);
      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  // Send email
  const handleSendEmail = async () => {
    if (!selectedEnquiry || !emailContent.trim()) return;

    try {
      // Implement email sending logic here
      toast.success("Email sent successfully");
      setEmailContent("");
      setShowEmailModal(false);
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentEnquiry({
      name: "",
      email: "",
      phone: "",
      country: "",
      course: "",
      message: "",
      status: "new",
      priority: "medium",
      source: "website",
      notes: [],
      followUpDate: "",
    });
    setErrors({});
  };

  // Open modals
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setCurrentEnquiry({
      name: enquiry.name || "",
      email: enquiry.email || "",
      phone: enquiry.phone || "",
      country: enquiry.country || "",
      course: enquiry.course || "",
      message: enquiry.message || "",
      status: enquiry.status || "new",
      priority: enquiry.priority || "medium",
      source: enquiry.source || "website",
      notes: enquiry.notes || [],
      followUpDate: enquiry.followUpDate ? new Date(enquiry.followUpDate).toISOString().split("T")[0] : "",
    });
    setShowEditModal(true);
  };

  const openViewModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowViewModal(true);
  };

  const openDeleteModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDeleteModal(true);
  };

  const openStatusModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowStatusModal(true);
  };

  const openPriorityModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowPriorityModal(true);
  };

  const openNoteModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNewNote("");
    setShowNoteModal(true);
  };

  const openEmailModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEmailContent(`Dear ${enquiry.name},\n\nThank you for your enquiry about ${enquiry.course}.`);
    setShowEmailModal(true);
  };

  const openStatisticsModal = () => {
    setShowStatisticsModal(true);
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

  // Get status color and icon
  const getStatusInfo = (status) => {
    const statusInfo = STATUS_OPTIONS.find(s => s.value === status);
    return statusInfo || { label: "Unknown", color: "bg-gray-100 text-gray-800", icon: <PendingIcon /> };
  };

  // Get priority color and icon
  const getPriorityInfo = (priority) => {
    const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === priority);
    return priorityInfo || { label: "Medium", color: "bg-yellow-100 text-yellow-800", icon: <SortIcon /> };
  };

  // Calculate time ago
  const timeAgo = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  // Bulk actions
  const handleBulkStatusUpdate = async (status) => {
    if (selectedEnquiries.length === 0) {
      toast.warning("Please select enquiries first");
      return;
    }

    try {
      const promises = selectedEnquiries.map(enquiry => 
        enquiryApi.updateEnquiryStatus(enquiry._id, status)
      );
      await Promise.all(promises);
      toast.success(`Updated ${selectedEnquiries.length} enquiries to ${STATUS_OPTIONS.find(s => s.value === status)?.label}`);
      setSelectedEnquiries([]);
      setShowBulkActions(false);
      fetchEnquiries();
      fetchStatistics();
      fetchDashboardSummary();
    } catch (error) {
      toast.error("Failed to update enquiries");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedEnquiries.length === 0) {
      toast.warning("Please select enquiries first");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedEnquiries.length} enquiries?`)) {
      try {
        const promises = selectedEnquiries.map(enquiry => 
          enquiryApi.softDeleteEnquiry(enquiry._id)
        );
        await Promise.all(promises);
        toast.success(`Moved ${selectedEnquiries.length} enquiries to trash`);
        setSelectedEnquiries([]);
        setShowBulkActions(false);
        fetchEnquiries();
        fetchStatistics();
        fetchDashboardSummary();
      } catch (error) {
        toast.error("Failed to delete enquiries");
      }
    }
  };

  // Toggle enquiry selection
  const toggleEnquirySelection = (enquiry) => {
    if (selectedEnquiries.some(e => e._id === enquiry._id)) {
      setSelectedEnquiries(selectedEnquiries.filter(e => e._id !== enquiry._id));
    } else {
      setSelectedEnquiries([...selectedEnquiries, enquiry]);
    }
  };

  // Select all enquiries on current page
  const selectAllOnPage = () => {
    if (selectedEnquiries.length === enquiriesData.data.length) {
      setSelectedEnquiries([]);
    } else {
      setSelectedEnquiries([...enquiriesData.data]);
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
        <div className=" flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4 sm:gap-5">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enquiry Management
            </h1>
            <p className="text-gray-600 mt-1 xs:mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base">
              Manage all student enquiries, communications, and conversions
            </p>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
            {[
              { label: "Total", value: dashboardStats.total, icon: <AssignmentIcon />, color: "bg-blue-500" },
              { label: "Today", value: dashboardStats.today, icon: <CalendarIcon />, color: "bg-green-500" },
              { label: "Yesterday", value: dashboardStats.yesterday, icon: <CalendarIcon className="rotate-180" />, color: "bg-orange-500" },
              { label: "Last 7 Days", value: dashboardStats.last7Days, icon: <TrendingUpIcon />, color: "bg-purple-500" },
              { label: "Last 30 Days", value: dashboardStats.last30Days, icon: <ChartIcon />, color: "bg-teal-500" },
              { label: "New", value: dashboardStats.statusSummary?.find(s => s._id === "new")?.count || 0, icon: <PendingIcon />, color: "bg-yellow-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-2.5 sm:p-3 cursor-pointer"
                onClick={openStatisticsModal}
              >
                <div className=" items-center justify-between">
                  <div>
                    <div className="text-[10px] xs:text-xs sm:text-xs text-gray-500">{stat.label}</div>
                    <div className="text-sm xs:text-base sm:text-lg font-bold text-gray-800">{stat.value}</div>
                  </div>
                  <div className={`p-1.5 xs:p-2 sm:p-2 rounded-lg ${stat.color} text-white`}>
                    {React.cloneElement(stat.icon, { className: "w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" })}
                  </div>
                </div>
              </motion.div>
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
              placeholder="Search enquiries by name, email, course..."
              className="w-full pl-9 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 border-0 bg-gray-50 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm xs:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {/* Status Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {STATUS_OPTIONS.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <FilterIcon className="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>

              {/* Priority Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  {PRIORITY_OPTIONS.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {COUNTRY_OPTIONS.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative flex-1 min-w-[120px] xs:min-w-[140px]">
                <select
                  className="appearance-none pl-3 xs:pl-4 pr-8 xs:pr-10 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base w-full"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2">
              {/* Sort Controls */}
              <div className="relative">
                <div
                  onClick={() => handleSortChange("createdAt")}
                  className="flex items-center gap-1.5 xs:gap-2 pl-3 xs:pl-4 pr-3 xs:pr-4 py-2 xs:py-2.5 border border-gray-200 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm xs:text-base hover:bg-gray-50"
                >
                  <SortIcon className="w-4 h-4" />
                  <span className="hidden xs:inline">
                    {enquiriesData.filters.sortBy === "createdAt" ? "Date" : "Sort"}
                  </span>
                  {enquiriesData.filters.sortBy === "createdAt" && (
                    enquiriesData.filters.sortOrder === "desc" ? 
                    <ArrowDownIcon className="w-3 h-3" /> : 
                    <ArrowUpIcon className="w-3 h-3" />
                  )}
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

              {/* Trash Toggle */}
              <button
                onClick={() => setShowDeleted(!showDeleted)}
                className={`p-2 xs:p-2.5 rounded-lg xs:rounded-xl transition-colors flex items-center gap-1.5 xs:gap-2 ${
                  showDeleted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={showDeleted ? "Show Active" : "Show Trash"}
              >
                {showDeleted ? (
                  <RestoreIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                ) : (
                  <ArchiveIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                )}
                <span className="hidden xs:inline text-sm">
                  {showDeleted ? "Active" : "Trash"}
                </span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 xs:gap-2">
                <button
                  onClick={fetchEnquiries}
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
                  <span className="hidden xs:inline">Add Enquiry</span>
                  <span className="xs:hidden">Add</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bulk Actions Bar */}
      {selectedEnquiries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="flex items-center gap-1.5 xs:gap-2">
                <CheckBoxIcon className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
                <span className="font-medium text-sm xs:text-base">
                  {selectedEnquiries.length} selected
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiries([])}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Clear Selection
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 xs:gap-3">
              <div className="relative">
                <select
                  onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                  className="pl-3 xs:pl-4 pr-8 xs:pr-10 py-1.5 xs:py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm xs:text-base"
                >
                  <option value="">Update Status</option>
                  {STATUS_OPTIONS.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleBulkDelete}
                className="px-3 xs:px-4 py-1.5 xs:py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
              >
                <DeleteIcon className="w-4 h-4" />
                <span className="hidden xs:inline">Move to Trash</span>
                <span className="xs:hidden">Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enquiries Display */}
      {viewMode === "grid" ? (
        // Grid View
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
        >
          {enquiriesData.data.map((enquiry) => (
            <motion.div
              key={enquiry._id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className={`bg-white rounded-xl xs:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border ${
                enquiry.isDeleted ? "border-red-200" : "border-gray-100"
              } ${selectedEnquiries.some(e => e._id === enquiry._id) ? "ring-2 ring-blue-500" : ""}`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedEnquiries.some(e => e._id === enquiry._id)}
                  onChange={() => toggleEnquirySelection(enquiry)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {enquiry.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm xs:text-base truncate max-w-[120px] xs:max-w-[140px]">
                        {enquiry.name || "Unknown"}
                      </h3>
                      <p className="text-xs text-gray-600">{timeAgo(enquiry.createdAt)}</p>
                    </div>
                  </div>
                  {enquiry.isDeleted ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Trash
                    </span>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(enquiry.status).color}`}>
                        {getStatusInfo(enquiry.status).label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${getPriorityInfo(enquiry.priority).color}`}>
                        {getPriorityInfo(enquiry.priority).label}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <EmailIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 truncate">{enquiry.email || "No email"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{enquiry.phone || "No phone"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <LocationIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{enquiry.country || "No country"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <SchoolIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 font-medium">{enquiry.course || "No course"}</span>
                  </div>
                </div>

                {/* Message Preview */}
                {enquiry.message && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-1">Message:</div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {enquiry.message}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openViewModal(enquiry)}
                      className="text-xs xs:text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                     <Eye className='size-6'/>
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {!enquiry.isDeleted && (
                      <>
                        <button
                          onClick={() => openNoteModal(enquiry)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Add Note"
                        >
                          <NoteAddIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openEmailModal(enquiry)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send Email"
                        >
                          <MailIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openStatusModal(enquiry)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Change Status"
                        >
                          <FlagIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openEditModal(enquiry)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <EditIcon className="w-4 h-4 text-gray-600" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => openDeleteModal(enquiry)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title={enquiry.isDeleted ? "Restore" : "Delete"}
                    >
                      {enquiry.isDeleted ? (
                        <RestoreIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <DeleteIcon className="w-4 h-4 text-red-600" />
                      )}
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
            <table className="w-full min-w-[800px] xs:min-w-[900px] sm:min-w-[1000px]">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedEnquiries.length === enquiriesData.data.length && enquiriesData.data.length > 0}
                      onChange={selectAllOnPage}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course & Country
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiriesData.data.map((enquiry) => (
                  <motion.tr
                    key={enquiry._id}
                    variants={itemVariants}
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedEnquiries.some(e => e._id === enquiry._id) ? "bg-blue-50" : ""
                    } ${enquiry.isDeleted ? "bg-red-50" : ""}`}
                  >
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <input
                        type="checkbox"
                        checked={selectedEnquiries.some(e => e._id === enquiry._id)}
                        onChange={() => toggleEnquirySelection(enquiry)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-2 xs:mr-3">
                          {enquiry.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm xs:text-base">
                            {enquiry.name || "Unknown"}
                          </div>
                          <div className="text-xs xs:text-sm text-gray-500">
                            {timeAgo(enquiry.createdAt)}
                          </div>
                          {enquiry.isDeleted && (
                            <div className="text-xs text-red-600 font-medium">Trashed</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <EmailIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 truncate max-w-[150px] xs:max-w-[200px]">
                            {enquiry.email || "No email"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{enquiry.phone || "No phone"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900 text-sm xs:text-base mb-1">
                          {enquiry.course || "No course"}
                        </div>
                        <div className="flex items-center gap-2">
                          <LocationIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{enquiry.country || "No country"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${getStatusInfo(enquiry.status).color}`}>
                          {getStatusInfo(enquiry.status).label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${getPriorityInfo(enquiry.priority).color}`}>
                          {getPriorityInfo(enquiry.priority).label}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(enquiry.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDateTime(enquiry.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex items-center gap-1 xs:gap-2">
                        <button
                          onClick={() => openViewModal(enquiry)}
                          className="p-1.5 xs:p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <ViewIcon className="w-4 h-4" />
                        </button>
                        {!enquiry.isDeleted && (
                          <>
                            <button
                              onClick={() => openNoteModal(enquiry)}
                              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                              title="Add Note"
                            >
                              <NoteAddIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => openEmailModal(enquiry)}
                              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                              title="Send Email"
                            >
                              <MailIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => openEditModal(enquiry)}
                              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                              title="Edit"
                            >
                              <EditIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => openDeleteModal(enquiry)}
                          className="p-1.5 xs:p-2 hover:bg-red-50 rounded-lg"
                          title={enquiry.isDeleted ? "Restore" : "Delete"}
                        >
                          {enquiry.isDeleted ? (
                            <RestoreIcon className="w-4 h-4 text-green-600" />
                          ) : (
                            <DeleteIcon className="w-4 h-4 text-red-600" />
                          )}
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
      {enquiriesData.data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 xs:py-12 sm:py-16"
        >
          <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-6 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center">
            <AssignmentIcon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h3 className="text-lg xs:text-xl sm:text-2xl font-medium text-gray-700 mb-2 xs:mb-3">
            No enquiries found
          </h3>
          <p className="text-gray-500 max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-6 xs:mb-8 text-sm xs:text-base">
            {searchTerm || statusFilter !== "all" || priorityFilter !== "all" || countryFilter !== "all" || courseFilter !== "all" || dateFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : showDeleted
              ? "Trash is empty"
              : "No enquiries available. Create your first enquiry to get started!"}
          </p>
          {(searchTerm || statusFilter !== "all" || priorityFilter !== "all" || countryFilter !== "all" || courseFilter !== "all" || dateFilter !== "all") ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
                setCountryFilter("all");
                setCourseFilter("all");
                setDateFilter("all");
              }}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-lg xs:rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm xs:text-base"
            >
              Clear All Filters
            </button>
          ) : !showDeleted ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg xs:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1.5 xs:gap-2 mx-auto text-sm xs:text-base"
            >
              <AddIcon className="w-4 h-4 xs:w-5 xs:h-5" />
              Create Your First Enquiry
            </motion.button>
          ) : (
            <button
              onClick={() => setShowDeleted(false)}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-lg xs:rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm xs:text-base"
            >
              Back to Active Enquiries
            </button>
          )}
        </motion.div>
      )}

      {/* Pagination Controls */}
      {enquiriesData.data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4"
        >
          <div className="flex items-center gap-3 xs:gap-4">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <span className="text-xs xs:text-sm text-gray-600">Show</span>
              <select
                value={enquiriesData.pagination.itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 rounded-lg text-xs xs:text-sm bg-white"
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="24">24</option>
              </select>
              <span className="text-xs xs:text-sm text-gray-600">per page</span>
            </div>
            
            <div className="text-xs xs:text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {Math.min((enquiriesData.pagination.currentPage - 1) * enquiriesData.pagination.itemsPerPage + 1, enquiriesData.pagination.totalItems)}
              </span>
              {" to "}
              <span className="font-medium">
                {Math.min(enquiriesData.pagination.currentPage * enquiriesData.pagination.itemsPerPage, enquiriesData.pagination.totalItems)}
              </span>
              {" of "}
              <span className="font-medium">{enquiriesData.pagination.totalItems}</span>{" "}
              enquiries
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={!enquiriesData.pagination.hasPrev || enquiriesData.pagination.currentPage === 1}
              className={`p-1.5 xs:p-2 rounded-lg ${!enquiriesData.pagination.hasPrev || enquiriesData.pagination.currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`}
              title="First Page"
            >
              <FirstPageIcon className="w-4 h-4 xs:w-5 xs:h-5" />
            </button>
            
            <button
              onClick={() => handlePageChange(enquiriesData.pagination.currentPage - 1)}
              disabled={!enquiriesData.pagination.hasPrev}
              className={`px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg ${!enquiriesData.pagination.hasPrev
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
            >
              Previous
            </button>
            
            {(() => {
              const pages = [];
              const totalPages = enquiriesData.pagination.totalPages;
              const currentPage = enquiriesData.pagination.currentPage;
              
              // Always show first page
              if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) {
                  pages.push('...');
                }
              }
              
              // Show pages around current page
              for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                pages.push(i);
              }
              
              // Always show last page
              if (currentPage < totalPages - 2) {
                if (currentPage < totalPages - 3) {
                  pages.push('...');
                }
                pages.push(totalPages);
              }
              
              return pages.map((page, index) => (
                page === '...' ? (
                  <span key={index} className="px-2 text-gray-500">...</span>
                ) : (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 xs:w-10 xs:h-10 rounded-lg ${currentPage === page
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
                  >
                    {page}
                  </button>
                )
              ));
            })()}
            
            <button
              onClick={() => handlePageChange(enquiriesData.pagination.currentPage + 1)}
              disabled={!enquiriesData.pagination.hasNext}
              className={`px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg ${!enquiriesData.pagination.hasNext
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"} text-xs xs:text-sm`}
            >
              Next
            </button>

            <button
              onClick={() => handlePageChange(enquiriesData.pagination.totalPages)}
              disabled={!enquiriesData.pagination.hasNext || enquiriesData.pagination.currentPage === enquiriesData.pagination.totalPages}
              className={`p-1.5 xs:p-2 rounded-lg ${!enquiriesData.pagination.hasNext || enquiriesData.pagination.currentPage === enquiriesData.pagination.totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`}
              title="Last Page"
            >
              <LastPageIcon className="w-4 h-4 xs:w-5 xs:h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Add/Edit Enquiry Modal */}
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
                      {showAddModal ? "Create New Enquiry" : "Edit Enquiry"}
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      {showAddModal ? "Add a new student enquiry" : "Update enquiry information"}
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
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={currentEnquiry.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                          placeholder="Enter full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={currentEnquiry.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={currentEnquiry.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 xs:space-y-4">
                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={currentEnquiry.country}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.country ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                        >
                          <option value="">Select Country</option>
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                        )}
                      </div>

                      {/* Course */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course Interested *
                        </label>
                        <select
                          name="course"
                          value={currentEnquiry.course}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.course ? "border-red-500" : "border-gray-300"
                          } text-sm xs:text-base`}
                        >
                          <option value="">Select Course</option>
                          {COURSE_OPTIONS.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                        {errors.course && (
                          <p className="text-red-500 text-xs mt-1">{errors.course}</p>
                        )}
                      </div>

                      {/* Source */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Source
                        </label>
                        <select
                          name="source"
                          value={currentEnquiry.source}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                        >
                          {SOURCE_OPTIONS.map((source) => (
                            <option key={source} value={source}>
                              {source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={currentEnquiry.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                      placeholder="Enter enquiry message..."
                    />
                  </div>

                  {/* Status and Priority */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={currentEnquiry.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={currentEnquiry.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                      >
                        {PRIORITY_OPTIONS.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Follow-up Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      name="followUpDate"
                      value={currentEnquiry.followUpDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                    />
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
                    onClick={showAddModal ? handleCreateEnquiry : handleUpdateEnquiry}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                  >
                    <SaveIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    {showAddModal ? "Create Enquiry" : "Update Enquiry"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Enquiry Modal */}
      <AnimatePresence>
        {showViewModal && selectedEnquiry && (
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
                      Enquiry Details
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      Reference: {selectedEnquiry._id?.slice(-8).toUpperCase() || "N/A"}
                    </p>
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
                  {/* Left Column - Student Info */}
                  <div className="lg:col-span-2 space-y-4 xs:space-y-5">
                    {/* Student Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 xs:p-5">
                      <div className="flex items-center gap-3 xs:gap-4 mb-4">
                        <div className="w-12 h-12 xs:w-16 xs:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl xs:text-2xl">
                          {selectedEnquiry.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                          <h3 className="text-lg xs:text-xl font-bold text-gray-800">
                            {selectedEnquiry.name || "Unknown"}
                          </h3>
                          <p className="text-gray-600 text-sm xs:text-base">
                            Enquired {timeAgo(selectedEnquiry.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                        <div className="flex items-center gap-2">
                          <EmailIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Email</div>
                            <div className="font-medium">{selectedEnquiry.email || "N/A"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Phone</div>
                            <div className="font-medium">{selectedEnquiry.phone || "N/A"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <LocationIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Country</div>
                            <div className="font-medium">{selectedEnquiry.country || "N/A"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <SchoolIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Course</div>
                            <div className="font-medium">{selectedEnquiry.course || "N/A"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    {selectedEnquiry.message && (
                      <div className="bg-white border border-gray-200 rounded-lg p-4 xs:p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Message</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Status and Actions */}
                  <div className="space-y-4 xs:space-y-5">
                    {/* Status Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 xs:p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 xs:mb-3">Status & Priority</h3>
                      <div className="space-y-2 xs:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedEnquiry.status).color}`}>
                            {getStatusInfo(selectedEnquiry.status).label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Priority:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityInfo(selectedEnquiry.priority).color}`}>
                            {getPriorityInfo(selectedEnquiry.priority).label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Source:</span>
                          <span className="font-medium">
                            {selectedEnquiry.source?.charAt(0).toUpperCase() + selectedEnquiry.source?.slice(1).replace('_', ' ') || "Website"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm xs:text-base">Created:</span>
                          <span className="font-medium text-sm xs:text-base">{formatDateTime(selectedEnquiry.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 xs:p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-2 xs:gap-3">
                        <button
                          onClick={() => {
                            setShowViewModal(false);
                            openNoteModal(selectedEnquiry);
                          }}
                          className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                        >
                          <NoteAddIcon className="w-5 h-5 text-gray-600" />
                          <span className="text-xs font-medium">Add Note</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowViewModal(false);
                            openEmailModal(selectedEnquiry);
                          }}
                          className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                        >
                          <MailIcon className="w-5 h-5 text-gray-600" />
                          <span className="text-xs font-medium">Send Email</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowViewModal(false);
                            openStatusModal(selectedEnquiry);
                          }}
                          className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                        >
                          <FlagIcon className="w-5 h-5 text-gray-600" />
                          <span className="text-xs font-medium">Change Status</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowViewModal(false);
                            openPriorityModal(selectedEnquiry);
                          }}
                          className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                        >
                          <PriorityIcon className="w-5 h-5 text-gray-600" />
                          <span className="text-xs font-medium">Priority</span>
                        </button>
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
                      openEditModal(selectedEnquiry);
                    }}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base"
                  >
                    Edit Enquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedEnquiry && (
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
                    selectedEnquiry.isDeleted ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {selectedEnquiry.isDeleted ? (
                      <RestoreIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-green-600" />
                    ) : (
                      <DeleteIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-red-600" />
                    )}
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-800 mb-1.5 xs:mb-2">
                    {selectedEnquiry.isDeleted ? "Restore Enquiry" : "Delete Enquiry"}
                  </h3>
                  <p className="text-gray-600 text-sm xs:text-base">
                    {selectedEnquiry.isDeleted
                      ? `Are you sure you want to restore the enquiry from "${selectedEnquiry.name}"?`
                      : `Are you sure you want to ${showDeleted ? "permanently delete" : "move to trash"} the enquiry from "${selectedEnquiry.name}"?`}
                    {!selectedEnquiry.isDeleted && !showDeleted && " This action can be undone."}
                  </p>
                </div>

                <div className="flex justify-center gap-2 xs:gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  {selectedEnquiry.isDeleted ? (
                    <button
                      onClick={handleRestoreEnquiry}
                      className="px-3 xs:px-4 py-1.5 xs:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                    >
                      <RestoreIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                      Restore Enquiry
                    </button>
                  ) : showDeleted ? (
                    <button
                      onClick={handleDeleteEnquiry}
                      className="px-3 xs:px-4 py-1.5 xs:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                    >
                      <DeleteForeverIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                      Delete Permanently
                    </button>
                  ) : (
                    <button
                      onClick={handleSoftDeleteEnquiry}
                      className="px-3 xs:px-4 py-1.5 xs:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                    >
                      <DeleteIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                      Move to Trash
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && selectedEnquiry && (
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
                    Update Status
                  </h2>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base">
                  Update status for enquiry from{" "}
                  <span className="font-semibold">{selectedEnquiry.name}</span>
                </p>

                <div className="grid grid-cols-1 gap-2 xs:gap-3">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleUpdateStatus(status.value)}
                      className={`p-3 xs:p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                        selectedEnquiry.status === status.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 xs:gap-3">
                        <div className={`p-2 rounded-lg ${status.color.split(' ')[0]}`}>
                          {React.cloneElement(status.icon, { className: "w-4 h-4 xs:w-5 xs:h-5" })}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm xs:text-base">{status.label}</div>
                          <div className="text-xs text-gray-500">
                            {status.value === 'contacted' ? 'Set follow-up date' : 
                             status.value === 'converted' ? 'Enquiry converted' :
                             status.value === 'rejected' ? 'Enquiry rejected' : ''}
                          </div>
                        </div>
                      </div>
                      {selectedEnquiry.status === status.value && (
                        <CheckIcon className="text-blue-500 w-5 h-5 xs:w-6 xs:h-6" />
                      )}
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

      {/* Priority Update Modal */}
      <AnimatePresence>
        {showPriorityModal && selectedEnquiry && (
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
                    Update Priority
                  </h2>
                  <button
                    onClick={() => setShowPriorityModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base">
                  Update priority for enquiry from{" "}
                  <span className="font-semibold">{selectedEnquiry.name}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <button
                      key={priority.value}
                      onClick={() => handleUpdatePriority(priority.value)}
                      className={`p-4 xs:p-5 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        selectedEnquiry.priority === priority.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`p-2 rounded-full ${priority.color.split(' ')[0]}`}>
                        {React.cloneElement(priority.icon, { className: "w-5 h-5 xs:w-6 xs:h-6" })}
                      </div>
                      <div className="font-medium text-sm xs:text-base">{priority.label}</div>
                      {selectedEnquiry.priority === priority.value && (
                        <CheckIcon className="text-blue-500 w-4 h-4 xs:w-5 xs:h-5 absolute top-2 right-2" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-4 xs:mt-5 sm:mt-6 pt-4 xs:pt-5 sm:pt-6 border-t">
                  <button
                    onClick={() => setShowPriorityModal(false)}
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

      {/* Add Note Modal */}
      <AnimatePresence>
        {showNoteModal && selectedEnquiry && (
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
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                      Add Note
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      Add a note to enquiry from {selectedEnquiry.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNoteModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                <div className="mb-4 xs:mb-5 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note Content
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                    placeholder="Enter your note here..."
                  />
                </div>

                <div className="flex justify-end gap-2 xs:gap-3">
                  <button
                    onClick={() => setShowNoteModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base ${
                      !newNote.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <NoteAddIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    Add Note
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Send Email Modal */}
      <AnimatePresence>
        {showEmailModal && selectedEnquiry && (
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
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                      Send Email
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      To: {selectedEnquiry.name} &lt;{selectedEnquiry.email}&gt;
                    </p>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                <div className="space-y-4 xs:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      defaultValue={`Re: Your enquiry about ${selectedEnquiry.course}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      rows="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 xs:gap-3 mt-6 xs:mt-8 pt-4 xs:pt-6 border-t">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm xs:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base"
                  >
                    <SendIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                    Send Email
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Modal */}
      <AnimatePresence>
        {showStatisticsModal && (
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
              className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 xs:p-5 sm:p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-800">
                      Enquiry Statistics
                    </h2>
                    <p className="text-gray-600 text-sm xs:text-base">
                      Overview of enquiry performance and trends
                    </p>
                  </div>
                  <button
                    onClick={() => setShowStatisticsModal(false)}
                    className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </div>

                {statsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 xs:gap-4">
                      {[
                        { label: "Total Enquiries", value: statistics.total, icon: <AssignmentIcon />, color: "bg-blue-500" },
                        { label: "New Today", value: statistics.today, icon: <CalendarIcon />, color: "bg-green-500" },
                        { label: "Last 7 Days", value: statistics.last7Days, icon: <TrendingUpIcon />, color: "bg-purple-500" },
                        { label: "Conversion Rate", value: "12.5%", icon: <ChartIcon />, color: "bg-teal-500" },
                      ].map((stat, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 xs:p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-[10px] xs:text-xs text-gray-500">{stat.label}</div>
                              <div className="text-lg xs:text-xl font-bold text-gray-800">{stat.value}</div>
                            </div>
                            <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                              {React.cloneElement(stat.icon, { className: "w-4 h-4 xs:w-5 xs:h-5" })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status Distribution */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 xs:p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Status Distribution</h3>
                      <div className="space-y-2">
                        {STATUS_OPTIONS.map((status) => {
                          const count = statistics.statusSummary?.find(s => s._id === status.value)?.count || 0;
                          const percentage = statistics.total > 0 ? (count / statistics.total * 100).toFixed(1) : 0;
                          
                          return (
                            <div key={status.value} className="flex items-center justify-between">
                              <div className="flex items-center gap-2 xs:gap-3">
                                <div className={`p-2 rounded-lg ${status.color.split(' ')[0]}`}>
                                  {React.cloneElement(status.icon, { className: "w-4 h-4 xs:w-5 xs:h-5" })}
                                </div>
                                <div>
                                  <div className="font-medium text-sm xs:text-base">{status.label}</div>
                                  <div className="text-xs text-gray-500">{count} enquiries</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-gray-800">{percentage}%</div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${status.color.split(' ')[0]}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6 xs:mt-8 pt-4 xs:pt-6 border-t">
                  <button
                    onClick={() => setShowStatisticsModal(false)}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}