/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Flag as FlagIcon,
  DateRange as DateIcon,
  AttachFile as AttachFileIcon,
  Description as DescriptionIcon,
  MoreVert as MoreVertIcon,
  Menu as MenuIcon,
  Add,
  SkipPrevious,
  SkipNext,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

const INITIAL_APPLICATION_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  currentEducation: "",
  gpa: "",
  targetUniversity: "",
  targetCountry: "",
  targetProgram: "",
  scholarshipInterest: "",
  intakeYear: "",
  documents: "",
  essay: "",
  additionalInfo: "",
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "approved", label: "Approved", color: "green" },
  { value: "rejected", label: "Rejected", color: "red" },
  { value: "under_review", label: "Under Review", color: "blue" },
  { value: "Submitted", label: "Submitted", color: "blue" },
  { value: "Under Review", label: "Under Review", color: "blue" },
  { value: "Approved", label: "Approved", color: "green" },
  { value: "Rejected", label: "Rejected", color: "red" },
  { value: "Draft", label: "Draft", color: "gray" },
];

const COUNTRY_OPTIONS = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "China",
  "South Korea",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "New Zealand",
];

const PROGRAM_OPTIONS = [
  "Computer Science",
  "Business Administration",
  "Medicine",
  "Engineering",
  "Law",
  "Psychology",
  "Architecture",
  "Art & Design",
  "Economics",
  "International Relations",
  "Environmental Science",
  "Data Science",
];

const SCHOLARSHIP_TYPES = [
  "Full Scholarship",
  "Partial Scholarship",
  "Merit-based Scholarship",
  "Need-based Scholarship",
  "Sports Scholarship",
  "Research Scholarship",
  "Merit-based",
  "Need-based",
  "Athletic",
  "Research",
  "Government",
  "University",
  "External",
];

