/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons - Updated imports
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PublicIcon from "@mui/icons-material/Public";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ApprovalIcon from "@mui/icons-material/Approval";
import RemoveIcon from "@mui/icons-material/Remove";

// API Base URL
const API_BASE_URL = "https://ruziganodejs.onrender.com/visas/bookings";

// ============================================================================
// 1. MODALS COMPONENTS
// ============================================================================

// Confirm Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (type === "error")
      return <ErrorOutlineIcon className="text-2xl text-red-600" />;
    if (type === "warning")
      return <ErrorOutlineIcon className="text-2xl text-yellow-600" />;
    return <CheckIcon className="text-2xl text-blue-600" />;
  };

  const getBgColor = () => {
    if (type === "error") return "bg-red-100";
    if (type === "warning") return "bg-yellow-100";
    return "bg-blue-100";
  };

  const getButtonColor = () => {
    if (type === "error") return "bg-red-600 hover:bg-red-700";
    if (type === "warning") return "bg-yellow-600 hover:bg-yellow-700";
    return "bg-blue-600 hover:bg-blue-700";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="p-6">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 ${getBgColor()}`}
          >
            {getIcon()}
          </div>

          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-6">{message}</p>

          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${getButtonColor()} disabled:opacity-50`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Operation Result Modal
const ResultModal = ({ isOpen, onClose, type, title, message, details }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (type === "success")
      return <CheckCircleIcon className="text-4xl text-green-500" />;
    if (type === "error")
      return <ErrorOutlineIcon className="text-4xl text-red-500" />;
    return <ErrorOutlineIcon className="text-4xl text-blue-500" />;
  };

  const getBgColor = () => {
    if (type === "success") return "bg-green-100";
    if (type === "error") return "bg-red-100";
    return "bg-blue-100";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="p-6">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${getBgColor()}`}
          >
            {getIcon()}
          </div>

          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-4">{message}</p>
          
          {details && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">{details}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${
                type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : type === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Application Form Modal
const ApplicationModal = ({
  isOpen,
  onClose,
  application,
  onSave,
  mode = "create",
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    applicant: "",
    email: "",
    phone: "",
    country: "",
    type: "Tourist",
    duration: "",
    priority: "Normal",
    amount: "",
    status: "pending",
    documents: 0,
  });

  useEffect(() => {
    if (application && mode === "edit") {
      setFormData({
        ...application,
        date: application.date ? new Date(application.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      // Generate a unique ID for new applications
      const generateId = () => {
        const prefix = "VISA";
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return `${prefix}${randomNum}`;
      };

      setFormData({
        id: generateId(),
        applicant: "",
        email: "",
        phone: "",
        country: "",
        type: "Tourist",
        duration: "30 days",
        priority: "Normal",
        amount: "",
        status: "pending",
        documents: 0,
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [application, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.applicant.trim()) {
      toast.error("Applicant name is required");
      return;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Valid email is required");
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    
    if (!formData.country.trim()) {
      toast.error("Country is required");
      return;
    }
    
    if (!formData.amount.trim() || isNaN(parseFloat(formData.amount.replace('$', '')))) {
      toast.error("Valid amount is required");
      return;
    }
    
    // Format amount with $ if not present
    const formattedData = {
      ...formData,
      amount: formData.amount.includes('$') ? formData.amount : `$${formData.amount}`,
      date: new Date(formData.date),
      documents: parseInt(formData.documents) || 0
    };
    
    onSave(formattedData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "create" ? "New Visa Application" : "Edit Visa Application"}
            </h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <CloseIcon className="text-2xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application ID *
                </label>
                <input
                  type="text"
                  value={formData.id}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated ID</p>
              </div>

              <FormField
                label="Applicant Name *"
                type="text"
                value={formData.applicant}
                onChange={(e) => handleChange("applicant", e.target.value)}
                placeholder="Enter full name"
                required
                disabled={isLoading}
              />

              <FormField
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                required
                disabled={isLoading}
              />

              <FormField
                label="Phone Number *"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
                disabled={isLoading}
              />

              <FormField
                label="Country *"
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter country"
                required
                disabled={isLoading}
              />

              <FormField
                label="Application Date *"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
                disabled={isLoading}
              />

              <SelectField
                label="Visa Type *"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                options={[
                  { value: "Tourist", label: "Tourist" },
                  { value: "Business", label: "Business" },
                  { value: "Student", label: "Student" },
                  { value: "Work", label: "Work" },
                  { value: "Transit", label: "Transit" },
                ]}
                disabled={isLoading}
              />

              <FormField
                label="Duration *"
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g., 30 days, 6 months, 1 year"
                required
                disabled={isLoading}
              />

              <SelectField
                label="Priority *"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                options={[
                  { value: "Normal", label: "Normal" },
                  { value: "Express", label: "Express" },
                  { value: "Urgent", label: "Urgent" },
                ]}
                disabled={isLoading}
              />

              <FormField
                label="Amount *"
                type="text"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="e.g., 250 or $250"
                required
                disabled={isLoading}
              />

              <FormField
                label="Number of Documents"
                type="number"
                value={formData.documents}
                onChange={(e) => handleChange("documents", e.target.value)}
                placeholder="0"
                min="0"
                disabled={isLoading}
              />

              {mode === "edit" && (
                <SelectField
                  label="Status *"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "approved", label: "Approved" },
                    { value: "rejected", label: "Rejected" },
                    { value: "in-review", label: "In Review" },
                  ]}
                  disabled={isLoading}
                />
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {mode === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : mode === "create" ? (
                  "Create Application"
                ) : (
                  "Update Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Components for Modal
const FormField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  min,
  disabled,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      min={min}
      disabled={disabled}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// ============================================================================
// 2. STATS CARDS COMPONENT
// ============================================================================

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <BarChartIcon className="text-3xl" />,
      color: "bg-gradient-to-b from-blue-500 to-blue-600",
      change: "+12%",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: <PendingActionsIcon className="text-3xl" />,
      color: "bg-gradient-to-b from-yellow-500 to-yellow-600",
      change: "+5%",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <CheckCircleIcon className="text-3xl" />,
      color: "bg-gradient-to-b from-green-500 to-green-600",
      change: "+18%",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <CancelIcon className="text-3xl" />,
      color: "bg-gradient-to-b from-red-500 to-red-600",
      change: "-3%",
    },
  ];

  return (
    <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div
                className={`${stat.color} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 3. APPLICATION TABLE/GRID COMPONENT
// ============================================================================

const ApplicationView = ({
  applications,
  filteredApplications,
  filterStatus,
  setFilterStatus,
  loading,
  refreshData,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  viewMode,
  setViewMode,
  currentPage,
  setCurrentPage,
  isProcessing,
}) => {
  const itemsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredApplications.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="text-green-500 text-lg" />;
      case "pending":
        return <PendingActionsIcon className="text-yellow-500 text-lg" />;
      case "rejected":
        return <CancelIcon className="text-red-500 text-lg" />;
      case "in-review":
        return <VisibilityIcon className="text-blue-500 text-lg" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800";
      case "Express":
        return "bg-orange-100 text-orange-800";
      case "Normal":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Visa Applications
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {filteredApplications.length} applications
              {filteredApplications.length > itemsPerPage && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshData}
              disabled={isProcessing}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshIcon />
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                disabled={isProcessing}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-b from-blue-100 to-blue-200 text-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } disabled:opacity-50 transition-all`}
                title="Grid View"
              >
                <GridViewIcon />
              </button>
              <button
                onClick={() => setViewMode("list")}
                disabled={isProcessing}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-gradient-to-b from-blue-100 to-blue-200 text-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } disabled:opacity-50 transition-all`}
                title="List View"
              >
                <ListIcon />
              </button>
            </div>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              disabled={isProcessing}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="in-review">In Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Content */}
      {viewMode === "grid" ? (
        <GridLayout
          applications={currentItems}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onStatusChange={onStatusChange}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getPriorityColor={getPriorityColor}
          isProcessing={isProcessing}
        />
      ) : (
        <ListLayout
          applications={currentItems}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onStatusChange={onStatusChange}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getPriorityColor={getPriorityColor}
          isProcessing={isProcessing}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredApplications.length)} of{" "}
              {filteredApplications.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isProcessing}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeftIcon />
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
                    onClick={() => setCurrentPage(pageNum)}
                    disabled={isProcessing}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-medium ${
                      currentPage === pageNum
                        ? "bg-gradient-to-b from-blue-600 to-blue-700 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    } disabled:opacity-50 transition-all`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || isProcessing}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredApplications.length === 0 && !loading && (
        <div className="text-center py-12">
          <TimelineIcon className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading applications...</p>
        </div>
      )}
    </div>
  );
};

