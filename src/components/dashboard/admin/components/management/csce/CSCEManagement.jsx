/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Flag as FlagIcon,
  DateRange as DateIcon,
  AttachFile as AttachFileIcon,
  Description as DescriptionIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Paid as PaidIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Grade as GradeIcon,
  LibraryBooks as LibraryBooksIcon,
  Assessment as AssessmentIcon,
  Quiz as QuizIcon,
  Numbers as NumbersIcon,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

const INITIAL_EXAM_FORM = {
  name: "",
  type: "",
  levels: [],
  nextExamDate: "",
  registrationDeadline: "",
  registrationStatus: "open",
  duration: "",
  fee: "",
  difficulty: "medium",
  passingScore: "",
  image: "",
  featured: false,
  description: "",
  requirements: [],
  testCenters: [],
  preparationTime: "",
  recommendedFor: [],
  topics: [],
};

// Mock data for CSCE exams
const MOCK_CSCE_EXAMS = [
  {
    id: 1,
    name: "CSCE General Test",
    type: "General",
    levels: ["Undergraduate Level", "Graduate Level"],
    nextExamDate: "June 15, 2024",
    registrationDeadline: "May 30, 2024",
    registrationStatus: "open",
    duration: "4 hours",
    fee: "$150",
    difficulty: "Advanced",
    passingScore: "70%",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Comprehensive test covering all major subject areas for university admissions.",
    requirements: ["High school diploma", "Valid ID", "Test authorization"],
    testCenters: ["Kigali Convention Center", "Huye Campus", "Musanze Center"],
    preparationTime: "4-6 months",
    recommendedFor: ["All university applicants"],
    topics: ["Mathematics", "English", "Science", "General Knowledge"],
  },
  {
    id: 2,
    name: "CSCE Advanced Level",
    type: "Advanced",
    levels: ["Graduate Level"],
    nextExamDate: "July 20, 2024",
    registrationDeadline: "July 5, 2024",
    registrationStatus: "open",
    duration: "5 hours",
    fee: "$200",
    difficulty: "Expert",
    passingScore: "75%",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Advanced level test for graduate program admissions and scholarship eligibility.",
    requirements: [
      "Bachelor's degree",
      "Academic transcripts",
      "Recommendation letters",
    ],
    testCenters: ["Kigali Main Center", "Regional Centers"],
    preparationTime: "6-8 months",
    recommendedFor: ["Graduate program applicants", "Scholarship candidates"],
    topics: [
      "Advanced Mathematics",
      "Research Methodology",
      "Specialized Subjects",
    ],
  },
  {
    id: 3,
    name: "English Proficiency Test",
    type: "Language",
    levels: ["All Levels"],
    nextExamDate: "May 25, 2024",
    registrationDeadline: "May 10, 2024",
    registrationStatus: "open",
    duration: "3 hours",
    fee: "$120",
    difficulty: "Intermediate",
    passingScore: "65%",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "English language proficiency test for international program admissions.",
    requirements: ["Valid passport", "Language background information"],
    testCenters: ["All CSCE Centers"],
    preparationTime: "2-4 months",
    recommendedFor: ["International students", "English program applicants"],
    topics: [
      "Reading Comprehension",
      "Writing Skills",
      "Listening",
      "Speaking",
    ],
  },
  {
    id: 4,
    name: "Science Entrance Test",
    type: "Science",
    levels: ["Undergraduate Level"],
    nextExamDate: "June 30, 2024",
    registrationDeadline: "June 15, 2024",
    registrationStatus: "open",
    duration: "3.5 hours",
    fee: "$140",
    difficulty: "Advanced",
    passingScore: "68%",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description:
      "Specialized science test for medical and engineering program admissions.",
    requirements: ["Science background", "Laboratory experience"],
    testCenters: ["Science Centers", "University Labs"],
    preparationTime: "3-5 months",
    recommendedFor: ["Medical school applicants", "Engineering students"],
    topics: ["Biology", "Chemistry", "Physics", "Mathematics"],
  },
  {
    id: 5,
    name: "Business Aptitude Test",
    type: "Business",
    levels: ["Undergraduate Level", "Graduate Level"],
    nextExamDate: "July 10, 2024",
    registrationDeadline: "June 25, 2024",
    registrationStatus: "open",
    duration: "3 hours",
    fee: "$130",
    difficulty: "Intermediate",
    passingScore: "62%",
    image:
      "https://images.unsplash.com/photo-1551836026-d5c2a3f3d8c4?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description:
      "Business aptitude and reasoning test for commerce and management programs.",
    requirements: ["Basic mathematics", "Analytical skills"],
    testCenters: ["Business Centers", "City Centers"],
    preparationTime: "2-3 months",
    recommendedFor: ["Business school applicants", "Management programs"],
    topics: [
      "Quantitative Reasoning",
      "Logical Analysis",
      "Business Concepts",
      "Case Studies",
    ],
  },
  {
    id: 6,
    name: "Mathematics Entrance Test",
    type: "Subject-specific",
    levels: ["Undergraduate Level"],
    nextExamDate: "August 5, 2024",
    registrationDeadline: "July 20, 2024",
    registrationStatus: "open",
    duration: "3 hours",
    fee: "$100",
    difficulty: "Advanced",
    passingScore: "60%",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description:
      "Specialized mathematics test for engineering and science programs.",
    requirements: ["High school mathematics", "Calculator"],
    testCenters: ["Designated centers"],
    preparationTime: "3-6 months",
    recommendedFor: ["Engineering applicants", "Science majors"],
    topics: ["Calculus", "Algebra", "Geometry", "Statistics"],
  },
  {
    id: 7,
    name: "Law Aptitude Test",
    type: "Professional",
    levels: ["Graduate Level"],
    nextExamDate: "September 15, 2024",
    registrationDeadline: "August 31, 2024",
    registrationStatus: "upcoming",
    duration: "4 hours",
    fee: "$180",
    difficulty: "Expert",
    passingScore: "70%",
    image:
      "https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Comprehensive law aptitude test for law school admissions.",
    requirements: ["Bachelor's degree", "Legal background"],
    testCenters: ["Law Centers", "University Campuses"],
    preparationTime: "4-6 months",
    recommendedFor: ["Law school applicants", "Legal studies"],
    topics: [
      "Legal Reasoning",
      "Constitutional Law",
      "Case Analysis",
      "Ethics",
    ],
  },
  {
    id: 8,
    name: "Art & Design Portfolio Review",
    type: "Portfolio",
    levels: ["All Levels"],
    nextExamDate: "October 10, 2024",
    registrationDeadline: "September 25, 2024",
    registrationStatus: "upcoming",
    duration: "Full day",
    fee: "$90",
    difficulty: "Intermediate",
    passingScore: "Portfolio Review",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Portfolio assessment for art and design program admissions.",
    requirements: ["Portfolio submission", "Artwork samples"],
    testCenters: ["Art Centers", "Design Schools"],
    preparationTime: "6-12 months",
    recommendedFor: ["Art students", "Design applicants"],
    topics: [
      "Drawing Skills",
      "Design Principles",
      "Creative Portfolio",
      "Art History",
    ],
  },
];

