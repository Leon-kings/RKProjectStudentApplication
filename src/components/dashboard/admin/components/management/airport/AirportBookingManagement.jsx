/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Luggage as LuggageIcon,
  Groups as GroupsIcon,
  Payment as PaymentIcon,
  Warning as WarningIcon,
  Emergency as EmergencyIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  AirlineSeatReclineExtra as SeatIcon,
  LocalAirport as AirportIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

const INITIAL_BOOKING_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  flightNumber: "",
  airline: "",
  arrivalDate: "",
  arrivalTime: "",
  departureDate: "",
  departureTime: "",
  airport: "",
  terminal: "",
  serviceType: "",
  numberOfPassengers: "1",
  numberOfBags: "1",
  specialRequirements: "",
  paymentMethod: "",
  emergencyContact: "",
  additionalInfo: "",
};

// Mock data for demonstration
const MOCK_AIRPORT_BOOKINGS = [
  {
    id: 1,
    bookingReference: "AIR-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+250 783 408 617",
    nationality: "Rwandan",
    flightNumber: "WB 345",
    airline: "RwandAir",
    arrivalDate: "2024-03-15",
    arrivalTime: "14:30",
    departureDate: "2024-03-20",
    departureTime: "10:15",
    airport: "Kigali International Airport",
    terminal: "Terminal 1",
    serviceType: "airport_transfer",
    numberOfPassengers: "2",
    numberOfBags: "3",
    specialRequirements: "Need wheelchair assistance",
    paymentMethod: "credit_card",
    emergencyContact: "+250 788 123 456",
    additionalInfo: "First time visitor",
    status: "confirmed",
    totalAmount: "75",
    currency: "USD",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
  },
  {
    id: 2,
    bookingReference: "AIR-002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+44 1234 567890",
    nationality: "British",
    flightNumber: "BA 123",
    airline: "British Airways",
    arrivalDate: "2024-03-18",
    arrivalTime: "08:45",
    departureDate: "2024-03-25",
    departureTime: "22:30",
    airport: "Heathrow Airport",
    terminal: "Terminal 5",
    serviceType: "meet_greet",
    numberOfPassengers: "1",
    numberOfBags: "2",
    specialRequirements: "Vegetarian meal preferred",
    paymentMethod: "paypal",
    emergencyContact: "+44 7777 888999",
    additionalInfo: "Business trip",
    status: "pending",
    totalAmount: "120",
    currency: "USD",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    bookingReference: "AIR-003",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.j@example.com",
    phone: "+1 234 567 8900",
    nationality: "American",
    flightNumber: "UA 456",
    airline: "United Airlines",
    arrivalDate: "2024-04-01",
    arrivalTime: "16:20",
    departureDate: "2024-04-10",
    departureTime: "07:45",
    airport: "JFK International Airport",
    terminal: "Terminal 7",
    serviceType: "vip_service",
    numberOfPassengers: "4",
    numberOfBags: "8",
    specialRequirements: "Need child seats (x2)",
    paymentMethod: "bank_transfer",
    emergencyContact: "+1 555 123 4567",
    additionalInfo: "Family vacation",
    status: "cancelled",
    totalAmount: "350",
    currency: "USD",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
  },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "confirmed", label: "Confirmed", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
  { value: "completed", label: "Completed", color: "blue" },
  { value: "in_progress", label: "In Progress", color: "purple" },
];

const SERVICE_TYPES = [
  { value: "airport_transfer", label: "Airport Transfer" },
  { value: "meet_greet", label: "Meet & Greet" },
  { value: "vip_service", label: "VIP Service" },
  { value: "group_transfer", label: "Group Transfer" },
  { value: "executive_service", label: "Executive Service" },
];

const PAYMENT_METHODS = [
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "mobile_money", label: "Mobile Money" },
];

const AIRPORT_OPTIONS = [
  "Kigali International Airport",
  "Heathrow Airport",
  "JFK International Airport",
  "Dubai International Airport",
  "Singapore Changi Airport",
  "Tokyo Haneda Airport",
  "Sydney Airport",
  "Amsterdam Schiphol Airport",
];

