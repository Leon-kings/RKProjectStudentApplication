/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { Sidebar } from "../../sidebar/Sidebar";

export const UserAirportManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [modalType, setModalType] = useState("view"); // 'view', 'edit', 'create', 'delete'
  const [formData, setFormData] = useState({
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
    serviceType: "standard_service",
    numberOfPassengers: "1",
    numberOfBags: "0",
    specialRequirements: "",
    paymentMethod: "credit_card",
    emergencyContact: "",
    additionalInfo: "",
    status: "pending",
    totalAmount: "",
    currency: "USD",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [selectedAirport, setSelectedAirport] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Mock data for demonstration
  const mockBookings = [
    {
      id: 1,
      bookingReference: 'AIR-001',
      firstName: 'Sarah',
      lastName: 'Miller',
      email: 'sarah.m@example.com',
      phone: '+44 7700-900-123',
      nationality: 'British',
      flightNumber: 'BA 123',
      airline: 'British Airways',
      arrivalDate: '2024-03-15',
      arrivalTime: '14:30',
      departureDate: '2024-03-22',
      departureTime: '11:20',
      airport: 'Heathrow Airport',
      terminal: 'Terminal 5',
      serviceType: 'vip_service',
      numberOfPassengers: '2',
      numberOfBags: '4',
      specialRequirements: 'Wheelchair assistance required',
      paymentMethod: 'credit_card',
      emergencyContact: '+44 7700-900-124',
      additionalInfo: 'Honeymoon trip',
      status: 'confirmed',
      totalAmount: '450',
      currency: 'GBP',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      bookingReference: 'AIR-002',
      firstName: 'Kenji',
      lastName: 'Tanaka',
      email: 'kenji.t@example.com',
      phone: '+81 90-1234-5678',
      nationality: 'Japanese',
      flightNumber: 'JL 789',
      airline: 'Japan Airlines',
      arrivalDate: '2024-03-20',
      arrivalTime: '08:15',
      departureDate: '2024-03-28',
      departureTime: '22:40',
      airport: 'Narita International Airport',
      terminal: 'Terminal 1',
      serviceType: 'fast_track',
      numberOfPassengers: '1',
      numberOfBags: '2',
      specialRequirements: 'Business class passenger',
      paymentMethod: 'paypal',
      emergencyContact: '+81 90-9876-5432',
      additionalInfo: 'Business conference',
      status: 'active',
      totalAmount: '280',
      currency: 'USD',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      bookingReference: 'AIR-003',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.j@example.com',
      phone: '+1 234 567 8900',
      nationality: 'American',
      flightNumber: 'UA 456',
      airline: 'United Airlines',
      arrivalDate: '2024-04-01',
      arrivalTime: '16:20',
      departureDate: '2024-04-10',
      departureTime: '07:45',
      airport: 'JFK International Airport',
      terminal: 'Terminal 7',
      serviceType: 'vip_service',
      numberOfPassengers: '4',
      numberOfBags: '8',
      specialRequirements: 'Need child seats (x2)',
      paymentMethod: 'bank_transfer',
      emergencyContact: '+1 555 123 4567',
      additionalInfo: 'Family vacation',
      status: 'cancelled',
      totalAmount: '350',
      currency: 'USD',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12'
    },
    {
      id: 4,
      bookingReference: 'AIR-004',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.g@example.com',
      phone: '+34 600-123-456',
      nationality: 'Spanish',
      flightNumber: 'IB 321',
      airline: 'Iberia',
      arrivalDate: '2024-03-25',
      arrivalTime: '12:45',
      departureDate: '2024-04-05',
      departureTime: '15:30',
      airport: 'Madrid Barajas Airport',
      terminal: 'Terminal 4S',
      serviceType: 'meet_greet',
      numberOfPassengers: '2',
      numberOfBags: '3',
      specialRequirements: 'Pet transportation needed',
      paymentMethod: 'credit_card',
      emergencyContact: '+34 600-987-654',
      additionalInfo: 'Relocation with pet',
      status: 'completed',
      totalAmount: '220',
      currency: 'EUR',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-20'
    },
    {
      id: 5,
      bookingReference: 'AIR-005',
      firstName: 'Chen',
      lastName: 'Wang',
      email: 'chen.wang@example.com',
      phone: '+86 138-001-3800',
      nationality: 'Chinese',
      flightNumber: 'CA 987',
      airline: 'Air China',
      arrivalDate: '2024-03-18',
      arrivalTime: '21:10',
      departureDate: '2024-03-25',
      departureTime: '08:55',
      airport: 'Beijing Capital International Airport',
      terminal: 'Terminal 3',
      serviceType: 'standard_service',
      numberOfPassengers: '3',
      numberOfBags: '6',
      specialRequirements: 'Elderly assistance required',
      paymentMethod: 'wechat_pay',
      emergencyContact: '+86 138-002-3800',
      additionalInfo: 'Family visit',
      status: 'pending',
      totalAmount: '180',
      currency: 'USD',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      bookingReference: 'AIR-006',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.b@example.com',
      phone: '+61 412-345-678',
      nationality: 'Australian',
      flightNumber: 'QF 654',
      airline: 'Qantas',
      arrivalDate: '2024-04-05',
      arrivalTime: '06:30',
      departureDate: '2024-04-15',
      departureTime: '18:20',
      airport: 'Sydney Kingsford Smith Airport',
      terminal: 'International Terminal',
      serviceType: 'vip_service',
      numberOfPassengers: '2',
      numberOfBags: '5',
      specialRequirements: 'Priority baggage handling',
      paymentMethod: 'credit_card',
      emergencyContact: '+61 412-987-654',
      additionalInfo: 'Anniversary celebration',
      status: 'confirmed',
      totalAmount: '520',
      currency: 'AUD',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-10'
    }
  ];

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // API base URL
  const API_URL = "https://ruziganodejs.onrender.com/api/airport-services";

  // Get auth headers
  const getAuthHeaders = () => {
    try {
      const user = JSON.parse(Cookies.get("user") || "{}");
      return {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return { headers: {} };
    }
  };

  // Generate booking reference
  const generateBookingReference = () => {
    const prefix = "AIR-";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };

  // Calculate service price
  const calculateServicePrice = (serviceType, passengers, bags) => {
    const basePrice = {
      standard_service: 100,
      meet_greet: 150,
      fast_track: 200,
      vip_service: 300
    };
    
    const passengerFee = (parseInt(passengers) - 1) * 50;
    const baggageFee = parseInt(bags) * 20;
    
    return basePrice[serviceType] + passengerFee + baggageFee;
  };

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      // For now, use mock data. Replace with API call:
      // const response = await axios.get(API_URL, getAuthHeaders());
      // if (response.data.success) {
      //   setBookings(response.data.data || []);
      // } else {
      //   setError(response.data.message || "Failed to fetch airport bookings");
      // }
      
      // Using mock data for demonstration
      setTimeout(() => {
        setBookings(mockBookings);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error("Error fetching airport bookings:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch airport service bookings. Please check your connection."
      );
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm) ||
      booking.bookingReference?.includes(searchTerm) ||
      booking.flightNumber?.includes(searchTerm);
    
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus;
    const matchesServiceType = selectedServiceType === "all" || booking.serviceType === selectedServiceType;
    const matchesAirport = selectedAirport === "all" || booking.airport === selectedAirport;
    
    return matchesSearch && matchesStatus && matchesServiceType && matchesAirport;
  });

  // Get unique service types and airports for filters
  const uniqueServiceTypes = [...new Set(bookings.map(b => b.serviceType).filter(Boolean))];
  const uniqueAirports = [...new Set(bookings.map(b => b.airport).filter(Boolean))];

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Handle modal open
  const handleOpenModal = (type, booking = null) => {
    setModalType(type);
    setSelectedBooking(booking);
    
    if (type === "create") {
      setFormData({
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
        serviceType: "standard_service",
        numberOfPassengers: "1",
        numberOfBags: "0",
        specialRequirements: "",
        paymentMethod: "credit_card",
        emergencyContact: "",
        additionalInfo: "",
        status: "pending",
        totalAmount: "100",
        currency: "USD",
      });
    } else if (booking && (type === "edit" || type === "view")) {
      setFormData({
        firstName: booking.firstName || "",
        lastName: booking.lastName || "",
        email: booking.email || "",
        phone: booking.phone || "",
        nationality: booking.nationality || "",
        flightNumber: booking.flightNumber || "",
        airline: booking.airline || "",
        arrivalDate: booking.arrivalDate || "",
        arrivalTime: booking.arrivalTime || "",
        departureDate: booking.departureDate || "",
        departureTime: booking.departureTime || "",
        airport: booking.airport || "",
        terminal: booking.terminal || "",
        serviceType: booking.serviceType || "standard_service",
        numberOfPassengers: booking.numberOfPassengers || "1",
        numberOfBags: booking.numberOfBags || "0",
        specialRequirements: booking.specialRequirements || "",
        paymentMethod: booking.paymentMethod || "credit_card",
        emergencyContact: booking.emergencyContact || "",
        additionalInfo: booking.additionalInfo || "",
        status: booking.status || "pending",
        totalAmount: booking.totalAmount || "100",
        currency: booking.currency || "USD",
      });
    }
    
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setFormData({
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
      serviceType: "standard_service",
      numberOfPassengers: "1",
      numberOfBags: "0",
      specialRequirements: "",
      paymentMethod: "credit_card",
      emergencyContact: "",
      additionalInfo: "",
      status: "pending",
      totalAmount: "",
      currency: "USD",
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Calculate price when service type, passengers, or bags change
    if (name === 'serviceType' || name === 'numberOfPassengers' || name === 'numberOfBags') {
      const price = calculateServicePrice(
        name === 'serviceType' ? value : updatedFormData.serviceType,
        name === 'numberOfPassengers' ? value : updatedFormData.numberOfPassengers,
        name === 'numberOfBags' ? value : updatedFormData.numberOfBags
      );
      updatedFormData.totalAmount = price.toString();
    }

    setFormData(updatedFormData);
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];

    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.push("First name is required");
    }

    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.push("Last name is required");
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Valid email is required");
    }

    if (!formData.phone || !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.push("Valid phone number is required");
    }

    if (!formData.flightNumber || formData.flightNumber.trim() === "") {
      errors.push("Flight number is required");
    }

    if (!formData.arrivalDate || !formData.arrivalTime) {
      errors.push("Arrival date and time are required");
    }

    if (!formData.departureDate || !formData.departureTime) {
      errors.push("Departure date and time are required");
    }

    if (new Date(formData.departureDate) <= new Date(formData.arrivalDate)) {
      errors.push("Departure date must be after arrival date");
    }

    if (!formData.airport || formData.airport.trim() === "") {
      errors.push("Airport is required");
    }

    return errors;
  };

  // CREATE - Add new booking
  const handleCreateBooking = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setLoading(true);
    try {
      // Mock API call for demonstration
      const newBooking = {
        id: bookings.length + 1,
        bookingReference: generateBookingReference(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      // In real implementation, use:
      // const response = await axios.post(API_URL, formData, getAuthHeaders());
      
      setBookings(prev => [...prev, newBooking]);
      setSuccess("Airport service booking created successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create airport service booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Edit booking
  const handleUpdateBooking = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    if (!selectedBooking || !selectedBooking.id) {
      setError("No booking selected for update");
      return;
    }

    setLoading(true);
    try {
      // Mock API call for demonstration
      const updatedBooking = {
        ...selectedBooking,
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0],
      };

      // In real implementation, use:
      // const response = await axios.put(`${API_URL}/${selectedBooking.id}`, formData, getAuthHeaders());
      
      setBookings(prev => 
        prev.map(booking => booking.id === selectedBooking.id ? updatedBooking : booking)
      );
      setSuccess("Airport service booking updated successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error updating booking:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update airport service booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Remove booking
  const handleDeleteBooking = async () => {
    if (!selectedBooking || !selectedBooking.id) {
      setError("No booking selected for deletion");
      return;
    }

    setLoading(true);
    try {
      // Mock API call for demonstration
      
      // In real implementation, use:
      // const response = await axios.delete(`${API_URL}/${selectedBooking.id}`, getAuthHeaders());
      
      setBookings(prev => prev.filter(booking => booking.id !== selectedBooking.id));
      setSuccess("Airport service booking deleted successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete airport service booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle modal action
  const handleModalAction = () => {
    if (modalType === "create") {
      handleCreateBooking();
    } else if (modalType === "edit") {
      handleUpdateBooking();
    } else if (modalType === "delete") {
      handleDeleteBooking();
    }
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "active":
        return "bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-gradient-to-r from-yellow-50 to-amber-100 text-yellow-700 border border-yellow-200";
      case "cancelled":
      case "rejected":
        return "bg-gradient-to-r from-red-50 to-pink-100 text-red-700 border border-red-200";
      case "completed":
        return "bg-gradient-to-r from-blue-50 to-cyan-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200";
    }
  };

  // Get service type color
  const getServiceTypeColor = (serviceType) => {
    switch (serviceType?.toLowerCase()) {
      case "vip_service":
        return "text-purple-600 bg-purple-50";
      case "fast_track":
        return "text-blue-600 bg-blue-50";
      case "meet_greet":
        return "text-green-600 bg-green-50";
      case "standard_service":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString;
  };

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Get service type display name
  const getServiceTypeDisplay = (serviceType) => {
    switch (serviceType) {
      case "standard_service": return "Standard Service";
      case "meet_greet": return "Meet & Greet";
      case "fast_track": return "Fast Track";
      case "vip_service": return "VIP Service";
      default: return serviceType?.replace(/_/g, ' ').toUpperCase();
    }
  };

  // Get payment method display name
  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case "credit_card": return "Credit Card";
      case "paypal": return "PayPal";
      case "bank_transfer": return "Bank Transfer";
      case "wechat_pay": return "WeChat Pay";
      default: return method?.replace(/_/g, ' ').toUpperCase();
    }
  };

  // Calculate booking statistics
  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed' || b.status === 'active').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.reduce((sum, booking) => sum + (parseFloat(booking.totalAmount) || 0), 0),
    averagePassengers: bookings.length > 0 
      ? (bookings.reduce((sum, booking) => sum + (parseInt(booking.numberOfPassengers) || 0), 0) / bookings.length).toFixed(1)
      : "0.0",
  };

  // Close notifications
  const handleCloseNotification = () => {
    setError("");
    setSuccess("");
  };

  // Get modal title
  const getModalTitle = () => {
    switch (modalType) {
      case "view":
        return "Airport Service Details";
      case "edit":
        return "Edit Airport Service Booking";
      case "create":
        return "New Airport Service Booking";
      case "delete":
        return "Confirm Delete";
      default:
        return "Booking";
    }
  };

  // Get modal content
  const renderModalContent = () => {
    if (modalType === "view") {
      const arrivalDateTime = `${formatDate(selectedBooking?.arrivalDate)} ${formatTime(selectedBooking?.arrivalTime)}`;
      const departureDateTime = `${formatDate(selectedBooking?.departureDate)} ${formatTime(selectedBooking?.departureTime)}`;
      
      return (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                {selectedBooking?.firstName?.charAt(0) || "P"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedBooking?.firstName} {selectedBooking?.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(selectedBooking?.status)} shadow-sm`}>
                    {selectedBooking?.status?.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {selectedBooking?.bookingReference}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Flight Details</div>
                <div className="font-semibold text-gray-900">
                  {selectedBooking?.airline} {selectedBooking?.flightNumber}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedBooking?.airport}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Arrival</div>
                <div className="font-semibold text-gray-900">{arrivalDateTime}</div>
                <div className="text-xs text-gray-500 mt-1">Terminal {selectedBooking?.terminal}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Service Details</div>
                <div className="font-semibold text-gray-900">
                  {getServiceTypeDisplay(selectedBooking?.serviceType)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedBooking?.numberOfPassengers} passengers • {selectedBooking?.numberOfBags} bags
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm font-medium">Contact Information</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedBooking?.email}</p>
              <p className="text-gray-600 text-sm mt-1">{selectedBooking?.phone}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-9.293a1 1 0 00-1.414 1.414l.097.11 2 2.5a1 1 0 001.57 0l2-2.5a1 1 0 00-1.572-1.236l-1.043 1.304-1.043-1.304a1 1 0 00-1.414-.107z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Nationality</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedBooking?.nationality}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Departure</span>
              </div>
              <p className="text-gray-900 font-medium">{departureDateTime}</p>
              <p className="text-gray-600 text-sm mt-1">
                Duration: {calculateDuration(selectedBooking?.arrivalDate, selectedBooking?.departureDate)} days
              </p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                </svg>
                <span className="text-sm font-medium">Payment</span>
              </div>
              <p className="text-gray-900 font-medium">{getPaymentMethodDisplay(selectedBooking?.paymentMethod)}</p>
              <p className="text-gray-600 text-sm mt-1">
                {formatCurrency(selectedBooking?.totalAmount, selectedBooking?.currency)}
              </p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                <span className="text-sm font-medium">Emergency Contact</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedBooking?.emergencyContact || "Not provided"}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-gray-900 font-medium">{formatDate(selectedBooking?.createdAt)}</p>
              <p className="text-gray-600 text-sm mt-1">
                Last updated: {formatDate(selectedBooking?.updatedAt)}
              </p>
            </div>
          </div>

          {/* Special Requirements & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedBooking?.specialRequirements && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <h4 className="text-sm font-semibold text-amber-800 mb-2">Special Requirements</h4>
                <p className="text-amber-900 text-sm">{selectedBooking.specialRequirements}</p>
              </div>
            )}

            {selectedBooking?.additionalInfo && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-700 mb-2">Additional Information</h4>
                <p className="text-blue-900 text-sm">{selectedBooking.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      );
    } else if (modalType === "delete") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-800">Delete Booking</h4>
                <p className="text-red-700 mt-1 text-sm">
                  Are you sure you want to delete booking <strong className="font-bold">{selectedBooking?.bookingReference}</strong> for{" "}
                  <strong className="font-bold">{selectedBooking?.firstName} {selectedBooking?.lastName}</strong>? 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          {/* Personal Information */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Passenger Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="passenger@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="+1 234-567-8900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Enter nationality"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="+1 555-123-4567"
                />
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Flight Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Number *
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="UA 456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Airline *
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="United Airlines"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Airport *
                </label>
                <input
                  type="text"
                  name="airport"
                  value={formData.airport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="JFK International Airport"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terminal
                </label>
                <input
                  type="text"
                  name="terminal"
                  value={formData.terminal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Terminal 7"
                />
              </div>
            </div>
          </div>

          {/* Arrival & Departure */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">Arrival & Departure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrival Date *
                </label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrival Time *
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date *
                </label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time *
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-3">Service Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                  required
                >
                  <option value="standard_service">Standard Service ($100)</option>
                  <option value="meet_greet">Meet & Greet ($150)</option>
                  <option value="fast_track">Fast Track ($200)</option>
                  <option value="vip_service">VIP Service ($300)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Passengers
                </label>
                <select
                  name="numberOfPassengers"
                  value={formData.numberOfPassengers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">+$50 per additional passenger</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bags
                </label>
                <select
                  name="numberOfBags"
                  value={formData.numberOfBags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'bag' : 'bags'}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">+$20 per bag</p>
              </div>
            </div>

            {/* Price Calculation Display */}
            <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Total Amount:</div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(formData.totalAmount, formData.currency)}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Price calculated based on service type, passengers, and baggage
              </p>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="wechat_pay">WeChat Pay</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="Wheelchair assistance, child seats, pet transportation, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="Additional information about the trip"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  // Helper function to calculate duration
  const calculateDuration = (arrivalDate, departureDate) => {
    if (!arrivalDate || !departureDate) return 0;
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const diffTime = Math.abs(departure - arrival);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      
      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
        {/* Success/Error Notifications */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-green-800">{success}</p>
                  </div>
                  <button
                    onClick={handleCloseNotification}
                    className="ml-3 text-green-500 hover:text-green-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
            >
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                  <button
                    onClick={handleCloseNotification}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Airport Services Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage airport service bookings and passenger assistance
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Total: {filteredBookings.length} bookings</span>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, flight number, or booking reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Service Type Filter */}
              <div>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="all">All Services</option>
                  {uniqueServiceTypes.map(type => (
                    <option key={type} value={type}>{getServiceTypeDisplay(type)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleOpenModal("create")}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">New Booking</span>
              </button>

              <button
                onClick={fetchBookings}
                disabled={loading}
                className="px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${loading ? "animate-spin" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">
                  {loading ? "Refreshing..." : "Refresh Bookings"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Airport Service Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{bookingStats.total}</div>
                  <div className="text-xs text-gray-600">Total Bookings</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{bookingStats.confirmed}</div>
                  <div className="text-xs text-gray-600">Confirmed/Active</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{bookingStats.pending}</div>
                  <div className="text-xs text-gray-600">Pending</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {formatCurrency(bookingStats.totalRevenue, "USD")}
                  </div>
                  <div className="text-xs text-gray-600">Total Revenue</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
        >
          {loading ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center">
                <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading airport service bookings...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait while we fetch booking data</p>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No airport service bookings found</p>
                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                  {searchTerm || selectedStatus !== "all" || selectedServiceType !== "all"
                    ? "Try changing your search or filter criteria" 
                    : "No airport service bookings yet. Create your first booking!"}
                </p>
                {!searchTerm && selectedStatus === "all" && selectedServiceType === "all" && (
                  <button
                    onClick={() => handleOpenModal("create")}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create First Booking
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Passenger</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden sm:table-cell">Flight Details</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden md:table-cell">Service</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Amount</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden lg:table-cell">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentBookings.map((booking, index) => (
                      <motion.tr
                        key={booking.id || index}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                              {booking.firstName?.charAt(0) || "P"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                {booking.firstName} {booking.lastName}
                              </div>
                              <div className="text-gray-500 text-xs sm:hidden">{booking.flightNumber}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {booking.bookingReference}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden sm:table-cell">
                          <div className="font-medium">{booking.flightNumber}</div>
                          <div className="text-xs text-gray-500">{booking.airline}</div>
                          <div className="text-xs text-gray-500">{formatDate(booking.arrivalDate)}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden md:table-cell">
                          <div className="font-medium">{getServiceTypeDisplay(booking.serviceType)}</div>
                          <div className="text-xs text-gray-500">
                            {booking.numberOfPassengers} pax • {booking.numberOfBags} bags
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-gray-900">
                            {formatCurrency(booking.totalAmount, booking.currency)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.airport}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColorClass(booking.status)} shadow-sm`}>
                            {booking.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden lg:table-cell">
                          {formatDate(booking.arrivalDate)}
                          <div className="text-xs text-gray-500">
                            {booking.arrivalTime}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleOpenModal("view", booking)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="View Details"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleOpenModal("edit", booking)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                              title="Edit Booking"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleOpenModal("delete", booking)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete Booking"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                          <span className="font-medium">{Math.min(endIndex, filteredBookings.length)}</span> of{" "}
                          <span className="font-medium">{filteredBookings.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => page >= currentPage - 1 && page <= currentPage + 1)
                            .map(page => (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === page
                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {getModalTitle()}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-lg"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                  {renderModalContent()}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm"
                    >
                      Cancel
                    </button>
                    {(modalType === "create" || modalType === "edit" || modalType === "delete") && (
                      <button
                        onClick={handleModalAction}
                        disabled={loading}
                        className={`px-5 py-2.5 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${
                          modalType === "delete"
                            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            {modalType === "delete" ? "Deleting..." : modalType === "create" ? "Creating..." : "Updating..."}
                          </span>
                        ) : modalType === "delete" ? (
                          "Delete Booking"
                        ) : modalType === "create" ? (
                          "Create Booking"
                        ) : (
                          "Update Booking"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};