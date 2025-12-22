/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Blogs } from "./pages/blogs/Blogs";
import { Services } from "./pages/services/Services";
import { NotFound } from "./pages/notfound/NotFound";
import { Footer } from "./components/footer/Footer";

// Material Icons
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ErrorIcon from "@mui/icons-material/Error";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Admission } from "./components/services/admission/Admission";
import { Scholarship } from "./components/services/scholarship/Scholarship";
import { CESP } from "./components/services/china/CESP";
import { VISA } from "./components/services/visa/VISA";
import { Accommodation } from "./components/services/accomodation/Accomodation";
import { AirportServices } from "./components/services/airport/Airport";
import { Team } from "./pages/teams/Team";
import { FAQ } from "./pages/faq/FAQ";
import { UserManagement } from "./components/dashboard/admin/components/management/user/UserManagement";
import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactManagement";
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { ScholarshipManagement } from "./components/dashboard/admin/components/management/schoolarships/SchoolarshipManagement";
import { AccomodationBookingManagement } from "./components/dashboard/admin/components/management/accomodation/AccomodationBookingManagement";
import { CreateAccommodation } from "./components/dashboard/admin/components/management/accomodation/CreateAccomodation";
import { AirportBookingManagement } from "./components/dashboard/admin/components/management/airport/AirportBookingManagement";
import { AdmissionManagement } from "./components/dashboard/admin/components/management/admission/AdmissionApplicationManagement";
import { CSCEManagement } from "./components/dashboard/admin/components/management/csce/CSCEManagement";
import { UserDashboard } from "./components/dashboard/users/UserDashboard";
import { TestimonyManagement } from "./components/dashboard/admin/components/management/testimony/TestimonyManagement";

// AUTH CONTEXT for managing authentication state
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// RESPONSIVE CONTAINER COMPONENT - REMOVED ALL PADDING
const ResponsiveContainer = ({ children, className = "", fullWidth = false }) => {
  if (fullWidth) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }
  
  return (
    <div
      className={`w-full mx-auto max-w-7xl ${className}`}
    >
      {children}
    </div>
  );
};

// RESPONSIVE UTILITY COMPONENTS
const ResponsiveText = ({ children, className = "", size = "base" }) => {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl md:text-2xl",
    xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

const ResponsiveFlex = ({ children, className = "", direction = "row" }) => {
  const directionClasses = direction === "col" 
    ? "flex-col" 
    : "flex-col sm:flex-row";
  
  return (
    <div className={`flex ${directionClasses} ${className}`}>
      {children}
    </div>
  );
};

// PAGE TRANSITION COMPONENT - APPLIES TO EVERY PAGE
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

// ENHANCED PRIVATE ROUTE COMPONENT WITH ROLE-BASED ACCESS
const PrivateRoute = ({ children, requiredRole = null }) => {
  const { user } = useAuth();
  
  // If user is not authenticated, redirect to home
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  
  // If role is required but user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch(user.role?.toLowerCase()) {
      case "admin":
        return <Navigate to="/dashboard" replace />;
      case "agent":
      case "administrator":
        return <Navigate to="/agent/dashboard" replace />;
      case "user":
      case "student":
        return <Navigate to="/user/dashboard" replace />;
      default:
        return <Navigate to="/user/dashboard" replace />;
    }
  }
  
  return children;
};

// Route configuration
const publicRoutes = [
  { path: "/", name: "Home", element: <Home />, icon: HomeIcon },
  { path: "/about", name: "About", element: <About />, icon: InfoIcon },
  { path: "/team", name: "Team", element: <Team />, icon: InfoIcon },
  { path: "/support", name: "FAQ Support", element: <FAQ />, icon: ArticleIcon },
  { path: "/blog", name: "Blog", element: <Blogs />, icon: ArticleIcon },
  { path: "/services", name: "Services", element: <Services />, icon: BuildIcon },
  { path: "/admission", name: "Admission Services", element: <Admission />, icon: BuildIcon },
  { path: "/scholarship", name: "Scholarship Services", element: <Scholarship />, icon: BuildIcon },
  { path: "/csca", name: "CESP Services", element: <CESP />, icon: BuildIcon },
  { path: "/visa", name: "VISA Services", element: <VISA />, icon: BuildIcon },
  { path: "/accomodation", name: "Accommodation Services", element: <Accommodation />, icon: BuildIcon },
  { path: "/airport", name: "Airport Services", element: <AirportServices />, icon: BuildIcon },
  { path: "*", name: "Not Found", element: <NotFound />, icon: ErrorIcon },
];

