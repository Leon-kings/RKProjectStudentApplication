// /* eslint-disable no-case-declarations */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// // Material Icons
// import HomeIcon from '@mui/icons-material/Home';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import SchoolIcon from '@mui/icons-material/School';
// import EuroIcon from '@mui/icons-material/Euro';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import BedIcon from '@mui/icons-material/Bed';
// import BathtubIcon from '@mui/icons-material/Bathtub';
// import WifiIcon from '@mui/icons-material/Wifi';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import SecurityIcon from '@mui/icons-material/Security';
// import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MapIcon from '@mui/icons-material/Map';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import SortIcon from '@mui/icons-material/Sort';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import DownloadIcon from '@mui/icons-material/Download';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import GroupsIcon from '@mui/icons-material/Groups';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SpeedIcon from '@mui/icons-material/Speed';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// import PublicIcon from '@mui/icons-material/Public';
// import BusinessIcon from '@mui/icons-material/Business';
// import WorkIcon from '@mui/icons-material/Work';
// import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import GavelIcon from '@mui/icons-material/Gavel';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ChecklistIcon from '@mui/icons-material/Checklist';
// import ScheduleIcon from '@mui/icons-material/Schedule';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import QuizIcon from '@mui/icons-material/Quiz';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import { FlightTakeoff, SupportAgent } from '@mui/icons-material';

// // API Configuration
// const API_BASE_URL = 'https://your-api-server.com/api';

// export const Accommodation = () => {
//   // State Management
//   const [accommodations, setAccommodations] = useState([]);
//   const [filteredAccommodations, setFilteredAccommodations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedAccommodation, setSelectedAccommodation] = useState(null);
//   const [savedAccommodations, setSavedAccommodations] = useState([]);
//   const [bookingModalOpen, setBookingModalOpen] = useState(false);
//   const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     country: '',
//     city: '',
//     type: '',
//     priceRange: '',
//     distance: '',
//     amenities: []
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('price');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [accommodationsPerPage] = useState(9);
//   const [activeTab, setActiveTab] = useState('all');
//   const [showPreDepartureGuide, setShowPreDepartureGuide] = useState(false);
//   const [currentCountry, setCurrentCountry] = useState('');

//   // Booking form state
//   const [bookingForm, setBookingForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     nationality: '',
//     university: '',
//     course: '',
//     arrivalDate: '',
//     departureDate: '',
//     duration: '',
//     numberOfOccupants: '1',
//     specialRequirements: '',
//     emergencyContact: '',
//     preferredPayment: '',
//     additionalInfo: ''
//   });

//   // Countries
//   const countries = [
//     'All Countries',
//     'China',
//     'Canada',
//     'Germany',
//     'Poland',
//     'Turkey',
//     'USA',
//     'UK',
//     'Australia',
//     'Japan',
//     'South Korea',
//     'Singapore',
//     'Malaysia',
//     'France',
//     'Netherlands',
//     'Sweden',
//     'Switzerland',
//     'Italy',
//     'Spain',
//     'New Zealand',
//     'Ireland',
//     'Denmark',
//     'Norway',
//     'Finland'
//   ];

//   // Accommodation types
//   const accommodationTypes = [
//     'All Types',
//     'University Dormitory',
//     'Private Apartment',
//     'Shared Apartment',
//     'Homestay',
//     'Student Residence',
//     'Studio Apartment',
//     'Serviced Apartment'
//   ];

//   // Price ranges
//   const priceRanges = [
//     'All Prices',
//     'Budget (< $500/month)',
//     'Affordable ($500 - $1000/month)',
//     'Standard ($1000 - $1500/month)',
//     'Premium ($1500 - $2500/month)',
//     'Luxury (> $2500/month)'
//   ];

//   // Distance from university
//   const distances = [
//     'All Distances',
//     'On Campus',
//     'Walking Distance (< 15 min)',
//     'Short Commute (15-30 min)',
//     'Medium Commute (30-60 min)'
//   ];

//   // Amenities
//   const amenitiesList = [
//     'WiFi',
//     'Furnished',
//     'Kitchen',
//     'Laundry',
//     'AC/Heating',
//     'Cleaning Service',
//     'Security',
//     'Gym',
//     'Study Room',
//     'Parking',
//     'Pet Friendly',
//     'Balcony'
//   ];

//   // Featured accommodations
//   const featuredAccommodations = [
//     {
//       id: 1,
//       name: 'Beijing University Dormitory',
//       country: 'China',
//       city: 'Beijing',
//       university: 'Peking University',
//       type: 'University Dormitory',
//       price: '$350/month',
//       distance: 'On Campus',
//       rating: 4.2,
//       bedrooms: 'Single',
//       bathrooms: 'Shared',
//       amenities: ['WiFi', 'Furnished', 'Laundry', 'Study Room', 'Security'],
//       description: 'Modern on-campus dormitory for international students at Peking University. 24/7 security and student support services.',
//       features: ['24/7 Security', 'Student Community', 'Academic Support', 'Cafeteria Access'],
//       images: [
//         'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: 'Limited',
//       contractLength: '6-12 months',
//       deposit: '1 month rent',
//       utilitiesIncluded: 'Partial',
//       minimumStay: '6 months',
//       contact: 'university-housing@pkuedu.cn',
//       bookingLink: 'https://housing.pkuedu.cn'
//     },
//     {
//       id: 2,
//       name: 'Toronto Student Residence',
//       country: 'Canada',
//       city: 'Toronto',
//       university: 'University of Toronto',
//       type: 'Student Residence',
//       price: '$950/month',
//       distance: 'Walking Distance (< 15 min)',
//       rating: 4.5,
//       bedrooms: 'Shared (2-person)',
//       bathrooms: 'Private',
//       amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'Gym', 'Study Room'],
//       description: 'Modern student residence near University of Toronto with excellent amenities and international student community.',
//       features: ['Fully Furnished', 'All Utilities Included', 'Social Events', 'Study Areas'],
//       images: [
//         'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: 'Available',
//       contractLength: '4-12 months',
//       deposit: '$500',
//       utilitiesIncluded: 'Yes',
//       minimumStay: '4 months',
//       contact: 'info@utorontores.com',
//       bookingLink: 'https://utorontores.com'
//     },
//     {
//       id: 3,
//       name: 'Berlin Shared Apartment',
//       country: 'Germany',
//       city: 'Berlin',
//       university: 'Technical University of Berlin',
//       type: 'Shared Apartment',
//       price: '€550/month',
//       distance: 'Short Commute (15-30 min)',
//       rating: 4.0,
//       bedrooms: 'Private Room',
//       bathrooms: 'Shared',
//       amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'Balcony'],
//       description: 'Cozy shared apartment in Berlin with international roommates. Great location near public transport.',
//       features: ['International Roommates', 'Fully Equipped Kitchen', 'Monthly Cleaning', 'Bills Included'],
//       images: [
//         'https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: 'Available',
//       contractLength: 'Flexible',
//       deposit: '2 months rent',
//       utilitiesIncluded: 'Yes',
//       minimumStay: '3 months',
//       contact: 'berlin@student-accommodation.de',
//       bookingLink: 'https://student-accommodation.de'
//     }
//   ];

//   // Pre-departure checklist
//   const preDepartureChecklist = [
//     {
//       category: 'Before Departure',
//       items: [
//         { id: 1, name: 'Accommodation Booking Confirmation', completed: false },
//         { id: 2, name: 'Flight Tickets Booked', completed: false },
//         { id: 3, name: 'Travel Insurance Purchased', completed: false },
//         { id: 4, name: 'Visa/Study Permit Obtained', completed: false },
//         { id: 5, name: 'University Acceptance Letter', completed: false },
//       ]
//     },
//     {
//       category: 'Essential Documents',
//       items: [
//         { id: 6, name: 'Passport (6+ months validity)', completed: false },
//         { id: 7, name: 'Visa/Residence Permit', completed: false },
//         { id: 8, name: 'Academic Documents (translated)', completed: false },
//         { id: 9, name: 'Medical Records/Vaccination', completed: false },
//         { id: 10, name: 'International Driving License', completed: false },
//       ]
//     },
//     {
//       category: 'Financial Preparation',
//       items: [
//         { id: 11, name: 'Bank Account Setup', completed: false },
//         { id: 12, name: 'Currency Exchange', completed: false },
//         { id: 13, name: 'Credit/Debit Cards', completed: false },
//         { id: 14, name: 'Scholarship Documents', completed: false },
//         { id: 15, name: 'Emergency Funds', completed: false },
//       ]
//     }
//   ];

//   // Fetch accommodations data
//   useEffect(() => {
//     fetchAccommodations();
//   }, []);

//   // Apply filters when filters change
//   useEffect(() => {
//     applyFilters();
//   }, [filters, searchQuery, sortBy, accommodations]);

