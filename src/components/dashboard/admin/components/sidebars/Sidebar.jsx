// /* eslint-disable react-hooks/static-components */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { NavLink, useLocation } from "react-router-dom";
// import {
//   Dashboard as DashboardIcon,
//   Description as DescriptionIcon,
//   School as SchoolIcon,
//   Verified as VerifiedIcon,
//   Home as HomeIcon,
//   FlightTakeoff as FlightTakeoffIcon,
//   AttachMoney as AttachMoneyIcon,
//   People as PeopleIcon,
//   CalendarMonth as CalendarMonthIcon,
//   Settings as SettingsIcon,
//   Help as HelpIcon,
//   Logout as LogoutIcon,
//   Menu as MenuIcon,
//   Close as CloseIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Notifications as NotificationsIcon,
//   AccountCircle as AccountCircleIcon,
//   Assessment as AssessmentIcon,
//   Timeline as TimelineIcon,
//   PieChart as PieChartIcon,
//   BarChart as BarChartIcon,
//   TableChart as TableChartIcon,
//   Security as SecurityIcon,
//   Business as BusinessIcon,
//   Language as LanguageIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Chat as ChatIcon,
//   DarkMode as DarkModeIcon,
//   LightMode as LightModeIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";

// export const Sidebar = ({ onToggleNotifications }) => {
//   const location = useLocation();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [user, setUser] = useState(null);

//   // Load user data from localStorage on component mount
//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         // Try to get user data from localStorage (common approach)
//         const savedUserData = localStorage.getItem("user");

//         if (savedUserData) {
//           const parsedUser = JSON.parse(savedUserData);
//           setUser({
//             name: parsedUser.name || "",
//             email: parsedUser.email || "",
//             role: parsedUser.role || "",
//             avatar: parsedUser.avatar || "",
//           });
//         } else {
//           // If no user data in localStorage, check sessionStorage
//           const sessionUserData = sessionStorage.getItem("user");
//           if (sessionUserData) {
//             const parsedUser = JSON.parse(sessionUserData);
//             setUser({
//               name: parsedUser.name || "",
//               email: parsedUser.email || "",
//               role: parsedUser.role || "",
//               avatar: parsedUser.avatar || "",
//             });
//           }
//           // If still no data, user remains null - fields will be empty
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//         setUser(null);
//       }
//     };

//     loadUserData();
//   }, []);

//   // Animation variants for x-axis movement
//   const xAnimationVariants = {
//     expanded: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     collapsed: {
//       x: -190,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     mobileExpanded: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     mobileHidden: {
//       x: -260,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//   };

//   // Item animation variants
//   const itemAnimationVariants = {
//     expanded: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//     collapsed: {
//       opacity: 0,
//       x: -20,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   // Handle responsive sidebar states
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsCollapsed(true);
//         setIsMobileOpen(false);
//       } else if (window.innerWidth < 1024) {
//         setIsCollapsed(false);
//         setIsMobileOpen(false);
//       } else {
//         setIsCollapsed(false);
//         setIsMobileOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Detect active section from URL
//   useEffect(() => {
//     const path = location.pathname.split("/")[1] || "dashboard";
//     setActiveSection(path);
//   }, [location]);

//   // Navigation items
//   const navItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: <DashboardIcon />,
//       path: "/dashboard",
//     },
//     {
//       id: "applications",
//       label: "Applications",
//       icon: <DescriptionIcon />,
//       path: "/schoolarship/management",
//       badge: "+",
//     },
//     {
//       id: "admissions",
//       label: "Admissions",
//       icon: <SchoolIcon />,
//       path: "/admission/management",
//       badge: "+",
//     },
//     {
//       id: "visa",
//       label: "Visa Services",
//       icon: <VerifiedIcon />,
//       path: "/visa/management",
//       badge: "+",
//     },
//     {
//       id: "accommodation",
//       label: "Accommodation",
//       icon: <HomeIcon />,
//       path: "/accomodation/booking/management",
//       badge: "+",
//     },
//     {
//       id: "airport",
//       label: "Airport Services",
//       icon: <FlightTakeoffIcon />,
//       path: "/airport/booking/management",
//       badge: "+",
//     },
//     {
//       id: "csce",
//       label: "China Exams",
//       icon: <AttachMoneyIcon />,
//       path: "/csce/exams/management",
//       badge: "+",
//     },
//     {
//       id: "students",
//       label: "Students",
//       icon: <PeopleIcon />,
//       path: "/user/management",
//       badge: "+",
//     },
//   ];