const AIRLINE_OPTIONS = [
  "RwandAir",
  "British Airways",
  "United Airlines",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Delta Air Lines",
  "Air France",
  "Turkish Airlines",
  "Ethiopian Airlines",
];

export const AirportBookingManagement = () => {
  // State management
  const [bookings, setBookings] = useState(MOCK_AIRPORT_BOOKINGS);
  const [filteredBookings, setFilteredBookings] = useState(
    MOCK_AIRPORT_BOOKINGS
  );
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Form state
  const [bookingForm, setBookingForm] = useState(INITIAL_BOOKING_FORM);
  const [errors, setErrors] = useState({});

  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Filter and sort bookings
  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.firstName.toLowerCase().includes(term) ||
          booking.lastName.toLowerCase().includes(term) ||
          booking.email.toLowerCase().includes(term) ||
          booking.flightNumber.toLowerCase().includes(term) ||
          booking.bookingReference.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Apply service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter(
        (booking) => booking.serviceType === serviceFilter
      );
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(
        (booking) => booking.arrivalDate === dateFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredBookings(filtered);
    setPage(0);
  }, [
    bookings,
    searchTerm,
    statusFilter,
    serviceFilter,
    dateFilter,
    sortConfig,
  ]);

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
    setBookingForm((prev) => ({
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

    // Required fields
    if (!bookingForm.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!bookingForm.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!bookingForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!bookingForm.phone.trim()) newErrors.phone = "Phone number is required";
    if (!bookingForm.flightNumber.trim())
      newErrors.flightNumber = "Flight number is required";
    if (!bookingForm.airline.trim()) newErrors.airline = "Airline is required";
    if (!bookingForm.arrivalDate)
      newErrors.arrivalDate = "Arrival date is required";
    if (!bookingForm.arrivalTime)
      newErrors.arrivalTime = "Arrival time is required";
    if (!bookingForm.airport.trim()) newErrors.airport = "Airport is required";
    if (!bookingForm.serviceType)
      newErrors.serviceType = "Service type is required";
    if (!bookingForm.numberOfPassengers)
      newErrors.numberOfPassengers = "Number of passengers is required";

    // Date validation
    if (bookingForm.arrivalDate && bookingForm.departureDate) {
      const arrival = new Date(bookingForm.arrivalDate);
      const departure = new Date(bookingForm.departureDate);
      if (departure < arrival) {
        newErrors.departureDate = "Departure date must be after arrival date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isEditMode && selectedBooking) {
        // Update existing booking
        const updatedBookings = bookings.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...bookingForm,
                id: selectedBooking.id,
                status: selectedBooking.status,
                updatedAt: new Date().toISOString().split("T")[0],
                createdAt: selectedBooking.createdAt,
                totalAmount: selectedBooking.totalAmount,
                currency: selectedBooking.currency,
                bookingReference: selectedBooking.bookingReference,
              }
            : booking
        );
        setBookings(updatedBookings);

        showNotification("Airport booking updated successfully!", "success");
      } else {
        // Create new booking
        const newBooking = {
          ...bookingForm,
          id:
            bookings.length > 0
              ? Math.max(...bookings.map((booking) => booking.id)) + 1
              : 1,
          status: "pending",
          totalAmount: calculateTotalAmount(bookingForm),
          currency: "USD",
          bookingReference: `AIR-${String(bookings.length + 1).padStart(
            3,
            "0"
          )}`,
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setBookings((prev) => [newBooking, ...prev]);

        showNotification("Airport booking created successfully!", "success");
      }

      handleCloseDialog();
      resetForm();
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total amount
  const calculateTotalAmount = (formData) => {
    const baseRates = {
      airport_transfer: 50,
      meet_greet: 80,
      vip_service: 150,
      group_transfer: 120,
      executive_service: 200,
    };

    const baseRate = baseRates[formData.serviceType] || 50;
    const passengerMultiplier = parseInt(formData.numberOfPassengers) || 1;
    const bagMultiplier = parseInt(formData.numberOfBags) || 1;

    return (
      baseRate *
      passengerMultiplier *
      (bagMultiplier > 2 ? 1.2 : 1)
    ).toFixed(2);
  };

  // Handle delete booking
  const handleDelete = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedBookings = bookings.filter(
        (booking) => booking.id !== selectedBooking.id
      );
      setBookings(updatedBookings);

      showNotification("Airport booking deleted successfully!", "success");

      setOpenDeleteDialog(false);
      setSelectedBooking(null);
    } catch (error) {
      showNotification("Failed to delete booking. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedBookings = bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? {
              ...booking,
              status: newStatus,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : booking
      );
      setBookings(updatedBookings);

      showNotification(`Booking status updated to ${newStatus}`, "success");

      setOpenStatusDialog(false);
      setSelectedBooking(null);
    } catch (error) {
      showNotification("Failed to update status. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
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
    const statusOption = STATUS_OPTIONS.find((s) => s.value === status);
    const colorClass =
      {
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
        green: "bg-green-100 text-green-800 border-green-300",
        red: "bg-red-100 text-red-800 border-red-300",
        blue: "bg-blue-100 text-blue-800 border-blue-300",
        purple: "bg-purple-100 text-purple-800 border-purple-300",
      }[statusOption?.color] || "bg-gray-100 text-gray-800 border-gray-300";

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full border ${colorClass}`}
      >
        {statusOption?.label || status}
      </span>
    );
  };

  // Calculate statistics
  const statistics = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    confirmed: bookings.filter((booking) => booking.status === "confirmed")
      .length,
    revenue: bookings
      .filter((booking) => booking.status !== "cancelled")
      .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0),
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
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md transition-all duration-300`}
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

  // Responsive grid classes
  const getResponsiveGrid = () => ({
    // Extra small screens (default: 1 column)
    default: "grid-cols-1",
    // Small screens (640px+): 2 columns
    sm: "sm:grid-cols-2",
    // Medium screens (768px+): 3 columns
    md: "md:grid-cols-3",
    // Large screens (1024px+): 4 columns
    lg: "lg:grid-cols-4",
    // Extra large screens (1280px+): 4 columns with gaps
    xl: "xl:grid-cols-4",
  });

  // Responsive text classes
  const getResponsiveText = (size) => ({
    sm: `text-${size} sm:text-${size} md:text-${size} lg:text-${size} xl:text-${size}`,
  });

  // Format date and time
  const formatDateTime = (date, time) => {
    if (!date) return "N/A";
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return time ? `${formattedDate} ${time}` : formattedDate;
  };

  return (
    <div className="p-3 sm:p-4 flex md:p-6 bg-gray-50 min-h-screen">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="w-full p-2">
        <Notification />

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Airport Booking Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage airport transfers, meet & greet services, and VIP
                arrangements
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <AddIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="text-sm sm:text-base font-medium">
                New Booking
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div
          className={`grid ${getResponsiveGrid().default} ${
            getResponsiveGrid().sm
          } ${getResponsiveGrid().md} ${
            getResponsiveGrid().lg
          } gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8`}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  Total Bookings
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.total}
                </p>
              </div>
              <FlightTakeoffIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  Pending
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.pending}
                </p>
              </div>
              <ScheduleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  Confirmed
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.confirmed}
                </p>
              </div>
              <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">
                  Total Revenue
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  ${statistics.revenue.toLocaleString()}
                </p>
              </div>
              <PaymentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Bar - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Row */}
            <div className="w-full">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Filter Row - Responsive Grid */}
            <div
              className={`grid ${getResponsiveGrid().default} ${
                getResponsiveGrid().sm
              } ${getResponsiveGrid().md} gap-3`}
            >
              <div>
                <div className="relative">
                  <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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

              <div>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
                >
                  <option value="all">All Services</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Filter by date"
                />
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setServiceFilter("all");
                  setDateFilter("");
                  setSortConfig({ key: "createdAt", direction: "desc" });
                }}
                className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Reset
              </button>

              <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Passenger
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                    Flight Details
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                    Service & Amount
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <FlightTakeoffIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-300 mb-3 sm:mb-4" />
                        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600">
                          No airport bookings found
                        </p>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                        <button
                          onClick={handleCreate}
                          className="mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm sm:text-base"
                        >
                          Create New Booking
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {booking.firstName.charAt(0)}
                            {booking.lastName.charAt(0)}
                          </div>
                          <div className="ml-2 sm:ml-3 md:ml-4">
                            <div className="text-sm sm:text-base font-semibold text-gray-900">
                              {booking.firstName} {booking.lastName}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 flex items-center mt-0.5">
                              <EmailIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
                                {booking.email}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              Ref: {booking.bookingReference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 hidden sm:table-cell">
                        <div className="text-sm sm:text-base font-semibold text-gray-900 flex items-center">
                          <FlightTakeoffIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                          {booking.flightNumber}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1">
                          {booking.airline}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {formatDateTime(
                            booking.arrivalDate,
                            booking.arrivalTime
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm sm:text-base font-semibold text-gray-900">
                          {
                            SERVICE_TYPES.find(
                              (s) => s.value === booking.serviceType
                            )?.label
                          }
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-gray-900">
                          ${booking.totalAmount}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
                          <GroupsIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {booking.numberOfPassengers} passengers •{" "}
                          {booking.numberOfBags} bags
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleView(booking)}
                            className="p-1 sm:p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                            title="View Details"
                          >
                            <ViewIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(booking)}
                            className="p-1 sm:p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors"
                            title="Edit"
                          >
                            <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(booking)}
                            className="p-1 sm:p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusClick(booking)}
                            className="p-1 sm:p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded transition-colors md:hidden"
                            title="Change Status"
                          >
                            <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Responsive */}
          {paginatedBookings.length > 0 && (
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-semibold">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold">
                      {Math.min(endIndex, filteredBookings.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {filteredBookings.length}
                    </span>{" "}
                    bookings
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="rowsPerPage"
                      className="text-xs sm:text-sm text-gray-700 mr-2 sm:mr-3"
                    >
                      Rows:
                    </label>
                    <select
                      id="rowsPerPage"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                      className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleChangePage(page - 1)}
                      disabled={page === 0}
                      className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Prev
                    </button>

                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 3) {
                        pageNum = i;
                      } else if (page < 1) {
                        pageNum = i;
                      } else if (page > totalPages - 2) {
                        pageNum = totalPages - 3 + i;
                      } else {
                        pageNum = page - 1 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handleChangePage(pageNum)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 border text-xs sm:text-sm font-medium rounded ${
                            page === pageNum
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600"
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
                      className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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

      {/* Create/Edit Modal - Responsive */}
      {openDialog && (
        <>
          <ModalBackdrop onClose={handleCloseDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {isEditMode
                      ? "Edit Airport Booking"
                      : "New Airport Booking"}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                    {isEditMode
                      ? "Update booking information"
                      : "Fill in passenger and flight details"}
                  </p>
                </div>
                <button
                  onClick={handleCloseDialog}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-4rem)]">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6 md:space-y-8"
                >
                  {/* Passenger Information */}
                  <div className="border-b pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <PersonIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                      Passenger Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={bookingForm.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          placeholder="John"
                          disabled={isSubmitting}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={bookingForm.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          placeholder="Doe"
                          disabled={isSubmitting}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.email
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          placeholder="john@example.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={bookingForm.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.phone
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          placeholder="+250 783 408 617"
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Nationality
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={bookingForm.nationality}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          placeholder="e.g., Rwandan"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact"
                          value={bookingForm.emergencyContact}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          placeholder="Emergency phone number"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="border-b pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <FlightTakeoffIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                      Flight Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Flight Number *
                        </label>
                        <input
                          type="text"
                          name="flightNumber"
                          required
                          value={bookingForm.flightNumber}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.flightNumber
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          placeholder="WB 345"
                          disabled={isSubmitting}
                        />
                        {errors.flightNumber && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.flightNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Airline *
                        </label>
                        <select
                          name="airline"
                          required
                          value={bookingForm.airline}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.airline
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        >
                          <option value="">Select Airline</option>
                          {AIRLINE_OPTIONS.map((airline) => (
                            <option key={airline} value={airline}>
                              {airline}
                            </option>
                          ))}
                        </select>
                        {errors.airline && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.airline}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Arrival Date *
                        </label>
                        <input
                          type="date"
                          name="arrivalDate"
                          required
                          value={bookingForm.arrivalDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.arrivalDate
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.arrivalDate && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.arrivalDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Arrival Time *
                        </label>
                        <input
                          type="time"
                          name="arrivalTime"
                          required
                          value={bookingForm.arrivalTime}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.arrivalTime
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.arrivalTime && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.arrivalTime}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          name="departureDate"
                          value={bookingForm.departureDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.departureDate
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.departureDate && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.departureDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Departure Time
                        </label>
                        <input
                          type="time"
                          name="departureTime"
                          value={bookingForm.departureTime}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="border-b pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <AirportIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                      Service Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Airport *
                        </label>
                        <select
                          name="airport"
                          required
                          value={bookingForm.airport}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.airport
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        >
                          <option value="">Select Airport</option>
                          {AIRPORT_OPTIONS.map((airport) => (
                            <option key={airport} value={airport}>
                              {airport}
                            </option>
                          ))}
                        </select>
                        {errors.airport && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.airport}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Terminal
                        </label>
                        <input
                          type="text"
                          name="terminal"
                          value={bookingForm.terminal}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          placeholder="Terminal 1"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Service Type *
                        </label>
                        <select
                          name="serviceType"
                          required
                          value={bookingForm.serviceType}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.serviceType
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        >
                          <option value="">Select Service</option>
                          {SERVICE_TYPES.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.serviceType}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          value={bookingForm.paymentMethod}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Method</option>
                          {PAYMENT_METHODS.map((method) => (
                            <option key={method.value} value={method.value}>
                              {method.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Number of Passengers *
                        </label>
                        <input
                          type="number"
                          name="numberOfPassengers"
                          required
                          min="1"
                          max="10"
                          value={bookingForm.numberOfPassengers}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.numberOfPassengers
                              ? "border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.numberOfPassengers && (
                          <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                            <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.numberOfPassengers}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Number of Bags
                        </label>
                        <input
                          type="number"
                          name="numberOfBags"
                          min="0"
                          max="10"
                          value={bookingForm.numberOfBags}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Special Requirements
                        </label>
                        <textarea
                          rows="2"
                          name="specialRequirements"
                          value={bookingForm.specialRequirements}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base resize-none"
                          placeholder="Wheelchair assistance, child seats, etc."
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Additional Information
                        </label>
                        <textarea
                          rows="2"
                          name="additionalInfo"
                          value={bookingForm.additionalInfo}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm sm:text-base resize-none"
                          placeholder="Any additional information..."
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg shadow-md"
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                          {isEditMode ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>{isEditMode ? "Update Booking" : "Create Booking"}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal - Responsive */}
      {openViewDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Booking Details
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                    Reference:{" "}
                    <span className="font-semibold text-blue-600">
                      {selectedBooking.bookingReference}
                    </span>
                  </p>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-4rem)]">
                <div className="space-y-4 sm:space-y-6">
                  {/* Passenger Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                        {selectedBooking.firstName.charAt(0)}
                        {selectedBooking.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                          {selectedBooking.firstName} {selectedBooking.lastName}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1">
                          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                            <EmailIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {selectedBooking.email}
                          </div>
                          <div className="flex items-center text-gray-600 text-xs sm:text-sm mt-1 sm:mt-0">
                            <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {selectedBooking.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(selectedBooking.status)}
                      <div className="text-xs text-gray-500 mt-1 sm:mt-2">
                        Created: {selectedBooking.createdAt}
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Flight Information
                      </h4>
                      <div className="space-y-1 sm:space-y-2">
                        <div>
                          <p className="text-xs text-gray-600">Flight Number</p>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            <FlightTakeoffIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500" />
                            {selectedBooking.flightNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Airline</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedBooking.airline}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Arrival</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDateTime(
                              selectedBooking.arrivalDate,
                              selectedBooking.arrivalTime
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Service Details
                      </h4>
                      <div className="space-y-1 sm:space-y-2">
                        <div>
                          <p className="text-xs text-gray-600">Service Type</p>
                          <p className="text-sm font-medium text-gray-900">
                            {
                              SERVICE_TYPES.find(
                                (s) => s.value === selectedBooking.serviceType
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Airport</p>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            <AirportIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" />
                            {selectedBooking.airport}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Terminal</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedBooking.terminal || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Payment & Passengers
                      </h4>
                      <div className="space-y-1 sm:space-y-2">
                        <div>
                          <p className="text-xs text-gray-600">Total Amount</p>
                          <p className="text-lg sm:text-xl font-bold text-gray-900">
                            ${selectedBooking.totalAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">
                            Payment Method
                          </p>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            <PaymentIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-purple-500" />
                            {PAYMENT_METHODS.find(
                              (p) => p.value === selectedBooking.paymentMethod
                            )?.label || selectedBooking.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">
                            Passengers & Bags
                          </p>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            <GroupsIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {selectedBooking.numberOfPassengers} passengers •{" "}
                            {selectedBooking.numberOfBags} bags
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  {(selectedBooking.specialRequirements ||
                    selectedBooking.additionalInfo ||
                    selectedBooking.emergencyContact) && (
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center">
                        <AssignmentIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" />
                        Additional Information
                      </h4>

                      <div className="space-y-3">
                        {selectedBooking.specialRequirements && (
                          <div>
                            <p className="text-xs text-gray-600">
                              Special Requirements
                            </p>
                            <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                              {selectedBooking.specialRequirements}
                            </p>
                          </div>
                        )}

                        {selectedBooking.emergencyContact && (
                          <div>
                            <p className="text-xs text-gray-600">
                              Emergency Contact
                            </p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                              <EmergencyIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500" />
                              {selectedBooking.emergencyContact}
                            </p>
                          </div>
                        )}

                        {selectedBooking.additionalInfo && (
                          <div>
                            <p className="text-xs text-gray-600">
                              Additional Notes
                            </p>
                            <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 whitespace-pre-line">
                              {selectedBooking.additionalInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedBooking);
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 shadow-md flex items-center justify-center transition-all text-sm sm:text-base"
                  >
                    <EditIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Edit Booking
                  </button>
                  <button
                    onClick={() => handleStatusClick(selectedBooking)}
                    className="px-4 py-2 sm:px-5 sm:py-3 border border-blue-600 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center text-sm sm:text-base"
                  >
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Change Status
                  </button>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal - Responsive */}
      {openDeleteDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mx-auto mb-4 sm:mb-6">
                  <WarningIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
                  Delete Booking
                </h3>
                <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  Are you sure you want to delete booking{" "}
                  <span className="font-bold text-gray-900">
                    {selectedBooking.bookingReference}
                  </span>{" "}
                  for{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </span>
                  ?
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm text-red-700 font-medium">
                        This action cannot be undone. All booking data will be
                        permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl hover:from-red-700 hover:to-red-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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

      {/* Status Change Modal - Responsive */}
      {openStatusDialog && selectedBooking && (
        <>
          <ModalBackdrop onClose={handleCloseStatusDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto mb-4 sm:mb-6">
                  <CheckIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
                  Update Booking Status
                </h3>
                <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  Change status for booking{" "}
                  <span className="font-bold text-blue-600">
                    {selectedBooking.bookingReference}
                  </span>
                </p>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value)}
                      disabled={
                        loading || selectedBooking.status === status.value
                      }
                      className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all flex items-center justify-between text-sm sm:text-base ${
                        selectedBooking.status === status.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-3 ${
                            status.value === "pending"
                              ? "bg-yellow-500"
                              : status.value === "confirmed"
                              ? "bg-green-500"
                              : status.value === "cancelled"
                              ? "bg-red-500"
                              : status.value === "completed"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                          }`}
                        ></div>
                        <span className="font-medium">{status.label}</span>
                      </div>
                      {selectedBooking.status === status.value && (
                        <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleCloseStatusDialog}
                    className="px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
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