//   const fetchAccommodations = async () => {
//     setLoading(true);
//     try {
//       // Sample accommodation data
//       const sampleData = [
//         ...featuredAccommodations,
//         {
//           id: 4,
//           name: 'Warsaw University Hostel',
//           country: 'Poland',
//           city: 'Warsaw',
//           university: 'University of Warsaw',
//           type: 'University Dormitory',
//           price: '€280/month',
//           distance: 'On Campus',
//           rating: 3.8,
//           bedrooms: 'Double Room',
//           bathrooms: 'Shared',
//           amenities: ['WiFi', 'Furnished', 'Laundry', 'Study Room'],
//           description: 'Affordable on-campus accommodation for international students at University of Warsaw.',
//           features: ['Affordable Price', 'International Student Community', '24/7 Reception'],
//           images: [
//             'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Limited',
//           contractLength: '10 months',
//           deposit: '1 month rent',
//           utilitiesIncluded: 'Partial',
//           minimumStay: '10 months',
//           contact: 'hostel@uw.edu.pl',
//           bookingLink: 'https://hostel.uw.edu.pl'
//         },
//         {
//           id: 5,
//           name: 'Istanbul Student Apartment',
//           country: 'Turkey',
//           city: 'Istanbul',
//           university: 'Boğaziçi University',
//           type: 'Private Apartment',
//           price: '$400/month',
//           distance: 'Walking Distance (< 15 min)',
//           rating: 4.1,
//           bedrooms: 'Studio',
//           bathrooms: 'Private',
//           amenities: ['WiFi', 'Furnished', 'Kitchen', 'AC/Heating', 'Security'],
//           description: 'Modern studio apartment near Boğaziçi University with great city views.',
//           features: ['Fully Furnished Studio', 'Private Kitchen', 'Security System', 'City View'],
//           images: [
//             'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Available',
//           contractLength: '6-12 months',
//           deposit: '1 month rent',
//           utilitiesIncluded: 'No',
//           minimumStay: '6 months',
//           contact: 'istanbul@studentliving.com',
//           bookingLink: 'https://studentliving.com/istanbul'
//         },
//         {
//           id: 6,
//           name: 'Boston Homestay',
//           country: 'USA',
//           city: 'Boston',
//           university: 'Harvard University',
//           type: 'Homestay',
//           price: '$1200/month',
//           distance: 'Short Commute (15-30 min)',
//           rating: 4.7,
//           bedrooms: 'Private Room',
//           bathrooms: 'Shared',
//           amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'Meals Included'],
//           description: 'Cultural homestay experience with American family near Harvard University.',
//           features: ['Cultural Experience', 'Meals Included', 'Family Environment', 'Local Support'],
//           images: [
//             'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Limited',
//           contractLength: '3-12 months',
//           deposit: '$500',
//           utilitiesIncluded: 'Yes',
//           minimumStay: '3 months',
//           contact: 'homestay@harvard-support.com',
//           bookingLink: 'https://harvard-homestay.com'
//         },
//         {
//           id: 7,
//           name: 'London Student Halls',
//           country: 'UK',
//           city: 'London',
//           university: 'Imperial College London',
//           type: 'Student Residence',
//           price: '£1100/month',
//           distance: 'On Campus',
//           rating: 4.3,
//           bedrooms: 'En-suite',
//           bathrooms: 'Private',
//           amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'Gym', 'Study Room', 'Cleaning Service'],
//           description: 'Premium student residence at Imperial College London with all amenities included.',
//           features: ['En-suite Bathroom', 'Weekly Cleaning', 'Gym Access', 'Study Lounges'],
//           images: [
//             'https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Available',
//           contractLength: '12 months',
//           deposit: '1 month rent',
//           utilitiesIncluded: 'Yes',
//           minimumStay: '12 months',
//           contact: 'accommodation@imperial.ac.uk',
//           bookingLink: 'https://accommodation.imperial.ac.uk'
//         },
//         {
//           id: 8,
//           name: 'Sydney Serviced Apartment',
//           country: 'Australia',
//           city: 'Sydney',
//           university: 'University of Sydney',
//           type: 'Serviced Apartment',
//           price: '$1800/month',
//           distance: 'Walking Distance (< 15 min)',
//           rating: 4.6,
//           bedrooms: '1 Bedroom',
//           bathrooms: 'Private',
//           amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'AC/Heating', 'Cleaning Service', 'Gym', 'Pool'],
//           description: 'Luxury serviced apartment near University of Sydney with hotel-like amenities.',
//           features: ['Daily Cleaning', 'Concierge Service', 'Pool & Gym', 'Fully Equipped'],
//           images: [
//             'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Available',
//           contractLength: 'Flexible',
//           deposit: '2 weeks rent',
//           utilitiesIncluded: 'Yes',
//           minimumStay: '1 month',
//           contact: 'bookings@sydneyserviced.com',
//           bookingLink: 'https://sydneyserviced.com'
//         },
//         {
//           id: 9,
//           name: 'Tokyo Student Share House',
//           country: 'Japan',
//           city: 'Tokyo',
//           university: 'University of Tokyo',
//           type: 'Shared Apartment',
//           price: '¥80,000/month',
//           distance: 'Medium Commute (30-60 min)',
//           rating: 4.0,
//           bedrooms: 'Private Room',
//           bathrooms: 'Shared',
//           amenities: ['WiFi', 'Furnished', 'Kitchen', 'Laundry', 'Study Room'],
//           description: 'Traditional Japanese share house for international students in Tokyo.',
//           features: ['Cultural Exchange', 'Monthly Events', 'Study Support', 'Bilingual Staff'],
//           images: [
//             'https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: 'Limited',
//           contractLength: '6-12 months',
//           deposit: '1 month rent',
//           utilitiesIncluded: 'Partial',
//           minimumStay: '6 months',
//           contact: 'tokyo@sharehouse.jp',
//           bookingLink: 'https://sharehouse.jp/tokyo'
//         }
//       ];

//       setAccommodations(sampleData);
//       setFilteredAccommodations(sampleData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching accommodations:', error);
//       setLoading(false);
//       toast.error('Failed to load accommodation data');
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...accommodations];

//     // Apply search filter
//     if (searchQuery) {
//       filtered = filtered.filter(acc =>
//         acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         acc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         acc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         acc.university.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply country filter
//     if (filters.country && filters.country !== 'All Countries') {
//       filtered = filtered.filter(acc => acc.country === filters.country);
//     }

//     // Apply city filter
//     if (filters.city) {
//       filtered = filtered.filter(acc => acc.city.toLowerCase().includes(filters.city.toLowerCase()));
//     }

//     // Apply type filter
//     if (filters.type && filters.type !== 'All Types') {
//       filtered = filtered.filter(acc => acc.type === filters.type);
//     }

//     // Apply price range filter
//     if (filters.priceRange && filters.priceRange !== 'All Prices') {
//       filtered = filtered.filter(acc => {
//         const price = parseFloat(acc.price.replace(/[^0-9.]/g, ''));
//         if (filters.priceRange.includes('Budget')) return price < 500;
//         if (filters.priceRange.includes('Affordable')) return price >= 500 && price <= 1000;
//         if (filters.priceRange.includes('Standard')) return price >= 1000 && price <= 1500;
//         if (filters.priceRange.includes('Premium')) return price >= 1500 && price <= 2500;
//         if (filters.priceRange.includes('Luxury')) return price > 2500;
//         return true;
//       });
//     }

//     // Apply distance filter
//     if (filters.distance && filters.distance !== 'All Distances') {
//       filtered = filtered.filter(acc => acc.distance === filters.distance);
//     }

//     // Apply amenities filter
//     if (filters.amenities.length > 0) {
//       filtered = filtered.filter(acc =>
//         filters.amenities.every(amenity => acc.amenities.includes(amenity))
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case 'price':
//         filtered.sort((a, b) => {
//           const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
//           const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
//           return priceA - priceB;
//         });
//         break;
//       case 'rating':
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case 'distance':
//         const distanceOrder = {
//           'On Campus': 1,
//           'Walking Distance (< 15 min)': 2,
//           'Short Commute (15-30 min)': 3,
//           'Medium Commute (30-60 min)': 4
//         };
//         filtered.sort((a, b) => distanceOrder[a.distance] - distanceOrder[b.distance]);
//         break;
//       default:
//         filtered.sort((a, b) => b.rating - a.rating);
//     }

//     setFilteredAccommodations(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const indexOfLastAcc = currentPage * accommodationsPerPage;
//   const indexOfFirstAcc = indexOfLastAcc - accommodationsPerPage;
//   const currentAccommodations = filteredAccommodations.slice(indexOfFirstAcc, indexOfLastAcc);
//   const totalPages = Math.ceil(filteredAccommodations.length / accommodationsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Save accommodation to favorites
//   const toggleSaveAccommodation = (accId) => {
//     if (savedAccommodations.includes(accId)) {
//       setSavedAccommodations(savedAccommodations.filter(id => id !== accId));
//       toast.info('Removed from saved accommodations');
//     } else {
//       setSavedAccommodations([...savedAccommodations, accId]);
//       toast.success('Accommodation saved to favorites');
//     }
//   };

