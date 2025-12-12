/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LanguageIcon from '@mui/icons-material/Language';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ArrowForwardIosOutlined } from '@mui/icons-material';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api'; // Replace with your API URL

export const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    date: '',
    message: ''
  });
  const [viewCounts, setViewCounts] = useState({});
  const hasTrackedView = useRef(false);

  const blogCategories = [
    { id: 'all', name: 'All Articles', icon: MenuBookIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'admissions', name: 'Admissions', icon: SchoolIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'visa', name: 'Visa Guide', icon: DescriptionIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'accommodation', name: 'Accommodation', icon: HotelIcon, color: 'from-orange-500 to-red-500' },
    { id: 'travel', name: 'Travel Tips', icon: FlightIcon, color: 'from-indigo-500 to-blue-500' },
    { id: 'culture', name: 'Culture', icon: PeopleIcon, color: 'from-teal-500 to-green-500' }
  ];

  // Track view when component loads
  useEffect(() => {
    if (!hasTrackedView.current) {
      trackView();
      hasTrackedView.current = true;
    }
  }, []);

  // Track view function
  const trackView = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/track-view`, {
        page: 'blog',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('View tracked:', response.data);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  // Track specific post view
  const trackPostView = async (postId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/track-post-view`, {
        postId,
        timestamp: new Date().toISOString()
      });
      
      // Update local view count
      setViewCounts(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));
      
      return response.data;
    } catch (error) {
      console.error('Error tracking post view:', error);
    }
  };

  // Fetch posts from API (simulated)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPostsData = [
          {
            id: 1,
            title: "Complete Guide to University Admissions in China 2024",
            excerpt: "Everything you need to know about applying to Chinese universities, from document preparation to interview tips.",
            content: `<h2>Chinese University Admissions Guide</h2><p>Detailed content here...</p>`,
            author: "Dr. Zhang Wei",
            date: "Mar 15, 2024",
            readTime: "8 min read",
            category: "admissions",
            tags: ["China", "Admissions", "University", "Guide"],
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800",
            views: 1245,
            comments: 42,
            likes: 189
          },
        ];

        const generatedPosts = Array.from({ length: 30 }, (_, index) => ({
          id: index + 1,
          title: `University Admissions Guide ${index + 1}`,
          excerpt: `Everything you need to know about applying to Asian universities ${index + 1}`,
          content: `<h2>Guide ${index + 1}</h2><p>Content here...</p>`,
          author: "Expert Author",
          date: new Date(2024, 2, index + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
          category: ["admissions", "visa", "accommodation", "travel", "culture"][index % 5],
          tags: ["China", "Admissions", "Guide"],
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800",
          views: Math.floor(Math.random() * 2000) + 500,
          comments: Math.floor(Math.random() * 50) + 10,
          likes: Math.floor(Math.random() * 300) + 100
        }));

        const filtered = generatedPosts.filter(post => {
          const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
          const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchesCategory && matchesSearch;
        });

        const postsPerPage = 6;
        const startIndex = (currentPage - 1) * postsPerPage;
        const paginatedPosts = filtered.slice(startIndex, startIndex + postsPerPage);
        
        const total = Math.ceil(filtered.length / postsPerPage);
        
        setPosts(paginatedPosts);
        setTotalPages(total);

        const trending = [...generatedPosts]
          .sort((a, b) => b.views - a.views)
          .slice(0, 3);
        
        setTrendingPosts(trending);

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage, activeCategory, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast.info('Removed from saved articles');
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast.success('Article saved for later');
    }
  };

  const toggleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast.success('Liked article!');
    }
  };

  const handleViewPost = async (post) => {
    await trackPostView(post.id);
    setSelectedPost(post);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/book-service`, {
        ...bookingData,
        serviceType: 'blog_consultation',
        postTitle: selectedPost?.title,
        timestamp: new Date().toISOString()
      });

      toast.success('Booking request submitted successfully! We will contact you within 24 hours.');
      setBookingModalOpen(false);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        country: '',
        service: '',
        date: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error submitting booking. Please try again.');
      console.error('Booking error:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const newCommentObj = {
        id: Date.now(),
        author: 'Current User',
        content: newComment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0,
        userLiked: false
      };

      setCurrentComments([newCommentObj, ...currentComments]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Error adding comment');
      console.error('Comment error:', error);
    }
  };

  const handleCommentLike = (commentId) => {
    setCurrentComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1, userLiked: !comment.userLiked }
        : comment
    ));
  };

  const handleLoadComments = async (postId) => {
    try {
      const demoComments = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        author: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia', 'David Chen'][i],
        content: `This is a sample comment ${i + 1} about the article. Very informative!`,
        date: new Date(2024, 2, 15 - i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: Math.floor(Math.random() * 20),
        userLiked: false
      }));

      setCurrentComments(demoComments);
      setCommentsModalOpen(true);
    } catch (error) {
      toast.error('Error loading comments');
      console.error('Comments error:', error);
    }
  };

  const BlogCard = ({ post, variant = 'normal' }) => {
    const CategoryIcon = blogCategories.find(cat => cat.id === post.category)?.icon || MenuBookIcon;
    const isSaved = savedPosts.includes(post.id);
    const isLiked = likedPosts.includes(post.id);

    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer ${
          variant === 'featured' ? 'lg:col-span-2' : ''
        }`}
        onClick={() => handleViewPost(post)}
      >
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <div className={`px-2 sm:px-3 md:px-4 py-1 rounded-full text-white text-xs sm:text-sm font-bold bg-gradient-to-r ${
              blogCategories.find(cat => cat.id === post.category)?.color
            }`}>
              <span className="hidden xs:inline">{blogCategories.find(cat => cat.id === post.category)?.name}</span>
              <span className="xs:hidden">{blogCategories.find(cat => cat.id === post.category)?.name.split(' ')[0]}</span>
            </div>
          </div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-1 sm:space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSavePost(post.id);
              }}
              className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isSaved ? (
                <BookmarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              ) : (
                <BookmarkBorderIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLikePost(post.id);
              }}
              className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isLiked ? (
                <FavoriteIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              ) : (
                <FavoriteBorderIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-500">{post.date}</span>
              <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                <AccessTimeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <PersonIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm text-gray-600">{post.author}</span>
              </div>
              <div className="flex items-center">
                <VisibilityIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm text-gray-600">{(viewCounts[post.id] || post.views).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="text-blue-600 font-semibold text-sm sm:text-base flex items-center group/read">
              <span className="hidden xs:inline">Read More</span>
              <span className="xs:hidden">Read</span>
              <ArrowForwardIcon className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover/read:translate-x-1 sm:group-hover/read:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </motion.article>
    );
  };

  const BlogModal = () => {
    if (!selectedPost) return null;
    const CategoryIcon = blogCategories.find(cat => cat.id === selectedPost.category)?.icon || MenuBookIcon;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black bg-opacity-60"
        onClick={() => setSelectedPost(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${
                    blogCategories.find(cat => cat.id === selectedPost.category)?.color
                  }`}>
                    <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {blogCategories.find(cat => cat.id === selectedPost.category)?.name}
                  </span>
                  {trendingPosts.some(p => p.id === selectedPost.id) && (
                    <span className="px-2 py-1 sm:px-3 sm:py-1 bg-orange-100 text-orange-600 rounded-full text-xs sm:text-sm font-bold">
                      Trending
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{selectedPost.title}</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-5 w-5 sm:h-7 sm:w-7 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 p-3 sm:p-4 bg-gray-50 rounded-xl space-y-3 sm:space-y-0">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <div className="flex items-center">
                  <PersonIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-sm sm:text-base">{selectedPost.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarMonthIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">{selectedPost.date}</span>
                </div>
                <div className="flex items-center">
                  <AccessTimeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">{selectedPost.readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button className="flex items-center space-x-1 sm:space-x-2">
                  <VisibilityIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  <span className="text-sm sm:text-base">{(viewCounts[selectedPost.id] || selectedPost.views).toLocaleString()}</span>
                </button>
                <button 
                  onClick={() => handleLoadComments(selectedPost.id)}
                  className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors"
                >
                  <CommentIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  <span className="text-sm sm:text-base">{selectedPost.comments}</span>
                </button>
              </div>
            </div>

            <div className="mb-6 md:mb-8 rounded-xl overflow-hidden">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-40 sm:h-48 md:h-64 object-cover"
              />
            </div>

            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-6 md:mb-8"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                <TagIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-blue-50 text-blue-600 font-semibold text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button
                  onClick={() => toggleLikePost(selectedPost.id)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                    likedPosts.includes(selectedPost.id)
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {likedPosts.includes(selectedPost.id) ? (
                    <FavoriteIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <FavoriteBorderIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  <span>Like ({selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)})</span>
                </button>
                <button
                  onClick={() => toggleSavePost(selectedPost.id)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                    savedPosts.includes(selectedPost.id)
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {savedPosts.includes(selectedPost.id) ? (
                    <BookmarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <BookmarkBorderIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  <span>{savedPosts.includes(selectedPost.id) ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              <button 
                onClick={() => setBookingModalOpen(true)}
                className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const BookingModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black bg-opacity-60"
        onClick={() => setBookingModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Book Consultation</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Get expert advice for your study abroad journey</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                    placeholder="+1234567890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Country *
                  </label>
                  <select
                    required
                    value={bookingData.country}
                    onChange={(e) => setBookingData({...bookingData, country: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select a country</option>
                    <option value="china">China</option>
                    <option value="india">India</option>
                    <option value="japan">Japan</option>
                    <option value="south-korea">South Korea</option>
                    <option value="singapore">Singapore</option>
                    <option value="malaysia">Malaysia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    required
                    value={bookingData.service}
                    onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select service</option>
                    <option value="university-admissions">University Admissions</option>
                    <option value="visa-assistance">Visa Assistance</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="scholarship-guidance">Scholarship Guidance</option>
                    <option value="general-consultation">General Consultation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  rows="3"
                  value={bookingData.message}
                  onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const CommentsModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black bg-opacity-60"
        onClick={() => setCommentsModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Comments</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Latest comments on this article</p>
              </div>
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-gray-500" />
              </button>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  U
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base resize-none"
                    rows="2"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                      className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-xl flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                        newComment.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } transition-all duration-300`}
                    >
                      <SendIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {currentComments.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <CommentIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                currentComments.map((comment) => (
                  <div key={comment.id} className="p-3 sm:p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          {comment.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">{comment.author}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{comment.date}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {comment.userLiked ? (
                          <ThumbUpIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        ) : (
                          <ThumbUpOutlinedIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">{comment.content}</p>
                    <div className="flex space-x-3 sm:space-x-4 mt-2 pt-2 sm:pt-3 border-t border-gray-100">
                      <button className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        Reply
                      </button>
                      <button className="text-xs sm:text-sm text-gray-500 hover:text-red-600 transition-colors">
                        Report
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const TrendingPostItem = ({ post, index }) => {
    const CategoryIcon = blogCategories.find(cat => cat.id === post.category)?.icon || MenuBookIcon;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index }}
        className="pb-4 sm:pb-6 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
        onClick={() => handleViewPost(post)}
      >
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="text-xl sm:text-2xl font-bold text-gray-300 min-w-6 sm:min-w-8">{index + 1}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
              <div className="p-1 bg-gray-100 rounded">
                <CategoryIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase">
                {blogCategories.find(cat => cat.id === post.category)?.name}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2">
              {post.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 flex items-center">
                <CalendarMonthIcon className="h-3 w-3 mr-1" />
                {post.date}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <VisibilityIcon className="h-3 w-3 mr-1" />
                {post.views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const Pagination = () => {
    const pagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`p-1.5 sm:p-2 rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FirstPageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1.5 sm:p-2 rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowBackIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold text-sm sm:text-base ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1.5 sm:p-2 rounded-lg ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowForwardIosOutlined className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-1.5 sm:p-2 rounded-lg ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LastPageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        
        <span className="ml-2 sm:ml-4 text-gray-600 text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 relative"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            className="relative inline-block"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 inline-block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ staggerChildren: 0.05 }}
                className="inline-block"
              >
                {"Study Abroad Insights".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 origin-left transform -skew-x-12"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl md:max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-10 leading-relaxed px-2"
          >
            Expert guides, tips, and stories for students pursuing education in
            <motion.span 
              initial={{ backgroundSize: "0% 100%" }}
              animate={{ backgroundSize: "100% 100%" }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold mx-1 sm:mx-2"
              style={{
                backgroundImage: "linear-gradient(to right, #10b981, #3b82f6)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                transition: "background-size 1.5s ease-in-out"
              }}
            >
              China, India, Japan, Korea, and Southeast Asia
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="relative max-w-2xl mx-auto px-2">
            <SearchIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, guides, and tips..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
            <button className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors">
              <FilterListIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {blogCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 text-xs sm:text-sm md:text-base ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg sm:shadow-xl`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 sm:border-2 hover:border-blue-300'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="whitespace-nowrap">{category.name}</span>
                  {activeCategory === category.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 px-2 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                Latest Articles
                <span className="text-blue-600 ml-2 sm:ml-3 text-lg sm:text-xl">({posts.length} of {currentPage * 6})</span>
              </h2>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <select className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-1 sm:focus:ring-2 focus:ring-blue-200 text-sm sm:text-base">
                  <option>Latest</option>
                  <option>Popular</option>
                  <option>Trending</option>
                </select>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <SearchIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  {posts.map((post, index) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </motion.div>

                <Pagination />
              </>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <TrendingUpIcon className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                Trending Now
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {trendingPosts.map((post, index) => (
                  <TrendingPostItem key={post.id} post={post} index={index} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Browse by Category</h3>
              <div className="space-y-3 sm:space-y-4">
                {blogCategories.slice(1).map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setCurrentPage(1);
                      }}
                      className="flex items-center justify-between w-full p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">{category.name}</span>
                      </div>
                      <span className="bg-white/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">Get weekly study abroad tips and university updates</p>
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                />
                <button 
                  onClick={() => toast.success('Subscribed to newsletter!')}
                  className="w-full py-2.5 sm:py-3 bg-white text-green-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {selectedPost && <BlogModal />}
      {bookingModalOpen && <BookingModal />}
      {commentsModalOpen && <CommentsModal />}
    </div>
  );
};