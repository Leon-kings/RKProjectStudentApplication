// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import {
//   Search as SearchIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Refresh as RefreshIcon,
//   CheckCircle as CheckIcon,
//   Cancel as CancelIcon,
//   Save as SaveIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   School as SchoolIcon,
//   LocationOn as LocationIcon,
//   Close as CloseIcon,
//   Warning as WarningIcon,
//   Info as InfoIcon,
//   Error as ErrorIcon,
//   Book as BookIcon,
//   Flag as FlagIcon,
//   DateRange as DateIcon,
//   Description as DescriptionIcon,
// } from "@mui/icons-material";
// import { Sidebar } from "../../sidebars/Sidebar";

// // Updated API Configuration
// const API_BASE_URL = "https://ruziganodejs.onrender.com";
// const APPLICATIONS_ENDPOINT = `${API_BASE_URL}/admissions/booking`;

// // Create axios instance with proper configuration
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000, // Increased timeout
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Get token from localStorage
//     const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("No auth token found in localStorage");
//     }
    
//     // Log request for debugging
//     console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//     console.log("Request data:", config.data);
    
//     return config;
//   },
//   (error) => {
//     console.error("Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`Response from ${response.config.url}:`, response.data);
//     return response;
//   },
//   (error) => {
//     console.error("Response error:", {
//       message: error.message,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//       url: error.config?.url,
//     });
    
//     // Enhanced error handling
//     if (error.response) {
//       // Server responded with error status
//       switch (error.response.status) {
//         case 400:
//           error.message = "Bad request. Please check your data.";
//           break;
//         case 401:
//           error.message = "Unauthorized. Please login again.";
//           // Redirect to login if needed
//           break;
//         case 403:
//           error.message = "Forbidden. You don't have permission.";
//           break;
//         case 404:
//           error.message = "Endpoint not found.";
//           break;
//         case 500:
//           error.message = "Server error. Please try again later.";
//           break;
//         default:
//           error.message = `Server error (${error.response.status}).`;
//       }
//     } else if (error.request) {
//       // Request made but no response
//       error.message = "Network error. Please check your connection.";
//     } else {
//       // Something else happened
//       error.message = error.message || "Unknown error occurred.";
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Initial form state
// const INITIAL_APPLICATION_FORM = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   nationality: "",
//   currentEducation: "",
//   gpa: "",
//   targetUniversity: "",
//   targetCountry: "",
//   targetProgram: "",
//   scholarshipInterest: "",
//   intakeYear: "",
//   documents: "",
//   essay: "",
//   additionalInfo: "",
//   status: "pending", // Added status field
// };

// // Options arrays
// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "yellow" },
//   { value: "approved", label: "Approved", color: "green" },
//   { value: "rejected", label: "Rejected", color: "red" },
//   { value: "under_review", label: "Under Review", color: "blue" },
// ];

// const COUNTRY_OPTIONS = [
//   "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan",
//   "Singapore", "China", "South Korea", "Netherlands", "Sweden",
//   "Switzerland", "New Zealand", "Rwanda", "Uganda", "Kenya", "Tanzania"
// ];

// const PROGRAM_OPTIONS = [
//   "Computer Science", "Business Administration", "Medicine", "Engineering",
//   "Law", "Psychology", "Architecture", "Art & Design", "Economics",
//   "International Relations", "Environmental Science", "Data Science",
//   "Agriculture", "Education", "Tourism", "Hospitality"
// ];

// const SCHOLARSHIP_TYPES = [
//   "Full Scholarship", "Partial Scholarship", "Merit-based Scholarship",
//   "Need-based Scholarship", "Sports Scholarship", "Research Scholarship",
//   "Government Scholarship", "University Scholarship"
// ];

// const EDUCATION_LEVELS = [
//   "High School", "Associate Degree", "Bachelor's Degree",
//   "Master's Degree", "Doctorate", "Professional Certificate",
//   "Diploma", "Certificate"
// ];

// // Memoized FormField component
// const FormField = React.memo(({
//   label,
//   name,
//   type = "text",
//   required = false,
//   placeholder,
//   value,
//   onChange,
//   error,
//   disabled,
//   children,
//   ...props
// }) => {
//   const inputRef = useRef(null);

//   // Handle input changes with proper event handling
//   const handleChange = (e) => {
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   // Handle blur for validation
//   const handleBlur = (e) => {
//     if (props.onBlur) {
//       props.onBlur(e);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {children || (
//         <input
//           ref={inputRef}
//           type={type}
//           name={name}
//           required={required}
//           value={value || ""}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//             error
//               ? "border-red-500"
//               : "border-gray-300"
//           } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
//           {...props}
//         />
//       )}
//       {error && (
//         <p className="mt-1 text-xs text-red-600 flex items-center">
//           <ErrorIcon className="w-3 h-3 mr-1" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// });

// // Memoized SelectField component
// const SelectField = React.memo(({
//   label,
//   name,
//   required = false,
//   value,
//   onChange,
//   options,
//   error,
//   disabled,
//   placeholder = "Select an option",
// }) => {
//   return (
//     <FormField
//       label={label}
//       name={name}
//       required={required}
//       error={error}
//       disabled={disabled}
//     >
//       <select
//         name={name}
//         required={required}
//         value={value || ""}
//         onChange={onChange}
//         disabled={disabled}
//         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//           error
//             ? "border-red-500"
//             : "border-gray-300"
//         } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </FormField>
//   );
// });

// // Modal components
// const ModalBackdrop = React.memo(({ onClose }) => (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//     onClick={onClose}
//   />
// ));

// const Notification = React.memo(({ notification, setNotification }) => {
//   if (!notification.show) return null;

//   const bgColor = {
//     success: "bg-green-50 border-green-200",
//     error: "bg-red-50 border-red-200",
//     warning: "bg-yellow-50 border-yellow-200",
//     info: "bg-blue-50 border-blue-200",
//   }[notification.type];

//   const textColor = {
//     success: "text-green-800",
//     error: "text-red-800",
//     warning: "text-yellow-800",
//     info: "text-blue-800",
//   }[notification.type];

