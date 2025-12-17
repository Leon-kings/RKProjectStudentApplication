/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const INITIAL_APPLICATION_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  currentEducation: '',
  gpa: '',
  targetUniversity: '',
  targetCountry: '',
  targetProgram: '',
  scholarshipInterest: '',
  intakeYear: '',
  documents: '',
  essay: '',
  additionalInfo: ''
};

// Mock data for demonstration
const MOCK_SCHOLARSHIPS = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    nationality: 'United States',
    currentEducation: 'Bachelor\'s Degree',
    gpa: '3.8',
    targetUniversity: 'Harvard University',
    targetCountry: 'USA',
    targetProgram: 'Computer Science',
    scholarshipInterest: 'Full Scholarship',
    intakeYear: '2024',
    documents: 'Completed',
    essay: 'Submitted',
    additionalInfo: 'Research focus on AI',
    status: 'pending',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+44 1234-567890',
    nationality: 'United Kingdom',
    currentEducation: 'Master\'s Degree',
    gpa: '3.9',
    targetUniversity: 'Oxford University',
    targetCountry: 'UK',
    targetProgram: 'Business Administration',
    scholarshipInterest: 'Partial Scholarship',
    intakeYear: '2024',
    documents: 'Pending',
    essay: 'Submitted',
    additionalInfo: 'Entrepreneurship background',
    status: 'approved',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-14'
  },
  {
    id: 3,
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@example.com',
    phone: '+61 412-345-678',
    nationality: 'Australia',
    currentEducation: 'High School',
    gpa: '4.0',
    targetUniversity: 'University of Melbourne',
    targetCountry: 'Australia',
    targetProgram: 'Medicine',
    scholarshipInterest: 'Merit-based Scholarship',
    intakeYear: '2025',
    documents: 'Completed',
    essay: 'Pending',
    additionalInfo: 'Volunteer experience in healthcare',
    status: 'rejected',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12'
  }
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'under_review', label: 'Under Review', color: 'blue' }
];

const COUNTRY_OPTIONS = [
  'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 
  'China', 'South Korea', 'Netherlands', 'Sweden', 'Switzerland', 'New Zealand'
];

const PROGRAM_OPTIONS = [
  'Computer Science', 'Business Administration', 'Medicine', 'Engineering',
  'Law', 'Psychology', 'Architecture', 'Art & Design', 'Economics',
  'International Relations', 'Environmental Science', 'Data Science'
];

const SCHOLARSHIP_TYPES = [
  'Full Scholarship', 'Partial Scholarship', 'Merit-based Scholarship',
  'Need-based Scholarship', 'Sports Scholarship', 'Research Scholarship'
];

const EDUCATION_LEVELS = [
  'High School', 'Associate Degree', 'Bachelor\'s Degree',
  'Master\'s Degree', 'Doctorate', 'Professional Certificate'
];

