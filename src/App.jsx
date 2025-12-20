// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import "./App.css";
// import axios from "axios";
// import { Navbar } from "./components/navbar/Navbar";
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Blogs } from "./pages/blogs/Blogs";
// import { Services } from "./pages/services/Services";
// import { NotFound } from "./pages/notfound/NotFound";
// import { Footer } from "./components/footer/Footer";

// // Material Icons
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import ArticleIcon from "@mui/icons-material/Article";
// import BuildIcon from "@mui/icons-material/Build";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ErrorIcon from "@mui/icons-material/Error";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import { Admission } from "./components/services/admission/Admission";
// import { Scholarship } from "./components/services/scholarship/Scholarship";
// import { CESP } from "./components/services/china/CESP";
// import { VISA } from "./components/services/visa/VISA";
// import { Accommodation } from "./components/services/accomodation/Accomodation";
// import { AirportServices } from "./components/services/airport/Airport";
// import { Team } from "./pages/teams/Team";
// import { FAQ } from "./pages/faq/FAQ";
// import { UserManagement } from "./components/dashboard/admin/components/management/user/UserManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/management/contacts/ContactManagement";
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { ScholarshipManagement } from "./components/dashboard/admin/components/management/schoolarships/SchoolarshipManagement";
// import { AccomodationBookingManagement } from "./components/dashboard/admin/components/management/accomodation/AccomodationBookingManagement";
// import { CreateAccommodation } from "./components/dashboard/admin/components/management/accomodation/CreateAccomodation";
// import { AirportBookingManagement } from "./components/dashboard/admin/components/management/airport/AirportBookingManagement";
// import { AdmissionManagement } from "./components/dashboard/admin/components/management/admission/AdmissionApplicationManagement";
// import { CSCEManagement } from "./components/dashboard/admin/components/management/csce/CSCEManagement";

// // DARK MODE CONTEXT
// const ThemeContext = createContext();
// export const useTheme = () => useContext(ThemeContext);

// // RESPONSIVE CONTAINER COMPONENT
// const ResponsiveContainer = ({ children, className = "" }) => {
//   return (
//     <div
//       className={`w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// // RESPONSIVE TEXT COMPONENT
// const ResponsiveText = ({
//   children,
//   as: Component = "p",
//   size = "base",
//   weight = "normal",
//   className = "",
// }) => {
//   const sizeClasses = {
//     xs: "text-xs sm:text-sm",
//     sm: "text-sm sm:text-base",
//     base: "text-base sm:text-lg",
//     lg: "text-lg sm:text-xl md:text-2xl",
//     xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
//     "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//     "3xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
//   };

//   const weightClasses = {
//     light: "font-light",
//     normal: "font-normal",
//     medium: "font-medium",
//     semibold: "font-semibold",
//     bold: "font-bold",
//   };

//   return (
//     <Component
//       className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
//     >
//       {children}
//     </Component>
//   );
// };

// // PAGE TRANSITION COMPONENT - APPLIES TO EVERY PAGE
// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{
//         type: "spring",
//         damping: 20,
//         stiffness: 100,
//         duration: 0.3,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // PRIVATE ROUTE COMPONENT
// function PrivateRoute({ children }) {
//   const isAuthenticated = false; // Replace with real auth logic
//   return isAuthenticated ? children : <Navigate to="/" />;
// }

// // ENHANCED PAGE LOADER COMPONENT WITH PAGE-SPECIFIC MESSAGES AND ROUTE NAME DISPLAY
// const PageLoader = ({ pageName = "", routeName = "", icon: Icon = null }) => {
//   // Map page names to display names and colors
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500" },
//     about: { displayName: "About", color: "from-green-500 to-teal-500" },
//     blog: { displayName: "Blog", color: "from-orange-500 to-red-500" },
//     blogs: { displayName: "Blog", color: "from-orange-500 to-red-500" },
//     support: { displayName: "Support", color: "from-orange-500 to-red-500" },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500" },
//     team: { displayName: "Team", color: "from-purple-500 to-indigo-500" },
//     admission: {
//       displayName: "Admission",
//       color: "from-blue-500 to-green-500",
//     },
//     scholarship: {
//       displayName: "Scholarship",
//       color: "from-yellow-500 to-orange-500",
//     },
//     cesp: {
//       displayName: "CESP (China Specialist Exam)",
//       color: "from-red-500 to-pink-500",
//     },
//     visa: {
//       displayName: "VISA Application",
//       color: "from-green-500 to-blue-500",
//     },
//     accommodation: {
//       displayName: "Accommodation",
//       color: "from-indigo-500 to-purple-500",
//     },
//     airport: {
//       displayName: "Airport Services",
//       color: "from-cyan-500 to-blue-500",
//     },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//     },
//     404: { displayName: "Not Found", color: "from-gray-500 to-gray-700" },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500" },
//   };

