// /* eslint-disable no-unused-vars */
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// // Material Icons
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import SortIcon from "@mui/icons-material/Sort";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DownloadIcon from "@mui/icons-material/Download";
// import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";
// import WarningIcon from "@mui/icons-material/Warning";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import SecurityIcon from "@mui/icons-material/Security";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import BlockIcon from "@mui/icons-material/Block";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { Sidebar } from "../../sidebars/Sidebar";

// // API Configuration
// const API_BASE_URL = "https://ruziganodejs.onrender.com";

// // ===============================
// // SEPARATE USER FORM MODAL COMPONENT
// // ===============================
// const UserFormModal = React.memo(
//   ({ show, onClose, onSuccess, isEditMode, selectedUser }) => {
//     const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       role: "user",
//       status: "active",
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const formRef = useRef(null);
//     const modalRef = useRef(null);

//     // Initialize form when modal opens or selectedUser changes
//     useEffect(() => {
//       if (show && selectedUser) {
//         setFormData({
//           name: selectedUser.name || "",
//           email: selectedUser.email || "",
//           password: "",
//           confirmPassword: "",
//           phone: selectedUser.phone || "",
//           role: selectedUser.role || "user",
//           status: selectedUser.status || "active",
//         });
//       } else if (show) {
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           phone: "",
//           role: "user",
//           status: "active",
//         });
//       }
//     }, [show, selectedUser]);

//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsSubmitting(true);

//       try {
//         // Validation
//         if (
//           formData.password &&
//           formData.password !== formData.confirmPassword
//         ) {
//           throw new Error("Passwords do not match");
//         }

//         if (formData.password && formData.password.length < 6) {
//           throw new Error("Password must be at least 6 characters long");
//         }

//
//         let response;

//         if (isEditMode && selectedUser) {
//           const updateData = { ...formData };
//           if (!updateData.password) {
//             delete updateData.password;
//             delete updateData.confirmPassword;
//           }

//           response = await axios.put(
//             `${API_BASE_URL}/auth/${selectedUser._id}`,
//             updateData,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//         } else {
//           response = await axios.post(`${API_BASE_URL}/auth`, formData, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           });
//         }

//         if (response.data.success) {
//           onSuccess(
//             isEditMode
//               ? "User updated successfully!"
//               : "User created successfully!"
//           );
//           onClose();
//         } else {
//           throw new Error(response.data.message || "Operation failed");
//         }
//       } catch (error) {
//         toast.error(
//           error.response?.data?.message || error.message || "Operation failed"
//         );
//       } finally {
//         setIsSubmitting(false);
//       }
//     };

//     const handleModalClick = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     if (!show) return null;

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={handleModalClick}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 50 }}
//           transition={{ type: "spring", damping: 25 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
//           ref={modalRef}
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {isEditMode ? "Edit User" : "Add New User"}
//                 </h2>
//                 <p className="text-gray-600 mt-1">
//                   {isEditMode
//                     ? "Update user information"
//                     : "Create a new user account"}
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 disabled={isSubmitting}
//               >
//                 <CloseIcon className="h-6 w-6 text-gray-500" />
//               </button>
//             </div>

//             <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                     placeholder="John Doe"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                     placeholder="john@example.com"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                     placeholder="+1 (555) 123-4567"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Role *
//                   </label>
//                   <select
//                     name="role"
//                     required
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                     disabled={isSubmitting}
//                   >
//                     <option value="user">User</option>
//                     <option value="moderator">Moderator</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//               </div>

//               {!isEditMode && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Password *
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       required={!isEditMode}
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                       placeholder="••••••••"
//                       minLength="6"
//                       disabled={isSubmitting}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Minimum 6 characters
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Confirm Password *
//                     </label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       required={!isEditMode}
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                       placeholder="••••••••"
//                       minLength="6"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>
//               )}

//               {isEditMode && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Password (leave blank to keep current)
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                       placeholder="••••••••"
//                       minLength="6"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                       placeholder="••••••••"
//                       minLength="6"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Status *
//                 </label>
//                 <select
//                   name="status"
//                   required
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                   disabled={isSubmitting}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="suspended">Suspended</option>
//                 </select>
//               </div>

//               <div className="flex justify-end space-x-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       {isEditMode ? "Updating..." : "Creating..."}
//                     </>
//                   ) : isEditMode ? (
//                     <>
//                       <SaveIcon className="h-5 w-5 mr-2" />
//                       Update User
//                     </>
//                   ) : (
//                     <>
//                       <PersonAddIcon className="h-5 w-5 mr-2" />
//                       Create User
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   }
// );

