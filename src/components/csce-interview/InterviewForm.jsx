/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import {
  Description, Business, Today, Category,
  School, Note, AttachFile, AddCircle,
  Delete, Send, Save, Cancel, Download,
  Visibility, VisibilityOff, History,
  FileCopy, Print, Email, Phone,
  LocationOn, AccessTime, CheckCircle,
  Error, Warning, ArrowBack, Settings,
  Share, CloudUpload, CloudDownload,
  Analytics, Person, Schedule, Star,
  StarBorder, Edit, DeleteForever,
  ContentCopy, Refresh, Help
} from '@mui/icons-material';

// ============ ALL MODELS INSIDE APP COMPONENT ============

// Main Interview Form Model
const createInitialFormData = () => ({
  id: `interview_${Date.now()}`,
  jobTitle: '',
  company: '',
  jobDescription: '',
  interviewDate: '',
  interviewType: 'technical',
  experienceLevel: 'mid',
  preparationStatus: 'not-started',
  notes: '',
  resumeVersion: '',
  salaryExpectation: '',
  location: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  questions: [
    createQuestion('Tell me about yourself', '', 'Behavioral', 'easy', true)
  ],
  tags: [],
  rating: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isFavorite: false
});

// Question Model
const createQuestion = (question = '', answer = '', category = 'Technical', difficulty = 'medium', isTemplate = false) => ({
  id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  question,
  answer,
  category,
  difficulty,
  isTemplate,
  timeToAnswer: '',
  priority: 'medium',
  resources: []
});

// Configuration Models
const interviewTypes = [
  { value: 'phone', label: 'Phone Screen', icon: 'call', color: 'blue' },
  { value: 'video', label: 'Video Call', icon: 'videocam', color: 'green' },
  { value: 'in-person', label: 'In-Person', icon: 'person', color: 'purple' },
  { value: 'technical', label: 'Technical', icon: 'code', color: 'orange' },
  { value: 'behavioral', label: 'Behavioral', icon: 'psychology', color: 'pink' },
  { value: 'panel', label: 'Panel Interview', icon: 'groups', color: 'red' },
  { value: 'group', label: 'Group Interview', icon: 'diversity_3', color: 'teal' }
];

const experienceLevels = [
  { value: 'intern', label: 'Intern', color: 'gray' },
  { value: 'entry', label: 'Entry Level (0-2 years)', color: 'blue' },
  { value: 'mid', label: 'Mid Level (2-5 years)', color: 'green' },
  { value: 'senior', label: 'Senior Level (5-8 years)', color: 'orange' },
  { value: 'lead', label: 'Lead (8-12 years)', color: 'purple' },
  { value: 'executive', label: 'Executive (12+ years)', color: 'red' }
];