//   // Handle booking
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_BASE_URL}/accommodation-booking`, {
//         ...bookingForm,
//         timestamp: new Date().toISOString(),
//         accommodationId: selectedAccommodation?.id,
//         accommodationName: selectedAccommodation?.name
//       });

//       toast.success('Accommodation booking request submitted! Our housing specialist will contact you within 24 hours.');
//       setBookingModalOpen(false);
//       setBookingForm({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         nationality: '',
//         university: '',
//         course: '',
//         arrivalDate: '',
//         departureDate: '',
//         duration: '',
//         numberOfOccupants: '1',
//         specialRequirements: '',
//         emergencyContact: '',
//         preferredPayment: '',
//         additionalInfo: ''
//       });
//     } catch (error) {
//       toast.error('Error submitting booking request. Please try again.');
//       console.error('Booking error:', error);
//     }
//   };

//   // Accommodation Card Component
//   const AccommodationCard = ({ accommodation }) => {
//     const isSaved = savedAccommodations.includes(accommodation.id);

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
//       >
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={accommodation.images[0]}
//             alt={accommodation.name}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//           />
//           <div className="absolute top-4 left-4">
//             <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
//               accommodation.type === 'University Dormitory' ? 'bg-blue-600' :
//               accommodation.type === 'Private Apartment' ? 'bg-green-600' :
//               accommodation.type === 'Shared Apartment' ? 'bg-purple-600' :
//               accommodation.type === 'Homestay' ? 'bg-orange-600' : 'bg-pink-600'
//             }`}>
//               {accommodation.type}
//             </div>
//           </div>
//           <div className="absolute top-4 right-4 flex space-x-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleSaveAccommodation(accommodation.id);
//               }}
//               className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
//             >
//               {isSaved ? (
//                 <BookmarkIcon className="h-5 w-5 text-blue-600" />
//               ) : (
//                 <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
//               )}
//             </button>
//             {accommodation.featured && (
//               <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
//                 Featured
//               </div>
//             )}
//           </div>
//           <div className="absolute bottom-4 left-4">
//             <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full">
//               <LocationOnIcon className="h-3 w-3 mr-1" />
//               <span className="text-xs font-bold">{accommodation.city}</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="flex items-start justify-between mb-3">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-1">{accommodation.name}</h3>
//               <div className="flex items-center text-gray-600">
//                 <SchoolIcon className="h-4 w-4 mr-1" />
//                 <span className="text-sm">{accommodation.university}</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-gray-600">Rating</div>
//               <div className="flex items-center">
//                 <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
//                 <span className="font-semibold">{accommodation.rating}</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <div className="flex items-center mb-1">
//                 <AttachMoneyIcon className="h-4 w-4 text-blue-600 mr-2" />
//                 <span className="text-sm font-semibold text-gray-700">Monthly Price</span>
//               </div>
//               <p className="text-sm text-gray-600">{accommodation.price}</p>
//             </div>
//             <div className="bg-green-50 p-3 rounded-lg">
//               <div className="flex items-center mb-1">
//                 <DirectionsWalkIcon className="h-4 w-4 text-green-600 mr-2" />
//                 <span className="text-sm font-semibold text-gray-700">Distance</span>
//               </div>
//               <p className="text-sm text-gray-600">{accommodation.distance}</p>
//             </div>
//           </div>

//           <div className="mb-4">
//             <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
//             <div className="flex flex-wrap gap-2">
//               {accommodation.amenities.slice(0, 4).map((amenity, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
//                 >
//                   {amenity}
//                 </span>
//               ))}
//               {accommodation.amenities.length > 4 && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                   +{accommodation.amenities.length - 4} more
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//             <div className="text-sm text-gray-600">
//               <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                 accommodation.availability === 'Available'
//                   ? 'bg-green-100 text-green-800'
//                   : accommodation.availability === 'Limited'
//                   ? 'bg-yellow-100 text-yellow-800'
//                   : 'bg-red-100 text-red-800'
//               }`}>
//                 {accommodation.availability}
//               </span>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setSelectedAccommodation(accommodation)}
//                 className="text-blue-600 font-semibold text-sm hover:text-blue-700"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={() => {
//                   setSelectedAccommodation(accommodation);
//                   setBookingModalOpen(true);
//                 }}
//                 className="text-green-600 font-semibold text-sm flex items-center hover:text-green-700"
//               >
//                 Book Now
//                 <ArrowForwardIcon className="ml-1 h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   // Accommodation Detail Modal
//   const AccommodationDetailModal = () => {
//     if (!selectedAccommodation) return null;

//     const isSaved = savedAccommodations.includes(selectedAccommodation.id);

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setSelectedAccommodation(null)}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 50 }}
//           transition={{ type: "spring", damping: 25 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <div className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
//                     selectedAccommodation.type === 'University Dormitory' ? 'bg-blue-600' :
//                     selectedAccommodation.type === 'Private Apartment' ? 'bg-green-600' :
//                     selectedAccommodation.type === 'Shared Apartment' ? 'bg-purple-600' :
//                     selectedAccommodation.type === 'Homestay' ? 'bg-orange-600' : 'bg-pink-600'
//                   }`}>
//                     {selectedAccommodation.type}
//                   </div>
//                   {selectedAccommodation.featured && (
//                     <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
//                       Featured
//                     </div>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedAccommodation.name}</h2>
//                 <div className="flex items-center mt-2 space-x-4">
//                   <div className="flex items-center">
//                     <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-gray-600">{selectedAccommodation.city}, {selectedAccommodation.country}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <SchoolIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-gray-600">{selectedAccommodation.university}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => toggleSaveAccommodation(selectedAccommodation.id)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   {isSaved ? (
//                     <BookmarkIcon className="h-6 w-6 text-blue-600" />
//                   ) : (
//                     <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setSelectedAccommodation(null)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <CloseIcon className="h-6 w-6 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-2">
//                 <div className="rounded-xl overflow-hidden mb-6">
//                   <img
//                     src={selectedAccommodation.images[0]}
//                     alt={selectedAccommodation.name}
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">Accommodation Overview</h3>
//                   <p className="text-gray-700 mb-4">{selectedAccommodation.description}</p>

//                   <div className="bg-blue-50 p-4 rounded-xl mb-4">
//                     <h4 className="font-bold text-blue-800 mb-2">Key Features:</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedAccommodation.features.map((feature, index) => (
//                         <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-green-50 p-4 rounded-xl">
//                     <div className="flex items-center mb-2">
//                       <AttachMoneyIcon className="h-6 w-6 text-green-600 mr-2" />
//                       <span className="font-semibold text-gray-800">Monthly Price</span>
//                     </div>
//                     <p className="text-2xl font-bold text-green-700">{selectedAccommodation.price}</p>
//                     <p className="text-sm text-gray-600 mt-1">{selectedAccommodation.utilitiesIncluded === 'Yes' ? 'All utilities included' : 'Partial utilities included'}</p>
//                   </div>
//                   <div className="bg-purple-50 p-4 rounded-xl">
//                     <div className="flex items-center mb-2">
//                       <BedIcon className="h-6 w-6 text-purple-600 mr-2" />
//                       <span className="font-semibold text-gray-800">Room Type</span>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-700">{selectedAccommodation.bedrooms}</p>
//                     <p className="text-sm text-gray-600 mt-1">Bathroom: {selectedAccommodation.bathrooms}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <h4 className="font-bold text-gray-900 mb-4">Accommodation Details</h4>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Minimum Stay</p>
//                       <p className="font-semibold text-gray-900">{selectedAccommodation.minimumStay}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Contract Length</p>
//                       <p className="font-semibold text-gray-900">{selectedAccommodation.contractLength}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
//                       <p className="font-semibold text-gray-900">{selectedAccommodation.deposit}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Availability</p>
//                       <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                         selectedAccommodation.availability === 'Available'
//                           ? 'bg-green-100 text-green-800'
//                           : selectedAccommodation.availability === 'Limited'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {selectedAccommodation.availability}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
//                   <h4 className="font-bold mb-4">Amenities Included</h4>
//                   <ul className="space-y-2">
//                     {selectedAccommodation.amenities.map((amenity, index) => (
//                       <li key={index} className="flex items-center">
//                         <ChecklistIcon className="h-4 w-4 mr-2" />
//                         {amenity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => {
//                       setBookingForm(prev => ({
//                         ...prev,
//                         university: selectedAccommodation.university
//                       }));
//                       setBookingModalOpen(true);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Book This Accommodation
//                   </button>
//                   <button
//                     onClick={() => {
//                       setCurrentCountry(selectedAccommodation.country);
//                       setShowPreDepartureGuide(true);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Pre-Departure Guide
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <div className="space-y-3">
//                     <div className="flex items-center">
//                       <EmailIcon className="h-5 w-5 text-red-500 mr-3" />
//                       <span className="text-gray-700">{selectedAccommodation.contact}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <LinkIcon className="h-5 w-5 text-blue-500 mr-3" />
//                       <a href={selectedAccommodation.bookingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                         Official Booking Website
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Location Details</h3>
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <div className="space-y-2">
//                     <div className="flex items-start">
//                       <LocationOnIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
//                       <span className="text-gray-700">{selectedAccommodation.city}, {selectedAccommodation.country}</span>
//                     </div>
//                     <div className="flex items-start">
//                       <DirectionsWalkIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
//                       <span className="text-gray-700">{selectedAccommodation.distance} from {selectedAccommodation.university}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
//               <div className="flex items-start">
//                 <VerifiedIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
//                 <div>
//                   <h4 className="font-bold text-yellow-800 mb-2">Important Information</h4>
//                   <ul className="text-yellow-700 space-y-1">
//                     <li>• All bookings require advance payment confirmation</li>
//                     <li>• Security deposit refundable upon departure</li>
//                     <li>• Minimum stay requirement applies</li>
//                     <li>• Early termination fees may apply</li>
//                     <li>• RECAPPLY provides free booking support</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Booking Modal
//   const BookingModal = () => {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setBookingModalOpen(false)}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 50 }}
//           transition={{ type: "spring", damping: 25 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Book Accommodation</h2>
//                 <p className="text-gray-600 mt-1">Our housing specialists will assist you with the booking process</p>
//               </div>
//               <button
//                 onClick={() => setBookingModalOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <CloseIcon className="h-6 w-6 text-gray-500" />
//               </button>
//             </div>

