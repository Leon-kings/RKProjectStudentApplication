/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI Icons
import {
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Cancel,
  Star,
  StarBorder,
  StarHalf,
  Search,
  FilterList,
  Refresh,
  Add,
  Close,
  ArrowBack,
  ArrowForward,
  Person,
  School,
  LocationOn,
  CalendarToday,
  Email,
  VerifiedUser,
  PendingActions,
  Block,
  CloudUpload,
  Save,
  Close as CloseIcon,
  Check,
  Error,
  Warning,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

export const TestimonyManagement = () => {
  // State Management
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Modals
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Modal States
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Selected testimonial
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    country: "",
    university: "",
    program: "",
    rating: "5",
    duration: "",
    content: "",
    email: "",
    verified: false,
    status: "pending", // Added status field
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // API Base URL
  const API_URL = "https://ruziganodejs.onrender.com";

  // Test API directly
  const testAPI = async () => {
    try {
      console.log("🔄 Testing API directly...");
      const response = await axios.get(`${API_URL}/testimonials`);
      console.log("📊 Raw API Response:", response.data);
      console.log("📁 Data structure:", response.data.data);
      console.log("✅ Success:", response.data.success);
      console.log("🔢 Count:", response.data.count);
      console.log("📝 First item (if any):", response.data.data?.[0]);

      if (response.data.data && response.data.data.length > 0) {
        console.log(
          "📋 All fields in first item:",
          Object.keys(response.data.data[0])
        );
        console.log("🎯 Status of first item:", response.data.data[0].status);
      }
    } catch (error) {
      console.error("❌ API Test Error:", error);
      console.error("📡 Error response:", error.response?.data);
    }
  };

  // Fetch testimonials with useCallback to prevent infinite loops
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching testimonials from API...");
      console.log("🎛️ Current filters:", {
        statusFilter,
        verifiedFilter,
        searchTerm,
        sortBy,
      });

      // Build query parameters
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;

      console.log("📤 Sending params:", params);

      const response = await axios.get(`${API_URL}/testimonials`, {
        params,
      });

      console.log("📥 Full API Response:", response.data);
      console.log("📊 Data received:", response.data.data);
      console.log("📋 Data type:", typeof response.data.data);
      console.log("🔢 Is Array?", Array.isArray(response.data.data));

      if (response.data.success) {
        const apiData = response.data.data || [];
        console.log(`✅ Received ${apiData.length} testimonials from API`);

        if (apiData.length > 0) {
          console.log("📝 First testimonial:", {
            id: apiData[0]._id,
            name: apiData[0].name,
            status: apiData[0].status,
            verified: apiData[0].verified,
          });
        }

        setTestimonials(apiData);

        // Apply filters
        let filtered = [...apiData];

        console.log("🔄 Before filtering:", filtered.length);

        if (statusFilter !== "all") {
          filtered = filtered.filter((item) => item.status === statusFilter);
          console.log(
            `🔄 After status filter (${statusFilter}):`,
            filtered.length
          );
        }

        if (verifiedFilter !== "all") {
          filtered = filtered.filter((item) =>
            verifiedFilter === "verified" ? item.verified : !item.verified
          );
          console.log(
            `🔄 After verified filter (${verifiedFilter}):`,
            filtered.length
          );
        }

        setFilteredTestimonials(filtered);
        setCurrentPage(1);
        setError(null);
      } else {
        console.error("❌ API returned success: false", response.data);
        setError("API returned unsuccessful response");
      }
    } catch (err) {
      console.error("❌ Error fetching testimonials:", err);
      console.error("📡 Error details:", err.response?.data);
      const errorMsg =
        err.response?.data?.message || "Failed to load testimonials";
      setError(errorMsg);
      showModal("error", "Load Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  }, [sortBy, searchTerm, statusFilter, verifiedFilter]);

  // Show modal function
  const showModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);

    if (type === "success") {
      setIsSuccessModalOpen(true);
    } else {
      setIsErrorModalOpen(true);
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
  };

  // Initial fetch and when dependencies change
  useEffect(() => {
    console.log("🚀 Initializing component...");
    testAPI(); // Test API on load
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTestimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-yellow-500" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorder key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  // CRUD Operations

  // View testimonial
  const handleView = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditFormData({
      ...testimonial,
      rating: testimonial.rating || "5",
    });
    setIsEditModalOpen(true);
  };

  // Update testimonial
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Add all fields to formData
      Object.keys(editFormData).forEach((key) => {
        if (
          key !== "image" &&
          key !== "_id" &&
          key !== "__v" &&
          key !== "createdAt" &&
          key !== "updatedAt"
        ) {
          formData.append(key, editFormData[key]);
        }
      });

      // Add image if new one selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("🔄 Updating testimonial:", selectedTestimonial._id);
      console.log(
        "📤 Update form data:",
        Object.fromEntries(formData.entries())
      );

      const response = await axios.put(
        `${API_URL}/testimonials/${selectedTestimonial._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("📥 Update response:", response.data);

      if (response.data.success) {
        showModal(
          "success",
          "Update Successful",
          "Testimonial has been updated successfully!"
        );
        // Refresh the list
        fetchTestimonials();
        setIsEditModalOpen(false);
        setImageFile(null);
        setImagePreview("");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      showModal(
        "error",
        "Update Failed",
        err.response?.data?.message || "Failed to update testimonial"
      );
    }
  };

  // Delete testimonial
  const handleDelete = async () => {
    try {
      console.log("🗑️ Deleting testimonial:", selectedTestimonial._id);

      const response = await axios.delete(
        `${API_URL}/testimonials/${selectedTestimonial._id}`
      );

      console.log("✅ Delete response:", response.data);

      if (response.data.success) {
        showModal(
          "success",
          "Delete Successful",
          "Testimonial has been deleted successfully!"
        );
        // Refresh the list
        fetchTestimonials();
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      showModal(
        "error",
        "Delete Failed",
        err.response?.data?.message || "Failed to delete testimonial"
      );
    }
  };

  // Approve testimonial
  const handleApprove = async (id) => {
    try {
      console.log("✅ Approving testimonial:", id);

      const response = await axios.put(`${API_URL}/testimonials/${id}/approve`);

      console.log("📥 Approve response:", response.data);

      if (response.data.success) {
        showModal(
          "success",
          "Approval Successful",
          "Testimonial has been approved successfully!"
        );
        // Refresh the list
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Approval error:", err);
      showModal(
        "error",
        "Approval Failed",
        err.response?.data?.message || "Failed to approve testimonial"
      );
    }
  };

  // Create new testimonial
  const handleCreate = async () => {
    try {
      console.log("🚀 Starting testimonial creation...");

      // Validate required fields
      const requiredFields = [
        "name",
        "email",
        "country",
        "university",
        "program",
        "duration",
        "content",
      ];
      const missingFields = requiredFields.filter(
        (field) => !newTestimonial[field]?.trim()
      );

      if (missingFields.length > 0) {
        showModal(
          "error",
          "Missing Fields",
          `Please fill in: ${missingFields.join(", ")}`
        );
        return;
      }

      if (!imageFile) {
        showModal("error", "Image Required", "Please select a profile image");
        return;
      }

      if (newTestimonial.content.length < 50) {
        showModal(
          "error",
          "Content Too Short",
          "Testimonial content must be at least 50 characters"
        );
        return;
      }

      const formData = new FormData();

      // Add all fields to formData
      Object.keys(newTestimonial).forEach((key) => {
        if (key === "verified") {
          // Convert boolean to string for FormData
          formData.append(key, newTestimonial[key].toString());
        } else {
          formData.append(key, newTestimonial[key]);
        }
      });

      // Add image
      formData.append("image", imageFile);

      // Log what we're sending
      const formDataObj = {};
      for (let [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      console.log("📤 Sending form data:", formDataObj);

      const response = await axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📥 Creation response:", response.data);

      if (response.data.success) {
        const createdTestimonial = response.data.data;
        console.log("✅ Created testimonial:", createdTestimonial);

        showModal(
          "success",
          "Create Successful",
          "Testimonial has been created successfully!"
        );

        // Reset form
        resetNewTestimonialForm();
        setImageFile(null);
        setImagePreview("");
        setIsAddModalOpen(false);

        // Force a refresh after a short delay
        setTimeout(() => {
          fetchTestimonials();
        }, 1000);
      } else {
        console.error("❌ Create failed with response:", response.data);
        showModal(
          "error",
          "Create Failed",
          response.data.message || "Failed to create testimonial"
        );
      }
    } catch (err) {
      console.error("❌ Create testimonial error:", err);
      console.error("📡 Error response:", err.response?.data);
      showModal(
        "error",
        "Create Failed",
        err.response?.data?.message ||
          err.message ||
          "Failed to create testimonial"
      );
    }
  };

  // Reset new testimonial form
  const resetNewTestimonialForm = () => {
    setNewTestimonial({
      name: "",
      country: "",
      university: "",
      program: "",
      rating: "5",
      duration: "",
      content: "",
      email: "",
      verified: false,
      status: "pending",
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Status badge
  const getStatusBadge = (status) => {
    const badges = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-black p-3 sm:p-4 md:p-6">
      {/* <Sidebar onToggleNotifications={toggleNotificationsModal} /> */}
      <div className="w-full p-2">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Debug Tools */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <button
              onClick={testAPI}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
            >
              Test API
            </button>
            <button
              onClick={() => {
                console.log("📋 Current testimonials:", testimonials);
                console.log("🔍 Filtered testimonials:", filteredTestimonials);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Log State
            </button>
            <button
              onClick={() => setStatusFilter("all")}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm"
            >
              Show All Status
            </button>
            <span className="text-sm text-gray-600 ml-auto">
              DB: {testimonials.length} | Filtered:{" "}
              {filteredTestimonials.length} | Status: {statusFilter}
            </span>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              Error: {error}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
                Testimonials Management
              </h1>
              <p className="text-gray-600 mt-2">
                Total: {filteredTestimonials.length} testimonials
                {statusFilter !== "all" && ` (Filtered: ${statusFilter})`}
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Add className="mr-2" />
              Add New Testimonial
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative text-black">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, university, program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="text-black">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Sort */}
              <div className="text-black">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest-rating">Highest Rating</option>
                  <option value="lowest-rating">Lowest Rating</option>
                </select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setVerifiedFilter("all");
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === "all" && verifiedFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Show All
              </button>
              <button
                onClick={() => setVerifiedFilter("verified")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  verifiedFilter === "verified"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <VerifiedUser className="mr-2" />
                Verified
              </button>
              <button
                onClick={() => setVerifiedFilter("unverified")}
                className={`px-4 py-2 rounded-lg ${
                  verifiedFilter === "unverified"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Unverified
              </button>
              <button
                onClick={fetchTestimonials}
                className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
              >
                <Refresh className="mr-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FilterList className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">
              {testimonials.length === 0
                ? "No testimonials in database"
                : "No testimonials match your filters"}
            </h3>
            <p className="text-gray-200 mb-4">
              {testimonials.length > 0 ? (
                <>
                  Current filter: <strong>{statusFilter}</strong>
                  <br />
                  Try changing filters or adding a new testimonial
                  <br />
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setVerifiedFilter("all");
                      setSearchTerm("");
                      fetchTestimonials();
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Show All Testimonials
                  </button>
                </>
              ) : (
                "Add a new testimonial to get started"
              )}
            </p>
            <div className="text-sm text-gray-500 mt-4">
              <p>Database count: {testimonials.length}</p>
              <p>Filtered count: {filteredTestimonials.length}</p>
              <p>Current status filter: {statusFilter}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {currentItems.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Card Header */}
                  <div className="p-4 sm:p-6 border-b">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image?.url}
                          alt=""
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/150x150/EEE/31343C?text=No+Image";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm flex items-center">
                            <LocationOn className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {testimonial.country}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          testimonial.status
                        )}`}
                      >
                        {testimonial.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="ml-2 font-bold text-gray-700">
                          {parseFloat(testimonial.rating).toFixed(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {testimonial.content}
                      </p>
                      <div className="space-y-1">
                        <p className="text-gray-700 text-sm flex items-center">
                          <School className="w-4 h-4 mr-2" />
                          {testimonial.university}
                        </p>
                        <p className="text-gray-700 text-sm flex items-center">
                          <CalendarToday className="w-4 h-4 mr-2" />
                          {testimonial.duration}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleView(testimonial)}
                        className="flex-1 min-w-[80px] px-3 py-2 bg-gradient-to-t from-blue-500 to-indigo-400 rounded-lg hover:bg-blue-200 text-sm flex items-center justify-center"
                      >
                        <Visibility className="mr-1 text-white sm:mr-2" />
                      </button>
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="flex-1 min-w-[80px] px-3 py-2 bg-gradient-to-b from-indigo-500 to-violet-400 rounded-lg hover:bg-yellow-200 text-sm flex items-center justify-center"
                      >
                        <Edit className="mr-1 text-white sm:mr-2" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTestimonial(testimonial);
                          setIsDeleteModalOpen(true);
                        }}
                        className="flex-1 min-w-[80px] px-3 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-lg hover:bg-red-200 text-sm flex items-center justify-center"
                      >
                        <Delete className="mr-1 text-white sm:mr-2" />
                      </button>
                      {testimonial.status === "pending" && (
                        <button
                          onClick={() => handleApprove(testimonial._id)}
                          className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-green-500 to-green-800 rounded-lg text-sm flex items-center justify-center"
                        >
                          <CheckCircle className="mr-2" />
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredTestimonials.length > itemsPerPage && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-gray-600 text-sm">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredTestimonials.length)} of{" "}
                  {filteredTestimonials.length} entries
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ArrowBack />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2 py-2">...</span>
                        <button
                          onClick={() => goToPage(totalPages)}
                          className={`w-10 h-10 rounded-lg border hover:bg-gray-50`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ArrowForward />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* View Modal */}
        {isViewModalOpen && selectedTestimonial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Testimonial Details
                </h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 bg-gradient-to-b from-red-500 to-red-700 rounded-full"
                >
                  <CloseIcon className="text-gray-600" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {/* Student Info */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                  <img
                    src={
                      selectedTestimonial.image?.url ||
                      "https://placehold.co/150x150/EEE/31343C"
                    }
                    alt={selectedTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {selectedTestimonial.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <p className="text-gray-600 flex items-center">
                        <Email className="w-4 h-4 mr-2" />
                        {selectedTestimonial.email}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <LocationOn className="w-4 h-4 mr-2" />
                        {selectedTestimonial.country}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <School className="w-4 h-4 mr-2" />
                        {selectedTestimonial.university}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <CalendarToday className="w-4 h-4 mr-2" />
                        {selectedTestimonial.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(selectedTestimonial.rating)}
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {parseFloat(selectedTestimonial.rating).toFixed(1)}/5.0
                    </span>
                  </div>
                </div>

                {/* Full Content */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">
                    Full Testimonial
                  </h4>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedTestimonial.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <AddEditModal
            title="Add New Testimonial"
            formData={newTestimonial}
            setFormData={setNewTestimonial}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            handleSubmit={handleCreate}
            handleClose={() => {
              setIsAddModalOpen(false);
              resetNewTestimonialForm();
              setImageFile(null);
              setImagePreview("");
            }}
            submitText="Create"
            isAdd={true}
          />
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editFormData && (
          <AddEditModal
            title="Edit Testimonial"
            formData={editFormData}
            setFormData={setEditFormData}
            imagePreview={imagePreview || editFormData.image?.url}
            handleImageChange={handleImageChange}
            handleSubmit={handleUpdate}
            handleClose={() => {
              setIsEditModalOpen(false);
              setImageFile(null);
              setImagePreview("");
            }}
            submitText="Update"
            isAdd={false}
          />
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedTestimonial && (
          <ConfirmModal
            title="Delete Testimonial"
            message={`Are you sure you want to delete ${selectedTestimonial.name}'s testimonial? This action cannot be undone.`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
            danger={true}
          />
        )}

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <ResultModal
            type="success"
            title={modalTitle}
            message={modalMessage}
            onClose={() => {
              setIsSuccessModalOpen(false);
            }}
          />
        )}

        {/* Error Modal */}
        {isErrorModalOpen && (
          <ResultModal
            type="error"
            title={modalTitle}
            message={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

// Reusable Add/Edit Modal Component
const AddEditModal = ({
  title,
  formData,
  setFormData,
  imagePreview,
  handleImageChange,
  handleSubmit,
  handleClose,
  submitText,
  isAdd,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 bg-gradient-to-b from-red-500 to-red-700 rounded-full"
          >
            <CloseIcon className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image {isAdd && "*"}
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                    />
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                      <CloudUpload />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {isAdd
                        ? "Upload a clear profile picture"
                        : "Click to change image"}
                    </p>
                    <p className="text-xs text-gray-500">Max size: 5MB</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                <div className="text-black">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="text-black">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="text-black">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* University Info */}
              <div className="text-black">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter university name"
                />
              </div>

              <div className="text-black">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program *
                </label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter program name"
                />
              </div>

              <div className="text-black">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 2 years, 4 semesters"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Rating */}
              <div className="text-black">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4.5">4.5 - Very Good</option>
                  <option value="4">4 - Good</option>
                  <option value="3.5">3.5 - Above Average</option>
                  <option value="3">3 - Average</option>
                  <option value="2.5">2.5 - Below Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1.5">1.5 - Very Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>

              {/* Verified Checkbox */}
              <div className="text-black flex items-center">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  id="verified-checkbox"
                />
                <label
                  htmlFor="verified-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Mark as verified
                </label>
              </div>

              {/* Testimonial Content */}
              <div className="text-black">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Content *
                  <span className="text-gray-500 ml-2">
                    ({formData.content.length}/50 characters minimum)
                  </span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 50 characters. Current: {formData.content.length}
                </p>
                {formData.content.length < 50 &&
                  formData.content.length > 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      Please enter at least {50 - formData.content.length} more
                      characters
                    </p>
                  )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                formData.content.length < 50 ||
                !formData.name?.trim() ||
                !formData.email?.trim() ||
                !formData.university?.trim() ||
                (isAdd && !imagePreview)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="mr-2" />
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Confirmation Modal Component
const ConfirmModal = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  danger = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Result Modal Component (Success/Error)
const ResultModal = ({ type, title, message, onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="p-6">
          {/* Icon */}
          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            } mb-4`}
          >
            {isSuccess ? (
              <Check className="h-8 w-8 text-green-600" />
            ) : (
              <Error className="h-8 w-8 text-red-600" />
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-lg font-bold text-center mb-2 ${
              isSuccess ? "text-green-800" : "text-red-800"
            }`}
          >
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">{message}</p>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg text-white ${
                isSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } transition-colors`}
            >
              {isSuccess ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