//   const icon = {
//     success: <CheckIcon className="w-4 h-4 text-green-500" />,
//     error: <ErrorIcon className="w-4 h-4 text-red-500" />,
//     warning: <WarningIcon className="w-4 h-4 text-yellow-500" />,
//     info: <InfoIcon className="w-4 h-4 text-blue-500" />,
//   }[notification.type];

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 p-3 rounded-lg border ${bgColor} shadow-lg max-w-sm`}
//     >
//       <div className="flex items-start">
//         {icon}
//         <div className={`ml-2 flex-1 ${textColor}`}>
//           <p className="text-sm font-medium">{notification.message}</p>
//         </div>
//         <button
//           onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//           className="ml-2 text-gray-400 hover:text-gray-600"
//         >
//           <CloseIcon className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// });

// export const AdmissionManagement = () => {
//   // State management
//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [error, setError] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
//   const [errors, setErrors] = useState({});
  
//   // Use ref to track form data without re-renders
//   const formDataRef = useRef(INITIAL_APPLICATION_FORM);

//   // UI state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({
//     key: "createdAt",
//     direction: "desc",
//   });

//   // Modal states
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openViewDialog, setOpenViewDialog] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);

//   // Notification state
//   const [notification, setNotification] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   // Fetch applications with improved error handling
//   const fetchApplications = useCallback(async () => {
//     try {
//       setFetching(true);
//       setError(null);

//       console.log("Fetching applications from:", APPLICATIONS_ENDPOINT);
      
//       const response = await api.get(APPLICATIONS_ENDPOINT);
      
//       let data = [];
//       if (Array.isArray(response.data)) {
//         data = response.data;
//       } else if (response.data && Array.isArray(response.data.data)) {
//         data = response.data.data;
//       } else if (response.data && response.data.applications) {
//         data = response.data.applications;
//       } else if (response.data) {
//         // Handle case where response.data is the array itself
//         data = response.data;
//       }

//       console.log("Fetched data:", data);

//       if (!Array.isArray(data)) {
//         console.warn("API response is not an array:", typeof data, data);
//         data = [];
//         showNotification("Server returned unexpected data format", "warning");
//       }

//       setApplications(data);
//       setFilteredApplications(data);

//       if (data.length === 0) {
//         showNotification("No applications found", "info");
//       }
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//       setError(err.message || "Failed to load applications");
//       showNotification(err.message || "Failed to load applications", "error");
//     } finally {
//       setFetching(false);
//     }
//   }, []);

//   // Initial fetch
//   useEffect(() => {
//     fetchApplications();
//   }, [fetchApplications]);

//   // Filter and sort applications
//   useEffect(() => {
//     if (!Array.isArray(applications)) {
//       setFilteredApplications([]);
//       return;
//     }

//     let filtered = [...applications];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter((app) => {
//         if (!app) return false;
//         return (
//           (app.firstName?.toLowerCase() || "").includes(term) ||
//           (app.lastName?.toLowerCase() || "").includes(term) ||
//           (app.email?.toLowerCase() || "").includes(term) ||
//           (app.targetUniversity?.toLowerCase() || "").includes(term)
//         );
//       });
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((app) => app?.status === statusFilter);
//     }

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const aValue = a?.[sortConfig.key] || "";
//         const bValue = b?.[sortConfig.key] || "";

//         if (aValue < bValue) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     setFilteredApplications(filtered);
//     setPage(0);
//   }, [applications, searchTerm, statusFilter, sortConfig]);

//   // Handle form input changes
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     // Update ref
//     formDataRef.current = {
//       ...formDataRef.current,
//       [name]: value,
//     };
    
//     // Update state (delayed to prevent cursor jumping)
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   }, [errors]);

//   // Validate form
//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     const data = formDataRef.current;

//     // Required fields validation
//     const requiredFields = [
//       { field: 'firstName', name: 'First Name' },
//       { field: 'lastName', name: 'Last Name' },
//       { field: 'email', name: 'Email' },
//       { field: 'phone', name: 'Phone' },
//       { field: 'gpa', name: 'GPA' },
//       { field: 'targetUniversity', name: 'Target University' },
//       { field: 'targetProgram', name: 'Target Program' },
//     ];

//     requiredFields.forEach(({ field, name }) => {
//       if (!data[field]?.toString().trim()) {
//         newErrors[field] = `${name} is required`;
//       }
//     });

//     // Email format validation
//     if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       newErrors.email = "Invalid email address";
//     }

//     // GPA validation
//     if (data.gpa) {
//       const gpaNum = parseFloat(data.gpa);
//       if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
//         newErrors.gpa = "GPA must be between 0 and 4";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, []);

//   // Prepare data for API
//   const prepareFormData = useCallback(() => {
//     const data = { ...formDataRef.current };
    
//     // Clean up data - remove empty strings
//     Object.keys(data).forEach(key => {
//       if (data[key] === "") {
//         delete data[key];
//       }
//     });

//     // Ensure status is set
//     if (!data.status) {
//       data.status = "pending";
//     }

//     return data;
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showNotification("Please fix the errors in the form", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       const dataToSubmit = prepareFormData();
//       console.log("Submitting data:", dataToSubmit);
//       console.log("Is edit mode:", isEditMode);
//       console.log("Selected app ID:", selectedApplication?.id);

//       let response;
      
//       if (isEditMode && selectedApplication) {
//         // Update existing application
//         console.log("Updating application with ID:", selectedApplication.id);
//         response = await api.put(
//           `${APPLICATIONS_ENDPOINT}/${selectedApplication.id}`,
//           dataToSubmit
//         );
//         console.log("Update response:", response.data);
        
//         // Update local state
//         setApplications(prev =>
//           prev.map(app =>
//             app.id === selectedApplication.id ? response.data : app
//           )
//         );
        
//         showNotification("Application updated successfully!", "success");
//       } else {
//         // Create new application
//         console.log("Creating new application");
//         response = await api.post(APPLICATIONS_ENDPOINT, dataToSubmit);
//         console.log("Create response:", response.data);
        
//         // Update local state
//         setApplications(prev => [response.data, ...prev]);
        
//         showNotification("Application created successfully!", "success");
//       }

//       // Close dialog and reset form
//       handleCloseDialog();
//       resetForm();
      
//       // Refresh the list
//       setTimeout(() => {
//         fetchApplications();
//       }, 500);
      
//     } catch (error) {
//       console.error("Submit error details:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//         config: error.config,
//       });
      
//       let errorMessage = error.message || "An error occurred";
      
//       // Try to extract more specific error from response
//       if (error.response?.data) {
//         const serverError = error.response.data;
//         if (typeof serverError === 'string') {
//           errorMessage = serverError;
//         } else if (serverError.message) {
//           errorMessage = serverError.message;
//         } else if (serverError.error) {
//           errorMessage = serverError.error;
//         }
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete application
//   const handleDelete = async () => {
//     if (!selectedApplication) return;

//     setLoading(true);

//     try {
//       console.log("Deleting application with ID:", selectedApplication.id);
      
//       await api.delete(`${APPLICATIONS_ENDPOINT}/${selectedApplication.id}`);
      
//       // Update local state
//       setApplications(prev =>
//         prev.filter(app => app.id !== selectedApplication.id)
//       );
      
//       showNotification("Application deleted successfully!", "success");
      
//       // Close dialog
//       setOpenDeleteDialog(false);
//       setSelectedApplication(null);
      
//     } catch (error) {
//       console.error("Delete error:", error);
      
//       let errorMessage = error.message || "Failed to delete application";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show notification
//   const showNotification = useCallback((message, type = "success") => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });

//     setTimeout(() => {
//       setNotification(prev => ({ ...prev, show: false }));
//     }, 3000);
//   }, []);

//   // Open edit dialog
//   const handleEdit = (application) => {
//     setSelectedApplication(application);
    
//     // Initialize formDataRef with application data
//     formDataRef.current = {
//       ...INITIAL_APPLICATION_FORM,
//       ...application
//     };
    
//     // Update state
//     setFormData({
//       ...INITIAL_APPLICATION_FORM,
//       ...application
//     });
    
//     setIsEditMode(true);
//     setOpenDialog(true);
//     setErrors({});
//   };

//   // Open view dialog
//   const handleView = (application) => {
//     setSelectedApplication(application);
//     setOpenViewDialog(true);
//   };

//   // Open delete confirmation dialog
//   const handleDeleteClick = (application) => {
//     setSelectedApplication(application);
//     setOpenDeleteDialog(true);
//   };

//   // Open create dialog
//   const handleCreate = () => {
//     resetForm();
//     setIsEditMode(false);
//     setOpenDialog(true);
//   };

//   // Close dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedApplication(null);
//     setIsEditMode(false);
//     resetForm();
//   };

//   // Close view dialog
//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//     setSelectedApplication(null);
//   };

//   // Close delete dialog
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setSelectedApplication(null);
//   };

//   // Reset form
//   const resetForm = () => {
//     formDataRef.current = { ...INITIAL_APPLICATION_FORM };
//     setFormData({ ...INITIAL_APPLICATION_FORM });
//     setErrors({});
//   };

//   // Get status badge
//   const getStatusBadge = (status) => {
//     const statusOption = STATUS_OPTIONS.find((s) => s.value === status);
//     const colorClass = {
//       yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
//       green: "bg-green-100 text-green-800 border-green-300",
//       red: "bg-red-100 text-red-800 border-red-300",
//       blue: "bg-blue-100 text-blue-800 border-blue-300",
//     }[statusOption?.color] || "bg-gray-100 text-gray-800 border-gray-300";

//     return (
//       <span
//         className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}
//       >
//         {statusOption?.label || status || "Unknown"}
//       </span>
//     );
//   };

//   // Calculate statistics
//   const statistics = {
//     total: applications.length || 0,
//     pending: applications.filter((app) => app?.status === "pending").length || 0,
//     approved: applications.filter((app) => app?.status === "approved").length || 0,
//     rejected: applications.filter((app) => app?.status === "rejected").length || 0,
//   };

//   // Pagination
//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

//   // Loading skeleton
//   const LoadingSkeleton = () => (
//     <div className="space-y-3">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="animate-pulse">
//           <div className="h-16 bg-gray-200 rounded"></div>
//         </div>
//       ))}
//     </div>
//   );

//   const toggleNotificationsModal = () => {
//     setShowNotificationsModal(!showNotificationsModal);
//   };

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar onToggleNotifications={toggleNotificationsModal} />
      
//       <div className="flex-1 p-4 md:p-6">
//         <Notification notification={notification} setNotification={setNotification} />

//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Scholarship Management
//           </h1>
//           <p className="text-gray-600">
//             Manage scholarship applications and track applicant progress
//           </p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: "Total Applications", value: statistics.total, color: "blue", icon: BookIcon },
//             { label: "Pending Review", value: statistics.pending, color: "yellow", icon: WarningIcon },
//             { label: "Approved", value: statistics.approved, color: "green", icon: CheckIcon },
//             { label: "Rejected", value: statistics.rejected, color: "red", icon: CancelIcon },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg shadow p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                 </div>
//                 <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Bar */}
//         <div className="bg-white rounded-lg shadow p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search applications..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div className="w-full md:w-48">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="all">All Status</option>
//                 {STATUS_OPTIONS.map((status) => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={fetchApplications}
//                 disabled={fetching}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center"
//               >
//                 <RefreshIcon className="w-5 h-5 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={handleCreate}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
//               >
//                 <AddIcon className="w-5 h-5 mr-2" />
//                 New Application
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Applications Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {fetching ? (
//             <div className="p-6">
//               <LoadingSkeleton />
//             </div>
//           ) : error ? (
//             <div className="p-6 text-center">
//               <ErrorIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <p className="text-gray-700 mb-4">{error}</p>
//               <button
//                 onClick={fetchApplications}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Applicant
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         University
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Program
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Created
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {paginatedApplications.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                           <SchoolIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                           <p className="font-medium">No applications found</p>
//                           <p className="mt-1">Try adjusting your search or filter</p>
//                           <button
//                             onClick={handleCreate}
//                             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                           >
//                             Create New Application
//                           </button>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedApplications.map((app) => (
//                         <tr key={app.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
//                                 {app.firstName?.charAt(0) || '?'}{app.lastName?.charAt(0) || '?'}
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {app.firstName || 'N/A'} {app.lastName || ''}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   {app.email || 'No email'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{app.targetUniversity || 'N/A'}</div>
//                             <div className="text-sm text-gray-500">{app.targetCountry || ''}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{app.targetProgram || 'N/A'}</div>
//                             <div className="text-sm text-gray-500">GPA: {app.gpa || 'N/A'}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {getStatusBadge(app.status)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => handleView(app)}
//                                 className="text-blue-600 hover:text-blue-900"
//                               >
//                                 <ViewIcon className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleEdit(app)}
//                                 className="text-green-600 hover:text-green-900"
//                               >
//                                 <EditIcon className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(app)}
//                                 className="text-red-600 hover:text-red-900"
//                               >
//                                 <DeleteIcon className="w-5 h-5" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {paginatedApplications.length > 0 && (
//                 <div className="px-6 py-4 border-t border-gray-200">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="text-sm text-gray-700">
//                       Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
//                       <span className="font-medium">{Math.min(endIndex, filteredApplications.length)}</span> of{' '}
//                       <span className="font-medium">{filteredApplications.length}</span> applications
//                     </div>
                    
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 0}
//                         className="px-3 py-1 border border-gray-300 rounded text-gray-700 disabled:opacity-50"
//                       >
//                         Previous
//                       </button>
                      
//                       <span className="text-sm text-gray-700">
//                         Page {page + 1} of {totalPages}
//                       </span>
                      
//                       <button
//                         onClick={() => setPage(page + 1)}
//                         disabled={page >= totalPages - 1}
//                         className="px-3 py-1 border border-gray-300 rounded text-gray-700 disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Create/Edit Modal */}
//       {openDialog && (
//         <>
//           <ModalBackdrop onClose={handleCloseDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {isEditMode ? "Edit Application" : "New Application"}
//                 </h2>
//                 <button
//                   onClick={handleCloseDialog}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <CloseIcon className="w-6 h-6" />
//                 </button>
//               </div>
              
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       label="First Name"
//                       name="firstName"
//                       required
//                       placeholder="Enter first name"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       error={errors.firstName}
//                       disabled={loading}
//                     />
                    
//                     <FormField
//                       label="Last Name"
//                       name="lastName"
//                       required
//                       placeholder="Enter last name"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       error={errors.lastName}
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       label="Email Address"
//                       name="email"
//                       type="email"
//                       required
//                       placeholder="Enter email address"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       error={errors.email}
//                       disabled={loading}
//                     />
                    
//                     <FormField
//                       label="Phone Number"
//                       name="phone"
//                       type="tel"
//                       required
//                       placeholder="Enter phone number"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       error={errors.phone}
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <SelectField
//                       label="Nationality"
//                       name="nationality"
//                       value={formData.nationality}
//                       onChange={handleInputChange}
//                       options={COUNTRY_OPTIONS}
//                       placeholder="Select nationality"
//                       disabled={loading}
//                     />
                    
//                     <SelectField
//                       label="Current Education"
//                       name="currentEducation"
//                       value={formData.currentEducation}
//                       onChange={handleInputChange}
//                       options={EDUCATION_LEVELS}
//                       placeholder="Select education level"
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       label="GPA"
//                       name="gpa"
//                       type="number"
//                       step="0.1"
//                       min="0"
//                       max="4"
//                       required
//                       placeholder="Enter GPA (0-4)"
//                       value={formData.gpa}
//                       onChange={handleInputChange}
//                       error={errors.gpa}
//                       disabled={loading}
//                     />
                    
//                     <SelectField
//                       label="Scholarship Interest"
//                       name="scholarshipInterest"
//                       value={formData.scholarshipInterest}
//                       onChange={handleInputChange}
//                       options={SCHOLARSHIP_TYPES}
//                       placeholder="Select scholarship type"
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       label="Target University"
//                       name="targetUniversity"
//                       required
//                       placeholder="Enter target university"
//                       value={formData.targetUniversity}
//                       onChange={handleInputChange}
//                       error={errors.targetUniversity}
//                       disabled={loading}
//                     />
                    
//                     <SelectField
//                       label="Target Country"
//                       name="targetCountry"
//                       value={formData.targetCountry}
//                       onChange={handleInputChange}
//                       options={COUNTRY_OPTIONS}
//                       placeholder="Select target country"
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <SelectField
//                       label="Target Program"
//                       name="targetProgram"
//                       required
//                       value={formData.targetProgram}
//                       onChange={handleInputChange}
//                       options={PROGRAM_OPTIONS}
//                       error={errors.targetProgram}
//                       placeholder="Select program"
//                       disabled={loading}
//                     />
                    
//                     <FormField
//                       label="Intake Year"
//                       name="intakeYear"
//                       placeholder="Enter intake year"
//                       value={formData.intakeYear}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Documents Status
//                       </label>
//                       <select
//                         name="documents"
//                         value={formData.documents}
//                         onChange={handleInputChange}
//                         disabled={loading}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">Select status</option>
//                         <option value="Completed">Completed</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Not Started">Not Started</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Essay Status
//                       </label>
//                       <select
//                         name="essay"
//                         value={formData.essay}
//                         onChange={handleInputChange}
//                         disabled={loading}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">Select status</option>
//                         <option value="Submitted">Submitted</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Not Required">Not Required</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Additional Information
//                     </label>
//                     <textarea
//                       name="additionalInfo"
//                       value={formData.additionalInfo}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                       placeholder="Enter any additional information..."
//                     />
//                   </div>
                  
//                   <div className="pt-4">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                         loading
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//                       } text-white`}
//                     >
//                       {loading ? (
//                         <div className="flex items-center justify-center">
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                           {isEditMode ? 'Updating...' : 'Submitting...'}
//                         </div>
//                       ) : (
//                         <div className="flex items-center justify-center">
//                           <SaveIcon className="w-5 h-5 mr-2" />
//                           {isEditMode ? 'Update Application' : 'Submit Application'}
//                         </div>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Delete Confirmation Modal */}
//       {openDeleteDialog && selectedApplication && (
//         <>
//           <ModalBackdrop onClose={handleCloseDeleteDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
//                   <WarningIcon className="w-6 h-6 text-red-600" />
//                 </div>
                