//   // Analytics sub-items
//   const analyticsItems = [
//     {
//       id: "requests",
//       label: "Requests",
//       icon: <AssessmentIcon />,
//       path: "/contact/management",
//       badge: "+",
//     },
//     {
//       id: "testimony",
//       label: "Testimonials",
//       icon: <TimelineIcon />,
//       path: "/testimony/management",
//       badge: "+",
//     },
//   ];

//   // Settings items
//   const settingsItems = [
//     {
//       id: "company",
//       label: "Company",
//       icon: <BusinessIcon />,
//       path: "/about",
//       badge: "+",
//     },
//     {
//       id: "notifications",
//       label: "Notifications",
//       icon: <NotificationsIcon />,
//       path: "/settings/notifications",
//       badge: "+",
//     },
//   ];

//   // Toggle sidebar collapse - FIXED: On mobile, just collapse, don't close completely
//   const toggleSidebar = () => {
//     if (window.innerWidth < 768) {
//       // On mobile, just toggle collapsed state
//       setIsCollapsed(!isCollapsed);
//       setIsMobileOpen(false);
//     } else {
//       // On desktop, toggle collapsed state
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   // Close mobile sidebar when clicking on nav items
//   const closeMobileSidebar = () => {
//     if (window.innerWidth < 768) {
//       setIsMobileOpen(false);
//     }
//   };

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   // Handle logout - clears user data
//   const handleLogout = () => {
//     console.log("Logging out...");

//     // Clear user data from storage
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("user");

//     // Clear user state
//     setUser(null);

//     // Add your logout logic here (redirect to login, etc.)
//     // window.location.href = '/login';
//   };

//   // Mobile sidebar backdrop
//   const MobileBackdrop = () => (
//     <AnimatePresence>
//       {isMobileOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsMobileOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//         />
//       )}
//     </AnimatePresence>
//   );

//   // Get user initials for avatar
//   const getUserInitials = () => {
//     if (!user || !user.name) return "";
//     return user.name
//       .split(" ")
//       .map((part) => part[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // Sidebar item component with x-axis animation
//   const SidebarItem = ({ item, isSubItem = false, section }) => (
//     <motion.div
//       initial={false}
//       animate={!isCollapsed || isMobileOpen ? "expanded" : "collapsed"}
//       variants={itemAnimationVariants}
//       className="w-full"
//     >
//       <NavLink
//         to={item.path}
//         className={({ isActive }) => `
//           flex items-center py-3 px-2 rounded-lg transition-all duration-200 group
//           w-full min-h-[44px]
//           ${
//             isActive
//               ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
//               : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//           }
//           ${isSubItem ? "ml-0" : ""}
//         `}
//         onClick={closeMobileSidebar}
//       >
//         <div className="flex items-center justify-center w-8 h-8 min-w-[2rem]">
//           <motion.span
//             animate={{
//               scale: !isCollapsed || isMobileOpen ? 1 : 1.2,
//             }}
//             className={`${
//               activeSection === item.id
//                 ? "text-white"
//                 : "text-gray-500 group-hover:text-blue-600"
//             }`}
//           >
//             {item.icon}
//           </motion.span>
//         </div>

