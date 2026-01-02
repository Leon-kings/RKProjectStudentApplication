/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  FileText, 
  MapPin,
  Briefcase,
  GraduationCap,
  Plane,
  Building,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export const VisaForm = ({ onSubmit, isLoading, selectedCountry }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
    },
    passportInfo: {
      passportNumber: '',
      nationality: '',
      issueDate: '',
      expiryDate: '',
      issueCountry: '',
    },
    travelInfo: {
      visaType: '',
      purpose: '',
      duration: '30',
      arrivalDate: '',
      departureDate: '',
      accommodationType: '',
      accommodationDetails: '',
    },
    employmentInfo: {
      employmentStatus: '',
      companyName: '',
      jobTitle: '',
      monthlyIncome: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const formContainerRef = useRef(null);
  const inputRefs = useRef({});

  const visaTypes = useMemo(() => [
    { value: 'tourist', label: 'Tourist', icon: <Plane className="w-5 h-5" /> },
    { value: 'business', label: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'student', label: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
    { value: 'work', label: 'Work', icon: <Building className="w-5 h-5" /> },
    { value: 'transit', label: 'Transit', icon: <Clock className="w-5 h-5" /> },
    { value: 'medical', label: 'Medical', icon: <AlertCircle className="w-5 h-5" /> },
  ], []);

  const genders = useMemo(() => ['Male', 'Female', 'Other'], []);
  const maritalStatuses = useMemo(() => ['Single', 'Married', 'Divorced', 'Widowed'], []);
  const employmentStatuses = useMemo(() => ['Employed', 'Self-Employed', 'Student', 'Unemployed', 'Retired'], []);
  const accommodationTypes = useMemo(() => ['Hotel', 'Friend/Family', 'Rental', 'Own Property', 'Other'], []);

  // Direct event handler - no wrapper functions
  const handleInputChange = useCallback((section, field) => (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  // Direct value setter for non-input fields
  const handleValueChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const validateStep = useCallback((step) => {
    switch(step) {
      case 1:
        return (
          formData.personalInfo.firstName &&
          formData.personalInfo.lastName &&
          formData.personalInfo.email &&
          formData.personalInfo.phone &&
          formData.personalInfo.dateOfBirth &&
          formData.personalInfo.gender
        );
      case 2:
        return (
          formData.passportInfo.passportNumber &&
          formData.passportInfo.nationality &&
          formData.passportInfo.expiryDate
        );
      case 3:
        return (
          formData.travelInfo.visaType &&
          formData.travelInfo.arrivalDate &&
          formData.travelInfo.duration
        );
      default:
        return true;
    }
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error('Please fill in all required fields');
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    } else {
      toast.error('Please complete all required fields');
    }
  }, [currentStep, formData, onSubmit, validateStep]);

  // Focus first input on step change
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = document.querySelector(
        `#step-${currentStep} input:not([type="hidden"]), 
         #step-${currentStep} select, 
         #step-${currentStep} textarea`
      );
      
      if (firstInput && !firstInput.contains(document.activeElement)) {
        firstInput.focus({ preventScroll: true });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const renderStepIndicator = () => {
    const stepLabels = ['Personal', 'Passport', 'Travel', 'Employment', 'Review'];
    
    return (
      <div className="mb-8 bg-white">
        <div className="hidden md:flex justify-between items-center mb-4">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;
            
            return (
              <button
                key={stepNumber}
                type="button"
                onClick={() => {
                  if (stepNumber < currentStep || (stepNumber > currentStep && validateStep(stepNumber - 1))) {
                    setCurrentStep(stepNumber);
                  }
                }}
                className={`flex flex-col items-center flex-1 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-lg ${
                  stepNumber < currentStep || (stepNumber > currentStep && validateStep(stepNumber - 1)) 
                    ? 'cursor-pointer' 
                    : 'cursor-not-allowed'
                }`}
                disabled={stepNumber > currentStep && !validateStep(stepNumber - 1)}
              >
                <div className="flex items-center w-full">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-blue-600 text-white border-2 border-blue-600 scale-110' : 
                      isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : 
                      'bg-white border-2 border-gray-300 text-gray-400 hover:border-gray-400'}`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`flex-1 h-1 mx-2 transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                  )}
                </div>
                <div className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'}`}
                >
                  {label}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Mobile step indicator */}
        <div className="md:hidden bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {stepLabels[currentStep - 1]}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Simple InputField component without memo - simpler is better
  const InputField = ({ label, type = 'text', value, onChange, required = false, icon, placeholder, name, ...props }) => {
    return (
      <div className="w-full">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-800 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 bg-white
              ${icon ? 'pl-11' : 'pl-4'}
              placeholder:text-gray-400
              hover:border-gray-400
            `}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    );
  };

  // Simple ButtonGroup
  const ButtonGroup = ({ options, value, onChange, className = '', name }) => (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`
              px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${value === option 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  // Simple IconButtonGroup
  const IconButtonGroup = ({ options, value, onChange, name }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${value === option.value 
              ? 'bg-blue-50 border-blue-500 text-blue-700' 
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}
          `}
        >
          <div className="mb-2">{option.icon}</div>
          <div className="text-xs font-semibold text-center">{option.label}</div>
        </button>
      ))}
    </div>
  );

  // Render steps directly - no memo, no complex logic
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            id="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <p className="text-gray-600 mt-1">Enter your personal details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                name="firstName"
                label="First Name"
                value={formData.personalInfo.firstName}
                onChange={handleInputChange('personalInfo', 'firstName')}
                required
                placeholder="John"
              />
              
              <InputField
                name="lastName"
                label="Last Name"
                value={formData.personalInfo.lastName}
                onChange={handleInputChange('personalInfo', 'lastName')}
                required
                placeholder="Doe"
              />

              <InputField
                name="email"
                label="Email Address"
                type="email"
                value={formData.personalInfo.email}
                onChange={handleInputChange('personalInfo', 'email')}
                required
                icon={<Mail className="w-5 h-5" />}
                placeholder="john@example.com"
              />

              <InputField
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.personalInfo.phone}
                onChange={handleInputChange('personalInfo', 'phone')}
                required
                icon={<Phone className="w-5 h-5" />}
                placeholder="+1 234 567 8900"
              />

              <InputField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formData.personalInfo.dateOfBirth}
                onChange={handleInputChange('personalInfo', 'dateOfBirth')}
                required
                icon={<Calendar className="w-5 h-5" />}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <ButtonGroup
                  name="gender"
                  options={genders}
                  value={formData.personalInfo.gender}
                  onChange={(value) => handleValueChange('personalInfo', 'gender', value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Marital Status
              </label>
              <ButtonGroup
                name="maritalStatus"
                options={maritalStatuses}
                value={formData.personalInfo.maritalStatus}
                onChange={(value) => handleValueChange('personalInfo', 'maritalStatus', value)}
                className="md:grid-cols-4"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            id="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Passport Information</h3>
                <p className="text-gray-600 mt-1">Enter your passport details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                name="passportNumber"
                label="Passport Number"
                value={formData.passportInfo.passportNumber}
                onChange={handleInputChange('passportInfo', 'passportNumber')}
                required
                placeholder="A12345678"
              />

              <InputField
                name="nationality"
                label="Nationality"
                value={formData.passportInfo.nationality}
                onChange={handleInputChange('passportInfo', 'nationality')}
                required
                icon={<Globe className="w-5 h-5" />}
                placeholder="Your nationality"
              />

              <InputField
                name="issueDate"
                label="Issue Date"
                type="date"
                value={formData.passportInfo.issueDate}
                onChange={handleInputChange('passportInfo', 'issueDate')}
              />

              <InputField
                name="expiryDate"
                label="Expiry Date"
                type="date"
                value={formData.passportInfo.expiryDate}
                onChange={handleInputChange('passportInfo', 'expiryDate')}
                required
              />

              <div className="md:col-span-2">
                <InputField
                  name="issueCountry"
                  label="Issue Country"
                  value={formData.passportInfo.issueCountry}
                  onChange={handleInputChange('passportInfo', 'issueCountry')}
                  placeholder="Country where passport was issued"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            id="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Travel Information</h3>
                <p className="text-gray-600 mt-1">Enter your travel details</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Visa Type <span className="text-red-500">*</span>
                </label>
                <IconButtonGroup
                  name="visaType"
                  options={visaTypes}
                  value={formData.travelInfo.visaType}
                  onChange={(value) => handleValueChange('travelInfo', 'visaType', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="arrivalDate"
                  label="Arrival Date"
                  type="date"
                  value={formData.travelInfo.arrivalDate}
                  onChange={handleInputChange('travelInfo', 'arrivalDate')}
                  required
                />

                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-800 mb-2">
                    Duration (Days) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.travelInfo.duration}
                    onChange={handleInputChange('travelInfo', 'duration')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      bg-white transition-all duration-200 hover:border-gray-400"
                  >
                    <option value="15">15 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">365 days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Accommodation Type
                </label>
                <ButtonGroup
                  name="accommodationType"
                  options={accommodationTypes}
                  value={formData.travelInfo.accommodationType}
                  onChange={(value) => handleValueChange('travelInfo', 'accommodationType', value)}
                  className="md:grid-cols-5"
                />
              </div>

              <div>
                <label htmlFor="accommodationDetails" className="block text-sm font-semibold text-gray-800 mb-2">
                  Accommodation Details
                </label>
                <textarea
                  id="accommodationDetails"
                  name="accommodationDetails"
                  value={formData.travelInfo.accommodationDetails}
                  onChange={handleInputChange('travelInfo', 'accommodationDetails')}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    resize-none transition-all duration-200 hover:border-gray-400"
                  placeholder="Hotel name, friend's address, rental details, etc."
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-semibold text-gray-800 mb-2">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.travelInfo.purpose}
                  onChange={handleInputChange('travelInfo', 'purpose')}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    resize-none transition-all duration-200 hover:border-gray-400"
                  placeholder="Please describe in detail the purpose of your visit..."
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            id="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Employment Information</h3>
                <p className="text-gray-600 mt-1">Enter your employment details</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Employment Status
                </label>
                <ButtonGroup
                  name="employmentStatus"
                  options={employmentStatuses}
                  value={formData.employmentInfo.employmentStatus}
                  onChange={(value) => handleValueChange('employmentInfo', 'employmentStatus', value)}
                  className="md:grid-cols-5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="companyName"
                  label="Company Name"
                  value={formData.employmentInfo.companyName}
                  onChange={handleInputChange('employmentInfo', 'companyName')}
                  placeholder="Company/organization name"
                />

                <InputField
                  name="jobTitle"
                  label="Job Title"
                  value={formData.employmentInfo.jobTitle}
                  onChange={handleInputChange('employmentInfo', 'jobTitle')}
                  placeholder="Your position"
                />

                <div className="md:col-span-2">
                  <label htmlFor="monthlyIncome" className="block text-sm font-semibold text-gray-800 mb-2">
                    Monthly Income (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      type="number"
                      value={formData.employmentInfo.monthlyIncome}
                      onChange={handleInputChange('employmentInfo', 'monthlyIncome')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-all duration-200 hover:border-gray-400"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            id="step-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
                <p className="text-gray-600 mt-1">Review your information before submitting</p>
              </div>
            </div>

            <div className="space-y-6">
              {['personalInfo', 'passportInfo', 'travelInfo'].map((section) => (
                <div key={section} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4 capitalize">
                    {section.replace('Info', '')} Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(formData[section]).map(([key, value]) => (
                      value && (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-semibold text-gray-900">{value}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mt-1 mr-3 w-5 h-5 rounded focus:ring-blue-500 text-blue-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I certify that all information provided is accurate and complete. I agree to the 
                    terms of service and privacy policy. I understand that providing false information 
                    may result in visa denial and legal consequences.
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visa Application</h1>
              <p className="text-gray-600 mt-2">Complete the form below to apply for your visa</p>
            </div>
            {selectedCountry && (
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
                <Globe className="w-4 h-4 mr-2" />
                Destination: {selectedCountry}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {renderStepIndicator()}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="bg-white">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl 
                    hover:bg-gray-50 transition-all duration-200 font-medium
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
            </div>
            
            <div>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl 
                    hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-xl 
                    hover:bg-green-700 transition-all duration-200 font-semibold shadow-sm hover:shadow
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};