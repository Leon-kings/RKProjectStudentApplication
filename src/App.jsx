// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
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

// // ENHANCED PAGE LOADER COMPONENT WITH PAGE-SPECIFIC MESSAGES
// const PageLoader = ({ pageName = "", icon: Icon = null }) => {
//   // Map page names to display names and colors
//   const pageConfig = {
//     home: { displayName: "Home", color: "from-blue-500 to-purple-500" },
//     about: { displayName: "About", color: "from-green-500 to-teal-500" },
//     blog: { displayName: "Blog", color: "from-orange-500 to-red-500" },
//     blogs: { displayName: "Blog", color: "from-orange-500 to-red-500" },
//     services: { displayName: "Services", color: "from-indigo-500 to-pink-500" },
//     dashboard: {
//       displayName: "Dashboard",
//       color: "from-purple-500 to-blue-500",
//     },
//     404: { displayName: "Not Found", color: "from-gray-500 to-gray-700" },
//     default: { displayName: "Page", color: "from-blue-500 to-purple-500" },
//   };

//   const config = pageConfig[pageName.toLowerCase()] || pageConfig["default"];

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

//       <motion.div
//         className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6 }}
//       >
//         <div className="flex items-center space-x-2 justify-center">
//           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
//           <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//             Fetching data
//           </span>
//         </div>
//         <div className="flex items-center space-x-2 justify-center">
//           <div
//             className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//           <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//             Rendering content
//           </span>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // RESPONSIVE DARK MODE TOGGLE BUTTON
// function DarkModeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className="fixed top-20 sm:top-24 right-0 z-50 p-2 sm:p-3 md:p-4 rounded-full shadow-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
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
//             <DarkModeIcon
//
//               className="sm:text-base md:text-medium"
//             />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="light"
//             initial={{ rotate: 180, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: -180, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <LightModeIcon
//
//               className="sm:text-base md:text-medium"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// }

// // RESPONSIVE BACK TO TOP BUTTON
// function BackToTop() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => setVisible(window.scrollY > 300);
//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.button
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           <ArrowUpwardIcon
//
//             className="sm:text-base md:text-medium"
//           />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// }

// // RESPONSIVE MOBILE MENU (For Small Screens)
// function MobileMenu({ isOpen, onClose }) {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/", label: "Home", icon: HomeIcon },
//     { path: "/about", label: "About", icon: InfoIcon },
//     { path: "/blog", label: "Blog", icon: ArticleIcon },
//     { path: "/services", label: "Services", icon: BuildIcon },
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
//               <h2 className="text-2xl font-bold">Menu</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
//                         : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
//                 <span className="text-gray-600 dark:text-gray-400">
//                   Switch Theme
//                 </span>
//                 <DarkModeToggle />
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

// // MAIN APP
// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");
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

//   const toggleTheme = () => {
//     setTheme((prevTheme) => {
//       const newTheme = prevTheme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };

//   // Map pathnames to page names and icons
//   const getPageInfo = (pathname) => {
//     switch (pathname) {
//       case "/":
//         return { name: "home", icon: HomeIcon };
//       case "/about":
//         return { name: "about", icon: InfoIcon };
//       case "/blog":
//         return { name: "blog", icon: ArticleIcon };
//       case "/blogs":
//         return { name: "blog", icon: ArticleIcon };
//       case "/services":
//         return { name: "services", icon: BuildIcon };
//       case "/dashboard":
//         return { name: "dashboard", icon: DashboardIcon };
//       default:
//         return { name: "404", icon: ErrorIcon };
//     }
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
//     const pageInfo = getPageInfo(location.pathname);
//     setCurrentPage(pageInfo.name);

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
//   }, []);

//   // Initial app loading effect
//   useEffect(() => {
//     const pageInfo = getPageInfo(location.pathname);
//     setCurrentPage(pageInfo.name);

//     const timer = setTimeout(() => setLoading(false), 1500);
//     sendView();

//     return () => clearTimeout(timer);
//   }, [sendView, location.pathname]);

//   const pageInfo = getPageInfo(location.pathname);

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
//           <PageLoader pageName={currentPage} icon={pageInfo.icon} />
//         ) : (
//           <>
//             {/* Page Transition Loading */}
//             {pageLoading && (
//               <PageLoader pageName={currentPage} icon={pageInfo.icon} />
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
//                       path="/china/specialist/exam"
//                       element={
//                         <PageTransition>
//                           <CESP />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/visa/application"
//                       element={
//                         <PageTransition>
//                           <VISA />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/accomodation/application"
//                       element={
//                         <PageTransition>
//                           <Accommodation />
//                         </PageTransition>
//                       }
//                     />
//                     <Route
//                       path="/airport/services"
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
//                       path="/dashboard"
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

//             {/* FLOATING ACTION BUTTONS */}
//             <DarkModeToggle />
//             <BackToTop />

//             <Footer />
//           </>
//         )}
//       </div>
//     </ThemeContext.Provider>
//   );
// }

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