// // ===============================
// // MAIN USER MANAGEMENT COMPONENT
// // ===============================
// export const UserManagement = () => {
//   // State Management
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(10);
//   const [showAddUserModal, setShowAddUserModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalTitle, setModalTitle] = useState("");
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);
//   const [filters, setFilters] = useState({
//     role: "",
//     status: "",
//     dateRange: "",
//   });
//   const toggleNotificationsModal = () => {
//     setShowNotificationsModal(!showNotificationsModal);
//   };
//   // Refs to prevent unnecessary re-renders
//   const usersRef = useRef([]);
//   const modalCallbackRef = useRef(null);

//   // Fetch users from API
//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {

//       const response = await axios.get(`${API_BASE_URL}/auth`);
//       console.log("Fetched user response:", response.data);
//       if (response.data.success) {
//         const usersData = response.data.data;

//         setUsers(usersData);
//         setFilteredUsers(usersData);
//       } else {
//         throw new Error(response.data.message || "Failed to fetch users");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Failed to load users. Please try again.");
//       // For demo purposes, use sample data
//       const sampleData = generateSampleUsers();
//       usersRef.current = sampleData;
//       setUsers(sampleData);
//       setFilteredUsers(sampleData);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Generate sample users for demo
//   const generateSampleUsers = () => {
//     return [
//       {
//         _id: "1",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         phone: "+1 (555) 123-4567",
//         role: "admin",
//         status: "active",
//         createdAt: "2024-01-15T10:30:00Z",
//         lastLogin: "2024-03-20T14:25:00Z",
//       },
//       {
//         _id: "2",
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         phone: "+1 (555) 987-6543",
//         role: "user",
//         status: "active",
//         createdAt: "2024-02-10T09:15:00Z",
//         lastLogin: "2024-03-19T11:45:00Z",
//       },
//       {
//         _id: "3",
//         name: "Robert Johnson",
//         email: "robert.j@example.com",
//         phone: "+1 (555) 456-7890",
//         role: "moderator",
//         status: "inactive",
//         createdAt: "2024-01-20T14:45:00Z",
//         lastLogin: "2024-02-28T16:30:00Z",
//       },
//       {
//         _id: "4",
//         name: "Emily Davis",
//         email: "emily.davis@example.com",
//         phone: "+1 (555) 234-5678",
//         role: "user",
//         status: "active",
//         createdAt: "2024-03-05T08:20:00Z",
//         lastLogin: "2024-03-20T09:15:00Z",
//       },
//       {
//         _id: "5",
//         name: "Michael Brown",
//         email: "michael.b@example.com",
//         phone: "+1 (555) 876-5432",
//         role: "admin",
//         status: "suspended",
//         createdAt: "2024-01-30T11:10:00Z",
//         lastLogin: "2024-02-15T13:40:00Z",
//       },
//       {
//         _id: "6",
//         name: "Sarah Wilson",
//         email: "sarah.w@example.com",
//         phone: "+1 (555) 345-6789",
//         role: "user",
//         status: "active",
//         createdAt: "2024-03-10T16:45:00Z",
//         lastLogin: "2024-03-20T10:20:00Z",
//       },
//       {
//         _id: "7",
//         name: "David Miller",
//         email: "david.m@example.com",
//         phone: "+1 (555) 765-4321",
//         role: "moderator",
//         status: "active",
//         createdAt: "2024-02-15T13:25:00Z",
//         lastLogin: "2024-03-19T15:50:00Z",
//       },
//       {
//         _id: "8",
//         name: "Lisa Taylor",
//         email: "lisa.t@example.com",
//         phone: "+1 (555) 654-3210",
//         role: "user",
//         status: "inactive",
//         createdAt: "2024-01-25T10:05:00Z",
//         lastLogin: "2024-02-10T12:30:00Z",
//       },
//       {
//         _id: "9",
//         name: "James Anderson",
//         email: "james.a@example.com",
//         phone: "+1 (555) 543-2109",
//         role: "admin",
//         status: "active",
//         createdAt: "2024-03-01T09:40:00Z",
//         lastLogin: "2024-03-20T14:10:00Z",
//       },
//       {
//         _id: "10",
//         name: "Maria Garcia",
//         email: "maria.g@example.com",
//         phone: "+1 (555) 321-0987",
//         role: "user",
//         status: "active",
//         createdAt: "2024-02-28T14:15:00Z",
//         lastLogin: "2024-03-20T08:45:00Z",
//       },
//     ];
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   // Apply filters and search - memoized to prevent re-renders
//   const applyFilters = useCallback(() => {
//     let filtered = [...usersRef.current];

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (user) =>
//           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.phone.includes(searchQuery)
//       );
//     }