//   // Normalize the page name by removing special characters and making it lowercase
//   const normalizedPageName = pageName.toLowerCase().replace(/[^a-z]/g, "");

//   // Try to match exact page name first, then fallback to default
//   let config;
//   if (pageConfig[normalizedPageName]) {
//     config = pageConfig[normalizedPageName];
//   } else {
//     // Try to find partial match for more complex routes
//     const matchedKey = Object.keys(pageConfig).find(
//       (key) =>
//         normalizedPageName.includes(key) || pageName.toLowerCase().includes(key)
//     );
//     config = matchedKey ? pageConfig[matchedKey] : pageConfig["default"];
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-50 flex flex-col items-center justify-center px-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative mb-4 sm:mb-6 md:mb-8"
//         initial={{ scale: 0.5, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{
//           duration: 0.8,
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//       >
//         {Icon ? (
//           <motion.div
//             className="text-4xl sm:text-5xl md:text-6xl"
//             animate={{
//               rotate: 360,
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               rotate: { duration: 2, repeat: Infinity, ease: "linear" },
//               scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
//             }}
//           >
//             <Icon
//               className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
//             />
//           </motion.div>
//         ) : (
//           <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//             <span className="text-white text-xl sm:text-2xl font-bold">
//               {config.displayName.charAt(0)}
//             </span>
//           </div>
//         )}
//       </motion.div>

//       <div className="text-center mb-4 sm:mb-6 md:mb-8 max-w-md">
//         <motion.h2
//           className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading {config.displayName}
//         </motion.h2>

//         {/* Display route name if available */}
//         {routeName && (
//           <motion.div
//             className="mb-3 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Route:{" "}
//               <span className="font-bold text-blue-600 dark:text-blue-400">
//                 {routeName}
//               </span>
//             </p>
//           </motion.div>
//         )}

//         <motion.p
//           className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           Preparing your {config.displayName.toLowerCase()} experience...
//         </motion.p>
//       </div>

//       <div className="w-48 sm:w-64 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//         <motion.div
//           className={`h-full bg-gradient-to-r ${config.color}`}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // RESPONSIVE DARK MODE TOGGLE BUTTON
// function DarkModeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div
//       onClick={toggleTheme}
//       className="fixed top-18 right-6 z-50 bg-gradient-to-r from-blue-300 to-indigo-300  sm:p-2 md:p-2 rounded-full shadow-xl"
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ delay: 0.5, type: "spring" }}
//       aria-label={
//         theme === "light" ? "Switch to dark mode" : "Switch to light mode"
//       }
//     >
//       <AnimatePresence mode="wait">
//         {theme === "light" ? (
//           <motion.div
//             key="dark"
//             initial={{ rotate: -180, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: 180, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <DarkModeIcon className="sm:text-base text-amber-600 md:text-medium" />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="light"
//             initial={{ rotate: 180, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: -180, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <LightModeIcon className="sm:text-base text-amber-400 md:text-medium" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // SINGLE RESPONSIVE BACK TO TOP BUTTON
// function BackToTop() {
//   const [visible, setVisible] = useState(false);
//   const [isNearBottom, setIsNearBottom] = useState(false);
//   const { theme } = useTheme();

//   useEffect(() => {
//     const checkScroll = () => {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;

//       // Calculate scroll position in percentage
//       const scrollPercentage =
//         (scrollTop / (documentHeight - windowHeight)) * 100;

//       // Only show when:
//       // 1. Scrolled past 50% of viewport height (not immediately)
//       // 2. Not at the very top
//       // 3. Not near the bottom (hide when 90% scrolled)
//       const shouldBeVisible =
//         scrollTop > windowHeight * 0.5 && // Show after 50% of viewport
//         scrollTop > 100 && // Not at very top
//         scrollPercentage < 90; // Hide when near bottom

//       const nearBottom = scrollPercentage > 80; // Consider near bottom after 80%

//       setVisible(shouldBeVisible);
//       setIsNearBottom(nearBottom);
//     };

//     // Add scroll listener
//     window.addEventListener("scroll", checkScroll, { passive: true });

