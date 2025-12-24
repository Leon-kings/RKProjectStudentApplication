/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplyIcon from "@mui/icons-material/Reply";
import ArchiveIcon from "@mui/icons-material/Archive";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import MessageIcon from "@mui/icons-material/Message";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BusinessIcon from "@mui/icons-material/Business";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SendIcon from "@mui/icons-material/Send";
import { Sidebar } from "../../sidebars/Sidebar";

// API Configuration with fallback to mock data
const API_BASE_URL = "http://localhost:5000/api";

// Constants
const CATEGORIES = [
  "general",
  "support",
  "sales",
  "feedback",
  "complaint",
  "partnership",
  "career",
  "other",
];

const PRIORITIES = ["low", "normal", "high", "urgent"];

const CONTACT_FORM_INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  category: "general",
  status: "unread",
  priority: "normal",
};

const REPLY_FORM_INITIAL_STATE = {
  subject: "",
  message: "",
  cc: "",
  bcc: "",
  attachFiles: false,
};

// Memoized badge color functions
const getPriorityBadgeColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "normal":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryBadgeColor = (category) => {
  switch (category) {
    case "support":
      return "bg-purple-100 text-purple-800";
    case "sales":
      return "bg-indigo-100 text-indigo-800";
    case "feedback":
      return "bg-teal-100 text-teal-800";
    case "complaint":
      return "bg-pink-100 text-pink-800";
    case "partnership":
      return "bg-cyan-100 text-cyan-800";
    case "career":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "read":
      return "bg-green-100 text-green-800";
    case "unread":
      return "bg-yellow-100 text-yellow-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Contact Card Component
const ContactCard = React.memo(
  ({ contact, onView, onReply, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
          contact.status === "unread" ? "border-blue-200" : "border-gray-200"
        } hover:shadow-xl transition-all duration-300`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {contact.name}
                  </h3>
                  {contact.status === "unread" && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <EmailIcon className="h-4 w-4 mr-1" />
                  {contact.email}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertIcon className="h-5 w-5 text-gray-600" />
              </button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => {
                      onView(contact);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
                  >
                    <VisibilityIcon className="h-4 w-4 mr-2 text-blue-600" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onReply(contact);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
                  >
                    <ReplyIcon className="h-4 w-4 mr-2 text-green-600" />
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      onEdit(contact);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
                  >
                    <EditIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(contact._id);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-red-600"
                  >
                    <DeleteIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h4 className="text-md font-semibold text-gray-800 mb-2 truncate">
            {contact.subject}
          </h4>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {contact.message.length > 150
              ? `${contact.message.substring(0, 150)}...`
              : contact.message}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${getCategoryBadgeColor(
                contact.category
              )}`}
            >
              {contact.category.toUpperCase()}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(
                contact.priority
              )}`}
            >
              {contact.priority.toUpperCase()}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                contact.status
              )}`}
            >
              {contact.status.toUpperCase()}
            </span>
            {contact.replied && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                REPLIED
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarTodayIcon className="h-4 w-4 mr-1" />
              {new Date(contact.createdAt).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={() => onView(contact)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                title="View"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <VisibilityIcon className="h-4 w-4 text-blue-600" />
              </motion.button>
              <motion.button
                onClick={() => onReply(contact)}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                title="Reply"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ReplyIcon className="h-4 w-4 text-green-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ContactCard.displayName = "ContactCard";

// Modal Components
const ConfirmationModal = React.memo(
  ({ show, onClose, onConfirm, title, message }) => {
    if (!show) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <WarningIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{message}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onConfirm}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ConfirmationModal.displayName = "ConfirmationModal";

const SuccessModal = React.memo(({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

SuccessModal.displayName = "SuccessModal";

const ErrorModal = React.memo(({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <ErrorIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ErrorModal.displayName = "ErrorModal";

// Pagination Component with auto-pagination
const Pagination = React.memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
    indexOfFirstContact,
    indexOfLastContact,
    totalContacts,
    contactsPerPage,
  }) => {
    const pageNumbers = useMemo(() => {
      const numbers = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          numbers.push(i);
        }
      } else {
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
          end = maxVisiblePages;
        } else if (currentPage + half >= totalPages) {
          start = totalPages - maxVisiblePages + 1;
        }

        for (let i = start; i <= end; i++) {
          numbers.push(i);
        }
      }

      return numbers;
    }, [totalPages, currentPage]);

    // Auto-pagination: When we're near the end of current page, go to next
    useEffect(() => {
      if (indexOfLastContact >= totalContacts && currentPage < totalPages) {
        // We're at the end of current data, auto-go to next page
        onPageChange(currentPage + 1);
      }
    }, [
      indexOfLastContact,
      totalContacts,
      currentPage,
      totalPages,
      onPageChange,
    ]);

    return (
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstContact + 1} to{" "}
          {Math.min(indexOfLastContact, totalContacts)} of {totalContacts}{" "}
          contacts
          {indexOfLastContact >= totalContacts && currentPage < totalPages && (
            <span className="ml-2 text-blue-500 font-medium">
              (Auto-advancing to next page)
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          >
            Previous
          </motion.button>

          {pageNumbers.map((number) => (
            <motion.button
              key={number}
              onClick={() => onPageChange(number)}
              className={`w-10 h-10 rounded-lg font-semibold ${
                currentPage === number
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {number}
            </motion.button>
          ))}

          {totalPages > pageNumbers[pageNumbers.length - 1] && (
            <>
              <span className="text-gray-400">...</span>
              <motion.button
                onClick={() => onPageChange(totalPages)}
                className="w-10 h-10 rounded-lg font-semibold text-gray-700 hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {totalPages}
              </motion.button>
            </>
          )}

          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export const ContactManagement = () => {
  // State Management
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(12); // Changed to 12 for auto-pagination
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    dateRange: "",
  });

  // Contact form state
  const [contactData, setContactData] = useState(CONTACT_FORM_INITIAL_STATE);
  const contactFormRef = useRef(CONTACT_FORM_INITIAL_STATE);

  // Reply form state
  const [replyData, setReplyData] = useState(REPLY_FORM_INITIAL_STATE);
  const replyFormRef = useRef(REPLY_FORM_INITIAL_STATE);

  // Ref for confirmation callback
  const confirmationCallbackRef = useRef(null);

  // Generate comprehensive sample contacts
  const generateSampleContacts = useCallback(() => {
    const sampleContacts = [
      {
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        company: "Tech Corp Inc.",
        subject: "Website Feedback",
        message:
          "I really like your new website design. The user interface is very intuitive and easy to navigate. However, I noticed that the contact form on the pricing page is not working properly on mobile devices.",
        category: "feedback",
        status: "read",
        priority: "normal",
        createdAt: "2024-03-20T10:30:00Z",
        replied: true,
        replyDate: "2024-03-20T14:25:00Z",
      },
      {
        _id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        company: "Digital Solutions LLC",
        subject: "Technical Support Needed",
        message:
          "I am having issues with the API integration. Getting 500 error when trying to POST data to the /users endpoint. Can you please help me resolve this issue as soon as possible?",
        category: "support",
        status: "unread",
        priority: "high",
        createdAt: "2024-03-19T09:15:00Z",
        replied: false,
        replyDate: null,
      },
      {
        _id: "3",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "+1 (555) 456-7890",
        company: "Global Enterprises",
        subject: "Partnership Inquiry",
        message:
          "We are interested in exploring partnership opportunities with your company. Our company specializes in enterprise software solutions and we believe there is great synergy between our offerings.",
        category: "partnership",
        status: "read",
        priority: "normal",
        createdAt: "2024-03-18T14:45:00Z",
        replied: true,
        replyDate: "2024-03-19T16:30:00Z",
      },
      {
        _id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 234-5678",
        company: "Startup Innovations",
        subject: "Product Pricing Question",
        message:
          "I am interested in your enterprise plan but have some questions about the pricing structure. Could you please provide more details about the annual billing discount and what features are included?",
        category: "sales",
        status: "read",
        priority: "normal",
        createdAt: "2024-03-20T08:20:00Z",
        replied: false,
        replyDate: null,
      },
      {
        _id: "5",
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 (555) 876-5432",
        company: "Educational Institute",
        subject: "Urgent: System Downtime",
        message:
          "Our entire system has been down for 3 hours now and this is affecting our daily operations. This is an emergency situation that needs immediate attention. Please contact me as soon as possible.",
        category: "complaint",
        status: "unread",
        priority: "urgent",
        createdAt: "2024-03-20T11:10:00Z",
        replied: false,
        replyDate: null,
      },
      {
        _id: "6",
        name: "Sarah Wilson",
        email: "sarah.w@example.com",
        phone: "+1 (555) 345-6789",
        company: "Freelance Developer",
        subject: "Career Opportunity",
        message:
          "I saw your job posting for a Senior React Developer and would like to apply. I have 5+ years of experience with React, Node.js, and MongoDB. When can I schedule an interview?",
        category: "career",
        status: "read",
        priority: "normal",
        createdAt: "2024-03-19T16:45:00Z",
        replied: true,
        replyDate: "2024-03-20T10:20:00Z",
      },
      {
        _id: "7",
        name: "David Miller",
        email: "david.m@example.com",
        phone: "+1 (555) 765-4321",
        company: "Consulting Firm",
        subject: "General Inquiry",
        message:
          "I would like to know more about your services and request a demo of your platform. Can you please send me more information and available time slots for next week?",
        category: "general",
        status: "read",
        priority: "low",
        createdAt: "2024-03-18T13:25:00Z",
        replied: true,
        replyDate: "2024-03-19T15:50:00Z",
      },
      {
        _id: "8",
        name: "Lisa Taylor",
        email: "lisa.t@example.com",
        phone: "+1 (555) 654-3210",
        company: "Marketing Agency",
        subject: "Bug Report - Mobile App",
        message:
          "I found a bug in the mobile app version 2.1.0. When trying to upload multiple images, the app crashes on iOS devices. This happens consistently when selecting more than 5 photos.",
        category: "support",
        status: "read",
        priority: "high",
        createdAt: "2024-03-20T10:05:00Z",
        replied: false,
        replyDate: null,
      },
      {
        _id: "9",
        name: "James Anderson",
        email: "james.a@example.com",
        phone: "+1 (555) 543-2109",
        company: "Financial Services",
        subject: "Feature Request",
        message:
          "I would like to request a dark mode feature for your dashboard. Many users work late hours and a dark theme would be much easier on the eyes. Consider this for your next update.",
        category: "feedback",
        status: "unread",
        priority: "normal",
        createdAt: "2024-03-19T09:40:00Z",
        replied: false,
        replyDate: null,
      },
      {
        _id: "10",
        name: "Maria Garcia",
        email: "maria.g@example.com",
        phone: "+1 (555) 321-0987",
        company: "Healthcare Solutions",
        subject: "Data Export Issue",
        message:
          "When exporting data to CSV format, some special characters are not being encoded properly. This causes issues when importing the data into other systems. Please fix this issue.",
        category: "support",
        status: "read",
        priority: "normal",
        createdAt: "2024-03-18T14:15:00Z",
        replied: true,
        replyDate: "2024-03-19T08:45:00Z",
      },
    ];

    // Generate more contacts to test pagination
    const moreContacts = [];
    const names = [
      "Alex Turner",
      "Sophia Williams",
      "Daniel Lee",
      "Olivia Martinez",
      "William Clark",
    ];
    const companies = [
      "Innovation Labs",
      "Cloud Systems",
      "Data Analytics Co",
      "Mobile Solutions",
      "Web Development Inc",
    ];

    for (let i = 11; i <= 25; i++) {
      const randomCategory =
        CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const randomPriority =
        PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)];
      const randomStatus = Math.random() > 0.5 ? "read" : "unread";
      const randomReplied = Math.random() > 0.3;

      moreContacts.push({
        _id: i.toString(),
        name: names[Math.floor(Math.random() * names.length)],
        email: `contact${i}@example.com`,
        phone: `+1 (555) ${100 + i}-${2000 + i}`,
        company: companies[Math.floor(Math.random() * companies.length)],
        subject: `Inquiry about ${randomCategory} services`,
        message: `This is a sample message ${i} about ${randomCategory}. Need assistance with implementation and support. Looking forward to your response.`,
        category: randomCategory,
        status: randomStatus,
        priority: randomPriority,
        createdAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        replied: randomReplied,
        replyDate: randomReplied
          ? new Date(
              Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000
            ).toISOString()
          : null,
      });
    }

    return [...sampleContacts, ...moreContacts];
  }, []);

  // Fetch contacts from API with fallback
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 5000, // 5 second timeout
      });

      if (response.data.success) {
        setContacts(response.data.data);
        setFilteredContacts(response.data.data);
        toast.success("Contacts loaded successfully!");
      } else {
        throw new Error(response.data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.warn("Using sample data due to API error:", error.message);
      toast.info("Using sample data. API connection failed.");

      // Use sample data when API fails
      const sampleData = generateSampleContacts();
      setContacts(sampleData);
      setFilteredContacts(sampleData);
    } finally {
      setLoading(false);
    }
  }, [generateSampleContacts]);

  // Initial fetch
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Memoized stats
  const stats = useMemo(() => {
    return [
      {
        title: "Total Contacts",
        value: contacts.length,
        icon: ContactMailIcon,
        color: "from-blue-500 to-cyan-500",
        change: "+15%",
      },
      {
        title: "Unread Messages",
        value: contacts.filter((c) => c.status === "unread").length,
        icon: MarkEmailUnreadIcon,
        color: "from-yellow-500 to-amber-500",
        change: "+8%",
      },
      {
        title: "Urgent Priority",
        value: contacts.filter((c) => c.priority === "urgent").length,
        icon: WarningIcon,
        color: "from-red-500 to-orange-500",
        change: "+12%",
      },
      {
        title: "Replied",
        value: contacts.filter((c) => c.replied).length,
        icon: MarkEmailReadIcon,
        color: "from-green-500 to-emerald-500",
        change: "+20%",
      },
    ];
  }, [contacts]);

  // Apply filters and search - optimized with useMemo
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = [...contacts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.email.toLowerCase().includes(query) ||
          contact.name.toLowerCase().includes(query) ||
          contact.subject.toLowerCase().includes(query) ||
          contact.message.toLowerCase().includes(query) ||
          contact.phone.includes(searchQuery)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(
        (contact) => contact.status === filters.status
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(
        (contact) => contact.category === filters.category
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "email":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "createdAt":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "priority":
        const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
        filtered.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [contacts, searchQuery, filters, sortBy]);

  // Update filtered contacts when filteredAndSortedContacts changes
  useEffect(() => {
    setFilteredContacts(filteredAndSortedContacts);
    setCurrentPage(1);
  }, [filteredAndSortedContacts]);

  // Pagination logic - memoized
  const paginationData = useMemo(() => {
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(
      indexOfFirstContact,
      indexOfLastContact
    );
    const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

    return {
      indexOfLastContact,
      indexOfFirstContact,
      currentContacts,
      totalPages,
    };
  }, [currentPage, contactsPerPage, filteredContacts]);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
    contactFormRef.current[name] = value;
  }, []);

  // Handle reply form changes
  const handleReplyInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setReplyData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    replyFormRef.current[name] = newValue;
  }, []);

  // Reset contact form
  const resetContactForm = useCallback(() => {
    setContactData(CONTACT_FORM_INITIAL_STATE);
    contactFormRef.current = CONTACT_FORM_INITIAL_STATE;
  }, []);

  // Reset reply form
  const resetReplyForm = useCallback(() => {
    setReplyData(REPLY_FORM_INITIAL_STATE);
    replyFormRef.current = REPLY_FORM_INITIAL_STATE;
  }, []);

  // Show success modal
  const showSuccess = useCallback((message) => {
    setModalTitle("Success");
    setModalMessage(message);
    setShowSuccessModal(true);
  }, []);

  // Show error modal
  const showError = useCallback((message) => {
    setModalTitle("Error");
    setModalMessage(message);
    setShowErrorModal(true);
  }, []);

  // Show confirmation modal
  const showConfirm = useCallback((message, callback) => {
    setModalTitle("Confirm Action");
    setModalMessage(message);
    setShowDeleteConfirm(true);
    confirmationCallbackRef.current = callback;
  }, []);

  // Add new contact
  const handleAddContact = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate form
      const data = contactFormRef.current;
      if (!data.email || !data.name || !data.subject) {
        showError("Please fill in all required fields");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE_URL}/contacts`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          showSuccess("Contact message saved successfully!");
          setShowAddContactModal(false);
          resetContactForm();
          fetchContacts();
        } else {
          showError(response.data.message || "Failed to save contact");
        }
      } catch (error) {
        console.error("Error adding contact:", error);
        // For demo, add to local state
        const newContact = {
          _id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
          replied: false,
          replyDate: null,
        };
        setContacts((prev) => [newContact, ...prev]);
        showSuccess("Contact added successfully (demo mode)!");
        setShowAddContactModal(false);
        resetContactForm();
      }
    },
    [fetchContacts, resetContactForm, showError, showSuccess]
  );

  // View contact details
  const handleViewContact = useCallback((contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  }, []);

  // Edit contact
  const handleEditContact = useCallback((contact) => {
    setSelectedContact(contact);
    const updatedData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      company: contact.company || "",
      subject: contact.subject,
      message: contact.message,
      category: contact.category,
      status: contact.status,
      priority: contact.priority,
    };
    setContactData(updatedData);
    contactFormRef.current = updatedData;
    setIsEditMode(true);
    setShowAddContactModal(true);
  }, []);

  // Update contact
  const handleUpdateContact = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate form
      const data = contactFormRef.current;
      if (!data.email || !data.name || !data.subject) {
        showError("Please fill in all required fields");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${API_BASE_URL}/contacts/${selectedContact._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          showSuccess("Contact updated successfully!");
          setShowAddContactModal(false);
          setSelectedContact(null);
          setIsEditMode(false);
          resetContactForm();
          fetchContacts();
        } else {
          showError(response.data.message || "Failed to update contact");
        }
      } catch (error) {
        console.error("Error updating contact:", error);
        // For demo, update local state
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === selectedContact._id
              ? { ...contact, ...data }
              : contact
          )
        );
        showSuccess("Contact updated successfully (demo mode)!");
        setShowAddContactModal(false);
        setSelectedContact(null);
        setIsEditMode(false);
        resetContactForm();
      }
    },
    [selectedContact, fetchContacts, resetContactForm, showError, showSuccess]
  );

  // Delete contact
  const handleDeleteContact = useCallback(
    (contactId) => {
      showConfirm(
        "Are you sure you want to delete this contact message? This action cannot be undone.",
        async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
              `${API_BASE_URL}/contacts/${contactId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.data.success) {
              showSuccess("Contact deleted successfully!");
              setShowDeleteConfirm(false);
              fetchContacts();
            } else {
              showError(response.data.message || "Failed to delete contact");
            }
          } catch (error) {
            console.error("Error deleting contact:", error);
            // For demo, remove from local state
            setContacts((prev) =>
              prev.filter((contact) => contact._id !== contactId)
            );
            showSuccess("Contact deleted successfully (demo mode)!");
            setShowDeleteConfirm(false);
          }
        }
      );
    },
    [fetchContacts, showConfirm, showError, showSuccess]
  );
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Reply to contact
  const handleReplyContact = useCallback((contact) => {
    setSelectedContact(contact);
    const updatedReplyData = {
      subject: `Re: ${contact.subject}`,
      message: `\n\n--- Original Message ---\nFrom: ${contact.name} <${
        contact.email
      }>\nDate: ${new Date(contact.createdAt).toLocaleString()}\nSubject: ${
        contact.subject
      }\n\n${contact.message}`,
      cc: "",
      bcc: "",
      attachFiles: false,
    };
    setReplyData(updatedReplyData);
    replyFormRef.current = updatedReplyData;
    setShowReplyModal(true);
  }, []);

  // Send reply
  const handleSendReply = useCallback(
    async (e) => {
      e.preventDefault();

      const data = replyFormRef.current;
      if (!data.message) {
        showError("Please enter a reply message");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_BASE_URL}/contacts/${selectedContact._id}/reply`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          showSuccess("Reply sent successfully!");
          setShowReplyModal(false);
          resetReplyForm();
          fetchContacts();
        } else {
          showError(response.data.message || "Failed to send reply");
        }
      } catch (error) {
        console.error("Error sending reply:", error);
        // For demo, update local state
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === selectedContact._id
              ? {
                  ...contact,
                  replied: true,
                  replyDate: new Date().toISOString(),
                  status: "read",
                }
              : contact
          )
        );
        showSuccess("Reply sent successfully (demo mode)!");
        setShowReplyModal(false);
        resetReplyForm();
      }
    },
    [selectedContact, fetchContacts, resetReplyForm, showError, showSuccess]
  );

  // Export contacts to CSV
  const handleExportContacts = useCallback(() => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Subject",
      "Category",
      "Status",
      "Priority",
      "Created At",
      "Replied",
    ];
    const csvData = filteredContacts.map((contact) => [
      contact._id,
      `"${contact.name}"`,
      contact.email,
      contact.phone,
      `"${contact.company}"`,
      `"${contact.subject}"`,
      contact.category,
      contact.status,
      contact.priority,
      new Date(contact.createdAt).toLocaleDateString(),
      contact.replied ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    showSuccess("Contacts exported successfully!");
  }, [filteredContacts, showSuccess]);

  // Handle page change with scroll to top
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // View Contact Modal
  const ViewContactModal = React.memo(() => {
    if (!selectedContact) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 overflow-y-auto"
        onClick={() => setShowViewModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedContact.subject}
                </h2>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getPriorityBadgeColor(
                      selectedContact.priority
                    )}`}
                  >
                    {selectedContact.priority.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusBadgeColor(
                      selectedContact.status
                    )}`}
                  >
                    {selectedContact.status.toUpperCase()}
                  </span>
                  {selectedContact.replied && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                      REPLIED
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => handleReplyContact(selectedContact)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ReplyIcon className="h-4 w-4 mr-2" />
                  Reply
                </motion.button>
                <motion.button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CloseIcon className="h-6 w-6 text-gray-500" />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    From
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <PersonIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-900">
                        {selectedContact.name}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <EmailIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        {selectedContact.email}
                      </span>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {selectedContact.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Company
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <BusinessIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        {selectedContact.company || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Message Details
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <SubjectIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        Category:{" "}
                        <span className="font-semibold">
                          {selectedContact.category}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <CalendarTodayIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        Received:{" "}
                        {new Date(selectedContact.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {selectedContact.replyDate && (
                      <div className="flex items-center">
                        <ReplyIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Replied:{" "}
                          {new Date(selectedContact.replyDate).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleEditContact(selectedContact)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteContact(selectedContact._id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Message
              </h4>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  ViewContactModal.displayName = "ViewContactModal";

  // Reply Modal
  const ReplyModalComponent = React.memo(() => {
    if (!selectedContact) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 overflow-y-auto"
        onClick={() => {
          setShowReplyModal(false);
          resetReplyForm();
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Reply to {selectedContact.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Send a response to this contact message
                </p>
              </div>
              <motion.button
                onClick={() => {
                  setShowReplyModal(false);
                  resetReplyForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </motion.button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  To
                </label>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center">
                    <EmailIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {selectedContact.email}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={replyData.subject}
                  onChange={handleReplyInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="8"
                  required
                  value={replyData.message}
                  onChange={handleReplyInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CC (Optional)
                  </label>
                  <input
                    type="email"
                    name="cc"
                    value={replyData.cc}
                    onChange={handleReplyInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="cc@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    BCC (Optional)
                  </label>
                  <input
                    type="email"
                    name="bcc"
                    value={replyData.bcc}
                    onChange={handleReplyInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="bcc@example.com"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="attachFiles"
                  checked={replyData.attachFiles}
                  onChange={handleReplyInputChange}
                  className="h-5 w-5 text-blue-600 rounded mr-3"
                />
                <label className="text-gray-700">
                  Attach original message and contact details
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowReplyModal(false);
                    resetReplyForm();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SendIcon className="h-5 w-5 mr-2" />
                  Send Reply
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  ReplyModalComponent.displayName = "ReplyModalComponent";

  // Contact Form Modal
  const ContactFormModal = React.memo(() => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 overflow-y-auto"
        onClick={() => {
          setShowAddContactModal(false);
          setSelectedContact(null);
          setIsEditMode(false);
          resetContactForm();
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? "Edit Contact" : "Add New Contact"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isEditMode
                    ? "Update contact information"
                    : "Add a new contact message"}
                </p>
              </div>
              <motion.button
                onClick={() => {
                  setShowAddContactModal(false);
                  setSelectedContact(null);
                  setIsEditMode(false);
                  resetContactForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </motion.button>
            </div>

            <form
              onSubmit={isEditMode ? handleUpdateContact : handleAddContact}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={contactData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={contactData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={contactData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Subject of the message"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  value={contactData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Enter the message content..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={contactData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    required
                    value={contactData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    {PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    required
                    value={contactData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowAddContactModal(false);
                    setSelectedContact(null);
                    setIsEditMode(false);
                    resetContactForm();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEditMode ? (
                    <>
                      <SaveIcon className="h-5 w-5 mr-2" />
                      Update Contact
                    </>
                  ) : (
                    <>
                      <NoteAddIcon className="h-5 w-5 mr-2" />
                      Save Contact
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  ContactFormModal.displayName = "ContactFormModal";

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="w-full p-2">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                  Contact Management
                </h1>
                <p className="text-lg text-gray-600">
                  Manage contact messages, inquiries, and support requests
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <motion.button
                  onClick={() => setShowAddContactModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AddIcon className="h-5 w-5 mr-2" />
                  Add Contact
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.title}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Contacts
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, subject, or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="priority">Priority</option>
                  <option value="name">Name A-Z</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredContacts.length} contacts found
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={fetchContacts}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  Refresh
                </motion.button>
                <motion.button
                  onClick={handleExportContacts}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export CSV
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contacts Grid */}
          <div className="mb-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No contacts found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  onClick={() => setShowAddContactModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AddIcon className="h-5 w-5 mr-2 inline" />
                  Add New Contact
                </motion.button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginationData.currentContacts.map((contact) => (
                    <ContactCard
                      key={contact._id}
                      contact={contact}
                      onView={handleViewContact}
                      onReply={handleReplyContact}
                      onEdit={handleEditContact}
                      onDelete={handleDeleteContact}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                  indexOfFirstContact={paginationData.indexOfFirstContact}
                  indexOfLastContact={paginationData.indexOfLastContact}
                  totalContacts={filteredContacts.length}
                  contactsPerPage={contactsPerPage}
                />
              </>
            )}
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showAddContactModal && <ContactFormModal />}
          {showViewModal && <ViewContactModal />}
          {showReplyModal && <ReplyModalComponent />}
          {showDeleteConfirm && (
            <ConfirmationModal
              show={showDeleteConfirm}
              onClose={() => setShowDeleteConfirm(false)}
              onConfirm={() => {
                if (confirmationCallbackRef.current) {
                  confirmationCallbackRef.current();
                  setShowDeleteConfirm(false);
                }
              }}
              title={modalTitle}
              message={modalMessage}
            />
          )}
          {showSuccessModal && (
            <SuccessModal
              show={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
              title={modalTitle}
              message={modalMessage}
            />
          )}
          {showErrorModal && (
            <ErrorModal
              show={showErrorModal}
              onClose={() => setShowErrorModal(false)}
              title={modalTitle}
              message={modalMessage}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
