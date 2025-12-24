/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// Material Icons
import {
  Search,
  Refresh,
  FilterList,
  Download,
  DateRange,
  PendingActions,
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  Delete,
  Add,
  Close,
  Check,
  ErrorOutline,
  Public,
  AttachMoney,
  Schedule,
  BarChart,
  Timeline,
  ArrowUpward,
  ArrowDownward,
  Person,
  Email,
  Phone,
  LocationOn,
  GridView,
  List,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

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
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (type === "error")
      return <ErrorOutline className="text-2xl text-red-600" />;
    if (type === "warning")
      return <ErrorOutline className="text-2xl text-yellow-600" />;
    return <Check className="text-2xl text-blue-600" />;
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
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${getButtonColor()}`}
            >
              Confirm
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
}) => {
  const [formData, setFormData] = useState({
    applicant: "",
    email: "",
    phone: "",
    country: "",
    type: "Tourist",
    duration: "30",
    priority: "Normal",
    amount: "",
    status: "pending",
  });

  useEffect(() => {
    if (application && mode === "edit") {
      setFormData(application);
    } else {
      setFormData({
        applicant: "",
        email: "",
        phone: "",
        country: "",
        type: "Tourist",
        duration: "30",
        priority: "Normal",
        amount: "",
        status: "pending",
      });
    }
  }, [application, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
              {mode === "create" ? "New Application" : "Edit Application"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Close className="text-2xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <FormField
                label="Applicant Name *"
                type="text"
                value={formData.applicant}
                onChange={(e) => handleChange("applicant", e.target.value)}
                placeholder="Enter full name"
                required
              />

              <FormField
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />

              <FormField
                label="Phone Number *"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />

              <FormField
                label="Country *"
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter country"
                required
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
                  { value: "Other", label: "Other" },
                ]}
              />

              <FormField
                label="Duration (days) *"
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="Enter duration"
                min="1"
                required
              />

              <SelectField
                label="Priority *"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                options={[
                  { value: "Normal", label: "Normal" },
                  { value: "High", label: "High" },
                  { value: "Urgent", label: "Urgent" },
                ]}
              />

              <FormField
                label="Amount ($) *"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="Enter amount"
                min="0"
                required
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
                />
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {mode === "create"
                  ? "Create Application"
                  : "Update Application"}
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
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
      icon: <BarChart className="text-3xl" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: <PendingActions className="text-3xl" />,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      change: "+5%",
      trend: "up",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <CheckCircle className="text-3xl" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <Cancel className="text-3xl" />,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      change: "-2%",
      trend: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div className="flex items-center mt-1 sm:mt-2">
                  {stat.trend === "up" ? (
                    <ArrowUpward className="text-green-500 text-xs sm:text-sm" />
                  ) : (
                    <ArrowDownward className="text-red-500 text-xs sm:text-sm" />
                  )}
                  <span
                    className={`text-xs sm:text-sm ml-1 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </span>
                </div>
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
}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredApplications.slice(startIndex, endIndex);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
        return <CheckCircle className="text-green-500" />;
      case "pending":
        return <PendingActions className="text-yellow-500" />;
      case "rejected":
        return <Cancel className="text-red-500" />;
      case "in-review":
        return <Visibility className="text-blue-500" />;
      default:
        return null;
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
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Refresh"
            >
              <Refresh />
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="Grid View"
              >
                <GridView />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="List View"
              >
                <List />
              </button>
            </div>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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
          viewMode={viewMode}
        />
      ) : (
        <ListLayout
          applications={currentItems}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onStatusChange={onStatusChange}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          viewMode={viewMode}
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
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft />
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
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-medium ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredApplications.length === 0 && !loading && (
        <div className="text-center py-12">
          <Timeline className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
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
}) => (
  <div className="p-4 sm:p-6">
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {applications.map((app) => (
        <GridCard
          key={app.id}
          app={app}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onStatusChange={onStatusChange}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
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
          <Public className="mr-2 flex-shrink-0" size={16} />
          <span className="truncate">{app.country}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DateRange className="mr-2 flex-shrink-0" size={16} />
          <span>{app.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <AttachMoney className="mr-2 flex-shrink-0" size={16} />
          <span>{app.amount}</span>
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
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {app.type}
        </span>
        <div className="text-xs text-gray-500">{app.duration} days</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEditClick(app)}
          className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteClick(app.id)}
          className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
        <button
          onClick={() => onStatusChange(app.id, "approved")}
          className="text-xs bg-green-50 text-green-700 py-1.5 rounded hover:bg-green-100"
        >
          Approve
        </button>
        <button
          onClick={() => onStatusChange(app.id, "rejected")}
          className="text-xs bg-red-50 text-red-700 py-1.5 rounded hover:bg-red-100"
        >
          Reject
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
            key={app.id}
            app={app}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onStatusChange={onStatusChange}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        ))}
      </tbody>
    </table>
  </div>
);

