/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

// Material Icons
import {
  // Navigation
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Info as AboutIcon,
  Description as ServicesIcon,
  ContactSupport as SupportIcon,
  ContactMail as ContactIcon,
  School as SchoolIcon,
  Group as TeamIcon,
  RocketLaunch as RocketIcon,
  ExpandMore as ExpandMoreIcon,

  // Auth
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,

  // Contact
  Send as SendIcon,
  Message as MessageIcon,

  // UI
  Close as CloseIcon,
  Menu as MenuIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  WhatsApp as WhatsAppIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,

  // Profile
  Security as SecurityIcon,
  Star as StarIcon,
  WorkspacePremium as PremiumIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as ScholarshipIcon,
  Book as BookIcon,
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import logo from "../../assets/images/REC LTD- REC APPLY.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("success");

  const navigate = useNavigate();
  const location = useLocation();

  // RECAPPLY Contact Information
  const recapplyContact = {
    email: "r.educationalconsultance@gmail.com",
    rwandaPhone: "+250 783 408 617",
    chinaPhone: "+86 186 5833 2879",
    whatsapp: "+250783408617",
    office: "Kigali – Kicukiro Centre, Sangwa Plaza, 1st Floor, R6 Door",
    workingHours: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM",
  };

  // User state from cookies
  const [user, setUser] = useState(() => {
    try {
      const savedUser = Cookies.get("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return null;
    }
  });

  // API Base URL
  const API_URL = "https://ruziganodejs.onrender.com";

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
  });

  // Contact form state
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    login: {},
    register: {},
    contact: {},
  });

  // Main navigation routes with RECAPPLY focus
  const mainNavRoutes = [
    {
      path: "/",
      label: "Home",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      path: "/about",
      label: "About",
      gradient: "from-purple-600 to-pink-600",
      description: "Learn about RECAPPLY",
    },
    {
      path: "/team",
      label: "Team",
      gradient: "from-orange-600 to-red-600",
      description: "Meet our experts",
    },
  ];

  // Services dropdown items
  const servicesDropdown = [
    {
      path: "/admission",
      label: "University Admissions",
      icon: <SchoolIcon />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Complete admission support",
    },
    {
      path: "/scholarship",
      label: "Scholarship Guidance",
      icon: <ScholarshipIcon />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Financial aid assistance",
    },
    {
      path: "/csca",
      label: "CSCA Preparation",
      icon: <BookIcon />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "China exam specialization",
    },
    {
      path: "/visa",
      label: "Visa Processing",
      icon: <FlagIcon />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Visa application support",
    },
    {
      path: "/accomodation",
      label: "Accommodation",
      icon: <HotelIcon />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Housing assistance",
    },
    {
      path: "/airport",
      label: "Airport Services",
      icon: <FlightIcon />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Travel and arrival support",
    },
  ];

  // Support and contact routes
  const supportRoutes = [
    {
      type: "support",
      label: "Support",
      gradient: "from-teal-600 to-green-600",
      description: "Get help & assistance",
      action: () => navigate("/support"),
    },
  ];

  // Role-based dashboard routes - FIXED THIS FUNCTION
  const getRoleBasedDashboard = (role) => {
    if (!role) return "/user/dashboard";
    
    const normalizedRole = role.toLowerCase();
    
    switch (normalizedRole) {
      case "admin":
        return "/dashboard"; // Admin dashboard
      case "administrator":
        return "/agent/dashboard"; // Administrator goes to agent dashboard
      case "agent":
        return "/agent/dashboard"; // Agent dashboard
      case "user":
        return "/user/dashboard"; // User dashboard
      case "student":
        return "/user/dashboard"; // Student dashboard
      default:
        return "/user/dashboard"; // Default to user dashboard
    }
  };

  // Enhanced gradient presets for RECAPPLY
  const gradientPresets = {
    primary: "bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800",
    secondary: "bg-gradient-to-r from-emerald-600 to-teal-600",
    success: "bg-gradient-to-r from-green-600 to-emerald-600",
    warning: "bg-gradient-to-r from-amber-600 to-orange-600",
    danger: "bg-gradient-to-r from-rose-600 to-pink-600",
    info: "bg-gradient-to-r from-cyan-600 to-blue-600",
    dark: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
    recapplyBlue: "bg-gradient-to-r from-blue-600 to-purple-600",
    recapplyGreen: "bg-gradient-to-r from-emerald-600 to-green-600",
    recapplyPurple: "bg-gradient-to-r from-purple-600 to-pink-600",
  };

  // Save user to cookies
  const saveUserToCookies = (userData) => {
    try {
      Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      Cookies.set("token", userData.token, { expires: 7 });
    } catch (error) {
      console.error("Error saving to cookies:", error);
    }
  };

  // Remove user from cookies
  const removeUserFromCookies = () => {
    Cookies.remove("user");
    Cookies.remove("token");
  };

  // Check authentication - FIXED: Added proper validation
  const isAuthenticated = !!(user && user.token);

  // API request interceptor for adding token - FIXED
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  // Sync user state with cookies on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.token === token) {
          setUser(parsedUser);
        } else {
          removeUserFromCookies();
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        removeUserFromCookies();
        setUser(null);
      }
    }
  }, []);

  // Show success modal
  const showSuccessMessage = (title, message) => {
    setModalType("success");
    setModalTitle(title);
    setModalMessage(message);
    setShowSuccessModal(true);
  };

  // Show error modal
  const showErrorMessage = (title, message) => {
    setModalType("error");
    setModalTitle(title);
    setModalMessage(message);
    setShowErrorModal(true);
  };

  // Validate login form
  const validateLogin = () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, login: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate register form
  const validateRegister = () => {
    const newErrors = {};

    if (!registerData.name) {
      newErrors.name = "Name is required";
    }

    if (!registerData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, register: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate contact form
  const validateContact = () => {
    const newErrors = {};

    if (!contactData.name) {
      newErrors.name = "Name is required";
    }

    if (!contactData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!contactData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!contactData.message) {
      newErrors.message = "Message is required";
    } else if (contactData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors((prev) => ({ ...prev, contact: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateLogin()) {
    showErrorMessage("Validation Error", "Please fix the errors in the form");
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: loginData.email,
        password: loginData.password,
      },
      {
      
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 50000, // ✅ avoids hanging requests
      }
    );

    console.log("Login response:", response.data);

    if (response.data?.success === true || response.data?.message === "Login successful") {
      if (!response.data.user || !response.data.token) {
        throw new Error("Invalid login response from server");
      }

      const userData = {
        ...response.data.user,
        token: response.data.token,
        isAuthenticated: true,
      };

      setUser(userData);
      saveUserToCookies(userData);

      showSuccessMessage(
        "Login Successful!",
        `Welcome back to RECAPPLY, ${response.data.user.name}!`
      );

      setTimeout(() => {
        setShowSuccessModal(false);
        setIsAuthModalOpen(false);
        setLoginData({ email: "", password: "" });
        setErrors((prev) => ({ ...prev, login: {} }));

        // ✅ Safe role-based navigation
        const userRole = response.data.user?.role?.toLowerCase() || "user";
        const dashboardPath = getRoleBasedDashboard(userRole);

        console.log("Navigating to:", dashboardPath, "Role:", userRole);
        navigate(dashboardPath);
      }, 2000);
    } else {
      showErrorMessage(
        "Login Failed",
        response.data?.message || "Invalid email or password"
      );
    }
  } catch (error) {
    console.error("Login error:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Login failed. Please check your credentials and try again.";

    showErrorMessage("Login Failed", errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  // Handle register API call - FIXED
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateRegister()) {
      showErrorMessage("Validation Error", "Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
        role: registerData.role,
      });

      if (response.data.success || response.data.user) {
        showSuccessMessage(
          "Registration Successful!",
          "Welcome to RECAPPLY! Your account has been created successfully."
        );

        // Auto login after successful registration
        setTimeout(async () => {
          try {
            const loginResponse = await axios.post(`${API_URL}/auth/login`, {
              email: registerData.email,
              password: registerData.password,
            });

            if (loginResponse.data.success || loginResponse.data.message === "Login successful") {
              const userData = {
                ...loginResponse.data.user,
                token: loginResponse.data.token || loginResponse.data.accessToken,
                isAuthenticated: true,
              };

              setUser(userData);
              saveUserToCookies(userData);
              setShowSuccessModal(false);
              setIsAuthModalOpen(false);

              showSuccessMessage(
                "Auto Login Successful!",
                `Welcome to RECAPPLY, ${loginResponse.data.user.name}!`
              );

              setTimeout(() => {
                setShowSuccessModal(false);

                // Role-based navigation after auto login
                const userRole = loginResponse.data.user?.role?.toLowerCase() || "user";
                const dashboardPath = getRoleBasedDashboard(userRole);
                
                navigate(dashboardPath);
              }, 2000);
            }
          } catch (loginError) {
            console.error("Auto login error:", loginError);
            setShowSuccessModal(false);
            setAuthType("login");
            setLoginData({
              email: registerData.email,
              password: "",
            });
            showErrorMessage("Auto Login Failed", "Please login manually");
          }
        }, 2000);

        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "user",
        });
        setErrors((prev) => ({ ...prev, register: {} }));
      }
    } catch (error) {
      console.error("Registration error:", error.response || error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed. Please try again.";
      showErrorMessage("Registration Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateContact()) {
      showErrorMessage("Validation Error", "Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/contacts`, contactData);

      if (response.data.success) {
        showSuccessMessage(
          "Message Sent!",
          "Your message has been sent to RECAPPLY! We'll contact you soon."
        );

        setTimeout(() => {
          setIsContactModalOpen(false);
          setContactData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setErrors((prev) => ({ ...prev, contact: {} }));
          setShowSuccessModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showErrorMessage(
        "Message Failed",
        error.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout - FIXED: Added error handling
  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if API call fails
    } finally {
      setUser(null);
      removeUserFromCookies();
      setIsProfileModalOpen(false);

      showSuccessMessage(
        "Logged Out",
        "You have been logged out from RECAPPLY!"
      );

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/");
      }, 2000);
    }
  };

  // Open auth modal
  const openAuthModal = (type) => {
    setAuthType(type);
    setIsAuthModalOpen(true);
    setErrors((prev) => ({ ...prev, login: {}, register: {} }));
  };

  // Loading animation variants
  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Modal animations
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Nav item animation
  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // User profile modal content
  const renderProfileModal = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-2xl max-w-md mx-auto overflow-hidden border border-gray-200"
    >
      {/* Header with RECAPPLY gradient */}
      <div className={`${gradientPresets.recapplyBlue} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <PersonIcon className="w-8 h-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
              <p className="opacity-90 flex items-center">
                <EmailIcon className="w-4 h-4 mr-2" />
                {user?.email || "No email"}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full transition-all"
          >
            <CloseIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Role */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border"
          >
            <div className="flex items-center">
              <PremiumIcon className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-gray-700 font-medium">Role</span>
            </div>
            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold capitalize">
              {user?.role || "Student"}
            </span>
          </motion.div>

          {/* Member Since */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border"
          >
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-gray-700 font-medium">Member Since</span>
            </div>
            <span className="font-semibold text-gray-800">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Recent"}
            </span>
          </motion.div>

          {/* Status */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border"
          >
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-emerald-600 mr-3" />
              <span className="text-gray-700 font-medium">Status</span>
            </div>
            <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full text-sm font-semibold">
              Active Student
            </span>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsProfileModalOpen(false);
              navigate(getRoleBasedDashboard(user?.role));
            }}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <DashboardIcon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Dashboard</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <LogoutIcon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Generic Modal Component
  const NotificationModal = ({ type, title, message }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          type === "success"
            ? "bg-gradient-to-r from-green-100 to-emerald-100"
            : "bg-gradient-to-r from-red-100 to-rose-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircleIcon className="w-12 h-12 text-green-600" />
        ) : (
          <ErrorIcon className="w-12 h-12 text-red-600" />
        )}
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (type === "success") {
            setShowSuccessModal(false);
          } else {
            setShowErrorModal(false);
          }
        }}
        className={`px-8 py-3 text-white rounded-xl font-semibold hover:shadow-lg transition-all ${
          type === "success"
            ? "bg-gradient-to-r from-emerald-600 to-green-600"
            : "bg-gradient-to-r from-red-600 to-rose-600"
        }`}
      >
        Continue
      </motion.button>
    </motion.div>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`${gradientPresets.primary} text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-white/10`}
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* RECAPPLY Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 md:space-x-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-r from-white to-blue-200 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
                    <img src={logo} alt="" className="w-10 h-10 rounded-2xl" />
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  REC APPLY
                </h1>
                <p className="text-xs text-blue-200/70 hidden sm:block">
                  International Education Division
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* Main Navigation */}
              <div className="flex items-center space-x-1 border-r border-white/30 pr-4 mr-4">
                {mainNavRoutes.map((route) => (
                  <motion.div
                    key={route.path}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative"
                  >
                    <Link to={route.path}>
                      <button
                        className={`px-4 py-2.5 rounded-xl text-white transition-all duration-300 ${
                          location.pathname === route.path
                            ? " shadow-lg text-white backdrop-blur-sm"
                            : " text-white"
                        } flex items-center space-x-2`}
                      >
                    
                        <span className="font-bold text-white text-sm xl:text-base">
                          {route.label}
                        </span>
                      </button>
                    </Link>
                  </motion.div>
                ))}

                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <motion.button
                    variants={navItemVariants}
                    whileHover="hover"
                    className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                      isServicesDropdownOpen
                        ? " shadow-lg backdrop-blur-sm"
                        : " hover:bg-white/20"
                    }`}
                  >
                   
                    <span className="font-bold text-white">Services</span>
                    <ExpandMoreIcon
                      className={`w-4 h-4 text-green-400 transition-transform ${
                        isServicesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <div className="flex items-center space-x-2">
                            <RocketIcon className="w-5 h-5" />
                            <h3 className="font-bold text-lg">Our Services</h3>
                          </div>
                          <p className="text-sm opacity-90 mt-1">
                            Complete international education support
                          </p>
                        </div>
                        <div className="p-2">
                          {servicesDropdown.map((service, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={service.path}
                                onClick={() => setIsServicesDropdownOpen(false)}
                                className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-all group"
                              >
                                <div
                                  className={`p-2 rounded-lg ${service.bgColor} mr-3`}
                                >
                                  <div className={service.color}>
                                    {service.icon}
                                  </div>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800 group-hover:text-blue-600">
                                    {service.label}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Support & Contact */}
              <div className="flex items-center space-x-2">
                {supportRoutes.map((route, index) => (
                  <motion.button
                    key={index}
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap="tap"
                    onClick={route.action}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2 ${"bg-white/10 hover:bg-white/20"}`}
                  >
                    {route.icon}
                    <span className="font-bold text-white">{route.label}</span>
                  </motion.button>
                ))}

                {/* Contact Button */}
                <motion.button
                  variants={navItemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap="tap"
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:shadow-lg transition-all shadow-md"
                >
                  
                  <span className="font-bold text-white">Contact</span>
                </motion.button>
              </div>

              {/* Auth & Profile */}
              <div className="flex items-center space-x-2 ml-4 border-l border-white/30 pl-4">
                {isAuthenticated ? (
                  <>
                    {/* Dashboard button */}
                    <motion.div
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative"
                    >
                      <Link
                        to={getRoleBasedDashboard(user?.role)}
                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                          location.pathname === getRoleBasedDashboard(user?.role)
                            ? "bg-white/25 shadow-lg backdrop-blur-sm"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg"
                        }`}
                      >
                        <DashboardIcon className="w-5 h-5" />
                     
                      </Link>
                    </motion.div>

                    {/* User Profile */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="flex items-center space-x-3 bg-white/15 px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all backdrop-blur-sm border border-white/10"
                      >
                        <div className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                          <PersonIcon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm">
                            {user?.name?.split(" ")[0] || "User"}
                          </p>
                          <p className="text-xs opacity-75 capitalize">
                            {user?.role || "Student"}
                          </p>
                        </div>
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.button
                      variants={navItemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap="tap"
                      onClick={() => openAuthModal("login")}
                      className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg transition-all shadow-md"
                    >
                      
                      <span className="font-semibold">Login</span>
                    </motion.button>
                    <motion.button
                      variants={navItemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap="tap"
                      onClick={() => openAuthModal("register")}
                      className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:shadow-lg transition-all shadow-md"
                    >
                     
                      <span className="font-semibold">Register</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm border border-white/10"
            >
              {isMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4"
              >
                <div className="space-y-3">
                  {/* Main Navigation */}
                  <div className="grid grid-cols-1 gap-2">
                    {mainNavRoutes.map((route) => (
                      <motion.div
                        key={route.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={route.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                            location.pathname === route.path
                              ? "bg-white/25 shadow-lg"
                              : "bg-white/10 hover:bg-white/20"
                          } backdrop-blur-sm`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              location.pathname === route.path
                                ? "bg-white/30"
                                : "bg-white/20"
                            }`}
                          >
                            {route.icon}
                          </div>
                          <span className="font-medium">{route.label}</span>
                          {location.pathname === route.path && (
                            <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"></div>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Services Dropdown for Mobile */}
                  <div>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() =>
                        setIsMobileServicesOpen(!isMobileServicesOpen)
                      }
                      className="w-full flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <ServicesIcon className="w-5 h-5" />
                        <span className="font-medium">Services</span>
                      </div>
                      <ExpandMoreIcon
                        className={`w-4 h-4 transition-transform ${
                          isMobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 ml-4 space-y-2"
                        >
                          {servicesDropdown.map((service, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={service.path}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileServicesOpen(false);
                                }}
                                className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                              >
                                <div
                                  className={`p-2 rounded-lg ${service.bgColor}`}
                                >
                                  <div className={service.color}>
                                    {service.icon}
                                  </div>
                                </div>
                                <div className="text-left">
                                  <p className="font-medium text-sm">
                                    {service.label}
                                  </p>
                                  <p className="text-xs text-white/60">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Support */}
                  {supportRoutes.map((route, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={() => {
                          route.action();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
                      >
                        <div className="p-2 rounded-lg bg-white/20">
                          {route.icon}
                        </div>
                        <span className="font-medium">{route.label}</span>
                      </button>
                    </motion.div>
                  ))}

                  {/* Contact Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:shadow-lg transition-all"
                  >
                    
                    <span className="font-medium">Contact</span>
                  </motion.button>

                  {/* Account Section */}
                  <div className="pt-4 border-t border-white/20">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onClick={() => {
                            navigate(getRoleBasedDashboard(user?.role));
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg transition-all"
                        >
                         
                          <span className="font-medium">Dashboard</span>
                        </motion.button>

                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onClick={() => {
                            setIsProfileModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                            <PersonIcon className="w-6 h-6" />
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-medium">
                              {user?.name?.split(" ")[0] || "User"}
                            </p>
                            <p className="text-sm opacity-75 capitalize">
                              {user?.role || "Student"}
                            </p>
                          </div>
                        </motion.button>

                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:shadow-lg transition-all"
                        >
                          <LogoutIcon className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onClick={() => {
                            openAuthModal("login");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg transition-all"
                        >
                          <LoginIcon className="w-5 h-5" />
                          <span className="font-medium">Login</span>
                        </motion.button>

                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onClick={() => {
                            openAuthModal("register");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:shadow-lg transition-all"
                        >
                          <PersonAddIcon className="w-5 h-5" />
                          <span className="font-medium">Register</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsContactModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex overflow-y-auto items-center justify-center p-4 z-50"
            >
              <div className="bg-white overflow-y-auto rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden border border-gray-200 max-h-[90vh] my-auto">
                {/* Header */}
                <div
                  className={`${gradientPresets.recapplyBlue} p-6 text-white sticky top-0 z-10`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <ContactIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Contact RECAPPLY</h2>
                        <p className="opacity-90">
                          International Education Experts
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsContactModalOpen(false)}
                      className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full transition-all"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 bg-gradient-to-r overflow-y-auto from-blue-50 to-purple-50 border-b">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Rwanda Office</p>
                        <b className="font-semibold text-gray-800 hover:text-blue-600">
                          {recapplyContact.rwandaPhone}
                        </b>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <LanguageIcon className="w-5 h-5 text-red-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">China Office</p>
                        <b className="font-semibold text-gray-800 hover:text-red-600">
                          {recapplyContact.chinaPhone}
                        </b>
                      </div>
                    </div>
                    <div className="flex items-center sm:col-span-2">
                      <LocationIcon className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Office Address</p>
                        <p className="font-medium text-gray-800">
                          {recapplyContact.office}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form
                  onSubmit={handleContactSubmit}
                  className="p-6 space-y-6 flex flex-col overflow-y-auto h-full"
                >
                  <div className="space-y-6 flex-grow">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold flex items-center">
                        <BadgeIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Name
                      </label>
                      <input
                        type="text"
                        value={contactData.name}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          })
                        }
                        className={`w-full p-4 border-2 ${
                          errors.contact.name
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        } rounded-xl focus:outline-none transition-all`}
                        placeholder="Your name"
                      />
                      {errors.contact.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contact.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold flex items-center">
                        <EmailIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            email: e.target.value,
                          })
                        }
                        className={`w-full p-4 border-2 ${
                          errors.contact.email
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        } rounded-xl focus:outline-none transition-all`}
                        placeholder="your@email.com"
                      />
                      {errors.contact.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contact.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold flex items-center">
                        <MessageIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Subject
                      </label>
                      <select
                        value={contactData.subject}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            subject: e.target.value,
                          })
                        }
                        className={`w-full p-4 border-2 ${
                          errors.contact.subject
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        } rounded-xl focus:outline-none transition-all`}
                      >
                        <option value="">Select Subject</option>
                        <option value="Admissions Inquiry">
                          University Admissions
                        </option>
                        <option value="CSCA Preparation">
                          CSCA Exam Preparation
                        </option>
                        <option value="Scholarship Guidance">
                          Scholarship Information
                        </option>
                        <option value="Visa Assistance">Visa Processing</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                      {errors.contact.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contact.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold flex items-center">
                        <MessageIcon className="w-4 h-4 mr-2 text-blue-500" />
                        Message
                      </label>
                      <textarea
                        value={contactData.message}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            message: e.target.value,
                          })
                        }
                        className={`w-full p-4 border-2 ${
                          errors.contact.message
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        } rounded-xl focus:outline-none transition-all resize-none`}
                        rows="12"
                        placeholder="Tell us about your study abroad plans..."
                      />
                      {errors.contact.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contact.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full ${gradientPresets.recapplyBlue} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 mt-6`}
                  >
                    {isLoading ? (
                      <>
                        <motion.span
                          variants={loadingVariants}
                          animate="animate"
                        >
                          <RefreshIcon className="w-5 h-5" />
                        </motion.span>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5" />
                        <span>Send to RECAPPLY</span>
                        <ArrowForwardIcon className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsAuthModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 max-h-[90vh] my-auto">
                {/* Header */}
                <div
                  className={`${gradientPresets.recapplyBlue} p-6 text-white sticky top-0 z-10`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {authType === "login" ? (
                          <LoginIcon className="w-7 h-7" />
                        ) : (
                          <PersonAddIcon className="w-7 h-7" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {authType === "login"
                            ? "Welcome to RECAPPLY!"
                            : "Join RECAPPLY Today"}
                        </h2>
                        <p className="opacity-90">
                          {authType === "login"
                            ? "Sign in to your account"
                            : "Start your international education journey"}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsAuthModalOpen(false)}
                      className="p-2 bg-gradient-to-t from-red-400 to-red-600 rounded-full transition-all"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
                  <div className="p-6">
                    {authType === "login" ? (
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-semibold flex items-center">
                            <EmailIcon className="w-4 h-4 mr-2 text-blue-500" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                email: e.target.value,
                              })
                            }
                            className={`w-full p-4 border-2 ${
                              errors.login.email
                                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            } rounded-xl focus:outline-none transition-all`}
                            placeholder="you@example.com"
                            disabled={isLoading}
                          />
                          {errors.login.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.login.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-700 font-semibold flex items-center">
                            <LockIcon className="w-4 h-4 mr-2 text-blue-500" />
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={loginData.password}
                              onChange={(e) =>
                                setLoginData({
                                  ...loginData,
                                  password: e.target.value,
                                })
                              }
                              className={`w-full p-4 pr-12 border-2 ${
                                errors.login.password
                                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              } rounded-xl focus:outline-none transition-all`}
                              placeholder="Enter password"
                              disabled={isLoading}
                            />
                            <div
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon className="w-5 h-5" />
                              ) : (
                                <VisibilityIcon className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                          {errors.login.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.login.password}
                            </p>
                          )}
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full ${gradientPresets.recapplyBlue} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3`}
                        >
                          {isLoading ? (
                            <>
                              <motion.span
                                variants={loadingVariants}
                                animate="animate"
                              >
                                <RefreshIcon className="w-5 h-5" />
                              </motion.span>
                              <span>Signing In...</span>
                            </>
                          ) : (
                            <>
                              <LoginIcon className="w-5 h-5" />
                              <span>Sign In </span>
                              
                            </>
                          )}
                        </motion.button>
                      </form>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-semibold flex items-center">
                            <BadgeIcon className="w-4 h-4 mr-2 text-green-500" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={registerData.name}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                name: e.target.value,
                              })
                            }
                            className={`w-full p-4 border-2 ${
                              errors.register.name
                                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            } rounded-xl focus:outline-none transition-all`}
                            placeholder="John Doe"
                            disabled={isLoading}
                          />
                          {errors.register.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.register.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-700 font-semibold flex items-center">
                            <EmailIcon className="w-4 h-4 mr-2 text-green-500" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                            className={`w-full p-4 border-2 ${
                              errors.register.email
                                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            } rounded-xl focus:outline-none transition-all`}
                            placeholder="you@example.com"
                            disabled={isLoading}
                          />
                          {errors.register.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.register.email}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold flex items-center">
                              <LockIcon className="w-4 h-4 mr-2 text-green-500" />
                              Password
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={registerData.password}
                                onChange={(e) =>
                                  setRegisterData({
                                    ...registerData,
                                    password: e.target.value,
                                  })
                                }
                                className={`w-full p-4 pr-12 border-2 ${
                                  errors.register.password
                                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                } rounded-xl focus:outline-none transition-all`}
                                placeholder="Password"
                                disabled={isLoading}
                              />
                              <div
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon className="w-5 h-5" />
                                ) : (
                                  <VisibilityIcon className="w-5 h-5" />
                                )}
                              </div>
                            </div>
                            {errors.register.password && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.register.password}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold flex items-center">
                              <LockIcon className="w-4 h-4 mr-2 text-green-500" />
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={registerData.confirmPassword}
                                onChange={(e) =>
                                  setRegisterData({
                                    ...registerData,
                                    confirmPassword: e.target.value,
                                  })
                                }
                                className={`w-full p-4 pr-12 border-2 ${
                                  errors.register.confirmPassword
                                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                } rounded-xl focus:outline-none transition-all`}
                                placeholder="Confirm"
                                disabled={isLoading}
                              />
                              <div
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOffIcon className="w-5 h-5" />
                                ) : (
                                  <VisibilityIcon className="w-5 h-5" />
                                )}
                              </div>
                            </div>
                            {errors.register.confirmPassword && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.register.confirmPassword}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-700 font-semibold flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2 text-green-500" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={registerData.phone}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            placeholder="+250 XXX XXX XXX"
                            disabled={isLoading}
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full ${gradientPresets.success} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3`}
                        >
                          {isLoading ? (
                            <>
                              <motion.span
                                variants={loadingVariants}
                                animate="animate"
                              >
                                <RefreshIcon className="w-5 h-5" />
                              </motion.span>
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <PersonAddIcon className="w-5 h-5" />
                              <span>Join RECAPPLY</span>
                              <ArrowForwardIcon className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}

                    {/* Switch between login/register */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-center text-gray-600">
                        {authType === "login"
                          ? "New to RECAPPLY? "
                          : "Already a member? "}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthType(
                              authType === "login" ? "register" : "login"
                            );
                            setErrors((prev) => ({ ...prev, login: {}, register: {} }));
                          }}
                          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {authType === "login" ? "Create Account" : "Sign In"}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsProfileModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              {renderProfileModal()}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-[60]"
            >
              <NotificationModal
                type="success"
                title={modalTitle}
                message={modalMessage}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowErrorModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-[60]"
            >
              <NotificationModal
                type="error"
                title={modalTitle}
                message={modalMessage}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};