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
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  Payment as PaymentIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon
} from '@mui/icons-material';

const INITIAL_BOOKING_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  university: '',
  course: '',
  arrivalDate: '',
  departureDate: '',
  numberOfOccupants: '1',
  preferredPayment: '',
  specialRequirements: ''
};

// Mock data for demonstration
const MOCK_BOOKINGS = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+250 783 408 617',
    university: 'University of Rwanda',
    course: 'Computer Science',
    arrivalDate: '2024-03-15',
    departureDate: '2024-06-15',
    numberOfOccupants: '2',
    preferredPayment: 'bank_transfer',
    specialRequirements: 'Need ground floor due to accessibility needs',
    status: 'pending',
    totalAmount: '1200',
    currency: 'USD',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    bookingReference: 'BOOK-001'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+250 788 123 456',
    university: 'Kigali Institute of Science',
    course: 'Business Administration',
    arrivalDate: '2024-02-01',
    departureDate: '2024-05-01',
    numberOfOccupants: '1',
    preferredPayment: 'credit_card',
    specialRequirements: 'Vegetarian meals required',
    status: 'confirmed',
    totalAmount: '800',
    currency: 'USD',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-14',
    bookingReference: 'BOOK-002'
  },
  {
    id: 3,
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@example.com',
    phone: '+250 789 654 321',
    university: 'University of Kigali',
    course: 'Medicine',
    arrivalDate: '2024-04-01',
    departureDate: '2024-09-01',
    numberOfOccupants: '3',
    preferredPayment: 'paypal',
    specialRequirements: 'Need airport pickup',
    status: 'cancelled',
    totalAmount: '2500',
    currency: 'USD',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
    bookingReference: 'BOOK-003'
  }
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'checked_in', label: 'Checked In', color: 'blue' },
  { value: 'checked_out', label: 'Checked Out', color: 'purple' },
  { value: 'payment_pending', label: 'Payment Pending', color: 'orange' }
];

const PAYMENT_OPTIONS = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'western_union', label: 'Western Union' },
  { value: 'mobile_money', label: 'Mobile Money' },
  { value: 'cash', label: 'Cash' }
];

const OCCUPANTS_OPTIONS = [
  { value: '1', label: '1 Person' },
  { value: '2', label: '2 People' },
  { value: '3', label: '3 People' },
  { value: '4', label: '4 People' },
  { value: '5', label: '5+ People' }
];