// ENHANCED PAGE LOADER COMPONENT WITH PAGE-SPECIFIC MESSAGES AND ROUTE NAME DISPLAY
const PageLoader = ({ pageName = "", routeName = "", icon: Icon = null }) => {
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
    "china/specialist/exam": {
      displayName: "CESP",
      color: "from-red-500 to-pink-500",
    },
    "visa/application": {
      displayName: "VISA",
      color: "from-green-500 to-blue-500",
    },
    "accomodation/application": {
      displayName: "Accommodation",
      color: "from-indigo-500 to-purple-500",
    },
    "airport/services": {
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

  const config = pageConfig[pageName.toLowerCase()] || pageConfig["default"];

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-50 flex flex-col items-center justify-center px-4"
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
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading {config.displayName}
        </motion.h2>

        {/* Display route name if available */}
        {routeName && (
          <motion.div
            className="mb-3 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Route:{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {routeName}
              </span>
            </p>
          </motion.div>
        )}

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg"
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

      <motion.div
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Loading route: {routeName || config.displayName}
          </span>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <div
            className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Rendering content
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
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

  const menuItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/about", label: "About", icon: InfoIcon },
    { path: "/team", label: "Team", icon: InfoIcon },
    { path: "/blog", label: "Blog", icon: ArticleIcon },
    { path: "/support", label: "Support", icon: ArticleIcon },
    { path: "/services", label: "Services", icon: BuildIcon },
    { path: "/admission", label: "Admission", icon: BuildIcon },
    { path: "/scholarship", label: "Scholarship", icon: BuildIcon },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden"
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
              {menuItems.map((item) => {
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

// TEXT MARKING COMPONENT FOR TRANSITIONS
function MarkedText({ children, delay = 0 }) {
  const { theme } = useTheme();

  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
        backgroundImage:
          theme === "light"
            ? "linear-gradient(to right, transparent 50%, #93c5fd 50%)"
            : "linear-gradient(to right, transparent 50%, #1e40af 50%)",
      }}
      whileInView={{
        backgroundSize: "100% 100%",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeInOut",
      }}
      className="bg-no-repeat bg-left-bottom px-1"
      style={{
        backgroundImage:
          theme === "light"
            ? "linear-gradient(to right, transparent 50%, #93c5fd 50%)"
            : "linear-gradient(to right, transparent 50%, #1e40af 50%)",
        backgroundSize: "200% 100%",
        transition: "background-position 0.8s ease-in-out",
      }}
    >
      {children}
    </motion.span>
  );
}

// Helper function to get page info WITHOUT setting state
const getPageInfoHelper = (pathname) => {
  switch (pathname) {
    case "/":
      return { name: "home", icon: HomeIcon };
    case "/about":
      return { name: "about", icon: InfoIcon };
    case "/team":
      return { name: "team", icon: InfoIcon };
    case "/blog":
      return { name: "blog", icon: ArticleIcon };
    case "/blogs":
      return { name: "blog", icon: InfoIcon };
    case "/support":
      return { name: "support", icon: ArticleIcon };
    case "/services":
      return { name: "services", icon: BuildIcon };
    case "/dashboard":
      return { name: "dashboard", icon: DashboardIcon };
    case "/admission":
      return { name: "admission", icon: BuildIcon };
    case "/scholarship":
      return { name: "scholarship", icon: BuildIcon };
    case "/china/specialist/exam":
      return { name: "china/specialist/exam", icon: BuildIcon };
    case "/visa/application":
      return { name: "visa/application", icon: BuildIcon };
    case "/accomodation/application":
      return { name: "accomodation/application", icon: BuildIcon };
    case "/airport/services":
      return { name: "airport/services", icon: BuildIcon };
    default:
      return { name: "404", icon: ErrorIcon };
  }
};

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
        "https://jsonplaceholder.typicode.com/posts",
        {
          ip: ip.data.ip,
          page: window.location.pathname,
          route: location.pathname, // Use location.pathname directly
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
  }, [location.pathname]);

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
            : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Initial App Loading */}
        {loading ? (
          <PageLoader
            pageName={currentPageInfo.name}
            routeName={location.pathname}
            icon={currentPageInfo.icon}
          />
        ) : (
          <>
            {/* Page Transition Loading */}
            {pageLoading && (
              <PageLoader
                pageName={currentPageInfo.name}
                routeName={location.pathname}
                icon={currentPageInfo.icon}
              />
            )}

            {/* Mobile Menu Button - Only on small screens */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden"
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
            <main className="pt-16 md:pt-20">
              <ResponsiveContainer>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route
                      path="/"
                      element={
                        <PageTransition>
                          <Home />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <PageTransition>
                          <About />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/team"
                      element={
                        <PageTransition>
                          <Team />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/support"
                      element={
                        <PageTransition>
                          <FAQ />
                        </PageTransition>
                      }
                    />

                    <Route
                      path="/admission"
                      element={
                        <PageTransition>
                          <Admission />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/scholarship"
                      element={
                        <PageTransition>
                          <Scholarship />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/csca"
                      element={
                        <PageTransition>
                          <CESP />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/visa"
                      element={
                        <PageTransition>
                          <VISA />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/accomodation"
                      element={
                        <PageTransition>
                          <Accommodation />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/airport"
                      element={
                        <PageTransition>
                          <AirportServices />
                        </PageTransition>
                      }
                    />

                    <Route
                      path="/blog"
                      element={
                        <PageTransition>
                          <Blogs />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/services"
                      element={
                        <PageTransition>
                          <Services />
                        </PageTransition>
                      }
                    />

                    {/* PRIVATE ROUTE EXAMPLE */}
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <PageTransition>
                            <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
                              <ResponsiveText size="xl" weight="bold">
                                Dashboard -{" "}
                                <MarkedText>Private Area</MarkedText>
                              </ResponsiveText>
                            </div>
                          </PageTransition>
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="*"
                      element={
                        <PageTransition>
                          <NotFound />
                        </PageTransition>
                      }
                    />
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