//         <motion.div
//           className={`flex items-center justify-between flex-1 ${
//             !isCollapsed || isMobileOpen ? "opacity-100" : "opacity-0 w-0"
//           }`}
//           animate={{
//             x: !isCollapsed || isMobileOpen ? 0 : -20,
//             opacity: !isCollapsed || isMobileOpen ? 1 : 0,
//             width: !isCollapsed || isMobileOpen ? "auto" : 0,
//           }}
//           transition={{ duration: 0.2 }}
//         >
//           <motion.span
//             initial={{ opacity: 0, x: -10 }}
//             animate={{
//               opacity: !isCollapsed || isMobileOpen ? 1 : 0,
//               x: !isCollapsed || isMobileOpen ? 0 : -10,
//             }}
//             className="font-medium text-sm ml-3"
//           >
//             {item.label}
//           </motion.span>

//           {item.badge && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center"
//             >
//               {item.badge}
//             </motion.span>
//           )}
//         </motion.div>
//       </NavLink>
//     </motion.div>
//   );

//   // Section component
//   const SidebarSection = ({ title, items, isSubSection = false }) => (
//     <div className="mb-4">
//       <motion.h4
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2
//           ${!isCollapsed || isMobileOpen ? "text-left px-2" : "text-center"}`}
//       >
//         {!isCollapsed || isMobileOpen ? title : "•"}
//       </motion.h4>
//       <div className="space-y-1 px-2">
//         {items.map((item) => (
//           <SidebarItem
//             key={item.id}
//             item={item}
//             isSubItem={isSubSection}
//             section={title.toLowerCase()}
//           />
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className="fixed top-3 left-0 z-40 p-2 rounded-lg bg-white shadow-md lg:hidden m-2"
//       >
//         <MenuIcon className="h-5 w-5 text-gray-700" />
//       </button>

//       {/* Mobile Backdrop */}
//       <MobileBackdrop />

//       {/* Sidebar Container */}
//       <motion.aside
//         initial={false}
//         animate={
//           window.innerWidth < 768
//             ? isMobileOpen
//               ? "mobileExpanded"
//               : "mobileHidden"
//             : isCollapsed
//             ? "collapsed"
//             : "expanded"
//         }
//         variants={xAnimationVariants}
//         className={`
//           fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-xl z-40
//           flex flex-col border-r border-gray-200 dark:border-gray-800
//           ${window.innerWidth < 768 ? "" : "lg:relative lg:z-0"}
//         `}
//         style={{
//           width:
//             window.innerWidth < 768 ? "260px" : isCollapsed ? "70px" : "260px",
//         }}
//       >
//         {/* Header */}
//         <div className="border-b border-gray-200 dark:border-gray-800">
//           <div className="flex items-center justify-between p-4">
//             {!isCollapsed || isMobileOpen ? (
//               <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{
//                   opacity: !isCollapsed || isMobileOpen ? 1 : 0,
//                   x: !isCollapsed || isMobileOpen ? 0 : -10,
//                 }}
//                 className="flex items-center"
//               >
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
//                   <span className="text-white font-bold text-lg">R</span>
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//                     REC APPLY
//                   </h1>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     Admin Portal
//                   </p>
//                 </motion.div>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto"
//               >
//                 <span className="text-white font-bold text-lg">R</span>
//               </motion.div>
//             )}

//             {/* Close/Collapse Button */}
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={toggleSidebar}
//               className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label={isCollapsed ? "Open menu" : "Close menu"}
//             >
//               {window.innerWidth < 768 ? (
//                 <CloseIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               ) : isCollapsed ? (
//                 <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               ) : (
//                 <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               )}
//             </motion.button>
//           </div>
//         </div>