const EDUCATION_LEVELS = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certificate",
  "Undergraduate",
  "Graduate",
  "PhD",
  "Postdoctoral",
];

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com/scholarships";
const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ScholarshipManagement = () => {
  // State management
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
  const [errors, setErrors] = useState({});

  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileTable, setShowMobileTable] = useState(false);

  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch applications from API
  const fetchApplications = async () => {
    setApiLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const transformedData = result.data.map((app) => ({
          id: app._id,
          firstName: app.firstName || "",
          lastName: app.lastName || "",
          email: app.email || "",
          phone: app.phone || "",
          nationality: app.nationality || "",
          currentEducation: app.currentEducation || "",
          gpa: app.gpa || "",
          targetUniversity: app.targetUniversity || "",
          targetCountry: app.targetCountry || "",
          targetProgram: app.targetProgram || "",
          scholarshipInterest:
            app.scholarshipInterest || app.scholarshipType || "",
          intakeYear: app.intakeYear || "",
          documents: app.documents?.transcripts?.url ? "Completed" : "Pending",
          essay: app.essay?.status || "Pending",
          additionalInfo: app.additionalInfo || "",
          status: app.status || "pending",
          createdAt: app.createdAt
            ? new Date(app.createdAt).toISOString().split("T")[0]
            : "",
          updatedAt: app.updatedAt
            ? new Date(app.updatedAt).toISOString().split("T")[0]
            : "",
          applicationId: app.applicationId || "",
        }));

        setApplications(transformedData);
        setFilteredApplications(transformedData);
      } else {
        showNotification("Failed to fetch applications", "error");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      showNotification(
        "Error fetching applications. Please check your API connection.",
        "error"
      );
    } finally {
      setApiLoading(false);
    }
  };

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter and sort applications
  useEffect(() => {
    let filtered = [...applications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.firstName?.toLowerCase().includes(term) ||
          app.lastName?.toLowerCase().includes(term) ||
          app.email?.toLowerCase().includes(term) ||
          app.targetUniversity?.toLowerCase().includes(term) ||
          app.applicationId?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredApplications(filtered);
    setPage(0);
  }, [applications, searchTerm, statusFilter, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gpa?.trim()) newErrors.gpa = "GPA is required";
    else if (
      isNaN(formData.gpa) ||
      parseFloat(formData.gpa) < 0 ||
      parseFloat(formData.gpa) > 4
    ) {
      newErrors.gpa = "GPA must be between 0 and 4";
    }
    if (!formData.targetUniversity?.trim())
      newErrors.targetUniversity = "Target university is required";
    if (!formData.targetProgram?.trim())
      newErrors.targetProgram = "Target program is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      const apiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        currentEducation: formData.currentEducation,
        gpa: parseFloat(formData.gpa) || 0,
        targetUniversity: formData.targetUniversity,
        targetCountry: formData.targetCountry,
        targetProgram: formData.targetProgram,
        scholarshipType: formData.scholarshipInterest,
        scholarshipInterest: formData.scholarshipInterest,
        intakeYear: parseInt(formData.intakeYear) || 2024,
        additionalInfo: formData.additionalInfo,
        essay: {
          status: formData.essay || "Pending",
          content: "",
        },
      };

      let response;

      if (isEditMode && selectedApplication) {
        response = await fetch(`${API_BASE_URL}/${selectedApplication.id}`, {
          method: "PUT",
          headers: API_CONFIG.headers,
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          showNotification("Application updated successfully!", "success");
          fetchApplications();
        } else {
          throw new Error("Failed to update application");
        }
      } else {
        response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: API_CONFIG.headers,
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          showNotification("Application created successfully!", "success");
          fetchApplications();
        } else {
          throw new Error("Failed to create application");
        }
      }

      handleCloseDialog();
      resetForm();
    } catch (error) {
      console.error("API Error:", error);
      showNotification("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete application
  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/${selectedApplication.id}`,
        {
          method: "DELETE",
          headers: API_CONFIG.headers,
        }
      );

      if (response.ok) {
        showNotification("Application deleted successfully!", "success");
        fetchApplications();
        setOpenDeleteDialog(false);
        setSelectedApplication(null);
      } else {
        throw new Error("Failed to delete application");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      showNotification(
        "Failed to delete application. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${applicationId}/status`, {
        method: "POST",
        headers: API_CONFIG.headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        showNotification("Status updated successfully!", "success");
        fetchApplications();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      showNotification("Failed to update status", "error");
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

  // Open edit dialog
  const handleEdit = (application) => {
    setSelectedApplication(application);
    setFormData(application);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  // Open view dialog
  const handleView = (application) => {
    setSelectedApplication(application);
    setOpenViewDialog(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (application) => {
    setSelectedApplication(application);
    setOpenDeleteDialog(true);
  };

  // Open create dialog
  const handleCreate = () => {
    resetForm();
    setIsEditMode(false);
    setOpenDialog(true);
  };

  // Close all dialogs
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
    setIsEditMode(false);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedApplication(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedApplication(null);
  };
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_APPLICATION_FORM);
    setErrors({});
  };

  // Handle pagination
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusOption = STATUS_OPTIONS.find((s) => s.value === status);
    const colorClass =
      {
        yellow: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300",
        green: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
        red: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300",
        blue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300",
        gray: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300",
      }[statusOption?.color] || "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300";

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}
      >
        {statusOption?.label || status}
      </span>
    );
  };

  // Calculate statistics
  const statistics = {
    total: applications.length,
    pending: applications.filter(
      (app) =>
        app.status === "pending" ||
        app.status === "Submitted" ||
        app.status === "Draft"
    ).length,
    approved: applications.filter(
      (app) => app.status === "approved" || app.status === "Approved"
    ).length,
    rejected: applications.filter(
      (app) => app.status === "rejected" || app.status === "Rejected"
    ).length,
  };

  // Paginated data
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

  // Status update buttons
  const StatusUpdateButtons = ({ application }) => {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {application.status !== "approved" &&
          application.status !== "Approved" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "approved")}
              className="px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded hover:from-green-600 hover:to-green-700"
              title="Approve"
            >
              Approve
            </button>
          )}
        {application.status !== "rejected" &&
          application.status !== "Rejected" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "rejected")}
              className="px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded hover:from-red-600 hover:to-red-700"
              title="Reject"
            >
              Reject
            </button>
          )}
        {application.status !== "pending" &&
          application.status !== "Submitted" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "pending")}
              className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs rounded hover:from-yellow-600 hover:to-yellow-700"
              title="Mark as Pending"
            >
              Pending
            </button>
          )}
      </div>
    );
  };

  // Notification component
  const Notification = () => {
    if (!notification.show) return null;

    const bgColor = {
      success: "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800",
      error: "bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800",
      warning: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800",
      info: "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800",
    }[notification.type];

    const icon = {
      success: <CheckIcon className="w-5 h-5 text-green-500" />,
      error: <ErrorIcon className="w-5 h-5 text-red-500" />,
      warning: <WarningIcon className="w-5 h-5 text-yellow-500" />,
      info: <InfoIcon className="w-5 h-5 text-blue-500" />,
    }[notification.type];

    return (
      <div
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md ${
          isMobile ? "max-w-xs mx-2" : ""
        }`}
      >
        <div className="flex items-start">
          {icon}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() =>
              setNotification((prev) => ({ ...prev, show: false }))
            }
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Modal backdrop
  const ModalBackdrop = ({ onClose }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}
    />
  );

  // Mobile Application Card Component
  const MobileApplicationCard = ({ application }) => (
    <div className="bg-white overflow-x-auto rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
            {application.firstName?.charAt(0) || "A"}
            {application.lastName?.charAt(0) || "P"}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">
              {application.firstName} {application.lastName}
            </h3>
            <p className="text-sm text-gray-500">{application.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              ID: {application.applicationId || "N/A"}
            </p>
          </div>
        </div>
        <div>{getStatusBadge(application.status)}</div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <SchoolIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">{application.targetUniversity || "Not specified"}</span>
        </div>
        <div className="flex items-center">
          <LocationIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>{application.targetProgram || "Not specified"}</span>
        </div>
        <div className="flex items-center">
          <DateIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>GPA: {application.gpa || "N/A"}</span>
          <span className="mx-2">•</span>
          <span>{application.createdAt || "N/A"}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(application)}
            className="p-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 rounded"
            title="View Details"
          >
            <ViewIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleEdit(application)}
            className="p-1 bg-gradient-to-r from-green-50 to-green-100 text-green-600 hover:from-green-100 hover:to-green-200 rounded"
            title="Edit"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteClick(application)}
            className="p-1 bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 rounded"
            title="Delete"
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>
        <StatusUpdateButtons application={application} />
      </div>
    </div>
  );

  // Loading indicator
  if (apiLoading && applications.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading scholarship applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* <Sidebar onToggleNotifications={toggleNotificationsModal} /> */}
      <div className="w-full px-2 sm:px-4 lg:px-6 py-4">
        <Notification />

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Scholarship Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage scholarship applications, review submissions, and track
            applicant progress
          </p>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 text-white shadow-lg col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  Total Applications
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{statistics.total}</p>
              </div>
              <BookIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{statistics.pending}</p>
              </div>
              <WarningIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Approved</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{statistics.approved}</p>
              </div>
              <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Rejected</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{statistics.rejected}</p>
              </div>
              <CancelIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Bar - Responsive */}
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="w-full sm:w-48 lg:w-64">
              <div className="relative">
                <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={fetchApplications}
                className="flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                title="Refresh data"
              >
                <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
               
              </button>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setSortConfig({ key: "createdAt", direction: "desc" });
                }}
                className="flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {isMobile ? "Reset" : <RefreshIcon className="size-5 text-red-600" />}
              </button>
            </div>

            <div>
              <button
                onClick={handleCreate}
                className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md text-sm sm:text-base"
              >
                {isMobile ? "New" : <Add className='text-blue-500'/>}
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table/Cards - Responsive */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {isMobile ? (
            // Mobile View - Cards
            <div className="p-3 sm:p-4">
              {paginatedApplications.length === 0 ? (
                <div className="py-12 w-full text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <SchoolIcon className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-lg font-medium">
                      {apiLoading ? "Loading..." : "No applications found"}
                    </p>
                    <p className="text-gray-500 mt-1 text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={handleCreate}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm"
                    >
                      Create New 
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {paginatedApplications.map((app) => (
                    <MobileApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Tablet & Desktop View - Table
            <div className="overflow-x-auto w-full">
              <table className="w-full overflow-x-auto">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("firstName")}
                    >
                      <div className="flex items-center">
                        Applicant
                        {sortConfig.key === "firstName" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isTablet ? 'hidden lg:table-cell' : ''}`}>
                      Contact
                    </th>
                    <th
                      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${isTablet ? '' : ''}`}
                      onClick={() => handleSort("targetUniversity")}
                    >
                      <div className="flex items-center">
                        University
                        {sortConfig.key === "targetUniversity" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedApplications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isTablet ? "6" : "7"}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <SchoolIcon className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium">
                            {apiLoading ? "Loading..." : "No applications found"}
                          </p>
                          <p className="text-gray-500 mt-1">
                            Try adjusting your search or filter criteria
                          </p>
                          <button
                            onClick={handleCreate}
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800"
                          >
                            Create New 
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 w-full">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                              {app.firstName?.charAt(0) || "A"}
                              {app.lastName?.charAt(0) || "P"}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {app.firstName} {app.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {app.nationality || "Not specified"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-4 whitespace-nowrap ${isTablet ? 'hidden lg:table-cell' : ''}`}>
                          <div className="text-sm text-gray-900 flex items-center">
                            <EmailIcon className="w-4 h-4 mr-2 text-blue-400" />
                            {app.email || "No email"}
                          </div>
                          <div className="text-sm font-bold text-gray-500 flex items-center mt-1">
                            <PhoneIcon className="w-4 h-4 mr-2 text-indigo-300" />
                            {app.phone || "No phone"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <SchoolIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {app.targetUniversity || "Not specified"}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <LocationIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {app.targetCountry || "Not specified"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {app.targetProgram || "Not specified"}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            GPA: {app.gpa || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            
                            <StatusUpdateButtons application={app} />
                          </div>
                        </td>
                 
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleView(app)}
                              className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500  rounded"
                              title="View Details"
                            >
                              <ViewIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(app)}
                              className="p-1 bg-gradient-to-r from-green-200 to-green-500  rounded"
                              title="Edit"
                            >
                              <EditIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(app)}
                              className="p-1 bg-gradient-to-r from-red-500 to-red-800 rounded"
                              title="Delete"
                            >
                              <DeleteIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination - Responsive */}
          {paginatedApplications.length > 0 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, filteredApplications.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredApplications.length}
                    </span>{" "}
                    applications
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <label
                      htmlFor="rowsPerPage"
                      className="text-xs sm:text-sm text-gray-700 mr-2"
                    >
                      Rows per page:
                    </label>
                    <select
                      id="rowsPerPage"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                      className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleChangePage(page - 1)}
                      disabled={page === 0}
                      className="px-2 sm:px-3 py-1 border bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-indigo-500"
                    >
                      <SkipPrevious className='text-white'/>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (page < 3) {
                        pageNum = i;
                      } else if (page > totalPages - 4) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <div
                          key={pageNum}
                          onClick={() => handleChangePage(pageNum)}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded border ${
                            page === pageNum
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum + 1}
                        </div>
                      );
                    })}

                    <button
                      onClick={() => handleChangePage(page + 1)}
                      disabled={page >= totalPages - 1}
                      className="px-2 sm:px-3 py-1 border bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-indigo-500"
                    >
                      <SkipNext className='text-white'/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CLEANED Create/Edit Modal - Simplified and Organized */}
      {openDialog && (
        <>
          <ModalBackdrop onClose={handleCloseDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-2 sm:mx-0">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {isEditMode ? "Edit Application" : "Create New Application"}
                </h2>
                <button
                  onClick={handleCloseDialog}
                  className="bg-gradient-to-t from-red-500 from-red-700 p-1 rounded-full hover:bg-gray-200"
                >
                  <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-6 text-black"
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                      <PersonIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Nationality
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Nationality</option>
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Current Education Level
                        </label>
                        <select
                          name="currentEducation"
                          value={formData.currentEducation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Education Level</option>
                          {EDUCATION_LEVELS.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                      <BookIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          GPA *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="4"
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.gpa ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter GPA (0.0 - 4.0)"
                        />
                        {errors.gpa && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.gpa}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Target University *
                        </label>
                        <input
                          type="text"
                          name="targetUniversity"
                          value={formData.targetUniversity}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.targetUniversity
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter target university"
                        />
                        {errors.targetUniversity && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.targetUniversity}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Target Country
                        </label>
                        <select
                          name="targetCountry"
                          value={formData.targetCountry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Country</option>
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Target Program *
                        </label>
                        <select
                          name="targetProgram"
                          value={formData.targetProgram}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.targetProgram
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Program</option>
                          {PROGRAM_OPTIONS.map((program) => (
                            <option key={program} value={program}>
                              {program}
                            </option>
                          ))}
                        </select>
                        {errors.targetProgram && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600">
                            {errors.targetProgram}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Details */}
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                      <FlagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                      Scholarship Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Scholarship Interest
                        </label>
                        <select
                          name="scholarshipInterest"
                          value={formData.scholarshipInterest}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Scholarship Type</option>
                          {SCHOLARSHIP_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Intake Year
                        </label>
                        <input
                          type="text"
                          name="intakeYear"
                          value={formData.intakeYear}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., 2024"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Documents Status
                        </label>
                        <select
                          name="documents"
                          value={formData.documents}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Status</option>
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Not Started">Not Started</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Essay Status
                        </label>
                        <select
                          name="essay"
                          value={formData.essay}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Status</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Pending">Pending</option>
                          <option value="Not Required">Not Required</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                      <DescriptionIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-500" />
                      Additional Information
                    </h3>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Additional Information
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="Enter any additional information about the applicant..."
                      />
                    </div>
                  </div>

                  {/* Submit Button - CLEARLY VISIBLE */}
                  <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={handleCloseDialog}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm sm:text-base"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            {isEditMode ? "Updating..." : "Creating..."}
                          </>
                        ) : (
                          <>
                            <SaveIcon className="w-5 h-5 mr-2" />
                            {isEditMode ? "Update Application" : "Submit Application"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal - Responsive with Green Gradient */}
      {openViewDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden mx-2 sm:mx-0">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={handleCloseViewDialog}
                  className="bg-gradient-to-t from-red-500 from-red-700 p-1 rounded-full"
                >
                  <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
                <div className="space-y-4 sm:space-y-6">
                  {/* Applicant Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                    <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                      {selectedApplication.firstName?.charAt(0) || "A"}
                      {selectedApplication.lastName?.charAt(0) || "P"}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {selectedApplication.firstName}{" "}
                        {selectedApplication.lastName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <EmailIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {selectedApplication.email}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {selectedApplication.phone}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FlagIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {selectedApplication.nationality || "Not specified"}
                        </div>
                      </div>
                      {selectedApplication.applicationId && (
                        <div className="text-xs sm:text-sm text-gray-500 mt-2">
                          Application ID: {selectedApplication.applicationId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status and Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                        Status
                      </h4>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                        Application Dates
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <DateIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" />
                          Created: {selectedApplication.createdAt || "N/A"}
                        </div>
                        <div className="flex items-center text-sm">
                          <RefreshIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" />
                          Last Updated: {selectedApplication.updatedAt || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                      <SchoolIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                      Academic Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Current Education
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.currentEducation ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">GPA</p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.gpa || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Target University
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.targetUniversity ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Target Country</p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.targetCountry || "Not specified"}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs sm:text-sm text-gray-500">Target Program</p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.targetProgram || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Details */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 sm:p-4">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                      <FlagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                      Scholarship Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Scholarship Interest
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.scholarshipInterest ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Intake Year</p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedApplication.intakeYear || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Documents Status
                        </p>
                        <p
                          className={`font-medium text-sm sm:text-base ${
                            selectedApplication.documents === "Completed"
                              ? "text-green-600"
                              : selectedApplication.documents === "Pending"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {selectedApplication.documents || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Essay Status</p>
                        <p
                          className={`font-medium text-sm sm:text-base ${
                            selectedApplication.essay === "Submitted"
                              ? "text-green-600"
                              : selectedApplication.essay === "Pending"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {selectedApplication.essay || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  {selectedApplication.additionalInfo && (
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                        <DescriptionIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                        Additional Information
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">
                        {selectedApplication.additionalInfo}
                      </p>
                    </div>
                  )}

                  {/* Status Update Section */}
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3">
                      Update Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.status !== "approved" &&
                        selectedApplication.status !== "Approved" && (
                          <button
                            onClick={() => {
                              handleStatusUpdate(
                                selectedApplication.id,
                                "approved"
                              );
                              handleCloseViewDialog();
                            }}
                            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 text-sm"
                          >
                            Approve
                          </button>
                        )}
                      {selectedApplication.status !== "rejected" &&
                        selectedApplication.status !== "Rejected" && (
                          <button
                            onClick={() => {
                              handleStatusUpdate(
                                selectedApplication.id,
                                "rejected"
                              );
                              handleCloseViewDialog();
                            }}
                            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 text-sm"
                          >
                            Reject
                          </button>
                        )}
                      {selectedApplication.status !== "pending" &&
                        selectedApplication.status !== "Submitted" && (
                          <button
                            onClick={() => {
                              handleStatusUpdate(
                                selectedApplication.id,
                                "pending"
                              );
                              handleCloseViewDialog();
                            }}
                            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 text-sm"
                          >
                            Mark as Pending
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <div>
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedApplication);
                    }}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center text-sm sm:text-base"
                  >
                    <EditIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Edit Application
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCloseViewDialog}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal - Responsive with Red Gradient */}
      {openDeleteDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full mx-auto mb-3 sm:mb-4">
                  <WarningIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 text-center mb-2">
                  Delete Application
                </h3>
                <p className="text-gray-500 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  Are you sure you want to delete the application for{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedApplication.firstName}{" "}
                    {selectedApplication.lastName}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm text-red-700">
                        <strong>Warning:</strong> Deleting this application will
                        remove all associated data including documents and
                        notes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Delete Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};