export const AccomodationBookingManagement = () => {
  // State management
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [filteredBookings, setFilteredBookings] = useState(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [bookingForm, setBookingForm] = useState(INITIAL_BOOKING_FORM);
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
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  
  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Filter and sort bookings
  useEffect(() => {
    let filtered = [...bookings];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.firstName.toLowerCase().includes(term) ||
        booking.lastName.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term) ||
        booking.university.toLowerCase().includes(term) ||
        booking.bookingReference.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
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
    
    setFilteredBookings(filtered);
    setPage(0);
  }, [bookings, searchTerm, statusFilter, sortConfig]);

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
    setBookingForm(prev => ({
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
    
    if (!bookingForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!bookingForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!bookingForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!bookingForm.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!bookingForm.university.trim()) newErrors.university = 'University is required';
    if (!bookingForm.course.trim()) newErrors.course = 'Course is required';
    if (!bookingForm.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!bookingForm.departureDate) newErrors.departureDate = 'Departure date is required';
    
    // Validate dates
    if (bookingForm.arrivalDate && bookingForm.departureDate) {
      const arrival = new Date(bookingForm.arrivalDate);
      const departure = new Date(bookingForm.departureDate);
      if (departure <= arrival) {
        newErrors.departureDate = 'Departure date must be after arrival date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Create/Update)
  const handleBookingSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isEditMode && selectedBooking) {
        // Update existing booking
        const updatedBookings = bookings.map(booking =>
          booking.id === selectedBooking.id
            ? { 
                ...bookingForm, 
                id: selectedBooking.id, 
                status: selectedBooking.status, 
                updatedAt: new Date().toISOString().split('T')[0],
                createdAt: selectedBooking.createdAt,
                totalAmount: selectedBooking.totalAmount,
                currency: selectedBooking.currency,
                bookingReference: selectedBooking.bookingReference
              }
            : booking
        );
        setBookings(updatedBookings);
        
        showNotification('Booking updated successfully!', 'success');
      } else {
        // Create new booking
        const newBooking = {
          ...bookingForm,
          id: bookings.length > 0 ? Math.max(...bookings.map(booking => booking.id)) + 1 : 1,
          status: 'pending',
          totalAmount: calculateTotalAmount(bookingForm),
          currency: 'USD',
          bookingReference: `BOOK-${String(bookings.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setBookings(prev => [newBooking, ...prev]);
        
        showNotification('Booking created successfully!', 'success');
      }
      
      handleCloseDialog();
      resetForm();
      
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total amount based on stay duration and occupants
  const calculateTotalAmount = (formData) => {
    if (!formData.arrivalDate || !formData.departureDate) return '0';
    
    const arrival = new Date(formData.arrivalDate);
    const departure = new Date(formData.departureDate);
    const days = Math.ceil((departure - arrival) / (1000 * 60 * 60 * 24));
    const dailyRate = 50; // $50 per day
    const occupants = parseInt(formData.numberOfOccupants) || 1;
    
    return (days * dailyRate * occupants).toString();
  };

  // Handle delete booking
  const handleDelete = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedBookings = bookings.filter(
        booking => booking.id !== selectedBooking.id
      );
      setBookings(updatedBookings);
      
      showNotification('Booking deleted successfully!', 'success');
      
      setOpenDeleteDialog(false);
      setSelectedBooking(null);
      
    } catch (error) {
      showNotification('Failed to delete booking. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : booking
      );
      setBookings(updatedBookings);
      
      showNotification(`Booking status updated to ${newStatus}`, 'success');
      
      setOpenStatusDialog(false);
      setSelectedBooking(null);
      
    } catch (error) {
      showNotification('Failed to update status. Please try again.', 'error');
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
  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setBookingForm(booking);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  // Open view dialog
  const handleView = (booking) => {
    setSelectedBooking(booking);
    setOpenViewDialog(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDeleteDialog(true);
  };

  // Open status change dialog
  const handleStatusClick = (booking) => {
    setSelectedBooking(booking);
    setOpenStatusDialog(true);
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
    setSelectedBooking(null);
    setIsEditMode(false);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setSelectedBooking(null);
  };

  // Reset form
  const resetForm = () => {
    setBookingForm(INITIAL_BOOKING_FORM);
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
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
      orange: 'bg-orange-100 text-orange-800 border-orange-300'
    }[statusOption?.color] || 'bg-gray-100 text-gray-800 border-gray-300';
    
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
        {statusOption?.label || status}
      </span>
    );
  };

  // Calculate statistics
  const statistics = {
    total: bookings.length,
    pending: bookings.filter(booking => booking.status === 'pending').length,
    confirmed: bookings.filter(booking => booking.status === 'confirmed').length,
    cancelled: bookings.filter(booking => booking.status === 'cancelled').length,
    revenue: bookings
      .filter(booking => booking.status !== 'cancelled')
      .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0)
  };

  // Paginated data
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

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
      success: <CheckIcon className="w-5 h-5 text-green-500" />,
      error: <ErrorIcon className="w-5 h-5 text-red-500" />,
      warning: <WarningIcon className="w-5 h-5 text-yellow-500" />,
      info: <InfoIcon className="w-5 h-5 text-blue-500" />
    }[notification.type];
    
    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md`}>
        <div className="flex items-start">
          {icon}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Notification />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
            <p className="text-gray-600">Manage accommodation bookings, track reservations, and handle guest information</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
          >
            <AddIcon className="w-5 h-5 mr-2" />
            New Booking
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Bookings</p>
              <p className="text-3xl font-bold mt-2">{statistics.total}</p>
            </div>
            <HotelIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-2">{statistics.pending}</p>
            </div>
            <ScheduleIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Confirmed</p>
              <p className="text-3xl font-bold mt-2">{statistics.confirmed}</p>
            </div>
            <CheckIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${statistics.revenue.toLocaleString()}</p>
            </div>
            <MoneyIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookings by name, email, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <FilterIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortConfig({ key: 'createdAt', direction: 'desc' });
              }}
              className="flex items-center px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshIcon className="w-5 h-5 mr-2" />
              Reset
            </button>
            
            <button className="flex items-center px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
              <DownloadIcon className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center">
                    Guest
                    {sortConfig.key === 'firstName' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  University Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Stay Period
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === 'status' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <HotelIcon className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-xl font-medium text-gray-600">No bookings found</p>
                      <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                      <button
                        onClick={handleCreate}
                        className="mt-6 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md"
                      >
                        Create New Booking
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {booking.firstName.charAt(0)}{booking.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-semibold text-gray-900">
                            {booking.firstName} {booking.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <EmailIcon className="w-4 h-4 mr-2" />
                            {booking.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            {booking.phone}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Ref: {booking.bookingReference}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 flex items-center">
                        <SchoolIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.university}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {booking.course}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(booking.arrivalDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(booking.departureDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {booking.numberOfOccupants} {booking.numberOfOccupants === '1' ? 'person' : 'people'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">
                        ${booking.totalAmount}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <PaymentIcon className="w-4 h-4 mr-2" />
                        {PAYMENT_OPTIONS.find(p => p.value === booking.preferredPayment)?.label || booking.preferredPayment}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(booking)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <ViewIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(booking)}
                          className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <EditIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusClick(booking)}
                          className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Change Status"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(booking)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
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
        {paginatedBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold">{Math.min(endIndex, filteredBookings.length)}</span> of{' '}
                  <span className="font-semibold">{filteredBookings.length}</span> bookings
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <label htmlFor="rowsPerPage" className="text-sm text-gray-700 mr-3">
                    Rows per page:
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
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
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
                        className={`px-4 py-2 border-2 text-sm font-medium rounded-lg ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Booking' : 'New Booking Request'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isEditMode ? 'Update booking information' : 'Fill in the details to create a new booking'}
                  </p>
                </div>
                <button
                  onClick={handleCloseDialog}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <PersonIcon className="w-5 h-5 mr-2 text-blue-500" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={bookingForm.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="John"
                          disabled={isSubmitting}
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={bookingForm.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="Doe"
                          disabled={isSubmitting}
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="john@example.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={bookingForm.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="+250 783 408 617"
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* University Information */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <SchoolIcon className="w-5 h-5 mr-2 text-green-500" />
                      University Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          University *
                        </label>
                        <input
                          type="text"
                          name="university"
                          required
                          value={bookingForm.university}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.university ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="University of Example"
                          disabled={isSubmitting}
                        />
                        {errors.university && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.university}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Course/Program *
                        </label>
                        <input
                          type="text"
                          name="course"
                          required
                          value={bookingForm.course}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.course ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="Computer Science"
                          disabled={isSubmitting}
                        />
                        {errors.course && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.course}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stay Information */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <HotelIcon className="w-5 h-5 mr-2 text-purple-500" />
                      Stay Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Arrival Date *
                        </label>
                        <input
                          type="date"
                          name="arrivalDate"
                          required
                          value={bookingForm.arrivalDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.arrivalDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.arrivalDate && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.arrivalDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Departure Date *
                        </label>
                        <input
                          type="date"
                          name="departureDate"
                          required
                          value={bookingForm.departureDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                            errors.departureDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.departureDate && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-4 h-4 mr-1" />
                            {errors.departureDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Occupants *
                        </label>
                        <select
                          name="numberOfOccupants"
                          required
                          value={bookingForm.numberOfOccupants}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                        >
                          {OCCUPANTS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Payment Method
                        </label>
                        <select
                          name="preferredPayment"
                          value={bookingForm.preferredPayment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                          disabled={isSubmitting}
                        >
                          <option value="">Select method</option>
                          {PAYMENT_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      rows="4"
                      name="specialRequirements"
                      value={bookingForm.specialRequirements}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-none"
                      placeholder="Any special requirements, accessibility needs, or preferences..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl shadow-lg'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        {isEditMode ? 'Updating...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        {isEditMode ? (
                          <>
                            <SaveIcon className="w-6 h-6 mr-3" />
                            Update Booking
                          </>
                        ) : (
                          'Submit Booking Request'
                        )}
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
      {openViewDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <p className="text-gray-600 mt-1">
                    Reference: <span className="font-semibold text-blue-600">{selectedBooking.bookingReference}</span>
                  </p>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="space-y-8">
                  {/* Guest Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0 h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                        {selectedBooking.firstName.charAt(0)}{selectedBooking.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedBooking.firstName} {selectedBooking.lastName}
                        </h3>
                        <div className="flex items-center space-x-6 mt-2">
                          <div className="flex items-center text-gray-600">
                            <EmailIcon className="w-5 h-5 mr-2" />
                            {selectedBooking.email}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <PhoneIcon className="w-5 h-5 mr-2" />
                            {selectedBooking.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(selectedBooking.status)}
                      <div className="text-sm text-gray-500 mt-2">
                        Created: {selectedBooking.createdAt}
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Stay Information</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Check-in Date</p>
                          <p className="text-lg font-semibold text-gray-900 flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                            {new Date(selectedBooking.arrivalDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Check-out Date</p>
                          <p className="text-lg font-semibold text-gray-900 flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                            {new Date(selectedBooking.departureDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Number of Guests</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedBooking.numberOfOccupants} {selectedBooking.numberOfOccupants === '1' ? 'person' : 'people'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Academic Information</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">University</p>
                          <p className="text-lg font-semibold text-gray-900 flex items-center">
                            <SchoolIcon className="w-5 h-5 mr-2 text-green-500" />
                            {selectedBooking.university}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Program/Course</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedBooking.course}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${selectedBooking.totalAmount} <span className="text-sm font-normal">{selectedBooking.currency}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Preferred Payment</p>
                          <p className="text-lg font-semibold text-gray-900 flex items-center">
                            <PaymentIcon className="w-5 h-5 mr-2 text-purple-500" />
                            {PAYMENT_OPTIONS.find(p => p.value === selectedBooking.preferredPayment)?.label || selectedBooking.preferredPayment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Special Requirements */}
                  {selectedBooking.specialRequirements && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
                        Special Requirements
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line bg-white p-4 rounded-lg border border-gray-200">
                        {selectedBooking.specialRequirements}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-8 py-6 border-t border-gray-200 flex justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedBooking);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-md flex items-center transition-all"
                  >
                    <EditIcon className="w-5 h-5 mr-2" />
                    Edit Booking
                  </button>
                  <button
                    onClick={() => handleStatusClick(selectedBooking)}
                    className="px-5 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Change Status
                  </button>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="px-5 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
                  <WarningIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                  Delete Booking
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete booking{' '}
                  <span className="font-bold text-gray-900">
                    {selectedBooking.bookingReference}
                  </span> for{' '}
                  <span className="font-semibold text-gray-900">
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </span>?
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-4">
                      <p className="text-sm text-red-700 font-medium">
                        This action cannot be undone. All booking data including payment history will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-5 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="w-5 h-5 mr-2" />
                        Delete Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Status Change Modal */}
      {openStatusDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseStatusDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                  <CheckIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                  Update Booking Status
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Change status for booking{' '}
                  <span className="font-bold text-blue-600">
                    {selectedBooking.bookingReference}
                  </span>
                </p>
                
                <div className="space-y-4 mb-8">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value)}
                      disabled={loading || selectedBooking.status === status.value}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        selectedBooking.status === status.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          status.value === 'pending' ? 'bg-yellow-500' :
                          status.value === 'confirmed' ? 'bg-green-500' :
                          status.value === 'cancelled' ? 'bg-red-500' :
                          status.value === 'checked_in' ? 'bg-blue-500' :
                          status.value === 'checked_out' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}></div>
                        <span className="font-medium">{status.label}</span>
                      </div>
                      {selectedBooking.status === status.value && (
                        <CheckIcon className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseStatusDialog}
                    className="px-5 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
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