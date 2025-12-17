/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// Material Icons
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SpeedIcon from "@mui/icons-material/Speed";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import GavelIcon from "@mui/icons-material/Gavel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import TableChartIcon from "@mui/icons-material/TableChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import PrintIcon from "@mui/icons-material/Print";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import { Sidebar } from "./components/sidebars/Sidebar";

// API Configuration
const API_BASE_URL = "https://your-api-server.com/api";
const API_TOKEN = "your-api-token";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Time-based data configurations
const TIME_DATA_CONFIG = {
  day: {
    statistics: {
      totalStudents: 1480,
      activeApplications: 210,
      completedAdmissions: 45,
      visaSuccessRate: 94.5,
      accommodationBookings: 18,
      airportServices: 12,
      revenue: 15420,
      growthRate: 8.5,
    },
    charts: {
      applicationsOverTime: [
        { time: "00:00", applications: 5, approvals: 4, pending: 1 },
        { time: "04:00", applications: 8, approvals: 7, pending: 1 },
        { time: "08:00", applications: 25, approvals: 22, pending: 3 },
        { time: "12:00", applications: 42, approvals: 38, pending: 4 },
        { time: "16:00", applications: 65, approvals: 58, pending: 7 },
        { time: "20:00", applications: 45, approvals: 40, pending: 5 },
      ],
      serviceDistribution: [
        { name: "University Admissions", value: 32, color: "#0088FE" },
        { name: "Visa Services", value: 28, color: "#00C49F" },
        { name: "Accommodation", value: 22, color: "#FFBB28" },
        { name: "Airport Services", value: 18, color: "#FF8042" },
      ],
      revenueByService: [
        { service: "Admissions", revenue: 6542, growth: 8 },
        { service: "Visa", revenue: 4231, growth: 10 },
        { service: "Accommodation", revenue: 2856, growth: 15 },
        { service: "Airport", revenue: 1853, growth: 12 },
      ],
    },
    performanceMetrics: {
      applicationSuccessRate: 91.2,
      visaApprovalRate: 94.5,
      serviceSatisfaction: 95.8,
      responseTime: 1.8,
      processingTime: 12.5,
      studentRetention: 97.8,
    },
  },
  week: {
    statistics: {
      totalStudents: 1520,
      activeApplications: 280,
      completedAdmissions: 120,
      visaSuccessRate: 95.0,
      accommodationBookings: 45,
      airportServices: 32,
      revenue: 45280,
      growthRate: 12.3,
    },
    charts: {
      applicationsOverTime: [
        { day: "Mon", applications: 45, approvals: 40, pending: 5 },
        { day: "Tue", applications: 52, approvals: 48, pending: 4 },
        { day: "Wed", applications: 58, approvals: 54, pending: 4 },
        { day: "Thu", applications: 65, approvals: 60, pending: 5 },
        { day: "Fri", applications: 48, approvals: 44, pending: 4 },
        { day: "Sat", applications: 32, approvals: 29, pending: 3 },
        { day: "Sun", applications: 25, approvals: 22, pending: 3 },
      ],
      serviceDistribution: [
        { name: "University Admissions", value: 34, color: "#0088FE" },
        { name: "Visa Services", value: 26, color: "#00C49F" },
        { name: "Accommodation", value: 21, color: "#FFBB28" },
        { name: "Airport Services", value: 19, color: "#FF8042" },
      ],
      revenueByService: [
        { service: "Admissions", revenue: 16542, growth: 12 },
        { service: "Visa", revenue: 10423, growth: 11 },
        { service: "Accommodation", revenue: 9586, growth: 18 },
        { service: "Airport", revenue: 8729, growth: 14 },
      ],
    },
    performanceMetrics: {
      applicationSuccessRate: 92.8,
      visaApprovalRate: 95.0,
      serviceSatisfaction: 96.2,
      responseTime: 2.1,
      processingTime: 13.8,
      studentRetention: 98.0,
    },
  },
  month: {
    statistics: {
      totalStudents: 1567,
      activeApplications: 342,
      completedAdmissions: 489,
      visaSuccessRate: 95.2,
      accommodationBookings: 123,
      airportServices: 89,
      revenue: 154820,
      growthRate: 15.5,
    },
    charts: {
      applicationsOverTime: [
        { week: "Week 1", applications: 120, approvals: 112, pending: 8 },
        { week: "Week 2", applications: 145, approvals: 136, pending: 9 },
        { week: "Week 3", applications: 165, approvals: 154, pending: 11 },
        { week: "Week 4", applications: 180, approvals: 168, pending: 12 },
      ],
      serviceDistribution: [
        { name: "University Admissions", value: 35, color: "#0088FE" },
        { name: "Visa Services", value: 25, color: "#00C49F" },
        { name: "Accommodation", value: 20, color: "#FFBB28" },
        { name: "Airport Services", value: 15, color: "#FF8042" },
        { name: "CSCA Preparation", value: 5, color: "#8884D8" },
      ],
      revenueByService: [
        { service: "Admissions", revenue: 65420, growth: 15 },
        { service: "Visa", revenue: 42310, growth: 12 },
        { service: "Accommodation", revenue: 28560, growth: 22 },
        { service: "Airport", revenue: 18530, growth: 18 },
      ],
    },
    performanceMetrics: {
      applicationSuccessRate: 92.5,
      visaApprovalRate: 95.2,
      serviceSatisfaction: 96.8,
      responseTime: 2.4,
      processingTime: 14.2,
      studentRetention: 98.1,
    },
  },
  quarter: {
    statistics: {
      totalStudents: 1750,
      activeApplications: 420,
      completedAdmissions: 680,
      visaSuccessRate: 95.8,
      accommodationBookings: 210,
      airportServices: 145,
      revenue: 385420,
      growthRate: 18.2,
    },
    charts: {
      applicationsOverTime: [
        { month: "Jan", applications: 420, approvals: 395, pending: 25 },
        { month: "Feb", applications: 480, approvals: 450, pending: 30 },
        { month: "Mar", applications: 520, approvals: 488, pending: 32 },
      ],
      serviceDistribution: [
        { name: "University Admissions", value: 36, color: "#0088FE" },
        { name: "Visa Services", value: 24, color: "#00C49F" },
        { name: "Accommodation", value: 22, color: "#FFBB28" },
        { name: "Airport Services", value: 18, color: "#FF8042" },
      ],
      revenueByService: [
        { service: "Admissions", revenue: 165420, growth: 18 },
        { service: "Visa", revenue: 102310, growth: 15 },
        { service: "Accommodation", revenue: 78560, growth: 25 },
        { service: "Airport", revenue: 39130, growth: 20 },
      ],
    },
    performanceMetrics: {
      applicationSuccessRate: 93.2,
      visaApprovalRate: 95.8,
      serviceSatisfaction: 97.2,
      responseTime: 2.2,
      processingTime: 13.5,
      studentRetention: 98.5,
    },
  },
  year: {
    statistics: {
      totalStudents: 2150,
      activeApplications: 580,
      completedAdmissions: 980,
      visaSuccessRate: 96.2,
      accommodationBookings: 320,
      airportServices: 210,
      revenue: 1258420,
      growthRate: 22.5,
    },
    charts: {
      applicationsOverTime: [
        { month: "Jan", applications: 65, approvals: 58, pending: 7 },
        { month: "Feb", applications: 78, approvals: 72, pending: 6 },
        { month: "Mar", applications: 92, approvals: 86, pending: 6 },
        { month: "Apr", applications: 84, approvals: 78, pending: 6 },
        { month: "May", applications: 95, approvals: 89, pending: 6 },
        { month: "Jun", applications: 112, approvals: 105, pending: 7 },
        { month: "Jul", applications: 128, approvals: 120, pending: 8 },
        { month: "Aug", applications: 145, approvals: 136, pending: 9 },
        { month: "Sep", applications: 132, approvals: 124, pending: 8 },
        { month: "Oct", applications: 118, approvals: 110, pending: 8 },
        { month: "Nov", applications: 105, approvals: 98, pending: 7 },
        { month: "Dec", applications: 88, approvals: 82, pending: 6 },
      ],
      serviceDistribution: [
        { name: "University Admissions", value: 38, color: "#0088FE" },
        { name: "Visa Services", value: 23, color: "#00C49F" },
        { name: "Accommodation", value: 21, color: "#FFBB28" },
        { name: "Airport Services", value: 18, color: "#FF8042" },
      ],
      revenueByService: [
        { service: "Admissions", revenue: 654200, growth: 22 },
        { service: "Visa", revenue: 323100, growth: 18 },
        { service: "Accommodation", revenue: 185600, growth: 28 },
        { service: "Airport", revenue: 95520, growth: 25 },
      ],
    },
    performanceMetrics: {
      applicationSuccessRate: 94.5,
      visaApprovalRate: 96.2,
      serviceSatisfaction: 97.8,
      responseTime: 1.9,
      processingTime: 12.8,
      studentRetention: 99.1,
    },
  },
};

