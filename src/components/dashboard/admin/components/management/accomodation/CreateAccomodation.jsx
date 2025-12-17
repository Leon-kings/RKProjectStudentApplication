import React, { useState } from 'react';
import {
  Hotel as HotelIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  Image as ImageIcon,
  Wifi as WifiIcon,
  LocalLaundryService as LaundryIcon,
  Kitchen as KitchenIcon,
  AcUnit as AcIcon,
  LocalParking as ParkingIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  Tv as TvIcon
} from '@mui/icons-material';

// API configuration
const API_BASE_URL = 'https://api.recapply.com'; // Replace with your actual API URL
const API_ENDPOINTS = {
  CREATE_ACCOMMODATION: '/api/accommodations',
};

const INITIAL_FORM_STATE = {
  // Basic Information
  propertyName: '',
  propertyType: 'apartment',
  description: '',
  
  // Location
  address: '',
  city: '',
  country: '',
  postalCode: '',
  
  // Contact Information
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  
  // University Information
  nearbyUniversities: '',
  distanceToUniversity: '',
  
  // Pricing
  pricePerMonth: '',
  currency: 'USD',
  securityDeposit: '',
  utilitiesIncluded: false,
  
  // Accommodation Details
  totalRooms: '',
  availableRooms: '',
  roomTypes: '',
  bathroomType: 'shared',
  
  // Features & Amenities
  features: [],
  
  // Availability
  availableFrom: '',
  availableUntil: '',
  
  // Photos (simplified as file input)
  photos: [],
  
  // Booking Rules
  minimumStay: '1',
  maximumOccupancy: '2',
  bookingTerms: ''
};

const FEATURE_OPTIONS = [
  { id: 'wifi', label: 'WiFi', icon: <WifiIcon className="w-5 h-5" /> },
  { id: 'laundry', label: 'Laundry', icon: <LaundryIcon className="w-5 h-5" /> },
  { id: 'kitchen', label: 'Kitchen', icon: <KitchenIcon className="w-5 h-5" /> },
  { id: 'ac', label: 'Air Conditioning', icon: <AcIcon className="w-5 h-5" /> },
  { id: 'parking', label: 'Parking', icon: <ParkingIcon className="w-5 h-5" /> },
  { id: 'pool', label: 'Swimming Pool', icon: <PoolIcon className="w-5 h-5" /> },
  { id: 'gym', label: 'Gym', icon: <GymIcon className="w-5 h-5" /> },
  { id: 'tv', label: 'TV', icon: <TvIcon className="w-5 h-5" /> },
  { id: 'furnished', label: 'Furnished', icon: <HotelIcon className="w-5 h-5" /> },
  { id: 'utilities', label: 'Utilities Included', icon: <MoneyIcon className="w-5 h-5" /> },
];

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'studio', label: 'Studio' },
  { value: 'shared_room', label: 'Shared Room' },
  { value: 'private_room', label: 'Private Room' },
  { value: 'dormitory', label: 'Dormitory' },
  { value: 'hostel', label: 'Hostel' },
];

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'RWF', label: 'Rwandan Franc (RWF)' },
  { value: 'KES', label: 'Kenyan Shilling (KES)' },
];