//         {/* User Profile - Shows user data if available, empty if not */}
//         <div className="border-b border-gray-200 dark:border-gray-800 p-4">
//           <div className="flex items-center">
//             <div className="relative">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center"
//               >
//                 {user && user.name ? (
//                   <span className="text-white font-bold text-lg">
//                     {getUserInitials()}
//                   </span>
//                 ) : (
//                   <PersonIcon className="h-6 w-6 text-white" />
//                 )}
//               </motion.div>
//               {user && (
//                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
//               )}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{
//                 opacity: !isCollapsed || isMobileOpen ? 1 : 0,
//                 x: !isCollapsed || isMobileOpen ? 0 : -10,
//               }}
//               className="ml-3 flex-1 min-w-0"
//             >
//               {user ? (
//                 <>
//                   <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate">
//                     {user.name || "User"}
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                     {user.role ||
//                       (user.email ? user.email.split("@")[0] : "Guest")}
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="font-semibold text-base text-gray-900 dark:text-white">
//                     Not Logged In
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Please sign in
//                   </p>
//                 </>
//               )}
//             </motion.div>
//           </div>
//         </div>

//         {/* Main Content - No overflow, flows naturally */}
//         <div className="flex-1 py-3">
//           <div className="h-full flex flex-col">
//             {/* Navigation Section */}
//             <SidebarSection title="Navigation" items={navItems} />

//             {/* Analytics Section */}
//             <SidebarSection
//               title="Analytics"
//               items={analyticsItems}
//               isSubSection={true}
//             />

//             {/* Settings Section */}
//             <SidebarSection
//               title="Settings"
//               items={settingsItems}
//               isSubSection={true}
//             />

//             {/* Spacer to push footer down */}
//             <div className="flex-1"></div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 dark:border-gray-800">
//           {/* Logout Button - Only show if user is logged in */}
//           {user && (
//             <div className="p-4 pt-0">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleLogout}
//                 className={`
//                   flex items-center justify-center w-full py-3 rounded-lg transition-all duration-200
//                   bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
//                   text-white font-medium shadow-sm hover:shadow-md
//                 `}
//               >
//                 <LogoutIcon className="h-5 w-5" />
//                 {(!isCollapsed || isMobileOpen) && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="ml-2 text-sm font-semibold"
//                   >
//                     Logout
//                   </motion.span>
//                 )}
//               </motion.button>
//             </div>
//           )}

//           {/* Version Info */}
//           {(!isCollapsed || isMobileOpen) && (
//             <div className="py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
//               <p className="text-xs text-center text-gray-500 dark:text-gray-400">
//                 RecApply v2.1.0 • © 2025
//               </p>
//             </div>
//           )}
//         </div>
//       </motion.aside>
//     </>
//   );
// };
/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  Verified as VerifiedIcon,
  Home as HomeIcon,
  FlightTakeoff as FlightTakeoffIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarMonthIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  TableChart as TableChartIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
  Dashboard,
} from "@mui/icons-material";