const difficultyLevels = [
  { value: 'easy', label: 'Easy', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  { value: 'medium', label: 'Medium', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  { value: 'hard', label: 'Hard', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
];

const preparationStatuses = [
  { value: 'not-started', label: 'Not Started', color: 'gray', icon: 'radio_button_unchecked' },
  { value: 'research', label: 'Researching', color: 'blue', icon: 'search' },
  { value: 'in-progress', label: 'In Progress', color: 'orange', icon: 'hourglass_empty' },
  { value: 'review', label: 'Reviewing', color: 'purple', icon: 'rate_review' },
  { value: 'completed', label: 'Completed', color: 'green', icon: 'check_circle' }
];

const questionCategories = [
  'Technical Skills',
  'Behavioral',
  'Situational',
  'Cultural Fit',
  'Problem Solving',
  'Leadership',
  'Project Management',
  'Communication',
  'Analytical',
  'Creative Thinking',
  'Teamwork',
  'Adaptability',
  'Time Management',
  'Conflict Resolution'
];

const priorityLevels = [
  { value: 'low', label: 'Low Priority', color: 'gray' },
  { value: 'medium', label: 'Medium Priority', color: 'blue' },
  { value: 'high', label: 'High Priority', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' }
];

// Animation Config
const animationConfig = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  card: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 }
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
  }
};

// Sample Questions for Quick Add
const sampleQuestions = [
  createQuestion('Why do you want to work for our company?', '', 'Cultural Fit', 'medium', true),
  createQuestion('Describe a challenging project you worked on', '', 'Situational', 'hard', true),
  createQuestion('What are your greatest strengths and weaknesses?', '', 'Behavioral', 'medium', true),
  createQuestion('How do you handle tight deadlines?', '', 'Time Management', 'medium', true),
  createQuestion('Tell me about a time you failed', '', 'Behavioral', 'hard', true),
  createQuestion('Where do you see yourself in 5 years?', '', 'Career Goals', 'easy', true),
  createQuestion('How do you stay updated with technology?', '', 'Technical Skills', 'medium', true),
  createQuestion('Describe your ideal work environment', '', 'Cultural Fit', 'easy', true)
];

// Toast Configuration
const toastOptions = {
  position: 'top-right',
  duration: 4000,
  style: {
    background: '#363636',
    color: '#fff',
    fontWeight: '600',
    padding: '16px',
    borderRadius: '12px',
    maxWidth: '500px'
  },
  success: {
    duration: 3000,
    icon: '🎉',
    style: {
      background: '#10B981',
      color: '#fff'
    }
  },
  error: {
    duration: 4000,
    icon: '❌',
    style: {
      background: '#EF4444',
      color: '#fff'
    }
  },
  loading: {
    duration: 2000,
    style: {
      background: '#3B82F6',
      color: '#fff'
    }
  }
};

// Main App Component
export const InterviewForm = () => {
  const [formData, setFormData] = useState(createInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [submissions, setSubmissions] = useState([]);
  const [viewMode, setViewMode] = useState('edit'); // 'edit', 'preview', 'print'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('interview_draft');
    const savedSubmissions = localStorage.getItem('interview_submissions');
    
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      toast.success('Draft loaded from local storage');
    }
    
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.jobTitle || formData.company || formData.questions.length > 0) {
        localStorage.setItem('interview_draft', JSON.stringify(formData));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Save submissions
  const saveSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    localStorage.setItem('interview_submissions', JSON.stringify(newSubmissions));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  // Handle question changes
  const handleQuestionChange = (questionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  // Add new question
  const addQuestion = (question = null) => {
    const newQuestion = question || createQuestion();
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      updatedAt: new Date().toISOString()
    }));
    
    if (!question) {
      toast.success('New question added');
    }
  };

  // Remove question
  const removeQuestion = (questionId) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId),
        updatedAt: new Date().toISOString()
      }));
      toast.success('Question removed');
    } else {
      toast.error('At least one question is required');
    }
  };

  // Add sample questions
  const addSampleQuestions = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, ...sampleQuestions],
      updatedAt: new Date().toISOString()
    }));
    toast.success('Sample questions added');
  };

  // Clear all questions
  const clearAllQuestions = () => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setFormData(prev => ({
        ...prev,
        questions: [createQuestion()],
        updatedAt: new Date().toISOString()
      }));
      toast.success('All questions cleared');
    }
  };

  // Duplicate question
  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = formData.questions.find(q => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        isTemplate: false
      };
      addQuestion(duplicatedQuestion);
      toast.success('Question duplicated');
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setFormData(prev => ({
      ...prev,
      isFavorite: !prev.isFavorite,
      updatedAt: new Date().toISOString()
    }));
    toast.success(formData.isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  // Add tag
  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
        updatedAt: new Date().toISOString()
      }));
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
      updatedAt: new Date().toISOString()
    }));
  };

  // Set rating
  const setRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating,
      updatedAt: new Date().toISOString()
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.jobTitle.trim()) errors.push('Job title is required');
    if (!formData.company.trim()) errors.push('Company name is required');
    if (!formData.interviewDate) errors.push('Interview date is required');
    
    formData.questions.forEach((q, index) => {
      if (!q.question.trim()) errors.push(`Question ${index + 1} cannot be empty`);
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const submission = {
        ...formData,
        id: `sub_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      
      const newSubmissions = [submission, ...submissions];
      saveSubmissions(newSubmissions);
      
      setFormData(createInitialFormData());
      localStorage.removeItem('interview_draft');
      
      setIsSubmitting(false);
      toast.success('Interview preparation submitted successfully!');
      setActiveTab('history');
    }, 1500);
  };

  // Save draft
  const saveDraft = () => {
    localStorage.setItem('interview_draft', JSON.stringify(formData));
    toast.success('Draft saved successfully');
  };

  // Load draft
  const loadDraft = () => {
    const draft = localStorage.getItem('interview_draft');
    if (draft) {
      setFormData(JSON.parse(draft));
      toast.success('Draft loaded successfully');
    } else {
      toast.error('No draft found');
    }
  };

  // Reset form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
      setFormData(createInitialFormData());
      toast.success('Form reset successfully');
    }
  };

  // Export as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview_preparation_${formData.jobTitle || 'draft'}.json`;
    link.click();
    toast.success('Data exported as JSON');
  };

  // Import from JSON
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setFormData(importedData);
          toast.success('Data imported successfully');
        } catch (error) {
          toast.error('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Delete submission
  const deleteSubmission = (submissionId) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const newSubmissions = submissions.filter(s => s.id !== submissionId);
      saveSubmissions(newSubmissions);
      toast.success('Submission deleted');
    }
  };

  // Load submission into form
  const loadSubmission = (submission) => {
    setFormData(submission);
    setActiveTab('form');
    toast.success('Submission loaded for editing');
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const totalFields = 10 + formData.questions.length * 4;
    let completedFields = 0;
    
    // Basic fields
    if (formData.jobTitle) completedFields++;
    if (formData.company) completedFields++;
    if (formData.interviewDate) completedFields++;
    if (formData.jobDescription) completedFields++;
    if (formData.notes) completedFields++;
    if (formData.resumeVersion) completedFields++;
    if (formData.salaryExpectation) completedFields++;
    if (formData.location) completedFields++;
    if (formData.contactPerson) completedFields++;
    if (formData.contactEmail) completedFields++;
    
    // Questions
    formData.questions.forEach(q => {
      if (q.question) completedFields++;
      if (q.answer) completedFields++;
      if (q.category) completedFields++;
      if (q.difficulty) completedFields++;
    });
    
    return Math.round((completedFields / totalFields) * 100);
  };

  // Render Stars for rating
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className="text-2xl focus:outline-none"
      >
        {index < formData.rating ? (
          <Star className="text-yellow-500" />
        ) : (
          <StarBorder className="text-gray-300" />
        )}
      </button>
    ));
  };

  // Render Form View
  const renderFormView = () => (
    <motion.div
      initial={animationConfig.page.initial}
      animate={animationConfig.page.animate}
      transition={animationConfig.page.transition}
      className="space-y-6"
    >
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
            <p className="opacity-90">Prepare thoroughly for your upcoming interview</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleFavorite}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              {formData.isFavorite ? (
                <Star className="text-yellow-400" />
              ) : (
                <StarBorder />
              )}
            </button>
            <div className="text-center">
              <div className="text-2xl font-bold">{calculateCompletion()}%</div>
              <div className="text-sm opacity-80">Complete</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Preparation Progress</span>
            <span>{calculateCompletion()}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateCompletion()}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-green-400 to-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            <Save /> Save Draft
          </button>
          <button
            onClick={loadDraft}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
          >
            <CloudDownload /> Load Draft
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 cursor-pointer">
            <CloudUpload /> Import
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
          >
            <Download /> Export
          </button>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            <Refresh /> Reset
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Visibility /> Preview
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details Card */}
        <motion.div
          initial={animationConfig.card.initial}
          animate={animationConfig.card.animate}
          transition={{ ...animationConfig.card.transition, delay: 0.1 }}
          className="card bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Business className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
              <p className="text-gray-600">Basic information about the position</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Tech Innovations Inc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2 font-semibold">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder="Paste the complete job description here..."
              />
            </div>
          </div>
        </motion.div>

        {/* Interview Details Card */}
        <motion.div
          initial={animationConfig.card.initial}
          animate={animationConfig.card.animate}
          transition={{ ...animationConfig.card.transition, delay: 0.2 }}
          className="card bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <Schedule className="text-green-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Interview Details</h2>
              <p className="text-gray-600">Schedule and logistics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Interview Date & Time *
              </label>
              <input
                type="datetime-local"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Interview Type
              </label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleInputChange}
                className="input-field"
              >
                {interviewTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="input-field"
              >
                {experienceLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Preparation Status
              </label>
              <select
                name="preparationStatus"
                value={formData.preparationStatus}
                onChange={handleInputChange}
                className="input-field"
              >
                {preparationStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Salary Expectation
              </label>
              <input
                type="text"
                name="salaryExpectation"
                value={formData.salaryExpectation}
                onChange={handleInputChange}
                className="input-field"
                placeholder="$90,000 - $110,000"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Remote, New York, etc."
              />
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              {showAdvanced ? <VisibilityOff /> : <Visibility />}
              {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <Person fontSize="small" /> Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <Email fontSize="small" /> Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <Phone fontSize="small" /> Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add tag..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTag(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="px-3 py-1 border rounded-full text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Questions Card */}
        <motion.div
          initial={animationConfig.card.initial}
          animate={animationConfig.card.animate}
          transition={{ ...animationConfig.card.transition, delay: 0.3 }}
          className="card bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Help className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Preparation Questions</h2>
                <p className="text-gray-600">Prepare answers for potential questions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addSampleQuestions}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add Samples
              </button>
              <button
                type="button"
                onClick={clearAllQuestions}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={addQuestion}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <AddCircle />
                Add Question
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {formData.questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-purple-800 font-bold text-lg">Q{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Question {index + 1}</h3>
                      <p className="text-gray-600 text-sm">Category: {q.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={q.difficulty}
                      onChange={(e) => handleQuestionChange(q.id, 'difficulty', e.target.value)}
                      className={`px-3 py-1 rounded-lg border ${
                        difficultyLevels.find(d => d.value === q.difficulty)?.bgColor || ''
                      }`}
                    >
                      {difficultyLevels.map(diff => (
                        <option key={diff.value} value={diff.value}>
                          {diff.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => duplicateQuestion(q.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Duplicate"
                    >
                      <ContentCopy fontSize="small" />
                    </button>
                    {!q.isTemplate && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Delete fontSize="small" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Question *</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
                      required
                      rows={3}
                      className="input-field"
                      placeholder="Enter the interview question..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Category</label>
                    <select
                      value={q.category}
                      onChange={(e) => handleQuestionChange(q.id, 'category', e.target.value)}
                      className="input-field"
                    >
                      {questionCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Your Prepared Answer</label>
                  <textarea
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(q.id, 'answer', e.target.value)}
                    rows={6}
                    className="input-field"
                    placeholder="Write your prepared answer here. Be specific and provide examples..."
                  />
                </div>
                
                {q.isTemplate && (
                  <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                    <StarBorder fontSize="small" />
                    Sample question - edit as needed
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Information Card */}
        <motion.div
          initial={animationConfig.card.initial}
          animate={animationConfig.card.animate}
          transition={{ ...animationConfig.card.transition, delay: 0.4 }}
          className="card bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Note className="text-orange-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
              <p className="text-gray-600">Extra notes and documents</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Preparation Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={6}
                className="input-field"
                placeholder="Add research notes, company info, interviewer details, questions to ask, etc..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Resume Version
                </label>
                <input
                  type="text"
                  name="resumeVersion"
                  value={formData.resumeVersion}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Resume_v3_Frontend_2024.pdf"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Preparation Rating
                </label>
                <div className="flex items-center gap-2">
                  {renderStars()}
                  <span className="ml-2 text-gray-600">
                    ({formData.rating}/5)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center gap-3 shadow-xl"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
                Submitting...
              </>
            ) : (
              <>
                <Send />
                Submit Interview Preparation
              </>
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );

  // Render Preview View
  const renderPreviewView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Preview Mode</h2>
          <button
            onClick={() => setViewMode('edit')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <ArrowBack />
            Back to Edit
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Preview content would go here */}
          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Preview Content</h3>
            <p>This is a preview of how your interview preparation will look.</p>
            {/* Add detailed preview here */}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Render History View
  const renderHistoryView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <History className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Submission History</h2>
            <p className="text-gray-600">View and manage your past submissions</p>
          </div>
        </div>
        
        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <History className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No submissions yet</h3>
            <p className="text-gray-500 mb-6">Submit your first interview preparation to see it here</p>
            <button
              onClick={() => setActiveTab('form')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Go to Form
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-800 text-lg">{sub.jobTitle}</h4>
                      {sub.isFavorite && <Star className="text-yellow-500" />}
                    </div>
                    <p className="text-gray-600">{sub.company}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {interviewTypes.find(t => t.value === sub.interviewType)?.label || sub.interviewType}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {sub.questions?.length || 0} questions
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadSubmission(sub)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => deleteSubmission(sub.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <DeleteForever />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  // Render Settings View
  const renderSettingsView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Data Management</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  localStorage.clear();
                  setFormData(createInitialFormData());
                  setSubmissions([]);
                  toast.success('All data cleared');
                }}
                className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
              >
                Clear All Data
              </button>
              <button
                onClick={exportData}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
              >
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-6">
      <Toaster toastOptions={toastOptions} />
      
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Description />
              Preparation Form
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History />
              History ({submissions.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings />
              Settings
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Auto-save: {formData.updatedAt ? new Date(formData.updatedAt).toLocaleTimeString() : 'Never'}
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'preview' ? (
          renderPreviewView()
        ) : activeTab === 'form' ? (
          renderFormView()
        ) : activeTab === 'history' ? (
          renderHistoryView()
        ) : (
          renderSettingsView()
        )}

        {/* Footer Stats */}
        {(activeTab === 'form' && viewMode === 'edit') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{formData.questions.length}</div>
              <div className="text-gray-600 text-sm">Total Questions</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formData.questions.filter(q => q.answer.trim().length > 50).length}
              </div>
              <div className="text-gray-600 text-sm">Answered</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{calculateCompletion()}%</div>
              <div className="text-gray-600 text-sm">Completion</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formData.rating}/5
              </div>
              <div className="text-gray-600 text-sm">Rating</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