export const CreateAccommodation = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);
  
  // File input state
  const [imageFiles, setImageFiles] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle feature selection
  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      features: selectedFeatures.includes(featureId) 
        ? selectedFeatures.filter(id => id !== featureId)
        : [...selectedFeatures, featureId]
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    // Create preview for first image
    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.propertyName.trim()) newErrors.propertyName = 'Property name is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email address';
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone number is required';
    if (!formData.pricePerMonth) newErrors.pricePerMonth = 'Price is required';
    else if (isNaN(formData.pricePerMonth) || parseFloat(formData.pricePerMonth) <= 0) {
      newErrors.pricePerMonth = 'Price must be a positive number';
    }
    if (!formData.totalRooms) newErrors.totalRooms = 'Total rooms is required';
    else if (isNaN(formData.totalRooms) || parseInt(formData.totalRooms) <= 0) {
      newErrors.totalRooms = 'Must be a positive number';
    }
    if (!formData.availableRooms) newErrors.availableRooms = 'Available rooms is required';
    else if (isNaN(formData.availableRooms) || parseInt(formData.availableRooms) <= 0) {
      newErrors.availableRooms = 'Must be a positive number';
    }
    else if (parseInt(formData.availableRooms) > parseInt(formData.totalRooms || 0)) {
      newErrors.availableRooms = 'Available rooms cannot exceed total rooms';
    }
    if (!formData.availableFrom) newErrors.availableFrom = 'Available from date is required';
    if (!formData.availableUntil) newErrors.availableUntil = 'Available until date is required';
    else if (formData.availableFrom && formData.availableUntil) {
      const fromDate = new Date(formData.availableFrom);
      const untilDate = new Date(formData.availableUntil);
      if (untilDate <= fromDate) {
        newErrors.availableUntil = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prepare form data for API submission
  const prepareFormData = () => {
    const data = {
      ...formData,
      features: selectedFeatures,
      pricePerMonth: parseFloat(formData.pricePerMonth),
      securityDeposit: formData.securityDeposit ? parseFloat(formData.securityDeposit) : 0,
      totalRooms: parseInt(formData.totalRooms),
      availableRooms: parseInt(formData.availableRooms),
      minimumStay: parseInt(formData.minimumStay),
      maximumOccupancy: parseInt(formData.maximumOccupancy),
      // Convert photos to Base64 (in real app, you'd upload files separately)
      photos: imageFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };
    
    return data;
  };

  // Submit form to API
  const submitToAPI = async (formDataToSubmit) => {
    try {
      // In a real application, you would use the actual API endpoint
      // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_ACCOMMODATION}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(formDataToSubmit)
      // });
      
      // if (!response.ok) {
      //   throw new Error(`API Error: ${response.status}`);
      // }
      
      // const result = await response.json();
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = {
        success: true,
        data: {
          id: 'ACC-' + Date.now(),
          ...formDataToSubmit,
          createdAt: new Date().toISOString(),
          status: 'active'
        },
        message: 'Accommodation created successfully!'
      };
      
      return mockResponse;
      
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage('Please fix the errors in the form');
      setShowErrorModal(true);
      return;
    }
    
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // Confirm submission
  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    
    try {
      const preparedData = prepareFormData();
      const result = await submitToAPI(preparedData);
      
      if (result.success) {
        setSuccessData(result.data);
        setShowSuccessModal(true);
        resetForm();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create accommodation. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setSelectedFeatures([]);
    setImageFiles([]);
    setPreviewImage(null);
    setErrors({});
  };

  // Calculate total deposit
  const calculateTotalDeposit = () => {
    const price = parseFloat(formData.pricePerMonth) || 0;
    const deposit = parseFloat(formData.securityDeposit) || 0;
    return price + deposit;
  };

  // Format currency
  const formatCurrency = (amount) => {
    const currencySymbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'RWF': 'RWF ',
      'KES': 'KES '
    };
    
    const symbol = currencySymbols[formData.currency] || formData.currency + ' ';
    return symbol + parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Modal components
  const SuccessModal = () => (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Success!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Accommodation has been created successfully.
            </p>
            
            {successData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Reference ID:</span> {successData.id}
                  </p>
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Property:</span> {successData.propertyName}
                  </p>
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Status:</span> <span className="capitalize">{successData.status}</span>
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSuccessData(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-md transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const ErrorModal = () => (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
              <ErrorIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Error
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {errorMessage}
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 shadow-md transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const ConfirmModal = () => (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <WarningIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to create this accommodation listing?
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Submission Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{formData.propertyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="font-medium">{formatCurrency(formData.pricePerMonth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Rooms:</span>
                  <span className="font-medium">{formData.availableRooms} of {formData.totalRooms}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Confirm & Create'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Modals */}
      {showSuccessModal && <SuccessModal />}
      {showErrorModal && <ErrorModal />}
      {showConfirmModal && <ConfirmModal />}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Create New Accommodation
              </h1>
              <p className="text-gray-600">
                Add a new property to your accommodation listings
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={resetForm}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center">
              <div className={`flex items-center ${isSubmitting ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSubmitting ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  ) : (
                    <span>1</span>
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">Filling Form</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex items-center text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span>2</span>
                </div>
                <span className="ml-2 text-sm font-medium">Review & Submit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Card 1: Basic Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <HotelIcon className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Name *
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      required
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                        errors.propertyName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="e.g., Sunrise Apartments"
                      disabled={isSubmitting}
                    />
                    {errors.propertyName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ErrorIcon className="w-4 h-4 mr-1" />
                        {errors.propertyName}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.propertyType ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Type</option>
                        {PROPERTY_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.propertyType && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.propertyType}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Rooms *
                      </label>
                      <input
                        type="number"
                        name="totalRooms"
                        required
                        min="1"
                        value={formData.totalRooms}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.totalRooms ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="e.g., 10"
                        disabled={isSubmitting}
                      />
                      {errors.totalRooms && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.totalRooms}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows="4"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-none ${
                        errors.description ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Describe the property, rooms, and overall experience..."
                      disabled={isSubmitting}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ErrorIcon className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Location Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <LocationIcon className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Location Details</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Full street address"
                      disabled={isSubmitting}
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ErrorIcon className="w-4 h-4 mr-1" />
                        {errors.address}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.city ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="e.g., Kigali"
                        disabled={isSubmitting}
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.country ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="e.g., Rwanda"
                        disabled={isSubmitting}
                      />
                      {errors.country && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.country}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="e.g., 00000"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nearby Universities
                      </label>
                      <input
                        type="text"
                        name="nearbyUniversities"
                        value={formData.nearbyUniversities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="e.g., University of Rwanda, KIST"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Distance to University (km)
                      </label>
                      <input
                        type="number"
                        name="distanceToUniversity"
                        step="0.1"
                        value={formData.distanceToUniversity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="e.g., 2.5"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <PersonIcon className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.contactPerson ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="Full name"
                        disabled={isSubmitting}
                      />
                      {errors.contactPerson && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.contactPerson}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        required
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.contactEmail ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="contact@example.com"
                        disabled={isSubmitting}
                      />
                      {errors.contactEmail && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      required
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                        errors.contactPhone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="+250 783 408 617"
                      disabled={isSubmitting}
                    />
                    {errors.contactPhone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ErrorIcon className="w-4 h-4 mr-1" />
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 4: Pricing & Availability */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <MoneyIcon className="w-6 h-6 text-yellow-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Pricing & Availability</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price per Month *
                      </label>
                      <input
                        type="number"
                        name="pricePerMonth"
                        required
                        min="0"
                        step="0.01"
                        value={formData.pricePerMonth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.pricePerMonth ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="e.g., 500"
                        disabled={isSubmitting}
                      />
                      {errors.pricePerMonth && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.pricePerMonth}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        disabled={isSubmitting}
                      >
                        {CURRENCY_OPTIONS.map(currency => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Security Deposit
                      </label>
                      <input
                        type="number"
                        name="securityDeposit"
                        min="0"
                        step="0.01"
                        value={formData.securityDeposit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="e.g., 200"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Available Rooms *
                      </label>
                      <input
                        type="number"
                        name="availableRooms"
                        required
                        min="1"
                        value={formData.availableRooms}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.availableRooms ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="e.g., 5"
                        disabled={isSubmitting}
                      />
                      {errors.availableRooms && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.availableRooms}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Available From *
                      </label>
                      <input
                        type="date"
                        name="availableFrom"
                        required
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.availableFrom ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.availableFrom && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.availableFrom}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Available Until *
                      </label>
                      <input
                        type="date"
                        name="availableUntil"
                        required
                        value={formData.availableUntil}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${
                          errors.availableUntil ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.availableUntil && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <ErrorIcon className="w-4 h-4 mr-1" />
                          {errors.availableUntil}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="utilitiesIncluded"
                      name="utilitiesIncluded"
                      checked={formData.utilitiesIncluded}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="utilitiesIncluded" className="ml-3 text-sm text-gray-700">
                      Utilities (water, electricity, internet) included in price
                    </label>
                  </div>
                </div>
              </div>

              {/* Card 5: Features & Amenities */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <StarIcon className="w-6 h-6 text-orange-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Features & Amenities</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-600 mb-4">Select all available features:</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {FEATURE_OPTIONS.map(feature => (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          selectedFeatures.includes(feature.id)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                        disabled={isSubmitting}
                      >
                        <div className={`mb-2 ${selectedFeatures.includes(feature.id) ? 'text-blue-600' : 'text-gray-500'}`}>
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium">{feature.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 6: Images */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <ImageIcon className="w-6 h-6 text-pink-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Property Images</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Property Photos
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="propertyPhotos"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="propertyPhotos" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium">
                            Click to upload photos
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            Upload clear images of the property (max 10 images)
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    {imageFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Selected files: {imageFiles.length}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {imageFiles.map((file, index) => (
                            <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                              <ImageIcon className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-700 truncate max-w-xs">
                                {file.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {previewImage && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden">
                          <img
                            src={previewImage}
                            alt="Property preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating Accommodation...
                    </>
                  ) : (
                    'Create Accommodation Listing'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Preview & Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Name:</span>
                    <span className="font-semibold text-gray-900 truncate ml-2">
                      {formData.propertyName || 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-gray-900 truncate ml-2">
                      {formData.city ? `${formData.city}, ${formData.country}` : 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {formData.propertyType ? formData.propertyType.replace('_', ' ') : 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Price:</span>
                    <span className="font-semibold text-blue-600">
                      {formData.pricePerMonth ? formatCurrency(formData.pricePerMonth) : 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Rooms:</span>
                    <span className="font-semibold text-gray-900">
                      {formData.availableRooms || '0'} / {formData.totalRooms || '0'}
                    </span>
                  </div>
                  
                  {formData.securityDeposit && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Security Deposit:</span>
                      <span className="font-semibold text-yellow-600">
                        {formatCurrency(formData.securityDeposit)}
                      </span>
                    </div>
                  )}
                  
                  {formData.pricePerMonth && formData.securityDeposit && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">Total Deposit:</span>
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(calculateTotalDeposit())}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Preview */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Features</h3>
                
                {selectedFeatures.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No features selected</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map(featureId => {
                      const feature = FEATURE_OPTIONS.find(f => f.id === featureId);
                      return feature ? (
                        <div
                          key={featureId}
                          className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
                        >
                          <div className="w-4 h-4 mr-2 text-blue-600">
                            {feature.icon}
                          </div>
                          <span className="text-sm font-medium">{feature.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <CheckIcon className="w-5 h-5 text-blue-600 mr-2" />
                  Tips for Success
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Use clear, high-quality photos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Be specific about location and distance to universities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Include all amenities and features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Set realistic availability dates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Double-check contact information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};