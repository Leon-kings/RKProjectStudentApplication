// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import {
//   Search as SearchIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Download as DownloadIcon,
//   FilterList as FilterIcon,
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
//   Person as PersonIcon,
//   Book as BookIcon,
//   Flag as FlagIcon,
//   DateRange as DateIcon,
//   AttachFile as AttachFileIcon,
//   Description as DescriptionIcon,
//   MoreVert as MoreVertIcon
// } from '@mui/icons-material';

// const INITIAL_APPLICATION_FORM = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   nationality: '',
//   currentEducation: '',
//   gpa: '',
//   targetUniversity: '',
//   targetCountry: '',
//   targetProgram: '',
//   scholarshipInterest: '',
//   intakeYear: '',
//   documents: '',
//   essay: '',
//   additionalInfo: ''
// };

// // Mock data for demonstration
// const MOCK_SCHOLARSHIPS = [
//   {
//     id: 1,
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '+1 234-567-8900',
//     nationality: 'United States',
//     currentEducation: 'Bachelor\'s Degree',
//     gpa: '3.8',
//     targetUniversity: 'Harvard University',
//     targetCountry: 'USA',
//     targetProgram: 'Computer Science',
//     scholarshipInterest: 'Full Scholarship',
//     intakeYear: '2024',
//     documents: 'Completed',
//     essay: 'Submitted',
//     additionalInfo: 'Research focus on AI',
//     status: 'pending',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-16'
//   },
//   {
//     id: 2,
//     firstName: 'Jane',
//     lastName: 'Smith',
//     email: 'jane.smith@example.com',
//     phone: '+44 1234-567890',
//     nationality: 'United Kingdom',
//     currentEducation: 'Master\'s Degree',
//     gpa: '3.9',
//     targetUniversity: 'Oxford University',
//     targetCountry: 'UK',
//     targetProgram: 'Business Administration',
//     scholarshipInterest: 'Partial Scholarship',
//     intakeYear: '2024',
//     documents: 'Pending',
//     essay: 'Submitted',
//     additionalInfo: 'Entrepreneurship background',
//     status: 'approved',
//     createdAt: '2024-01-10',
//     updatedAt: '2024-01-14'
//   },
//   {
//     id: 3,
//     firstName: 'Alex',
//     lastName: 'Johnson',
//     email: 'alex.j@example.com',
//     phone: '+61 412-345-678',
//     nationality: 'Australia',
//     currentEducation: 'High School',
//     gpa: '4.0',
//     targetUniversity: 'University of Melbourne',
//     targetCountry: 'Australia',
//     targetProgram: 'Medicine',
//     scholarshipInterest: 'Merit-based Scholarship',
//     intakeYear: '2025',
//     documents: 'Completed',
//     essay: 'Pending',
//     additionalInfo: 'Volunteer experience in healthcare',
//     status: 'rejected',
//     createdAt: '2024-01-05',
//     updatedAt: '2024-01-12'
//   }
// ];

// const STATUS_OPTIONS = [
//   { value: 'pending', label: 'Pending', color: 'yellow' },
//   { value: 'approved', label: 'Approved', color: 'green' },
//   { value: 'rejected', label: 'Rejected', color: 'red' },
//   { value: 'under_review', label: 'Under Review', color: 'blue' }
// ];

// const COUNTRY_OPTIONS = [
//   'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore',
//   'China', 'South Korea', 'Netherlands', 'Sweden', 'Switzerland', 'New Zealand'
// ];

// const PROGRAM_OPTIONS = [
//   'Computer Science', 'Business Administration', 'Medicine', 'Engineering',
//   'Law', 'Psychology', 'Architecture', 'Art & Design', 'Economics',
//   'International Relations', 'Environmental Science', 'Data Science'
// ];

// const SCHOLARSHIP_TYPES = [
//   'Full Scholarship', 'Partial Scholarship', 'Merit-based Scholarship',
//   'Need-based Scholarship', 'Sports Scholarship', 'Research Scholarship'
// ];

// const EDUCATION_LEVELS = [
//   'High School', 'Associate Degree', 'Bachelor\'s Degree',
//   'Master\'s Degree', 'Doctorate', 'Professional Certificate'
// ];