//                 <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
//                   Delete Application
//                 </h3>
                
//                 <p className="text-gray-600 text-center mb-6">
//                   Are you sure you want to delete the application for{' '}
//                   <span className="font-semibold text-gray-900">
//                     {selectedApplication.firstName} {selectedApplication.lastName}
//                   </span>
//                   ?
//                 </p>
                
//                 <div className="flex space-x-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseDeleteDialog}
//                     disabled={loading}
//                     className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
                  
//                   <button
//                     onClick={handleDelete}
//                     disabled={loading}
//                     className={`flex-1 py-2 rounded-md font-medium ${
//                       loading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-red-600 hover:bg-red-700'
//                     } text-white`}
//                   >
//                     {loading ? 'Deleting...' : 'Delete'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };























// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import {
//   Search as SearchIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Refresh as RefreshIcon,
//   CheckCircle as CheckIcon,
//   Cancel as CancelIcon,
//   Save as SaveIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   School as SchoolIcon,
//   LocationOn as LocationIcon,
//   Close as CloseIcon,
//   Warning as WarningIcon,
//   Info as InfoIcon,
//   Error as ErrorIcon,
//   Book as BookIcon,
//   Flag as FlagIcon,
//   DateRange as DateIcon,
//   Description as DescriptionIcon,
//   Person as PersonIcon,
//   CalendarToday as CalendarIcon,
//   Grade as GradeIcon,
//   Assessment as AssessmentIcon,
//   AttachFile as AttachFileIcon,
//   Payment as PaymentIcon,
//   Timeline as TimelineIcon,
//   Star as StarIcon,
//   Speed as SpeedIcon,
//   Schedule as ScheduleIcon,
//   PriorityHigh as PriorityIcon,
//   School as SchoolIcon2,
//   Work as WorkIcon,
//   Language as LanguageIcon,
//   AccountBalance as AccountBalanceIcon,
//   EmojiEvents as TrophyIcon,
//   MonetizationOn as MoneyIcon,
// } from "@mui/icons-material";
// import { Sidebar } from "../../sidebars/Sidebar";

// // API Configuration
// const API_BASE_URL = "https://ruziganodejs.onrender.com";
// const APPLICATIONS_ENDPOINT = `${API_BASE_URL}/admissions/booking`;

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   // timeout: 500000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") || localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Initial form state matching Mongoose schema
// const INITIAL_APPLICATION_FORM = {
//   // Basic Information
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   nationality: "",
//   dateOfBirth: "",
  
//   // Academic Information
//   currentEducation: "",
//   currentInstitution: "",
//   graduationYear: "",
//   gpa: "",
//   gpaScale: "4.0",
  
//   // Target Information
//   targetUniversity: "",
//   targetCountry: "",
//   targetProgram: "",
//   programLevel: "",
  
//   // Intake Information
//   intakeSeason: "",
//   intakeYear: "",
  
//   // Scholarship Information
//   scholarshipInterest: "None",
//   scholarshipAmount: 0,
  
//   // Test Scores (simplified for form)
//   testScores: {
//     ielts: { overall: "", date: "" },
//     toefl: { score: "", date: "" }
//   },
  
//   // Status Information
//   documents: "pending",
//   essay: "pending",
//   status: "draft",
//   priority: "medium",
  
//   // Additional
//   additionalInfo: "",
// };

// // Options arrays matching schema enums
// const CURRENT_EDUCATION_OPTIONS = [
//   "High School",
//   "Bachelor Degree",
//   "Master Degree",
//   "PhD",
//   "Diploma",
//   "Other"
// ];

// const PROGRAM_LEVEL_OPTIONS = [
//   "Undergraduate",
//   "Graduate",
//   "PhD",
//   "PostDoc",
//   "Certificate"
// ];

// const INTAKE_SEASON_OPTIONS = ["Fall", "Spring", "Summer", "Winter"];

// const SCHOLARSHIP_OPTIONS = [
//   "Research Scholarship",
//   "Merit Scholarship",
//   "Sports Scholarship",
//   "Need-based Scholarship",
//   "Government Scholarship",
//   "University Scholarship",
//   "None"
// ];

// const DOCUMENTS_STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "yellow" },
//   { value: "uploaded", label: "Uploaded", color: "blue" },
//   { value: "verified", label: "Verified", color: "green" },
//   { value: "rejected", label: "Rejected", color: "red" },
//   { value: "missing", label: "Missing", color: "gray" },
// ];

// const ESSAY_STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "yellow" },
//   { value: "submitted", label: "Submitted", color: "blue" },
//   { value: "reviewed", label: "Reviewed", color: "purple" },
//   { value: "accepted", label: "Accepted", color: "green" },
//   { value: "needs_revision", label: "Needs Revision", color: "orange" },
// ];

// const APPLICATION_STATUS_OPTIONS = [
//   { value: "draft", label: "Draft", color: "gray" },
//   { value: "submitted", label: "Submitted", color: "blue" },
//   { value: "under_review", label: "Under Review", color: "yellow" },
//   { value: "interview_scheduled", label: "Interview Scheduled", color: "purple" },
//   { value: "accepted", label: "Accepted", color: "green" },
//   { value: "waitlisted", label: "Waitlisted", color: "orange" },
//   { value: "rejected", label: "Rejected", color: "red" },
//   { value: "withdrawn", label: "Withdrawn", color: "gray" },
//   { value: "deferred", label: "Deferred", color: "indigo" },
// ];

// const PRIORITY_OPTIONS = [
//   { value: "low", label: "Low", color: "green" },
//   { value: "medium", label: "Medium", color: "yellow" },
//   { value: "high", label: "High", color: "orange" },
//   { value: "urgent", label: "Urgent", color: "red" },
// ];

// const GPA_SCALE_OPTIONS = ["4.0", "5.0", "100%", "Other"];

// const COUNTRY_OPTIONS = [
//   "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan",
//   "Singapore", "China", "South Korea", "Netherlands", "Sweden",
//   "Switzerland", "New Zealand", "Rwanda", "Uganda", "Kenya", "Tanzania",
//   "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "India",
//   "Pakistan", "Bangladesh", "Sri Lanka", "Malaysia", "Indonesia"
// ];

// const PROGRAM_OPTIONS = [
//   "Computer Science", "Business Administration", "Medicine", "Engineering",
//   "Law", "Psychology", "Architecture", "Art & Design", "Economics",
//   "International Relations", "Environmental Science", "Data Science",
//   "Artificial Intelligence", "Cybersecurity", "Biotechnology",
//   "Public Health", "Education", "Journalism", "Hospitality Management"
// ];

// // Memoized FormField component
// const FormField = React.memo(({
//   label,
//   name,
//   type = "text",
//   required = false,
//   placeholder,
//   value,
//   onChange,
//   error,
//   disabled,
//   children,
//   ...props
// }) => {
//   const inputRef = useRef(null);

//   // Use defaultValue to prevent cursor jumping
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.value = value || "";
//     }
//   }, [value]);

