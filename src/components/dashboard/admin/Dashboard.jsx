/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Material Icons
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GavelIcon from '@mui/icons-material/Gavel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import TableChartIcon from '@mui/icons-material/TableChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PrintIcon from '@mui/icons-material/Print';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api';
const API_TOKEN = 'your-api-token'; // In production, use environment variables

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const Dashboard = () => {
  // State Management
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // day, week, month, quarter, year
  const [activeView, setActiveView] = useState('overview'); // overview, applications, admissions, services
  const [recentActivity, setRecentActivity] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    activeApplications: 0,
    completedAdmissions: 0,
    visaSuccessRate: 0,
    accommodationBookings: 0,
    airportServices: 0,
    revenue: 0,
    growthRate: 0
  });

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const STATUS_COLORS = {
    pending: '#FFB74D',
    approved: '#4CAF50',
    rejected: '#F44336',
    in_review: '#2196F3',
    completed: '#9C27B0'
  };

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [
        statsResponse,
        activitiesResponse,
        countriesResponse,
        metricsResponse,
        notificationsResponse,
        chartsResponse
      ] = await Promise.allSettled([
        api.get('/dashboard/statistics'),
        api.get('/dashboard/recent-activities'),
        api.get('/dashboard/top-countries'),
        api.get('/dashboard/performance-metrics'),
        api.get('/dashboard/notifications'),
        api.get('/dashboard/charts')
      ]);

      // Handle statistics
      if (statsResponse.status === 'fulfilled') {
        setStatistics(statsResponse.value.data);
      } else {
        toast.error('Failed to load statistics');
        console.error('Statistics error:', statsResponse.reason);
      }

      // Handle recent activities
      if (activitiesResponse.status === 'fulfilled') {
        setRecentActivity(activitiesResponse.value.data);
      }

      // Handle top countries
      if (countriesResponse.status === 'fulfilled') {
        setTopCountries(countriesResponse.value.data);
      }

      // Handle performance metrics
      if (metricsResponse.status === 'fulfilled') {
        setPerformanceMetrics(metricsResponse.value.data);
      }

      // Handle notifications
      if (notificationsResponse.status === 'fulfilled') {
        setNotifications(notificationsResponse.value.data);
      }

      // Handle charts data
      if (chartsResponse.status === 'fulfilled') {
        setDashboardData(chartsResponse.value.data);
      }

      setLoading(false);
      toast.success('Dashboard data updated');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
      
      // Load sample data as fallback
      loadSampleData();
    }
  }, [timeRange]);

  // Load sample data when API fails
  const loadSampleData = () => {
    const sampleData = {
      statistics: {
        totalStudents: 1567,
        activeApplications: 342,
        completedAdmissions: 489,
        visaSuccessRate: 95.2,
        accommodationBookings: 123,
        airportServices: 89,
        revenue: 154820,
        growthRate: 12.5
      },
      recentActivity: [
        {
          id: 1,
          type: 'application',
          title: 'New Student Application',
          description: 'John Doe applied for Computer Science at University of Toronto',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 2,
          type: 'visa',
          title: 'Visa Approved',
          description: 'Sarah Johnson\'s Canadian study permit approved',
          timestamp: '2024-01-14T14:20:00Z',
          status: 'approved',
          priority: 'medium'
        },
        {
          id: 3,
          type: 'accommodation',
          title: 'Accommodation Booked',
          description: 'Michael Chen booked accommodation in Beijing',
          timestamp: '2024-01-14T09:15:00Z',
          status: 'completed',
          priority: 'low'
        },
        {
          id: 4,
          type: 'payment',
          title: 'Payment Received',
          description: 'Service fee payment received from David Kim',
          timestamp: '2024-01-13T16:45:00Z',
          status: 'completed',
          priority: 'medium'
        },
        {
          id: 5,
          type: 'consultation',
          title: 'Consultation Scheduled',
          description: 'New consultation booked for Friday, 2:00 PM',
          timestamp: '2024-01-13T11:10:00Z',
          status: 'pending',
          priority: 'high'
        }
      ],
      topCountries: [
        { name: 'Canada', students: 420, growth: 15, applications: 156 },
        { name: 'China', students: 380, growth: 12, applications: 142 },
        { name: 'Germany', students: 295, growth: 18, applications: 110 },
        { name: 'USA', students: 210, growth: 8, applications: 95 },
        { name: 'Australia', students: 180, growth: 22, applications: 78 },
        { name: 'UK', students: 165, growth: 10, applications: 72 },
        { name: 'Japan', students: 120, growth: 25, applications: 58 }
      ],
      performanceMetrics: {
        applicationSuccessRate: 92.5,
        visaApprovalRate: 95.2,
        serviceSatisfaction: 96.8,
        responseTime: 2.4, // hours
        processingTime: 14.2, // days
        studentRetention: 98.1
      },
      charts: {
        applicationsOverTime: [
          { month: 'Jan', applications: 65, approvals: 58, pending: 7 },
          { month: 'Feb', applications: 78, approvals: 72, pending: 6 },
          { month: 'Mar', applications: 92, approvals: 86, pending: 6 },
          { month: 'Apr', applications: 84, approvals: 78, pending: 6 },
          { month: 'May', applications: 95, approvals: 89, pending: 6 },
          { month: 'Jun', applications: 112, approvals: 105, pending: 7 },
          { month: 'Jul', applications: 128, approvals: 120, pending: 8 },
          { month: 'Aug', applications: 145, approvals: 136, pending: 9 },
          { month: 'Sep', applications: 132, approvals: 124, pending: 8 },
          { month: 'Oct', applications: 118, approvals: 110, pending: 8 },
          { month: 'Nov', applications: 105, approvals: 98, pending: 7 },
          { month: 'Dec', applications: 88, approvals: 82, pending: 6 }
        ],
        serviceDistribution: [
          { name: 'University Admissions', value: 35, color: '#0088FE' },
          { name: 'Visa Services', value: 25, color: '#00C49F' },
          { name: 'Accommodation', value: 20, color: '#FFBB28' },
          { name: 'Airport Services', value: 15, color: '#FF8042' },
          { name: 'CSCA Preparation', value: 5, color: '#8884D8' }
        ],
        revenueByService: [
          { service: 'Admissions', revenue: 65420, growth: 15 },
          { service: 'Visa', revenue: 42310, growth: 12 },
          { service: 'Accommodation', revenue: 28560, growth: 22 },
          { service: 'Airport', revenue: 18530, growth: 18 }
        ],
        studentDemographics: [
          { age: '18-20', count: 420, percentage: 27 },
          { age: '21-23', count: 580, percentage: 37 },
          { age: '24-26', count: 320, percentage: 20 },
          { age: '27-30', count: 180, percentage: 11 },
          { age: '30+', count: 67, percentage: 5 }
        ]
      }
    };

    setStatistics(sampleData.statistics);
    setRecentActivity(sampleData.recentActivity);
    setTopCountries(sampleData.topCountries);
    setPerformanceMetrics(sampleData.performanceMetrics);
    setDashboardData(sampleData.charts);
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchDashboardData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchDashboardData]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, you would refetch data with the new time range
    toast.info(`Showing data for ${range}`);
  };

  // Export data
  const handleExportData = async (format) => {
    try {
      const response = await api.get('/dashboard/export', {
        params: { format, timeRange },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `recapply-dashboard-${timeRange}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success(`Data exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    }
  };

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/dashboard/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Statistic Card Component
  const StatisticCard = ({ title, value, change, icon: Icon, color, format = 'number' }) => {
    const formattedValue = format === 'currency' 
      ? `$${value.toLocaleString()}`
      : format === 'percentage'
      ? `${value}%`
      : value.toLocaleString();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border-l-4"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{formattedValue}</p>
        <div className="flex items-center text-sm text-gray-500">
          {change >= 0 ? (
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span>{change >= 0 ? 'Increase' : 'Decrease'} from last period</span>
        </div>
      </motion.div>
    );
  };

  // Recent Activity Item Component
  const ActivityItem = ({ activity }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case 'approved':
        case 'completed':
          return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
        case 'pending':
          return <ScheduleIcon className="h-5 w-5 text-yellow-500" />;
        case 'rejected':
          return <ErrorIcon className="h-5 w-5 text-red-500" />;
        default:
          return <CircleIcon className="h-5 w-5 text-gray-500" />;
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'bg-red-100 text-red-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50"
      >
        <div className="mr-3 mt-1">
          {getStatusIcon(activity.status)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900">{activity.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
              {activity.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
            <button className="text-xs text-blue-600 hover:text-blue-800">
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
      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="font-bold text-blue-600">{country.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{country.name}</h4>
            <p className="text-sm text-gray-600">{country.students} students</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-gray-900">{country.applications} apps</div>
          <div className={`text-sm ${country.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {country.growth >= 0 ? '+' : ''}{country.growth}%
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
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className={`text-sm font-semibold ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
            {isAboveTarget ? 'Above' : 'Below'} Target
          </div>
        </div>
        <h4 className="text-sm font-medium text-gray-600 mb-1">{title}</h4>
        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        {target && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="rounded-full h-2"
                style={{ 
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: color
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RECAPPLY Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time insights and performance metrics</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['day', 'week', 'month', 'quarter', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${
                    timeRange === range
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshIcon className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <NotificationsIcon className="h-6 w-6 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: DashboardIcon },
              { id: 'applications', label: 'Applications', icon: DescriptionIcon },
              { id: 'admissions', label: 'Admissions', icon: SchoolIcon },
              { id: 'visa', label: 'Visa Services', icon: VerifiedIcon },
              { id: 'accommodation', label: 'Accommodation', icon: HomeIcon },
              { id: 'airport', label: 'Airport Services', icon: FlightTakeoffIcon },
              { id: 'revenue', label: 'Revenue', icon: AttachMoneyIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <StatisticCard
                title="Total Students"
                value={statistics.totalStudents}
                change={12.5}
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            >
              {/* Applications Over Time Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Applications Over Time</h3>
                  <button 
                    onClick={() => handleExportData('csv')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Export
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dashboardData?.applicationsOverTime || []}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="applications" 
                        name="Applications" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="approvals" 
                        name="Approvals" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Distribution Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Service Distribution</h3>
                  <button 
                    onClick={() => handleExportData('pdf')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Export PDF
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData?.serviceDistribution || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dashboardData?.serviceDistribution?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
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
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="Success Rate"
                  value={performanceMetrics.applicationSuccessRate}
                  unit="%"
                  target={90}
                  icon={TrendingUpIcon}
                  color="#10B981"
                />
                <MetricCard
                  title="Visa Approval"
                  value={performanceMetrics.visaApprovalRate}
                  unit="%"
                  target={92}
                  icon={VerifiedIcon}
                  color="#8B5CF6"
                />
                <MetricCard
                  title="Satisfaction"
                  value={performanceMetrics.serviceSatisfaction}
                  unit="%"
                  target={95}
                  icon={EmojiEventsIcon}
                  color="#F59E0B"
                />
                <MetricCard
                  title="Response Time"
                  value={performanceMetrics.responseTime}
                  unit="hours"
                  target={4}
                  icon={SpeedIcon}
                  color="#3B82F6"
                />
                <MetricCard
                  title="Processing Time"
                  value={performanceMetrics.processingTime}
                  unit="days"
                  target={15}
                  icon={ScheduleIcon}
                  color="#EF4444"
                />
                <MetricCard
                  title="Retention"
                  value={performanceMetrics.studentRetention}
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
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
            >
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No recent activities
                    </div>
                  )}
                </div>
              </div>

              {/* Top Countries */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Top Countries</h3>
                  <button 
                    onClick={() => handleExportData('json')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Export JSON
                  </button>
                </div>
                <div className="space-y-2">
                  {topCountries.slice(0, 7).map((country, index) => (
                    <CountryPerformance key={country.name} country={country} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Applications</span>
                    <span className="font-semibold text-gray-900">
                      {topCountries.reduce((sum, country) => sum + country.applications, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-semibold text-gray-900">
                      {topCountries.reduce((sum, country) => sum + country.students, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            >
              {/* Revenue by Service */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue by Service</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData?.revenueByService || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="service" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" />
                      <Bar dataKey="growth" name="Growth %" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Student Demographics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Student Demographics</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={dashboardData?.studentDemographics || []}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="age" />
                      <PolarRadiusAxis />
                      <Radar 
                        name="Students" 
                        dataKey="count" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                      <Legend />
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
            >
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Need More Insights?</h3>
                  <p className="opacity-90">Download comprehensive reports or schedule a consultation</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleExportData('pdf')}
                    className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <DownloadForOfflineIcon className="h-5 w-5 inline mr-2" />
                    Download Report
                  </button>
                  <button
                    onClick={() => toast.success('Consultation scheduled! Our team will contact you.')}
                    className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <CalendarMonthIcon className="h-5 w-5 inline mr-2" />
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notifications Panel */}
            {notifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">Notifications</h4>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 block">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Export Dashboard Data API Functions (for reference)
export const dashboardAPI = {
  // Fetch all dashboard data
  async getDashboardData(timeRange = 'month') {
    try {
      const response = await api.get('/dashboard', {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Fetch statistics
  async getStatistics() {
    const response = await api.get('/dashboard/statistics');
    return response.data;
  },

  // Fetch recent activities
  async getRecentActivities(limit = 10) {
    const response = await api.get('/dashboard/activities', {
      params: { limit }
    });
    return response.data;
  },

  // Fetch top countries
  async getTopCountries(limit = 10) {
    const response = await api.get('/dashboard/top-countries', {
      params: { limit }
    });
    return response.data;
  },

  // Fetch performance metrics
  async getPerformanceMetrics() {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },

  // Fetch chart data
  async getChartData(chartType, timeRange = 'month') {
    const response = await api.get(`/dashboard/charts/${chartType}`, {
      params: { timeRange }
    });
    return response.data;
  },

  // Export data
  async exportData(format = 'csv', timeRange = 'month') {
    const response = await api.get('/dashboard/export', {
      params: { format, timeRange },
      responseType: 'blob'
    });
    return response.data;
  },

  // Update notification status
  async markNotificationAsRead(notificationId) {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  }
};