//     // Initial check
//     checkScroll();

//     return () => {
//       window.removeEventListener("scroll", checkScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <AnimatePresence>
//       {visible && !isNearBottom && (
//         <motion.button
//           initial={{ scale: 0, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0, opacity: 0, y: 20 }}
//           whileHover={{
//             scale: 1.1,
//             backgroundColor: theme === "light" ? "#3b82f6" : "#60a5fa",
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={scrollToTop}
//         >
//           <ArrowUpwardIcon className="sm:text-base md:text-medium" />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// }

// // RESPONSIVE MOBILE MENU (For Small Screens)
// function MobileMenu({ isOpen, onClose }) {
//   const location = useLocation();
//   const { theme } = useTheme();

//   const menuItems = [
//     { path: "/", label: "Home", icon: HomeIcon },
//     { path: "/about", label: "About", icon: InfoIcon },
//     { path: "/team", label: "Team", icon: InfoIcon },
//     { path: "/blog", label: "Blog", icon: ArticleIcon },
//     { path: "/support", label: "Support", icon: ArticleIcon },
//     { path: "/services", label: "Services", icon: BuildIcon },
//     { path: "/admission", label: "Admission", icon: BuildIcon },
//     { path: "/scholarship", label: "Scholarship", icon: BuildIcon },
//     { path: "/csca", label: "CESP", icon: BuildIcon },
//     { path: "/visa", label: "VISA", icon: BuildIcon },
//     { path: "/accomodation", label: "Accommodation", icon: BuildIcon },
//     { path: "/airport", label: "Airport Services", icon: BuildIcon },
//   ];

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ type: "spring", damping: 25 }}
//           className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden"
//         >
//           <div className="flex flex-col h-full p-6">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold dark:text-white">Menu</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
//               >
//                 <CloseIcon />
//               </button>
//             </div>

//             <div className="flex-1 space-y-4">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <motion.a
//                     key={item.path}
//                     href={item.path}
//                     className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
//                       isActive
//                         ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                         : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
//                     }`}
//                     whileHover={{ x: 5 }}
//                     onClick={onClose}
//                   >
//                     <Icon />
//                     <span className="text-lg">{item.label}</span>
//                   </motion.a>
//                 );
//               })}
//             </div>

//             <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600 dark:text-gray-300">
//                   Switch Theme
//                 </span>
//                 <button
//                   onClick={() => {
//                     const { toggleTheme } = useContext(ThemeContext);
//                     toggleTheme?.();
//                   }}
//                   className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // TEXT MARKING COMPONENT FOR TRANSITIONS
// function MarkedText({ children, delay = 0 }) {
//   const { theme } = useTheme();

//   return (
//     <motion.span
//       initial={{
//         backgroundSize: "0% 100%",
//         backgroundImage:
//           theme === "light"
//             ? "linear-gradient(to right, transparent 50%, #93c5fd 50%)"
//             : "linear-gradient(to right, transparent 50%, #1e40af 50%)",
//       }}
//       whileInView={{
//         backgroundSize: "100% 100%",
//       }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.8,
//         delay: delay,
//         ease: "easeInOut",
//       }}
//       className="bg-no-repeat bg-left-bottom px-1"
//       style={{
//         backgroundImage:
//           theme === "light"
//             ? "linear-gradient(to right, transparent 50%, #93c5fd 50%)"
//             : "linear-gradient(to right, transparent 50%, #1e40af 50%)",
//         backgroundSize: "200% 100%",
//         transition: "background-position 0.8s ease-in-out",
//       }}
//     >
//       {children}
//     </motion.span>
//   );
// }

// // Helper function to get page info WITHOUT setting state
// const getPageInfoHelper = (pathname) => {
//   switch (pathname) {
//     case "/":
//       return { name: "home", icon: HomeIcon };
//     case "/about":
//       return { name: "about", icon: InfoIcon };
//     case "/team":
//       return { name: "team", icon: InfoIcon };
//     case "/blog":
//       return { name: "blog", icon: ArticleIcon };
//     case "/blogs":
//       return { name: "blog", icon: InfoIcon };
//     case "/support":
//       return { name: "support", icon: ArticleIcon };
//     case "/services":
//       return { name: "services", icon: BuildIcon };
//     case "/dashboard":
//       return { name: "dashboard", icon: DashboardIcon };
//     case "/admission":
//       return { name: "admission", icon: BuildIcon };
//     case "/scholarship":
//       return { name: "scholarship", icon: BuildIcon };
//     case "/csca":
//       return { name: "cesp", icon: BuildIcon };
//     case "/visa":
//       return { name: "visa", icon: BuildIcon };
//     case "/accomodation":
//       return { name: "accommodation", icon: BuildIcon };
//     case "/airport":
//       return { name: "airport", icon: BuildIcon };
//     default:
//       return { name: "404", icon: ErrorIcon };
//   }
// };