// List Row Component
const ListRow = ({
  app,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  getStatusColor,
  getStatusIcon,
}) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
    className="transition-colors"
  >
    <td className="px-4 sm:px-6 py-4">
      <div className="text-xs sm:text-sm font-medium text-blue-600">
        {app.id}
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
          {app.applicant.charAt(0)}
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
            {app.applicant}
          </div>
          <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
            {app.email}
          </div>
        </div>
      </div>
    </td>
    <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
      <div className="flex items-center">
        <Public className="text-gray-400 mr-2 flex-shrink-0" size={16} />
        <span className="text-sm text-gray-900 truncate">{app.country}</span>
      </div>
    </td>
    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          app.type === "Tourist"
            ? "bg-blue-100 text-blue-800"
            : app.type === "Business"
            ? "bg-green-100 text-green-800"
            : app.type === "Student"
            ? "bg-purple-100 text-purple-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {app.type}
      </span>
    </td>
    <td className="px-4 sm:px-6 py-4">
      <div className="flex items-center">
        {getStatusIcon(app.status)}
        <span
          className={`ml-2 px-2 py-1 text-xs rounded-full border ${getStatusColor(
            app.status
          )}`}
        >
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </span>
      </div>
    </td>
    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
      <div className="flex items-center text-sm text-gray-500">
        <DateRange className="mr-2 flex-shrink-0" />
        {app.date}
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4">
      <div className="flex space-x-1 sm:space-x-2">
        <ActionButton
          onClick={() => onStatusChange(app.id, "approved")}
          icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="text-green-600"
          title="Approve"
        />
        <ActionButton
          onClick={() => onEditClick(app)}
          icon={<Edit className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="text-blue-600"
          title="Edit"
        />
        <ActionButton
          onClick={() => onDeleteClick(app.id)}
          icon={<Delete className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="text-red-600"
          title="Delete"
        />
      </div>
    </td>
  </motion.tr>
);

// Action Button Component
const ActionButton = ({ onClick, icon, color = "text-gray-600", title }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`${color} hover:${
      color.includes("green")
        ? "text-green-800"
        : color.includes("blue")
        ? "text-blue-800"
        : color.includes("red")
        ? "text-red-800"
        : "text-gray-800"
    } p-1 sm:p-1.5`}
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
}) => {
  const filterButtons = [
    { value: "all", label: "All", count: applications.length },
    { value: "pending", label: "Pending", count: stats.pending },
    { value: "approved", label: "Approved", count: stats.approved },
    { value: "rejected", label: "Rejected", count: stats.rejected },
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateClick}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              <Add />
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
            />
          ))}
        </div>
      </div>
    </header>
  );
};