export const AdmissionManagement = () => {
  // State management
  const [applications, setApplications] = useState(MOCK_SCHOLARSHIPS);
  const [filteredApplications, setFilteredApplications] = useState(MOCK_SCHOLARSHIPS);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState(INITIAL_APPLICATION_FORM);
  const [errors, setErrors] = useState({});
  
  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  
  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  
  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // success, error, warning, info
  });

  // Filter and sort applications
  useEffect(() => {
    let filtered = [...applications];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.firstName.toLowerCase().includes(term) ||
        app.lastName.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term) ||
        app.targetUniversity.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredApplications(filtered);
    setPage(0);
  }, [applications, searchTerm, statusFilter, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.gpa.trim()) newErrors.gpa = 'GPA is required';
    else if (isNaN(formData.gpa) || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4) {
      newErrors.gpa = 'GPA must be between 0 and 4';
    }
    if (!formData.targetUniversity.trim()) newErrors.targetUniversity = 'Target university is required';
    if (!formData.targetProgram.trim()) newErrors.targetProgram = 'Target program is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditMode && selectedApplication) {
        // Update existing application
        const updatedApplications = applications.map(app =>
          app.id === selectedApplication.id
            ? { 
                ...formData, 
                id: selectedApplication.id, 
                status: selectedApplication.status, 
                updatedAt: new Date().toISOString().split('T')[0],
                createdAt: selectedApplication.createdAt
              }
            : app
        );
        setApplications(updatedApplications);
        
        showNotification('Application updated successfully!', 'success');
      } else {
        // Create new application
        const newApplication = {
          ...formData,
          id: applications.length > 0 ? Math.max(...applications.map(app => app.id)) + 1 : 1,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setApplications(prev => [newApplication, ...prev]);
        
        showNotification('Application created successfully!', 'success');
      }
      
      handleCloseDialog();
      resetForm();
      
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete application
  const handleDelete = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedApplications = applications.filter(
        app => app.id !== selectedApplication.id
      );
      setApplications(updatedApplications);
      
      showNotification('Application deleted successfully!', 'success');
      
      setOpenDeleteDialog(false);
      setSelectedApplication(null);
      
    } catch (error) {
      showNotification('Failed to delete application. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
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
    const statusOption = STATUS_OPTIONS.find(s => s.value === status);
    const colorClass = {
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      red: 'bg-red-100 text-red-800 border-red-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300'
    }[statusOption?.color] || 'bg-gray-100 text-gray-800 border-gray-300';
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
        {statusOption?.label || status}
      </span>
    );
  };

  // Calculate statistics
  const statistics = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  // Paginated data
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

  // Notification component
  const Notification = () => {
    if (!notification.show) return null;
    
    const bgColor = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    }[notification.type];
    
    const icon = {
      success: <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
      error: <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      warning: <WarningIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />,
      info: <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
    }[notification.type];
    
    return (
      <div className={`fixed top-3 sm:top-4 right-3 sm:right-4 z-50 p-3 sm:p-4 rounded-lg border ${bgColor} shadow-lg max-w-xs sm:max-w-md text-sm sm:text-base`}>
        <div className="flex items-start">
          {icon}
          <div className="ml-2 sm:ml-3 flex-1">
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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

  // Form field component for consistency
  const FormField = ({ label, name, type = 'text', required = false, placeholder, value, onChange, error, disabled, children, ...props }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'off'}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
            error 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ErrorIcon className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  // Select field component
  const SelectField = ({ label, name, required = false, value, onChange, options, error, disabled, placeholder = "Select..." }) => (
    <FormField label={label} name={name} required={required} error={error} disabled={disabled}>
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </FormField>
  );

  // Textarea field component
  const TextareaField = ({ label, name, required = false, value, onChange, error, disabled, placeholder, rows = 3 }) => (
    <FormField label={label} name={name} required={required} error={error} disabled={disabled}>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
    </FormField>
  );

  return (
    <div className="p-3 xs:p-4 sm:p-6 bg-gray-50 min-h-screen">
      <Notification />
      
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Scholarship Management</h1>
        <p className="text-xs sm:text-sm text-gray-600">Manage scholarship applications, review submissions, and track applicant progress</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">Total Applications</p>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">{statistics.total}</p>
            </div>
            <BookIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">Pending Review</p>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">{statistics.pending}</p>
            </div>
            <WarningIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">Approved</p>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">{statistics.approved}</p>
            </div>
            <CheckIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">Rejected</p>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">{statistics.rejected}</p>
            </div>
            <CancelIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortConfig({ key: 'createdAt', direction: 'desc' });
              }}
              className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center"
            >
              <RefreshIcon className="h-5 w-5 mr-2" />
              Reset
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <AddIcon className="h-5 w-5 mr-2" />
              New Application
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center">
                    Applicant
                    {sortConfig.key === 'firstName' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Contact
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                  onClick={() => handleSort('targetUniversity')}
                >
                  <div className="flex items-center">
                    University
                    {sortConfig.key === 'targetUniversity' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Program
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Created
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <SchoolIcon className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No applications found</p>
                      <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                      <button
                        onClick={handleCreate}
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        Create New Application
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                          {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                            {app.firstName} {app.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.nationality}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1 lg:hidden">
                            <EmailIcon className="w-4 h-4 mr-1 text-gray-400" />
                            {app.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900 flex items-center">
                        <EmailIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate max-w-[150px]">{app.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {app.phone}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <SchoolIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate max-w-[150px]">{app.targetUniversity}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <LocationIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {app.targetCountry}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-900">{app.targetProgram}</div>
                      <div className="text-xs text-gray-500 mt-1">GPA: {app.gpa}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      <div className="flex items-center">
                        <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {app.createdAt}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
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
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredApplications.length)}</span> of{' '}
                  <span className="font-medium">{filteredApplications.length}</span> applications
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <label htmlFor="rowsPerPage" className="text-sm text-gray-700 mr-2">
                    Rows per page:
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 0}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {(() => {
                    const buttons = [];
                    const maxButtons = window.innerWidth < 640 ? 3 : 5;
                    
                    if (totalPages <= maxButtons) {
                      for (let i = 0; i < totalPages; i++) {
                        buttons.push(
                          <button
                            key={i}
                            onClick={() => handleChangePage(i)}
                            className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                              page === i
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      }
                    } else {
                      // Always show first page
                      buttons.push(
                        <button
                          key={0}
                          onClick={() => handleChangePage(0)}
                          className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                            page === 0
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          1
                        </button>
                      );
                      
                      if (page > 2) {
                        buttons.push(
                          <span key="ellipsis1" className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      
                      // Show pages around current page
                      const start = Math.max(1, page - 1);
                      const end = Math.min(totalPages - 2, page + 1);
                      
                      for (let i = start; i <= end; i++) {
                        buttons.push(
                          <button
                            key={i}
                            onClick={() => handleChangePage(i)}
                            className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                              page === i
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      }
                      
                      if (page < totalPages - 3) {
                        buttons.push(
                          <span key="ellipsis2" className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      
                      // Always show last page
                      buttons.push(
                        <button
                          key={totalPages - 1}
                          onClick={() => handleChangePage(totalPages - 1)}
                          className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                            page === totalPages - 1
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {totalPages}
                        </button>
                      );
                    }
                    
                    return buttons;
                  })()}
                  
                  <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {openDialog && (
        <>
          <ModalBackdrop onClose={handleCloseDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden my-4">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {isEditMode ? 'Edit Scholarship Application' : 'New Scholarship Application'}
                </h2>
                <button
                  onClick={handleCloseDialog}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form onSubmit={handleSubmit} className="space-y-6 text-black">
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
                      autoComplete="given-name"
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
                      autoComplete="family-name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      autoComplete="email"
                    />
                    
                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+250 783 408 617"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      disabled={loading}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      options={COUNTRY_OPTIONS}
                      disabled={loading}
                      placeholder="Select nationality"
                    />
                    
                    <SelectField
                      label="Current Education Level"
                      name="currentEducation"
                      value={formData.currentEducation}
                      onChange={handleInputChange}
                      options={EDUCATION_LEVELS}
                      disabled={loading}
                      placeholder="Select education level"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="GPA"
                      name="gpa"
                      type="number"
                      step="0.1"
                      min="0"
                      max="4"
                      required
                      placeholder="3.8"
                      value={formData.gpa}
                      onChange={handleInputChange}
                      error={errors.gpa}
                      disabled={loading}
                    />
                    
                    <SelectField
                      label="Scholarship Interest"
                      name="scholarshipInterest"
                      value={formData.scholarshipInterest}
                      onChange={handleInputChange}
                      options={SCHOLARSHIP_TYPES}
                      disabled={loading}
                      placeholder="Select scholarship type"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Target University"
                      name="targetUniversity"
                      required
                      placeholder="Harvard University"
                      value={formData.targetUniversity}
                      onChange={handleInputChange}
                      error={errors.targetUniversity}
                      disabled={loading}
                      autoComplete="organization"
                    />
                    
                    <SelectField
                      label="Target Country"
                      name="targetCountry"
                      value={formData.targetCountry}
                      onChange={handleInputChange}
                      options={COUNTRY_OPTIONS}
                      disabled={loading}
                      placeholder="Select target country"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Target Program"
                      name="targetProgram"
                      required
                      value={formData.targetProgram}
                      onChange={handleInputChange}
                      options={PROGRAM_OPTIONS}
                      error={errors.targetProgram}
                      disabled={loading}
                      placeholder="Select program"
                    />
                    
                    <FormField
                      label="Intake Year"
                      name="intakeYear"
                      placeholder="2024"
                      value={formData.intakeYear}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Documents Status
                      </label>
                      <select
                        name="documents"
                        value={formData.documents}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="">Select status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Started">Not Started</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Essay Status
                      </label>
                      <select
                        name="essay"
                        value={formData.essay}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="">Select status</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Required">Not Required</option>
                      </select>
                    </div>
                  </div>

                  <TextareaField
                    label="Additional Information"
                    name="additionalInfo"
                    placeholder="Any additional information about the applicant, research interests, achievements, etc."
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    disabled={loading}
                    rows={4}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isEditMode ? 'Updating...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <SaveIcon className="h-5 w-5 mr-2" />
                        {isEditMode ? 'Update Application' : 'Submit Application'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {openViewDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden my-4">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={handleCloseViewDialog}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="space-y-6">
                  {/* Applicant Header */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedApplication.firstName.charAt(0)}{selectedApplication.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {selectedApplication.firstName} {selectedApplication.lastName}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
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
                          {selectedApplication.nationality}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status and Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Application Dates</h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <DateIcon className="w-4 h-4 mr-2 text-gray-400" />
                          Created: {selectedApplication.createdAt}
                        </div>
                        <div className="flex items-center text-sm">
                          <RefreshIcon className="w-4 h-4 mr-2 text-gray-400" />
                          Last Updated: {selectedApplication.updatedAt}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Academic Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <SchoolIcon className="w-5 h-5 mr-2 text-blue-500" />
                      Academic Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Education</p>
                        <p className="font-medium">{selectedApplication.currentEducation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GPA</p>
                        <p className="font-medium">{selectedApplication.gpa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Target University</p>
                        <p className="font-medium">{selectedApplication.targetUniversity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Target Country</p>
                        <p className="font-medium">{selectedApplication.targetCountry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Target Program</p>
                        <p className="font-medium">{selectedApplication.targetProgram}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scholarship Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <FlagIcon className="w-5 h-5 mr-2 text-green-500" />
                      Scholarship Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Scholarship Interest</p>
                        <p className="font-medium">{selectedApplication.scholarshipInterest}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Intake Year</p>
                        <p className="font-medium">{selectedApplication.intakeYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Documents Status</p>
                        <p className={`font-medium ${
                          selectedApplication.documents === 'Completed' ? 'text-green-600' :
                          selectedApplication.documents === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          {selectedApplication.documents}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Essay Status</p>
                        <p className={`font-medium ${
                          selectedApplication.essay === 'Submitted' ? 'text-green-600' :
                          selectedApplication.essay === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          {selectedApplication.essay}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  {selectedApplication.additionalInfo && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <DescriptionIcon className="w-5 h-5 mr-2 text-purple-500" />
                        Additional Information
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">{selectedApplication.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedApplication);
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  >
                    <EditIcon className="h-5 w-5 mr-2" />
                    Edit Application
                  </button>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && selectedApplication && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <WarningIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Application
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete the application for{' '}
                  <span className="font-semibold text-gray-900">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </span>? This action cannot be undone.
                </p>
                
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> Deleting this application will remove all associated data including documents and notes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`px-4 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg'
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="h-5 w-5 mr-2" />
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