// // MAIN APP
// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (
//       !savedTheme &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//     ) {
//       return "dark";
//     }
//     return savedTheme || "light";
//   });
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   // Get current page info using useMemo to prevent unnecessary recalculations
//   const currentPageInfo = useMemo(() => {
//     return getPageInfoHelper(location.pathname);
//   }, [location.pathname]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => {
//       const newTheme = prevTheme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };

//   // Apply theme class to document root for Tailwind
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);

//   // Page loading effect when route changes
//   useEffect(() => {
//     // Only show page loader if not the initial load
//     if (!loading) {
//       setPageLoading(true);
//       const timer = setTimeout(() => {
//         setPageLoading(false);
//       }, 800); // Shorter duration for page transitions

//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname, loading]);

//   // FIXED: Page View Tracking with error handling
//   const sendView = useCallback(async () => {
//     try {
//       const ip = await axios.get("https://api.ipify.org?format=json");

//       await axios.post(
//         "https://jsonplaceholder.typicode.com/posts",
//         {
//           ip: ip.data.ip,
//           page: window.location.pathname,
//           route: location.pathname, // Use location.pathname directly
//           timestamp: new Date().toISOString(),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (err) {
//       console.warn("View tracking failed (non-critical):", err.message);
//     }
//   }, [location.pathname]);

//   // Initial app loading effect
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     sendView();

//     return () => clearTimeout(timer);
//   }, [sendView]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div
//         className={`min-h-screen transition-colors duration-300 ${
//           theme === "dark"
//             ? "dark bg-gray-900 text-white"
//             : "bg-gray-50 text-gray-900"
//         }`}
//       >
//         {/* Initial App Loading */}
//         {loading ? (
//           <PageLoader
//             pageName={currentPageInfo.name}
//             routeName={location.pathname}
//             icon={currentPageInfo.icon}
//           />
//         ) : (
//           <>
//             {/* Page Transition Loading */}
//             {pageLoading && (
//               <PageLoader
//                 pageName={currentPageInfo.name}
//                 routeName={location.pathname}
//                 icon={currentPageInfo.icon}
//               />
//             )}

//             {/* Mobile Menu Button - Only on small screens */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden"
//               aria-label="Open menu"
//             >
//               <MenuIcon />
//             </button>

//             {/* Mobile Menu */}
//             <MobileMenu
//               isOpen={mobileMenuOpen}
//               onClose={() => setMobileMenuOpen(false)}
//             />

//             <Navbar />

//             {/* Main Content with Responsive Container */}
//             <main className="pt-16 md:pt-20">
//               <ResponsiveContainer>
//                 <AnimatePresence mode="wait">
//                   <Routes location={location} key={location.pathname}>
//                     <Route
//                       path="/"
//                       element={
//                         <PageTransition>
//                           <Home />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/about"
//                       element={
//                         <PageTransition>
//                           <About />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/team"
//                       element={
//                         <PageTransition>
//                           <Team />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/support"
//                       element={
//                         <PageTransition>
//                           <FAQ />
//                         </PageTransition>
//                       }
//                     />

//                     <Route
//                       path="/admission"
//                       element={
//                         <PageTransition>
//                           <Admission />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/scholarship"
//                       element={
//                         <PageTransition>
//                           <Scholarship />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/csca"
//                       element={
//                         <PageTransition>
//                           <CESP />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/visa"
//                       element={
//                         <PageTransition>
//                           <VISA />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/accomodation"
//                       element={
//                         <PageTransition>
//                           <Accommodation />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/airport"
//                       element={
//                         <PageTransition>
//                           <AirportServices />
//                         </PageTransition>
//                       }
//                     />

//                     <Route
//                       path="/blog"
//                       element={
//                         <PageTransition>
//                           <Blogs />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/services"
//                       element={
//                         <PageTransition>
//                           <Services />
//                         </PageTransition>
//                       }
//                     />

