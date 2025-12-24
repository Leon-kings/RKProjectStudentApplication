/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { Sidebar } from "../../sidebar/Sidebar";

export const UserAdmissionsManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [modalType, setModalType] = useState("view"); // 'view', 'edit', 'create', 'delete'
  const [formData, setFormData] = useState({
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
    intakeYear: new Date().getFullYear() + 1,
    documents: "pending",
    essay: "pending",
    additionalInfo: "",
    status: "pending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  
  // Mock data for demonstration
  const mockAdmissions = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234-567-890',
      nationality: 'United States',
      currentEducation: 'Bachelor Degree',
      gpa: '3.8',
      targetUniversity: 'Harvard University',
      targetCountry: 'USA',
      targetProgram: 'Computer Science',
      scholarshipInterest: 'Full Scholarship',
      intakeYear: '2024',
      documents: 'submitted',
      essay: 'reviewed',
      additionalInfo: 'Published research paper in AI',
      status: 'approved',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10',
      applicationId: 'APP-001'
    },
    {
      id: 2,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.g@example.com',
      phone: '+34 600-123-456',
      nationality: 'Spain',
      currentEducation: 'High School',
      gpa: '4.2',
      targetUniversity: 'University of Barcelona',
      targetCountry: 'Spain',
      targetProgram: 'Business Administration',
      scholarshipInterest: 'Partial Scholarship',
      intakeYear: '2024',
      documents: 'pending',
      essay: 'submitted',
      additionalInfo: 'Family business experience',
      status: 'under_review',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-08',
      applicationId: 'APP-002'
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
      documents: 'completed',
      essay: 'pending',
      additionalInfo: 'Volunteer experience in healthcare',
      status: 'rejected',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12',
      applicationId: 'APP-003'
    },
    {
      id: 4,
      firstName: 'Chen',
      lastName: 'Wang',
      email: 'chen.wang@example.com',
      phone: '+86 138-001-3800',
      nationality: 'China',
      currentEducation: 'Master Degree',
      gpa: '3.9',
      targetUniversity: 'Tsinghua University',
      targetCountry: 'China',
      targetProgram: 'Engineering',
      scholarshipInterest: 'Research Scholarship',
      intakeYear: '2024',
      documents: 'submitted',
      essay: 'reviewed',
      additionalInfo: 'Patent holder in renewable energy',
      status: 'approved',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-09',
      applicationId: 'APP-004'
    },
    {
      id: 5,
      firstName: 'Sarah',
      lastName: 'Miller',
      email: 'sarah.m@example.com',
      phone: '+44 7700-900-123',
      nationality: 'United Kingdom',
      currentEducation: 'Bachelor Degree',
      gpa: '3.6',
      targetUniversity: 'University of Oxford',
      targetCountry: 'UK',
      targetProgram: 'Law',
      scholarshipInterest: 'None',
      intakeYear: '2025',
      documents: 'incomplete',
      essay: 'not_started',
      additionalInfo: 'Internship at law firm',
      status: 'pending',
      createdAt: '2024-01-07',
      updatedAt: '2024-01-07',
      applicationId: 'APP-005'
    },
    {
      id: 6,
      firstName: 'Kenji',
      lastName: 'Tanaka',
      email: 'kenji.t@example.com',
      phone: '+81 90-1234-5678',
      nationality: 'Japan',
      currentEducation: 'High School',
      gpa: '4.5',
      targetUniversity: 'University of Tokyo',
      targetCountry: 'Japan',
      targetProgram: 'Robotics',
      scholarshipInterest: 'Government Scholarship',
      intakeYear: '2024',
      documents: 'verified',
      essay: 'approved',
      additionalInfo: 'National robotics competition winner',
      status: 'accepted',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-11',
      applicationId: 'APP-006'
    },
    {
      id: 7,
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma.w@example.com',
      phone: '+1 555-123-4567',
      nationality: 'Canada',
      currentEducation: 'Bachelor Degree',
      gpa: '3.9',
      targetUniversity: 'University of Toronto',
      targetCountry: 'Canada',
      targetProgram: 'Medicine',
      scholarshipInterest: 'Merit-based Scholarship',
      intakeYear: '2024',
      documents: 'submitted',
      essay: 'reviewed',
      additionalInfo: 'Medical research internship',
      status: 'approved',
      createdAt: '2024-01-06',
      updatedAt: '2024-01-13',
      applicationId: 'APP-007'
    },
    {
      id: 8,
      firstName: 'Ahmed',
      lastName: 'Khan',
      email: 'ahmed.k@example.com',
      phone: '+92 300-123-4567',
      nationality: 'Pakistan',
      currentEducation: 'High School',
      gpa: '4.3',
      targetUniversity: 'NUST',
      targetCountry: 'Pakistan',
      targetProgram: 'Engineering',
      scholarshipInterest: 'Full Scholarship',
      intakeYear: '2024',
      documents: 'pending',
      essay: 'draft',
      additionalInfo: 'National science olympiad winner',
      status: 'pending',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-09',
      applicationId: 'APP-008'
    },
    {
      id: 9,
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.m@example.com',
      phone: '+33 612-345-678',
      nationality: 'France',
      currentEducation: 'Bachelor Degree',
      gpa: '3.7',
      targetUniversity: 'Sorbonne University',
      targetCountry: 'France',
      targetProgram: 'Arts & Humanities',
      scholarshipInterest: 'Partial Scholarship',
      intakeYear: '2025',
      documents: 'completed',
      essay: 'approved',
      additionalInfo: 'Published poet',
      status: 'accepted',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-15',
      applicationId: 'APP-009'
    },
    {
      id: 10,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.b@example.com',
      phone: '+1 212-555-7890',
      nationality: 'United States',
      currentEducation: 'Master Degree',
      gpa: '3.5',
      targetUniversity: 'MIT',
      targetCountry: 'USA',
      targetProgram: 'Computer Science',
      scholarshipInterest: 'Research Scholarship',
      intakeYear: '2024',
      documents: 'verified',
      essay: 'reviewed',
      additionalInfo: 'AI startup founder',
      status: 'under_review',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-18',
      applicationId: 'APP-010'
    }
  ];

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // API base URL
  const API_URL = "https://ruziganodejs.onrender.com/api/admissions";

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

  // Generate application ID
  const generateApplicationId = () => {
    const prefix = "APP-";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };

  // Fetch admissions from API
  const fetchAdmissions = async () => {
    setLoading(true);
    setError("");
    try {
      // Mock data for demonstration
      setTimeout(() => {
        const sortedData = [...mockAdmissions].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAdmissions(sortedData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error("Error fetching admissions:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch admission applications. Please check your connection."
      );
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Sort admissions
  const sortAdmissions = (admissionsList) => {
    if (!sortConfig.key) return admissionsList;
    
    return [...admissionsList].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter admissions
  const filteredAdmissions = sortAdmissions(admissions.filter((admission) => {
    const matchesSearch = 
      admission.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.phone?.includes(searchTerm) ||
      admission.applicationId?.includes(searchTerm) ||
      admission.targetProgram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.targetUniversity?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || admission.status === selectedStatus;
    const matchesProgram = selectedProgram === "all" || admission.targetProgram === selectedProgram;
    const matchesCountry = selectedCountry === "all" || admission.targetCountry === selectedCountry;
    
    return matchesSearch && matchesStatus && matchesProgram && matchesCountry;
  }));

  // Get unique programs and countries for filters
  const uniquePrograms = [...new Set(admissions.map(a => a.targetProgram).filter(Boolean))];
  const uniqueCountries = [...new Set(admissions.map(a => a.targetCountry).filter(Boolean))];

  // Pagination
  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAdmissions = filteredAdmissions.slice(startIndex, endIndex);

  // Handle modal open
  const handleOpenModal = (type, admission = null) => {
    setModalType(type);
    setSelectedAdmission(admission);
    
    if (type === "create") {
      setFormData({
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
        intakeYear: new Date().getFullYear() + 1,
        documents: "pending",
        essay: "pending",
        additionalInfo: "",
        status: "pending",
      });
    } else if (admission && (type === "edit" || type === "view")) {
      setFormData({
        firstName: admission.firstName || "",
        lastName: admission.lastName || "",
        email: admission.email || "",
        phone: admission.phone || "",
        nationality: admission.nationality || "",
        currentEducation: admission.currentEducation || "",
        gpa: admission.gpa || "",
        targetUniversity: admission.targetUniversity || "",
        targetCountry: admission.targetCountry || "",
        targetProgram: admission.targetProgram || "",
        scholarshipInterest: admission.scholarshipInterest || "",
        intakeYear: admission.intakeYear || new Date().getFullYear() + 1,
        documents: admission.documents || "pending",
        essay: admission.essay || "pending",
        additionalInfo: admission.additionalInfo || "",
        status: admission.status || "pending",
      });
    }
    
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmission(null);
    setFormData({
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
      intakeYear: new Date().getFullYear() + 1,
      documents: "pending",
      essay: "pending",
      additionalInfo: "",
      status: "pending",
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.nationality || formData.nationality.trim() === "") {
      errors.push("Nationality is required");
    }

    if (!formData.targetUniversity || formData.targetUniversity.trim() === "") {
      errors.push("Target university is required");
    }

    if (!formData.targetProgram || formData.targetProgram.trim() === "") {
      errors.push("Target program is required");
    }

    if (formData.gpa && (isNaN(formData.gpa) || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4.5)) {
      errors.push("GPA must be between 0 and 4.5");
    }

    return errors;
  };

  // CREATE - Add new admission
  const handleCreateAdmission = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setLoading(true);
    try {
      const newAdmission = {
        id: admissions.length + 1,
        ...formData,
        applicationId: generateApplicationId(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      setAdmissions(prev => [newAdmission, ...prev]);
      setSuccess("Admission application created successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error creating admission:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create admission application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Edit admission
  const handleUpdateAdmission = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    if (!selectedAdmission || !selectedAdmission.id) {
      setError("No admission selected for update");
      return;
    }

    setLoading(true);
    try {
      const updatedAdmission = {
        ...selectedAdmission,
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0],
      };

      setAdmissions(prev => 
        prev.map(adm => adm.id === selectedAdmission.id ? updatedAdmission : adm)
      );
      setSuccess("Admission application updated successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error updating admission:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update admission application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Remove admission
  const handleDeleteAdmission = async () => {
    if (!selectedAdmission || !selectedAdmission.id) {
      setError("No admission selected for deletion");
      return;
    }

    setLoading(true);
    try {
      setAdmissions(prev => prev.filter(adm => adm.id !== selectedAdmission.id));
      setSuccess("Admission application deleted successfully!");
      handleCloseModal();
      
    } catch (err) {
      console.error("Error deleting admission:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete admission application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle modal action
  const handleModalAction = () => {
    if (modalType === "create") {
      handleCreateAdmission();
    } else if (modalType === "edit") {
      handleUpdateAdmission();
    } else if (modalType === "delete") {
      handleDeleteAdmission();
    }
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "accepted":
        return "bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 border border-green-200";
      case "pending":
      case "under_review":
        return "bg-gradient-to-r from-yellow-50 to-amber-100 text-yellow-700 border border-yellow-200";
      case "rejected":
      case "cancelled":
        return "bg-gradient-to-r from-red-50 to-pink-100 text-red-700 border border-red-200";
      case "submitted":
        return "bg-gradient-to-r from-blue-50 to-cyan-100 text-blue-700 border border-blue-200";
      case "incomplete":
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200";
    }
  };

  // Get document status color
  const getDocumentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "submitted":
      case "verified":
        return "text-green-600 bg-green-50";
      case "pending":
      case "reviewed":
        return "text-yellow-600 bg-yellow-50";
      case "incomplete":
      case "not_started":
        return "text-red-600 bg-red-50";
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

  // Get GPA color based on value
  const getGPAColor = (gpa) => {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 4.0) return "text-green-600";
    if (gpaNum >= 3.5) return "text-blue-600";
    if (gpaNum >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  // Calculate admission statistics
  const admissionStats = {
    total: admissions.length,
    pending: admissions.filter(a => a.status === 'pending').length,
    approved: admissions.filter(a => a.status === 'approved' || a.status === 'accepted').length,
    rejected: admissions.filter(a => a.status === 'rejected').length,
    underReview: admissions.filter(a => a.status === 'under_review').length,
    averageGPA: admissions.length > 0 
      ? (admissions.reduce((sum, adm) => sum + (parseFloat(adm.gpa) || 0), 0) / admissions.length).toFixed(2)
      : "0.00",
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
        return "Admission Application Details";
      case "edit":
        return "Edit Admission Application";
      case "create":
        return "New Admission Application";
      case "delete":
        return "Confirm Delete";
      default:
        return "Admission";
    }
  };

  // Get modal content
  const renderModalContent = () => {
    if (modalType === "view") {
      return (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                {selectedAdmission?.firstName?.charAt(0) || "A"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedAdmission?.firstName} {selectedAdmission?.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(selectedAdmission?.status)} shadow-sm`}>
                    {selectedAdmission?.status?.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {selectedAdmission?.applicationId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Target Program</div>
                <div className="font-semibold text-gray-900">
                  {selectedAdmission?.targetProgram}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedAdmission?.targetUniversity}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Academic Profile</div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {selectedAdmission?.currentEducation}
                    </div>
                    <div className="text-xs text-gray-500">Current Education</div>
                  </div>
                  {selectedAdmission?.gpa && (
                    <div className="ml-4">
                      <div className={`font-bold text-xl ${getGPAColor(selectedAdmission.gpa)}`}>
                        {selectedAdmission.gpa}
                      </div>
                      <div className="text-xs text-gray-500">GPA</div>
                    </div>
                  )}
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
              <p className="text-gray-900 font-medium">{selectedAdmission?.email}</p>
              <p className="text-gray-600 text-sm mt-1">{selectedAdmission?.phone}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-9.293a1 1 0 00-1.414 1.414l.097.11 2 2.5a1 1 0 001.57 0l2-2.5a1 1 0 00-1.572-1.236l-1.043 1.304-1.043-1.304a1 1 0 00-1.414-.107z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Nationality</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedAdmission?.nationality}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Target Country</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedAdmission?.targetCountry}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Intake Year</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedAdmission?.intakeYear}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="text-sm font-medium">Scholarship Interest</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedAdmission?.scholarshipInterest || "None"}</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center text-gray-600 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-gray-900 font-medium">{formatDate(selectedAdmission?.createdAt)}</p>
              <p className="text-gray-600 text-sm mt-1">
                Last updated: {formatDate(selectedAdmission?.updatedAt)}
              </p>
            </div>
          </div>

          {/* Document Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Application Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Documents</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDocumentStatusColor(selectedAdmission?.documents)}`}>
                    {selectedAdmission?.documents?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Essay</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDocumentStatusColor(selectedAdmission?.essay)}`}>
                    {selectedAdmission?.essay?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {selectedAdmission?.additionalInfo && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-700 mb-2">Additional Information</h4>
                <p className="text-sm text-blue-900">{selectedAdmission.additionalInfo}</p>
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
                <h4 className="text-lg font-semibold text-red-800">Delete Application</h4>
                <p className="text-red-700 mt-1 text-sm">
                  Are you sure you want to delete admission application <strong className="font-bold">{selectedAdmission?.applicationId}</strong> for{" "}
                  <strong className="font-bold">{selectedAdmission?.firstName} {selectedAdmission?.lastName}</strong>? 
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
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Personal Information</h4>
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
                  placeholder="student@example.com"
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
                  placeholder="+1 234-567-890"
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
                  Current Education Level
                </label>
                <select
                  name="currentEducation"
                  value={formData.currentEducation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bachelor Degree">Bachelor Degree</option>
                  <option value="Master Degree">Master Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Academic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (0-4.5 scale)
                </label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  min="0"
                  max="4.5"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="3.8"
                />
                <p className="text-xs text-gray-500 mt-1">Enter GPA on 4.0 or 4.5 scale</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intake Year *
                </label>
                <select
                  name="intakeYear"
                  value={formData.intakeYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>{year}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* University & Program */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">University & Program</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target University *
                </label>
                <input
                  type="text"
                  name="targetUniversity"
                  value={formData.targetUniversity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="University of Melbourne"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Country *
                </label>
                <input
                  type="text"
                  name="targetCountry"
                  value={formData.targetCountry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Australia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Program *
                </label>
                <select
                  name="targetProgram"
                  value={formData.targetProgram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  required
                >
                  <option value="">Select program</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Law">Law</option>
                  <option value="Arts & Humanities">Arts & Humanities</option>
                  <option value="Science">Science</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scholarship Interest
                </label>
                <select
                  name="scholarshipInterest"
                  value={formData.scholarshipInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="">Select interest</option>
                  <option value="Merit-based Scholarship">Merit-based Scholarship</option>
                  <option value="Need-based Scholarship">Need-based Scholarship</option>
                  <option value="Full Scholarship">Full Scholarship</option>
                  <option value="Partial Scholarship">Partial Scholarship</option>
                  <option value="Research Scholarship">Research Scholarship</option>
                  <option value="Government Scholarship">Government Scholarship</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
          </div>

          {/* Application Status */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-3">Application Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documents Status
                </label>
                <select
                  name="documents"
                  value={formData.documents}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="not_started">Not Started</option>
                  <option value="pending">Pending</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="verified">Verified</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Essay Status
                </label>
                <select
                  name="essay"
                  value={formData.essay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="not_started">Not Started</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
              placeholder="Additional information, achievements, experience, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Include any relevant experience, achievements, or special circumstances
            </p>
          </div>
        </div>
      );
    }
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

  // Export data as CSV
  const exportToCSV = () => {
    const headers = [
      'Application ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Nationality',
      'Current Education', 'GPA', 'Target University', 'Target Country', 'Target Program',
      'Scholarship Interest', 'Intake Year', 'Documents Status', 'Essay Status', 
      'Application Status', 'Created At', 'Updated At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredAdmissions.map(ad => [
        ad.applicationId,
        `"${ad.firstName}"`,
        `"${ad.lastName}"`,
        `"${ad.email}"`,
        `"${ad.phone}"`,
        `"${ad.nationality}"`,
        `"${ad.currentEducation}"`,
        ad.gpa,
        `"${ad.targetUniversity}"`,
        `"${ad.targetCountry}"`,
        `"${ad.targetProgram}"`,
        `"${ad.scholarshipInterest}"`,
        ad.intakeYear,
        ad.documents,
        ad.essay,
        ad.status,
        ad.createdAt,
        ad.updatedAt
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSuccess('Data exported successfully as CSV');
  };

  return (
    <div className="min-h-screen flex overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      
      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto text-black md:p-6 lg:p-8 overflow-x-hidden">
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
                Admission Applications
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage student admission applications and track their progress
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Total: {filteredAdmissions.length} applications
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
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
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{admissionStats.total}</div>
                  <div className="text-xs text-gray-600">Total Applications</div>
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
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{admissionStats.approved}</div>
                  <div className="text-xs text-gray-600">Approved</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{admissionStats.pending}</div>
                  <div className="text-xs text-gray-600">Pending</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {admissionStats.averageGPA}
                  </div>
                  <div className="text-xs text-gray-600">Average GPA</div>
                </div>
              </div>
            </motion.div>
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
                    placeholder="Search by name, email, program, or application ID..."
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
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Program Filter */}
              <div>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="all">All Programs</option>
                  {uniquePrograms.map(program => (
                    <option key={program} value={program}>{program}</option>
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
                <span className="text-sm sm:text-base font-medium">New Application</span>
              </button>

              <button
                onClick={exportToCSV}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">Export CSV</span>
              </button>

              <button
                onClick={fetchAdmissions}
                disabled={loading}
                className="px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${loading ? "animate-spin" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">
                  {loading ? "Refreshing..." : "Refresh"}
                </span>
              </button>

              {/* Items per page selector */}
              <div className="ml-auto flex items-center">
                <label className="text-sm text-gray-600 mr-2">Show:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admissions Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white text-black rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
        >
          {loading ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center">
                <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading admission applications...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait while we fetch application data</p>
              </div>
            </div>
          ) : filteredAdmissions.length === 0 ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No admission applications found</p>
                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                  {searchTerm || selectedStatus !== "all" || selectedProgram !== "all"
                    ? "Try changing your search or filter criteria" 
                    : "No admission applications yet. Create your first application!"}
                </p>
                {!searchTerm && selectedStatus === "all" && selectedProgram === "all" && (
                  <button
                    onClick={() => handleOpenModal("create")}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create First Application
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th 
                        onClick={() => requestSort('applicationId')}
                        className="cursor-pointer text-left py-4 px-4 font-semibold text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          Application ID
                          {sortConfig.key === 'applicationId' && (
                            <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => requestSort('firstName')}
                        className="cursor-pointer text-left py-4 px-4 font-semibold text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          Applicant
                          {sortConfig.key === 'firstName' && (
                            <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden lg:table-cell">Target Program</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden md:table-cell">Education</th>
                      <th 
                        onClick={() => requestSort('gpa')}
                        className="cursor-pointer text-left py-4 px-4 font-semibold text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          GPA
                          {sortConfig.key === 'gpa' && (
                            <svg className={`w-4 h-4 ml-1 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm hidden xl:table-cell">Documents</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentAdmissions.map((admission) => (
                      <motion.tr
                        key={admission.id}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-4 px-4">
                          <div className="font-mono text-sm font-medium text-gray-900">
                            {admission.applicationId}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(admission.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                              {admission.firstName?.charAt(0) || "A"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                {admission.firstName} {admission.lastName}
                              </div>
                              <div className="text-gray-500 text-xs sm:hidden">{admission.email}</div>
                              <div className="text-xs text-gray-500">{admission.nationality}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden lg:table-cell">
                          <div className="font-medium">{admission.targetProgram}</div>
                          <div className="text-xs text-gray-500">{admission.targetUniversity}</div>
                          <div className="text-xs text-gray-400">{admission.targetCountry}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden md:table-cell">
                          <div className="font-medium">{admission.currentEducation}</div>
                          <div className="text-xs text-gray-500">Intake: {admission.intakeYear}</div>
                        </td>
                        <td className="py-4 px-4">
                          {admission.gpa ? (
                            <div className={`font-bold text-lg ${getGPAColor(admission.gpa)}`}>
                              {admission.gpa}
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">—</div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColorClass(admission.status)} shadow-sm`}>
                            {admission.status?.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm hidden xl:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${getDocumentStatusColor(admission.documents).replace('text-', 'bg-').replace('bg-gray-600', 'bg-gray-400')}`}></div>
                              <span className="text-xs">Docs: {admission.documents}</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${getDocumentStatusColor(admission.essay).replace('text-', 'bg-').replace('bg-gray-600', 'bg-gray-400')}`}></div>
                              <span className="text-xs">Essay: {admission.essay}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleOpenModal("view", admission)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="View Details"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleOpenModal("edit", admission)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                              title="Edit Application"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleOpenModal("delete", admission)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete Application"
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
                          <span className="font-medium">{Math.min(endIndex, filteredAdmissions.length)}</span> of{" "}
                          <span className="font-medium">{filteredAdmissions.length}</span> results
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
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex-shrink-0">
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
                          "Delete Application"
                        ) : modalType === "create" ? (
                          "Create Application"
                        ) : (
                          "Update Application"
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