const FilterButton = ({ btn, filterStatus, setFilterStatus }) => {
  const getButtonStyle = (value) => {
    if (filterStatus === value) {
      switch (value) {
        case "pending":
          return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "approved":
          return "bg-green-100 text-green-800 border border-green-200";
        case "rejected":
          return "bg-red-100 text-red-800 border border-red-200";
        default:
          return "bg-blue-600 text-white";
      }
    }
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <button
      onClick={() => setFilterStatus(btn.value)}
      className={`px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg font-medium ${getButtonStyle(
        btn.value
      )}`}
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
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [currentPage, setCurrentPage] = useState(1);

  const [stats, setStats] = useState({
    total: 1250,
    pending: 342,
    approved: 768,
    rejected: 140,
    inReview: 85,
  });

  // Modal States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "warning",
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Mock Data
  const mockApplications = [
    {
      id: "VISA-2024-001",
      applicant: "John Smith",
      country: "United States",
      type: "Tourist",
      status: "approved",
      date: "2024-01-15",
      duration: "30 days",
      priority: "Normal",
      amount: "$250",
      documents: 5,
      email: "john.smith@email.com",
      phone: "+1-555-0123",
    },
    {
      id: "VISA-2024-002",
      applicant: "Maria Garcia",
      country: "Spain",
      type: "Business",
      status: "pending",
      date: "2024-01-16",
      duration: "90 days",
      priority: "High",
      amount: "$450",
      documents: 7,
      email: "maria.g@email.com",
      phone: "+34-600-1234",
    },
    {
      id: "VISA-2024-003",
      applicant: "Chen Wei",
      country: "China",
      type: "Student",
      status: "in-review",
      date: "2024-01-14",
      duration: "365 days",
      priority: "Normal",
      amount: "$350",
      documents: 8,
      email: "chen.wei@email.com",
      phone: "+86-138-0011",
    },
    {
      id: "VISA-2024-004",
      applicant: "Ahmed Hassan",
      country: "Egypt",
      type: "Work",
      status: "rejected",
      date: "2024-01-13",
      duration: "180 days",
      priority: "Normal",
      amount: "$500",
      documents: 6,
      email: "ahmed.h@email.com",
      phone: "+20-100-1234",
    },
    // Add more mock data to demonstrate pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `VISA-2024-${String(i + 5).padStart(3, "0")}`,
      applicant: `Applicant ${i + 5}`,
      country: ["France", "Germany", "Japan", "Australia", "Canada"][i % 5],
      type: ["Tourist", "Business", "Student", "Work", "Other"][i % 5],
      status: ["pending", "approved", "rejected", "in-review"][i % 4],
      date: `2024-01-${String(17 + (i % 10)).padStart(2, "0")}`,
      duration: `${[30, 90, 180, 365][i % 4]} days`,
      priority: ["Normal", "High", "Urgent"][i % 3],
      amount: `$${[250, 350, 450, 500][i % 4]}`,
      documents: Math.floor(Math.random() * 10) + 1,
      email: `applicant${i + 5}@email.com`,
      phone: `+${Math.floor(Math.random() * 100)}-${Math.floor(
        Math.random() * 1000
      )}-${Math.floor(Math.random() * 10000)}`,
    })),
  ];

  // Initial Data Fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Reset to first page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setApplications(mockApplications);
      toast.success("Dashboard data loaded successfully");
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const createApplication = async (applicationData) => {
    try {
      const newId = `VISA-${new Date().getFullYear()}-${String(
        applications.length + 1
      ).padStart(3, "0")}`;
      const newApplication = {
        ...applicationData,
        id: newId,
        date: new Date().toISOString().split("T")[0],
        documents: Math.floor(Math.random() * 10) + 1,
      };

      await new Promise((resolve) => setTimeout(resolve, 500));
      setApplications([newApplication, ...applications]);
      setStats((prev) => ({ ...prev, total: prev.total + 1 }));
      setShowApplicationModal(false);
      setCurrentPage(1); // Reset to first page
      toast.success("Application created successfully");
    } catch (error) {
      toast.error("Failed to create application");
    }
  };

  const updateApplication = async (id, updatedData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, ...updatedData } : app
        )
      );
      setShowApplicationModal(false);
      toast.success("Application updated successfully");
    } catch (error) {
      toast.error("Failed to update application");
    }
  };

  const deleteApplication = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApplications(applications.filter((app) => app.id !== id));
      setStats((prev) => ({ ...prev, total: prev.total - 1 }));
      setShowConfirmModal(false);
      // Adjust current page if needed
      const filteredLength = applications.filter((app) => app.id !== id).length;
      const maxPage = Math.ceil(filteredLength / 8);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage || 1);
      }
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, status } : app))
      );
      setStats((prev) => ({ ...prev, [status]: prev[status] + 1 }));
      setShowConfirmModal(false);
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error("Failed to update application status");
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
      message:
        "Are you sure you want to delete this application? This action cannot be undone.",
      onConfirm: () => deleteApplication(id),
    });
    setShowConfirmModal(true);
  };

  const handleStatusChange = (id, status) => {
    setModalConfig({
      type: "warning",
      title: `Change Status to ${status}`,
      message: `Are you sure you want to change the application status to ${status}?`,
      onConfirm: () => updateApplicationStatus(id, status),
    });
    setShowConfirmModal(true);
  };

  const handleSaveApplication = (formData) => {
    if (modalMode === "create") {
      createApplication(formData);
    } else {
      updateApplication(selectedApplication.id, formData);
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="w-full p-2 sm:p-4">
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />

        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          applications={applications}
          stats={stats}
          onCreateClick={handleCreateClick}
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
        />

        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          application={selectedApplication}
          onSave={handleSaveApplication}
          mode={modalMode}
        />
      </div>
    </div>
  );
};