//     if (filters.role) {
//       filtered = filtered.filter((user) => user.role === filters.role);
//     }

//     if (filters.status) {
//       filtered = filtered.filter((user) => user.status === filters.status);
//     }

//     switch (sortBy) {
//       case "name":
//         filtered.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case "email":
//         filtered.sort((a, b) => a.email.localeCompare(b.email));
//         break;
//       case "createdAt":
//         filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         break;
//       case "lastLogin":
//         filtered.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
//         break;
//       default:
//         filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchQuery, filters.role, filters.status, sortBy]);

//   useEffect(() => {
//     applyFilters();
//   }, [applyFilters]);

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = useMemo(
//     () => filteredUsers.slice(indexOfFirstUser, indexOfLastUser),
//     [filteredUsers, indexOfFirstUser, indexOfLastUser]
//   );
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // User form modal handlers
//   const handleAddUserClick = () => {
//     setSelectedUser(null);
//     setIsEditMode(false);
//     setShowAddUserModal(true);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setIsEditMode(true);
//     setShowAddUserModal(true);
//   };

//   const handleUserFormSuccess = (message) => {
//     toast.success(message);
//     setShowAddUserModal(false);
//     fetchUsers();
//   };

//   const handleUserFormClose = () => {
//     setShowAddUserModal(false);
//     setSelectedUser(null);
//     setIsEditMode(false);
//   };

//   // Delete user
//   const handleDeleteUser = (userId) => {
//     setModalTitle("Confirm Delete");
//     setModalMessage(
//       "Are you sure you want to delete this user? This action cannot be undone."
//     );
//     setShowDeleteConfirm(true);
//     modalCallbackRef.current = async () => {
//       try {
//
//         const response = await axios.delete(`${API_BASE_URL}/auth/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.data.success) {
//           toast.success("User deleted successfully!");
//           fetchUsers();
//         } else {
//           toast.error(response.data.message || "Failed to delete user");
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         toast.error(error.response?.data?.message || "Failed to delete user");
//       }
//     };
//   };

//   // Export users to PDF
//   const handleExportPDF = () => {
//     try {
//       // Create a new window for PDF generation
//       const printWindow = window.open("", "_blank");

//       // Get stats
//       const totalUsers = filteredUsers.length;
//       const activeUsers = filteredUsers.filter(
//         (u) => u.status === "active"
//       ).length;
//       const adminUsers = filteredUsers.filter((u) => u.role === "admin").length;
//       const inactiveUsers = filteredUsers.filter(
//         (u) => u.status !== "active"
//       ).length;

//       const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <title>Users Report</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 40px; }
//             .header { text-align: center; margin-bottom: 30px; }
//             .title { font-size: 24px; font-weight: bold; color: #333; }
//             .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
//             .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 30px 0; }
//             .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
//             .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
//             .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 14px; }
//             td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
//             tr:hover { background: #f9fafb; }
//             .badge { padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
//             .badge-admin { background: #fee2e2; color: #dc2626; }
//             .badge-moderator { background: #f3e8ff; color: #7c3aed; }
//             .badge-user { background: #dbeafe; color: #2563eb; }
//             .badge-active { background: #dcfce7; color: #16a34a; }
//             .badge-inactive { background: #fef9c3; color: #ca8a04; }
//             .badge-suspended { background: #fee2e2; color: #dc2626; }
//             .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
//             .timestamp { font-size: 11px; color: #999; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div class="title">User Management Report</div>
//             <div class="subtitle">Generated on ${new Date().toLocaleString()}</div>
//           </div>

//           <div class="stats">
//             <div class="stat-card">
//               <div class="stat-value">${totalUsers}</div>
//               <div class="stat-label">Total Users</div>
//             </div>
//             <div class="stat-card">
//               <div class="stat-value">${activeUsers}</div>
//               <div class="stat-label">Active Users</div>
//             </div>
//             <div class="stat-card">
//               <div class="stat-value">${adminUsers}</div>
//               <div class="stat-label">Admin Users</div>
//             </div>
//             <div class="stat-card">
//               <div class="stat-value">${inactiveUsers}</div>
//               <div class="stat-label">Inactive Users</div>
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Created Date</th>
//                 <th>Last Login</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${filteredUsers
//                 .map(
//                   (user) => `
//                 <tr>
//                   <td>${user.name}</td>
//                   <td>${user.email}</td>
//                   <td>${user.phone || "N/A"}</td>
//                   <td><span class="badge badge-${
//                     user.role
//                   }">${user.role.toUpperCase()}</span></td>
//                   <td><span class="badge badge-${
//                     user.status
//                   }">${user.status.toUpperCase()}</span></td>
//                   <td>${new Date(user.createdAt).toLocaleDateString()}</td>
//                   <td>${
//                     user.lastLogin
//                       ? new Date(user.lastLogin).toLocaleDateString()
//                       : "Never"
//                   }</td>
//                 </tr>
//               `
//                 )
//                 .join("")}
//             </tbody>
//           </table>

//           <div class="footer">
//             <div class="timestamp">Report ID: ${Date.now()}</div>
//             <div>Total Records: ${filteredUsers.length}</div>
//           </div>
//         </body>
//         </html>
//       `;

//       printWindow.document.write(htmlContent);
//       printWindow.document.close();

//       // Wait for content to load then print
//       setTimeout(() => {
//         printWindow.print();
//         printWindow.close();
//       }, 500);

//       toast.success("PDF generated successfully!");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       toast.error("Failed to generate PDF");
//     }
//   };

//   // User Card Component
//   const UserCard = React.memo(({ user, onEdit, onDelete }) => {
//     const [showActions, setShowActions] = useState(false);

//     const getRoleBadgeColor = (role) => {
//       switch (role) {
//         case "admin":
//           return "bg-red-100 text-red-800";
//         case "moderator":
//           return "bg-purple-100 text-purple-800";
//         case "user":
//           return "bg-blue-100 text-blue-800";
//         default:
//           return "bg-gray-100 text-gray-800";
//       }
//     };

//     const getStatusBadgeColor = (status) => {
//       switch (status) {
//         case "active":
//           return "bg-green-100 text-green-800";
//         case "inactive":
//           return "bg-yellow-100 text-yellow-800";
//         case "suspended":
//           return "bg-red-100 text-red-800";
//         default:
//           return "bg-gray-100 text-gray-800";
//       }
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
//                 <div className="flex items-center text-gray-600 text-sm">
//                   <EmailIcon className="h-4 w-4 mr-1" />
//                   {user.email}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowActions(!showActions)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <MoreVertIcon className="h-5 w-5 text-gray-600" />
//               </button>

//               {showActions && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                   <button
//                     onClick={() => {
//                       onEdit(user);
//                       setShowActions(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
//                   >
//                     <EditIcon className="h-4 w-4 mr-2 text-blue-600" />
//                     Edit User
//                   </button>
//                   <button
//                     onClick={() => {
//                       onDelete(user._id);
//                       setShowActions(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-red-600"
//                   >
//                     <DeleteIcon className="h-4 w-4 mr-2" />
//                     Delete User
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <div className="flex items-center">
//               <PhoneIcon className="h-4 w-4 text-gray-500 mr-2" />
//               <span className="text-sm text-gray-700">
//                 {user.phone || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <CalendarTodayIcon className="h-4 w-4 text-gray-500 mr-2" />
//               <span className="text-sm text-gray-700">
//                 Joined: {new Date(user.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 mb-4">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeColor(
//                 user.role
//               )}`}
//             >
//               {user.role.toUpperCase()}
//             </span>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
//                 user.status
//               )}`}
//             >
//               {user.status.toUpperCase()}
//             </span>
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//             <div className="text-sm text-gray-600">
//               Last login:{" "}
//               {user.lastLogin
//                 ? new Date(user.lastLogin).toLocaleDateString()
//                 : "Never"}
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => onEdit(user)}
//                 className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
//                 title="Edit"
//               >
//                 <EditIcon className="h-4 w-4 text-blue-600" />
//               </button>
//               <button
//                 onClick={() => onDelete(user._id)}
//                 className="p-2 hover:bg-red-50 rounded-lg transition-colors"
//                 title="Delete"
//               >
//                 <DeleteIcon className="h-4 w-4 text-red-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   });

