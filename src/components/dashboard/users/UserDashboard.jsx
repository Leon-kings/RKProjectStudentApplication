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
} from "recharts";

// Material Icons (only needed ones)
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CircleIcon from "@mui/icons-material/Circle";
import { Sidebar } from "./components/sidebar/Sidebar";

// API Configuration
const API_BASE_URL = "http://localhost:5000/api"; // Your API base URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to get cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Get user email from cookies
const getUserEmailFromCookies = () => {
  const email = getCookie('user_email') || getCookie('email') || localStorage.getItem('userEmail');
  return email || 'demo@example.com';
};

// API Service functions
const dashboardAPI = {
  // Get statistics data
  async getStatistics(timeRange = "month") {
    try {
      const userEmail = getUserEmailFromCookies();
      const response = await api.get("/dashboard/statistics", {
        params: { userEmail, timeRange }
      });
      return response.data;
    } catch (error) {
      console.error("Statistics API Error:", error);
      throw error;
    }
  },

  // Get recent activities (notifications)
  async getRecentActivities(limit = 10, timeRange = "month") {
    try {
      const userEmail = getUserEmailFromCookies();
      const response = await api.get("/dashboard/activities", {
        params: { userEmail, timeRange, limit }
      });
      return response.data;
    } catch (error) {
      console.error("Activities API Error:", error);
      throw error;
    }
  },

  // Get applications over time chart data
  async getApplicationsOverTime(timeRange = "month") {
    try {
      const userEmail = getUserEmailFromCookies();
      const response = await api.get("/dashboard/applications-over-time", {
        params: { userEmail, timeRange }
      });
      return response.data;
    } catch (error) {
      console.error("Applications Over Time API Error:", error);
      throw error;
    }
  },

  // Get visa success rate detailed data
  async getVisaSuccessDetails(timeRange = "month") {
    try {
      const userEmail = getUserEmailFromCookies();
      const response = await api.get("/dashboard/visa-success-details", {
        params: { userEmail, timeRange }
      });
      return response.data;
    } catch (error) {
      console.error("Visa Success Details API Error:", error);
      throw error;
    }
  },

  // Export data
  async exportData(format = "csv", timeRange = "month") {
    try {
      const userEmail = getUserEmailFromCookies();
      const response = await api.get("/dashboard/export", {
        params: { userEmail, format, timeRange },
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Export API Error:", error);
      throw error;
    }
  },

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error("Mark as Read API Error:", error);
      throw error;
    }
  },

  // Mark all notifications as read
  async markAllNotificationsAsRead() {
    try {
      const response = await api.put("/notifications/mark-all-read");
      return response.data;
    } catch (error) {
      console.error("Mark All as Read API Error:", error);
      throw error;
    }
  }
};