//   const handleChange = (e) => {
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {children || (
//         <input
//           ref={inputRef}
//           type={type}
//           name={name}
//           required={required}
//           defaultValue={value || ""}
//           onChange={handleChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//             error
//               ? "border-red-500 bg-red-50"
//               : "border-gray-300 hover:border-gray-400"
//           } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
//           {...props}
//         />
//       )}
//       {error && (
//         <p className="mt-1 text-xs text-red-600 flex items-center">
//           <ErrorIcon className="w-3 h-3 mr-1" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// });

// // Memoized SelectField component
// const SelectField = React.memo(({
//   label,
//   name,
//   required = false,
//   value,
//   onChange,
//   options,
//   error,
//   disabled,
//   placeholder = "Select...",
//   showColor = false
// }) => {
//   const selectRef = useRef(null);

//   useEffect(() => {
//     if (selectRef.current) {
//       selectRef.current.value = value || "";
//     }
//   }, [value]);

//   const getColorClass = (optionValue) => {
//     if (!showColor) return "";
//     const allOptions = [...DOCUMENTS_STATUS_OPTIONS, ...ESSAY_STATUS_OPTIONS, ...APPLICATION_STATUS_OPTIONS, ...PRIORITY_OPTIONS];
//     const option = allOptions.find(opt => opt.value === optionValue);
//     if (!option) return "";
//     return `text-${option.color}-700 bg-${option.color}-50 border-${option.color}-200`;
//   };

//   return (
//     <FormField
//       label={label}
//       name={name}
//       required={required}
//       error={error}
//       disabled={disabled}
//     >
//       <select
//         ref={selectRef}
//         name={name}
//         required={required}
//         defaultValue={value || ""}
//         onChange={onChange}
//         disabled={disabled}
//         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//           error
//             ? "border-red-500 bg-red-50"
//             : "border-gray-300 hover:border-gray-400"
//         } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${
//           showColor ? getColorClass(value) : ""
//         }`}
//       >
//         <option value="">{placeholder}</option>
//         {Array.isArray(options[0]) || typeof options[0] === 'string' ? (
//           options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))
//         ) : (
//           options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))
//         )}
//       </select>
//     </FormField>
//   );
// });

// // Modal components
// const ModalBackdrop = React.memo(({ onClose }) => (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//     onClick={onClose}
//   />
// ));

// const Notification = React.memo(({ notification, setNotification }) => {
//   if (!notification.show) return null;

//   const bgColor = {
//     success: "bg-emerald-50 border-emerald-200",
//     error: "bg-rose-50 border-rose-200",
//     warning: "bg-amber-50 border-amber-200",
//     info: "bg-sky-50 border-sky-200",
//   }[notification.type];

//   const textColor = {
//     success: "text-emerald-800",
//     error: "text-rose-800",
//     warning: "text-amber-800",
//     info: "text-sky-800",
//   }[notification.type];

//   const icon = {
//     success: <CheckIcon className="w-5 h-5 text-emerald-500" />,
//     error: <ErrorIcon className="w-5 h-5 text-rose-500" />,
//     warning: <WarningIcon className="w-5 h-5 text-amber-500" />,
//     info: <InfoIcon className="w-5 h-5 text-sky-500" />,
//   }[notification.type];

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 p-3 rounded-lg border ${bgColor} shadow-lg max-w-sm animate-fade-in`}
//     >
//       <div className="flex items-start">
//         {icon}
//         <div className={`ml-2 flex-1 ${textColor}`}>
//           <p className="text-sm font-medium">{notification.message}</p>
//         </div>
//         <button
//           onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//           className="ml-2 text-gray-400 hover:text-gray-600"
//         >
//           <CloseIcon className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// });

// // Status Badge component with colors
// const StatusBadge = React.memo(({ status, type = "application" }) => {
//   const getStatusConfig = () => {
//     if (type === "documents") {
//       return DOCUMENTS_STATUS_OPTIONS.find(s => s.value === status);
//     } else if (type === "essay") {
//       return ESSAY_STATUS_OPTIONS.find(s => s.value === status);
//     } else if (type === "priority") {
//       return PRIORITY_OPTIONS.find(s => s.value === status);
//     }
//     return APPLICATION_STATUS_OPTIONS.find(s => s.value === status);
//   };

//   const config = getStatusConfig();
//   if (!config) return null;

//   const colorClasses = {
//     gray: "bg-gray-100 text-gray-800 border-gray-300",
//     yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
//     blue: "bg-blue-100 text-blue-800 border-blue-300",
//     green: "bg-emerald-100 text-emerald-800 border-emerald-300",
//     red: "bg-rose-100 text-rose-800 border-rose-300",
//     orange: "bg-amber-100 text-amber-800 border-amber-300",
//     purple: "bg-purple-100 text-purple-800 border-purple-300",
//     indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
//   };

//   return (
//     <span
//       className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClasses[config.color] || colorClasses.gray}`}
//     >
//       {config.label}
//     </span>
//   );
// });

// export const AdmissionManagement = () => {
//   // State management
//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [error, setError] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
//   const [errors, setErrors] = useState({});
  
//   // Use ref to track form data
//   const formDataRef = useRef(INITIAL_APPLICATION_FORM);

//   // UI state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({
//     key: "createdAt",
//     direction: "desc",
//   });

//   // Modal states
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openViewDialog, setOpenViewDialog] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);

//   // Notification state
//   const [notification, setNotification] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   // Fetch applications
//   const fetchApplications = useCallback(async () => {
//     try {
//       setFetching(true);
//       setError(null);

//       const response = await api.get(APPLICATIONS_ENDPOINT);
      
//       let data = [];
//       if (Array.isArray(response.data)) {
//         data = response.data;
//       } else if (response.data && Array.isArray(response.data.data)) {
//         data = response.data.data;
//       } else if (response.data && response.data.applications) {
//         data = response.data.applications;
//       } else if (response.data) {
//         data = response.data;
//       }

//       if (!Array.isArray(data)) {
//         console.warn("API response is not an array:", data);
//         data = [];
//         showNotification("Server returned unexpected data format", "warning");
//       }

//       setApplications(data);
//       setFilteredApplications(data);

//       if (data.length === 0) {
//         showNotification("No applications found", "info");
//       }
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//       setError(err.message || "Failed to load applications");
//       showNotification(err.message || "Failed to load applications", "error");
//     } finally {
//       setFetching(false);
//     }
//   }, []);

//   // Initial fetch
//   useEffect(() => {
//     fetchApplications();
//   }, [fetchApplications]);

//   // Filter and sort applications
//   useEffect(() => {
//     if (!Array.isArray(applications)) {
//       setFilteredApplications([]);
//       return;
//     }

//     let filtered = [...applications];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter((app) => {
//         if (!app) return false;
//         return (
//           (app.firstName?.toLowerCase() || "").includes(term) ||
//           (app.lastName?.toLowerCase() || "").includes(term) ||
//           (app.email?.toLowerCase() || "").includes(term) ||
//           (app.targetUniversity?.toLowerCase() || "").includes(term) ||
//           (app.applicationId?.toLowerCase() || "").includes(term)
//         );
//       });
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((app) => app?.status === statusFilter);
//     }

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const aValue = a?.[sortConfig.key] || "";
//         const bValue = b?.[sortConfig.key] || "";

//         if (aValue < bValue) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     setFilteredApplications(filtered);
//     setPage(0);
//   }, [applications, searchTerm, statusFilter, sortConfig]);

//   // Handle form input changes
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     // Handle nested fields (testScores)
//     if (name.startsWith('testScores.')) {
//       const [parent, child, subchild] = name.split('.');
//       formDataRef.current = {
//         ...formDataRef.current,
//         [parent]: {
//           ...formDataRef.current[parent],
//           [child]: subchild 
//             ? {
//                 ...formDataRef.current[parent]?.[child],
//                 [subchild]: value
//               }
//             : value
//         }
//       };
//     } else {
//       formDataRef.current = {
//         ...formDataRef.current,
//         [name]: value,
//       };
//     }
    
//     // Update state
//     setFormData(prev => {
//       if (name.startsWith('testScores.')) {
//         const [parent, child, subchild] = name.split('.');
//         return {
//           ...prev,
//           [parent]: {
//             ...prev[parent],
//             [child]: subchild 
//               ? {
//                   ...prev[parent]?.[child],
//                   [subchild]: value
//                 }
//               : value
//           }
//         };
//       }
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   }, [errors]);

//   // Validate form
//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     const data = formDataRef.current;

//     // Required fields validation
//     const requiredFields = [
//       { field: 'firstName', name: 'First Name' },
//       { field: 'lastName', name: 'Last Name' },
//       { field: 'email', name: 'Email' },
//       { field: 'phone', name: 'Phone' },
//       { field: 'nationality', name: 'Nationality' },
//       { field: 'dateOfBirth', name: 'Date of Birth' },
//       { field: 'currentEducation', name: 'Current Education' },
//       { field: 'currentInstitution', name: 'Current Institution' },
//       { field: 'gpa', name: 'GPA' },
//       { field: 'targetUniversity', name: 'Target University' },
//       { field: 'targetCountry', name: 'Target Country' },
//       { field: 'targetProgram', name: 'Target Program' },
//       { field: 'programLevel', name: 'Program Level' },
//       { field: 'intakeSeason', name: 'Intake Season' },
//       { field: 'intakeYear', name: 'Intake Year' },
//     ];

//     requiredFields.forEach(({ field, name }) => {
//       if (!data[field]?.toString().trim()) {
//         newErrors[field] = `${name} is required`;
//       }
//     });

//     // Email format validation
//     if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       newErrors.email = "Invalid email address";
//     }

//     // GPA validation
//     if (data.gpa) {
//       const gpaNum = parseFloat(data.gpa);
//       if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
//         newErrors.gpa = "GPA must be between 0 and 4";
//       }
//     }

//     // Year validation
//     if (data.intakeYear) {
//       const year = parseInt(data.intakeYear);
//       const currentYear = new Date().getFullYear();
//       if (isNaN(year) || year < currentYear || year > currentYear + 5) {
//         newErrors.intakeYear = `Intake year must be between ${currentYear} and ${currentYear + 5}`;
//       }
//     }

//     if (data.graduationYear) {
//       const year = parseInt(data.graduationYear);
//       if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 5) {
//         newErrors.graduationYear = "Invalid graduation year";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, []);

//   // Prepare data for API
//   const prepareFormData = useCallback(() => {
//     const data = { ...formDataRef.current };
    
//     // Convert string numbers to actual numbers
//     if (data.gpa) data.gpa = parseFloat(data.gpa);
//     if (data.intakeYear) data.intakeYear = parseInt(data.intakeYear);
//     if (data.graduationYear) data.graduationYear = parseInt(data.graduationYear);
//     if (data.scholarshipAmount) data.scholarshipAmount = parseFloat(data.scholarshipAmount);
    
//     // Convert date strings to Date objects
//     if (data.dateOfBirth) {
//       data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
//     }
    
//     // Clean up test scores
//     if (data.testScores) {
//       Object.keys(data.testScores).forEach(test => {
//         if (data.testScores[test]) {
//           Object.keys(data.testScores[test]).forEach(key => {
//             if (data.testScores[test][key]) {
//               // Convert score strings to numbers
//               if (['overall', 'score', 'verbal', 'quant', 'writing', 'listening', 'reading', 'speaking'].includes(key)) {
//                 data.testScores[test][key] = parseFloat(data.testScores[test][key]);
//               }
//               // Convert date strings to Date objects
//               if (key === 'date' && data.testScores[test][key]) {
//                 data.testScores[test][key] = new Date(data.testScores[test][key]).toISOString();
//               }
//             }
//           });
//         }
//       });
//     }
    
//     // Remove empty strings and null values
//     const cleanData = {};
//     Object.keys(data).forEach(key => {
//       if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
//         if (typeof data[key] === 'object') {
//           // Check if object has any values
//           const hasValues = Object.values(data[key]).some(val => 
//             val !== "" && val !== null && val !== undefined
//           );
//           if (hasValues) {
//             cleanData[key] = data[key];
//           }
//         } else {
//           cleanData[key] = data[key];
//         }
//       }
//     });

