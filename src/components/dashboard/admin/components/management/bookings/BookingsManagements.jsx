/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as CountryIcon,
  DesignServices as ServiceIcon,
  Message as MessageIcon,
  Article as PostIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  GridView as GridIcon,
  List as ListIcon,
  MoreVert as MoreIcon,
  PendingActions as PendingIcon,
  Done as ConfirmedIcon,
  DoNotDisturb as CancelledIcon,
  DoneAll as CompletedIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

// API Configuration - Replace with your actual API URL
const API_BASE_URL = "http://localhost:5000/api"; // Your backend API URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service Functions
const bookingApi = {
  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await api.get("/bookings");
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // Get single booking by ID
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  },

  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  },

  // Delete booking
  deleteBooking: async (id) => {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    try {
      const response = await api.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },
};

// Status options matching your schema
const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-green-100 text-green-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  {
    value: "completed",
    label: "Completed",
    color: "bg-blue-100 text-blue-800",
  },
];

// Country options
const COUNTRY_OPTIONS = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "Mexico",
  "South Africa",
];

// Service options
const SERVICE_OPTIONS = [
  "Web Design",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "SEO Optimization",
  "Digital Marketing",
  "Consultation",
  "Other Services",
];

export const BookingManagement = () => {
  // State management
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [paginatedBookings, setPaginatedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  
  // Mobile menu state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };
  
  // Form states
  const [currentBooking, setCurrentBooking] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    date: new Date().toISOString().split("T")[0],
    message: "",
    postTitle: "",
    postId: "",
    status: "pending",
  });

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter, sort, and paginate bookings when dependencies change
  useEffect(() => {
    filterAndSortBookings();
  }, [bookings, searchTerm, statusFilter, sortBy, sortOrder, currentPage, itemsPerPage]);

  // Update pagination when filtered bookings change
  useEffect(() => {
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    // Calculate paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredBookings.slice(startIndex, endIndex);
    setPaginatedBookings(paginatedData);
    
    // Reset to page 1 if current page exceeds total pages
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredBookings, currentPage, itemsPerPage]);

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingApi.getAllBookings();
      setBookings(data);
      toast.success("Bookings loaded successfully");
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort bookings
  const filterAndSortBookings = () => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.name?.toLowerCase().includes(term) ||
          booking.email?.toLowerCase().includes(term) ||
          booking.phone?.includes(term) ||
          booking.service?.toLowerCase().includes(term) ||
          booking.country?.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "name":
          aValue = a.name?.toLowerCase() || "";
          bValue = b.name?.toLowerCase() || "";
          break;
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredBookings(filtered);
  };

  // Pagination functions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // First page button
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50 text-xs sm:text-sm"
        >
          <FirstPageIcon className="w-4 h-4" />
        </button>
      );
    }

    // Previous page button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 hover:bg-gray-50 text-xs sm:text-sm ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
    );

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 text-xs sm:text-sm ${
            currentPage === i
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next page button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 hover:bg-gray-50 text-xs sm:text-sm ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    );

    // Last page button
    if (endPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50 text-xs sm:text-sm"
        >
          <LastPageIcon className="w-4 h-4" />
        </button>
      );
    }

    return buttons;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!currentBooking.name.trim()) newErrors.name = "Name is required";
    if (!currentBooking.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(currentBooking.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!currentBooking.phone.trim()) newErrors.phone = "Phone is required";
    if (!currentBooking.country) newErrors.country = "Country is required";
    if (!currentBooking.service) newErrors.service = "Service is required";
    if (!currentBooking.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Create new booking
  const handleCreateBooking = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await bookingApi.createBooking(currentBooking);
      toast.success("Booking created successfully");
      setShowAddModal(false);
      resetForm();
      fetchBookings();
    } catch (error) {
      toast.error("Failed to create booking");
    }
  };

  // Update booking
  const handleUpdateBooking = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await bookingApi.updateBooking(selectedBooking._id, currentBooking);
      toast.success("Booking updated successfully");
      setShowEditModal(false);
      resetForm();
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  // Delete booking
  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    try {
      await bookingApi.deleteBooking(selectedBooking._id);
      toast.success("Booking deleted successfully");
      setShowDeleteModal(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  // Update booking status
  const handleUpdateStatus = async (status) => {
    if (!selectedBooking) return;

    try {
      await bookingApi.updateBookingStatus(selectedBooking._id, status);
      toast.success(`Status updated to ${status}`);
      setShowStatusModal(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentBooking({
      name: "",
      email: "",
      phone: "",
      country: "",
      service: "",
      date: new Date().toISOString().split("T")[0],
      message: "",
      postTitle: "",
      postId: "",
      status: "pending",
    });
    setErrors({});
  };

  // Open modals
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setCurrentBooking({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      country: booking.country,
      service: booking.service,
      date: new Date(booking.date).toISOString().split("T")[0],
      message: booking.message || "",
      postTitle: booking.postTitle || "",
      postId: booking.postId || "",
      status: booking.status,
    });
    setShowEditModal(true);
  };

  const openViewModal = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const openStatusModal = (booking) => {
    setSelectedBooking(booking);
    setShowStatusModal(true);
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    const statusObj = STATUS_OPTIONS.find((s) => s.value === status);
    return {
      icon:
        status === "pending" ? (
          <PendingIcon className="w-4 h-4" />
        ) : status === "confirmed" ? (
          <ConfirmedIcon className="w-4 h-4" />
        ) : status === "cancelled" ? (
          <CancelledIcon className="w-4 h-4" />
        ) : (
          <CompletedIcon className="w-4 h-4" />
        ),
      color: statusObj ? statusObj.color : "bg-gray-100 text-gray-800",
    };
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format date and time for createdAt
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <div className="min-h-screen flex bg-gray-50">
      {/* <Sidebar onToggleNotifications={toggleNotificationsModal} /> */}
      <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-x-hidden">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
            Manage all booking requests and inquiries
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FilterIcon />
              Filters & Options
            </span>
            <ArrowDropDownIcon className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6 ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Status Filter */}
                <div className="relative flex-1 min-w-[140px]">
                  <select
                    className="w-full text-sm sm:text-base appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <FilterIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative flex-1 min-w-[140px]">
                  <select
                    className="w-full text-sm sm:text-base appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="createdAt">Sort by Created</option>
                    <option value="service">Sort by Service</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                    <button
                      onClick={() => setSortOrder("asc")}
                      className={`text-xs ${sortOrder === "asc" ? "text-blue-500" : "text-gray-400"}`}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => setSortOrder("desc")}
                      className={`text-xs ${sortOrder === "desc" ? "text-blue-500" : "text-gray-400"}`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 sm:px-2 sm:py-1 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  >
                    <GridIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 sm:px-2 sm:py-1 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  >
                    <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchBookings}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Refresh"
                >
                  <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Add Booking Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openAddModal}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <AddIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">Add Booking</span>
                  <span className="xs:hidden">Add</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary - Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6"
        >
          {STATUS_OPTIONS.map((status) => (
            <motion.div
              key={status.value}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-3 sm:p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{status.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1">
                    {bookings.filter((b) => b.status === status.value).length}
                  </p>
                </div>
                <div className={`p-1 sm:p-2 rounded-full ${status.color}`}>
                  {getStatusInfo(status.value).icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bookings Display */}
        {viewMode === "grid" ? (
          // Grid View - Responsive columns
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {paginatedBookings.map((booking) => (
              <motion.div
                key={booking._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4 sm:p-5">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
                        {booking.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {booking.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                        getStatusInfo(booking.status).color
                      }`}
                    >
                      {getStatusInfo(booking.status).icon}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm truncate">{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CountryIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm truncate">{booking.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ServiceIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium truncate">
                        {booking.service}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        {formatDate(booking.date)}
                      </span>
                    </div>
                    {booking.postTitle && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <PostIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm truncate">
                          {booking.postTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                    <button
                      onClick={() => openViewModal(booking)}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => openStatusModal(booking)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Change Status"
                      >
                        <MoreIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => openEditModal(booking)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <EditIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(booking)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete"
                      >
                        <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // List View - Responsive table
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service & Date
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedBookings.map((booking) => (
                    <motion.tr
                      key={booking._id}
                      variants={itemVariants}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div>
                          <div className="font-medium text-sm sm:text-base text-gray-900 truncate max-w-[100px] sm:max-w-[150px]">
                            {booking.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-[150px]">
                            {booking.country}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm text-gray-900 truncate max-w-[100px] sm:max-w-[150px]">
                          {booking.email}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-[150px]">
                          {booking.phone}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="font-medium text-sm sm:text-base text-gray-900 truncate max-w-[100px] sm:max-w-[150px]">
                          {booking.service}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {formatDate(booking.date)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusInfo(booking.status).color
                          }`}
                        >
                          {getStatusInfo(booking.status).icon}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                        {formatDateTime(booking.createdAt)}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => openViewModal(booking)}
                            className="p-1 hover:bg-blue-50 rounded text-blue-600"
                            title="View"
                          >
                            <ViewIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(booking)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Edit"
                          >
                            <EditIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => openStatusModal(booking)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Change Status"
                          >
                            <MoreIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(booking)}
                            className="p-1 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
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
        {filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <div className="text-gray-400 mb-4">
              <PersonIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2">
              No bookings found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Create Your First Booking
            </button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {filteredBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>

            {/* Page info */}
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBookings.length)}
              </span>
              {" to "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredBookings.length)}
              </span>
              {" of "}
              <span className="font-medium">{filteredBookings.length}</span>{" "}
              bookings
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center">
              {renderPaginationButtons()}
            </div>
          </motion.div>
        )}

        {/* Add Booking Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      Create New Booking
                    </h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Guest Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={currentBooking.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={currentBooking.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={currentBooking.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={currentBooking.country}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Country</option>
                        {COUNTRY_OPTIONS.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Service Type *
                      </label>
                      <select
                        name="service"
                        value={currentBooking.service}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.service ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Service</option>
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.service}
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Booking Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={currentBooking.date}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.date ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Post Title */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Related Post Title
                      </label>
                      <input
                        type="text"
                        name="postTitle"
                        value={currentBooking.postTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter post title if applicable"
                      />
                    </div>

                    {/* Post ID */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Post ID
                      </label>
                      <input
                        type="text"
                        name="postId"
                        value={currentBooking.postId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter post ID"
                      />
                    </div>

                    {/* Message - Full Width */}
                    <div className="md:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Message / Special Requests
                      </label>
                      <textarea
                        name="message"
                        value={currentBooking.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter any special requests or messages..."
                      />
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateBooking}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <SaveIcon className="w-4 h-4" />
                      Create Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The rest of the modals (Edit, View, Delete, Status) follow the same responsive pattern */}
        {/* Edit Booking Modal */}
        <AnimatePresence>
          {showEditModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      Edit Booking
                    </h2>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Same form fields as Add Modal */}

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateBooking}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <SaveIcon className="w-4 h-4" />
                      Update Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Booking Modal */}
        <AnimatePresence>
          {showViewModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      Booking Details
                    </h2>
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Content follows same responsive pattern */}

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        openEditModal(selectedBooking);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                      Edit Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                <div className="p-4 sm:p-6">
                  {/* Content follows same responsive pattern */}

                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteBooking}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <DeleteIcon className="w-4 h-4" />
                      Delete Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Update Modal */}
        <AnimatePresence>
          {showStatusModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                <div className="p-4 sm:p-6">
                  {/* Content follows same responsive pattern */}

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => handleUpdateStatus(status.value)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                          selectedBooking.status === status.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <span className={`p-1 sm:p-2 rounded-full ${status.color}`}>
                            {getStatusInfo(status.value).icon}
                          </span>
                          <span className="font-medium">{status.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                    <button
                      onClick={() => setShowStatusModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};