/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material UI Icons
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  CalendarToday as CalendarIcon,
  Notifications as NotificationsIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  FlightTakeoff as FlightIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  GridView as GridIcon,
  List as ListIcon,
  MoreVert as MoreIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as UncheckedIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  ContentCopy as CopyIcon,
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
const subscriptionApi = {
  // Get all subscriptions
  getAllSubscriptions: async () => {
    try {
      const response = await api.get("/newsletter");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  // Get single subscription by ID
  getSubscriptionById: async (id) => {
    try {
      const response = await api.get(`/newsletter/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  },

  // Export subscriptions as CSV
  exportSubscriptions: async () => {
    try {
      const response = await api.get("/newsletter/export");
      return response.data;
    } catch (error) {
      console.error("Error exporting subscriptions:", error);
      throw error;
    }
  },
};

// Country options for filtering
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
  "Rwanda",
  "Kenya",
  "Nigeria",
  "Ghana",
  "Not specified",
];

// Source options for filtering
const SOURCE_OPTIONS = [
  "footer_newsletter",
  "popup_modal",
  "contact_form",
  "event_registration",
  "social_media",
  "other",
];

export const SubscriptionManagement = () => {
  // State management
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [paginatedSubscriptions, setPaginatedSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("subscription_date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states (view-only, so only view modal)
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Export states
  const [exporting, setExporting] = useState(false);

  // Fetch subscriptions on component mount
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Filter, sort, and paginate subscriptions
  useEffect(() => {
    filterAndSortSubscriptions();
  }, [subscriptions, searchTerm, countryFilter, sourceFilter, dateFilter, sortBy, sortOrder, currentPage, itemsPerPage]);

  // Update pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredSubscriptions.slice(startIndex, endIndex);
    setPaginatedSubscriptions(paginatedData);
    
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredSubscriptions, currentPage, itemsPerPage]);

  // Fetch subscriptions from API
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await subscriptionApi.getAllSubscriptions();
      setSubscriptions(data);
      toast.success("Subscriptions loaded successfully");
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort subscriptions
  const filterAndSortSubscriptions = () => {
    let filtered = [...subscriptions];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.email?.toLowerCase().includes(term) ||
          sub.name?.toLowerCase().includes(term) ||
          sub.country?.toLowerCase().includes(term)
      );
    }

    // Apply country filter
    if (countryFilter !== "all") {
      filtered = filtered.filter((sub) => sub.country === countryFilter);
    }

    // Apply source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter((sub) => sub.source === sourceFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      filtered = filtered.filter((sub) => {
        const subDate = new Date(sub.subscription_date);
        switch (dateFilter) {
          case "today":
            return subDate >= today;
          case "yesterday":
            return subDate >= yesterday && subDate < today;
          case "week":
            return subDate >= lastWeek;
          case "month":
            return subDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "subscription_date":
          aValue = new Date(a.subscription_date);
          bValue = new Date(b.subscription_date);
          break;
        case "name":
          aValue = a.name?.toLowerCase() || "";
          bValue = b.name?.toLowerCase() || "";
          break;
        case "email":
          aValue = a.email?.toLowerCase() || "";
          bValue = b.email?.toLowerCase() || "";
          break;
        case "country":
          aValue = a.country?.toLowerCase() || "";
          bValue = b.country?.toLowerCase() || "";
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

    setFilteredSubscriptions(filtered);
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

  // Open view modal
  const openViewModal = (subscription) => {
    setSelectedSubscription(subscription);
    setShowViewModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  // Export to CSV
  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const data = await subscriptionApi.exportSubscriptions();
      
      // Create CSV content
      const headers = ["Email", "Name", "Country", "Source", "Subscription Date", "Updates", "Scholarships", "University News", "Visa Updates"];
      const csvContent = [
        headers.join(","),
        ...data.map(sub => [
          `"${sub.email}"`,
          `"${sub.name || ''}"`,
          `"${sub.country || ''}"`,
          `"${sub.source || ''}"`,
          `"${formatDate(sub.subscription_date)}"`,
          sub.preferences?.updates ? "Yes" : "No",
          sub.preferences?.scholarships ? "Yes" : "No",
          sub.preferences?.university_news ? "Yes" : "No",
          sub.preferences?.visa_updates ? "Yes" : "No"
        ].join(","))
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `newsletter_subscriptions_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Subscriptions exported successfully");
    } catch (error) {
      console.error("Error exporting subscriptions:", error);
      toast.error("Failed to export subscriptions");
    } finally {
      setExporting(false);
    }
  };

  // Copy email to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Newsletter Subscriptions
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all newsletter subscribers
            </p>
          </div>
          
          {/* Stats Summary */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded-xl shadow-sm p-3 min-w-[120px]">
              <div className="text-gray-500 text-sm">Total Subscribers</div>
              <div className="text-2xl font-bold text-blue-600">{subscriptions.length}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3 min-w-[120px]">
              <div className="text-gray-500 text-sm">Active This Month</div>
              <div className="text-2xl font-bold text-green-600">
                {subscriptions.filter(sub => {
                  const subDate = new Date(sub.subscription_date);
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return subDate >= monthAgo;
                }).length}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscribers by email, name, or country..."
              className="w-full pl-12 pr-4 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Country Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {COUNTRY_OPTIONS.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <LanguageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Source Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <option value="all">All Sources</option>
                  {SOURCE_OPTIONS.map(source => (
                    <option key={source} value={source}>
                      {source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                <FilterIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Date Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Controls */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="subscription_date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                  <option value="country">Sort by Country</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col -space-y-1">
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

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  title="Grid View"
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-lg ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  title="List View"
                >
                  <ListIcon />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchSubscriptions}
                  className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  title="Refresh"
                >
                  <RefreshIcon />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportCSV}
                  disabled={exporting}
                  className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <DownloadIcon />
                  <span className="hidden sm:inline">Export CSV</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subscriptions Display */}
      {viewMode === "grid" ? (
        // Grid View
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {paginatedSubscriptions.map((subscription) => (
            <motion.div
              key={subscription._id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                        <EmailIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 truncate">
                          {subscription.name || "Anonymous"}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {subscription.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(subscription.email)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy email"
                  >
                    <CopyIcon className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LanguageIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{subscription.country || "Not specified"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <FilterIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {subscription.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">
                      {formatRelativeTime(subscription.subscription_date)}
                    </span>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">Preferences:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {subscription.preferences?.updates && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckIcon className="w-3 h-3" />
                        <span>Updates</span>
                      </div>
                    )}
                    {subscription.preferences?.scholarships && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <SchoolIcon className="w-3 h-3" />
                        <span>Scholarships</span>
                      </div>
                    )}
                    {subscription.preferences?.university_news && (
                      <div className="flex items-center gap-1 text-xs text-purple-600">
                        <BusinessIcon className="w-3 h-3" />
                        <span>University News</span>
                      </div>
                    )}
                    {subscription.preferences?.visa_updates && (
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <FlightIcon className="w-3 h-3" />
                        <span>Visa Updates</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => openViewModal(subscription)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.location.href = `mailto:${subscription.email}`}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact
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
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Subscriber
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Source & Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Preferences
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSubscriptions.map((subscription) => (
                  <motion.tr
                    key={subscription._id}
                    variants={itemVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center mr-3">
                          <PersonIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {subscription.name || "Anonymous"}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <LanguageIcon className="w-3 h-3" />
                            {subscription.country || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <EmailIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{subscription.email}</span>
                          <button
                            onClick={() => copyToClipboard(subscription.email)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Copy email"
                          >
                            <CopyIcon className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {subscription.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(subscription.subscription_date)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {subscription.preferences?.updates && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <NotificationsIcon className="w-3 h-3 mr-1" />
                            Updates
                          </span>
                        )}
                        {subscription.preferences?.scholarships && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <SchoolIcon className="w-3 h-3 mr-1" />
                            Scholarships
                          </span>
                        )}
                        {subscription.preferences?.university_news && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <BusinessIcon className="w-3 h-3 mr-1" />
                            Univ News
                          </span>
                        )}
                        {subscription.preferences?.visa_updates && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <FlightIcon className="w-3 h-3 mr-1" />
                            Visa
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewModal(subscription)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <ViewIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.location.href = `mailto:${subscription.email}`}
                          className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                          title="Contact"
                        >
                          <EmailIcon className="w-4 h-4" />
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
      {filteredSubscriptions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center">
            <EmailIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-medium text-gray-700 mb-3">
            No subscribers found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            {searchTerm || countryFilter !== "all" || sourceFilter !== "all" || dateFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No newsletter subscriptions yet. Check back later!"}
          </p>
          {(searchTerm || countryFilter !== "all" || sourceFilter !== "all" || dateFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCountryFilter("all");
                setSourceFilter("all");
                setDateFilter("all");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          )}
        </motion.div>
      )}

      {/* Pagination Controls */}
      {filteredSubscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredSubscriptions.length)}
              </span>
              {" to "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredSubscriptions.length)}
              </span>
              {" of "}
              <span className="font-medium">{filteredSubscriptions.length}</span>{" "}
              subscribers
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`}
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
                  className={`w-10 h-10 rounded-lg ${currentPage === pageNum 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* View Subscription Modal */}
      <AnimatePresence>
        {showViewModal && selectedSubscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Subscriber Details</h2>
                    <p className="text-gray-600">View complete subscription information</p>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <PersonIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {selectedSubscription.name || "Anonymous"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <EmailIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{selectedSubscription.email}</span>
                          <button
                            onClick={() => copyToClipboard(selectedSubscription.email)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Copy email"
                          >
                            <CopyIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Country</label>
                      <div className="flex items-center gap-2 mt-1">
                        <LanguageIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{selectedSubscription.country || "Not specified"}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Source</label>
                      <div className="flex items-center gap-2 mt-1">
                        <FilterIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {selectedSubscription.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Subscription Date</label>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatDate(selectedSubscription.subscription_date)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Subscription Age</label>
                      <div className="mt-1">
                        <span className="font-medium">{formatRelativeTime(selectedSubscription.subscription_date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Notification Preferences</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg ${selectedSubscription.preferences?.updates ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          {selectedSubscription.preferences?.updates ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <CloseIcon className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium">Updates</div>
                            <div className="text-sm text-gray-500">General news and updates</div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${selectedSubscription.preferences?.scholarships ? 'bg-green-50 border border-green-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          {selectedSubscription.preferences?.scholarships ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <CloseIcon className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium">Scholarships</div>
                            <div className="text-sm text-gray-500">Scholarship opportunities</div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${selectedSubscription.preferences?.university_news ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          {selectedSubscription.preferences?.university_news ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <CloseIcon className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium">University News</div>
                            <div className="text-sm text-gray-500">University announcements</div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${selectedSubscription.preferences?.visa_updates ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          {selectedSubscription.preferences?.visa_updates ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <CloseIcon className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium">Visa Updates</div>
                            <div className="text-sm text-gray-500">Visa and immigration news</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.location.href = `mailto:${selectedSubscription.email}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <EmailIcon className="w-4 h-4" />
                    Contact Subscriber
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