//     return cleanData;
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showNotification("Please fix the errors in the form", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       const dataToSubmit = prepareFormData();
//       console.log("Submitting data:", dataToSubmit);

//       let response;
      
//       if (isEditMode && selectedApplication) {
//         // Update existing application
//         response = await api.put(
//           `${APPLICATIONS_ENDPOINT}/${selectedApplication._id || selectedApplication.id}`,
//           dataToSubmit
//         );
        
//         setApplications(prev =>
//           prev.map(app =>
//             (app._id === selectedApplication._id || app.id === selectedApplication.id) 
//               ? response.data 
//               : app
//           )
//         );
        
//         showNotification("Application updated successfully!", "success");
//       } else {
//         // Create new application
//         response = await api.post(APPLICATIONS_ENDPOINT, dataToSubmit);
        
//         setApplications(prev => [response.data, ...prev]);
        
//         showNotification("Application created successfully!", "success");
//       }

//       // Close dialog and reset form
//       handleCloseDialog();
//       resetForm();
      
//       // Refresh the list
//       setTimeout(() => {
//         fetchApplications();
//       }, 500);
      
//     } catch (error) {
//       console.error("Submit error:", error);
      
//       let errorMessage = error.message || "An error occurred";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete application
//   const handleDelete = async () => {
//     if (!selectedApplication) return;

//     setLoading(true);

//     try {
//       await api.delete(`${APPLICATIONS_ENDPOINT}/${selectedApplication._id || selectedApplication.id}`);
      
//       setApplications(prev =>
//         prev.filter(app => (app._id !== selectedApplication._id && app.id !== selectedApplication.id))
//       );
      
//       showNotification("Application deleted successfully!", "success");
      
//       // Close dialog
//       setOpenDeleteDialog(false);
//       setSelectedApplication(null);
      
//     } catch (error) {
//       console.error("Delete error:", error);
      
//       let errorMessage = error.message || "Failed to delete application";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show notification
//   const showNotification = useCallback((message, type = "success") => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });

//     setTimeout(() => {
//       setNotification(prev => ({ ...prev, show: false }));
//     }, 3000);
//   }, []);

//   // Open edit dialog
//   const handleEdit = (application) => {
//     setSelectedApplication(application);
    
//     // Format data for form
//     const formData = {
//       ...INITIAL_APPLICATION_FORM,
//       ...application,
//       dateOfBirth: application.dateOfBirth ? application.dateOfBirth.split('T')[0] : "",
//       testScores: {
//         ielts: {
//           overall: application.testScores?.ielts?.overall || "",
//           date: application.testScores?.ielts?.date ? application.testScores.ielts.date.split('T')[0] : ""
//         },
//         toefl: {
//           score: application.testScores?.toefl?.score || "",
//           date: application.testScores?.toefl?.date ? application.testScores.toefl.date.split('T')[0] : ""
//         }
//       }
//     };
    
//     formDataRef.current = formData;
//     setFormData(formData);
    
//     setIsEditMode(true);
//     setOpenDialog(true);
//     setErrors({});
//   };

//   // Open view dialog
//   const handleView = (application) => {
//     setSelectedApplication(application);
//     setOpenViewDialog(true);
//   };

//   // Open delete confirmation dialog
//   const handleDeleteClick = (application) => {
//     setSelectedApplication(application);
//     setOpenDeleteDialog(true);
//   };

//   // Open create dialog
//   const handleCreate = () => {
//     resetForm();
//     setIsEditMode(false);
//     setOpenDialog(true);
//   };

//   // Close dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedApplication(null);
//     setIsEditMode(false);
//     resetForm();
//   };

//   // Close view dialog
//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//     setSelectedApplication(null);
//   };

//   // Close delete dialog
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setSelectedApplication(null);
//   };

//   // Reset form
//   const resetForm = () => {
//     formDataRef.current = { ...INITIAL_APPLICATION_FORM };
//     setFormData({ ...INITIAL_APPLICATION_FORM });
//     setErrors({});
//   };

//   // Calculate statistics
//   const statistics = {
//     total: applications.length || 0,
//     draft: applications.filter((app) => app?.status === "draft").length || 0,
//     submitted: applications.filter((app) => app?.status === "submitted").length || 0,
//     under_review: applications.filter((app) => app?.status === "under_review").length || 0,
//     accepted: applications.filter((app) => app?.status === "accepted").length || 0,
//     rejected: applications.filter((app) => app?.status === "rejected").length || 0,
//   };

//   // Pagination
//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

//   // Loading skeleton
//   const LoadingSkeleton = () => (
//     <div className="space-y-3">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="animate-pulse">
//           <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
//         </div>
//       ))}
//     </div>
//   );

//   const toggleNotificationsModal = () => {
//     setShowNotificationsModal(!showNotificationsModal);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Calculate age from date of birth
//   const calculateAge = (dateOfBirth) => {
//     if (!dateOfBirth) return 'N/A';
//     const birthDate = new Date(dateOfBirth);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Sidebar onToggleNotifications={toggleNotificationsModal} />
      
//       <div className="flex-1 p-4 md:p-6">
//         <Notification notification={notification} setNotification={setNotification} />

//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Admission Management
//           </h1>
//           <p className="text-gray-600">
//             Manage admission applications and track student progress
//           </p>
//         </div>

//         {/* Statistics Cards with Colors */}
//         <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Total</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.total}</p>
//               </div>
//               <BookIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Draft</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.draft}</p>
//               </div>
//               <DescriptionIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Submitted</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.submitted}</p>
//               </div>
//               <AttachFileIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Review</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.under_review}</p>
//               </div>
//               <AssessmentIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Accepted</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.accepted}</p>
//               </div>
//               <CheckIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-4 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium opacity-90">Rejected</p>
//                 <p className="text-xl md:text-2xl font-bold mt-1">{statistics.rejected}</p>
//               </div>
//               <CancelIcon className="w-8 h-8 opacity-80" />
//             </div>
//           </div>
//         </div>

//         {/* Action Bar */}
//         <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, university, or application ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div className="w-full md:w-48">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="all">All Status</option>
//                 {APPLICATION_STATUS_OPTIONS.map((status) => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={fetchApplications}
//                 disabled={fetching}
//                 className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center transition-colors"
//               >
//                 <RefreshIcon className="w-5 h-5 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={handleCreate}
//                 className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center transition-all shadow-md hover:shadow-lg"
//               >
//                 <AddIcon className="w-5 h-5 mr-2" />
//                 New Application
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Applications Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
//           {fetching ? (
//             <div className="p-6">
//               <LoadingSkeleton />
//             </div>
//           ) : error ? (
//             <div className="p-8 text-center">
//               <ErrorIcon className="w-16 h-16 text-rose-500 mx-auto mb-4" />
//               <p className="text-gray-700 mb-4">{error}</p>
//               <button
//                 onClick={fetchApplications}
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
//               >
//                 Retry Loading
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Applicant
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         University
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Program
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Priority
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Created
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {paginatedApplications.length === 0 ? (
//                       <tr>
//                         <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                           <SchoolIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                           <p className="text-lg font-medium text-gray-700">No applications found</p>
//                           <p className="mt-1 text-gray-500">
//                             {searchTerm || statusFilter !== "all"
//                               ? "Try adjusting your search or filter criteria"
//                               : "Start by creating a new application"}
//                           </p>
//                           <button
//                             onClick={handleCreate}
//                             className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
//                           >
//                             Create New Application
//                           </button>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedApplications.map((app) => (
//                         <tr key={app._id || app.id} className="hover:bg-gray-50 transition-colors">
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                                 {app.firstName?.charAt(0) || '?'}{app.lastName?.charAt(0) || '?'}
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {app.firstName || 'N/A'} {app.lastName || ''}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {app.email || 'No email'}
//                                 </div>
//                                 <div className="text-xs text-gray-400 mt-1">
//                                   ID: {app.applicationId || 'N/A'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">{app.targetUniversity || 'N/A'}</div>
//                             <div className="text-xs text-gray-500 flex items-center mt-1">
//                               <LocationIcon className="w-3 h-3 mr-1" />
//                               {app.targetCountry || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">{app.targetProgram || 'N/A'}</div>
//                             <div className="text-xs text-gray-500">
//                               {app.programLevel || 'N/A'} • GPA: {app.gpa || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <StatusBadge status={app.status} type="application" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <StatusBadge status={app.priority} type="priority" />
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {formatDate(app.createdAt)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => handleView(app)}
//                                 className="text-sky-600 hover:text-sky-900 hover:bg-sky-50 p-1.5 rounded transition-colors"
//                                 title="View Details"
//                               >
//                                 <ViewIcon className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleEdit(app)}
//                                 className="text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 p-1.5 rounded transition-colors"
//                                 title="Edit"
//                               >
//                                 <EditIcon className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(app)}
//                                 className="text-rose-600 hover:text-rose-900 hover:bg-rose-50 p-1.5 rounded transition-colors"
//                                 title="Delete"
//                               >
//                                 <DeleteIcon className="w-5 h-5" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {paginatedApplications.length > 0 && (
//                 <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="text-sm text-gray-700">
//                       Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
//                       <span className="font-medium">{Math.min(endIndex, filteredApplications.length)}</span> of{' '}
//                       <span className="font-medium">{filteredApplications.length}</span> applications
//                     </div>
                    
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 0}
//                         className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         Previous
//                       </button>
                      
//                       <span className="text-sm text-gray-700 px-2">
//                         Page {page + 1} of {totalPages}
//                       </span>
                      
//                       <button
//                         onClick={() => setPage(page + 1)}
//                         disabled={page >= totalPages - 1}
//                         className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Create/Edit Modal */}
//       {openDialog && (
//         <>
//           <ModalBackdrop onClose={handleCloseDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {isEditMode ? "Edit Admission Application" : "New Admission Application"}
//                 </h2>
//                 <button
//                   onClick={handleCloseDialog}
//                   className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded transition-colors"
//                 >
//                   <CloseIcon className="w-6 h-6" />
//                 </button>
//               </div>
              
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Section 1: Basic Information */}
//                   <div className="border-b border-gray-200 pb-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                       <PersonIcon className="w-5 h-5 text-blue-600 mr-2" />
//                       Basic Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <FormField
//                         label="First Name"
//                         name="firstName"
//                         required
//                         placeholder="John"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         error={errors.firstName}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Last Name"
//                         name="lastName"
//                         required
//                         placeholder="Doe"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         error={errors.lastName}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Email Address"
//                         name="email"
//                         type="email"
//                         required
//                         placeholder="john@example.com"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         error={errors.email}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Phone Number"
//                         name="phone"
//                         type="tel"
//                         required
//                         placeholder="+1234567890"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         error={errors.phone}
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                       <SelectField
//                         label="Nationality"
//                         name="nationality"
//                         required
//                         value={formData.nationality}
//                         onChange={handleInputChange}
//                         options={COUNTRY_OPTIONS}
//                         error={errors.nationality}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Date of Birth"
//                         name="dateOfBirth"
//                         type="date"
//                         required
//                         value={formData.dateOfBirth}
//                         onChange={handleInputChange}
//                         error={errors.dateOfBirth}
//                         disabled={loading}
//                       />
//                     </div>
//                   </div>

//                   {/* Section 2: Academic Information */}
//                   <div className="border-b border-gray-200 pb-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                       <SchoolIcon className="w-5 h-5 text-emerald-600 mr-2" />
//                       Academic Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <SelectField
//                         label="Current Education"
//                         name="currentEducation"
//                         required
//                         value={formData.currentEducation}
//                         onChange={handleInputChange}
//                         options={CURRENT_EDUCATION_OPTIONS}
//                         error={errors.currentEducation}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Current Institution"
//                         name="currentInstitution"
//                         required
//                         placeholder="University Name"
//                         value={formData.currentInstitution}
//                         onChange={handleInputChange}
//                         error={errors.currentInstitution}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Graduation Year"
//                         name="graduationYear"
//                         type="number"
//                         placeholder="2024"
//                         value={formData.graduationYear}
//                         onChange={handleInputChange}
//                         error={errors.graduationYear}
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                       <FormField
//                         label="GPA"
//                         name="gpa"
//                         type="number"
//                         step="0.01"
//                         min="0"
//                         max="4"
//                         required
//                         placeholder="3.5"
//                         value={formData.gpa}
//                         onChange={handleInputChange}
//                         error={errors.gpa}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="GPA Scale"
//                         name="gpaScale"
//                         value={formData.gpaScale}
//                         onChange={handleInputChange}
//                         options={GPA_SCALE_OPTIONS}
//                         disabled={loading}
//                       />
//                     </div>
//                   </div>

//                   {/* Section 3: Target Information */}
//                   <div className="border-b border-gray-200 pb-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                       <AccountBalanceIcon className="w-5 h-5 text-purple-600 mr-2" />
//                       Target Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <FormField
//                         label="Target University"
//                         name="targetUniversity"
//                         required
//                         placeholder="University Name"
//                         value={formData.targetUniversity}
//                         onChange={handleInputChange}
//                         error={errors.targetUniversity}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Target Country"
//                         name="targetCountry"
//                         required
//                         value={formData.targetCountry}
//                         onChange={handleInputChange}
//                         options={COUNTRY_OPTIONS}
//                         error={errors.targetCountry}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Target Program"
//                         name="targetProgram"
//                         required
//                         value={formData.targetProgram}
//                         onChange={handleInputChange}
//                         options={PROGRAM_OPTIONS}
//                         error={errors.targetProgram}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Program Level"
//                         name="programLevel"
//                         required
//                         value={formData.programLevel}
//                         onChange={handleInputChange}
//                         options={PROGRAM_LEVEL_OPTIONS}
//                         error={errors.programLevel}
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                       <SelectField
//                         label="Intake Season"
//                         name="intakeSeason"
//                         required
//                         value={formData.intakeSeason}
//                         onChange={handleInputChange}
//                         options={INTAKE_SEASON_OPTIONS}
//                         error={errors.intakeSeason}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Intake Year"
//                         name="intakeYear"
//                         type="number"
//                         required
//                         placeholder="2024"
//                         value={formData.intakeYear}
//                         onChange={handleInputChange}
//                         error={errors.intakeYear}
//                         disabled={loading}
//                       />
//                     </div>
//                   </div>

//                   {/* Section 4: Scholarship & Test Scores */}
//                   <div className="border-b border-gray-200 pb-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                       <TrophyIcon className="w-5 h-5 text-amber-600 mr-2" />
//                       Scholarship & Test Scores
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <SelectField
//                         label="Scholarship Interest"
//                         name="scholarshipInterest"
//                         value={formData.scholarshipInterest}
//                         onChange={handleInputChange}
//                         options={SCHOLARSHIP_OPTIONS}
//                         disabled={loading}
//                       />
                      
//                       <FormField
//                         label="Scholarship Amount ($)"
//                         name="scholarshipAmount"
//                         type="number"
//                         placeholder="0"
//                         value={formData.scholarshipAmount}
//                         onChange={handleInputChange}
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <div>
//                         <h4 className="text-sm font-medium text-gray-700 mb-2">IELTS Scores</h4>
//                         <div className="grid grid-cols-2 gap-2">
//                           <FormField
//                             label="Overall Score"
//                             name="testScores.ielts.overall"
//                             type="number"
//                             step="0.5"
//                             min="0"
//                             max="9"
//                             placeholder="7.5"
//                             value={formData.testScores.ielts.overall}
//                             onChange={handleInputChange}
//                             disabled={loading}
//                           />
//                           <FormField
//                             label="Test Date"
//                             name="testScores.ielts.date"
//                             type="date"
//                             value={formData.testScores.ielts.date}
//                             onChange={handleInputChange}
//                             disabled={loading}
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h4 className="text-sm font-medium text-gray-700 mb-2">TOEFL Scores</h4>
//                         <div className="grid grid-cols-2 gap-2">
//                           <FormField
//                             label="Total Score"
//                             name="testScores.toefl.score"
//                             type="number"
//                             min="0"
//                             max="120"
//                             placeholder="100"
//                             value={formData.testScores.toefl.score}
//                             onChange={handleInputChange}
//                             disabled={loading}
//                           />
//                           <FormField
//                             label="Test Date"
//                             name="testScores.toefl.date"
//                             type="date"
//                             value={formData.testScores.toefl.date}
//                             onChange={handleInputChange}
//                             disabled={loading}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Section 5: Status & Additional Info */}
//                   <div className="border-b border-gray-200 pb-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                       <AssessmentIcon className="w-5 h-5 text-indigo-600 mr-2" />
//                       Status & Additional Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <SelectField
//                         label="Application Status"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleInputChange}
//                         options={APPLICATION_STATUS_OPTIONS}
//                         showColor={true}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Documents Status"
//                         name="documents"
//                         value={formData.documents}
//                         onChange={handleInputChange}
//                         options={DOCUMENTS_STATUS_OPTIONS}
//                         showColor={true}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Essay Status"
//                         name="essay"
//                         value={formData.essay}
//                         onChange={handleInputChange}
//                         options={ESSAY_STATUS_OPTIONS}
//                         showColor={true}
//                         disabled={loading}
//                       />
                      
//                       <SelectField
//                         label="Priority"
//                         name="priority"
//                         value={formData.priority}
//                         onChange={handleInputChange}
//                         options={PRIORITY_OPTIONS}
//                         showColor={true}
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Additional Information
//                       </label>
//                       <textarea
//                         name="additionalInfo"
//                         value={formData.additionalInfo}
//                         onChange={handleInputChange}
//                         disabled={loading}
//                         rows={3}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                         placeholder="Any additional notes or information..."
//                       />
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-4">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
//                         loading
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-md hover:shadow-lg'
//                       } text-white`}
//                     >
//                       {loading ? (
//                         <div className="flex items-center justify-center">
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                           {isEditMode ? 'Updating...' : 'Submitting...'}
//                         </div>
//                       ) : (
//                         <div className="flex items-center justify-center">
//                           <SaveIcon className="w-5 h-5 mr-2" />
//                           {isEditMode ? 'Update Application' : 'Submit Application'}
//                         </div>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Delete Confirmation Modal */}
//       {openDeleteDialog && selectedApplication && (
//         <>
//           <ModalBackdrop onClose={handleCloseDeleteDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full mx-auto mb-4">
//                   <WarningIcon className="w-6 h-6 text-rose-600" />
//                 </div>
                
//                 <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
//                   Delete Application
//                 </h3>
                
//                 <p className="text-gray-600 text-center mb-6">
//                   Are you sure you want to delete the application for{' '}
//                   <span className="font-semibold text-gray-900">
//                     {selectedApplication.firstName} {selectedApplication.lastName}
//                   </span>
//                   ? This action cannot be undone.
//                 </p>
                
//                 <div className="flex space-x-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseDeleteDialog}
//                     disabled={loading}
//                     className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
                  
//                   <button
//                     onClick={handleDelete}
//                     disabled={loading}
//                     className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
//                       loading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-md hover:shadow-lg'
//                     } text-white`}
//                   >
//                     {loading ? (
//                       <div className="flex items-center justify-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Deleting...
//                       </div>
//                     ) : (
//                       'Delete'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };























































/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
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
  Book as BookIcon,
  Flag as FlagIcon,
  DateRange as DateIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Grade as GradeIcon,
  Assessment as AssessmentIcon,
  AttachFile as AttachFileIcon,
  Payment as PaymentIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  Speed as SpeedIcon,
  Schedule as ScheduleIcon,
  PriorityHigh as PriorityIcon,
  EmojiEvents as TrophyIcon,
  MonetizationOn as MoneyIcon,
  AccountBalance,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com";
const APPLICATIONS_ENDPOINT = `${API_BASE_URL}/admissions/booking`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response ${response.status}:`, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Initial form state matching Mongoose schema exactly
const INITIAL_APPLICATION_FORM = {
  // Basic Information (required)
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "USA",
  dateOfBirth: new Date().toISOString().split('T')[0],
  
  // Academic Information (required)
  currentEducation: "High School",
  currentInstitution: "",
  graduationYear: new Date().getFullYear(),
  gpa: "",
  gpaScale: "4.0",
  
  // Target Information (required)
  targetUniversity: "",
  targetCountry: "USA",
  targetProgram: "Computer Science",
  programLevel: "Undergraduate",
  
  // Intake Information (required)
  intakeSeason: "Fall",
  intakeYear: new Date().getFullYear() + 1,
  
  // Scholarship Information
  scholarshipInterest: "None",
  scholarshipAmount: 0,
  
  // Test Scores - initialized as empty object
  testScores: {},
  
  // Status Information
  documents: "pending",
  essay: "pending",
  status: "draft",
  priority: "medium",
  
  // Recommendations
  recommendations: {
    count: 0,
    status: "pending"
  },
  
  // Application Fee
  applicationFee: {
    amount: 0,
    status: "pending"
  },
  
  // Additional
  additionalInfo: "",
  
  // Statistics
  statistics: {
    totalEmailsSent: 0,
    documentsUploaded: 0,
    statusChanges: 0,
    lastActivity: new Date().toISOString(),
    applicationScore: 0
  }
};

// Options matching schema enums exactly
const CURRENT_EDUCATION_OPTIONS = [
  "High School",
  "Bachelor Degree",
  "Master Degree",
  "PhD",
  "Diploma",
  "Other"
];

const PROGRAM_LEVEL_OPTIONS = [
  "Undergraduate",
  "Graduate",
  "PhD",
  "PostDoc",
  "Certificate"
];

const INTAKE_SEASON_OPTIONS = ["Fall", "Spring", "Summer", "Winter"];

const SCHOLARSHIP_OPTIONS = [
  "Research Scholarship",
  "Merit Scholarship",
  "Sports Scholarship",
  "Need-based Scholarship",
  "Government Scholarship",
  "University Scholarship",
  "None"
];

const DOCUMENTS_STATUS_OPTIONS = [
  "pending", "uploaded", "verified", "rejected", "missing"
];

const ESSAY_STATUS_OPTIONS = [
  "pending", "submitted", "reviewed", "accepted", "needs_revision"
];

const APPLICATION_STATUS_OPTIONS = [
  "draft", "submitted", "under_review", "interview_scheduled", 
  "accepted", "waitlisted", "rejected", "withdrawn", "deferred"
];

const PRIORITY_OPTIONS = ["low", "medium", "high", "urgent"];
const GPA_SCALE_OPTIONS = ["4.0", "5.0", "100%", "Other"];

const COUNTRY_OPTIONS = [
  "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan",
  "Singapore", "China", "South Korea", "Netherlands", "Sweden",
  "Switzerland", "New Zealand", "Rwanda", "Uganda", "Kenya", "Tanzania",
  "India", "Pakistan", "Bangladesh", "Sri Lanka", "Malaysia", "Indonesia",
  "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru"
];

const PROGRAM_OPTIONS = [
  "Computer Science", "Business Administration", "Medicine", "Engineering",
  "Law", "Psychology", "Architecture", "Art & Design", "Economics",
  "International Relations", "Environmental Science", "Data Science",
  "Artificial Intelligence", "Cybersecurity", "Biotechnology",
  "Public Health", "Education", "Journalism", "Hospitality Management",
  "Agriculture", "Veterinary Science", "Dentistry", "Pharmacy",
  "Nursing", "Social Work", "Political Science", "Sociology"
];

// University suggestions (not specific to USA)
const UNIVERSITY_SUGGESTIONS = [
  "University of Oxford",
  "University of Cambridge",
  "Imperial College London",
  "University College London",
  "London School of Economics",
  "University of Toronto",
  "University of British Columbia",
  "McGill University",
  "University of Melbourne",
  "University of Sydney",
  "Australian National University",
  "University of Tokyo",
  "Kyoto University",
  "National University of Singapore",
  "Nanyang Technological University",
  "University of Hong Kong",
  "Tsinghua University",
  "Peking University",
  "University of Cape Town",
  "University of the Witwatersrand",
  "University of Nairobi",
  "Makerere University",
  "University of Dar es Salaam",
  "University of Rwanda"
];

// Memoized FormField component
const FormField = React.memo(({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  children,
  ...props
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && value !== inputRef.current.value) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          ref={inputRef}
          type={type}
          name={name}
          required={required}
          defaultValue={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <ErrorIcon className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

// Memoized SelectField component
const SelectField = React.memo(({
  label,
  name,
  required = false,
  value,
  onChange,
  options,
  error,
  disabled,
  placeholder = "Select...",
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = value || "";
    }
  }, [value]);

  return (
    <FormField
      label={label}
      name={name}
      required={required}
      error={error}
      disabled={disabled}
    >
      <select
        ref={selectRef}
        name={name}
        required={required}
        defaultValue={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
});

// Status badge component
const StatusBadge = ({ status, type = "application" }) => {
  const getColorClasses = () => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'waitlisted': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'withdrawn': return 'bg-gray-100 text-gray-800';
      case 'deferred': return 'bg-indigo-100 text-indigo-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'uploaded': return 'bg-blue-100 text-blue-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'needs_revision': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getColorClasses()}`}>
      {formatStatus(status)}
    </span>
  );
};