export const Dashboard = () => {
  // State Management
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeRange, setTimeRange] = useState("month");
  const [activeView, setActiveView] = useState("overview");
  const [recentActivity, setRecentActivity] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    activeApplications: 0,
    completedAdmissions: 0,
    visaSuccessRate: 0,
    accommodationBookings: 0,
    airportServices: 0,
    revenue: 0,
    growthRate: 0,
  });

  // Student demographics (constant across time ranges)
  const studentDemographics = [
    { age: "18-20", count: 420, percentage: 27 },
    { age: "21-23", count: 580, percentage: 37 },
    { age: "24-26", count: 320, percentage: 20 },
    { age: "27-30", count: 180, percentage: 11 },
    { age: "30+", count: 67, percentage: 5 },
  ];

  // Top countries (constant across time ranges)
  const sampleTopCountries = [
    { name: "Canada", students: 420, growth: 15, applications: 156 },
    { name: "China", students: 380, growth: 12, applications: 142 },
    { name: "Germany", students: 295, growth: 18, applications: 110 },
    { name: "USA", students: 210, growth: 8, applications: 95 },
    { name: "Australia", students: 180, growth: 22, applications: 78 },
    { name: "UK", students: 165, growth: 10, applications: 72 },
    { name: "Japan", students: 120, growth: 25, applications: 58 },
  ];

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      title: "New Application Submitted",
      message:
        "John Doe has submitted an application for Computer Science at University of Toronto",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: "application",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Visa Approved",
      message: "Sarah Johnson's Canadian study permit has been approved",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: "success",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Service fee payment of $2,500 received from Michael Chen",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      type: "payment",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      title: "Consultation Scheduled",
      message: "New consultation booked for tomorrow at 2:00 PM with David Kim",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: "schedule",
      read: true,
      priority: "medium",
    },
    {
      id: 5,
      title: "System Maintenance",
      message:
        "Scheduled maintenance will occur this Sunday from 2:00 AM to 4:00 AM",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: "system",
      read: true,
      priority: "low",
    },
  ];

  // Chart colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];
  const STATUS_COLORS = {
    pending: "#FFB74D",
    approved: "#4CAF50",
    rejected: "#F44336",
    in_review: "#2196F3",
    completed: "#9C27B0",
  };

  // Fetch all dashboard data based on time range
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Use time-based data configuration
      const timeData = TIME_DATA_CONFIG[timeRange] || TIME_DATA_CONFIG.month;

      // Set statistics
      setStatistics(timeData.statistics);

      // Set performance metrics
      setPerformanceMetrics(timeData.performanceMetrics);

      // Set charts data with student demographics
      setDashboardData({
        ...timeData.charts,
        studentDemographics: studentDemographics,
      });

      // Set recent activity
      setRecentActivity([
        {
          id: 1,
          type: "application",
          title: `New ${timeRange} Data Loaded`,
          description: `Showing ${timeRange}ly statistics and metrics`,
          timestamp: new Date().toISOString(),
          status: "completed",
          priority: "medium",
        },
        {
          id: 2,
          type: "update",
          title: "Data Updated",
          description: `Dashboard refreshed with ${timeRange} data`,
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          status: "completed",
          priority: "low",
        },
      ]);

      // Set top countries (constant)
      setTopCountries(sampleTopCountries);

      // Set notifications
      setNotifications(sampleNotifications);

      setLoading(false);
      toast.success(
        `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} data loaded`
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      loadSampleData();
      setLoading(false);
    }
  }, [timeRange]);

  // Load sample data as fallback
  const loadSampleData = () => {
    const sampleData = TIME_DATA_CONFIG.month;
    setStatistics(sampleData.statistics);
    setRecentActivity([]);
    setTopCountries(sampleTopCountries);
    setPerformanceMetrics(sampleData.performanceMetrics);
    setDashboardData({
      ...sampleData.charts,
      studentDemographics: studentDemographics,
    });
    setNotifications(sampleNotifications);
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    fetchDashboardData();
  };

  // Toggle notifications modal
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Mark notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    toast.info("Notification marked as read");
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    toast.info("All notifications marked as read");
  };

  // Export data
  const handleExportData = async (format) => {
    try {
      toast.success(`Data exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  // Statistic Card Component
  const StatisticCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    format = "number",
  }) => {
    const formattedValue =
      format === "currency"
        ? `$${value.toLocaleString()}`
        : format === "percentage"
        ? `${value}%`
        : value.toLocaleString();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border-l-4"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-2 sm:p-3 rounded-lg`}
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color }} />
          </div>
          <div
            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
              change >= 0
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </div>
        </div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {formattedValue}
        </p>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {change >= 0 ? (
            <TrendingUpIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
          )}
          <span>{change >= 0 ? "Increase" : "Decrease"} from last period</span>
        </div>
      </motion.div>
    );
  };

  // Recent Activity Item Component
  const ActivityItem = ({ activity }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case "approved":
        case "completed":
          return (
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          );
        case "pending":
          return (
            <ScheduleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          );
        case "rejected":
          return <ErrorIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />;
        default:
          return <CircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
        case "medium":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
        case "low":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="mr-2 sm:mr-3 mt-1">
          {getStatusIcon(activity.status)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 flex-wrap">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {activity.title}
            </h4>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                activity.priority
              )} mt-1 sm:mt-0`}
            >
              {activity.priority}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
            {activity.description}
          </p>
          <div className="flex items-center justify-between flex-wrap">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {new Date(activity.timestamp).toLocaleDateString()}{" "}
              {new Date(activity.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-1 sm:mt-0">
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Country Performance Component
  const CountryPerformance = ({ country }) => {
    return (
      <div className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
        <div className="flex items-center min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <span className="font-bold text-blue-600 dark:text-blue-300 text-sm">
              {country.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {country.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
              {country.students} students
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {country.applications}
          </div>
          <div
            className={`text-xs sm:text-sm ${
              country.growth >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {country.growth >= 0 ? "+" : ""}
            {country.growth}%
          </div>
        </div>
      </div>
    );
  };

  // Performance Metric Card
  const MetricCard = ({ title, value, unit, target, icon: Icon, color }) => {
    const percentage = target ? (value / target) * 100 : 100;
    const isAboveTarget = target && value > target;

    return (
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-1 sm:p-2 rounded-lg`}
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
          </div>
          <div
            className={`text-xs sm:text-sm font-semibold ${
              isAboveTarget
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isAboveTarget ? "Above" : "Below"} Target
          </div>
        </div>
        <h4 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
          {title}
        </h4>
        <div className="flex items-baseline mb-2">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </span>
          {unit && (
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1">
              {unit}
            </span>
          )}
        </div>
        {target && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
              <div
                className="rounded-full h-1.5 sm:h-2"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: color,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Notification Item Component
  const NotificationItem = ({ notification }) => {
    const getNotificationIcon = (type) => {
      switch (type) {
        case "application":
          return <DescriptionIcon className="h-5 w-5 text-blue-500" />;
        case "success":
        case "payment":
          return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
        case "schedule":
          return <CalendarMonthIcon className="h-5 w-5 text-purple-500" />;
        case "system":
          return <WarningIcon className="h-5 w-5 text-yellow-500" />;
        default:
          return <NotificationsIcon className="h-5 w-5 text-gray-500" />;
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "high":
          return "bg-red-500";
        case "medium":
          return "bg-yellow-500";
        case "low":
          return "bg-green-500";
        default:
          return "bg-gray-500";
      }
    };

    const timeAgo = (timestamp) => {
      const now = new Date();
      const past = new Date(timestamp);
      const diffInMinutes = Math.floor((now - past) / (1000 * 60));

      if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)}h ago`;
      } else {
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
      }
    };

    return (
      <div
        className={`p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
          !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
        }`}
      >
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {notification.title}
                </h4>
                {!notification.read && (
                  <div
                    className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(
                      notification.priority
                    )}`}
                  ></div>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                {timeAgo(notification.timestamp)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {notification.type}
              </span>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notifications Modal Component
  const NotificationsModal = () => {
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
      <AnimatePresence>
        {showNotificationsModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleNotificationsModal}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {unreadCount} unread{" "}
                      {unreadCount === 1 ? "message" : "messages"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={toggleNotificationsModal}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <CloseIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <NotificationsIcon className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No notifications
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        You're all caught up!
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                    View All Notifications
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
          >
            <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3 sm:mb-4"></div>
            <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 sm:mb-6"></div>
          <div className="h-48 sm:h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 sm:mb-6"></div>
          <div className="h-48 sm:h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar onToggleNotifications={toggleNotificationsModal} />

      {/* Main Content - SIMPLIFIED */}
      <div className="w-full flex">
        <div className="p-4 sm:p-4">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />

          {/* Notifications Modal */}
          <NotificationsModal />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  REC APPLY
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                  International Education Division
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                  Showing data for{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {timeRange}
                  </span>{" "}
                  timeframe
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 overflow-x-auto">
                  {["day", "week", "month", "quarter", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => handleTimeRangeChange(range)}
                      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-all ${
                        timeRange === range
                          ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchDashboardData}
                    disabled={loading}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={toggleNotificationsModal}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
                      title="Notifications"
                    >
                      <NotificationsIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                      {notifications.filter((n) => !n.read).length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {notifications.filter((n) => !n.read).length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Key Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
              >
                <StatisticCard
                  title="Total Students"
                  value={statistics.totalStudents}
                  change={statistics.growthRate}
                  icon={PeopleIcon}
                  color="#3B82F6"
                />
                <StatisticCard
                  title="Active Applications"
                  value={statistics.activeApplications}
                  change={8.2}
                  icon={DescriptionIcon}
                  color="#10B981"
                />
                <StatisticCard
                  title="Visa Success Rate"
                  value={statistics.visaSuccessRate}
                  change={2.3}
                  icon={VerifiedIcon}
                  color="#8B5CF6"
                  format="percentage"
                />
                <StatisticCard
                  title="Revenue"
                  value={statistics.revenue}
                  change={18.7}
                  icon={AttachMoneyIcon}
                  color="#F59E0B"
                  format="currency"
                />
              </motion.div>

              {/* Charts Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
              >
                {/* Applications Over Time Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Applications Over Time
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {timeRange === "day"
                          ? "Hourly applications"
                          : timeRange === "week"
                          ? "Daily applications this week"
                          : timeRange === "month"
                          ? "Weekly applications this month"
                          : timeRange === "quarter"
                          ? "Monthly applications this quarter"
                          : "Monthly applications this year"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleExportData("csv")}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
                    >
                      Export CSV
                    </button>
                  </div>
                  <div className="h-48 sm:h-64 md:h-72 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dashboardData?.applicationsOverTime || []}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                          strokeOpacity={0.1}
                        />
                        <XAxis
                          dataKey={
                            timeRange === "day"
                              ? "time"
                              : timeRange === "week"
                              ? "day"
                              : timeRange === "month"
                              ? "week"
                              : "month"
                          }
                          fontSize={12}
                          stroke="#666"
                        />
                        <YAxis fontSize={12} stroke="#666" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderColor: "#e5e7eb",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Area
                          type="monotone"
                          dataKey="applications"
                          name="Applications"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="approvals"
                          name="Approvals"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Service Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Service Distribution
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Service usage for {timeRange}
                      </p>
                    </div>
                    <button
                      onClick={() => handleExportData("pdf")}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
                    >
                      Export PDF
                    </button>
                  </div>
                  <div className="h-48 sm:h-64 md:h-72 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dashboardData?.serviceDistribution || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ percent }) =>
                            `${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={60}
                          innerRadius={30}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {dashboardData?.serviceDistribution?.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.color || COLORS[index % COLORS.length]
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value, name, props) => [
                            `${props.payload.name}: ${value}%`,
                            "Percentage",
                          ]}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "12px" }}
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Performance Metrics
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Updated for {timeRange} timeframe
                  </p>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                  <MetricCard
                    title="Success Rate"
                    value={performanceMetrics.applicationSuccessRate || 0}
                    unit="%"
                    target={90}
                    icon={TrendingUpIcon}
                    color="#10B981"
                  />
                  <MetricCard
                    title="Visa Approval"
                    value={performanceMetrics.visaApprovalRate || 0}
                    unit="%"
                    target={92}
                    icon={VerifiedIcon}
                    color="#8B5CF6"
                  />
                  <MetricCard
                    title="Satisfaction"
                    value={performanceMetrics.serviceSatisfaction || 0}
                    unit="%"
                    target={95}
                    icon={EmojiEventsIcon}
                    color="#F59E0B"
                  />
                  <MetricCard
                    title="Response Time"
                    value={performanceMetrics.responseTime || 0}
                    unit="hours"
                    target={4}
                    icon={SpeedIcon}
                    color="#3B82F6"
                  />
                  <MetricCard
                    title="Processing Time"
                    value={performanceMetrics.processingTime || 0}
                    unit="days"
                    target={15}
                    icon={ScheduleIcon}
                    color="#EF4444"
                  />
                  <MetricCard
                    title="Retention"
                    value={performanceMetrics.studentRetention || 0}
                    unit="%"
                    target={97}
                    icon={GroupsIcon}
                    color="#8B5CF6"
                  />
                </div>
              </motion.div>

              {/* Recent Activity and Top Countries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
              >
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Recent Activity
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Latest updates for {timeRange}
                      </p>
                    </div>
                    <button className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap">
                      View All Activity
                    </button>
                  </div>
                  <div className="max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-96 overflow-y-auto">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        No recent activities for {timeRange}
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Countries */}
                <div className="bg-white overflow-y-auto dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Top Countries
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Student origins
                      </p>
                    </div>
                    <button
                      onClick={() => handleExportData("json")}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
                    >
                      Export JSON
                    </button>
                  </div>
                  <div className="overflow-y-auto h-72">
                    <div className="space-y-1 sm:space-y-2">
                      {topCountries.slice(0, 7).map((country, index) => (
                        <CountryPerformance
                          key={country.name}
                          country={country}
                        />
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Applications
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {topCountries
                            .reduce(
                              (sum, country) =>
                                sum + (country.applications || 0),
                              0
                            )
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm mt-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Students
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {topCountries
                            .reduce(
                              (sum, country) => sum + (country.students || 0),
                              0
                            )
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Charts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
              >
                {/* Revenue by Service */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Revenue by Service
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {timeRange === "day"
                          ? "Today's revenue"
                          : timeRange === "week"
                          ? "Weekly revenue"
                          : timeRange === "month"
                          ? "Monthly revenue"
                          : timeRange === "quarter"
                          ? "Quarterly revenue"
                          : "Annual revenue"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleExportData("csv")}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
                    >
                      Export Data
                    </button>
                  </div>
                  <div className="h-48 sm:h-64 md:h-72 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dashboardData?.revenueByService || []}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                          strokeOpacity={0.1}
                        />
                        <XAxis
                          dataKey="service"
                          fontSize={12}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          stroke="#666"
                        />
                        <YAxis fontSize={12} stroke="#666" />
                        <Tooltip
                          formatter={(value, name) => {
                            if (name === "revenue")
                              return [`$${value.toLocaleString()}`, "Revenue"];
                            if (name === "growth")
                              return [`${value}%`, "Growth"];
                            return [value, name];
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Bar
                          dataKey="revenue"
                          name="Revenue ($)"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="growth"
                          name="Growth %"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Student Demographics */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Student Demographics
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Age distribution of students
                      </p>
                    </div>
                    <button
                      onClick={() => handleExportData("pdf")}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
                    >
                      Export Report
                    </button>
                  </div>
                  <div className="h-48 sm:h-64 md:h-72 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={dashboardData?.studentDemographics || []}
                      >
                        <PolarGrid />
                        <PolarAngleAxis
                          dataKey="age"
                          fontSize={12}
                          stroke="#666"
                        />
                        <PolarRadiusAxis fontSize={10} stroke="#666" />
                        <Radar
                          name="Students"
                          dataKey="count"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.6}
                          strokeWidth={2}
                        />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white"
              >
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="mb-4 lg:mb-0 text-center lg:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                      Need More Insights?
                    </h3>
                    <p className="opacity-90 text-sm sm:text-base">
                      Download {timeRange} reports or schedule a consultation
                    </p>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full xs:w-auto">
                    <button
                      onClick={() => handleExportData("pdf")}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base"
                    >
                      <DownloadForOfflineIcon className="h-4 w-4 sm:h-5 sm:w-5 inline mr-1 sm:mr-2" />
                      Download {timeRange} Report
                    </button>
                    <button
                      onClick={() =>
                        toast.success(
                          "Consultation scheduled! Our team will contact you."
                        )
                      }
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white text-white font-bold rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base"
                    >
                      <CalendarMonthIcon className="h-4 w-4 sm:h-5 sm:w-5 inline mr-1 sm:mr-2" />
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Export Dashboard Data API Functions
export const dashboardAPI = {
  async getDashboardData(timeRange = "month") {
    try {
      const response = await api.get("/dashboard", {
        params: { timeRange },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async getStatistics(timeRange = "month") {
    const response = await api.get("/dashboard/statistics", {
      params: { timeRange },
    });
    return response.data;
  },

  async getRecentActivities(limit = 10, timeRange = "month") {
    const response = await api.get("/dashboard/activities", {
      params: { limit, timeRange },
    });
    return response.data;
  },

  async getTopCountries(limit = 10) {
    const response = await api.get("/dashboard/top-countries", {
      params: { limit },
    });
    return response.data;
  },

  async getPerformanceMetrics(timeRange = "month") {
    const response = await api.get("/dashboard/metrics", {
      params: { timeRange },
    });
    return response.data;
  },

  async getChartData(chartType, timeRange = "month") {
    const response = await api.get(`/dashboard/charts/${chartType}`, {
      params: { timeRange },
    });
    return response.data;
  },

  async exportData(format = "csv", timeRange = "month") {
    const response = await api.get("/dashboard/export", {
      params: { format, timeRange },
      responseType: "blob",
    });
    return response.data;
  },

  async markNotificationAsRead(notificationId) {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
};