// export const ScholarshipManagement = () => {
//   // State management
//   const [applications, setApplications] = useState(MOCK_SCHOLARSHIPS);
//   const [filteredApplications, setFilteredApplications] = useState(MOCK_SCHOLARSHIPS);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
//   const [errors, setErrors] = useState({});

//   // UI state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   // Modal states
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openViewDialog, setOpenViewDialog] = useState(false);

//   // Notification states
//   const [notification, setNotification] = useState({
//     show: false,
//     message: '',
//     type: 'success' // success, error, warning, info
//   });

//   // Filter and sort applications
//   useEffect(() => {
//     let filtered = [...applications];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(app =>
//         app.firstName.toLowerCase().includes(term) ||
//         app.lastName.toLowerCase().includes(term) ||
//         app.email.toLowerCase().includes(term) ||
//         app.targetUniversity.toLowerCase().includes(term)
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(app => app.status === statusFilter);
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setFilteredApplications(filtered);
//     setPage(0);
//   }, [applications, searchTerm, statusFilter, sortConfig]);

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//     }
//     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
//     if (!formData.gpa.trim()) newErrors.gpa = 'GPA is required';
//     else if (isNaN(formData.gpa) || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4) {
//       newErrors.gpa = 'GPA must be between 0 and 4';
//     }
//     if (!formData.targetUniversity.trim()) newErrors.targetUniversity = 'Target university is required';
//     if (!formData.targetProgram.trim()) newErrors.targetProgram = 'Target program is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission (Create/Update)
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       showNotification('Please fix the errors in the form', 'error');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       if (isEditMode && selectedApplication) {
//         // Update existing application
//         const updatedApplications = applications.map(app =>
//           app.id === selectedApplication.id
//             ? {
//                 ...formData,
//                 id: selectedApplication.id,
//                 status: selectedApplication.status,
//                 updatedAt: new Date().toISOString().split('T')[0],
//                 createdAt: selectedApplication.createdAt
//               }
//             : app
//         );
//         setApplications(updatedApplications);

//         showNotification('Application updated successfully!', 'success');
//       } else {
//         // Create new application
//         const newApplication = {
//           ...formData,
//           id: applications.length > 0 ? Math.max(...applications.map(app => app.id)) + 1 : 1,
//           status: 'pending',
//           createdAt: new Date().toISOString().split('T')[0],
//           updatedAt: new Date().toISOString().split('T')[0]
//         };
//         setApplications(prev => [newApplication, ...prev]);

//         showNotification('Application created successfully!', 'success');
//       }

//       handleCloseDialog();
//       resetForm();

//     } catch (error) {
//       showNotification('An error occurred. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete application
//   const handleDelete = async () => {
//     setLoading(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800));

//       const updatedApplications = applications.filter(
//         app => app.id !== selectedApplication.id
//       );
//       setApplications(updatedApplications);

//       showNotification('Application deleted successfully!', 'success');

//       setOpenDeleteDialog(false);
//       setSelectedApplication(null);

//     } catch (error) {
//       showNotification('Failed to delete application. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show notification
//   const showNotification = (message, type = 'success') => {
//     setNotification({
//       show: true,
//       message,
//       type
//     });

//     // Auto hide after 3 seconds
//     setTimeout(() => {
//       setNotification(prev => ({ ...prev, show: false }));
//     }, 3000);
//   };

//   // Open edit dialog
//   const handleEdit = (application) => {
//     setSelectedApplication(application);
//     setFormData(application);
//     setIsEditMode(true);
//     setOpenDialog(true);
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

//   // Close all dialogs
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedApplication(null);
//     setIsEditMode(false);
//   };

//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//     setSelectedApplication(null);
//   };

//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setSelectedApplication(null);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData(INITIAL_APPLICATION_FORM);
//     setErrors({});
//   };

//   // Handle pagination
//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };

//   // Get status badge
//   const getStatusBadge = (status) => {
//     const statusOption = STATUS_OPTIONS.find(s => s.value === status);
//     const colorClass = {
//       yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//       green: 'bg-green-100 text-green-800 border-green-300',
//       red: 'bg-red-100 text-red-800 border-red-300',
//       blue: 'bg-blue-100 text-blue-800 border-blue-300'
//     }[statusOption?.color] || 'bg-gray-100 text-gray-800 border-gray-300';

//     return (
//       <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
//         {statusOption?.label || status}
//       </span>
//     );
//   };

//   // Calculate statistics
//   const statistics = {
//     total: applications.length,
//     pending: applications.filter(app => app.status === 'pending').length,
//     approved: applications.filter(app => app.status === 'approved').length,
//     rejected: applications.filter(app => app.status === 'rejected').length
//   };

//   // Paginated data
//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

//   // Notification component
//   const Notification = () => {
//     if (!notification.show) return null;

//     const bgColor = {
//       success: 'bg-green-50 border-green-200 text-green-800',
//       error: 'bg-red-50 border-red-200 text-red-800',
//       warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
//       info: 'bg-blue-50 border-blue-200 text-blue-800'
//     }[notification.type];

//     const icon = {
//       success: <CheckIcon className="w-5 h-5 text-green-500" />,
//       error: <ErrorIcon className="w-5 h-5 text-red-500" />,
//       warning: <WarningIcon className="w-5 h-5 text-yellow-500" />,
//       info: <InfoIcon className="w-5 h-5 text-blue-500" />
//     }[notification.type];

//     return (
//       <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md`}>
//         <div className="flex items-start">
//           {icon}
//           <div className="ml-3 flex-1">
//             <p className="text-sm font-medium">{notification.message}</p>
//           </div>
//           <button
//             onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//             className="ml-4 text-gray-400 hover:text-gray-600"
//           >
//             <CloseIcon className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Modal backdrop
//   const ModalBackdrop = ({ onClose }) => (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//       onClick={onClose}
//     />
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <Notification />

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Management</h1>
//         <p className="text-gray-600">Manage scholarship applications, review submissions, and track applicant progress</p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium opacity-90">Total Applications</p>
//               <p className="text-3xl font-bold mt-2">{statistics.total}</p>
//             </div>
//             <BookIcon className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium opacity-90">Pending Review</p>
//               <p className="text-3xl font-bold mt-2">{statistics.pending}</p>
//             </div>
//             <WarningIcon className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium opacity-90">Approved</p>
//               <p className="text-3xl font-bold mt-2">{statistics.approved}</p>
//             </div>
//             <CheckIcon className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium opacity-90">Rejected</p>
//               <p className="text-3xl font-bold mt-2">{statistics.rejected}</p>
//             </div>
//             <CancelIcon className="w-10 h-10 opacity-80" />
//           </div>
//         </div>
//       </div>

//       {/* Action Bar */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search applications..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               />
//             </div>
//           </div>

//           <div className="w-full md:w-64">
//             <div className="relative">
//               <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
//               >
//                 <option value="all">All Status</option>
//                 {STATUS_OPTIONS.map((status) => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setStatusFilter('all');
//                 setSortConfig({ key: 'createdAt', direction: 'desc' });
//               }}
//               className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               <RefreshIcon className="w-5 h-5 mr-2" />
//               Reset
//             </button>
//           </div>

//           <div>
//             <button
//               onClick={handleCreate}
//               className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md"
//             >
//               <AddIcon className="w-5 h-5 mr-2" />
//               New Application
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Applications Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   onClick={() => handleSort('firstName')}
//                 >
//                   <div className="flex items-center">
//                     Applicant
//                     {sortConfig.key === 'firstName' && (
//                       <span className="ml-1">
//                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   onClick={() => handleSort('targetUniversity')}
//                 >
//                   <div className="flex items-center">
//                     University
//                     {sortConfig.key === 'targetUniversity' && (
//                       <span className="ml-1">
//                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Program
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <div className="flex flex-col items-center">
//                       <SchoolIcon className="w-12 h-12 text-gray-300 mb-4" />
//                       <p className="text-lg font-medium">No applications found</p>
//                       <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
//                       <button
//                         onClick={handleCreate}
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                       >
//                         Create New Application
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedApplications.map((app) => (
//                   <tr key={app.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
//                           {app.firstName.charAt(0)}{app.lastName.charAt(0)}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {app.firstName} {app.lastName}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {app.nationality}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         <EmailIcon className="w-4 h-4 mr-2 text-gray-400" />
//                         {app.email}
//                       </div>
//                       <div className="text-sm text-gray-500 flex items-center mt-1">
//                         <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
//                         {app.phone}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm font-medium text-gray-900 flex items-center">
//                         <SchoolIcon className="w-4 h-4 mr-2 text-gray-400" />
//                         {app.targetUniversity}
//                       </div>
//                       <div className="text-sm text-gray-500 flex items-center mt-1">
//                         <LocationIcon className="w-4 h-4 mr-2 text-gray-400" />
//                         {app.targetCountry}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">{app.targetProgram}</div>
//                       <div className="text-xs text-gray-500 mt-1">GPA: {app.gpa}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(app.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
//                         {app.createdAt}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => handleView(app)}
//                           className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
//                           title="View Details"
//                         >
//                           <ViewIcon className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleEdit(app)}
//                           className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
//                           title="Edit"
//                         >
//                           <EditIcon className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(app)}
//                           className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
//                           title="Delete"
//                         >
//                           <DeleteIcon className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {paginatedApplications.length > 0 && (
//           <div className="px-6 py-4 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="flex items-center">
//                 <span className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
//                   <span className="font-medium">{Math.min(endIndex, filteredApplications.length)}</span> of{' '}
//                   <span className="font-medium">{filteredApplications.length}</span> applications
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <label htmlFor="rowsPerPage" className="text-sm text-gray-700 mr-2">
//                     Rows per page:
//                   </label>
//                   <select
//                     id="rowsPerPage"
//                     value={rowsPerPage}
//                     onChange={handleChangeRowsPerPage}
//                     className="border border-gray-300 rounded px-2 py-1 text-sm"
//                   >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handleChangePage(page - 1)}
//                     disabled={page === 0}
//                     className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     Previous
//                   </button>

//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i;
//                     } else if (page < 3) {
//                       pageNum = i;
//                     } else if (page > totalPages - 4) {
//                       pageNum = totalPages - 5 + i;
//                     } else {
//                       pageNum = page - 2 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handleChangePage(pageNum)}
//                         className={`px-3 py-1 border text-sm rounded ${
//                           page === pageNum
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         {pageNum + 1}
//                       </button>
//                     );
//                   })}

//                   <button
//                     onClick={() => handleChangePage(page + 1)}
//                     disabled={page >= totalPages - 1}
//                     className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Modal */}
//       {openDialog && (
//         <>
//           <ModalBackdrop onClose={handleCloseDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {isEditMode ? 'Edit Application' : 'Create New Application'}
//                 </h2>
//                 <button
//                   onClick={handleCloseDialog}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <CloseIcon className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
//                 <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Personal Information */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900 flex items-center">
//                         <PersonIcon className="w-5 h-5 mr-2 text-blue-500" />
//                         Personal Information
//                       </h3>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           First Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.firstName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter first name"
//                         />
//                         {errors.firstName && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.firstName}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Last Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.lastName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter last name"
//                         />
//                         {errors.lastName && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.lastName}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Email *
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.email ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter email address"
//                         />
//                         {errors.email && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.email}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone Number *
//                         </label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.phone ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter phone number"
//                         />
//                         {errors.phone && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.phone}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Nationality
//                         </label>
//                         <select
//                           name="nationality"
//                           value={formData.nationality}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Nationality</option>
//                           {COUNTRY_OPTIONS.map(country => (
//                             <option key={country} value={country}>{country}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Academic Information */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900 flex items-center">
//                         <BookIcon className="w-5 h-5 mr-2 text-green-500" />
//                         Academic Information
//                       </h3>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Current Education Level
//                         </label>
//                         <select
//                           name="currentEducation"
//                           value={formData.currentEducation}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Education Level</option>
//                           {EDUCATION_LEVELS.map(level => (
//                             <option key={level} value={level}>{level}</option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           GPA *
//                         </label>
//                         <input
//                           type="number"
//                           step="0.1"
//                           min="0"
//                           max="4"
//                           name="gpa"
//                           value={formData.gpa}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.gpa ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter GPA (0.0 - 4.0)"
//                         />
//                         {errors.gpa && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.gpa}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Target University *
//                         </label>
//                         <input
//                           type="text"
//                           name="targetUniversity"
//                           value={formData.targetUniversity}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.targetUniversity ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Enter target university"
//                         />
//                         {errors.targetUniversity && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.targetUniversity}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Target Country
//                         </label>
//                         <select
//                           name="targetCountry"
//                           value={formData.targetCountry}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Country</option>
//                           {COUNTRY_OPTIONS.map(country => (
//                             <option key={country} value={country}>{country}</option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Target Program *
//                         </label>
//                         <select
//                           name="targetProgram"
//                           value={formData.targetProgram}
//                           onChange={handleInputChange}
//                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                             errors.targetProgram ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Select Program</option>
//                           {PROGRAM_OPTIONS.map(program => (
//                             <option key={program} value={program}>{program}</option>
//                           ))}
//                         </select>
//                         {errors.targetProgram && (
//                           <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <ErrorIcon className="w-4 h-4 mr-1" />
//                             {errors.targetProgram}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Scholarship Details */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900 flex items-center">
//                         <FlagIcon className="w-5 h-5 mr-2 text-purple-500" />
//                         Scholarship Details
//                       </h3>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Scholarship Interest
//                         </label>
//                         <select
//                           name="scholarshipInterest"
//                           value={formData.scholarshipInterest}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Scholarship Type</option>
//                           {SCHOLARSHIP_TYPES.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Intake Year
//                         </label>
//                         <input
//                           type="text"
//                           name="intakeYear"
//                           value={formData.intakeYear}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                           placeholder="e.g., 2024"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Documents Status
//                         </label>
//                         <select
//                           name="documents"
//                           value={formData.documents}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Status</option>
//                           <option value="Completed">Completed</option>
//                           <option value="Pending">Pending</option>
//                           <option value="Not Started">Not Started</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Essay Status
//                         </label>
//                         <select
//                           name="essay"
//                           value={formData.essay}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="">Select Status</option>
//                           <option value="Submitted">Submitted</option>
//                           <option value="Pending">Pending</option>
//                           <option value="Not Required">Not Required</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Additional Information */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900 flex items-center">
//                         <DescriptionIcon className="w-5 h-5 mr-2 text-orange-500" />
//                         Additional Information
//                       </h3>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Additional Information
//                         </label>
//                         <textarea
//                           name="additionalInfo"
//                           value={formData.additionalInfo}
//                           onChange={handleInputChange}
//                           rows="6"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
//                           placeholder="Enter any additional information about the applicant..."
//                         />
//                       </div>

//                       <div className="flex items-center text-sm text-gray-500">
//                         <AttachFileIcon className="w-4 h-4 mr-2" />
//                         <span>Upload documents feature would be implemented separately</span>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>

//               <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={handleCloseDialog}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       {isEditMode ? 'Updating...' : 'Creating...'}
//                     </>
//                   ) : (
//                     <>
//                       <SaveIcon className="w-5 h-5 mr-2" />
//                       {isEditMode ? 'Update Application' : 'Create Application'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* View Modal */}
//       {openViewDialog && selectedApplication && (
//         <>
//           <ModalBackdrop onClose={handleCloseViewDialog} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Application Details
//                 </h2>
//                 <button
//                   onClick={handleCloseViewDialog}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <CloseIcon className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
//                 <div className="space-y-6">
//                   {/* Applicant Header */}
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                       {selectedApplication.firstName.charAt(0)}{selectedApplication.lastName.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900">
//                         {selectedApplication.firstName} {selectedApplication.lastName}
//                       </h3>
//                       <div className="flex items-center space-x-4 mt-1">
//                         <div className="flex items-center text-gray-600">
//                           <EmailIcon className="w-4 h-4 mr-2" />
//                           {selectedApplication.email}
//                         </div>
//                         <div className="flex items-center text-gray-600">
//                           <PhoneIcon className="w-4 h-4 mr-2" />
//                           {selectedApplication.phone}
//                         </div>
//                         <div className="flex items-center text-gray-600">
//                           <FlagIcon className="w-4 h-4 mr-2" />
//                           {selectedApplication.nationality}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Status and Dates */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
//                       {getStatusBadge(selectedApplication.status)}
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 mb-2">Application Dates</h4>
//                       <div className="space-y-1">
//                         <div className="flex items-center text-sm">
//                           <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
//                           Created: {selectedApplication.createdAt}
//                         </div>
//                         <div className="flex items-center text-sm">
//                           <RefreshIcon className="w-4 h-4 mr-2 text-gray-400" />
//                           Last Updated: {selectedApplication.updatedAt}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Academic Information */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
//                       <SchoolIcon className="w-5 h-5 mr-2 text-blue-500" />
//                       Academic Information
//                     </h4>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500">Current Education</p>
//                         <p className="font-medium">{selectedApplication.currentEducation}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">GPA</p>
//                         <p className="font-medium">{selectedApplication.gpa}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Target University</p>
//                         <p className="font-medium">{selectedApplication.targetUniversity}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Target Country</p>
//                         <p className="font-medium">{selectedApplication.targetCountry}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Target Program</p>
//                         <p className="font-medium">{selectedApplication.targetProgram}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Scholarship Details */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
//                       <FlagIcon className="w-5 h-5 mr-2 text-green-500" />
//                       Scholarship Details
//                     </h4>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500">Scholarship Interest</p>
//                         <p className="font-medium">{selectedApplication.scholarshipInterest}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Intake Year</p>
//                         <p className="font-medium">{selectedApplication.intakeYear}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Documents Status</p>
//                         <p className={`font-medium ${
//                           selectedApplication.documents === 'Completed' ? 'text-green-600' :
//                           selectedApplication.documents === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
//                         }`}>
//                           {selectedApplication.documents}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Essay Status</p>
//                         <p className={`font-medium ${
//                           selectedApplication.essay === 'Submitted' ? 'text-green-600' :
//                           selectedApplication.essay === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
//                         }`}>
//                           {selectedApplication.essay}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Information */}
//                   {selectedApplication.additionalInfo && (
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
//                         <DescriptionIcon className="w-5 h-5 mr-2 text-purple-500" />
//                         Additional Information
//                       </h4>
//                       <p className="text-gray-700 whitespace-pre-line">{selectedApplication.additionalInfo}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
//                 <div>
//                   <button
//                     onClick={() => {
//                       handleCloseViewDialog();
//                       handleEdit(selectedApplication);
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center"
//                   >
//                     <EditIcon className="w-5 h-5 mr-2" />
//                     Edit Application
//                   </button>
//                 </div>
//                 <button
//                   onClick={handleCloseViewDialog}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Close
//                 </button>
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
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
//                   <WarningIcon className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
//                   Delete Application
//                 </h3>
//                 <p className="text-gray-500 text-center mb-6">
//                   Are you sure you want to delete the application for{' '}
//                   <span className="font-semibold text-gray-900">
//                     {selectedApplication.firstName} {selectedApplication.lastName}
//                   </span>? This action cannot be undone.
//                 </p>

//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                   <div className="flex">
//                     <ErrorIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//                     <div className="ml-3">
//                       <p className="text-sm text-red-700">
//                         <strong>Warning:</strong> Deleting this application will remove all associated data including documents and notes.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseDeleteDialog}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     disabled={loading}
//                     className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                         Deleting...
//                       </>
//                     ) : (
//                       <>
//                         <DeleteIcon className="w-5 h-5 mr-2" />
//                         Delete Application
//                       </>
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
const API_BASE_URL = "http://localhost:3000/api/scholarships";
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
        // Transform API data to match our application structure
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

    // Apply search filter
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

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Apply sorting
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

    // Clear error for this field
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

  // Handle form submission (Create/Update)
  const handleSubmit = async () => {
    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      // Prepare API data
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
        // Update existing application
        response = await fetch(`${API_BASE_URL}/${selectedApplication.id}`, {
          method: "PUT",
          headers: API_CONFIG.headers,
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          showNotification("Application updated successfully!", "success");
          fetchApplications(); // Refresh the list
        } else {
          throw new Error("Failed to update application");
        }
      } else {
        // Create new application
        response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: API_CONFIG.headers,
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          showNotification("Application created successfully!", "success");
          fetchApplications(); // Refresh the list
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
        fetchApplications(); // Refresh the list
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
        fetchApplications(); // Refresh the list
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
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
        green: "bg-green-100 text-green-800 border-green-300",
        red: "bg-red-100 text-red-800 border-red-300",
        blue: "bg-blue-100 text-blue-800 border-blue-300",
        gray: "bg-gray-100 text-gray-800 border-gray-300",
      }[statusOption?.color] || "bg-gray-100 text-gray-800 border-gray-300";

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
      <div className="flex space-x-1 mt-2">
        {application.status !== "approved" &&
          application.status !== "Approved" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "approved")}
              className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
              title="Approve"
            >
              Approve
            </button>
          )}
        {application.status !== "rejected" &&
          application.status !== "Rejected" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "rejected")}
              className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
              title="Reject"
            >
              Reject
            </button>
          )}
        {application.status !== "pending" &&
          application.status !== "Submitted" && (
            <button
              onClick={() => handleStatusUpdate(application.id, "pending")}
              className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
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
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    }[notification.type];

    const icon = {
      success: <CheckIcon className="w-5 h-5 text-green-500" />,
      error: <ErrorIcon className="w-5 h-5 text-red-500" />,
      warning: <WarningIcon className="w-5 h-5 text-yellow-500" />,
      info: <InfoIcon className="w-5 h-5 text-blue-500" />,
    }[notification.type];

    return (
      <div
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md`}
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

  // Loading indicator
  if (apiLoading && applications.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading scholarship applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex bg-gray-50 min-h-screen">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="w-full p-2">
        <Notification />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Scholarship Management
          </h1>
          <p className="text-gray-600">
            Manage scholarship applications, review submissions, and track
            applicant progress
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">
                  Total Applications
                </p>
                <p className="text-3xl font-bold mt-2">{statistics.total}</p>
              </div>
              <BookIcon className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Pending Review</p>
                <p className="text-3xl font-bold mt-2">{statistics.pending}</p>
              </div>
              <WarningIcon className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Approved</p>
                <p className="text-3xl font-bold mt-2">{statistics.approved}</p>
              </div>
              <CheckIcon className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Rejected</p>
                <p className="text-3xl font-bold mt-2">{statistics.rejected}</p>
              </div>
              <CancelIcon className="w-10 h-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="relative">
                <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
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
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                title="Refresh data"
              >
                <RefreshIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setSortConfig({ key: "createdAt", direction: "desc" });
                }}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>

            <div>
              <button
                onClick={handleCreate}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md"
              >
                <AddIcon className="w-5 h-5 mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Created
                      {sortConfig.key === "createdAt" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedApplications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
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
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Create New Application
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                            {app.firstName?.charAt(0) || "A"}
                            {app.lastName?.charAt(0) || "P"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.nationality || "Not specified"}
                            </div>
                            {app.applicationId && (
                              <div className="text-xs text-gray-400 mt-1">
                                ID: {app.applicationId}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <EmailIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {app.email || "No email"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {app.phone || "No phone"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <SchoolIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {app.targetUniversity || "Not specified"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <LocationIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {app.targetCountry || "Not specified"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {app.targetProgram || "Not specified"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          GPA: {app.gpa || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {getStatusBadge(app.status)}
                          <StatusUpdateButtons application={app} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {app.createdAt || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleView(app)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <ViewIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(app)}
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                            title="Edit"
                          >
                            <EditIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(app)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
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
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
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

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <label
                      htmlFor="rowsPerPage"
                      className="text-sm text-gray-700 mr-2"
                    >
                      Rows per page:
                    </label>
                    <select
                      id="rowsPerPage"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
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
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
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
                        <button
                          key={pageNum}
                          onClick={() => handleChangePage(pageNum)}
                          className={`px-3 py-1 border text-sm rounded ${
                            page === pageNum
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handleChangePage(page + 1)}
                      disabled={page >= totalPages - 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {openDialog && (
        <>
          <ModalBackdrop onClose={handleCloseDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditMode ? "Edit Application" : "Create New Application"}
                </h2>
                <button
                  onClick={handleCloseDialog}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <PersonIcon className="w-5 h-5 mr-2 text-blue-500" />
                        Personal Information
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Nationality</option>
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <BookIcon className="w-5 h-5 mr-2 text-green-500" />
                        Academic Information
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Education Level
                        </label>
                        <select
                          name="currentEducation"
                          value={formData.currentEducation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Education Level</option>
                          {EDUCATION_LEVELS.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.gpa ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter GPA (0.0 - 4.0)"
                        />
                        {errors.gpa && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.gpa}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target University *
                        </label>
                        <input
                          type="text"
                          name="targetUniversity"
                          value={formData.targetUniversity}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                            errors.targetUniversity
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter target university"
                        />
                        {errors.targetUniversity && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.targetUniversity}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Country
                        </label>
                        <select
                          name="targetCountry"
                          value={formData.targetCountry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Program *
                        </label>
                        <select
                          name="targetProgram"
                          value={formData.targetProgram}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
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
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.targetProgram}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Scholarship Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FlagIcon className="w-5 h-5 mr-2 text-purple-500" />
                        Scholarship Details
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scholarship Interest
                        </label>
                        <select
                          name="scholarshipInterest"
                          value={formData.scholarshipInterest}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Intake Year
                        </label>
                        <input
                          type="text"
                          name="intakeYear"
                          value={formData.intakeYear}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., 2024"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Documents Status
                        </label>
                        <select
                          name="documents"
                          value={formData.documents}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Status</option>
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Not Started">Not Started</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Essay Status
                        </label>
                        <select
                          name="essay"
                          value={formData.essay}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Status</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Pending">Pending</option>
                          <option value="Not Required">Not Required</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <DescriptionIcon className="w-5 h-5 mr-2 text-orange-500" />
                        Additional Information
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          rows="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          placeholder="Enter any additional information about the applicant..."
                        />
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <AttachFileIcon className="w-4 h-4 mr-2" />
                        <span>
                          Upload documents feature would be implemented
                          separately
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <SaveIcon className="w-5 h-5 mr-2" />
                      {isEditMode ? "Update Application" : "Create Application"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {openViewDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={handleCloseViewDialog}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="space-y-6">
                  {/* Applicant Header */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedApplication.firstName?.charAt(0) || "A"}
                      {selectedApplication.lastName?.charAt(0) || "P"}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedApplication.firstName}{" "}
                        {selectedApplication.lastName}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-gray-600">
                          <EmailIcon className="w-4 h-4 mr-2" />
                          {selectedApplication.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {selectedApplication.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FlagIcon className="w-4 h-4 mr-2" />
                          {selectedApplication.nationality || "Not specified"}
                        </div>
                      </div>
                      {selectedApplication.applicationId && (
                        <div className="text-sm text-gray-500 mt-2">
                          Application ID: {selectedApplication.applicationId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status and Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Status
                      </h4>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Application Dates
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
                          Created: {selectedApplication.createdAt || "N/A"}
                        </div>
                        <div className="flex items-center text-sm">
                          <RefreshIcon className="w-4 h-4 mr-2 text-gray-400" />
                          Last Updated: {selectedApplication.updatedAt || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <SchoolIcon className="w-5 h-5 mr-2 text-blue-500" />
                      Academic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Current Education
                        </p>
                        <p className="font-medium">
                          {selectedApplication.currentEducation ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GPA</p>
                        <p className="font-medium">
                          {selectedApplication.gpa || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Target University
                        </p>
                        <p className="font-medium">
                          {selectedApplication.targetUniversity ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Target Country</p>
                        <p className="font-medium">
                          {selectedApplication.targetCountry || "Not specified"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Target Program</p>
                        <p className="font-medium">
                          {selectedApplication.targetProgram || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <FlagIcon className="w-5 h-5 mr-2 text-green-500" />
                      Scholarship Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Scholarship Interest
                        </p>
                        <p className="font-medium">
                          {selectedApplication.scholarshipInterest ||
                            "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Intake Year</p>
                        <p className="font-medium">
                          {selectedApplication.intakeYear || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Documents Status
                        </p>
                        <p
                          className={`font-medium ${
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
                        <p className="text-sm text-gray-500">Essay Status</p>
                        <p
                          className={`font-medium ${
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
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <DescriptionIcon className="w-5 h-5 mr-2 text-purple-500" />
                        Additional Information
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {selectedApplication.additionalInfo}
                      </p>
                    </div>
                  )}

                  {/* Status Update Section */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Update Status
                    </h4>
                    <div className="flex space-x-2">
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
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Approve Application
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
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Reject Application
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
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                          >
                            Mark as Pending
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                <div>
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedApplication);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center"
                  >
                    <EditIcon className="w-5 h-5 mr-2" />
                    Edit Application
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCloseViewDialog}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <WarningIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                  Delete Application
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to delete the application for{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedApplication.firstName}{" "}
                    {selectedApplication.lastName}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> Deleting this application will
                        remove all associated data including documents and
                        notes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="w-5 h-5 mr-2" />
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