//             <form onSubmit={handleBookingSubmit} className="space-y-6">
//               {/* Personal Information */}
//               <div className="border-b pb-4">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       First Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.firstName}
//                       onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="John"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Last Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.lastName}
//                       onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="Doe"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={bookingForm.email}
//                       onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={bookingForm.phone}
//                       onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="+250 783 408 617"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* University Information */}
//               <div className="border-b pb-4">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">University Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       University *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.university}
//                       onChange={(e) => setBookingForm({...bookingForm, university: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="University of Example"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Course/Program *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.course}
//                       onChange={(e) => setBookingForm({...bookingForm, course: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="Computer Science"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Stay Information */}
//               <div className="border-b pb-4">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Arrival Date *
//                     </label>
//                     <input
//                       type="date"
//                       required
//                       value={bookingForm.arrivalDate}
//                       onChange={(e) => setBookingForm({...bookingForm, arrivalDate: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Departure Date *
//                     </label>
//                     <input
//                       type="date"
//                       required
//                       value={bookingForm.departureDate}
//                       onChange={(e) => setBookingForm({...bookingForm, departureDate: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Number of Occupants *
//                     </label>
//                     <select
//                       required
//                       value={bookingForm.numberOfOccupants}
//                       onChange={(e) => setBookingForm({...bookingForm, numberOfOccupants: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     >
//                       <option value="1">1 Person</option>
//                       <option value="2">2 People</option>
//                       <option value="3">3 People</option>
//                       <option value="4">4 People</option>
//                       <option value="5">5+ People</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Preferred Payment Method
//                     </label>
//                     <select
//                       value={bookingForm.preferredPayment}
//                       onChange={(e) => setBookingForm({...bookingForm, preferredPayment: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     >
//                       <option value="">Select method</option>
//                       <option value="bank_transfer">Bank Transfer</option>
//                       <option value="credit_card">Credit Card</option>
//                       <option value="paypal">PayPal</option>
//                       <option value="western_union">Western Union</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Information */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Special Requirements
//                 </label>
//                 <textarea
//                   rows="3"
//                   value={bookingForm.specialRequirements}
//                   onChange={(e) => setBookingForm({...bookingForm, specialRequirements: e.target.value})}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
//                   placeholder="Any special requirements, accessibility needs, or preferences..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//               >
//                 Submit Booking Request
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Pre-Departure Guide Modal
//   const PreDepartureGuideModal = () => {
//     const [activeChecklist, setActiveChecklist] = useState(0);
//     const [checklistItems, setChecklistItems] = useState(preDepartureChecklist);

//     const toggleChecklistItem = (categoryIndex, itemId) => {
//       setChecklistItems(prev =>
//         prev.map((category, catIndex) => {
//           if (catIndex === categoryIndex) {
//             return {
//               ...category,
//               items: category.items.map(item =>
//                 item.id === itemId ? { ...item, completed: !item.completed } : item
//               )
//             };
//           }
//           return category;
//         })
//       );
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setShowPreDepartureGuide(false)}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 50 }}
//           transition={{ type: "spring", damping: 25 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Pre-Departure Guide</h2>
//                 <p className="text-gray-600 mt-1">Essential checklist for your study abroad journey</p>
//                 {currentCountry && (
//                   <div className="flex items-center mt-2">
//                     <PublicIcon className="h-5 w-5 text-blue-500 mr-2" />
//                     <span className="text-blue-600 font-semibold">Destination: {currentCountry}</span>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={() => setShowPreDepartureGuide(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <CloseIcon className="h-6 w-6 text-gray-500" />
//               </button>
//             </div>

//             <div className="mb-8">
//               <div className="flex space-x-2 mb-6">
//                 {checklistItems.map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveChecklist(index)}
//                     className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
//                       activeChecklist === index
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category.category}
//                   </button>
//                 ))}
//               </div>

//               <div className="space-y-3">
//                 {checklistItems[activeChecklist].items.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={item.completed}
//                         onChange={() => toggleChecklistItem(activeChecklist, item.id)}
//                         className="h-5 w-5 text-blue-600 rounded mr-3"
//                       />
//                       <span className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
//                         {item.name}
//                       </span>
//                     </div>
//                     {item.completed && (
//                       <CheckCircleIcon className="h-5 w-5 text-green-500" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Country Specific Tips */}
//             <div className="bg-blue-50 p-6 rounded-xl mb-6">
//               <h3 className="font-bold text-blue-800 mb-4">Country-Specific Tips for {currentCountry}</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {currentCountry === 'China' && (
//                   <>
//                     <div className="bg-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-gray-900 mb-2">Banking in China</h4>
//                       <ul className="text-sm text-gray-700 space-y-1">
//                         <li>• Open a bank account within 30 days of arrival</li>
//                         <li>• WeChat Pay and Alipay are essential</li>
//                         <li>• Bring passport for bank account opening</li>
//                       </ul>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-gray-900 mb-2">Transportation</h4>
//                       <ul className="text-sm text-gray-700 space-y-1">
//                         <li>• Download Didi (Chinese Uber)</li>
//                         <li>• Get a transportation card for metro/bus</li>
//                         <li>• High-speed trains connect major cities</li>
//                       </ul>
//                     </div>
//                   </>
//                 )}
//                 {currentCountry === 'Canada' && (
//                   <>
//                     <div className="bg-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-gray-900 mb-2">Banking in Canada</h4>
//                       <ul className="text-sm text-gray-700 space-y-1">
//                         <li>• Major banks: RBC, TD, Scotiabank, BMO</li>
//                         <li>• Get a credit card to build credit history</li>
//                         <li>• SIN required for work</li>
//                       </ul>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-gray-900 mb-2">Healthcare</h4>
//                       <ul className="text-sm text-gray-700 space-y-1">
//                         <li>• Get provincial health insurance</li>
//                         <li>• Private insurance for first 3 months</li>
//                         <li>• Keep all medical receipts</li>
//                       </ul>
//                     </div>
//                   </>
//                 )}
//                 {/* Add more country-specific tips */}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="bg-green-50 p-5 rounded-xl">
//                 <h4 className="font-bold text-green-800 mb-3">Packing Essentials</h4>
//                 <ul className="text-green-700 space-y-2">
//                   <li>• Important documents (passport, visa, admission letter)</li>
//                   <li>• Appropriate clothing for the climate</li>
//                   <li>• Universal power adapter</li>
//                   <li>• Prescription medications (with doctor's note)</li>
//                   <li>• Laptop and electronics</li>
//                   <li>• Cultural gifts from home country</li>
//                 </ul>
//               </div>

//               <div className="bg-yellow-50 p-5 rounded-xl">
//                 <h4 className="font-bold text-yellow-800 mb-3">First Week Checklist</h4>
//                 <ul className="text-yellow-700 space-y-2">
//                   <li>• Register with local police (if required)</li>
//                   <li>• Attend university orientation</li>
//                   <li>• Open a local bank account</li>
//                   <li>• Get a local SIM card</li>
//                   <li>• Explore the neighborhood</li>
//                   <li>• Make friends with other international students</li>
//                 </ul>
//               </div>
//             </div>