export const Sidebar = ({ onToggleNotifications }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState({
    kigali: "",
    china: "",
    year: new Date().getFullYear(),
  });

  // Get current year
  const currentYear = new Date().getFullYear();

  // Function to format time for a specific timezone
  const getFormattedTime = (timezone) => {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Update time function
  const updateTime = () => {
    setCurrentTime({
      kigali: getFormattedTime("Africa/Kigali"),
      china: getFormattedTime("Asia/Shanghai"),
      year: currentYear,
    });
  };

  // Load user data from cookies and localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        // First check cookies
        const userCookie = Cookies.get("user");
        
        if (userCookie) {
          try {
            const parsedUser = JSON.parse(userCookie);
            setUser({
              name: parsedUser.name || "",
              email: parsedUser.email || "",
              role: parsedUser.role || "",
              avatar: parsedUser.avatar || "",
            });
            return;
          } catch (e) {
            console.error("Error parsing user cookie:", e);
          }
        }

        // Fallback to localStorage
        const savedUserData = localStorage.getItem("user");
        if (savedUserData) {
          const parsedUser = JSON.parse(savedUserData);
          setUser({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            role: parsedUser.role || "",
            avatar: parsedUser.avatar || "",
          });
        } else {
          // Check sessionStorage as last resort
          const sessionUserData = sessionStorage.getItem("user");
          if (sessionUserData) {
            const parsedUser = JSON.parse(sessionUserData);
            setUser({
              name: parsedUser.name || "",
              email: parsedUser.email || "",
              role: parsedUser.role || "",
              avatar: parsedUser.avatar || "",
            });
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setUser(null);
      }
    };

    loadUserData();
  }, []);

  // Initialize and update time
  useEffect(() => {
    // Initial time update
    updateTime();
    
    // Update time every minute
    const timeInterval = setInterval(updateTime, 60000);
    
    return () => clearInterval(timeInterval);
  }, []);

  // Animation variants for x-axis movement
  const xAnimationVariants = {
    expanded: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    collapsed: {
      x: -190,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    mobileExpanded: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    mobileHidden: {
      x: -260,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Item animation variants
  const itemAnimationVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Handle responsive sidebar states
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else if (window.innerWidth < 1024) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      } else {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect active section from URL
  useEffect(() => {
    const path = location.pathname.split("/")[1] || "dashboard";
    setActiveSection(path);
  }, [location]);

  // Navigation items
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      id: "applications",
      label: "Applications",
      icon: <DescriptionIcon />,
      path: "/schoolarship/management",
      badge: "+",
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: <SchoolIcon />,
      path: "/admission/management",
      badge: "+",
    },
    {
      id: "visa",
      label: "Visa Services",
      icon: <VerifiedIcon />,
      path: "/visa/management",
      badge: "+",
    },
    {
      id: "accommodation",
      label: "Accommodation",
      icon: <HomeIcon />,
      path: "/accomodation/booking/management",
      badge: "+",
    },
    {
      id: "airport",
      label: "Airport Services",
      icon: <FlightTakeoffIcon />,
      path: "/airport/booking/management",
      badge: "+",
    },
    {
      id: "csce",
      label: "China Exams",
      icon: <AttachMoneyIcon />,
      path: "/csce/exams/management",
      badge: "+",
    },
    {
      id: "students",
      label: "Students",
      icon: <PeopleIcon />,
      path: "/user/management",
      badge: "+",
    },
  ];

  // Analytics sub-items
  const analyticsItems = [
    {
      id: "requests",
      label: "Requests",
      icon: <AssessmentIcon />,
      path: "/contact/management",
      badge: "+",
    },
    {
      id: "testimony",
      label: "Testimonials",
      icon: <TimelineIcon />,
      path: "/testimony/management",
      badge: "+",
    },
  ];

  // Settings items
  const settingsItems = [
    {
      id: "company",
      label: "Company",
      icon: <BusinessIcon />,
      path: "/about",
      badge: "+",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <NotificationsIcon />,
      path: "/settings/notifications",
      badge: "+",
    },
  ];

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsCollapsed(!isCollapsed);
      setIsMobileOpen(false);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close mobile sidebar when clicking on nav items
  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle logout - clears all user data
  const handleLogout = () => {
    console.log("Logging out...");

    // Clear all user data from storage
    // 1. Remove cookies
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("session");

    // 2. Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");

    // 3. Clear sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    // 4. Clear user state
    setUser(null);

    // 5. Redirect to login page
    navigate("/");
    
    // Optional: Force page reload to clear any remaining state

  };

  // Mobile sidebar backdrop
  const MobileBackdrop = () => (
    <AnimatePresence>
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </AnimatePresence>
  );

  // Get user initials for avatar


  // Sidebar item component with x-axis animation
  const SidebarItem = ({ item, isSubItem = false, section }) => (
    <motion.div
      initial={false}
      animate={!isCollapsed || isMobileOpen ? "expanded" : "collapsed"}
      variants={itemAnimationVariants}
      className="w-full"
    >
      <NavLink
        to={item.path}
        className={({ isActive }) => `
          flex items-center py-3 px-2 rounded-lg transition-all duration-200 group
          w-full min-h-[44px]
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }
          ${isSubItem ? "ml-0" : ""}
        `}
        onClick={closeMobileSidebar}
      >
        <div className="flex items-center justify-center w-8 h-8 min-w-[2rem]">
          <motion.span
            animate={{
              scale: !isCollapsed || isMobileOpen ? 1 : 1.2,
            }}
            className={`${
              activeSection === item.id
                ? "text-white"
                : "text-gray-500 group-hover:text-blue-600"
            }`}
          >
            {item.icon}
          </motion.span>
        </div>

        <motion.div
          className={`flex items-center justify-between flex-1 ${
            !isCollapsed || isMobileOpen ? "opacity-100" : "opacity-0 w-0"
          }`}
          animate={{
            x: !isCollapsed || isMobileOpen ? 0 : -20,
            opacity: !isCollapsed || isMobileOpen ? 1 : 0,
            width: !isCollapsed || isMobileOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: !isCollapsed || isMobileOpen ? 1 : 0,
              x: !isCollapsed || isMobileOpen ? 0 : -10,
            }}
            className="font-medium text-sm ml-3"
          >
            {item.label}
          </motion.span>

          {item.badge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center"
            >
              {item.badge}
            </motion.span>
          )}
        </motion.div>
      </NavLink>
    </motion.div>
  );

  // Section component
  const SidebarSection = ({ title, items, isSubSection = false }) => (
    <div className="mb-4">
      <motion.h4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2
          ${!isCollapsed || isMobileOpen ? "text-left px-2" : "text-center"}`}
      >
        {!isCollapsed || isMobileOpen ? title : "•"}
      </motion.h4>
      <div className="space-y-1 px-2">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isSubItem={isSubSection}
            section={title.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-3 left-0 z-40 p-2 rounded-lg bg-white shadow-md lg:hidden m-2"
      >
        <Dashboard className="h-5 w-5 text-blue-700" />
      </button>

      {/* Mobile Backdrop */}
      <MobileBackdrop />

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={
          window.innerWidth < 768
            ? isMobileOpen
              ? "mobileExpanded"
              : "mobileHidden"
            : isCollapsed
            ? "collapsed"
            : "expanded"
        }
        variants={xAnimationVariants}
        className={`
          fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-xl z-40
          flex flex-col border-r border-gray-200 dark:border-gray-800
          ${window.innerWidth < 768 ? "" : "lg:relative lg:z-0"}
        `}
        style={{
          width:
            window.innerWidth < 768 ? "260px" : isCollapsed ? "70px" : "260px",
        }}
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-4">
            {!isCollapsed || isMobileOpen ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: !isCollapsed || isMobileOpen ? 1 : 0,
                  x: !isCollapsed || isMobileOpen ? 0 : -10,
                }}
                className="flex items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    REC APPLY
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin Portal
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto"
              >
                <span className="text-white font-bold text-lg">R</span>
              </motion.div>
            )}

            {/* Close/Collapse Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={isCollapsed ? "Open menu" : "Close menu"}
            >
              {window.innerWidth < 768 ? (
                <CloseIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : isCollapsed ? (
                <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>



        {/* Main Content */}
        <div className="flex-1 py-3">
          <div className="h-full flex flex-col">
            {/* Navigation Section */}
            <SidebarSection title="Navigation" items={navItems} />

            {/* Analytics Section */}
            <SidebarSection
              title="Analytics"
              items={analyticsItems}
              isSubSection={true}
            />

            {/* Settings Section */}
            <SidebarSection
              title="Settings"
              items={settingsItems}
              isSubSection={true}
            />

            {/* Spacer to push footer down */}
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          {/* Logout Button - Only show if user is logged in */}
          {user && (
            <div className="p-4 pt-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className={`
                  flex items-center justify-center w-full py-3 rounded-lg transition-all duration-200
                  bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
                  text-white font-medium shadow-sm hover:shadow-md
                `}
              >
                <LogoutIcon className="h-5 w-5" />
                {(!isCollapsed || isMobileOpen) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-sm font-semibold"
                  >
                    Logout
                  </motion.span>
                )}
              </motion.button>
            </div>
          )}

          {/* Version Info with Real-time Data */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
              <div className="px-2 mb-2">
                {/* Real-time clocks */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-blue-50 dark:bg-gray-700 rounded">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">
                      Kigali
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {currentTime.kigali || "Loading..."}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-red-50 dark:bg-gray-700 rounded">
                    <div className="font-semibold text-red-600 dark:text-red-400">
                      China
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {currentTime.china || "Loading..."}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                RecApply v2.1.0 • © {currentTime.year}
              </p>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};