export const UserDashboard = () => {
  // State Management
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [applicationsChartData, setApplicationsChartData] = useState([]);
  const [visaSuccessDetails, setVisaSuccessDetails] = useState([]);
  
  // Statistics state - ONLY the requested statistics
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    activeApplications: 0,
    visaSuccessRate: 0,
    revenue: 0,
  });

  const [userEmail, setUserEmail] = useState('');

  // Initialize user email
  useEffect(() => {
    const email = getUserEmailFromCookies();
    setUserEmail(email);
  }, []);

  // Fetch dashboard data from API
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const userEmail = getUserEmailFromCookies();
      console.log('Fetching data for:', { userEmail, timeRange });

      // Fetch all data in parallel
      const [
        statsData,
        activitiesData,
        applicationsData,
        visaData
      ] = await Promise.allSettled([
        dashboardAPI.getStatistics(timeRange),
        dashboardAPI.getRecentActivities(10, timeRange),
        dashboardAPI.getApplicationsOverTime(timeRange),
        dashboardAPI.getVisaSuccessDetails(timeRange)
      ]);

      // Handle statistics - ONLY the requested ones
      if (statsData.status === 'fulfilled' && statsData.value) {
        const stats = statsData.value;
        setStatistics({
          totalStudents: stats.totalStudents || 0,
          activeApplications: stats.activeApplications || 0,
          visaSuccessRate: stats.visaSuccessRate || 0,
          revenue: stats.revenue || 0,
        });
      } else {
        // Fallback data if API fails
        setStatistics({
          totalStudents: 1567,
          activeApplications: 342,
          visaSuccessRate: 95.2,
          revenue: 154820,
        });
      }

      // Handle recent activities (notifications)
      if (activitiesData.status === 'fulfilled' && activitiesData.value) {
        setRecentActivity(activitiesData.value);
        setNotifications(activitiesData.value); // Use same data for notifications modal
      } else {
        const fallbackActivities = [
          {
            id: 1,
            type: "notification",
            title: "Welcome to Dashboard",
            description: `Dashboard loaded for ${timeRange} timeframe`,
            timestamp: new Date().toISOString(),
            status: "completed",
            priority: "medium",
            read: false,
          },
          {
            id: 2,
            type: "application",
            title: "New Application Submitted",
            description: "John Doe submitted application for Computer Science",
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: "pending",
            priority: "high",
            read: false,
          },
          {
            id: 3,
            type: "visa",
            title: "Visa Approved",
            description: "Sarah Johnson's study permit has been approved",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: "completed",
            priority: "medium",
            read: true,
          },
        ];
        setRecentActivity(fallbackActivities);
        setNotifications(fallbackActivities);
      }

      // Handle applications chart data
      if (applicationsData.status === 'fulfilled' && applicationsData.value) {
        setApplicationsChartData(applicationsData.value);
      }

      // Handle visa success details
      if (visaData.status === 'fulfilled' && visaData.value) {
        setVisaSuccessDetails(visaData.value);
      }

      setLoading(false);
      toast.success(`${timeRange} data loaded successfully`);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  }, [timeRange]);

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Toggle notifications modal
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await dashboardAPI.markNotificationAsRead(notificationId);
      setRecentActivity(prev =>
        prev.map(activity =>
          activity.id === notificationId ? { ...activity, read: true } : activity
        )
      );
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      toast.info("Notification marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await dashboardAPI.markAllNotificationsAsRead();
      setRecentActivity(prev => prev.map(activity => ({ ...activity, read: true })));
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      toast.info("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  // Export data
  const handleExportData = async (format) => {
    try {
      const data = await dashboardAPI.exportData(format, timeRange);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dashboard-statistics-${timeRange}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-lg`}
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              change >= 0
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {formattedValue}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {change >= 0 ? (
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <TrendingDownIcon className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span>{change >= 0 ? "Increase" : "Decrease"} from last period</span>
        </div>
      </motion.div>
    );
  };

  // Recent Activity Item Component (Notification Request)
  const ActivityItem = ({ activity }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case "completed":
        case "approved":
          return (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          );
        case "pending":
          return (
            <ScheduleIcon className="h-5 w-5 text-yellow-500" />
          );
        case "rejected":
        case "error":
          return <ErrorIcon className="h-5 w-5 text-red-500" />;
        default:
          return <CircleIcon className="h-5 w-5 text-gray-500" />;
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

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toLocaleDateString();
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-start p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 ${
          !activity.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
        }`}
      >
        <div className="mr-3 mt-1">
          {getStatusIcon(activity.status)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-base truncate">
              {activity.title}
            </h4>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                activity.priority
              )} ml-2`}
            >
              {activity.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {activity.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {formatTime(activity.timestamp)}
            </span>
            <div className="flex items-center space-x-2">
              {!activity.read && (
                <button
                  onClick={() => handleMarkAsRead(activity.id)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Mark as read
                </button>
              )}
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Visa Success Chart Component
  const VisaSuccessChart = () => {
    const data = visaSuccessDetails.length > 0 ? visaSuccessDetails : [
      { status: 'Approved', count: 95, color: '#10B981' },
      { status: 'Pending', count: 3, color: '#F59E0B' },
      { status: 'Rejected', count: 2, color: '#EF4444' },
    ];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Visa Success Rate (Confirmed Status)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Breakdown of visa application statuses
            </p>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2 sm:mt-0">
            {statistics.visaSuccessRate}%
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" strokeOpacity={0.1} />
              <XAxis dataKey="status" fontSize={12} stroke="#666" />
              <YAxis fontSize={12} stroke="#666" />
              <Tooltip />
              <Bar
                dataKey="count"
                name="Applications"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.status}: {item.count}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Applications Trend Chart
  const ApplicationsTrendChart = () => {
    const data = applicationsChartData.length > 0 ? applicationsChartData : [
      { time: 'Week 1', applications: 120, active: 45 },
      { time: 'Week 2', applications: 145, active: 52 },
      { time: 'Week 3', applications: 165, active: 65 },
      { time: 'Week 4', applications: 180, active: 72 },
    ];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Applications Trend
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Applications over time for {timeRange}
            </p>
          </div>
          <button
            onClick={() => handleExportData("csv")}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Export Data
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" strokeOpacity={0.1} />
              <XAxis
                dataKey="time"
                fontSize={12}
                stroke="#666"
              />
              <YAxis fontSize={12} stroke="#666" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="applications"
                name="Total Applications"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="active"
                name="Active Applications"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
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
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
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
                      <ActivityItem key={notification.id} activity={notification} />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar onToggleNotifications={toggleNotificationsModal} />

      {/* Main Content */}
      <div className="w-full flex">
        <div className="p-4 sm:p-6 w-full">
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
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  REC APPLY Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Showing statistics for{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {timeRange}
                  </span>{" "}
                  timeframe
                </p>
                {userEmail && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    User: {userEmail}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {["week", "month", "quarter", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => handleTimeRangeChange(range)}
                      className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-all ${
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
                    onClick={handleRefresh}
                    disabled={loading}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshIcon className="h-5 w-5" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={toggleNotificationsModal}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
                      title="Notifications"
                    >
                      <NotificationsIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
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
              {/* Key Statistics - ONLY the requested ones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                <StatisticCard
                  title="Total Students"
                  value={statistics.totalStudents}
                  change={15.5}
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
              >
                <ApplicationsTrendChart />
                <VisaSuccessChart />
              </motion.div>

              {/* Recent Activity (Notifications) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Recent Activity & Notifications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Latest updates and notification requests
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {recentActivity.filter(a => !a.read).length > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      View All
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No recent activities
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Export API functions
export { dashboardAPI };