//   // Confirmation Modal
//   const ConfirmationModal = () => {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setShowDeleteConfirm(false)}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 50 }}
//           transition={{ type: "spring", damping: 25 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//                 <WarningIcon className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 {modalTitle}
//               </h3>
//               <p className="text-gray-600">{modalMessage}</p>
//             </div>

//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   if (modalCallbackRef.current) modalCallbackRef.current();
//                   setShowDeleteConfirm(false);
//                 }}
//                 className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
//               >
//                 Confirm Delete
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Pagination Component
//   const Pagination = React.memo(() => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <div className="flex items-center justify-between mt-8">
//         <div className="text-sm text-gray-600">
//           Showing {indexOfFirstUser + 1} to{" "}
//           {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
//           {filteredUsers.length} users
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               currentPage === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             Previous
//           </button>

//           {pageNumbers.map((number) => (
//             <button
//               key={number}
//               onClick={() => handlePageChange(number)}
//               className={`w-10 h-10 rounded-lg font-semibold ${
//                 currentPage === number
//                   ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {number}
//             </button>
//           ))}

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               currentPage === totalPages
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
//       <Sidebar onToggleNotifications={toggleNotificationsModal} />
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-12"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
//                 User Management Dashboard
//               </h1>
//               <p className="text-lg text-gray-600">
//                 Manage users, roles, and permissions
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <button
//                 onClick={handleAddUserClick}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
//               >
//                 <AddIcon className="h-5 w-5 mr-2" />
//                 Add New User
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
//         >
//           {[
//             {
//               title: "Total Users",
//               value: users.length,
//               icon: PersonIcon,
//               color: "from-blue-500 to-cyan-500",
//               change: "+12%",
//             },
//             {
//               title: "Active Users",
//               value: users.filter((u) => u.status === "active").length,
//               icon: VerifiedUserIcon,
//               color: "from-green-500 to-emerald-500",
//               change: "+8%",
//             },
//             {
//               title: "Admin Users",
//               value: users.filter((u) => u.role === "admin").length,
//               icon: AdminPanelSettingsIcon,
//               color: "from-purple-500 to-pink-500",
//               change: "+5%",
//             },
//             {
//               title: "Inactive Users",
//               value: users.filter((u) => u.status !== "active").length,
//               icon: BlockIcon,
//               color: "from-red-500 to-orange-500",
//               change: "-3%",
//             },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div
//                   className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
//                 >
//                   <stat.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <span className="text-sm font-medium text-green-600">
//                   {stat.change}
//                 </span>
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-1">
//                 {stat.value}
//               </div>
//               <div className="text-gray-600">{stat.title}</div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Search and Filter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Search Users
//               </label>
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by email, ID, name, or phone..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Filter by Role
//               </label>
//               <select
//                 value={filters.role}
//                 onChange={(e) =>
//                   setFilters((prev) => ({ ...prev, role: e.target.value }))
//                 }
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//               >
//                 <option value="">All Roles</option>
//                 <option value="user">User</option>
//                 <option value="moderator">Moderator</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Filter by Status
//               </label>
//               <select
//                 value={filters.status}
//                 onChange={(e) =>
//                   setFilters((prev) => ({ ...prev, status: e.target.value }))
//                 }
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//               >
//                 <option value="">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="suspended">Suspended</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Sort By
//               </label>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
//               >
//                 <option value="createdAt">Newest First</option>
//                 <option value="name">Name A-Z</option>
//                 <option value="email">Email A-Z</option>
//                 <option value="lastLogin">Last Login</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <div className="text-sm text-gray-600">
//               {filteredUsers.length} users found
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={fetchUsers}
//                 className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center"
//               >
//                 <RefreshIcon className="h-4 w-4 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={handleExportPDF}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
//               >
//                 <PictureAsPdfIcon className="h-4 w-4 mr-2" />
//                 Export PDF
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Users Grid */}
//         <div className="mb-12">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading users...</p>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//               <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No users found
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 Try adjusting your search or filter criteria
//               </p>
//               <button
//                 onClick={handleAddUserClick}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
//               >
//                 <AddIcon className="h-5 w-5 mr-2 inline" />
//                 Add New User
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {currentUsers.map((user) => (
//                   <UserCard
//                     key={user._id}
//                     user={user}
//                     onEdit={handleEditUser}
//                     onDelete={handleDeleteUser}
//                   />
//                 ))}
//               </div>

//               <Pagination />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         <UserFormModal
//           show={showAddUserModal}
//           onClose={handleUserFormClose}
//           onSuccess={handleUserFormSuccess}
//           isEditMode={isEditMode}
//           selectedUser={selectedUser}
//         />
//         {showDeleteConfirm && <ConfirmationModal />}
//       </AnimatePresence>
//     </div>
//   );
// };

/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Sidebar } from "../../sidebars/Sidebar";

// API Configuration
const API_BASE_URL = "https://ruziganodejs.onrender.com";

// ===============================
// SEPARATE USER FORM MODAL COMPONENT
// ===============================
const UserFormModal = React.memo(
  ({ show, onClose, onSuccess, isEditMode, selectedUser }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "user",
      isVerified: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
    const modalRef = useRef(null);

    // Initialize form when modal opens or selectedUser changes
    useEffect(() => {
      if (show && selectedUser) {
        setFormData({
          name: selectedUser.name || "",
          email: selectedUser.email || "",
          password: "",
          confirmPassword: "",
          phone: selectedUser.phone || "",
          role: selectedUser.role || "user",
          isVerified: selectedUser.isVerified || false,
        });
      } else if (show) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "user",
          isVerified: false,
        });
      }
    }, [show, selectedUser]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Validation
        if (
          formData.password &&
          formData.password !== formData.confirmPassword
        ) {
          throw new Error("Passwords do not match");
        }

        if (formData.password && formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        let response;

        if (isEditMode && selectedUser) {
          const updateData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            isVerified: formData.isVerified,
          };

          // Only include password if provided
          if (formData.password) {
            updateData.password = formData.password;
          }

          response = await axios.put(
            `${API_BASE_URL}/auth/${selectedUser._id}`,
            updateData
          );
        } else {
          // For new user, password is required
          if (!formData.password) {
            throw new Error("Password is required for new users");
          }

          const createData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
            isVerified: formData.isVerified,
          };

          response = await axios.post(`${API_BASE_URL}/auth`, createData);
        }

        if (response.data && (response.data.user || response.data.success)) {
          onSuccess(
            isEditMode
              ? "User updated successfully!"
              : "User created successfully!"
          );
          onClose();
        } else {
          throw new Error(response.data.message || "Operation failed");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || error.message || "Operation failed"
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleModalClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (!show) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={handleModalClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl overflow-y-auto shadow-2xl w-full max-w-2xl"
          ref={modalRef}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? "Edit User" : "Add New User"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isEditMode
                    ? "Update user information"
                    : "Create a new user account"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 text-black overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {!isEditMode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={!isEditMode}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                      placeholder="••••••••"
                      minLength="6"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 6 characters
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required={!isEditMode}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                      placeholder="••••••••"
                      minLength="6"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              {isEditMode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                      placeholder="••••••••"
                      minLength="6"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                      placeholder="••••••••"
                      minLength="6"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isVerified"
                  id="isVerified"
                  checked={formData.isVerified}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="isVerified"
                  className="ml-2 text-sm font-semibold text-gray-700"
                >
                  Verified Account
                </label>
                <span className="ml-2 text-xs text-gray-500">
                  (User email is verified)
                </span>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : isEditMode ? (
                    <>
                      <SaveIcon className="h-5 w-5 mr-2" />
                      Update User
                    </>
                  ) : (
                    <>
                      <PersonAddIcon className="h-5 w-5 mr-2" />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

// ===============================
// MAIN USER MANAGEMENT COMPONENT
// ===============================
export const UserManagement = () => {
  // State Management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    dateRange: "",
  });

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Refs to prevent unnecessary re-renders
  const usersRef = useRef([]);
  const modalCallbackRef = useRef(null);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth`);
      console.log("Fetched user response:", response.data);

      if (response.data.users) {
        const usersData = response.data.users;

        // Map API data to match your expected structure
        const mappedUsers = usersData.map((user) => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          role: user.role || "user",
          status: user.isVerified ? "active" : "inactive",
          isVerified: user.isVerified || false,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin || null,
          updatedAt: user.updatedAt,
        }));

        setUsers(mappedUsers);
        setFilteredUsers(mappedUsers);
        usersRef.current = mappedUsers;
      } else {
        throw new Error("Invalid response format: users array not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again.");
      // For demo purposes, use sample data
      const sampleData = generateSampleUsers();
      usersRef.current = sampleData;
      setUsers(sampleData);
      setFilteredUsers(sampleData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate sample users for demo
  const generateSampleUsers = () => {
    return [
      {
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        role: "admin",
        status: "active",
        isVerified: true,
        createdAt: "2024-01-15T10:30:00Z",
        lastLogin: "2024-03-20T14:25:00Z",
        updatedAt: "2024-03-20T14:25:00Z",
      },
      {
        _id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        role: "user",
        status: "active",
        isVerified: true,
        createdAt: "2024-02-10T09:15:00Z",
        lastLogin: "2024-03-19T11:45:00Z",
        updatedAt: "2024-03-19T11:45:00Z",
      },
      {
        _id: "3",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "+1 (555) 456-7890",
        role: "moderator",
        status: "inactive",
        isVerified: false,
        createdAt: "2024-01-20T14:45:00Z",
        lastLogin: "2024-02-28T16:30:00Z",
        updatedAt: "2024-02-28T16:30:00Z",
      },
      {
        _id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 234-5678",
        role: "user",
        status: "active",
        isVerified: true,
        createdAt: "2024-03-05T08:20:00Z",
        lastLogin: "2024-03-20T09:15:00Z",
        updatedAt: "2024-03-20T09:15:00Z",
      },
      {
        _id: "5",
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 (555) 876-5432",
        role: "admin",
        status: "suspended",
        isVerified: false,
        createdAt: "2024-01-30T11:10:00Z",
        lastLogin: "2024-02-15T13:40:00Z",
        updatedAt: "2024-02-15T13:40:00Z",
      },
      {
        _id: "6",
        name: "Sarah Wilson",
        email: "sarah.w@example.com",
        phone: "+1 (555) 345-6789",
        role: "user",
        status: "active",
        isVerified: true,
        createdAt: "2024-03-10T16:45:00Z",
        lastLogin: "2024-03-20T10:20:00Z",
        updatedAt: "2024-03-20T10:20:00Z",
      },
      {
        _id: "7",
        name: "David Miller",
        email: "david.m@example.com",
        phone: "+1 (555) 765-4321",
        role: "moderator",
        status: "active",
        isVerified: true,
        createdAt: "2024-02-15T13:25:00Z",
        lastLogin: "2024-03-19T15:50:00Z",
        updatedAt: "2024-03-19T15:50:00Z",
      },
      {
        _id: "8",
        name: "Lisa Taylor",
        email: "lisa.t@example.com",
        phone: "+1 (555) 654-3210",
        role: "user",
        status: "inactive",
        isVerified: false,
        createdAt: "2024-01-25T10:05:00Z",
        lastLogin: "2024-02-10T12:30:00Z",
        updatedAt: "2024-02-10T12:30:00Z",
      },
      {
        _id: "9",
        name: "James Anderson",
        email: "james.a@example.com",
        phone: "+1 (555) 543-2109",
        role: "admin",
        status: "active",
        isVerified: true,
        createdAt: "2024-03-01T09:40:00Z",
        lastLogin: "2024-03-20T14:10:00Z",
        updatedAt: "2024-03-20T14:10:00Z",
      },
      {
        _id: "10",
        name: "Maria Garcia",
        email: "maria.g@example.com",
        phone: "+1 (555) 321-0987",
        role: "user",
        status: "active",
        isVerified: true,
        createdAt: "2024-02-28T14:15:00Z",
        lastLogin: "2024-03-20T08:45:00Z",
        updatedAt: "2024-03-20T08:45:00Z",
      },
    ];
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Apply filters and search - memoized to prevent re-renders
  const applyFilters = useCallback(() => {
    let filtered = [...usersRef.current];

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.phone && user.phone.includes(searchQuery))
      );
    }

    if (filters.role) {
      filtered = filtered.filter((user) => user.role === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "email":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "createdAt":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "lastLogin":
        filtered.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters.role, filters.status, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(
    () => filteredUsers.slice(indexOfFirstUser, indexOfLastUser),
    [filteredUsers, indexOfFirstUser, indexOfLastUser]
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // User form modal handlers
  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowAddUserModal(true);
  };

  const handleUserFormSuccess = (message) => {
    toast.success(message);
    setShowAddUserModal(false);
    fetchUsers();
  };

  const handleUserFormClose = () => {
    setShowAddUserModal(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    setModalTitle("Confirm Delete");
    setModalMessage(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    setShowDeleteConfirm(true);
    modalCallbackRef.current = async () => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/auth/${userId}`);

        if (response.data && response.data.success) {
          toast.success("User deleted successfully!");
          fetchUsers();
        } else {
          toast.error(response.data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    };
  };

  // Export users to PDF
  const handleExportPDF = () => {
    try {
      // Create a new window for PDF generation
      const printWindow = window.open("", "_blank");

      // Get stats
      const totalUsers = filteredUsers.length;
      const activeUsers = filteredUsers.filter(
        (u) => u.status === "active"
      ).length;
      const adminUsers = filteredUsers.filter((u) => u.role === "admin").length;
      const verifiedUsers = filteredUsers.filter((u) => u.isVerified).length;
      const inactiveUsers = filteredUsers.filter(
        (u) => u.status !== "active"
      ).length;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Users Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; color: #333; }
            .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
            .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 30px 0; }
            .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
            .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 14px; }
            td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
            tr:hover { background: #f9fafb; }
            .badge { padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
            .badge-admin { background: #fee2e2; color: #dc2626; }
            .badge-moderator { background: #f3e8ff; color: #7c3aed; }
            .badge-user { background: #dbeafe; color: #2563eb; }
            .badge-active { background: #dcfce7; color: #16a34a; }
            .badge-inactive { background: #fef9c3; color: #ca8a04; }
            .badge-suspended { background: #fee2e2; color: #dc2626; }
            .badge-verified { background: #dcfce7; color: #16a34a; }
            .badge-unverified { background: #fef9c3; color: #ca8a04; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            .timestamp { font-size: 11px; color: #999; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">User Management Report</div>
            <div class="subtitle">Generated on ${new Date().toLocaleString()}</div>
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">${totalUsers}</div>
              <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${activeUsers}</div>
              <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${adminUsers}</div>
              <div class="stat-label">Admin Users</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${verifiedUsers}</div>
              <div class="stat-label">Verified Users</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Created Date</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUsers
                .map(
                  (user) => `
                <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.phone || "N/A"}</td>
                  <td><span class="badge badge-${
                    user.role
                  }">${user.role.toUpperCase()}</span></td>
                  <td><span class="badge badge-${
                    user.status
                  }">${user.status.toUpperCase()}</span></td>
                  <td><span class="badge badge-${
                    user.isVerified ? "verified" : "unverified"
                  }">${user.isVerified ? "VERIFIED" : "UNVERIFIED"}</span></td>
                  <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>${
                    user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : "Never"
                  }</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="footer">
            <div class="timestamp">Report ID: ${Date.now()}</div>
            <div>Total Records: ${filteredUsers.length}</div>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);

      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  // User Card Component
  const UserCard = React.memo(({ user, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);

    const getRoleBadgeColor = (role) => {
      switch (role) {
        case "admin":
          return "bg-red-100 text-red-800";
        case "moderator":
          return "bg-purple-100 text-purple-800";
        case "user":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const getStatusBadgeColor = (status) => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "inactive":
          return "bg-yellow-100 text-yellow-800";
        case "suspended":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <EmailIcon className="h-4 w-4 mr-1" />
                  {user.email}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertIcon className="h-5 w-5 text-gray-600" />
              </button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => {
                      onEdit(user);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
                  >
                    <EditIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Edit User
                  </button>
                  <button
                    onClick={() => {
                      onDelete(user._id);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-red-600"
                  >
                    <DeleteIcon className="h-4 w-4 mr-2" />
                    Delete User
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                {user.phone || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarTodayIcon className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {user.role.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                user.status
              )}`}
            >
              {user.status.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                user.isVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {user.isVerified ? "VERIFIED" : "UNVERIFIED"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Last login:{" "}
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "Never"}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <EditIcon className="h-4 w-4 text-blue-600" />
              </button>
              <button
                onClick={() => onDelete(user._id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <DeleteIcon className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  });

  // Confirmation Modal
  const ConfirmationModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={() => setShowDeleteConfirm(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <WarningIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {modalTitle}
              </h3>
              <p className="text-gray-600">{modalMessage}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modalCallbackRef.current) modalCallbackRef.current();
                  setShowDeleteConfirm(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Pagination Component
  const Pagination = React.memo(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstUser + 1} to{" "}
          {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-lg font-semibold ${
                currentPage === number
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-2">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="p-4 w-full">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                  User Management Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                  Manage users, roles, and permissions
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleAddUserClick}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <AddIcon className="h-5 w-5 mr-2" />
                  Add New User
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                title: "Total Users",
                value: users.length,
                icon: PersonIcon,
                color: "from-blue-500 to-cyan-500",
                change: "+12%",
              },
              {
                title: "Active Users",
                value: users.filter((u) => u.status === "active").length,
                icon: VerifiedUserIcon,
                color: "from-green-500 to-emerald-500",
                change: "+8%",
              },
              {
                title: "Verified Users",
                value: users.filter((u) => u.isVerified).length,
                icon: CheckCircleIcon,
                color: "from-green-500 to-emerald-500",
                change: "+15%",
              },
              {
                title: "Admin Users",
                value: users.filter((u) => u.role === "admin").length,
                icon: AdminPanelSettingsIcon,
                color: "from-purple-500 to-pink-500",
                change: "+5%",
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.title}</div>
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Users
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by email, ID, name, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                >
                  <option value="">All Roles</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="email">Email A-Z</option>
                  <option value="lastLogin">Last Login</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredUsers.length} users found
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={fetchUsers}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center"
                >
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <PictureAsPdfIcon className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Users Grid */}
          <div className="mb-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={handleAddUserClick}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <AddIcon className="h-5 w-5 mr-2 inline" />
                  Add New User
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentUsers.map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </div>

                <Pagination />
              </>
            )}
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          <UserFormModal
            show={showAddUserModal}
            onClose={handleUserFormClose}
            onSuccess={handleUserFormSuccess}
            isEditMode={isEditMode}
            selectedUser={selectedUser}
          />
          {showDeleteConfirm && <ConfirmationModal />}
        </AnimatePresence>
      </div>
    </div>
  );
};