//                     {/* PRIVATE ROUTE EXAMPLE */}
//                     <Route
//                       // path="/dashboard"
//                       element={
//                         <PrivateRoute>
//                           <PageTransition>
//                             <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
//                               <ResponsiveText size="xl" weight="bold">
//                                 Dashboard -{" "}
//                                 <MarkedText>Private Area</MarkedText>
//                               </ResponsiveText>
//                             </div>
//                           </PageTransition>
//                         </PrivateRoute>
//                       }
//                     />
//                     {/* ********************************* */}
//                     <Route
//                       path="/user/management"
//                       element={
//                         <PageTransition>
//                           <UserManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/contact/management"
//                       element={
//                         <PageTransition>
//                           <ContactManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/dashboard"
//                       element={
//                         <PageTransition>
//                           <Dashboard />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/schoolarship/management"
//                       element={
//                         <PageTransition>
//                           <ScholarshipManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/accomodation/booking/management"
//                       element={
//                         <PageTransition>
//                           <AccomodationBookingManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/accomodation/create/management"
//                       element={
//                         <PageTransition>
//                           <CreateAccommodation />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/airport/booking/management"
//                       element={
//                         <PageTransition>
//                           <AirportBookingManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/admission/management"
//                       element={
//                         <PageTransition>
//                           <AdmissionManagement />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/csce/exams/management"
//                       element={
//                         <PageTransition>
//                           <CSCEManagement />
//                         </PageTransition>
//                       }
//                     />
//                     {/* *********************************** */}

//                     <Route
//                       path="*"
//                       element={
//                         <PageTransition>
//                           <NotFound />
//                         </PageTransition>
//                       }
//                     />
//                   </Routes>
//                 </AnimatePresence>
//               </ResponsiveContainer>
//             </main>

//             {/* FLOATING ACTION BUTTONS - Positioned at bottom corners */}
//             <DarkModeToggle />
//             <BackToTop />

//             <Footer />
//           </>
//         )}
//       </div>
//     </ThemeContext.Provider>
//   );
// }

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
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Blogs } from "./pages/blogs/Blogs";
import { Services } from "./pages/services/Services";
import { NotFound } from "./pages/notfound/NotFound";
import { Footer } from "./components/footer/Footer";

// Material Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
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

