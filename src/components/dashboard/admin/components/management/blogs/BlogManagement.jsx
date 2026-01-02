/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingIcon,
  Archive as ArchiveIcon,
  Refresh as RefreshIcon,
  CheckCircle as PublishedIcon,
  Schedule as DraftIcon,
  Error as ErrorIcon,
  PictureAsPdf as PDFIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Crop as CropIcon,
  MoreVert as MoreIcon,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Link,
  InsertPhoto,
  Title,
  FormatSize,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Code,
  FormatClear,
  DeleteForever as DeleteForeverIcon,
  RestoreFromTrash as RestoreIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Sidebar } from "../../sidebars/Sidebar";

// Create axios instance with base configuration
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://ruziganodejs.onrender.com", // Change to your backend URL
    timeout: 30000,
  });

  // Add request interceptor to include token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create axios instance
const api = createAxiosInstance();

// Image upload service
const imageApi = {
  // Upload single image
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/blogs/admin/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  },

  // Upload multiple images
  async uploadMultipleImages(files) {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('images', file);
      });

      const response = await api.post('/blogs/admin/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  },
};

// Blog API service functions
const blogApi = {
  // Get all blogs
  async getBlogs(page = 1, limit = 100, category = '', search = '') {
    try {
      let url = `/blogs?page=${page}&limit=${limit}`;
      if (category && category !== 'all') url += `&category=${category}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      
      const response = await api.get(url);
    //   console.log('Fetched blogs:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw new Error(error.response?.data?.message || "Failed to fetch blogs");
    }
  },

  // Get blog by ID
  async getBlogById(id) {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch blog");
    }
  },

  // Create blog
  async createBlog(formData) {
    try {
      const response = await api.post('/blogs/admin/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Created blog:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to create blog");
    }
  },

  // Update blog
  async updateBlog(id, formData) {
    try {
      const response = await api.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to update blog");
    }
  },

  // Update only blog image
  async updateBlogImage(id, imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.put(`/blogs/admin/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update image");
    }
  },

  // Archive blog (soft delete)
  async deleteBlog(id) {
    try {
      const response = await api.delete(`/blogs/admin/${id}/archive`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to archive blog");
    }
  },

  // Hard delete blog
  async hardDeleteBlog(id) {
    try {
      const response = await api.delete(`/blogs/admin/${id}/permanent`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete blog permanently");
    }
  },

  // Get blog statistics
  async getBlogStats() {
    try {
      const response = await api.get("/blogs/statistics");
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        success: true,
        data: {
          stats: [],
          totalViews: 0,
          total: 0,
          published: 0,
          draft: 0,
          archived: 0,
          trending: 0,
        }
      };
    }
  },

  // Get trending blogs
  async getTrendingBlogs() {
    try {
      const response = await api.get("/blogs/trending");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch trending blogs");
    }
  },

  // Like a blog
  async likeBlog(id) {
    try {
      const response = await api.post(`/blogs/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to like blog");
    }
  },

  // Search blogs
  async searchBlogs(query) {
    try {
      const response = await api.get(`/blogs?search=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to search blogs");
    }
  },
};

// Statistics Card Component
const StatisticsCard = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    red: "bg-red-50 text-red-600 border-red-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`${colorClasses[color]} rounded-xl p-4 sm:p-6 shadow-sm border transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">{value.toLocaleString()}</h3>
          {trend !== undefined && (
            <div
              className={`mt-2 text-sm ${
                trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-gray-600"
              }`}
            >
              {trend > 0 ? "↗" : trend < 0 ? "↘" : "→"} {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color].split(' ')[0]} bg-opacity-30`}>
          {React.cloneElement(icon, { fontSize: "large" })}
        </div>
      </div>
    </motion.div>
  );
};

// Simple Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder = "Write your content here..." }) => {
  const editorRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      document.execCommand('insertHTML', false, link);
      setLinkUrl("");
      setLinkText("");
      setShowLinkInput(false);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const img = `<img src="${url}" alt="Inserted image" class="max-w-full h-auto my-2" />`;
      document.execCommand('insertHTML', false, img);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const toolbarButtons = [
    { command: "bold", icon: <FormatBold fontSize="small" />, title: "Bold" },
    { command: "italic", icon: <FormatItalic fontSize="small" />, title: "Italic" },
    { command: "underline", icon: <FormatUnderlined fontSize="small" />, title: "Underline" },
    { separator: true },
    { command: "insertUnorderedList", icon: <FormatListBulleted fontSize="small" />, title: "Bullet List" },
    { command: "insertOrderedList", icon: <FormatListNumbered fontSize="small" />, title: "Numbered List" },
    { separator: true },
    { action: "formatBlock", value: "<h1>", icon: <Title fontSize="small" />, title: "Heading 1" },
    { action: "formatBlock", value: "<h2>", icon: <FormatSize fontSize="small" />, title: "Heading 2" },
    { action: "formatBlock", value: "<blockquote>", icon: <FormatQuote fontSize="small" />, title: "Quote" },
    { separator: true },
    { action: "link", icon: <Link fontSize="small" />, title: "Insert Link" },
    { action: "image", icon: <InsertPhoto fontSize="small" />, title: "Insert Image" },
    { separator: true },
    { command: "justifyLeft", icon: <FormatAlignLeft fontSize="small" />, title: "Align Left" },
    { command: "justifyCenter", icon: <FormatAlignCenter fontSize="small" />, title: "Align Center" },
    { command: "justifyRight", icon: <FormatAlignRight fontSize="small" />, title: "Align Right" },
    { separator: true },
    { command: "removeFormat", icon: <FormatClear fontSize="small" />, title: "Clear Formatting" },
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
        {toolbarButtons.map((btn, index) => {
          if (btn.separator) {
            return <div key={`sep-${index}`} className="w-px h-6 bg-gray-300 mx-1" />;
          }
          
          return (
            <button
              key={btn.command || btn.action}
              type="button"
              onClick={() => {
                if (btn.action === 'link') {
                  setShowLinkInput(!showLinkInput);
                } else if (btn.action === 'image') {
                  handleInsertImage();
                } else if (btn.action === 'formatBlock') {
                  handleFormat('formatBlock', btn.value);
                } else {
                  handleFormat(btn.command);
                }
              }}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title={btn.title}
            >
              {btn.icon}
            </button>
          );
        })}
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="p-3 bg-gray-100 border-b">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Link Text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleInsertLink}
              className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Insert Link
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[256px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.target.innerHTML)}
        placeholder={placeholder}
      />
    </div>
  );
};

// Blog Card Component for Grid View
const BlogCard = ({ blog, onEdit, onDelete, onHardDelete, onRestore }) => {
  const getStatusBadge = (status) => {
    const badges = {
      published: {
        icon: <PublishedIcon className="w-4 h-4" />,
        color: "bg-green-100 text-green-800",
        label: "Published"
      },
      draft: {
        icon: <DraftIcon className="w-4 h-4" />,
        color: "bg-yellow-100 text-yellow-800",
        label: "Draft"
      },
      archived: {
        icon: <ArchiveIcon className="w-4 h-4" />,
        color: "bg-gray-100 text-gray-800",
        label: "Archived"
      },
    };
    const badge = badges[status] || {
      icon: <ErrorIcon className="w-4 h-4" />,
      color: "bg-red-100 text-red-800",
      label: "Unknown"
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
      >
        {badge.icon}
        <span className="ml-1">{badge.label}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.image?.url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {blog.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <TrendingIcon className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-800 line-clamp-1">{blog.title}</h3>
          <div className="flex-shrink-0">
            {getStatusBadge(blog.status)}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
            >
              {tag}
            </span>
          ))}
          {blog.tags?.length > 2 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              +{blog.tags.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <ViewIcon className="w-4 h-4 mr-1" />
              {blog.views || 0}
            </span>
            <span className="flex items-center">
              <TrendingIcon className="w-4 h-4 mr-1" />
              {blog.likes || 0}
            </span>
          </div>
          <span className="text-xs">
            {format(new Date(blog.createdAt), "MMM dd, yyyy")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(blog)}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Edit"
          >
            <EditIcon className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
            className="text-green-600 hover:text-green-800 p-1"
            title="View"
          >
            <ViewIcon className="w-5 h-5" />
          </motion.button>
          
          {blog.status === 'archived' ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRestore(blog._id)}
                className="text-green-600 hover:text-green-800 p-1"
                title="Restore"
              >
                <RestoreIcon className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onHardDelete(blog._id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete Permanently"
              >
                <DeleteForeverIcon className="w-5 h-5" />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(blog._id)}
              className="text-red-600 hover:text-red-800 p-1"
              title="Archive"
            >
              <ArchiveIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Blog List Item Component for List View
const BlogListItem = ({ blog, onEdit, onDelete, onHardDelete, onRestore }) => {
  const getStatusBadge = (status) => {
    const badges = {
      published: {
        icon: <PublishedIcon className="w-4 h-4" />,
        color: "bg-green-100 text-green-800",
        label: "Published"
      },
      draft: {
        icon: <DraftIcon className="w-4 h-4" />,
        color: "bg-yellow-100 text-yellow-800",
        label: "Draft"
      },
      archived: {
        icon: <ArchiveIcon className="w-4 h-4" />,
        color: "bg-gray-100 text-gray-800",
        label: "Archived"
      },
    };
    const badge = badges[status] || {
      icon: <ErrorIcon className="w-4 h-4" />,
      color: "bg-red-100 text-red-800",
      label: "Unknown"
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
      >
        {badge.icon}
        <span className="ml-1">{badge.label}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Image */}
        <div className="w-full md:w-32 h-32 md:h-auto mb-4 md:mb-0 md:mr-4">
          <img
            src={blog.image?.url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{blog.title}</h3>
              {blog.featured && (
                <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">
                  <TrendingIcon className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
              {getStatusBadge(blog.status)}
            </div>
            <div className="text-sm text-gray-500 mt-2 md:mt-0">
              {format(new Date(blog.createdAt), "MMM dd, yyyy")}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.tags?.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
              >
                {tag}
              </span>
            ))}
            {blog.tags?.length > 4 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                +{blog.tags.length - 4}
              </span>
            )}
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3 sm:mb-0">
              <span className="flex items-center">
                <ViewIcon className="w-4 h-4 mr-1" />
                {blog.views || 0} views
              </span>
              <span className="flex items-center">
                <TrendingIcon className="w-4 h-4 mr-1" />
                {blog.likes || 0} likes
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(blog)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit"
              >
                <EditIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                className="text-green-600 hover:text-green-800 p-1"
                title="View"
              >
                <ViewIcon className="w-5 h-5" />
              </motion.button>
              
              {blog.status === 'archived' ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRestore(blog._id)}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Restore"
                  >
                    <RestoreIcon className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onHardDelete(blog._id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete Permanently"
                  >
                    <DeleteForeverIcon className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(blog._id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Archive"
                >
                  <ArchiveIcon className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Blog Display Component (Grid/List)
const BlogDisplay = ({ 
  blogs, 
  onEdit, 
  onDelete, 
  onHardDelete, 
  onRestore, 
  loading, 
  viewMode,
  currentPage,
  totalPages,
  onPageChange 
}) => {
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No blogs found</h3>
        <p className="mt-1 text-gray-500">
          Get started by creating your first blog post.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {currentBlogs.map((blog, index) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onEdit={onEdit}
              onDelete={onDelete}
              onHardDelete={onHardDelete}
              onRestore={onRestore}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentBlogs.map((blog, index) => (
            <BlogListItem
              key={blog._id}
              blog={blog}
              onEdit={onEdit}
              onDelete={onDelete}
              onHardDelete={onHardDelete}
              onRestore={onRestore}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, blogs.length)} of {blogs.length} blogs
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Blog Form Component (same as before, keep it as is)
const BlogForm = ({ blog, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "education",
    tags: "",
    author: "",
    featured: false,
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "education",
        tags: blog.tags?.join(", ") || "",
        author: blog.author || "",
        featured: blog.featured || false,
        status: blog.status || "draft",
      });
      if (blog.image?.url) {
        setImagePreview(blog.image.url);
      }
    }
  }, [blog]);

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "other", label: "Other" },
  ];

  const statuses = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }
    if (formData.excerpt.length > 200) {
      newErrors.excerpt = "Excerpt must be 200 characters or less";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, GIF, and WebP images are allowed");
      return;
    }

    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // Create FormData
      const submitFormData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (key === 'tags' && formData[key]) {
          // Convert tags string to array
          const tagsArray = formData[key]
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);
          submitFormData.append(key, JSON.stringify(tagsArray));
        } else if (key === 'featured') {
          submitFormData.append(key, formData[key] ? 'true' : 'false');
        } else {
          submitFormData.append(key, formData[key]);
        }
      });
      
      // Add image file if exists
      if (imageFile) {
        submitFormData.append('image', imageFile);
      } else if (blog?.image?.url && !imagePreview) {
        // If editing and image was removed, send imageUrl as empty
        submitFormData.append('imageUrl', '');
      } else if (imagePreview && !imageFile) {
        // If using existing image URL
        submitFormData.append('imageUrl', imagePreview);
      }

      await onSubmit(submitFormData, blog?._id);
      toast.success(blog ? "Blog updated successfully" : "Blog created successfully");
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {blog ? "Update your blog post details" : "Fill in the details to create a new blog post"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter blog title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.excerpt ? 'border-red-500' : ''
                  }`}
                  placeholder="Brief summary of your blog post (max 200 characters)"
                />
                <div className="flex justify-between mt-1">
                  {errors.excerpt ? (
                    <p className="text-sm text-red-600">{errors.excerpt}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Keep it concise and engaging
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {formData.excerpt.length}/200
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="space-y-4">
                  {/* Image Preview */}
                  {(imagePreview || (blog?.image?.url && !imageFile)) && (
                    <div className="relative">
                      <img
                        src={imagePreview || blog.image.url}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                        disabled={loading}
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                      disabled={loading}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        loading 
                          ? 'border-gray-300 bg-gray-50' 
                          : 'border-gray-300 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <CloudUploadIcon 
                        className={`mb-2 ${loading ? 'text-gray-400' : 'text-gray-400'}`} 
                        fontSize="large" 
                      />
                      <span className={`text-sm ${loading ? 'text-gray-400' : 'text-gray-600'}`}>
                        {loading ? 'Uploading...' : 'Click to upload image'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF, WebP up to 5MB
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="education, study-abroad, tips"
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate tags with commas
                </p>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.author ? 'border-red-500' : ''
                  }`}
                  placeholder="Author name"
                  disabled={loading}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              {/* Featured & Status */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    disabled={loading}
                    id="featured-checkbox"
                  />
                  <label htmlFor="featured-checkbox" className="ml-2 text-sm text-gray-700">
                    Mark as featured (will appear in trending)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    disabled={loading}
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  {blog ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <SaveIcon className="mr-2" fontSize="small" />
                  {blog ? "Update Blog" : "Create Blog"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Loading blog dashboard...</p>
    </div>
  </div>
);

// Main BlogManagement Component
export const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    trending: 0,
    totalViews: 0,
  });
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Calculate total pages based on 8 items per page
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs when search, category, or status changes
  useEffect(() => {
    filterBlogs();
  }, [searchTerm, selectedCategory, selectedStatus, blogs]);

  useEffect(() => {
    fetchStats();
  }, [filteredBlogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getBlogs(1, 100);
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error(error.message || "Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await blogApi.getBlogStats();
      const statsData = response.data;
      
      // Calculate stats from filtered blogs
      const total = filteredBlogs.length;
      const published = filteredBlogs.filter(b => b.status === "published").length;
      const draft = filteredBlogs.filter(b => b.status === "draft").length;
      const archived = filteredBlogs.filter(b => b.status === "archived").length;
      const trending = filteredBlogs.filter(b => b.featured).length;
      const totalViews = filteredBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

      setStats({ 
        total, 
        published, 
        draft, 
        archived, 
        trending,
        totalViews: statsData.totalViews || totalViews 
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use calculated stats
      calculateLocalStats();
    }
  };

  const calculateLocalStats = () => {
    const total = filteredBlogs.length;
    const published = filteredBlogs.filter((b) => b.status === "published").length;
    const draft = filteredBlogs.filter((b) => b.status === "draft").length;
    const archived = filteredBlogs.filter((b) => b.status === "archived").length;
    const trending = filteredBlogs.filter((b) => b.featured).length;
    const totalViews = filteredBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

    setStats({ total, published, draft, archived, trending, totalViews });
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((blog) => blog.status === selectedStatus);
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCreateOrUpdateBlog = async (formData, id = null) => {
    try {
      if (id) {
        // Update existing blog
        await blogApi.updateBlog(id, formData);
        toast.success("Blog updated successfully");
      } else {
        // Create new blog
        await blogApi.createBlog(formData);
        toast.success("Blog created successfully");
      }
      
      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      throw error;
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to archive this blog?")) return;

    try {
      await blogApi.deleteBlog(id);
      toast.success("Blog archived successfully");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Failed to archive blog");
    }
  };

  const handleHardDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this blog? This action cannot be undone.")) return;

    try {
      await blogApi.hardDeleteBlog(id);
      toast.success("Blog permanently deleted");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const handleRestoreBlog = async (id) => {
    try {
      // To restore, we need to update the blog status to published or draft
      const formData = new FormData();
      formData.append('status', 'published');
      
      await blogApi.updateBlog(id, formData);
      toast.success("Blog restored successfully");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Failed to restore blog");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterBlogs();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "other", label: "Other" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" },
  ];

  if (loading && blogs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* <Sidebar onToggleNotifications={toggleNotificationsModal} /> */}
        <div className="flex-1 p-4 md:p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your blog posts, categories, and content
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingBlog(null);
                  setShowForm(true);
                }}
                className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <AddIcon className="mr-2" fontSize="small" />
                New Blog Post
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <RefreshIcon className="mr-2" fontSize="small" />
                Clear Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <StatisticsCard
              title="Total Posts"
              value={stats.total}
              icon={<ViewIcon />}
              color="blue"
            />
            <StatisticsCard
              title="Published"
              value={stats.published}
              icon={<PublishedIcon />}
              color="green"
            />
            <StatisticsCard
              title="Drafts"
              value={stats.draft}
              icon={<DraftIcon />}
              color="yellow"
            />
            <StatisticsCard
              title="Archived"
              value={stats.archived}
              icon={<ArchiveIcon />}
              color="gray"
            />
            <StatisticsCard
              title="Total Views"
              value={stats.totalViews}
              icon={<TrendingIcon />}
              color="purple"
            />
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border p-4 mb-6"
          >
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Blogs
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View Mode
                  </label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 py-2.5 flex items-center justify-center transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <GridViewIcon className="mr-2" fontSize="small" />
                      Grid
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`flex-1 py-2.5 flex items-center justify-center transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ListViewIcon className="mr-2" fontSize="small" />
                      List
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <SearchIcon className="mr-2" fontSize="small" />
                    Search
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Blog Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
                Blog Posts ({filteredBlogs.length})
              </h2>
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>
            
            <BlogDisplay
              blogs={filteredBlogs}
              onEdit={(blog) => {
                setEditingBlog(blog);
                setShowForm(true);
              }}
              onDelete={handleDeleteBlog}
              onHardDelete={handleHardDeleteBlog}
              onRestore={handleRestoreBlog}
              loading={loading}
              viewMode={viewMode}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>

          {/* Blog Form Modal */}
          <AnimatePresence>
            {showForm && (
              <BlogForm
                blog={editingBlog}
                onClose={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                }}
                onSubmit={handleCreateOrUpdateBlog}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};