// Dashboard route configurations
const dashboardRoutes = [
  // Admin dashboard routes
  { 
    path: "/dashboard", 
    name: "Admin Dashboard", 
    element: <Dashboard />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/user/management", 
    name: "User Management", 
    element: <UserManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/contact/management", 
    name: "Contact Management", 
    element: <ContactManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/schoolarship/management", 
    name: "Scholarship Management", 
    element: <ScholarshipManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/accomodation/booking/management", 
    name: "Accommodation Booking Management", 
    element: <AccomodationBookingManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/accomodation/create/management", 
    name: "Create Accommodation", 
    element: <CreateAccommodation />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
    { 
    path: "/accomodation/create/management", 
    name: "Create Accommodation", 
    element: <CreateAccommodation />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/testimony/management", 
    name: "Testimony Management", 
    element: <TestimonyManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/airport/booking/management", 
    name: "Airport Booking Management", 
    element: <AirportBookingManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/admission/management", 
    name: "Admission Management", 
    element: <AdmissionManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  { 
    path: "/csce/exams/management", 
    name: "CSCE Exams Management", 
    element: <CSCEManagement />, 
    icon: DashboardIcon,
    requiredRole: "admin",
    type: "admin"
  },
  
  // User dashboard routes
  { 
    path: "/user/dashboard", 
    name: "User Dashboard", 
    element: <UserDashboard />, 
    icon: DashboardIcon,
    requiredRole: "user",
    type: "user"
  },
];

// ENHANCED PAGE LOADER COMPONENT WITH PAGE-SPECIFIC MESSAGES AND ROUTE NAME DISPLAY
const PageLoader = ({ pageName = "", routeName = "", icon: Icon = null, routeType = "public" }) => {
  // Map page names to display names and colors
  const pageConfig = {
    home: { displayName: "Home", color: "from-blue-500 to-purple-500" },
    about: { displayName: "About", color: "from-green-500 to-teal-500" },
    blog: { displayName: "Blog", color: "from-orange-500 to-red-500" },
    blogs: { displayName: "Blog", color: "from-orange-500 to-red-500" },
    support: { displayName: "Support", color: "from-orange-500 to-red-500" },
    services: { displayName: "Services", color: "from-indigo-500 to-pink-500" },
    team: { displayName: "Team", color: "from-purple-500 to-indigo-500" },
    admission: {
      displayName: "Admission",
      color: "from-blue-500 to-green-500",
    },
    scholarship: {
      displayName: "Scholarship",
      color: "from-yellow-500 to-orange-500",
    },
    cesp: {
      displayName: "CESP (China Specialist Exam)",
      color: "from-red-500 to-pink-500",
    },
    visa: {
      displayName: "VISA Application",
      color: "from-green-500 to-blue-500",
    },
    accommodation: {
      displayName: "Accommodation",
      color: "from-indigo-500 to-purple-500",
    },
    airport: {
      displayName: "Airport Services",
      color: "from-cyan-500 to-blue-500",
    },
    dashboard: {
      displayName: "Dashboard",
      color: "from-purple-500 to-blue-500",
      subColors: {
        admin: "from-purple-600 to-red-600",
        agent: "from-green-600 to-blue-600",
        user: "from-blue-600 to-cyan-600"
      }
    },
    404: { displayName: "Not Found", color: "from-gray-500 to-gray-700" },
    default: { displayName: "Page", color: "from-blue-500 to-purple-500" },
  };

  // Normalize the page name by removing special characters and making it lowercase
  const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");

  // Try to match exact page name first, then fallback to default
  let config;
  if (pageConfig[normalizedPageName]) {
    config = pageConfig[normalizedPageName];
  } else {
    // Try to find partial match for more complex routes
    const matchedKey = Object.keys(pageConfig).find(
      (key) =>
        normalizedPageName.includes(key) || pageName.toLowerCase().includes(key)
    );
    config = matchedKey ? pageConfig[matchedKey] : pageConfig["default"];
  }

  // For dashboard routes, use specific colors based on dashboard type
  let gradientColor = config.color;
  if (routeType.includes("dashboard") && config.subColors) {
    const dashType = routeType.includes("admin") ? "admin" : 
                     routeType.includes("agent") ? "agent" : "user";
    gradientColor = config.subColors[dashType] || config.color;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-800 to-indigo-500 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative mb-3 sm:mb-4 md:mb-6 lg:mb-8"
        initial={{ scale: 0.5, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        {Icon ? (
          <motion.div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            <Icon
              className={`bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
            />
          </motion.div>
        ) : (
          <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center`}>
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
              {config.displayName.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      <div className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading {config.displayName}
        </motion.h2>

        {/* Display route name and type */}
        <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
          <motion.div
            className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-100">
              Route:{" "}
              <span className="font-bold text-white">
                {routeName}
              </span>
            </p>
          </motion.div>
          
          <motion.div
            className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg border ${
              routeType.includes("private") || routeType.includes("dashboard")
                ? "bg-red-50/50 border-red-200"
                : "bg-green-50/50 border-green-200"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-700">
              Type:{" "}
              <span className={`font-bold ${
                routeType.includes("private") || routeType.includes("dashboard")
                  ? "text-red-600"
                  : "text-green-600"
              }`}>
                {routeType.toUpperCase()}
              </span>
            </p>
          </motion.div>
        </div>

        <motion.p
          className="text-gray-100 text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Preparing your {config.displayName.toLowerCase()} experience...
        </motion.p>
      </div>

      <div className="w-40 sm:w-48 md:w-56 lg:w-64 h-1 sm:h-1.5 md:h-2 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradientColor}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

// Helper function to get page info and route type
const getPageInfoHelper = (pathname) => {
  // Check public routes
  const publicRoute = publicRoutes.find(route => route.path === pathname);
  if (publicRoute) {
    return { 
      name: publicRoute.name.toLowerCase().split(' ')[0], 
      icon: publicRoute.icon,
      routeType: "public",
      fullName: publicRoute.name
    };
  }
  
  // Check dashboard routes
  const dashboardRoute = dashboardRoutes.find(route => route.path === pathname);
  if (dashboardRoute) {
    return { 
      name: dashboardRoute.name.toLowerCase().split(' ')[0], 
      icon: dashboardRoute.icon,
      routeType: `${dashboardRoute.type} dashboard`,
      fullName: dashboardRoute.name
    };
  }
  
  // Default for 404
  return { 
    name: "404", 
    icon: ErrorIcon,
    routeType: "public",
    fullName: "Not Found"
  };
};

// RESPONSIVE MOBILE MENU (For Small Screens)
function MobileMenu({ isOpen, onClose, user }) {
  const location = useLocation();

  // Combine public routes for mobile menu (excluding wildcard route)
  const mobileMenuItems = publicRoutes
    .filter(route => route.path !== "*")
    .map(route => ({
      path: route.path,
      label: route.name,
      icon: route.icon,
      type: "public"
    }));

  // Add dashboard links if user is authenticated
  if (user && user.token) {
    let dashboardItem;
    switch(user.role?.toLowerCase()) {
      case "admin":
        dashboardItem = { 
          path: "/dashboard", 
          label: "Admin Dashboard", 
          icon: DashboardIcon,
          type: "private"
        };
        break;
      case "user":
      case "student":
        dashboardItem = { 
          path: "/user/dashboard", 
          label: "My Dashboard", 
          icon: DashboardIcon,
          type: "private"
        };
        break;
    }
    
    if (dashboardItem) {
      mobileMenuItems.unshift(dashboardItem);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 z-40 bg-gradient-to-br from-blue-800 to-indigo-500 md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
              <ResponsiveText size="lg" className="font-bold text-white">
                Menu
              </ResponsiveText>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white"
                aria-label="Close menu"
              >
                <CloseIcon className="text-base sm:text-lg" />
              </button>
            </div>

            <div className="flex-1 space-y-1.5 sm:space-y-2 md:space-y-4">
              {mobileMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/25 shadow-lg backdrop-blur-sm text-white"
                        : "hover:bg-white/15 text-gray-200 hover:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                    onClick={onClose}
                  >
                    <Icon className="text-base sm:text-lg" />
                    <ResponsiveText size="sm" className="flex-1">
                      {item.label}
                    </ResponsiveText>
                    <span className={`text-xs px-1 sm:px-1.5 py-0.5 rounded ${
                      item.type === "private" 
                        ? "bg-red-500/20 text-red-200 border border-red-500/30"
                        : "bg-green-500/20 text-green-200 border border-green-500/30"
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-3 sm:pt-4 md:pt-6 border-t border-white/20">
              {user && user.token ? (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <ResponsiveText size="sm" className="text-white font-medium">
                        {user.name}
                      </ResponsiveText>
                      <p className="text-xs text-gray-300 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// MAIN APP
export default function App() {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = Cookies.get("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return null;
    }
  });
  
  const location = useLocation();

  // Update user state when cookies change
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const savedUser = Cookies.get("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;
        
        // Only update if user data has actually changed
        if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [user]);

  // Get current page info using useMemo to prevent unnecessary recalculations
  const currentPageInfo = useMemo(() => {
    return getPageInfoHelper(location.pathname);
  }, [location.pathname]);

  // Auth context value
  const authContextValue = useMemo(() => ({
    user,
    setUser: (newUser) => {
      setUser(newUser);
      if (newUser) {
        Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
      } else {
        Cookies.remove("user");
      }
    }
  }), [user]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Page loading effect when route changes
  useEffect(() => {
    // Only show page loader if not the initial load
    if (!loading) {
      setPageLoading(true);
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 800); // Shorter duration for page transitions

      return () => clearTimeout(timer);
    }
  }, [location.pathname, loading]);

  // FIXED: Page View Tracking with error handling
  const sendView = useCallback(async () => {
    try {
      const ip = await axios.get("https://api.ipify.org?format=json");

      await axios.post(
        "https://ruziganodejs.onrender.com/views/track",
        {
          ip: ip.data.ip,
          page: window.location.pathname,
          route: location.pathname,
          routeName: currentPageInfo.fullName,
          routeType: currentPageInfo.routeType,
          timestamp: new Date().toISOString(),
        }
      );
    } catch (err) {
      console.warn("View tracking failed (non-critical):", err.message);
    }
  }, [location.pathname, currentPageInfo.fullName, currentPageInfo.routeType]);

  // Initial app loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    sendView();

    return () => clearTimeout(timer);
  }, [sendView]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen bg-gradient-to-t from-blue-800 to-indigo-500 text-gray-900 transition-colors duration-300 overflow-x-hidden">
        {/* Initial App Loading */}
        {loading ? (
          <PageLoader
            pageName={currentPageInfo.name}
            routeName={currentPageInfo.fullName}
            routeType={currentPageInfo.routeType}
            icon={currentPageInfo.icon}
          />
        ) : (
          <>
            {/* Page Transition Loading */}
            {pageLoading && (
              <PageLoader
                pageName={currentPageInfo.name}
                routeName={currentPageInfo.fullName}
                routeType={currentPageInfo.routeType}
                icon={currentPageInfo.icon}
              />
            )}

     

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              user={user}
            />

            <Navbar />

            {/* Main Content with Responsive Container - NO PADDING */}
            <main className="w-full pt-12 sm:pt-14 md:pt-16 bg-gradient-to-r from-blue-800 to-indigo-800">
              <ResponsiveContainer>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    {/* Public Routes */}
                    {publicRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <PageTransition>
                            {route.element}
                          </PageTransition>
                        }
                      />
                    ))}

                    {/* Dashboard Routes with role-based access control */}
                    {dashboardRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <PrivateRoute requiredRole={route.requiredRole}>
                            <PageTransition>
                              {route.element}
                            </PageTransition>
                          </PrivateRoute>
                        }
                      />
                    ))}
                  </Routes>
                </AnimatePresence>
              </ResponsiveContainer>
            </main>

            <Footer />
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}