// Grid Layout Component
const GridLayout = ({
  applications,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  getStatusColor,
  getStatusIcon,
  getPriorityColor,
  isProcessing,
}) => (
  <div className="p-4 sm:p-6">
    <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {applications.map((app) => (
        <GridCard
          key={app._id || app.id}
          app={app}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onStatusChange={onStatusChange}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getPriorityColor={getPriorityColor}
          isProcessing={isProcessing}
        />
      ))}
    </div>
  </div>
);

// Grid Card Component
const GridCard = ({
  app,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  getStatusColor,
  getStatusIcon,
  getPriorityColor,
  isProcessing,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
  >
    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-10 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {app.applicant.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 truncate max-w-[120px]">
                {app.applicant}
              </h3>
              <p className="text-xs text-gray-500">{app.id}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {getStatusIcon(app.status)}
          <span
            className={`mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(
              app.status
            )}`}
          >
            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <PublicIcon className="mr-2 flex-shrink-0" />
          <span className="truncate">{app.country}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DateRangeIcon className="mr-2 flex-shrink-0" />
          <span>{app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <AttachMoneyIcon className="mr-2 flex-shrink-0" />
          <span>{app.amount}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DescriptionIcon className="mr-2 flex-shrink-0" />
          <span>{app.documents || 0} documents</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            app.type === "Tourist"
              ? "bg-blue-100 text-blue-800"
              : app.type === "Business"
              ? "bg-green-100 text-green-800"
              : app.type === "Student"
              ? "bg-purple-100 text-purple-800"
              : app.type === "Work"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {app.type}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(app.priority)}`}>
          {app.priority}
        </span>
      </div>

      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => onEditClick(app)}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-b from-blue-500 to-green-500 text-white py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 flex items-center justify-center"
        >
          <EditIcon className="text-white text-lg"/>
        </button>
        <button
          onClick={() => onDeleteClick(app._id || app.id)}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-b from-red-500 to-red-600 text-white py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 flex items-center justify-center"
        >
          <DeleteForeverIcon className="text-white text-lg"/>
        </button>
      </div>

      <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
        <button
          onClick={() => onStatusChange(app._id || app.id, "approved")}
          disabled={isProcessing || app.status === "approved"}
          className="text-xs bg-gradient-to-b from-green-500 to-green-600 text-white py-1.5 rounded hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all flex items-center justify-center"
        >
          <ApprovalIcon className="text-white"/>
        </button>
        <button
          onClick={() => onStatusChange(app._id || app.id, "rejected")}
          disabled={isProcessing || app.status === "rejected"}
          className="text-xs bg-gradient-to-b from-red-500 to-red-600 text-white py-1.5 rounded hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all flex items-center justify-center"
        >
          <RemoveIcon className="text-white"/>
        </button>
      </div>
    </div>
  </motion.div>
);

// List Layout Component
const ListLayout = ({
  applications,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  getStatusColor,
  getStatusIcon,
  getPriorityColor,
  isProcessing,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Applicant
          </th>
          <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Country
          </th>
          <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {applications.map((app) => (
          <ListRow
            key={app._id || app.id}
            app={app}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onStatusChange={onStatusChange}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPriorityColor={getPriorityColor}
            isProcessing={isProcessing}
          />
        ))}
      </tbody>
    </table>
  </div>
);

// List Row Component - Responsive Version
const ListRow = ({
  app,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  getStatusColor,
  getStatusIcon,
  getPriorityColor,
  isProcessing,
}) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
    className="transition-colors"
  >
    {/* ID & Priority Column */}
    <td className="px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="text-[10px] xsm:text-xs sm:text-sm font-medium text-blue-600">
        {app.id}
      </div>
      <div className="text-[9px] xsm:text-xs text-gray-500 mt-0.5 flex items-center">
        <PriorityHighIcon className="mr-1" style={{ fontSize: '10px' }} />
        {app.priority}
      </div>
    </td>

    {/* Applicant Info Column */}
    <td className="px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs xsm:text-sm sm:text-base">
          {app.applicant.charAt(0)}
        </div>
        <div className="ml-2 xsm:ml-3">
          <div className="text-xs xsm:text-sm font-medium text-gray-900 truncate max-w-[80px] xsm:max-w-[100px] sm:max-w-[140px] md:max-w-none">
            {app.applicant}
          </div>
          <div className="text-[10px] xsm:text-xs text-gray-500 truncate max-w-[80px] xsm:max-w-[100px] sm:max-w-[140px] md:max-w-none">
            {app.email}
          </div>
        </div>
      </div>
    </td>

    {/* Country Column - Hidden on xsm, shown on sm+ */}
    <td className="hidden sm:table-cell px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        <PublicIcon className="text-gray-400 mr-1 xsm:mr-2 flex-shrink-0" style={{ fontSize: '14px' }} />
        <span className="text-xs xsm:text-sm text-gray-900 truncate max-w-[60px] xsm:max-w-[80px] md:max-w-none">
          {app.country}
        </span>
      </div>
    </td>

    {/* Type Column - Hidden on xsm/sm, shown on md+ */}
    <td className="hidden md:table-cell px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex flex-col space-y-1">
        <span
          className={`px-1.5 py-0.5 xsm:px-2 xsm:py-1 inline-flex text-[10px] xsm:text-xs leading-4 font-semibold rounded-full ${
            app.type === "Tourist"
              ? "bg-blue-100 text-blue-800"
              : app.type === "Business"
              ? "bg-green-100 text-green-800"
              : app.type === "Student"
              ? "bg-purple-100 text-purple-800"
              : app.type === "Work"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {app.type}
        </span>
        <span className="text-[10px] xsm:text-xs text-gray-500">
          {app.documents || 0} docs
        </span>
      </div>
    </td>

    {/* Status Column */}
    <td className="px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        {getStatusIcon(app.status)}
        <span
          className={`ml-1 xsm:ml-2 px-1.5 py-0.5 xsm:px-2 xsm:py-1 text-[10px] xsm:text-xs rounded-full border ${getStatusColor(
            app.status
          )}`}
        >
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </span>
      </div>
    </td>

    {/* Date & Amount Column - Hidden on xsm/sm, shown on md+ */}
    <td className="hidden md:table-cell px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex items-center text-xs xsm:text-sm text-gray-500">
        <DateRangeIcon className="mr-1 xsm:mr-2 flex-shrink-0" style={{ fontSize: '14px' }} />
        {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}
      </div>
      <div className="text-xs xsm:text-sm text-gray-700 mt-0.5 xsm:mt-1">
        {app.amount}
      </div>
    </td>

    {/* Actions Column */}
    <td className="px-2 py-3 xsm:px-3 sm:px-4 md:px-6">
      <div className="flex flex-col xsm:flex-row xsm:flex-wrap gap-1 xsm:gap-1.5 sm:gap-2 md:gap-1">
        <div className="flex gap-1 xsm:gap-1.5">
          <ActionButton
            onClick={() => onStatusChange(app._id || app.id, "approved")}
            icon={<CheckCircleIcon className="text-green-500" style={{ fontSize: '14px' }} />}
            color="bg-gradient-to-b from-green-500 to-green-600"
            title="Approve"
            disabled={isProcessing || app.status === "approved"}
            size="xsm"
          />
          <ActionButton
            onClick={() => onStatusChange(app._id || app.id, "rejected")}
            icon={<CancelIcon className="text-red-500" style={{ fontSize: '14px' }} />}
            color="bg-gradient-to-b from-red-500 to-red-600"
            title="Reject"
            disabled={isProcessing || app.status === "rejected"}
            size="xsm"
          />
        </div>
        <div className="flex gap-1 xsm:gap-1.5">
          <ActionButton
            onClick={() => onEditClick(app)}
            icon={<EditIcon className="text-white" style={{ fontSize: '14px' }} />}
            color="bg-gradient-to-b from-blue-500 to-blue-600"
            title="Edit"
            disabled={isProcessing}
            size="xsm"
          />
          <ActionButton
            onClick={() => onDeleteClick(app._id || app.id)}
            icon={<DeleteIcon className="text-white" style={{ fontSize: '14px' }} />}
            color="bg-gradient-to-b from-red-500 to-red-600"
            title="Delete"
            disabled={isProcessing}
            size="xsm"
          />
        </div>
      </div>
    </td>
  </motion.tr>
);

// Action Button Component
const ActionButton = ({ onClick, icon, color = "bg-gray-100", title, disabled, size }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.1 }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${color} 
      ${size === 'xsm' ? 'p-1.5' : 'p-2'}
      rounded 
      text-white 
      hover:opacity-90 
      transition-all 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
    title={title}
  >
    {icon}
  </motion.button>
);

// ============================================================================
// 4. HEADER COMPONENT
// ============================================================================

const Header = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  applications,
  stats,
  onCreateClick,
  isProcessing,
}) => {
  const filterButtons = [
    { value: "all", label: "All", count: applications.length },
    { value: "pending", label: "Pending", count: stats.pending },
    { value: "approved", label: "Approved", count: stats.approved },
    { value: "rejected", label: "Rejected", count: stats.rejected },
    { value: "in-review", label: "In Review", count: stats.inReview || 0 },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Visa Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Manage visa applications efficiently
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48 lg:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm disabled:bg-gray-100"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateClick}
              disabled={isProcessing}
              className="flex items-center justify-center space-x-2 bg-gradient-to-b from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all w-full sm:w-auto text-sm sm:text-base disabled:opacity-50"
            >
              <AddIcon />
              <span>New Application</span>
            </motion.button>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
          {filterButtons.map((btn) => (
            <FilterButton
              key={btn.value}
              btn={btn}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

const FilterButton = ({ btn, filterStatus, setFilterStatus, isProcessing }) => {
  const getButtonStyle = (value) => {
    const baseStyle = "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg font-medium disabled:opacity-50 transition-all";
    
    if (filterStatus === value) {
      switch (value) {
        case "pending":
          return `${baseStyle} bg-gradient-to-b from-yellow-400 to-yellow-500 text-white`;
        case "approved":
          return `${baseStyle} bg-gradient-to-b from-green-500 to-green-600 text-white`;
        case "rejected":
          return `${baseStyle} bg-gradient-to-b from-red-500 to-red-600 text-white`;
        case "in-review":
          return `${baseStyle} bg-gradient-to-b from-blue-500 to-blue-600 text-white`;
        default:
          return `${baseStyle} bg-gradient-to-b from-blue-600 to-blue-700 text-white`;
      }
    }
    return `${baseStyle} bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300`;
  };

  return (
    <button
      onClick={() => setFilterStatus(btn.value)}
      disabled={isProcessing}
      className={getButtonStyle(btn.value)}
    >
      {btn.label} ({btn.count})
    </button>
  );
};

// ============================================================================
// 5. MAIN VISA MANAGEMENT COMPONENT
// ============================================================================

export const VisaManagement = () => {
  // State Management
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    inReview: 0,
  });

  // Modal States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "warning",
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [resultConfig, setResultConfig] = useState({
    type: "success",
    title: "",
    message: "",
    details: "",
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalMode, setModalMode] = useState("create");

  // API Functions
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      if (response.data && response.data.success) {
        setApplications(response.data.data || []);
      } else {
        throw new Error(response.data?.message || "Failed to fetch applications");
      }
    } catch (error) {
      showResultModalHandler("error", "Fetch Error", "Failed to fetch applications", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/overall`);
      if (response.data && response.data.success) {
        const data = response.data.data;
        setStats({
          total: data.total || 0,
          pending: data.pending || 0,
          approved: data.approved || 0,
          rejected: data.rejected || 0,
          inReview: data.inReview || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  const searchApplications = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
      if (response.data && response.data.success) {
        setApplications(response.data.data || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchApplications(searchQuery);
      } else {
        fetchApplications();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const fetchDashboardData = async () => {
    try {
      await Promise.all([fetchApplications(), fetchStatistics()]);
      toast.success("Dashboard data loaded successfully");
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  // Result Modal Handler
  const showResultModalHandler = (type, title, message, details = "") => {
    setResultConfig({
      type,
      title,
      message,
      details
    });
    setShowResultModal(true);
  };

  // CRUD Operations with confirmation/failure handling
const createApplication = async (applicationData) => {
  setIsProcessing(true);
  try {
    console.log("Creating application with data:", applicationData);
    
    // Don't send ID - let backend generate it
    const { id, ...dataWithoutId } = applicationData;
    
    // Format the data to match backend expectations
    const formattedData = {
      applicant: applicationData.applicant.trim(),
      email: applicationData.email.trim(),
      phone: applicationData.phone.trim(),
      country: applicationData.country.trim(),
      type: applicationData.type,
      duration: applicationData.duration,
      priority: applicationData.priority,
      amount: applicationData.amount.includes('$') ? applicationData.amount : `$${applicationData.amount}`,
      status: applicationData.status || "pending",
      documents: parseInt(applicationData.documents) || 0,
      date: new Date(applicationData.date), // Send Date object, not string
    };

    console.log("Formatted data for API:", formattedData);

    const response = await axios.post(API_BASE_URL, formattedData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    console.log("API Response:", response);

    if (response.data && response.data.success) {
      setApplications([response.data.data, ...applications]);
      await fetchStatistics();
      setShowApplicationModal(false);
      setCurrentPage(1);
      showResultModalHandler("success", "Success", "Application created successfully", `ID: ${response.data.data.id}`);
      toast.success("Application created successfully!");
    } else {
      const errorMessage = response.data?.message || "Failed to create application";
      console.error("API returned unsuccessful response:", response.data);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Create application error:", error);
    
    let errorMessage = "Failed to create application";
    let errorDetails = error.message;
    
    if (error.response) {
      // Server responded with error
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      
      // Handle Mongoose validation errors
      if (error.response.data?.errors) {
        const validationErrors = error.response.data.errors;
        errorMessage = "Validation Error";
        errorDetails = Object.values(validationErrors).map(err => err.message).join(', ');
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
        errorDetails = JSON.stringify(error.response.data);
      } else {
        errorMessage = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = "No response from server. Please check your connection.";
      errorDetails = "Network error or server is not responding";
    }
    
    showResultModalHandler("error", "Creation Failed", errorMessage, errorDetails);
    toast.error(`Creation failed: ${errorMessage}`);
  } finally {
    setIsProcessing(false);
  }
};

  const updateApplication = async (id, updatedData) => {
    setIsProcessing(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
      
      if (response.data && response.data.success) {
        setApplications(
          applications.map((app) =>
            app._id === id || app.id === id ? response.data.data : app
          )
        );
        await fetchStatistics();
        setShowApplicationModal(false);
        showResultModalHandler("success", "Success", "Application updated successfully", `ID: ${id}`);
      } else {
        throw new Error(response.data?.message || "Failed to update application");
      }
    } catch (error) {
      showResultModalHandler("error", "Update Failed", "Failed to update application", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteApplication = async (id) => {
    setIsProcessing(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      
      if (response.data && response.data.success) {
        setApplications(applications.filter((app) => (app._id !== id && app.id !== id)));
        await fetchStatistics();
        setShowConfirmModal(false);
        
        // Adjust current page if needed
        const filteredLength = applications.filter((app) => (app._id !== id && app.id !== id)).length;
        const maxPage = Math.ceil(filteredLength / 8);
        if (currentPage > maxPage) {
          setCurrentPage(maxPage || 1);
        }
        
        showResultModalHandler("success", "Success", "Application deleted successfully", `ID: ${id}`);
      } else {
        throw new Error(response.data?.message || "Failed to delete application");
      }
    } catch (error) {
      showResultModalHandler("error", "Deletion Failed", "Failed to delete application", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    setIsProcessing(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { status });
      
      if (response.data && response.data.success) {
        setApplications(
          applications.map((app) =>
            (app._id === id || app.id === id) ? response.data.data : app
          )
        );
        await fetchStatistics();
        setShowConfirmModal(false);
        showResultModalHandler("success", "Status Updated", `Application ${status} successfully`, `ID: ${id}`);
      } else {
        throw new Error(response.data?.message || "Failed to update application status");
      }
    } catch (error) {
      showResultModalHandler("error", "Status Update Failed", `Failed to update application status to ${status}`, error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Modal Handlers
  const handleCreateClick = () => {
    setSelectedApplication(null);
    setModalMode("create");
    setShowApplicationModal(true);
  };

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setModalMode("edit");
    setShowApplicationModal(true);
  };

  const handleDeleteClick = (id) => {
    setModalConfig({
      type: "warning",
      title: "Delete Application",
      message: "Are you sure you want to delete this application? This action cannot be undone.",
      onConfirm: () => deleteApplication(id),
    });
    setShowConfirmModal(true);
  };

  const handleStatusChange = (id, status) => {
    setModalConfig({
      type: "warning",
      title: `Change Status to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Are you sure you want to change the application status to ${status}?`,
      onConfirm: () => updateApplicationStatus(id, status),
    });
    setShowConfirmModal(true);
  };

  const handleSaveApplication = (formData) => {
    if (modalMode === "create") {
      createApplication(formData);
    } else {
      const id = selectedApplication._id || selectedApplication.id;
      updateApplication(id, formData);
    }
  };

  // Filter applications locally
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      <div className="w-full p-2 sm:p-4">
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          theme="colored"
          pauseOnHover
          closeOnClick
        />

        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          applications={applications}
          stats={stats}
          onCreateClick={handleCreateClick}
          isProcessing={isProcessing}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <StatsCards stats={stats} />
                <ApplicationView
                  applications={applications}
                  filteredApplications={filteredApplications}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  loading={loading}
                  refreshData={fetchDashboardData}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  onStatusChange={handleStatusChange}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isProcessing={isProcessing}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Modals */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={modalConfig.onConfirm}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          isLoading={isProcessing}
        />

        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          application={selectedApplication}
          onSave={handleSaveApplication}
          mode={modalMode}
          isLoading={isProcessing}
        />

        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          type={resultConfig.type}
          title={resultConfig.title}
          message={resultConfig.message}
          details={resultConfig.details}
        />
      </div>
    </div>
  );
};