export const AdmissionManagement = () => {
  // State management
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
  const [errors, setErrors] = useState({});
  
  // Use ref to track form data
  const formDataRef = useRef(INITIAL_APPLICATION_FORM);

  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setFetching(true);
      setError(null);

      const response = await api.get(APPLICATIONS_ENDPOINT);
      
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (response.data) {
        data = response.data;
      }

      if (!Array.isArray(data)) {
        console.warn("API response is not an array:", data);
        data = [];
      }

      setApplications(data);
      setFilteredApplications(data);

      if (data.length === 0) {
        showNotification("No applications found", "info");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.message || "Failed to load applications");
      showNotification(err.message || "Failed to load applications", "error");
    } finally {
      setFetching(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Filter applications
  useEffect(() => {
    if (!Array.isArray(applications)) {
      setFilteredApplications([]);
      return;
    }

    let filtered = [...applications];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((app) => {
        if (!app) return false;
        return (
          (app.firstName?.toLowerCase() || "").includes(term) ||
          (app.lastName?.toLowerCase() || "").includes(term) ||
          (app.email?.toLowerCase() || "").includes(term) ||
          (app.targetUniversity?.toLowerCase() || "").includes(term) ||
          (app.applicationId?.toLowerCase() || "").includes(term)
        );
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app?.status === statusFilter);
    }

    setFilteredApplications(filtered);
    setPage(0);
  }, [applications, searchTerm, statusFilter]);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Handle nested fields (testScores.sat.score, etc.)
    if (name.includes('.')) {
      const keys = name.split('.');
      formDataRef.current = {
        ...formDataRef.current,
        [keys[0]]: {
          ...formDataRef.current[keys[0]],
          [keys[1]]: keys[2] ? {
            ...(formDataRef.current[keys[0]]?.[keys[1]] || {}),
            [keys[2]]: value
          } : value
        }
      };
    } else {
      formDataRef.current = {
        ...formDataRef.current,
        [name]: value,
      };
    }
    
    // Update state
    setFormData(prev => {
      if (name.includes('.')) {
        const keys = name.split('.');
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: keys[2] ? {
              ...(prev[keys[0]]?.[keys[1]] || {}),
              [keys[2]]: value
            } : value
          }
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    // Clear error for this field
    const fieldName = name.split('.')[0];
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  }, [errors]);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    const data = formDataRef.current;

    // Required fields from schema
    if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
    
    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!data.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!data.nationality?.trim()) newErrors.nationality = "Nationality is required";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    
    if (!data.currentEducation?.trim()) newErrors.currentEducation = "Current education is required";
    if (!data.currentInstitution?.trim()) newErrors.currentInstitution = "Current institution is required";
    
    if (!data.gpa && data.gpa !== 0) {
      newErrors.gpa = "GPA is required";
    } else {
      const gpaNum = parseFloat(data.gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
        newErrors.gpa = "GPA must be between 0 and 4";
      }
    }
    
    if (!data.targetUniversity?.trim()) newErrors.targetUniversity = "Target university is required";
    if (!data.targetCountry?.trim()) newErrors.targetCountry = "Target country is required";
    if (!data.targetProgram?.trim()) newErrors.targetProgram = "Target program is required";
    if (!data.programLevel?.trim()) newErrors.programLevel = "Program level is required";
    if (!data.intakeSeason?.trim()) newErrors.intakeSeason = "Intake season is required";
    
    if (!data.intakeYear) {
      newErrors.intakeYear = "Intake year is required";
    } else {
      const year = parseInt(data.intakeYear);
      if (isNaN(year) || year < 2024 || year > 2030) {
        newErrors.intakeYear = "Intake year must be between 2024 and 2030";
      }
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  // Prepare data for API - matches Mongoose schema exactly
  const prepareFormData = useCallback(() => {
    const data = { ...formDataRef.current };
    
    console.log("Original form data:", data);
    
    // Convert string numbers to actual numbers
    if (data.gpa !== undefined) data.gpa = parseFloat(data.gpa);
    if (data.intakeYear !== undefined) data.intakeYear = parseInt(data.intakeYear);
    if (data.graduationYear !== undefined) data.graduationYear = parseInt(data.graduationYear);
    if (data.scholarshipAmount !== undefined) data.scholarshipAmount = parseFloat(data.scholarshipAmount);
    
    // Ensure recommendations object exists
    if (!data.recommendations) {
      data.recommendations = { count: 0, status: "pending" };
    }
    
    // Ensure applicationFee object exists
    if (!data.applicationFee) {
      data.applicationFee = { amount: 0, status: "pending" };
    }
    
    // Ensure statistics object exists
    if (!data.statistics) {
      data.statistics = {
        totalEmailsSent: 0,
        documentsUploaded: 0,
        statusChanges: 0,
        lastActivity: new Date().toISOString(),
        applicationScore: 0
      };
    }
    
    // Convert date strings to ISO strings
    if (data.dateOfBirth) {
      data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
    }
    
    // Handle test scores conversion
    if (data.testScores) {
      const convertedTestScores = {};
      Object.keys(data.testScores).forEach(testType => {
        if (data.testScores[testType]) {
          convertedTestScores[testType] = {};
          Object.keys(data.testScores[testType]).forEach(key => {
            if (data.testScores[testType][key]) {
              // Convert score strings to numbers
              if (['score', 'verbal', 'quant', 'writing', 'overall', 'listening', 'reading', 'speaking'].includes(key)) {
                const num = parseFloat(data.testScores[testType][key]);
                if (!isNaN(num)) {
                  convertedTestScores[testType][key] = num;
                }
              }
              // Convert date strings to ISO strings
              else if (key === 'date' && data.testScores[testType][key]) {
                convertedTestScores[testType][key] = new Date(data.testScores[testType][key]).toISOString();
              }
              // Keep other values as is
              else {
                convertedTestScores[testType][key] = data.testScores[testType][key];
              }
            }
          });
        }
      });
      
      // Only set testScores if there's actual data
      if (Object.keys(convertedTestScores).length > 0) {
        data.testScores = convertedTestScores;
      } else {
        delete data.testScores;
      }
    }
    
    // Remove empty strings, null, undefined
    const cleanData = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
        if (typeof data[key] === 'object') {
          // Check if object has any non-empty values
          const hasValues = Object.values(data[key]).some(val => 
            val !== "" && val !== null && val !== undefined
          );
          if (hasValues || key === 'recommendations' || key === 'applicationFee' || key === 'statistics') {
            cleanData[key] = data[key];
          }
        } else {
          cleanData[key] = data[key];
        }
      }
    });

    console.log("Cleaned data for API:", cleanData);
    return cleanData;
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submission started");
    
    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      const dataToSubmit = prepareFormData();
      console.log("Submitting to API:", JSON.stringify(dataToSubmit, null, 2));

      let response;
      
      if (isEditMode && selectedApplication) {
        // Update existing application
        const appId = selectedApplication._id || selectedApplication.id;
        console.log("Updating application with ID:", appId);
        response = await api.put(
          `${APPLICATIONS_ENDPOINT}/${appId}`,
          dataToSubmit
        );
        console.log("Update response:", response.data);
        
        // Update local state
        setApplications(prev =>
          prev.map(app =>
            (app._id === appId || app.id === appId) 
              ? response.data 
              : app
          )
        );
        
        showNotification("Application updated successfully!", "success");
      } else {
        // Create new application
        console.log("Creating new application");
        response = await api.post(APPLICATIONS_ENDPOINT, dataToSubmit);
        console.log("Create response:", response.data);
        
        // Update local state
        setApplications(prev => [response.data, ...prev]);
        
        showNotification("Application created successfully!", "success");
      }

      // Close dialog and reset form
      handleCloseDialog();
      resetForm();
      
      // Refresh the list
      fetchApplications();
      
    } catch (error) {
      console.error("Submit error:", error);
      
      let errorMessage = "An error occurred while submitting the application";
      
      // Try to get more specific error message
      if (error.response?.data) {
        const serverError = error.response.data;
        if (typeof serverError === 'string') {
          errorMessage = serverError;
        } else if (serverError.message) {
          errorMessage = serverError.message;
        } else if (serverError.error) {
          errorMessage = serverError.error;
        } else if (serverError.errors) {
          // Mongoose validation errors
          const errorMessages = Object.values(serverError.errors).map(err => err.message);
          errorMessage = `Validation errors: ${errorMessages.join(', ')}`;
        }
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete application
  const handleDelete = async () => {
    if (!selectedApplication) return;

    setLoading(true);

    try {
      const appId = selectedApplication._id || selectedApplication.id;
      console.log("Deleting application with ID:", appId);
      
      await api.delete(`${APPLICATIONS_ENDPOINT}/${appId}`);
      
      // Update local state
      setApplications(prev =>
        prev.filter(app => (app._id !== appId && app.id !== appId))
      );
      
      showNotification("Application deleted successfully!", "success");
      
      // Close dialog
      setOpenDeleteDialog(false);
      setSelectedApplication(null);
      
    } catch (error) {
      console.error("Delete error:", error);
      showNotification(error.response?.data?.message || "Failed to delete application", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = useCallback((message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  // Open edit dialog
  const handleEdit = (application) => {
    console.log("Editing application:", application);
    setSelectedApplication(application);
    
    // Format data for form
    const formData = {
      ...INITIAL_APPLICATION_FORM,
      ...application,
      dateOfBirth: application.dateOfBirth ? 
        application.dateOfBirth.split('T')[0] : 
        INITIAL_APPLICATION_FORM.dateOfBirth,
      graduationYear: application.graduationYear || INITIAL_APPLICATION_FORM.graduationYear,
      intakeYear: application.intakeYear || INITIAL_APPLICATION_FORM.intakeYear,
      // Ensure nested objects exist
      recommendations: application.recommendations || INITIAL_APPLICATION_FORM.recommendations,
      applicationFee: application.applicationFee || INITIAL_APPLICATION_FORM.applicationFee,
      statistics: application.statistics || INITIAL_APPLICATION_FORM.statistics,
      testScores: application.testScores || {}
    };
    
    formDataRef.current = formData;
    setFormData(formData);
    
    setIsEditMode(true);
    setOpenDialog(true);
    setErrors({});
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

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
    setIsEditMode(false);
    resetForm();
  };

  // Close view dialog
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedApplication(null);
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedApplication(null);
  };

  // Reset form
  const resetForm = () => {
    formDataRef.current = { ...INITIAL_APPLICATION_FORM };
    setFormData({ ...INITIAL_APPLICATION_FORM });
    setErrors({});
  };

  // Calculate statistics
  const statistics = {
    total: applications.length || 0,
    draft: applications.filter((app) => app?.status === "draft").length || 0,
    submitted: applications.filter((app) => app?.status === "submitted").length || 0,
    under_review: applications.filter((app) => app?.status === "under_review").length || 0,
    accepted: applications.filter((app) => app?.status === "accepted").length || 0,
    rejected: applications.filter((app) => app?.status === "rejected").length || 0,
  };

  // Pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* <Sidebar /> */}
      
      <div className="flex-1 p-4 md:p-6">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg border shadow-lg max-w-sm ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
            notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
            notification.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' && <CheckIcon className="w-5 h-5 mr-2" />}
              {notification.type === 'error' && <ErrorIcon className="w-5 h-5 mr-2" />}
              {notification.type === 'warning' && <WarningIcon className="w-5 h-5 mr-2" />}
              {notification.type === 'info' && <InfoIcon className="w-5 h-5 mr-2" />}
              <span className="text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Admission Management
          </h1>
          <p className="text-gray-600">
            Manage admission applications and track student progress
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-90">Total</p>
                <p className="text-xl font-bold mt-1">{statistics.total}</p>
              </div>
              <BookIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-90">Draft</p>
                <p className="text-xl font-bold mt-1">{statistics.draft}</p>
              </div>
              <DescriptionIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-90">Submitted</p>
                <p className="text-xl font-bold mt-1">{statistics.submitted}</p>
              </div>
              <AttachFileIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-90">Under Review</p>
                <p className="text-xl font-bold mt-1">{statistics.under_review}</p>
              </div>
              <AssessmentIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-90">Accepted</p>
                <p className="text-xl font-bold mt-1">{statistics.accepted}</p>
              </div>
              <CheckIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, university, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                {APPLICATION_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={fetchApplications}
                disabled={fetching}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center transition-colors"
              >
                <RefreshIcon className="w-5 h-5 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center transition-all shadow-md hover:shadow-lg"
              >
                <AddIcon className="w-5 h-5 mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {fetching ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <ErrorIcon className="w-16 h-16 text-rose-500 mx-auto mb-4" />
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchApplications}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Retry Loading
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Program
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedApplications.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <SchoolIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-700">No applications found</p>
                          <p className="mt-1 text-gray-500">
                            {searchTerm || statusFilter !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "Start by creating a new application"}
                          </p>
                          <button
                            onClick={handleCreate}
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                          >
                            Create New Application
                          </button>
                        </td>
                      </tr>
                    ) : (
                      paginatedApplications.map((app) => (
                        <tr key={app._id || app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {app.firstName?.charAt(0) || '?'}{app.lastName?.charAt(0) || '?'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {app.firstName || 'N/A'} {app.lastName || ''}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {app.email || 'No email'}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  ID: {app.applicationId || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{app.targetUniversity || 'N/A'}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <LocationIcon className="w-3 h-3 mr-1" />
                              {app.targetCountry || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{app.targetProgram || 'N/A'}</div>
                            <div className="text-xs text-gray-500">
                              {app.programLevel || 'N/A'} • GPA: {app.gpa || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={app.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(app.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(app)}
                                className="text-sky-600 hover:text-sky-900 hover:bg-sky-50 p-1.5 rounded transition-colors"
                                title="View Details"
                              >
                                <ViewIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleEdit(app)}
                                className="text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 p-1.5 rounded transition-colors"
                                title="Edit"
                              >
                                <EditIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(app)}
                                className="text-rose-600 hover:text-rose-900 hover:bg-rose-50 p-1.5 rounded transition-colors"
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

              {/* Pagination */}
              {paginatedApplications.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(endIndex, filteredApplications.length)}</span> of{' '}
                      <span className="font-medium">{filteredApplications.length}</span> applications
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      <span className="text-sm text-gray-700 px-2">
                        Page {page + 1} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {openDialog && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEditMode ? "Edit Admission Application" : "New Admission Application"}
                </h2>
                <button
                  onClick={handleCloseDialog}
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <PersonIcon className="w-5 h-5 text-blue-600 mr-2" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="First Name"
                        name="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Last Name"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <SelectField
                        label="Nationality"
                        name="nationality"
                        required
                        value={formData.nationality}
                        onChange={handleInputChange}
                        options={COUNTRY_OPTIONS}
                        error={errors.nationality}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        error={errors.dateOfBirth}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Section 2: Academic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <SchoolIcon className="w-5 h-5 text-emerald-600 mr-2" />
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Current Education"
                        name="currentEducation"
                        required
                        value={formData.currentEducation}
                        onChange={handleInputChange}
                        options={CURRENT_EDUCATION_OPTIONS}
                        error={errors.currentEducation}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Current Institution"
                        name="currentInstitution"
                        required
                        placeholder="University/College Name"
                        value={formData.currentInstitution}
                        onChange={handleInputChange}
                        error={errors.currentInstitution}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Graduation Year"
                        name="graduationYear"
                        type="number"
                        placeholder="2024"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label="GPA"
                          name="gpa"
                          type="number"
                          step="0.01"
                          min="0"
                          max="4"
                          required
                          placeholder="3.5"
                          value={formData.gpa}
                          onChange={handleInputChange}
                          error={errors.gpa}
                          disabled={loading}
                        />
                        
                        <SelectField
                          label="GPA Scale"
                          name="gpaScale"
                          value={formData.gpaScale}
                          onChange={handleInputChange}
                          options={GPA_SCALE_OPTIONS}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Target Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <AccountBalance className="w-5 h-5 text-purple-600 mr-2" />
                      Target Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target University <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="targetUniversity"
                          required
                          placeholder="Enter university name"
                          value={formData.targetUniversity}
                          onChange={handleInputChange}
                          disabled={loading}
                          list="university-suggestions"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.targetUniversity
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 hover:border-gray-400"
                          } `}
                        />
                        <datalist id="university-suggestions">
                          {UNIVERSITY_SUGGESTIONS.map((university) => (
                            <option key={university} value={university} />
                          ))}
                        </datalist>
                        {errors.targetUniversity && (
                          <p className="mt-1 text-xs text-red-600">{errors.targetUniversity}</p>
                        )}
                      </div>
                      
                      <SelectField
                        label="Target Country"
                        name="targetCountry"
                        required
                        value={formData.targetCountry}
                        onChange={handleInputChange}
                        options={COUNTRY_OPTIONS}
                        error={errors.targetCountry}
                        disabled={loading}
                      />
                      
                      <SelectField
                        label="Target Program"
                        name="targetProgram"
                        required
                        value={formData.targetProgram}
                        onChange={handleInputChange}
                        options={PROGRAM_OPTIONS}
                        error={errors.targetProgram}
                        disabled={loading}
                      />
                      
                      <SelectField
                        label="Program Level"
                        name="programLevel"
                        required
                        value={formData.programLevel}
                        onChange={handleInputChange}
                        options={PROGRAM_LEVEL_OPTIONS}
                        error={errors.programLevel}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <SelectField
                        label="Intake Season"
                        name="intakeSeason"
                        required
                        value={formData.intakeSeason}
                        onChange={handleInputChange}
                        options={INTAKE_SEASON_OPTIONS}
                        error={errors.intakeSeason}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Intake Year"
                        name="intakeYear"
                        type="number"
                        required
                        placeholder="2024"
                        value={formData.intakeYear}
                        onChange={handleInputChange}
                        error={errors.intakeYear}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Section 4: Scholarship & Status */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <TrophyIcon className="w-5 h-5 text-amber-600 mr-2" />
                      Scholarship & Application Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Scholarship Interest"
                        name="scholarshipInterest"
                        value={formData.scholarshipInterest}
                        onChange={handleInputChange}
                        options={SCHOLARSHIP_OPTIONS}
                        disabled={loading}
                      />
                      
                      <FormField
                        label="Scholarship Amount ($)"
                        name="scholarshipAmount"
                        type="number"
                        placeholder="0"
                        value={formData.scholarshipAmount}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                      
                      <SelectField
                        label="Application Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        options={APPLICATION_STATUS_OPTIONS}
                        disabled={loading}
                      />
                      
                      <SelectField
                        label="Priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        options={PRIORITY_OPTIONS}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <SelectField
                        label="Documents Status"
                        name="documents"
                        value={formData.documents}
                        onChange={handleInputChange}
                        options={DOCUMENTS_STATUS_OPTIONS}
                        disabled={loading}
                      />
                      
                      <SelectField
                        label="Essay Status"
                        name="essay"
                        value={formData.essay}
                        onChange={handleInputChange}
                        options={ESSAY_STATUS_OPTIONS}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Section 5: Additional Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <DescriptionIcon className="w-5 h-5 text-indigo-600 mr-2" />
                      Additional Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        disabled={loading}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Any additional information about the applicant..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-md hover:shadow-lg'
                      } text-white`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {isEditMode ? 'Updating...' : 'Submitting...'}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <SaveIcon className="w-5 h-5 mr-2" />
                          {isEditMode ? 'Update Application' : 'Submit Application'}
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && selectedApplication && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full mx-auto mb-4">
                  <WarningIcon className="w-6 h-6 text-rose-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  Delete Application
                </h3>
                
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete the application for{' '}
                  <span className="font-semibold text-gray-900">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </span>
                  ? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    disabled={loading}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-md hover:shadow-lg'
                    } text-white`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete'
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