//             <button
//               onClick={() => toast.success('Pre-departure guide downloaded successfully!')}
//               className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//             >
//               Download Complete Guide
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <div className="flex items-center justify-center space-x-2 mt-8">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-2 rounded-lg ${
//             currentPage === 1
//               ? 'text-gray-400 cursor-not-allowed'
//               : 'text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Previous
//         </button>

//         {pageNumbers.map(number => (
//           <button
//             key={number}
//             onClick={() => handlePageChange(number)}
//             className={`w-10 h-10 rounded-lg font-semibold ${
//               currentPage === number
//                 ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             {number}
//           </button>
//         ))}

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-2 rounded-lg ${
//             currentPage === totalPages
//               ? 'text-gray-400 cursor-not-allowed'
//               : 'text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
//             Accommodation & Pre-Departure Services
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//             Find your perfect home abroad with our verified accommodations and comprehensive pre-departure support
//           </p>
//         </motion.div>

//         {/* Stats Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
//         >
//           {[
//             { icon: HomeIcon, value: '2,500+', label: 'Verified Accommodations' },
//             { icon: CheckCircleIcon, value: '98%', label: 'Satisfaction Rate' },
//             { icon: GroupsIcon, value: '30+', label: 'Countries Covered' },
//             { icon: EmojiEventsIcon, value: '95%', label: 'Booking Success Rate' }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
//               <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
//               <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
//               <div className="text-gray-600">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Quick Actions */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//         >
//           <button
//             onClick={() => setBookingModalOpen(true)}
//             className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
//           >
//             <HomeIcon className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Find Accommodation</h3>
//             <p className="opacity-90">Browse verified student accommodations worldwide</p>
//           </button>

//           <button
//             onClick={() => setShowPreDepartureGuide(true)}
//             className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
//           >
//             <FlightTakeoff className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Pre-Departure Guide</h3>
//             <p className="opacity-90">Essential checklist for your study abroad journey</p>
//           </button>

//           <button
//             onClick={() => toast.success('Our housing specialist will contact you within 24 hours!')}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
//           >
//             <SupportAgent className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Personal Support</h3>
//             <p className="opacity-90">Get personalized housing assistance</p>
//           </button>
//         </motion.div>

//         {/* Search and Filter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Search Accommodations</label>
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by city, university, or type..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Country</label>
//               <select
//                 value={filters.country}
//                 onChange={(e) => setFilters({...filters, country: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {countries.map((country, index) => (
//                   <option key={index} value={country === 'All Countries' ? '' : country}>
//                     {country}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 <option value="price">Price (Low to High)</option>
//                 <option value="rating">Rating (High to Low)</option>
//                 <option value="distance">Distance (Near to Far)</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Accommodation Type</label>
//               <select
//                 value={filters.type}
//                 onChange={(e) => setFilters({...filters, type: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {accommodationTypes.map((type, index) => (
//                   <option key={index} value={type === 'All Types' ? '' : type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
//               <select
//                 value={filters.priceRange}
//                 onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {priceRanges.map((range, index) => (
//                   <option key={index} value={range === 'All Prices' ? '' : range}>
//                     {range}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Distance from University</label>
//               <select
//                 value={filters.distance}
//                 onChange={(e) => setFilters({...filters, distance: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {distances.map((distance, index) => (
//                   <option key={index} value={distance === 'All Distances' ? '' : distance}>
//                     {distance}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={() => {
//                   setFilters({
//                     country: '',
//                     city: '',
//                     type: '',
//                     priceRange: '',
//                     distance: '',
//                     amenities: []
//                   });
//                   setSearchQuery('');
//                 }}
//                 className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>

//           {/* Amenities Filter */}
//           <div className="mt-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
//             <div className="flex flex-wrap gap-2">
//               {amenitiesList.map((amenity) => (
//                 <button
//                   key={amenity}
//                   onClick={() => {
//                     setFilters(prev => ({
//                       ...prev,
//                       amenities: prev.amenities.includes(amenity)
//                         ? prev.amenities.filter(a => a !== amenity)
//                         : [...prev.amenities, amenity]
//                     }));
//                   }}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                     filters.amenities.includes(amenity)
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {amenity}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap gap-2">
//             {['All Accommodations', 'University Dorms', 'Private Apartments', 'Shared Housing', 'Budget Friendly', 'Premium Options'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   if (tab === 'University Dorms') {
//                     setFilters({...filters, type: 'University Dormitory'});
//                   } else if (tab === 'Private Apartments') {
//                     setFilters({...filters, type: 'Private Apartment'});
//                   } else if (tab === 'Shared Housing') {
//                     setFilters({...filters, type: 'Shared Apartment'});
//                   } else if (tab === 'Budget Friendly') {
//                     setFilters({...filters, priceRange: 'Budget (< $500/month)'});
//                   } else if (tab === 'Premium Options') {
//                     setFilters({...filters, priceRange: 'Premium ($1500 - $2500/month)'});
//                   } else {
//                     setFilters({
//                       country: '',
//                       city: '',
//                       type: '',
//                       priceRange: '',
//                       distance: '',
//                       amenities: []
//                     });
//                   }
//                 }}
//                 className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
//                   activeTab === tab
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Featured Accommodations Section */}
//         {activeTab === 'All Accommodations' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="mb-12"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Student Accommodations</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {featuredAccommodations.map((accommodation) => (
//                 <AccommodationCard key={accommodation.id} accommodation={accommodation} />
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Accommodations Grid */}
//         <div className="mb-12">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading accommodation information...</p>
//             </div>
//           ) : filteredAccommodations.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//               <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No accommodations found</h3>
//               <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//             </div>
//           ) : (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {filteredAccommodations.length} Accommodations Available
//                 </h2>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => setBookingModalOpen(true)}
//                     className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Get Housing Assistance
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {currentAccommodations.map((accommodation) => (
//                   <AccommodationCard key={accommodation.id} accommodation={accommodation} />
//                 ))}
//               </div>

//               <Pagination />
//             </>
//           )}
//         </div>

//         {/* Why Choose Our Service */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
//         >
//           <div className="bg-white p-8 rounded-xl shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RECAPPLY Accommodation Services?</h2>
//             <div className="space-y-4">
//               {[
//                 {
//                   title: 'Verified Accommodations',
//                   description: 'All listings are verified for safety and quality standards'
//                 },
//                 {
//                   title: 'Local Housing Specialists',
//                   description: 'Expert support in each destination country'
//                 },
//                 {
//                   title: 'End-to-End Support',
//                   description: 'From search to move-in and settlement'
//                 },
//                 {
//                   title: 'Cultural Adaptation',
//                   description: 'Help with local customs and community integration'
//                 }
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-start">
//                   <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
//                     <p className="text-gray-600">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
//             <h2 className="text-2xl font-bold mb-6">Our Accommodation Services Include</h2>
//             <div className="space-y-6">
//               <div className="flex items-center">
//                 <HomeIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Housing Search & Selection</h3>
//                   <p className="opacity-90">Find the perfect accommodation based on your needs</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <VerifiedUserIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Verification & Safety Check</h3>
//                   <p className="opacity-90">Thorough background checks on all accommodations</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <FlightTakeoffIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Pre-Departure Preparation</h3>
//                   <p className="opacity-90">Complete guide for your study abroad journey</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center"
//         >
//           <h2 className="text-3xl font-bold mb-4">Find Your Perfect Home Abroad!</h2>
//           <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
//             Join thousands of students who have found safe, comfortable, and affordable accommodations through our service.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => setBookingModalOpen(true)}
//               className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
//             >
//               Start Accommodation Search
//             </button>
//             <button
//               onClick={() => setShowPreDepartureGuide(true)}
//               className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
//             >
//               Get Pre-Departure Guide
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Modals */}
//       {selectedAccommodation && <AccommodationDetailModal />}
//       {bookingModalOpen && <BookingModal />}
//       {showPreDepartureGuide && <PreDepartureGuideModal />}
//     </div>
//   );
// };

/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Material Icons
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SpeedIcon from "@mui/icons-material/Speed";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  FlightTakeoff,
  SupportAgent,
  Link as LinkIcon,
} from "@mui/icons-material";

// API Configuration
const API_BASE_URL = "https://your-api-server.com/api";

// ============================
// MODAL COMPONENTS (MOVED OUTSIDE)
// ============================

// Success Modal Component
const SuccessModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Request Submitted!
          </h3>

          <p className="text-gray-600 mb-6">
            Thank you for your accommodation booking request. Our housing
            specialist will contact you within 24 hours to assist you with the
            next steps.
          </p>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Continue Browsing Accommodations
            </button>

            <button
              onClick={() => {
                onClose();
                window.open("https://wa.me/250783408617", "_blank");
              }}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat with Housing Specialist</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Error Modal Component
const ErrorModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ErrorIcon className="w-8 h-8 text-red-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Submission Failed
          </h3>

          <p className="text-gray-600 mb-6">
            There was an issue submitting your booking request. Please try again
            or contact us directly for assistance.
          </p>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Try Again
            </button>

            <button
              onClick={() => {
                onClose();
                window.open("https://wa.me/250783408617", "_blank");
              }}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Contact via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                window.location.href =
                  "mailto:r.educationalconsultance@gmail.com";
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <EmailIcon className="w-5 h-5" />
              <span>Send Email</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Booking Modal Component
const BookingModal = ({
  isOpen,
  onClose,
  bookingForm,
  handleInputChange,
  handleBookingSubmit,
  selectedAccommodation,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Book Accommodation
              </h2>
              <p className="text-gray-600 mt-1">
                Our housing specialists will assist you with the booking process
              </p>
              {selectedAccommodation && (
                <div className="mt-2 text-blue-600 font-medium">
                  {selectedAccommodation.name} - {selectedAccommodation.city},{" "}
                  {selectedAccommodation.country}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={bookingForm.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="John"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={bookingForm.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Doe"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="+250 783 408 617"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* University Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                University Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    name="university"
                    required
                    value={bookingForm.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="University of Example"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course/Program *
                  </label>
                  <input
                    type="text"
                    name="course"
                    required
                    value={bookingForm.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Computer Science"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Stay Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Stay Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Arrival Date *
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    required
                    value={bookingForm.arrivalDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    required
                    value={bookingForm.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Occupants *
                  </label>
                  <select
                    name="numberOfOccupants"
                    required
                    value={bookingForm.numberOfOccupants}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Payment Method
                  </label>
                  <select
                    name="preferredPayment"
                    value={bookingForm.preferredPayment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="">Select method</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="western_union">Western Union</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                rows="3"
                name="specialRequirements"
                value={bookingForm.specialRequirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Any special requirements, accessibility needs, or preferences..."
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Booking Request"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Accommodation Detail Modal Component
const AccommodationDetailModal = ({
  isOpen,
  onClose,
  accommodation,
  savedAccommodations,
  toggleSaveAccommodation,
  onBookNow,
  onShowPreDepartureGuide,
}) => {
  if (!isOpen || !accommodation) return null;

  const isSaved = savedAccommodations.includes(accommodation.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
                    accommodation.type === "University Dormitory"
                      ? "bg-blue-600"
                      : accommodation.type === "Private Apartment"
                      ? "bg-green-600"
                      : accommodation.type === "Shared Apartment"
                      ? "bg-purple-600"
                      : accommodation.type === "Homestay"
                      ? "bg-orange-600"
                      : "bg-pink-600"
                  }`}
                >
                  {accommodation.type}
                </div>
                {accommodation.featured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {accommodation.name}
              </h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">
                    {accommodation.city}, {accommodation.country}
                  </span>
                </div>
                <div className="flex items-center">
                  <SchoolIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">
                    {accommodation.university}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSaveAccommodation(accommodation.id);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSaved ? (
                  <BookmarkIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <CloseIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={accommodation.images[0]}
                  alt={accommodation.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Accommodation Overview
                </h3>
                <p className="text-gray-700 mb-4">
                  {accommodation.description}
                </p>

                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <h4 className="font-bold text-blue-800 mb-2">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {accommodation.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <AttachMoneyIcon className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-gray-800">
                      Monthly Price
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {accommodation.price}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {accommodation.utilitiesIncluded === "Yes"
                      ? "All utilities included"
                      : "Partial utilities included"}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <BedIcon className="h-6 w-6 text-purple-600 mr-2" />
                    <span className="font-semibold text-gray-800">
                      Room Type
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {accommodation.bedrooms}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Bathroom: {accommodation.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">
                  Accommodation Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Minimum Stay</p>
                    <p className="font-semibold text-gray-900">
                      {accommodation.minimumStay}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Contract Length
                    </p>
                    <p className="font-semibold text-gray-900">
                      {accommodation.contractLength}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Security Deposit
                    </p>
                    <p className="font-semibold text-gray-900">
                      {accommodation.deposit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        accommodation.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : accommodation.availability === "Limited"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {accommodation.availability}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
                <h4 className="font-bold mb-4">Amenities Included</h4>
                <ul className="space-y-2">
                  {accommodation.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <ChecklistIcon className="h-4 w-4 mr-2" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onBookNow(accommodation)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Book This Accommodation
                </button>
                <button
                  onClick={() => onShowPreDepartureGuide(accommodation.country)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Pre-Departure Guide
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <EmailIcon className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-gray-700">
                      {accommodation.contact}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-blue-500 mr-3" />
                    <a
                      href={accommodation.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Official Booking Website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Location Details
              </h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <LocationOnIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      {accommodation.city}, {accommodation.country}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <DirectionsWalkIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      {accommodation.distance} from {accommodation.university}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <VerifiedIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">
                  Important Information
                </h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• All bookings require advance payment confirmation</li>
                  <li>• Security deposit refundable upon departure</li>
                  <li>• Minimum stay requirement applies</li>
                  <li>• Early termination fees may apply</li>
                  <li>• RECAPPLY provides free booking support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pre-Departure Guide Modal Component
const PreDepartureGuideModal = ({
  isOpen,
  onClose,
  currentCountry,
  preDepartureChecklist: initialChecklist,
}) => {
  const [activeChecklist, setActiveChecklist] = useState(0);
  const [checklistItems, setChecklistItems] = useState(initialChecklist);

  const toggleChecklistItem = (categoryIndex, itemId) => {
    setChecklistItems((prev) =>
      prev.map((category, catIndex) => {
        if (catIndex === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) =>
              item.id === itemId
                ? { ...item, completed: !item.completed }
                : item
            ),
          };
        }
        return category;
      })
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Pre-Departure Guide
              </h2>
              <p className="text-gray-600 mt-1">
                Essential checklist for your study abroad journey
              </p>
              {currentCountry && (
                <div className="flex items-center mt-2">
                  <PublicIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-600 font-semibold">
                    Destination: {currentCountry}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex space-x-2 mb-6">
              {checklistItems.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChecklist(index)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeChecklist === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {checklistItems[activeChecklist].items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        toggleChecklistItem(activeChecklist, item.id)
                      }
                      className="h-5 w-5 text-blue-600 rounded mr-3"
                    />
                    <span
                      className={`font-medium ${
                        item.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.completed && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Country Specific Tips */}
          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <h3 className="font-bold text-blue-800 mb-4">
              Country-Specific Tips for {currentCountry}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCountry === "China" && (
                <>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Banking in China
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Open a bank account within 30 days of arrival</li>
                      <li>• WeChat Pay and Alipay are essential</li>
                      <li>• Bring passport for bank account opening</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Transportation
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Download Didi (Chinese Uber)</li>
                      <li>• Get a transportation card for metro/bus</li>
                      <li>• High-speed trains connect major cities</li>
                    </ul>
                  </div>
                </>
              )}
              {currentCountry === "Canada" && (
                <>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Banking in Canada
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Major banks: RBC, TD, Scotiabank, BMO</li>
                      <li>• Get a credit card to build credit history</li>
                      <li>• SIN required for work</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Healthcare
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Get provincial health insurance</li>
                      <li>• Private insurance for first 3 months</li>
                      <li>• Keep all medical receipts</li>
                    </ul>
                  </div>
                </>
              )}
              {!["China", "Canada"].includes(currentCountry) && (
                <div className="bg-white p-4 rounded-lg col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    General Tips for {currentCountry}
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • Research local customs and etiquette before arrival
                    </li>
                    <li>• Learn basic phrases in the local language</li>
                    <li>• Understand the local transportation system</li>
                    <li>• Register with your embassy upon arrival</li>
                    <li>• Connect with local student communities</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">
                Packing Essentials
              </h4>
              <ul className="text-green-700 space-y-2">
                <li>
                  • Important documents (passport, visa, admission letter)
                </li>
                <li>• Appropriate clothing for the climate</li>
                <li>• Universal power adapter</li>
                <li>• Prescription medications (with doctor's note)</li>
                <li>• Laptop and electronics</li>
                <li>• Cultural gifts from home country</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-5 rounded-xl">
              <h4 className="font-bold text-yellow-800 mb-3">
                First Week Checklist
              </h4>
              <ul className="text-yellow-700 space-y-2">
                <li>• Register with local police (if required)</li>
                <li>• Attend university orientation</li>
                <li>• Open a local bank account</li>
                <li>• Get a local SIM card</li>
                <li>• Explore the neighborhood</li>
                <li>• Make friends with other international students</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() =>
              toast.success("Pre-departure guide downloaded successfully!")
            }
            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Download Complete Guide
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================
// MAIN ACCOMMODATION COMPONENT
// ============================

export const Accommodation = () => {
  // State Management
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [savedAccommodations, setSavedAccommodations] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    type: "",
    priceRange: "",
    distance: "",
    amenities: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const [accommodationsPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState("All Accommodations");
  const [showPreDepartureGuide, setShowPreDepartureGuide] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    university: "",
    course: "",
    arrivalDate: "",
    departureDate: "",
    duration: "",
    numberOfOccupants: "1",
    specialRequirements: "",
    emergencyContact: "",
    preferredPayment: "",
    additionalInfo: "",
  });

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Countries
  const countries = [
    "All Countries",
    "China",
    "Canada",
    "Germany",
    "Poland",
    "Turkey",
    "USA",
    "UK",
    "Australia",
    "Japan",
    "South Korea",
    "Singapore",
    "Malaysia",
    "France",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "Italy",
    "Spain",
    "New Zealand",
    "Ireland",
    "Denmark",
    "Norway",
    "Finland",
  ];

  // Accommodation types
  const accommodationTypes = [
    "All Types",
    "University Dormitory",
    "Private Apartment",
    "Shared Apartment",
    "Homestay",
    "Student Residence",
    "Studio Apartment",
    "Serviced Apartment",
  ];

  // Price ranges
  const priceRanges = [
    "All Prices",
    "Budget (< $500/month)",
    "Affordable ($500 - $1000/month)",
    "Standard ($1000 - $1500/month)",
    "Premium ($1500 - $2500/month)",
    "Luxury (> $2500/month)",
  ];

  // Distance from university
  const distances = [
    "All Distances",
    "On Campus",
    "Walking Distance (< 15 min)",
    "Short Commute (15-30 min)",
    "Medium Commute (30-60 min)",
  ];

  // Amenities
  const amenitiesList = [
    "WiFi",
    "Furnished",
    "Kitchen",
    "Laundry",
    "AC/Heating",
    "Cleaning Service",
    "Security",
    "Gym",
    "Study Room",
    "Parking",
    "Pet Friendly",
    "Balcony",
  ];

  // Featured accommodations
  const featuredAccommodations = [
    {
      id: 1,
      name: "Beijing University Dormitory",
      country: "China",
      city: "Beijing",
      university: "Peking University",
      type: "University Dormitory",
      price: "$350/month",
      distance: "On Campus",
      rating: 4.2,
      bedrooms: "Single",
      bathrooms: "Shared",
      amenities: ["WiFi", "Furnished", "Laundry", "Study Room", "Security"],
      description:
        "Modern on-campus dormitory for international students at Peking University. 24/7 security and student support services.",
      features: [
        "24/7 Security",
        "Student Community",
        "Academic Support",
        "Cafeteria Access",
      ],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      ],
      featured: true,
      availability: "Limited",
      contractLength: "6-12 months",
      deposit: "1 month rent",
      utilitiesIncluded: "Partial",
      minimumStay: "6 months",
      contact: "university-housing@pkuedu.cn",
      bookingLink: "https://housing.pkuedu.cn",
    },
    {
      id: 2,
      name: "Toronto Student Residence",
      country: "Canada",
      city: "Toronto",
      university: "University of Toronto",
      type: "Student Residence",
      price: "$950/month",
      distance: "Walking Distance (< 15 min)",
      rating: 4.5,
      bedrooms: "Shared (2-person)",
      bathrooms: "Private",
      amenities: [
        "WiFi",
        "Furnished",
        "Kitchen",
        "Laundry",
        "Gym",
        "Study Room",
      ],
      description:
        "Modern student residence near University of Toronto with excellent amenities and international student community.",
      features: [
        "Fully Furnished",
        "All Utilities Included",
        "Social Events",
        "Study Areas",
      ],
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      ],
      featured: true,
      availability: "Available",
      contractLength: "4-12 months",
      deposit: "$500",
      utilitiesIncluded: "Yes",
      minimumStay: "4 months",
      contact: "info@utorontores.com",
      bookingLink: "https://utorontores.com",
    },
    {
      id: 3,
      name: "Berlin Shared Apartment",
      country: "Germany",
      city: "Berlin",
      university: "Technical University of Berlin",
      type: "Shared Apartment",
      price: "€550/month",
      distance: "Short Commute (15-30 min)",
      rating: 4.0,
      bedrooms: "Private Room",
      bathrooms: "Shared",
      amenities: ["WiFi", "Furnished", "Kitchen", "Laundry", "Balcony"],
      description:
        "Cozy shared apartment in Berlin with international roommates. Great location near public transport.",
      features: [
        "International Roommates",
        "Fully Equipped Kitchen",
        "Monthly Cleaning",
        "Bills Included",
      ],
      images: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      ],
      featured: true,
      availability: "Available",
      contractLength: "Flexible",
      deposit: "2 months rent",
      utilitiesIncluded: "Yes",
      minimumStay: "3 months",
      contact: "berlin@student-accommodation.de",
      bookingLink: "https://student-accommodation.de",
    },
  ];

  // Pre-departure checklist
  const preDepartureChecklist = [
    {
      category: "Before Departure",
      items: [
        { id: 1, name: "Accommodation Booking Confirmation", completed: false },
        { id: 2, name: "Flight Tickets Booked", completed: false },
        { id: 3, name: "Travel Insurance Purchased", completed: false },
        { id: 4, name: "Visa/Study Permit Obtained", completed: false },
        { id: 5, name: "University Acceptance Letter", completed: false },
      ],
    },
    {
      category: "Essential Documents",
      items: [
        { id: 6, name: "Passport (6+ months validity)", completed: false },
        { id: 7, name: "Visa/Residence Permit", completed: false },
        { id: 8, name: "Academic Documents (translated)", completed: false },
        { id: 9, name: "Medical Records/Vaccination", completed: false },
        { id: 10, name: "International Driving License", completed: false },
      ],
    },
    {
      category: "Financial Preparation",
      items: [
        { id: 11, name: "Bank Account Setup", completed: false },
        { id: 12, name: "Currency Exchange", completed: false },
        { id: 13, name: "Credit/Debit Cards", completed: false },
        { id: 14, name: "Scholarship Documents", completed: false },
        { id: 15, name: "Emergency Funds", completed: false },
      ],
    },
  ];

  // Fetch accommodations data
  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, sortBy, accommodations]);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      // Sample accommodation data
      const sampleData = [
        ...featuredAccommodations,
        {
          id: 4,
          name: "Warsaw University Hostel",
          country: "Poland",
          city: "Warsaw",
          university: "University of Warsaw",
          type: "University Dormitory",
          price: "€280/month",
          distance: "On Campus",
          rating: 3.8,
          bedrooms: "Double Room",
          bathrooms: "Shared",
          amenities: ["WiFi", "Furnished", "Laundry", "Study Room"],
          description:
            "Affordable on-campus accommodation for international students at University of Warsaw.",
          features: [
            "Affordable Price",
            "International Student Community",
            "24/7 Reception",
          ],
          images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Limited",
          contractLength: "10 months",
          deposit: "1 month rent",
          utilitiesIncluded: "Partial",
          minimumStay: "10 months",
          contact: "hostel@uw.edu.pl",
          bookingLink: "https://hostel.uw.edu.pl",
        },
        {
          id: 5,
          name: "Istanbul Student Apartment",
          country: "Turkey",
          city: "Istanbul",
          university: "Boğaziçi University",
          type: "Private Apartment",
          price: "$400/month",
          distance: "Walking Distance (< 15 min)",
          rating: 4.1,
          bedrooms: "Studio",
          bathrooms: "Private",
          amenities: ["WiFi", "Furnished", "Kitchen", "AC/Heating", "Security"],
          description:
            "Modern studio apartment near Boğaziçi University with great city views.",
          features: [
            "Fully Furnished Studio",
            "Private Kitchen",
            "Security System",
            "City View",
          ],
          images: [
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Available",
          contractLength: "6-12 months",
          deposit: "1 month rent",
          utilitiesIncluded: "No",
          minimumStay: "6 months",
          contact: "istanbul@studentliving.com",
          bookingLink: "https://studentliving.com/istanbul",
        },
        {
          id: 6,
          name: "Boston Homestay",
          country: "USA",
          city: "Boston",
          university: "Harvard University",
          type: "Homestay",
          price: "$1200/month",
          distance: "Short Commute (15-30 min)",
          rating: 4.7,
          bedrooms: "Private Room",
          bathrooms: "Shared",
          amenities: [
            "WiFi",
            "Furnished",
            "Kitchen",
            "Laundry",
            "Meals Included",
          ],
          description:
            "Cultural homestay experience with American family near Harvard University.",
          features: [
            "Cultural Experience",
            "Meals Included",
            "Family Environment",
            "Local Support",
          ],
          images: [
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Limited",
          contractLength: "3-12 months",
          deposit: "$500",
          utilitiesIncluded: "Yes",
          minimumStay: "3 months",
          contact: "homestay@harvard-support.com",
          bookingLink: "https://harvard-homestay.com",
        },
        {
          id: 7,
          name: "London Student Halls",
          country: "UK",
          city: "London",
          university: "Imperial College London",
          type: "Student Residence",
          price: "£1100/month",
          distance: "On Campus",
          rating: 4.3,
          bedrooms: "En-suite",
          bathrooms: "Private",
          amenities: [
            "WiFi",
            "Furnished",
            "Kitchen",
            "Laundry",
            "Gym",
            "Study Room",
            "Cleaning Service",
          ],
          description:
            "Premium student residence at Imperial College London with all amenities included.",
          features: [
            "En-suite Bathroom",
            "Weekly Cleaning",
            "Gym Access",
            "Study Lounges",
          ],
          images: [
            "https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Available",
          contractLength: "12 months",
          deposit: "1 month rent",
          utilitiesIncluded: "Yes",
          minimumStay: "12 months",
          contact: "accommodation@imperial.ac.uk",
          bookingLink: "https://accommodation.imperial.ac.uk",
        },
        {
          id: 8,
          name: "Sydney Serviced Apartment",
          country: "Australia",
          city: "Sydney",
          university: "University of Sydney",
          type: "Serviced Apartment",
          price: "$1800/month",
          distance: "Walking Distance (< 15 min)",
          rating: 4.6,
          bedrooms: "1 Bedroom",
          bathrooms: "Private",
          amenities: [
            "WiFi",
            "Furnished",
            "Kitchen",
            "Laundry",
            "AC/Heating",
            "Cleaning Service",
            "Gym",
            "Pool",
          ],
          description:
            "Luxury serviced apartment near University of Sydney with hotel-like amenities.",
          features: [
            "Daily Cleaning",
            "Concierge Service",
            "Pool & Gym",
            "Fully Equipped",
          ],
          images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Available",
          contractLength: "Flexible",
          deposit: "2 weeks rent",
          utilitiesIncluded: "Yes",
          minimumStay: "1 month",
          contact: "bookings@sydneyserviced.com",
          bookingLink: "https://sydneyserviced.com",
        },
        {
          id: 9,
          name: "Tokyo Student Share House",
          country: "Japan",
          city: "Tokyo",
          university: "University of Tokyo",
          type: "Shared Apartment",
          price: "¥80,000/month",
          distance: "Medium Commute (30-60 min)",
          rating: 4.0,
          bedrooms: "Private Room",
          bathrooms: "Shared",
          amenities: ["WiFi", "Furnished", "Kitchen", "Laundry", "Study Room"],
          description:
            "Traditional Japanese share house for international students in Tokyo.",
          features: [
            "Cultural Exchange",
            "Monthly Events",
            "Study Support",
            "Bilingual Staff",
          ],
          images: [
            "https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
          ],
          featured: false,
          availability: "Limited",
          contractLength: "6-12 months",
          deposit: "1 month rent",
          utilitiesIncluded: "Partial",
          minimumStay: "6 months",
          contact: "tokyo@sharehouse.jp",
          bookingLink: "https://sharehouse.jp/tokyo",
        },
      ];

      setAccommodations(sampleData);
      setFilteredAccommodations(sampleData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      setLoading(false);
      toast.error("Failed to load accommodation data");
    }
  };

  const applyFilters = () => {
    let filtered = [...accommodations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (acc) =>
          acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.university.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply country filter
    if (filters.country && filters.country !== "All Countries") {
      filtered = filtered.filter((acc) => acc.country === filters.country);
    }

    // Apply city filter
    if (filters.city) {
      filtered = filtered.filter((acc) =>
        acc.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type && filters.type !== "All Types") {
      filtered = filtered.filter((acc) => acc.type === filters.type);
    }

    // Apply price range filter
    if (filters.priceRange && filters.priceRange !== "All Prices") {
      filtered = filtered.filter((acc) => {
        const price = parseFloat(acc.price.replace(/[^0-9.]/g, ""));
        if (filters.priceRange.includes("Budget")) return price < 500;
        if (filters.priceRange.includes("Affordable"))
          return price >= 500 && price <= 1000;
        if (filters.priceRange.includes("Standard"))
          return price >= 1000 && price <= 1500;
        if (filters.priceRange.includes("Premium"))
          return price >= 1500 && price <= 2500;
        if (filters.priceRange.includes("Luxury")) return price > 2500;
        return true;
      });
    }

    // Apply distance filter
    if (filters.distance && filters.distance !== "All Distances") {
      filtered = filtered.filter((acc) => acc.distance === filters.distance);
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((acc) =>
        filters.amenities.every((amenity) => acc.amenities.includes(amenity))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
          return priceA - priceB;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        const distanceOrder = {
          "On Campus": 1,
          "Walking Distance (< 15 min)": 2,
          "Short Commute (15-30 min)": 3,
          "Medium Commute (30-60 min)": 4,
        };
        filtered.sort(
          (a, b) => distanceOrder[a.distance] - distanceOrder[b.distance]
        );
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredAccommodations(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastAcc = currentPage * accommodationsPerPage;
  const indexOfFirstAcc = indexOfLastAcc - accommodationsPerPage;
  const currentAccommodations = filteredAccommodations.slice(
    indexOfFirstAcc,
    indexOfLastAcc
  );
  const totalPages = Math.ceil(
    filteredAccommodations.length / accommodationsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save accommodation to favorites
  const toggleSaveAccommodation = (accId) => {
    if (savedAccommodations.includes(accId)) {
      setSavedAccommodations(savedAccommodations.filter((id) => id !== accId));
      toast.info("Removed from saved accommodations");
    } else {
      setSavedAccommodations([...savedAccommodations, accId]);
      toast.success("Accommodation saved to favorites");
    }
  };

  // Handle form input change - FIXED: Prevent reloading
  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle book now action
  const handleBookNow = useCallback((accommodation) => {
    setBookingForm((prev) => ({
      ...prev,
      university: accommodation?.university || "",
    }));
    setSelectedAccommodation(accommodation);
    setBookingModalOpen(true);
  }, []);

  // Handle pre-departure guide
  const handleShowPreDepartureGuide = useCallback((country) => {
    setCurrentCountry(country);
    setShowPreDepartureGuide(true);
  }, []);

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        ...bookingForm,
        timestamp: new Date().toISOString(),
        accommodationId: selectedAccommodation?.id,
        accommodationName: selectedAccommodation?.name,
        source: "RECAPPLY Accommodation Booking",
      };

      // Send to your API endpoint - REPLACE WITH YOUR ACTUAL API
      const API_ENDPOINT = "https://api.recrecapply.com/accommodation-booking";

      // Simulate API call - replace with actual axios.post
      console.log("Submitting booking data:", bookingData);

      // Simulated API response - remove this in production
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // For production, use:
      // const response = await axios.post(API_ENDPOINT, bookingData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   }
      // });

      // Success
      setShowSuccessModal(true);
      setBookingModalOpen(false);

      // Reset form
      setBookingForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        university: "",
        course: "",
        arrivalDate: "",
        departureDate: "",
        duration: "",
        numberOfOccupants: "1",
        specialRequirements: "",
        emergencyContact: "",
        preferredPayment: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setBookingModalOpen(false);
    setSelectedAccommodation(null);
    setShowPreDepartureGuide(false);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  // Accommodation Card Component (now inside main component but memoized)
  const AccommodationCard = React.memo(({ accommodation }) => {
    const isSaved = savedAccommodations.includes(accommodation.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={accommodation.images[0]}
            alt={accommodation.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <div
              className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
                accommodation.type === "University Dormitory"
                  ? "bg-blue-600"
                  : accommodation.type === "Private Apartment"
                  ? "bg-green-600"
                  : accommodation.type === "Shared Apartment"
                  ? "bg-purple-600"
                  : accommodation.type === "Homestay"
                  ? "bg-orange-600"
                  : "bg-pink-600"
              }`}
            >
              {accommodation.type}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleSaveAccommodation(accommodation.id);
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isSaved ? (
                <BookmarkIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {accommodation.featured && (
              <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                Featured
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full">
              <LocationOnIcon className="h-3 w-3 mr-1" />
              <span className="text-xs font-bold">{accommodation.city}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {accommodation.name}
              </h3>
              <div className="flex items-center text-gray-600">
                <SchoolIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">{accommodation.university}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Rating</div>
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{accommodation.rating}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <AttachMoneyIcon className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">
                  Monthly Price
                </span>
              </div>
              <p className="text-sm text-gray-600">{accommodation.price}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <DirectionsWalkIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">
                  Distance
                </span>
              </div>
              <p className="text-sm text-gray-600">{accommodation.distance}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
              {accommodation.amenities.length > 4 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  +{accommodation.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  accommodation.availability === "Available"
                    ? "bg-green-100 text-green-800"
                    : accommodation.availability === "Limited"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {accommodation.availability}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedAccommodation(accommodation);
                }}
                className="text-blue-600 font-semibold text-sm hover:text-blue-700"
              >
                View Details
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBookNow(accommodation);
                }}
                className="text-green-600 font-semibold text-sm flex items-center hover:text-green-700"
              >
                Book Now
                <ArrowForwardIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  });

  // Pagination Component
  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`w-10 h-10 rounded-lg font-semibold ${
              currentPage === number
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 text-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Accommodation & Pre-Departure Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto">
            Find your perfect home abroad with our verified accommodations and
            comprehensive pre-departure support
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            {
              icon: HomeIcon,
              value: "2,500+",
              label: "Verified Accommodations",
            },
            { icon: CheckCircleIcon, value: "98%", label: "Satisfaction Rate" },
            { icon: GroupsIcon, value: "30+", label: "Countries Covered" },
            {
              icon: EmojiEventsIcon,
              value: "95%",
              label: "Booking Success Rate",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <HomeIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Find Accommodation</h3>
            <p className="opacity-90">
              Browse verified student accommodations worldwide
            </p>
          </button>

          <button
            onClick={() => setShowPreDepartureGuide(true)}
            className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <FlightTakeoff className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Pre-Departure Guide</h3>
            <p className="opacity-90">
              Essential checklist for your study abroad journey
            </p>
          </button>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <SupportAgent className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Personal Support</h3>
            <p className="opacity-90">Get personalized housing assistance</p>
          </button>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Accommodations
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by city, university, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Country
              </label>
              <select
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {countries.map((country, index) => (
                  <option
                    key={index}
                    value={country === "All Countries" ? "" : country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="price">Price (Low to High)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="distance">Distance (Near to Far)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Accommodation Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {accommodationTypes.map((type, index) => (
                  <option key={index} value={type === "All Types" ? "" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {priceRanges.map((range, index) => (
                  <option
                    key={index}
                    value={range === "All Prices" ? "" : range}
                  >
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-black">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Distance from University
              </label>
              <select
                value={filters.distance}
                onChange={(e) =>
                  setFilters({ ...filters, distance: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {distances.map((distance, index) => (
                  <option
                    key={index}
                    value={distance === "All Distances" ? "" : distance}
                  >
                    {distance}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    country: "",
                    city: "",
                    type: "",
                    priceRange: "",
                    distance: "",
                    amenities: [],
                  });
                  setSearchQuery("");
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Amenities Filter */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-blue-400 mb-3">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      amenities: prev.amenities.includes(amenity)
                        ? prev.amenities.filter((a) => a !== amenity)
                        : [...prev.amenities, amenity],
                    }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.amenities.includes(amenity)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {[
              "All Accommodations",
              "University Dorms",
              "Private Apartments",
              "Shared Housing",
              "Budget Friendly",
              "Premium Options",
            ].map((tab) => (
              <button
                key={tab}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                  if (tab === "University Dorms") {
                    setFilters({ ...filters, type: "University Dormitory" });
                  } else if (tab === "Private Apartments") {
                    setFilters({ ...filters, type: "Private Apartment" });
                  } else if (tab === "Shared Housing") {
                    setFilters({ ...filters, type: "Shared Apartment" });
                  } else if (tab === "Budget Friendly") {
                    setFilters({
                      ...filters,
                      priceRange: "Budget (< $500/month)",
                    });
                  } else if (tab === "Premium Options") {
                    setFilters({
                      ...filters,
                      priceRange: "Premium ($1500 - $2500/month)",
                    });
                  } else {
                    setFilters({
                      country: "",
                      city: "",
                      type: "",
                      priceRange: "",
                      distance: "",
                      amenities: [],
                    });
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Accommodations Section */}
        {activeTab === "All Accommodations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Featured Student Accommodations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAccommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Accommodations Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Loading accommodation information...
              </p>
            </div>
          ) : filteredAccommodations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No accommodations found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-100">
                  {filteredAccommodations.length} Accommodations Available
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Housing Assistance
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentAccommodations.map((accommodation) => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                  />
                ))}
              </div>

              <Pagination />
            </>
          )}
        </div>

        {/* Why Choose Our Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose RECAPPLY Accommodation Services?
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Verified Accommodations",
                  description:
                    "All listings are verified for safety and quality standards",
                },
                {
                  title: "Local Housing Specialists",
                  description: "Expert support in each destination country",
                },
                {
                  title: "End-to-End Support",
                  description: "From search to move-in and settlement",
                },
                {
                  title: "Cultural Adaptation",
                  description:
                    "Help with local customs and community integration",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-6">
              Our Accommodation Services Include
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <HomeIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">
                    Housing Search & Selection
                  </h3>
                  <p className="opacity-90">
                    Find the perfect accommodation based on your needs
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <VerifiedUserIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">
                    Verification & Safety Check
                  </h3>
                  <p className="opacity-90">
                    Thorough background checks on all accommodations
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FlightTakeoffIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">
                    Pre-Departure Preparation
                  </h3>
                  <p className="opacity-90">
                    Complete guide for your study abroad journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Home Abroad!
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have found safe, comfortable, and
            affordable accommodations through our service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Start Accommodation Search
            </button>
            <button
              onClick={() => setShowPreDepartureGuide(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Get Pre-Departure Guide
            </button>
          </div>
        </motion.div>
      </div>

      {/* Render all modals outside the main component flow */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        bookingForm={bookingForm}
        handleInputChange={handleInputChange}
        handleBookingSubmit={handleBookingSubmit}
        selectedAccommodation={selectedAccommodation}
        isSubmitting={isSubmitting}
      />

      <AccommodationDetailModal
        isOpen={!!selectedAccommodation}
        onClose={() => setSelectedAccommodation(null)}
        accommodation={selectedAccommodation}
        savedAccommodations={savedAccommodations}
        toggleSaveAccommodation={toggleSaveAccommodation}
        onBookNow={handleBookNow}
        onShowPreDepartureGuide={handleShowPreDepartureGuide}
      />

      <PreDepartureGuideModal
        isOpen={showPreDepartureGuide}
        onClose={() => setShowPreDepartureGuide(false)}
        currentCountry={currentCountry}
        preDepartureChecklist={preDepartureChecklist}
      />

      {showSuccessModal && <SuccessModal onClose={closeAllModals} />}
      {showErrorModal && <ErrorModal onClose={closeAllModals} />}
    </div>
  );
};