const EXAM_TYPES = [
  "General",
  "Advanced",
  "Language",
  "Science",
  "Business",
  "Subject-specific",
  "Professional",
  "Portfolio",
  "Other",
];

const DIFFICULTY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const REGISTRATION_STATUSES = ["open", "closed", "upcoming", "full"];
const EXAM_LEVELS = ["Undergraduate Level", "Graduate Level", "All Levels"];

export const CSCEManagement = () => {
  // State management
  const [exams, setExams] = useState(MOCK_CSCE_EXAMS);
  const [filteredExams, setFilteredExams] = useState(MOCK_CSCE_EXAMS);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState(INITIAL_EXAM_FORM);
  const [errors, setErrors] = useState({});

  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "nextExamDate",
    direction: "asc",
  });

  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Filter and sort exams
  useEffect(() => {
    let filtered = [...exams];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          exam.name.toLowerCase().includes(term) ||
          exam.description.toLowerCase().includes(term) ||
          exam.type.toLowerCase().includes(term)
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((exam) => exam.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (exam) => exam.registrationStatus === statusFilter
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(
        (exam) => exam.difficulty === difficultyFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredExams(filtered);
    setPage(0);
  }, [
    exams,
    searchTerm,
    typeFilter,
    statusFilter,
    difficultyFilter,
    sortConfig,
  ]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (
      name === "levels" ||
      name === "requirements" ||
      name === "testCenters" ||
      name === "recommendedFor" ||
      name === "topics"
    ) {
      // Handle array fields
      const values = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      setFormData((prev) => ({
        ...prev,
        [name]: values,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Exam name is required";
    if (!formData.type.trim()) newErrors.type = "Exam type is required";
    if (!formData.nextExamDate.trim())
      newErrors.nextExamDate = "Next exam date is required";
    if (!formData.registrationDeadline.trim())
      newErrors.registrationDeadline = "Registration deadline is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.fee.trim()) newErrors.fee = "Fee is required";
    if (!formData.passingScore.trim())
      newErrors.passingScore = "Passing score is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEditMode && selectedExam) {
        // Update existing exam
        const updatedExams = exams.map((exam) =>
          exam.id === selectedExam.id
            ? {
                ...formData,
                id: selectedExam.id,
                image: formData.image || selectedExam.image,
              }
            : exam
        );
        setExams(updatedExams);

        showNotification("Exam updated successfully!", "success");
      } else {
        // Create new exam
        const newExam = {
          ...formData,
          id:
            exams.length > 0
              ? Math.max(...exams.map((exam) => exam.id)) + 1
              : 1,
          image:
            formData.image ||
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        };
        setExams((prev) => [newExam, ...prev]);

        showNotification("Exam created successfully!", "success");
      }

      handleCloseDialog();
      resetForm();
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete exam
  const handleDelete = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedExams = exams.filter((exam) => exam.id !== selectedExam.id);
      setExams(updatedExams);

      showNotification("Exam deleted successfully!", "success");

      setOpenDeleteDialog(false);
      setSelectedExam(null);
    } catch (error) {
      showNotification("Failed to delete exam. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Open edit dialog
  const handleEdit = (exam) => {
    setSelectedExam(exam);
    setFormData({
      ...exam,
      levels: Array.isArray(exam.levels) ? exam.levels : [],
      requirements: Array.isArray(exam.requirements) ? exam.requirements : [],
      testCenters: Array.isArray(exam.testCenters) ? exam.testCenters : [],
      recommendedFor: Array.isArray(exam.recommendedFor)
        ? exam.recommendedFor
        : [],
      topics: Array.isArray(exam.topics) ? exam.topics : [],
    });
    setIsEditMode(true);
    setOpenDialog(true);
  };

  // Open view dialog
  const handleView = (exam) => {
    setSelectedExam(exam);
    setOpenViewDialog(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (exam) => {
    setSelectedExam(exam);
    setOpenDeleteDialog(true);
  };

  // Open create dialog
  const handleCreate = () => {
    resetForm();
    setIsEditMode(false);
    setOpenDialog(true);
  };

  // Close all dialogs
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExam(null);
    setIsEditMode(false);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedExam(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedExam(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_EXAM_FORM);
    setErrors({});
  };

  // Handle pagination
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const colorClass =
      {
        open: "bg-green-100 text-green-800 border-green-300",
        closed: "bg-red-100 text-red-800 border-red-300",
        upcoming: "bg-blue-100 text-blue-800 border-blue-300",
        full: "bg-yellow-100 text-yellow-800 border-yellow-300",
      }[status] || "bg-gray-100 text-gray-800 border-gray-300";

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty) => {
    const colorClass =
      {
        Beginner: "bg-green-100 text-green-800 border-green-300",
        Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
        Advanced: "bg-orange-100 text-orange-800 border-orange-300",
        Expert: "bg-red-100 text-red-800 border-red-300",
      }[difficulty] || "bg-gray-100 text-gray-800 border-gray-300";

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}
      >
        {difficulty}
      </span>
    );
  };

  // Calculate statistics
  const statistics = {
    total: exams.length,
    featured: exams.filter((exam) => exam.featured).length,
    open: exams.filter((exam) => exam.registrationStatus === "open").length,
    upcoming: exams.filter((exam) => exam.registrationStatus === "upcoming")
      .length,
  };

  // Calculate total revenue (mock calculation)
  const totalRevenue = exams.reduce((sum, exam) => {
    const fee = parseFloat(exam.fee.replace("$", "")) || 0;
    return sum + fee * 100; // Assuming 100 registrations per exam
  }, 0);

  // Paginated data
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedExams = filteredExams.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredExams.length / rowsPerPage);

  // Notification component
  const Notification = () => {
    if (!notification.show) return null;

    const bgColor = {
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    }[notification.type];

    const icon = {
      success: <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
      error: <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      warning: (
        <WarningIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
      ),
      info: <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
    }[notification.type];

    return (
      <div
        className={`fixed top-3 sm:top-4 right-3 sm:right-4 z-50 p-3 sm:p-4 rounded-lg border ${bgColor} shadow-lg max-w-xs sm:max-w-md text-sm sm:text-base`}
      >
        <div className="flex items-start">
          {icon}
          <div className="ml-2 sm:ml-3 flex-1">
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() =>
              setNotification((prev) => ({ ...prev, show: false }))
            }
            className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Modal backdrop
  const ModalBackdrop = ({ onClose }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}
    />
  );

  // Form field component
  const FormField = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
    value,
    onChange,
    error,
    disabled,
    children,
    ...props
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ErrorIcon className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  // Select field component
  const SelectField = ({
    label,
    name,
    required = false,
    value,
    onChange,
    options,
    error,
    disabled,
    placeholder = "Select...",
  }) => (
    <FormField
      label={label}
      name={name}
      required={required}
      error={error}
      disabled={disabled}
    >
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );

  // Textarea field component
  const TextareaField = ({
    label,
    name,
    required = false,
    value,
    onChange,
    error,
    disabled,
    placeholder,
    rows = 3,
  }) => (
    <FormField
      label={label}
      name={name}
      required={required}
      error={error}
      disabled={disabled}
    >
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
    </FormField>
  );

  // Array field component
  const ArrayField = ({
    label,
    name,
    value = [],
    onChange,
    placeholder,
    disabled,
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value.join(", ")}
        onChange={(e) => {
          const newValue = e.target.value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item);
          onChange({ target: { name, value: newValue } });
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
      />
      <p className="mt-1 text-xs text-gray-500">
        Separate items with commas (e.g., Item 1, Item 2, Item 3)
      </p>
    </div>
  );

  return (
    <div className="p-3 flex xs:p-4 sm:p-6 bg-gray-50 min-h-screen">
      <Sidebar onToggleNotifications={toggleNotificationsModal} />
      <div className="w-full p-2">
        <Notification />

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            CSCE Exam Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Manage Center for Scholastic Competence Examinations (CSCE) -
            Create, edit, and track all exams
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">
                  Total Exams
                </p>
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.total}
                </p>
              </div>
              <LibraryBooksIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">
                  Featured Exams
                </p>
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.featured}
                </p>
              </div>
              <TrendingUpIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">
                  Open Registrations
                </p>
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  {statistics.open}
                </p>
              </div>
              <CheckIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 sm:p-4 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium opacity-90">
                  Projected Revenue
                </p>
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <PaidIcon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exams by name, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm"
                >
                  <option value="all">All Types</option>
                  {EXAM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm"
                >
                  <option value="all">All Status</option>
                  {REGISTRATION_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm"
                >
                  <option value="all">All Difficulty</option>
                  {DIFFICULTY_LEVELS.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                  setDifficultyFilter("all");
                  setSortConfig({ key: "nextExamDate", direction: "asc" });
                }}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center"
              >
                <RefreshIcon className="h-5 w-5 mr-2" />
                Reset
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <AddIcon className="h-5 w-5 mr-2" />
                New Exam
              </button>
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="mb-8 sm:mb-12">
          {filteredExams.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-lg">
              <SchoolIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No exams found
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={handleCreate}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <AddIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 inline" />
                Create New Exam
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {paginatedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={exam.image}
                        alt={exam.name}
                        className="w-full h-48 object-cover"
                      />
                      {exam.featured && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(exam.registrationStatus)}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                            {exam.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <SchoolIcon className="h-4 w-4 mr-1" />
                            {exam.type}
                          </div>
                        </div>
                        {getDifficultyBadge(exam.difficulty)}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {exam.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <DateIcon className="h-4 w-4 mr-1" />
                            Exam Date
                          </div>
                          <div className="font-semibold text-gray-900">
                            {exam.nextExamDate}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <TimelineIcon className="h-4 w-4 mr-1" />
                            Duration
                          </div>
                          <div className="font-semibold text-gray-900">
                            {exam.duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <PaidIcon className="h-5 w-5 text-green-500 mr-2" />
                          <span className="font-bold text-gray-900">
                            {exam.fee}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(exam)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <ViewIcon className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(exam)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <EditIcon className="h-4 w-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(exam)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <DeleteIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredExams.length > rowsPerPage && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{startIndex + 1}</span> to{" "}
                        <span className="font-medium">
                          {Math.min(endIndex, filteredExams.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredExams.length}
                        </span>{" "}
                        exams
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <label
                          htmlFor="rowsPerPage"
                          className="text-sm text-gray-700 mr-2"
                        >
                          Rows per page:
                        </label>
                        <select
                          id="rowsPerPage"
                          value={rowsPerPage}
                          onChange={handleChangeRowsPerPage}
                          className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        >
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="12">12</option>
                          <option value="16">16</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleChangePage(page - 1)}
                          disabled={page === 0}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>

                        {(() => {
                          const buttons = [];
                          const maxButtons = window.innerWidth < 640 ? 3 : 5;

                          if (totalPages <= maxButtons) {
                            for (let i = 0; i < totalPages; i++) {
                              buttons.push(
                                <button
                                  key={i}
                                  onClick={() => handleChangePage(i)}
                                  className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                                    page === i
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {i + 1}
                                </button>
                              );
                            }
                          } else {
                            // Always show first page
                            buttons.push(
                              <button
                                key={0}
                                onClick={() => handleChangePage(0)}
                                className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                                  page === 0
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                1
                              </button>
                            );

                            if (page > 2) {
                              buttons.push(
                                <span
                                  key="ellipsis1"
                                  className="px-2 text-gray-500"
                                >
                                  ...
                                </span>
                              );
                            }

                            // Show pages around current page
                            const start = Math.max(1, page - 1);
                            const end = Math.min(totalPages - 2, page + 1);

                            for (let i = start; i <= end; i++) {
                              buttons.push(
                                <button
                                  key={i}
                                  onClick={() => handleChangePage(i)}
                                  className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                                    page === i
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {i + 1}
                                </button>
                              );
                            }

                            if (page < totalPages - 3) {
                              buttons.push(
                                <span
                                  key="ellipsis2"
                                  className="px-2 text-gray-500"
                                >
                                  ...
                                </span>
                              );
                            }

                            // Always show last page
                            buttons.push(
                              <button
                                key={totalPages - 1}
                                onClick={() => handleChangePage(totalPages - 1)}
                                className={`px-4 py-2 border-2 font-semibold rounded-xl ${
                                  page === totalPages - 1
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                {totalPages}
                              </button>
                            );
                          }

                          return buttons;
                        })()}

                        <button
                          onClick={() => handleChangePage(page + 1)}
                          disabled={page >= totalPages - 1}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {openDialog && (
        <>
          <ModalBackdrop onClose={handleCloseDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden my-4">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {isEditMode ? "Edit CSCE Exam" : "New CSCE Exam"}
                </h2>
                <button
                  onClick={handleCloseDialog}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <form onSubmit={handleSubmit} className="space-y-6 text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Exam Name"
                      name="name"
                      required
                      placeholder="CSCE General Test"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      disabled={loading}
                    />

                    <SelectField
                      label="Exam Type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      options={EXAM_TYPES}
                      error={errors.type}
                      disabled={loading}
                      placeholder="Select exam type"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Next Exam Date"
                      name="nextExamDate"
                      type="date"
                      required
                      value={formData.nextExamDate}
                      onChange={handleInputChange}
                      error={errors.nextExamDate}
                      disabled={loading}
                    />

                    <FormField
                      label="Registration Deadline"
                      name="registrationDeadline"
                      type="date"
                      required
                      value={formData.registrationDeadline}
                      onChange={handleInputChange}
                      error={errors.registrationDeadline}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Registration Status"
                      name="registrationStatus"
                      required
                      value={formData.registrationStatus}
                      onChange={handleInputChange}
                      options={REGISTRATION_STATUSES}
                      disabled={loading}
                      placeholder="Select status"
                    />

                    <SelectField
                      label="Difficulty Level"
                      name="difficulty"
                      required
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      options={DIFFICULTY_LEVELS}
                      disabled={loading}
                      placeholder="Select difficulty"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Duration"
                      name="duration"
                      required
                      placeholder="4 hours"
                      value={formData.duration}
                      onChange={handleInputChange}
                      error={errors.duration}
                      disabled={loading}
                    />

                    <FormField
                      label="Fee"
                      name="fee"
                      required
                      placeholder="$150"
                      value={formData.fee}
                      onChange={handleInputChange}
                      error={errors.fee}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Passing Score"
                      name="passingScore"
                      required
                      placeholder="70%"
                      value={formData.passingScore}
                      onChange={handleInputChange}
                      error={errors.passingScore}
                      disabled={loading}
                    />

                    <FormField
                      label="Preparation Time"
                      name="preparationTime"
                      placeholder="4-6 months"
                      value={formData.preparationTime}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ArrayField
                      label="Exam Levels"
                      name="levels"
                      value={formData.levels}
                      onChange={handleInputChange}
                      placeholder="Undergraduate Level, Graduate Level"
                      disabled={loading}
                    />

                    <ArrayField
                      label="Test Centers"
                      name="testCenters"
                      value={formData.testCenters}
                      onChange={handleInputChange}
                      placeholder="Kigali Convention Center, Huye Campus"
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ArrayField
                      label="Requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="High school diploma, Valid ID"
                      disabled={loading}
                    />

                    <ArrayField
                      label="Recommended For"
                      name="recommendedFor"
                      value={formData.recommendedFor}
                      onChange={handleInputChange}
                      placeholder="All university applicants, International students"
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ArrayField
                      label="Topics Covered"
                      name="topics"
                      value={formData.topics}
                      onChange={handleInputChange}
                      placeholder="Mathematics, English, Science, General Knowledge"
                      disabled={loading}
                    />

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Featured Exam
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          disabled={loading}
                          className="h-5 w-5 text-blue-600 rounded mr-3"
                        />
                        <label className="text-gray-700">
                          Mark as featured exam (shown prominently)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <FormField
                      label="Image URL"
                      name="image"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <TextareaField
                    label="Description"
                    name="description"
                    required
                    placeholder="Comprehensive test covering all major subject areas for university admissions..."
                    value={formData.description}
                    onChange={handleInputChange}
                    error={errors.description}
                    disabled={loading}
                    rows={4}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <SaveIcon className="h-5 w-5 mr-2" />
                        {isEditMode ? "Update Exam" : "Create Exam"}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {openViewDialog && selectedExam && (
        <>
          <ModalBackdrop onClose={handleCloseViewDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden my-4">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Exam Details
                </h2>
                <button
                  onClick={handleCloseViewDialog}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="space-y-6">
                  {/* Exam Header */}
                  <div className="relative">
                    <img
                      src={selectedExam.image}
                      alt={selectedExam.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(selectedExam.registrationStatus)}
                    </div>
                    {selectedExam.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        FEATURED EXAM
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {selectedExam.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <SchoolIcon className="w-5 h-5 mr-2 text-blue-500" />
                        {selectedExam.type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <GradeIcon className="w-5 h-5 mr-2 text-orange-500" />
                        {getDifficultyBadge(selectedExam.difficulty)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <PaidIcon className="w-5 h-5 mr-2 text-green-500" />
                        {selectedExam.fee}
                      </div>
                    </div>
                    <p className="text-gray-700">{selectedExam.description}</p>
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <ScheduleIcon className="w-5 h-5 mr-2 text-blue-500" />
                        Exam Schedule
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            Next Exam Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.nextExamDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Registration Deadline
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.registrationDeadline}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <AssessmentIcon className="w-5 h-5 mr-2 text-green-500" />
                        Exam Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Passing Score</p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.passingScore}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Preparation Time
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.preparationTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Levels</p>
                          <p className="font-medium text-gray-900">
                            {selectedExam.levels.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements & Topics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <BookIcon className="w-5 h-5 mr-2 text-purple-500" />
                        Requirements
                      </h4>
                      <ul className="space-y-1">
                        {selectedExam.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <QuizIcon className="w-5 h-5 mr-2 text-orange-500" />
                        Topics Covered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedExam.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Test Centers & Recommended For */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <LocationIcon className="w-5 h-5 mr-2 text-blue-500" />
                        Test Centers
                      </h4>
                      <ul className="space-y-1">
                        {selectedExam.testCenters.map((center, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <LocationIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {center}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <PersonIcon className="w-5 h-5 mr-2 text-green-500" />
                        Recommended For
                      </h4>
                      <ul className="space-y-1">
                        {selectedExam.recommendedFor.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <PersonIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <button
                    onClick={() => {
                      handleCloseViewDialog();
                      handleEdit(selectedExam);
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  >
                    <EditIcon className="h-5 w-5 mr-2" />
                    Edit Exam
                  </button>
                </div>
                <button
                  onClick={handleCloseViewDialog}
                  className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && selectedExam && (
        <>
          <ModalBackdrop onClose={handleCloseDeleteDialog} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <WarningIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Exam
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete the exam{" "}
                  <span className="font-semibold text-gray-900">
                    "{selectedExam.name}"
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex">
                    <ErrorIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> Deleting this exam will remove
                        all associated data including registrations and results.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseDeleteDialog}
                    className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`px-4 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg"
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <DeleteIcon className="h-5 w-5 mr-2" />
                        Delete Exam
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