// DARK MODE CONTEXT
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// RESPONSIVE CONTAINER COMPONENT
const ResponsiveContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl ${className}`}
    >
      {children}
    </div>
  );
};

// RESPONSIVE TEXT COMPONENT
const ResponsiveText = ({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  className = "",
}) => {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl md:text-2xl",
    xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    "3xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
    >
      {children}
    </Component>
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

// PRIVATE ROUTE COMPONENT
function PrivateRoute({ children }) {
  const isAuthenticated = false; // Replace with real auth logic
  return isAuthenticated ? children : <Navigate to="/" />;
}

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

const privateRoutes = [
  { path: "/dashboard", name: "Admin Dashboard", element: <Dashboard />, icon: DashboardIcon },
  { path: "/user/management", name: "User Management", element: <UserManagement />, icon: DashboardIcon },
  { path: "/contact/management", name: "Contact Management", element: <ContactManagement />, icon: DashboardIcon },
  { path: "/schoolarship/management", name: "Scholarship Management", element: <ScholarshipManagement />, icon: DashboardIcon },
  { path: "/accomodation/booking/management", name: "Accommodation Booking Management", element: <AccomodationBookingManagement />, icon: DashboardIcon },
  { path: "/accomodation/create/management", name: "Create Accommodation", element: <CreateAccommodation />, icon: DashboardIcon },
  { path: "/airport/booking/management", name: "Airport Booking Management", element: <AirportBookingManagement />, icon: DashboardIcon },
  { path: "/admission/management", name: "Admission Management", element: <AdmissionManagement />, icon: DashboardIcon },
  { path: "/csce/exams/management", name: "CSCE Exams Management", element: <CSCEManagement />, icon: DashboardIcon },
  // user
    { path: "/user/dashboard", name: "User Dashboard", element: <UserDashboard />, icon: DashboardIcon },
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

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-800 to-indigo-500 dark:from-gray-900 dark:to-gray-800 z-50 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative mb-4 sm:mb-6 md:mb-8"
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
            className="text-4xl sm:text-5xl md:text-6xl"
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
              className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
            />
          </motion.div>
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xl sm:text-2xl font-bold">
              {config.displayName.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      <div className="text-center mb-4 sm:mb-6 md:mb-8 max-w-md">
        <motion.h2
          className="text-2xl sm:text-3xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading {config.displayName}
        </motion.h2>

        {/* Display route name and type */}
        <div className="space-y-2 mb-3">
          <motion.div
            className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-100 dark:text-gray-300">
              Route:{" "}
              <span className="font-bold text-white">
                {routeName}
              </span>
            </p>
          </motion.div>
          
          <motion.div
            className={`px-4 py-2 rounded-lg border ${
              routeType === "private" 
                ? "bg-red-50/50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                : "bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Type:{" "}
              <span className={`font-bold ${
                routeType === "private" 
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}>
                {routeType.toUpperCase()} ROUTE
              </span>
            </p>
          </motion.div>
        </div>

        <motion.p
          className="text-gray-100 dark:text-gray-300 text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Preparing your {config.displayName.toLowerCase()} experience...
        </motion.p>
      </div>

      <div className="w-48 sm:w-64 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${config.color}`}
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
  
  // Check private routes
  const privateRoute = privateRoutes.find(route => route.path === pathname);
  if (privateRoute) {
    return { 
      name: privateRoute.name.toLowerCase().split(' ')[0], 
      icon: privateRoute.icon,
      routeType: "private",
      fullName: privateRoute.name
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

// RESPONSIVE DARK MODE TOGGLE BUTTON
function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="fixed top-18 right-6 z-50 bg-gradient-to-r from-blue-300 to-indigo-300  sm:p-2 md:p-2 rounded-full shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="dark"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DarkModeIcon className="sm:text-base text-amber-600 md:text-medium" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LightModeIcon className="sm:text-base text-amber-400 md:text-medium" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SINGLE RESPONSIVE BACK TO TOP BUTTON
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll position in percentage
      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      // Only show when:
      // 1. Scrolled past 50% of viewport height (not immediately)
      // 2. Not at the very top
      // 3. Not near the bottom (hide when 90% scrolled)
      const shouldBeVisible =
        scrollTop > windowHeight * 0.5 && // Show after 50% of viewport
        scrollTop > 100 && // Not at very top
        scrollPercentage < 90; // Hide when near bottom

      const nearBottom = scrollPercentage > 80; // Consider near bottom after 80%

      setVisible(shouldBeVisible);
      setIsNearBottom(nearBottom);
    };

    // Add scroll listener
    window.addEventListener("scroll", checkScroll, { passive: true });

    // Initial check
    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && !isNearBottom && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: theme === "light" ? "#3b82f6" : "#60a5fa",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
        >
          <ArrowUpwardIcon className="sm:text-base md:text-medium" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// RESPONSIVE MOBILE MENU (For Small Screens)
function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const { theme } = useTheme();

  // Combine public routes for mobile menu (excluding wildcard route)
  const mobileMenuItems = publicRoutes
    .filter(route => route.path !== "*")
    .map(route => ({
      path: route.path,
      label: route.name,
      icon: route.icon,
      type: "public"
    }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 z-40 bg-gradient-to-br from-blue-800 to-indigo-500 dark:bg-gray-900 md:hidden"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold dark:text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              {mobileMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    whileHover={{ x: 5 }}
                    onClick={onClose}
                  >
                    <Icon />
                    <span className="text-lg">{item.label}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.type === "private" 
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Switch Theme
                </span>
                <button
                  onClick={() => {
                    const { toggleTheme } = useContext(ThemeContext);
                    toggleTheme?.();
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </button>
              </div>
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
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      !savedTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return savedTheme || "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Get current page info using useMemo to prevent unnecessary recalculations
  const currentPageInfo = useMemo(() => {
    return getPageInfoHelper(location.pathname);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Apply theme class to document root for Tailwind
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
        "https://ruziganodejs.onrender.com",
        {
          ip: ip.data.ip,
          page: window.location.pathname,
          route: location.pathname,
          routeName: currentPageInfo.fullName,
          routeType: currentPageInfo.routeType,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "dark bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-800 to-indigo-500 text-black"
        }`}
      >
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

            {/* Mobile Menu Button - Only on small screens */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gradient-to-br from-blue-800 to-indigo-500 dark:bg-gray-800 shadow-lg md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />

            <Navbar />


            {/* Main Content with Responsive Container */}
            <main>
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

                    {/* Private Routes */}
                    {privateRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <PrivateRoute>
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

            {/* FLOATING ACTION BUTTONS - Positioned at bottom corners */}
            <DarkModeToggle />
            <BackToTop />

            <Footer />
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
}