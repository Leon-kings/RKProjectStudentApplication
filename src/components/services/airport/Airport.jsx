// /* eslint-disable no-case-declarations */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// // Material Icons
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import FlightLandIcon from '@mui/icons-material/FlightLand';
// import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
// import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
// import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import HotelIcon from '@mui/icons-material/Hotel';
// import LuggageIcon from '@mui/icons-material/Luggage';
// import PeopleIcon from '@mui/icons-material/People';
// import ScheduleIcon from '@mui/icons-material/Schedule';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import LanguageIcon from '@mui/icons-material/Language';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningIcon from '@mui/icons-material/Warning';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
// import DownloadIcon from '@mui/icons-material/Download';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PublicIcon from '@mui/icons-material/Public';
// import MapIcon from '@mui/icons-material/Map';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import SortIcon from '@mui/icons-material/Sort';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import TrainIcon from '@mui/icons-material/Train';
// import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
// import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
// import ChildCareIcon from '@mui/icons-material/ChildCare';
// import PetsIcon from '@mui/icons-material/Pets';
// import WifiIcon from '@mui/icons-material/Wifi';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import SecurityIcon from '@mui/icons-material/Security';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import GroupsIcon from '@mui/icons-material/Groups';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SpeedIcon from '@mui/icons-material/Speed';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ChecklistIcon from '@mui/icons-material/Checklist';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import QuizIcon from '@mui/icons-material/Quiz';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import BusinessIcon from '@mui/icons-material/Business';
// import WorkIcon from '@mui/icons-material/Work';
// import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import GavelIcon from '@mui/icons-material/Gavel';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// // API Configuration
// const API_BASE_URL = 'https://your-api-server.com/api';

// export const AirportServices = () => {
//   // State Management
//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedService, setSelectedService] = useState(null);
//   const [savedServices, setSavedServices] = useState([]);
//   const [bookingModalOpen, setBookingModalOpen] = useState(false);
//   const [airportInfoModalOpen, setAirportInfoModalOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     country: '',
//     airport: '',
//     serviceType: '',
//     language: '',
//     availability: 'available'
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('rating');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [servicesPerPage] = useState(9);
//   const [activeTab, setActiveTab] = useState('all');
//   const [showAirportGuide, setShowAirportGuide] = useState(false);
//   const [currentAirport, setCurrentAirport] = useState('');

//   // Booking form state
//   const [bookingForm, setBookingForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     nationality: '',
//     flightNumber: '',
//     airline: '',
//     arrivalDate: '',
//     arrivalTime: '',
//     departureDate: '',
//     departureTime: '',
//     airport: '',
//     terminal: '',
//     serviceType: '',
//     numberOfPassengers: '1',
//     numberOfBags: '1',
//     specialRequirements: '',
//     paymentMethod: '',
//     emergencyContact: '',
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

//   // Service types
//   const serviceTypes = [
//     'All Services',
//     'Airport Pickup',
//     'Airport Drop-off',
//     'Meet & Greet',
//     'VIP Services',
//     'Airport Transfer',
//     'Luggage Assistance',
//     'Hotel Transfer',
//     'City Tour',
//     'Emergency Assistance'
//   ];

//   // Languages
//   const languages = [
//     'All Languages',
//     'English',
//     'Chinese',
//     'French',
//     'German',
//     'Spanish',
//     'Arabic',
//     'Russian',
//     'Japanese',
//     'Korean',
//     'Turkish',
//     'Polish',
//     'Swahili'
//   ];

//   // Airports
//   const airports = [
//     'All Airports',
//     'Beijing Capital Airport (PEK)',
//     'Shanghai Pudong (PVG)',
//     'Guangzhou Baiyun (CAN)',
//     'Toronto Pearson (YYZ)',
//     'Vancouver (YVR)',
//     'Frankfurt (FRA)',
//     'Berlin Brandenburg (BER)',
//     'Munich (MUC)',
//     'Warsaw Chopin (WAW)',
//     'Krakow (KRK)',
//     'Istanbul Airport (IST)',
//     'Istanbul Sabiha Gokcen (SAW)',
//     'New York JFK (JFK)',
//     'Los Angeles (LAX)',
//     'London Heathrow (LHR)',
//     'London Gatwick (LGW)',
//     'Sydney Kingsford Smith (SYD)',
//     'Melbourne (MEL)',
//     'Tokyo Narita (NRT)',
//     'Tokyo Haneda (HND)',
//     'Seoul Incheon (ICN)',
//     'Singapore Changi (SIN)',
//     'Kuala Lumpur (KUL)',
//     'Paris Charles de Gaulle (CDG)',
//     'Amsterdam Schiphol (AMS)',
//     'Dubai International (DXB)'
//   ];

//   // Featured services
//   const featuredServices = [
//     {
//       id: 1,
//       name: 'Beijing Airport VIP Meet & Greet',
//       country: 'China',
//       airport: 'Beijing Capital Airport (PEK)',
//       serviceType: 'VIP Services',
//       languages: ['Chinese', 'English'],
//       price: '$120',
//       duration: '2-3 hours',
//       rating: 4.8,
//       features: [
//         'Personal Meet & Greet at Arrival Gate',
//         'Fast Track Immigration Assistance',
//         'Luggage Collection Support',
//         'Escort to Transportation',
//         'SIM Card Assistance',
//         'Currency Exchange Guidance'
//       ],
//       description: 'Premium VIP service for first-time visitors to China. Our representative meets you at the arrival gate and assists through all airport procedures.',
//       inclusions: [
//         'Professional Bilingual Guide',
//         'Airport Navigation Assistance',
//         'Help with SIM Card Purchase',
//         'Transportation Arrangement',
//         'Emergency Contact Support'
//       ],
//       images: [
//         'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: '24/7',
//       bookingWindow: '72 hours in advance',
//       cancellationPolicy: 'Free cancellation 24 hours before',
//       contact: 'beijing-services@recapply.com',
//       maxPassengers: '4',
//       instantConfirmation: true,
//       safetyRating: '9.5/10'
//     },
//     {
//       id: 2,
//       name: 'Toronto Airport Student Welcome Package',
//       country: 'Canada',
//       airport: 'Toronto Pearson (YYZ)',
//       serviceType: 'Meet & Greet',
//       languages: ['English', 'French', 'Chinese'],
//       price: '$85',
//       duration: '2 hours',
//       rating: 4.6,
//       features: [
//         'Student Welcome at Arrivals',
//         'SIM Card Setup Assistance',
//         'Bank Account Guidance',
//         'Transport to Accommodation',
//         'Orientation Briefing',
//         'Emergency Support'
//       ],
//       description: 'Special welcome service for international students arriving in Canada. Includes essential setup assistance for new students.',
//       inclusions: [
//         'Welcome Package with Local Info',
//         'SIM Card Purchase Help',
//         'Bank Account Opening Info',
//         'Direct Transport to Residence',
//         '24/7 Student Support Line'
//       ],
//       images: [
//         'https://images.unsplash.com/photo-1519677100203-7c61d0b01354?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: '6 AM - Midnight',
//       bookingWindow: '48 hours in advance',
//       cancellationPolicy: 'Free cancellation 12 hours before',
//       contact: 'toronto-welcome@recapply.com',
//       maxPassengers: '3',
//       instantConfirmation: true,
//       safetyRating: '9.2/10'
//     },
//     {
//       id: 3,
//       name: 'Istanbul Airport Transfer & Tour',
//       country: 'Turkey',
//       airport: 'Istanbul Airport (IST)',
//       serviceType: 'Airport Transfer',
//       languages: ['Turkish', 'English', 'Arabic'],
//       price: '$65',
//       duration: '1-4 hours',
//       rating: 4.7,
//       features: [
//         'Private Airport Transfer',
//         'City Orientation Tour',
//         'Local SIM Card Assistance',
//         'Hotel Check-in Help',
//         'Cultural Briefing',
//         'Restaurant Recommendations'
//       ],
//       description: 'Combined airport transfer and city orientation service perfect for first-time visitors to Istanbul.',
//       inclusions: [
//         'Private Vehicle with Driver',
//         '1 Hour City Orientation',
//         'Local Tips & Recommendations',
//         'Hotel Delivery',
//         '24/7 Support'
//       ],
//       images: [
//         'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1506970845872-504d6b2d49e8?auto=format&fit=crop&w=800&q=80'
//       ],
//       featured: true,
//       availability: '24/7',
//       bookingWindow: '24 hours in advance',
//       cancellationPolicy: 'Free cancellation 6 hours before',
//       contact: 'istanbul-transfer@recapply.com',
//       maxPassengers: '6',
//       instantConfirmation: true,
//       safetyRating: '9.0/10'
//     }
//   ];

//   // Airport guides
//   const airportGuides = {
//     'Beijing Capital Airport (PEK)': {
//       terminals: ['T1', 'T2', 'T3'],
//       currencyExchange: 'Available in all terminals',
//       simCards: 'China Mobile/China Unicom counters available',
//       transportation: ['Airport Express Train', 'Taxis', 'Buses', 'Private Transfers'],
//       wifi: 'Free 3-hour WiFi with passport registration',
//       luggageStorage: 'Available in T2 and T3',
//       prayerRooms: 'Available in all terminals',
//       smokingAreas: 'Designated areas outside terminals',
//       emergencyContacts: 'Airport Police: +86 10 6453 0110',
//       tips: [
//         'Register for WiFi at information desks',
//         'Keep passport ready for immigration',
//         'Use official taxi stands only',
//         'Allow 3+ hours for international connections'
//       ]
//     },
//     'Toronto Pearson (YYZ)': {
//       terminals: ['Terminal 1', 'Terminal 3'],
//       currencyExchange: 'Available throughout airport',
//       simCards: 'Rogers/Bell/Telus stores available',
//       transportation: ['UP Express Train', 'Taxis', 'Buses', 'Ride-share'],
//       wifi: 'Free unlimited WiFi',
//       luggageStorage: 'Available in both terminals',
//       prayerRooms: 'Multi-faith prayer rooms available',
//       smokingAreas: 'Designated areas outside only',
//       emergencyContacts: 'Airport Security: +1 416 776-3000',
//       tips: [
//         'Use UP Express for downtown Toronto',
//         'Declare all food products at customs',
//         'Have Canadian address ready for customs',
//         'Use ArriveCAN app for faster clearance'
//       ]
//     },
//     'Istanbul Airport (IST)': {
//       terminals: ['Main Terminal'],
//       currencyExchange: 'Multiple locations throughout',
//       simCards: 'Turkcell/Vodafone/Turk Telekom available',
//       transportation: ['Havaist Buses', 'Taxis', 'Metro', 'Private Transfers'],
//       wifi: 'Free 1-hour WiFi, paid options available',
//       luggageStorage: 'Available in arrivals area',
//       prayerRooms: 'Mosques available in airport',
//       smokingAreas: 'Designated indoor areas',
//       emergencyContacts: 'Airport Police: +90 212 465 5555',
//       tips: [
//         'Get Istanbulkart for public transport',
//         'Exchange money at airport for best rates',
//         'Have hotel address written in Turkish',
//         'Allow extra time for security checks'
//       ]
//     }
//   };

//   // Airport checklist
//   const airportChecklist = [
//     {
//       category: 'Before Departure',
//       items: [
//         { id: 1, name: 'Passport with 6+ months validity', completed: false },
//         { id: 2, name: 'Visa/Entry Documents', completed: false },
//         { id: 3, name: 'Flight Tickets (Printed/Digital)', completed: false },
//         { id: 4, name: 'Accommodation Details', completed: false },
//         { id: 5, name: 'Travel Insurance Documents', completed: false },
//       ]
//     },
//     {
//       category: 'At the Airport',
//       items: [
//         { id: 6, name: 'Check-in 3 hours before international flight', completed: false },
//         { id: 7, name: 'Liquids in 100ml containers in clear bag', completed: false },
//         { id: 8, name: 'Electronics charged and accessible', completed: false },
//         { id: 9, name: 'Boarding Pass Ready', completed: false },
//         { id: 10, name: 'Local Currency for immediate needs', completed: false },
//       ]
//     },
//     {
//       category: 'Upon Arrival',
//       items: [
//         { id: 11, name: 'Immigration Forms filled out', completed: false },
//         { id: 12, name: 'Customs Declaration ready', completed: false },
//         { id: 13, name: 'Local SIM Card/Mobile Data', completed: false },
//         { id: 14, name: 'Transportation arranged', completed: false },
//         { id: 15, name: 'Emergency contacts saved', completed: false },
//       ]
//     }
//   ];

//   // Fetch services data
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // Apply filters when filters change
//   useEffect(() => {
//     applyFilters();
//   }, [filters, searchQuery, sortBy, services]);

//   const fetchServices = async () => {
//     setLoading(true);
//     try {
//       // Sample services data
//       const sampleData = [
//         ...featuredServices,
//         {
//           id: 4,
//           name: 'Frankfurt Airport Fast Track',
//           country: 'Germany',
//           airport: 'Frankfurt (FRA)',
//           serviceType: 'VIP Services',
//           languages: ['German', 'English', 'French'],
//           price: '€95',
//           duration: '1-2 hours',
//           rating: 4.5,
//           features: [
//             'Fast Track Immigration',
//             'Personal Concierge',
//             'Lounge Access',
//             'Luggage Priority',
//             'Transport Coordination'
//           ],
//           description: 'Expedited service through Frankfurt Airport with lounge access and personal assistance.',
//           inclusions: [
//             'Fast Track Pass',
//             'Lounge Access (2 hours)',
//             'Personal Assistant',
//             'Luggage Assistance',
//             'Transport Booking'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '5 AM - 11 PM',
//           bookingWindow: '24 hours in advance',
//           cancellationPolicy: 'Free cancellation 12 hours before',
//           contact: 'frankfurt-vip@recapply.com',
//           maxPassengers: '2',
//           instantConfirmation: true,
//           safetyRating: '9.3/10'
//         },
//         {
//           id: 5,
//           name: 'London Heathrow Student Arrival',
//           country: 'UK',
//           airport: 'London Heathrow (LHR)',
//           serviceType: 'Meet & Greet',
//           languages: ['English', 'Chinese', 'Arabic'],
//           price: '£75',
//           duration: '2 hours',
//           rating: 4.4,
//           features: [
//             'Student Welcome Service',
//             'Oyster Card Setup',
//             'UK SIM Card Assistance',
//             'University Transport',
//             'Accommodation Check-in Help'
//           ],
//           description: 'Complete arrival service for international students starting their UK education.',
//           inclusions: [
//             'Welcome at Arrivals',
//             'Oyster Card Setup',
//             'SIM Card Purchase Help',
//             'Direct Transport',
//             '24/7 Support Line'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '6 AM - Midnight',
//           bookingWindow: '48 hours in advance',
//           cancellationPolicy: 'Free cancellation 24 hours before',
//           contact: 'lhr-student@recapply.com',
//           maxPassengers: '4',
//           instantConfirmation: true,
//           safetyRating: '9.1/10'
//         },
//         {
//           id: 6,
//           name: 'Sydney Airport Family Package',
//           country: 'Australia',
//           airport: 'Sydney Kingsford Smith (SYD)',
//           serviceType: 'Meet & Greet',
//           languages: ['English', 'Chinese', 'Vietnamese'],
//           price: '$110',
//           duration: '3 hours',
//           rating: 4.9,
//           features: [
//             'Family Welcome Service',
//             'Child-Friendly Assistance',
//             'Stroller Arrangements',
//             'Family Transport',
//             'Accommodation Delivery'
//           ],
//           description: 'Special service for families arriving in Australia with children. Includes child-friendly assistance.',
//           inclusions: [
//             'Family Greeting',
//             'Child Care Assistance',
//             'Stroller/Car Seat Setup',
//             'Family Vehicle',
//             'Entertainment for Kids'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '24/7',
//           bookingWindow: '72 hours in advance',
//           cancellationPolicy: 'Free cancellation 24 hours before',
//           contact: 'sydney-family@recapply.com',
//           maxPassengers: '6',
//           instantConfirmation: true,
//           safetyRating: '9.7/10'
//         },
//         {
//           id: 7,
//           name: 'Tokyo Narita Essential Arrival',
//           country: 'Japan',
//           airport: 'Tokyo Narita (NRT)',
//           serviceType: 'Airport Pickup',
//           languages: ['Japanese', 'English', 'Chinese'],
//           price: '¥8,500',
//           duration: '2-3 hours',
//           rating: 4.6,
//           features: [
//             'Bilingual Guide Meeting',
//             'JR Pass Activation Help',
//             'Pocket WiFi Setup',
//             'Transport to Tokyo',
//             'Cultural Orientation'
//           ],
//           description: 'Essential arrival service for visitors to Japan with assistance for key tourist needs.',
//           inclusions: [
//             'Bilingual Guide',
//             'JR Pass Activation',
//             'Pocket WiFi Setup',
//             'Train/Bus Guidance',
//             'Local Tips'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '7 AM - 10 PM',
//           bookingWindow: '48 hours in advance',
//           cancellationPolicy: 'Free cancellation 12 hours before',
//           contact: 'narita-arrival@recapply.com',
//           maxPassengers: '4',
//           instantConfirmation: true,
//           safetyRating: '9.4/10'
//         },
//         {
//           id: 8,
//           name: 'Singapore Changi Tour & Transfer',
//           country: 'Singapore',
//           airport: 'Singapore Changi (SIN)',
//           serviceType: 'City Tour',
//           languages: ['English', 'Chinese', 'Malay', 'Tamil'],
//           price: '$90',
//           duration: '4-6 hours',
//           rating: 4.8,
//           features: [
//             'Airport Pickup',
//             'Changi Jewel Tour',
//             'City Orientation',
//             'Hotel Transfer',
//             'Local Food Introduction'
//           ],
//           description: 'Explore Singapore starting from the world\'s best airport with guided tour and transfer.',
//           inclusions: [
//             'Airport Pickup',
//             'Jewel Changi Tour',
//             'City Highlights Drive',
//             'Hotel Delivery',
//             'Food Recommendations'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '8 AM - 8 PM',
//           bookingWindow: '24 hours in advance',
//           cancellationPolicy: 'Free cancellation 6 hours before',
//           contact: 'changi-tour@recapply.com',
//           maxPassengers: '5',
//           instantConfirmation: true,
//           safetyRating: '9.6/10'
//         },
//         {
//           id: 9,
//           name: 'Dubai Airport Luxury Transfer',
//           country: 'UAE',
//           airport: 'Dubai International (DXB)',
//           serviceType: 'VIP Services',
//           languages: ['Arabic', 'English', 'Russian', 'French'],
//           price: '$150',
//           duration: '1-2 hours',
//           rating: 4.7,
//           features: [
//             'Luxury Vehicle Transfer',
//             'Fast Track Immigration',
//             'Lounge Access',
//             'Personal Concierge',
//             'Hotel Check-in Assistance'
//           ],
//           description: 'Premium luxury service for Dubai arrivals with exclusive fast track and luxury transport.',
//           inclusions: [
//             'Luxury Vehicle',
//             'Fast Track Service',
//             'Premium Lounge Access',
//             'Personal Concierge',
//             'Hotel Delivery'
//           ],
//           images: [
//             'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
//           ],
//           featured: false,
//           availability: '24/7',
//           bookingWindow: '12 hours in advance',
//           cancellationPolicy: 'Free cancellation 6 hours before',
//           contact: 'dubai-luxury@recapply.com',
//           maxPassengers: '3',
//           instantConfirmation: true,
//           safetyRating: '9.3/10'
//         }
//       ];

//       setServices(sampleData);
//       setFilteredServices(sampleData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setLoading(false);
//       toast.error('Failed to load airport services data');
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...services];

//     // Apply search filter
//     if (searchQuery) {
//       filtered = filtered.filter(service =>
//         service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply country filter
//     if (filters.country && filters.country !== 'All Countries') {
//       filtered = filtered.filter(service => service.country === filters.country);
//     }

//     // Apply airport filter
//     if (filters.airport && filters.airport !== 'All Airports') {
//       filtered = filtered.filter(service => service.airport === filters.airport);
//     }

//     // Apply service type filter
//     if (filters.serviceType && filters.serviceType !== 'All Services') {
//       filtered = filtered.filter(service => service.serviceType === filters.serviceType);
//     }

//     // Apply language filter
//     if (filters.language && filters.language !== 'All Languages') {
//       filtered = filtered.filter(service => 
//         service.languages.includes(filters.language)
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
//       case 'duration':
//         const getHours = (duration) => {
//           const match = duration.match(/(\d+)/);
//           return match ? parseInt(match[1]) : 0;
//         };
//         filtered.sort((a, b) => getHours(a.duration) - getHours(b.duration));
//         break;
//       default:
//         filtered.sort((a, b) => b.rating - a.rating);
//     }

//     setFilteredServices(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const indexOfLastService = currentPage * servicesPerPage;
//   const indexOfFirstService = indexOfLastService - servicesPerPage;
//   const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
//   const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Save service to favorites
//   const toggleSaveService = (serviceId) => {
//     if (savedServices.includes(serviceId)) {
//       setSavedServices(savedServices.filter(id => id !== serviceId));
//       toast.info('Removed from saved services');
//     } else {
//       setSavedServices([...savedServices, serviceId]);
//       toast.success('Service saved to favorites');
//     }
//   };

//   // Handle booking
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_BASE_URL}/airport-service-booking`, {
//         ...bookingForm,
//         timestamp: new Date().toISOString(),
//         serviceId: selectedService?.id,
//         serviceName: selectedService?.name
//       });

//       toast.success('Airport service booking submitted! Our representative will contact you within 12 hours.');
//       setBookingModalOpen(false);
//       setBookingForm({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         nationality: '',
//         flightNumber: '',
//         airline: '',
//         arrivalDate: '',
//         arrivalTime: '',
//         departureDate: '',
//         departureTime: '',
//         airport: '',
//         terminal: '',
//         serviceType: '',
//         numberOfPassengers: '1',
//         numberOfBags: '1',
//         specialRequirements: '',
//         paymentMethod: '',
//         emergencyContact: '',
//         additionalInfo: ''
//       });
//     } catch (error) {
//       toast.error('Error submitting booking request. Please try again.');
//       console.error('Booking error:', error);
//     }
//   };

//   // Service Card Component
//   const ServiceCard = ({ service }) => {
//     const isSaved = savedServices.includes(service.id);

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
//       >
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={service.images[0]}
//             alt={service.name}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//           />
//           <div className="absolute top-4 left-4">
//             <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
//               service.serviceType === 'VIP Services' ? 'bg-purple-600' : 
//               service.serviceType === 'Meet & Greet' ? 'bg-blue-600' : 
//               service.serviceType === 'Airport Transfer' ? 'bg-green-600' : 
//               service.serviceType === 'Airport Pickup' ? 'bg-orange-600' : 'bg-pink-600'
//             }`}>
//               {service.serviceType}
//             </div>
//           </div>
//           <div className="absolute top-4 right-4 flex space-x-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleSaveService(service.id);
//               }}
//               className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
//             >
//               {isSaved ? (
//                 <BookmarkIcon className="h-5 w-5 text-blue-600" />
//               ) : (
//                 <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
//               )}
//             </button>
//             {service.featured && (
//               <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
//                 Featured
//               </div>
//             )}
//           </div>
//           <div className="absolute bottom-4 left-4">
//             <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full">
//               <FlightLandIcon className="h-3 w-3 mr-1" />
//               <span className="text-xs font-bold">{service.airport.split('(')[0].trim()}</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="flex items-start justify-between mb-3">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
//               <div className="flex items-center text-gray-600">
//                 <LocationOnIcon className="h-4 w-4 mr-1" />
//                 <span className="text-sm">{service.country}</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-gray-600">Rating</div>
//               <div className="flex items-center">
//                 <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
//                 <span className="font-semibold">{service.rating}</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <div className="flex items-center mb-1">
//                 <AttachMoneyIcon className="h-4 w-4 text-blue-600 mr-2" />
//                 <span className="text-sm font-semibold text-gray-700">Price</span>
//               </div>
//               <p className="text-sm text-gray-600">{service.price}</p>
//             </div>
//             <div className="bg-green-50 p-3 rounded-lg">
//               <div className="flex items-center mb-1">
//                 <ScheduleIcon className="h-4 w-4 text-green-600 mr-2" />
//                 <span className="text-sm font-semibold text-gray-700">Duration</span>
//               </div>
//               <p className="text-sm text-gray-600">{service.duration}</p>
//             </div>
//           </div>

//           <div className="mb-4">
//             <h4 className="text-sm font-semibold text-gray-700 mb-2">Languages</h4>
//             <div className="flex flex-wrap gap-2">
//               {service.languages.slice(0, 3).map((lang, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
//                 >
//                   {lang}
//                 </span>
//               ))}
//               {service.languages.length > 3 && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                   +{service.languages.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//             <div className="text-sm text-gray-600">
//               <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                 service.availability === '24/7' 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-blue-100 text-blue-800'
//               }`}>
//                 {service.availability}
//               </span>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => {
//                   setCurrentAirport(service.airport);
//                   setAirportInfoModalOpen(true);
//                 }}
//                 className="text-blue-600 font-semibold text-sm hover:text-blue-700"
//               >
//                 Airport Info
//               </button>
//               <button
//                 onClick={() => {
//                   setSelectedService(service);
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

//   // Service Detail Modal
//   const ServiceDetailModal = () => {
//     if (!selectedService) return null;

//     const isSaved = savedServices.includes(selectedService.id);

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setSelectedService(null)}
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
//                     selectedService.serviceType === 'VIP Services' ? 'bg-purple-600' : 
//                     selectedService.serviceType === 'Meet & Greet' ? 'bg-blue-600' : 
//                     selectedService.serviceType === 'Airport Transfer' ? 'bg-green-600' : 
//                     selectedService.serviceType === 'Airport Pickup' ? 'bg-orange-600' : 'bg-pink-600'
//                   }`}>
//                     {selectedService.serviceType}
//                   </div>
//                   {selectedService.featured && (
//                     <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
//                       Featured Service
//                     </div>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedService.name}</h2>
//                 <div className="flex items-center mt-2 space-x-4">
//                   <div className="flex items-center">
//                     <FlightLandIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-gray-600">{selectedService.airport}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-gray-600">{selectedService.country}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => toggleSaveService(selectedService.id)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   {isSaved ? (
//                     <BookmarkIcon className="h-6 w-6 text-blue-600" />
//                   ) : (
//                     <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setSelectedService(null)}
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
//                     src={selectedService.images[0]}
//                     alt={selectedService.name}
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">Service Overview</h3>
//                   <p className="text-gray-700 mb-4">{selectedService.description}</p>
                  
//                   <div className="bg-blue-50 p-4 rounded-xl mb-4">
//                     <h4 className="font-bold text-blue-800 mb-2">Key Features:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                       {selectedService.features.map((feature, index) => (
//                         <div key={index} className="flex items-start">
//                           <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                           <span className="text-blue-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-green-50 p-4 rounded-xl">
//                     <div className="flex items-center mb-2">
//                       <AttachMoneyIcon className="h-6 w-6 text-green-600 mr-2" />
//                       <span className="font-semibold text-gray-800">Service Price</span>
//                     </div>
//                     <p className="text-2xl font-bold text-green-700">{selectedService.price}</p>
//                     <p className="text-sm text-gray-600 mt-1">Duration: {selectedService.duration}</p>
//                   </div>
//                   <div className="bg-purple-50 p-4 rounded-xl">
//                     <div className="flex items-center mb-2">
//                       <PeopleIcon className="h-6 w-6 text-purple-600 mr-2" />
//                       <span className="font-semibold text-gray-800">Max Passengers</span>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-700">{selectedService.maxPassengers}</p>
//                     <p className="text-sm text-gray-600 mt-1">Instant Confirmation: {selectedService.instantConfirmation ? 'Yes' : 'No'}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <h4 className="font-bold text-gray-900 mb-4">Service Details</h4>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Availability</p>
//                       <p className="font-semibold text-gray-900">{selectedService.availability}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Booking Window</p>
//                       <p className="font-semibold text-gray-900">{selectedService.bookingWindow}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Cancellation Policy</p>
//                       <p className="font-semibold text-gray-900">{selectedService.cancellationPolicy}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Safety Rating</p>
//                       <div className="flex items-center">
//                         <SecurityIcon className="h-5 w-5 text-green-600 mr-2" />
//                         <span className="font-semibold text-gray-900">{selectedService.safetyRating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
//                   <h4 className="font-bold mb-4">Inclusions</h4>
//                   <ul className="space-y-2">
//                     {selectedService.inclusions.map((inclusion, index) => (
//                       <li key={index} className="flex items-center">
//                         <ChecklistIcon className="h-4 w-4 mr-2" />
//                         {inclusion}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => {
//                       setBookingForm(prev => ({
//                         ...prev,
//                         serviceType: selectedService.serviceType,
//                         airport: selectedService.airport
//                       }));
//                       setBookingModalOpen(true);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Book This Service
//                   </button>
//                   <button
//                     onClick={() => {
//                       setCurrentAirport(selectedService.airport);
//                       setAirportInfoModalOpen(true);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Airport Information
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Languages Available</h3>
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <div className="flex flex-wrap gap-2">
//                     {selectedService.languages.map((language, index) => (
//                       <span
//                         key={index}
//                         className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium"
//                       >
//                         {language}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <div className="space-y-3">
//                     <div className="flex items-center">
//                       <EmailIcon className="h-5 w-5 text-red-500 mr-3" />
//                       <span className="text-gray-700">{selectedService.contact}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <PhoneIcon className="h-5 w-5 text-green-500 mr-3" />
//                       <span className="text-gray-700">+250 783 408 617 (RECAPPLY Support)</span>
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
//                     <li>• Provide accurate flight details for smooth service</li>
//                     <li>• Have passport and travel documents ready</li>
//                     <li>• Inform us of any delays or changes immediately</li>
//                     <li>• Keep RECAPPLY emergency contact number saved</li>
//                     <li>• Service provider will contact you 2 hours before arrival</li>
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
//                 <h2 className="text-2xl font-bold text-gray-900">Book Airport Service</h2>
//                 <p className="text-gray-600 mt-1">Our representatives will meet you at the airport</p>
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

//               {/* Flight Information */}
//               <div className="border-b pb-4">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Flight Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Flight Number *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.flightNumber}
//                       onChange={(e) => setBookingForm({...bookingForm, flightNumber: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="e.g., CA981"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Airline *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={bookingForm.airline}
//                       onChange={(e) => setBookingForm({...bookingForm, airline: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="e.g., Air China"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
//                       Arrival Time *
//                     </label>
//                     <input
//                       type="time"
//                       required
//                       value={bookingForm.arrivalTime}
//                       onChange={(e) => setBookingForm({...bookingForm, arrivalTime: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Service Details */}
//               <div className="border-b pb-4">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Airport *
//                     </label>
//                     <select
//                       required
//                       value={bookingForm.airport}
//                       onChange={(e) => setBookingForm({...bookingForm, airport: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     >
//                       <option value="">Select airport</option>
//                       {airports.filter(a => a !== 'All Airports').map((airport, index) => (
//                         <option key={index} value={airport}>{airport}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Terminal
//                     </label>
//                     <input
//                       type="text"
//                       value={bookingForm.terminal}
//                       onChange={(e) => setBookingForm({...bookingForm, terminal: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="e.g., T1, Terminal 3"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Number of Passengers *
//                     </label>
//                     <select
//                       required
//                       value={bookingForm.numberOfPassengers}
//                       onChange={(e) => setBookingForm({...bookingForm, numberOfPassengers: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
//                         <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Number of Bags
//                     </label>
//                     <select
//                       value={bookingForm.numberOfBags}
//                       onChange={(e) => setBookingForm({...bookingForm, numberOfBags: e.target.value})}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                     >
//                       {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
//                         <option key={num} value={num}>{num} {num === 1 ? 'Bag' : 'Bags'}</option>
//                       ))}
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
//                   placeholder="Any special requirements (wheelchair, child seats, pet travel, etc.)..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//               >
//                 Confirm Airport Service Booking
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Airport Information Modal
//   const AirportInfoModal = () => {
//     const airportData = airportGuides[currentAirport] || {};

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60"
//         onClick={() => setAirportInfoModalOpen(false)}
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
//                 <h2 className="text-2xl font-bold text-gray-900">{currentAirport}</h2>
//                 <p className="text-gray-600 mt-1">Complete airport guide and information</p>
//               </div>
//               <button
//                 onClick={() => setAirportInfoModalOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <CloseIcon className="h-6 w-6 text-gray-500" />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-2">
//                 <div className="bg-blue-50 p-5 rounded-xl mb-6">
//                   <h3 className="font-bold text-blue-800 mb-4">Airport Facilities</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="font-semibold text-gray-800 mb-2">Essential Services</h4>
//                       <ul className="space-y-2">
//                         <li className="flex items-center">
//                           <LocalAtmIcon className="h-4 w-4 text-green-600 mr-2" />
//                           <span>Currency Exchange: {airportData.currencyExchange || 'Available'}</span>
//                         </li>
//                         <li className="flex items-center">
//                           <WifiIcon className="h-4 w-4 text-blue-600 mr-2" />
//                           <span>WiFi: {airportData.wifi || 'Available'}</span>
//                         </li>
//                         <li className="flex items-center">
//                           <LuggageIcon className="h-4 w-4 text-orange-600 mr-2" />
//                           <span>Luggage Storage: {airportData.luggageStorage || 'Available'}</span>
//                         </li>
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800 mb-2">Transportation</h4>
//                       <ul className="space-y-2">
//                         {airportData.transportation?.map((transport, index) => (
//                           <li key={index} className="flex items-center">
//                             <DirectionsBusIcon className="h-4 w-4 text-purple-600 mr-2" />
//                             <span>{transport}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">Traveler Tips</h3>
//                   <div className="bg-yellow-50 p-5 rounded-xl">
//                     <ul className="space-y-3">
//                       {airportData.tips?.map((tip, index) => (
//                         <li key={index} className="flex items-start">
//                           <InfoIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
//                           <span className="text-yellow-800">{tip}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-5 rounded-xl">
//                   <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Terminals</p>
//                       <p className="font-semibold text-gray-900">
//                         {airportData.terminals?.join(', ') || 'Multiple'}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">SIM Cards</p>
//                       <p className="font-semibold text-gray-900">{airportData.simCards || 'Available in arrivals'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Prayer Rooms</p>
//                       <p className="font-semibold text-gray-900">{airportData.prayerRooms || 'Available'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Smoking Areas</p>
//                       <p className="font-semibold text-gray-900">{airportData.smokingAreas || 'Designated areas'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-red-50 p-5 rounded-xl">
//                   <h4 className="font-bold text-red-800 mb-3">Emergency Contacts</h4>
//                   <div className="space-y-2">
//                     <p className="text-red-700">{airportData.emergencyContacts || 'Airport Police: Available at information desks'}</p>
//                     <p className="text-sm text-red-600">RECAPPLY Emergency: +250 783 408 617</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => {
//                     setShowAirportGuide(true);
//                     setAirportInfoModalOpen(false);
//                   }}
//                   className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                 >
//                   Download Airport Guide
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Airport Guide Modal
//   const AirportGuideModal = () => {
//     const [activeChecklist, setActiveChecklist] = useState(0);
//     const [checklistItems, setChecklistItems] = useState(airportChecklist);

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
//         onClick={() => setShowAirportGuide(false)}
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
//                 <h2 className="text-2xl font-bold text-gray-900">Airport Travel Checklist</h2>
//                 <p className="text-gray-600 mt-1">Essential checklist for smooth airport experience</p>
//                 {currentAirport && (
//                   <div className="flex items-center mt-2">
//                     <FlightTakeoffIcon className="h-5 w-5 text-blue-500 mr-2" />
//                     <span className="text-blue-600 font-semibold">Airport: {currentAirport}</span>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={() => setShowAirportGuide(false)}
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

//             {/* Airport Security Tips */}
//             <div className="bg-blue-50 p-6 rounded-xl mb-6">
//               <h3 className="font-bold text-blue-800 mb-4">Airport Security Tips</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-white p-4 rounded-lg">
//                   <h4 className="font-semibold text-gray-900 mb-2">For Departure</h4>
//                   <ul className="text-sm text-gray-700 space-y-1">
//                     <li>• Arrive 3 hours before international flights</li>
//                     <li>• Keep liquids in 100ml containers in clear bag</li>
//                     <li>• Remove laptops and electronics from bags</li>
//                     <li>• Wear easy-to-remove shoes and belts</li>
//                   </ul>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg">
//                   <h4 className="font-semibold text-gray-900 mb-2">For Arrival</h4>
//                   <ul className="text-sm text-gray-700 space-y-1">
//                     <li>• Have passport and documents ready</li>
//                     <li>• Complete arrival forms in advance if possible</li>
//                     <li>• Declare all items as required</li>
//                     <li>• Know your accommodation address</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="bg-green-50 p-5 rounded-xl">
//                 <h4 className="font-bold text-green-800 mb-3">Packing for Airport</h4>
//                 <ul className="text-green-700 space-y-2">
//                   <li>• Passport and travel documents (carry-on)</li>
//                   <li>• Prescription medications (in original packaging)</li>
//                   <li>• Chargers and power banks</li>
//                   <li>• Change of clothes (in case of delays)</li>
//                   <li>• Snacks and empty water bottle</li>
//                   <li>• Entertainment (books, headphones)</li>
//                 </ul>
//               </div>

//               <div className="bg-purple-50 p-5 rounded-xl">
//                 <h4 className="font-bold text-purple-800 mb-3">Digital Preparation</h4>
//                 <ul className="text-purple-700 space-y-2">
//                   <li>• Download airline app for mobile boarding pass</li>
//                   <li>• Save important documents in cloud storage</li>
//                   <li>• Download offline maps of destination</li>
//                   <li>• Install translation app if needed</li>
//                   <li>• Save emergency contacts locally</li>
//                   <li>• Download entertainment for flight</li>
//                 </ul>
//               </div>
//             </div>

//             <button
//               onClick={() => toast.success('Airport travel guide downloaded successfully!')}
//               className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//             >
//               Download Complete Travel Guide
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
//             Airport Services & Support
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//             Stress-free airport experiences with meet & greet, transfers, and comprehensive travel support
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
//             { icon: FlightTakeoffIcon, value: '5,000+', label: 'Airport Services Provided' },
//             { icon: CheckCircleIcon, value: '99%', label: 'On-time Service Rate' },
//             { icon: GroupsIcon, value: '50+', label: 'Airports Covered' },
//             { icon: EmojiEventsIcon, value: '98%', label: 'Customer Satisfaction' }
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
//             <FlightTakeoffIcon className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Book Airport Service</h3>
//             <p className="opacity-90">Arrange meet & greet, transfers, and assistance</p>
//           </button>
          
//           <button
//             onClick={() => setAirportInfoModalOpen(true)}
//             className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
//           >
//             <InfoIcon className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Airport Information</h3>
//             <p className="opacity-90">Get guides for airports worldwide</p>
//           </button>
          
//           <button
//             onClick={() => setShowAirportGuide(true)}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
//           >
//             <ChecklistIcon className="h-8 w-8 mb-4" />
//             <h3 className="text-xl font-bold mb-2">Travel Checklist</h3>
//             <p className="opacity-90">Essential airport travel preparation</p>
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
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Search Services</label>
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by airport, service type, or country..."
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
//                 <option value="rating">Rating (High to Low)</option>
//                 <option value="price">Price (Low to High)</option>
//                 <option value="duration">Duration (Short to Long)</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Airport</label>
//               <select
//                 value={filters.airport}
//                 onChange={(e) => setFilters({...filters, airport: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {airports.map((airport, index) => (
//                   <option key={index} value={airport === 'All Airports' ? '' : airport}>
//                     {airport}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
//               <select
//                 value={filters.serviceType}
//                 onChange={(e) => setFilters({...filters, serviceType: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {serviceTypes.map((type, index) => (
//                   <option key={index} value={type === 'All Services' ? '' : type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
//               <select
//                 value={filters.language}
//                 onChange={(e) => setFilters({...filters, language: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//               >
//                 {languages.map((language, index) => (
//                   <option key={index} value={language === 'All Languages' ? '' : language}>
//                     {language}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex items-end">
//               <button
//                 onClick={() => {
//                   setFilters({
//                     country: '',
//                     airport: '',
//                     serviceType: '',
//                     language: '',
//                     availability: 'available'
//                   });
//                   setSearchQuery('');
//                 }}
//                 className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
//               >
//                 Clear All Filters
//               </button>
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
//             {['All Services', 'Meet & Greet', 'Airport Transfers', 'VIP Services', 'Student Arrival', 'Family Packages'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   if (tab === 'Meet & Greet') {
//                     setFilters({...filters, serviceType: 'Meet & Greet'});
//                   } else if (tab === 'Airport Transfers') {
//                     setFilters({...filters, serviceType: 'Airport Transfer'});
//                   } else if (tab === 'VIP Services') {
//                     setFilters({...filters, serviceType: 'VIP Services'});
//                   } else if (tab === 'Student Arrival') {
//                     setFilters({...filters, serviceType: 'Meet & Greet'});
//                   } else if (tab === 'Family Packages') {
//                     setFilters({...filters, serviceType: 'Meet & Greet'});
//                   } else {
//                     setFilters({
//                       country: '',
//                       airport: '',
//                       serviceType: '',
//                       language: '',
//                       availability: 'available'
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

//         {/* Featured Services Section */}
//         {activeTab === 'All Services' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="mb-12"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Airport Services</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {featuredServices.map((service) => (
//                 <ServiceCard key={service.id} service={service} />
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Services Grid */}
//         <div className="mb-12">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading airport services...</p>
//             </div>
//           ) : filteredServices.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//               <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
//               <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//             </div>
//           ) : (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {filteredServices.length} Airport Services Available
//                 </h2>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => setBookingModalOpen(true)}
//                     className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
//                   >
//                     Get Airport Assistance
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {currentServices.map((service) => (
//                   <ServiceCard key={service.id} service={service} />
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
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RECAPPLY Airport Services?</h2>
//             <div className="space-y-4">
//               {[
//                 {
//                   title: '24/7 Airport Support',
//                   description: 'Round-the-clock assistance at major airports worldwide'
//                 },
//                 {
//                   title: 'Bilingual Representatives',
//                   description: 'Multilingual staff for seamless communication'
//                 },
//                 {
//                   title: 'Comprehensive Assistance',
//                   description: 'From arrival gate to final destination'
//                 },
//                 {
//                   title: 'Verified Service Providers',
//                   description: 'All partners thoroughly vetted for safety and reliability'
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
//             <h2 className="text-2xl font-bold mb-6">Our Airport Services Include</h2>
//             <div className="space-y-6">
//               <div className="flex items-center">
//                 <FlightLandIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Meet & Greet Service</h3>
//                   <p className="opacity-90">Personal welcome and assistance through airport procedures</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <AirportShuttleIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Airport Transfers</h3>
//                   <p className="opacity-90">Reliable transportation to accommodation or next destination</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <SupportAgentIcon className="h-8 w-8 mr-4" />
//                 <div>
//                   <h3 className="font-bold text-lg">Emergency Assistance</h3>
//                   <p className="opacity-90">24/7 support for flight delays, lost luggage, and emergencies</p>
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
//           <h2 className="text-3xl font-bold mb-4">Start Your Journey Stress-Free!</h2>
//           <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
//             Let us handle the airport experience so you can focus on your educational journey.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => setBookingModalOpen(true)}
//               className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
//             >
//               Book Airport Service Now
//             </button>
//             <button
//               onClick={() => setShowAirportGuide(true)}
//               className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
//             >
//               Get Travel Checklist
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Modals */}
//       {selectedService && <ServiceDetailModal />}
//       {bookingModalOpen && <BookingModal />}
//       {airportInfoModalOpen && <AirportInfoModal />}
//       {showAirportGuide && <AirportGuideModal />}
//     </div>
//   );
// };

/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Material Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PetsIcon from '@mui/icons-material/Pets';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// API Configuration
const API_BASE_URL = 'https://your-api-server.com/api';

// ============================
// MODAL COMPONENTS (MOVED OUTSIDE)
// ============================

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-60"
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
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">{message}</p>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Continue Browsing
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.open('https://wa.me/250783408617', '_blank');
              }}
              className="w-full py-3 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all duration-300"
            >
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Error Modal Component
const ErrorModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-60"
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
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ErrorIcon className="h-12 w-12 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">{message}</p>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.open('https://wa.me/250783408617', '_blank');
              }}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              Contact Support
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
  handleSelectChange,
  handleBookingSubmit, 
  airports,
  isSubmitting 
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
              <h2 className="text-2xl font-bold text-gray-900">Book Airport Service</h2>
              <p className="text-gray-600 mt-1">Our representatives will meet you at the airport</p>
            </div>
            <button
              type="button"
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
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

            {/* Flight Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Flight Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Flight Number *
                  </label>
                  <input
                    type="text"
                    name="flightNumber"
                    required
                    value={bookingForm.flightNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g., CA981"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Airline *
                  </label>
                  <input
                    type="text"
                    name="airline"
                    required
                    value={bookingForm.airline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g., Air China"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                    Arrival Time *
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    required
                    value={bookingForm.arrivalTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Airport *
                  </label>
                  <select
                    name="airport"
                    required
                    value={bookingForm.airport}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="">Select airport</option>
                    {airports.filter(a => a !== 'All Airports').map((airport, index) => (
                      <option key={index} value={airport}>{airport}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Terminal
                  </label>
                  <input
                    type="text"
                    name="terminal"
                    value={bookingForm.terminal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g., T1, Terminal 3"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Passengers *
                  </label>
                  <select
                    name="numberOfPassengers"
                    required
                    value={bookingForm.numberOfPassengers}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Bags
                  </label>
                  <select
                    name="numberOfBags"
                    value={bookingForm.numberOfBags}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Bag' : 'Bags'}</option>
                    ))}
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
                placeholder="Any special requirements (wheelchair, child seats, pet travel, etc.)..."
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Confirm Airport Service Booking'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Service Detail Modal Component
const ServiceDetailModal = ({ 
  isOpen, 
  onClose, 
  service, 
  savedServices, 
  toggleSaveService,
  onBookNow,
  onShowAirportInfo
}) => {
  if (!isOpen || !service) return null;

  const isSaved = savedServices.includes(service.id);

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
                <div className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
                  service.serviceType === 'VIP Services' ? 'bg-purple-600' : 
                  service.serviceType === 'Meet & Greet' ? 'bg-blue-600' : 
                  service.serviceType === 'Airport Transfer' ? 'bg-green-600' : 
                  service.serviceType === 'Airport Pickup' ? 'bg-orange-600' : 'bg-pink-600'
                }`}>
                  {service.serviceType}
                </div>
                {service.featured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    Featured Service
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <FlightLandIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{service.airport}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{service.country}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => toggleSaveService(service.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSaved ? (
                  <BookmarkIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <BookmarkBorderIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button
                type="button"
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
                  src={service.images[0]}
                  alt={service.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Service Overview</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <h4 className="font-bold text-blue-800 mb-2">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <AttachMoneyIcon className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-gray-800">Service Price</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{service.price}</p>
                  <p className="text-sm text-gray-600 mt-1">Duration: {service.duration}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <PeopleIcon className="h-6 w-6 text-purple-600 mr-2" />
                    <span className="font-semibold text-gray-800">Max Passengers</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">{service.maxPassengers}</p>
                  <p className="text-sm text-gray-600 mt-1">Instant Confirmation: {service.instantConfirmation ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Service Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                    <p className="font-semibold text-gray-900">{service.availability}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Booking Window</p>
                    <p className="font-semibold text-gray-900">{service.bookingWindow}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cancellation Policy</p>
                    <p className="font-semibold text-gray-900">{service.cancellationPolicy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Safety Rating</p>
                    <div className="flex items-center">
                      <SecurityIcon className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">{service.safetyRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-xl text-white">
                <h4 className="font-bold mb-4">Inclusions</h4>
                <ul className="space-y-2">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-center">
                      <ChecklistIcon className="h-4 w-4 mr-2" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onBookNow(service)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Book This Service
                </button>
                <button
                  type="button"
                  onClick={() => onShowAirportInfo(service.airport)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Airport Information
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Languages Available</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex flex-wrap gap-2">
                  {service.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <EmailIcon className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-gray-700">{service.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">+250 783 408 617 (RECAPPLY Support)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <VerifiedIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• Provide accurate flight details for smooth service</li>
                  <li>• Have passport and travel documents ready</li>
                  <li>• Inform us of any delays or changes immediately</li>
                  <li>• Keep RECAPPLY emergency contact number saved</li>
                  <li>• Service provider will contact you 2 hours before arrival</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Airport Information Modal Component
const AirportInfoModal = ({ 
  isOpen, 
  onClose, 
  currentAirport, 
  airportGuides,
  onShowAirportGuide
}) => {
  const airportData = airportGuides[currentAirport] || {};

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
              <h2 className="text-2xl font-bold text-gray-900">{currentAirport}</h2>
              <p className="text-gray-600 mt-1">Complete airport guide and information</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-blue-50 p-5 rounded-xl mb-6">
                <h3 className="font-bold text-blue-800 mb-4">Airport Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Essential Services</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <LocalAtmIcon className="h-4 w-4 text-green-600 mr-2" />
                        <span>Currency Exchange: {airportData.currencyExchange || 'Available'}</span>
                      </li>
                      <li className="flex items-center">
                        <WifiIcon className="h-4 w-4 text-blue-600 mr-2" />
                        <span>WiFi: {airportData.wifi || 'Available'}</span>
                      </li>
                      <li className="flex items-center">
                        <LuggageIcon className="h-4 w-4 text-orange-600 mr-2" />
                        <span>Luggage Storage: {airportData.luggageStorage || 'Available'}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transportation</h4>
                    <ul className="space-y-2">
                      {airportData.transportation?.map((transport, index) => (
                        <li key={index} className="flex items-center">
                          <DirectionsBusIcon className="h-4 w-4 text-purple-600 mr-2" />
                          <span>{transport}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Traveler Tips</h3>
                <div className="bg-yellow-50 p-5 rounded-xl">
                  <ul className="space-y-3">
                    {airportData.tips?.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <InfoIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-yellow-800">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Terminals</p>
                    <p className="font-semibold text-gray-900">
                      {airportData.terminals?.join(', ') || 'Multiple'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">SIM Cards</p>
                    <p className="font-semibold text-gray-900">{airportData.simCards || 'Available in arrivals'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Prayer Rooms</p>
                    <p className="font-semibold text-gray-900">{airportData.prayerRooms || 'Available'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Smoking Areas</p>
                    <p className="font-semibold text-gray-900">{airportData.smokingAreas || 'Designated areas'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-5 rounded-xl">
                <h4 className="font-bold text-red-800 mb-3">Emergency Contacts</h4>
                <div className="space-y-2">
                  <p className="text-red-700">{airportData.emergencyContacts || 'Airport Police: Available at information desks'}</p>
                  <p className="text-sm text-red-600">RECAPPLY Emergency: +250 783 408 617</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onShowAirportGuide(currentAirport)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Download Airport Guide
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Airport Guide Modal Component
const AirportGuideModal = ({ 
  isOpen, 
  onClose, 
  currentAirport, 
  airportChecklist: initialChecklist,
  onDownloadGuide
}) => {
  const [activeChecklist, setActiveChecklist] = useState(0);
  const [checklistItems, setChecklistItems] = useState(initialChecklist);

  const toggleChecklistItem = (categoryIndex, itemId) => {
    setChecklistItems(prev =>
      prev.map((category, catIndex) => {
        if (catIndex === categoryIndex) {
          return {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
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
              <h2 className="text-2xl font-bold text-gray-900">Airport Travel Checklist</h2>
              <p className="text-gray-600 mt-1">Essential checklist for smooth airport experience</p>
              {currentAirport && (
                <div className="flex items-center mt-2">
                  <FlightTakeoffIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-600 font-semibold">Airport: {currentAirport}</span>
                </div>
              )}
            </div>
            <button
              type="button"
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
                  type="button"
                  onClick={() => setActiveChecklist(index)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeChecklist === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {checklistItems[activeChecklist].items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(activeChecklist, item.id)}
                      className="h-5 w-5 text-blue-600 rounded mr-3"
                    />
                    <span className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
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

          {/* Airport Security Tips */}
          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <h3 className="font-bold text-blue-800 mb-4">Airport Security Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">For Departure</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Arrive 3 hours before international flights</li>
                  <li>• Keep liquids in 100ml containers in clear bag</li>
                  <li>• Remove laptops and electronics from bags</li>
                  <li>• Wear easy-to-remove shoes and belts</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">For Arrival</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Have passport and documents ready</li>
                  <li>• Complete arrival forms in advance if possible</li>
                  <li>• Declare all items as required</li>
                  <li>• Know your accommodation address</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">Packing for Airport</h4>
              <ul className="text-green-700 space-y-2">
                <li>• Passport and travel documents (carry-on)</li>
                <li>• Prescription medications (in original packaging)</li>
                <li>• Chargers and power banks</li>
                <li>• Change of clothes (in case of delays)</li>
                <li>• Snacks and empty water bottle</li>
                <li>• Entertainment (books, headphones)</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <h4 className="font-bold text-purple-800 mb-3">Digital Preparation</h4>
              <ul className="text-purple-700 space-y-2">
                <li>• Download airline app for mobile boarding pass</li>
                <li>• Save important documents in cloud storage</li>
                <li>• Download offline maps of destination</li>
                <li>• Install translation app if needed</li>
                <li>• Save emergency contacts locally</li>
                <li>• Download entertainment for flight</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onDownloadGuide}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Download Complete Travel Guide
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================
// MAIN AIRPORT SERVICES COMPONENT
// ============================

export const AirportServices = () => {
  // State Management
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [savedServices, setSavedServices] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [airportInfoModalOpen, setAirportInfoModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    airport: '',
    serviceType: '',
    language: '',
    availability: 'available'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(9);
  const [activeTab, setActiveTab] = useState('all');
  const [showAirportGuide, setShowAirportGuide] = useState(false);
  const [currentAirport, setCurrentAirport] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    flightNumber: '',
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    airport: '',
    terminal: '',
    serviceType: '',
    numberOfPassengers: '1',
    numberOfBags: '1',
    specialRequirements: '',
    paymentMethod: '',
    emergencyContact: '',
    additionalInfo: ''
  });

  // Countries
  const countries = [
    'All Countries',
    'China',
    'Canada',
    'Germany',
    'Poland',
    'Turkey',
    'USA',
    'UK',
    'Australia',
    'Japan',
    'South Korea',
    'Singapore',
    'Malaysia',
    'France',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'Italy',
    'Spain',
    'New Zealand',
    'Ireland',
    'Denmark',
    'Norway',
    'Finland'
  ];

  // Service types
  const serviceTypes = [
    'All Services',
    'Airport Pickup',
    'Airport Drop-off',
    'Meet & Greet',
    'VIP Services',
    'Airport Transfer',
    'Luggage Assistance',
    'Hotel Transfer',
    'City Tour',
    'Emergency Assistance'
  ];

  // Languages
  const languages = [
    'All Languages',
    'English',
    'Chinese',
    'French',
    'German',
    'Spanish',
    'Arabic',
    'Russian',
    'Japanese',
    'Korean',
    'Turkish',
    'Polish',
    'Swahili'
  ];

  // Airports
  const airports = [
    'All Airports',
    'Beijing Capital Airport (PEK)',
    'Shanghai Pudong (PVG)',
    'Guangzhou Baiyun (CAN)',
    'Toronto Pearson (YYZ)',
    'Vancouver (YVR)',
    'Frankfurt (FRA)',
    'Berlin Brandenburg (BER)',
    'Munich (MUC)',
    'Warsaw Chopin (WAW)',
    'Krakow (KRK)',
    'Istanbul Airport (IST)',
    'Istanbul Sabiha Gokcen (SAW)',
    'New York JFK (JFK)',
    'Los Angeles (LAX)',
    'London Heathrow (LHR)',
    'London Gatwick (LGW)',
    'Sydney Kingsford Smith (SYD)',
    'Melbourne (MEL)',
    'Tokyo Narita (NRT)',
    'Tokyo Haneda (HND)',
    'Seoul Incheon (ICN)',
    'Singapore Changi (SIN)',
    'Kuala Lumpur (KUL)',
    'Paris Charles de Gaulle (CDG)',
    'Amsterdam Schiphol (AMS)',
    'Dubai International (DXB)'
  ];

  // Featured services
  const featuredServices = [
    {
      id: 1,
      name: 'Beijing Airport VIP Meet & Greet',
      country: 'China',
      airport: 'Beijing Capital Airport (PEK)',
      serviceType: 'VIP Services',
      languages: ['Chinese', 'English'],
      price: '$120',
      duration: '2-3 hours',
      rating: 4.8,
      features: [
        'Personal Meet & Greet at Arrival Gate',
        'Fast Track Immigration Assistance',
        'Luggage Collection Support',
        'Escort to Transportation',
        'SIM Card Assistance',
        'Currency Exchange Guidance'
      ],
      description: 'Premium VIP service for first-time visitors to China. Our representative meets you at the arrival gate and assists through all airport procedures.',
      inclusions: [
        'Professional Bilingual Guide',
        'Airport Navigation Assistance',
        'Help with SIM Card Purchase',
        'Transportation Arrangement',
        'Emergency Contact Support'
      ],
      images: [
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      availability: '24/7',
      bookingWindow: '72 hours in advance',
      cancellationPolicy: 'Free cancellation 24 hours before',
      contact: 'beijing-services@recapply.com',
      maxPassengers: '4',
      instantConfirmation: true,
      safetyRating: '9.5/10'
    },
    {
      id: 2,
      name: 'Toronto Airport Student Welcome Package',
      country: 'Canada',
      airport: 'Toronto Pearson (YYZ)',
      serviceType: 'Meet & Greet',
      languages: ['English', 'French', 'Chinese'],
      price: '$85',
      duration: '2 hours',
      rating: 4.6,
      features: [
        'Student Welcome at Arrivals',
        'SIM Card Setup Assistance',
        'Bank Account Guidance',
        'Transport to Accommodation',
        'Orientation Briefing',
        'Emergency Support'
      ],
      description: 'Special welcome service for international students arriving in Canada. Includes essential setup assistance for new students.',
      inclusions: [
        'Welcome Package with Local Info',
        'SIM Card Purchase Help',
        'Bank Account Opening Info',
        'Direct Transport to Residence',
        '24/7 Student Support Line'
      ],
      images: [
        'https://images.unsplash.com/photo-1519677100203-7c61d0b01354?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      availability: '6 AM - Midnight',
      bookingWindow: '48 hours in advance',
      cancellationPolicy: 'Free cancellation 12 hours before',
      contact: 'toronto-welcome@recapply.com',
      maxPassengers: '3',
      instantConfirmation: true,
      safetyRating: '9.2/10'
    },
    {
      id: 3,
      name: 'Istanbul Airport Transfer & Tour',
      country: 'Turkey',
      airport: 'Istanbul Airport (IST)',
      serviceType: 'Airport Transfer',
      languages: ['Turkish', 'English', 'Arabic'],
      price: '$65',
      duration: '1-4 hours',
      rating: 4.7,
      features: [
        'Private Airport Transfer',
        'City Orientation Tour',
        'Local SIM Card Assistance',
        'Hotel Check-in Help',
        'Cultural Briefing',
        'Restaurant Recommendations'
      ],
      description: 'Combined airport transfer and city orientation service perfect for first-time visitors to Istanbul.',
      inclusions: [
        'Private Vehicle with Driver',
        '1 Hour City Orientation',
        'Local Tips & Recommendations',
        'Hotel Delivery',
        '24/7 Support'
      ],
      images: [
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506970845872-504d6b2d49e8?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      availability: '24/7',
      bookingWindow: '24 hours in advance',
      cancellationPolicy: 'Free cancellation 6 hours before',
      contact: 'istanbul-transfer@recapply.com',
      maxPassengers: '6',
      instantConfirmation: true,
      safetyRating: '9.0/10'
    }
  ];

  // Airport guides
  const airportGuides = {
    'Beijing Capital Airport (PEK)': {
      terminals: ['T1', 'T2', 'T3'],
      currencyExchange: 'Available in all terminals',
      simCards: 'China Mobile/China Unicom counters available',
      transportation: ['Airport Express Train', 'Taxis', 'Buses', 'Private Transfers'],
      wifi: 'Free 3-hour WiFi with passport registration',
      luggageStorage: 'Available in T2 and T3',
      prayerRooms: 'Available in all terminals',
      smokingAreas: 'Designated areas outside terminals',
      emergencyContacts: 'Airport Police: +86 10 6453 0110',
      tips: [
        'Register for WiFi at information desks',
        'Keep passport ready for immigration',
        'Use official taxi stands only',
        'Allow 3+ hours for international connections'
      ]
    },
    'Toronto Pearson (YYZ)': {
      terminals: ['Terminal 1', 'Terminal 3'],
      currencyExchange: 'Available throughout airport',
      simCards: 'Rogers/Bell/Telus stores available',
      transportation: ['UP Express Train', 'Taxis', 'Buses', 'Ride-share'],
      wifi: 'Free unlimited WiFi',
      luggageStorage: 'Available in both terminals',
      prayerRooms: 'Multi-faith prayer rooms available',
      smokingAreas: 'Designated areas outside only',
      emergencyContacts: 'Airport Security: +1 416 776-3000',
      tips: [
        'Use UP Express for downtown Toronto',
        'Declare all food products at customs',
        'Have Canadian address ready for customs',
        'Use ArriveCAN app for faster clearance'
      ]
    },
    'Istanbul Airport (IST)': {
      terminals: ['Main Terminal'],
      currencyExchange: 'Multiple locations throughout',
      simCards: 'Turkcell/Vodafone/Turk Telekom available',
      transportation: ['Havaist Buses', 'Taxis', 'Metro', 'Private Transfers'],
      wifi: 'Free 1-hour WiFi, paid options available',
      luggageStorage: 'Available in arrivals area',
      prayerRooms: 'Mosques available in airport',
      smokingAreas: 'Designated indoor areas',
      emergencyContacts: 'Airport Police: +90 212 465 5555',
      tips: [
        'Get Istanbulkart for public transport',
        'Exchange money at airport for best rates',
        'Have hotel address written in Turkish',
        'Allow extra time for security checks'
      ]
    }
  };

  // Airport checklist
  const airportChecklist = [
    {
      category: 'Before Departure',
      items: [
        { id: 1, name: 'Passport with 6+ months validity', completed: false },
        { id: 2, name: 'Visa/Entry Documents', completed: false },
        { id: 3, name: 'Flight Tickets (Printed/Digital)', completed: false },
        { id: 4, name: 'Accommodation Details', completed: false },
        { id: 5, name: 'Travel Insurance Documents', completed: false },
      ]
    },
    {
      category: 'At the Airport',
      items: [
        { id: 6, name: 'Check-in 3 hours before international flight', completed: false },
        { id: 7, name: 'Liquids in 100ml containers in clear bag', completed: false },
        { id: 8, name: 'Electronics charged and accessible', completed: false },
        { id: 9, name: 'Boarding Pass Ready', completed: false },
        { id: 10, name: 'Local Currency for immediate needs', completed: false },
      ]
    },
    {
      category: 'Upon Arrival',
      items: [
        { id: 11, name: 'Immigration Forms filled out', completed: false },
        { id: 12, name: 'Customs Declaration ready', completed: false },
        { id: 13, name: 'Local SIM Card/Mobile Data', completed: false },
        { id: 14, name: 'Transportation arranged', completed: false },
        { id: 15, name: 'Emergency contacts saved', completed: false },
      ]
    }
  ];

  // Fetch services data
  useEffect(() => {
    fetchServices();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, sortBy, services]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Sample services data
      const sampleData = [
        ...featuredServices,
        {
          id: 4,
          name: 'Frankfurt Airport Fast Track',
          country: 'Germany',
          airport: 'Frankfurt (FRA)',
          serviceType: 'VIP Services',
          languages: ['German', 'English', 'French'],
          price: '€95',
          duration: '1-2 hours',
          rating: 4.5,
          features: [
            'Fast Track Immigration',
            'Personal Concierge',
            'Lounge Access',
            'Luggage Priority',
            'Transport Coordination'
          ],
          description: 'Expedited service through Frankfurt Airport with lounge access and personal assistance.',
          inclusions: [
            'Fast Track Pass',
            'Lounge Access (2 hours)',
            'Personal Assistant',
            'Luggage Assistance',
            'Transport Booking'
          ],
          images: [
            'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '5 AM - 11 PM',
          bookingWindow: '24 hours in advance',
          cancellationPolicy: 'Free cancellation 12 hours before',
          contact: 'frankfurt-vip@recapply.com',
          maxPassengers: '2',
          instantConfirmation: true,
          safetyRating: '9.3/10'
        },
        {
          id: 5,
          name: 'London Heathrow Student Arrival',
          country: 'UK',
          airport: 'London Heathrow (LHR)',
          serviceType: 'Meet & Greet',
          languages: ['English', 'Chinese', 'Arabic'],
          price: '£75',
          duration: '2 hours',
          rating: 4.4,
          features: [
            'Student Welcome Service',
            'Oyster Card Setup',
            'UK SIM Card Assistance',
            'University Transport',
            'Accommodation Check-in Help'
          ],
          description: 'Complete arrival service for international students starting their UK education.',
          inclusions: [
            'Welcome at Arrivals',
            'Oyster Card Setup',
            'SIM Card Purchase Help',
            'Direct Transport',
            '24/7 Support Line'
          ],
          images: [
            'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '6 AM - Midnight',
          bookingWindow: '48 hours in advance',
          cancellationPolicy: 'Free cancellation 24 hours before',
          contact: 'lhr-student@recapply.com',
          maxPassengers: '4',
          instantConfirmation: true,
          safetyRating: '9.1/10'
        },
        {
          id: 6,
          name: 'Sydney Airport Family Package',
          country: 'Australia',
          airport: 'Sydney Kingsford Smith (SYD)',
          serviceType: 'Meet & Greet',
          languages: ['English', 'Chinese', 'Vietnamese'],
          price: '$110',
          duration: '3 hours',
          rating: 4.9,
          features: [
            'Family Welcome Service',
            'Child-Friendly Assistance',
            'Stroller Arrangements',
            'Family Transport',
            'Accommodation Delivery'
          ],
          description: 'Special service for families arriving in Australia with children. Includes child-friendly assistance.',
          inclusions: [
            'Family Greeting',
            'Child Care Assistance',
            'Stroller/Car Seat Setup',
            'Family Vehicle',
            'Entertainment for Kids'
          ],
          images: [
            'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '24/7',
          bookingWindow: '72 hours in advance',
          cancellationPolicy: 'Free cancellation 24 hours before',
          contact: 'sydney-family@recapply.com',
          maxPassengers: '6',
          instantConfirmation: true,
          safetyRating: '9.7/10'
        },
        {
          id: 7,
          name: 'Tokyo Narita Essential Arrival',
          country: 'Japan',
          airport: 'Tokyo Narita (NRT)',
          serviceType: 'Airport Pickup',
          languages: ['Japanese', 'English', 'Chinese'],
          price: '¥8,500',
          duration: '2-3 hours',
          rating: 4.6,
          features: [
            'Bilingual Guide Meeting',
            'JR Pass Activation Help',
            'Pocket WiFi Setup',
            'Transport to Tokyo',
            'Cultural Orientation'
          ],
          description: 'Essential arrival service for visitors to Japan with assistance for key tourist needs.',
          inclusions: [
            'Bilingual Guide',
            'JR Pass Activation',
            'Pocket WiFi Setup',
            'Train/Bus Guidance',
            'Local Tips'
          ],
          images: [
            'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '7 AM - 10 PM',
          bookingWindow: '48 hours in advance',
          cancellationPolicy: 'Free cancellation 12 hours before',
          contact: 'narita-arrival@recapply.com',
          maxPassengers: '4',
          instantConfirmation: true,
          safetyRating: '9.4/10'
        },
        {
          id: 8,
          name: 'Singapore Changi Tour & Transfer',
          country: 'Singapore',
          airport: 'Singapore Changi (SIN)',
          serviceType: 'City Tour',
          languages: ['English', 'Chinese', 'Malay', 'Tamil'],
          price: '$90',
          duration: '4-6 hours',
          rating: 4.8,
          features: [
            'Airport Pickup',
            'Changi Jewel Tour',
            'City Orientation',
            'Hotel Transfer',
            'Local Food Introduction'
          ],
          description: 'Explore Singapore starting from the world\'s best airport with guided tour and transfer.',
          inclusions: [
            'Airport Pickup',
            'Jewel Changi Tour',
            'City Highlights Drive',
            'Hotel Delivery',
            'Food Recommendations'
          ],
          images: [
            'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '8 AM - 8 PM',
          bookingWindow: '24 hours in advance',
          cancellationPolicy: 'Free cancellation 6 hours before',
          contact: 'changi-tour@recapply.com',
          maxPassengers: '5',
          instantConfirmation: true,
          safetyRating: '9.6/10'
        },
        {
          id: 9,
          name: 'Dubai Airport Luxury Transfer',
          country: 'UAE',
          airport: 'Dubai International (DXB)',
          serviceType: 'VIP Services',
          languages: ['Arabic', 'English', 'Russian', 'French'],
          price: '$150',
          duration: '1-2 hours',
          rating: 4.7,
          features: [
            'Luxury Vehicle Transfer',
            'Fast Track Immigration',
            'Lounge Access',
            'Personal Concierge',
            'Hotel Check-in Assistance'
          ],
          description: 'Premium luxury service for Dubai arrivals with exclusive fast track and luxury transport.',
          inclusions: [
            'Luxury Vehicle',
            'Fast Track Service',
            'Premium Lounge Access',
            'Personal Concierge',
            'Hotel Delivery'
          ],
          images: [
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
          ],
          featured: false,
          availability: '24/7',
          bookingWindow: '12 hours in advance',
          cancellationPolicy: 'Free cancellation 6 hours before',
          contact: 'dubai-luxury@recapply.com',
          maxPassengers: '3',
          instantConfirmation: true,
          safetyRating: '9.3/10'
        }
      ];

      setServices(sampleData);
      setFilteredServices(sampleData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
      toast.error('Failed to load airport services data');
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply country filter
    if (filters.country && filters.country !== 'All Countries') {
      filtered = filtered.filter(service => service.country === filters.country);
    }

    // Apply airport filter
    if (filters.airport && filters.airport !== 'All Airports') {
      filtered = filtered.filter(service => service.airport === filters.airport);
    }

    // Apply service type filter
    if (filters.serviceType && filters.serviceType !== 'All Services') {
      filtered = filtered.filter(service => service.serviceType === filters.serviceType);
    }

    // Apply language filter
    if (filters.language && filters.language !== 'All Languages') {
      filtered = filtered.filter(service => 
        service.languages.includes(filters.language)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        const getHours = (duration) => {
          const match = duration.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        filtered.sort((a, b) => getHours(a.duration) - getHours(b.duration));
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle select changes
  const handleSelectChange = useCallback((e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save service to favorites
  const toggleSaveService = useCallback((serviceId) => {
    if (savedServices.includes(serviceId)) {
      setSavedServices(savedServices.filter(id => id !== serviceId));
      toast.info('Removed from saved services');
    } else {
      setSavedServices([...savedServices, serviceId]);
      toast.success('Service saved to favorites');
    }
  }, [savedServices]);

  // Handle book now action
  const handleBookNow = useCallback((service) => {
    setBookingForm(prev => ({
      ...prev,
      serviceType: service.serviceType,
      airport: service.airport
    }));
    setSelectedService(service);
    setBookingModalOpen(true);
  }, []);

  // Handle airport info
  const handleShowAirportInfo = useCallback((airport) => {
    setCurrentAirport(airport);
    setAirportInfoModalOpen(true);
  }, []);

  // Handle download guide
  const handleDownloadGuide = useCallback(() => {
    setModalTitle('Guide Downloaded Successfully!');
    setModalMessage('The airport travel guide has been downloaded to your device. You can access it anytime in your downloads folder.');
    setShowSuccessModal(true);
    setShowAirportGuide(false);
  }, []);

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'flightNumber', 'arrivalDate', 'arrivalTime'];
      const missingFields = requiredFields.filter(field => !bookingForm[field]);
      
      if (missingFields.length > 0) {
        setModalTitle('Missing Information');
        setModalMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      const bookingData = {
        ...bookingForm,
        timestamp: new Date().toISOString(),
        serviceId: selectedService?.id,
        serviceName: selectedService?.name,
        source: 'RECAPPLY Airport Services'
      };

      console.log('Submitting booking data:', bookingData);
      
      // Simulated API response
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success modal
      setModalTitle('Booking Submitted Successfully!');
      setModalMessage('Your airport service booking has been submitted. Our representative will contact you within 12 hours to confirm the details and provide further instructions.');
      setShowSuccessModal(true);
      
      // Reset form
      setBookingForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: '',
        flightNumber: '',
        airline: '',
        arrivalDate: '',
        arrivalTime: '',
        departureDate: '',
        departureTime: '',
        airport: '',
        terminal: '',
        serviceType: '',
        numberOfPassengers: '1',
        numberOfBags: '1',
        specialRequirements: '',
        paymentMethod: '',
        emergencyContact: '',
        additionalInfo: ''
      });
      
      setBookingModalOpen(false);
      setSelectedService(null);
      
    } catch (error) {
      console.error('Booking error:', error);
      setModalTitle('Booking Failed');
      setModalMessage('There was an error submitting your booking request. Please try again or contact our support team at +250 783 408 617.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close all modals
  const closeAllModals = useCallback(() => {
    setBookingModalOpen(false);
    setSelectedService(null);
    setAirportInfoModalOpen(false);
    setShowAirportGuide(false);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  }, []);

  // Service Card Component (memoized)
  const ServiceCard = React.memo(({ service }) => {
    const isSaved = savedServices.includes(service.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.images[0]}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
              service.serviceType === 'VIP Services' ? 'bg-purple-600' : 
              service.serviceType === 'Meet & Greet' ? 'bg-blue-600' : 
              service.serviceType === 'Airport Transfer' ? 'bg-green-600' : 
              service.serviceType === 'Airport Pickup' ? 'bg-orange-600' : 'bg-pink-600'
            }`}>
              {service.serviceType}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleSaveService(service.id);
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isSaved ? (
                <BookmarkIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <BookmarkBorderIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {service.featured && (
              <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                Featured
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full">
              <FlightLandIcon className="h-3 w-3 mr-1" />
              <span className="text-xs font-bold">{service.airport.split('(')[0].trim()}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
              <div className="flex items-center text-gray-600">
                <LocationOnIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">{service.country}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Rating</div>
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{service.rating}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <AttachMoneyIcon className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Price</span>
              </div>
              <p className="text-sm text-gray-600">{service.price}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <ScheduleIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Duration</span>
              </div>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {service.languages.slice(0, 3).map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {lang}
                </span>
              ))}
              {service.languages.length > 3 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  +{service.languages.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                service.availability === '24/7' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {service.availability}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleShowAirportInfo(service.airport)}
                className="text-blue-600 font-semibold text-sm hover:text-blue-700"
              >
                Airport Info
              </button>
              <button
                type="button"
                onClick={() => handleBookNow(service)}
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
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            type="button"
            onClick={() => handlePageChange(number)}
            className={`w-10 h-10 rounded-lg font-semibold ${
              currentPage === number
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        ))}
        
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Airport Services & Support
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stress-free airport experiences with meet & greet, transfers, and comprehensive travel support
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
            { icon: FlightTakeoffIcon, value: '5,000+', label: 'Airport Services Provided' },
            { icon: CheckCircleIcon, value: '99%', label: 'On-time Service Rate' },
            { icon: GroupsIcon, value: '50+', label: 'Airports Covered' },
            { icon: EmojiEventsIcon, value: '98%', label: 'Customer Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
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
            type="button"
            onClick={() => setBookingModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <FlightTakeoffIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Book Airport Service</h3>
            <p className="opacity-90">Arrange meet & greet, transfers, and assistance</p>
          </button>
          
          <button
            type="button"
            onClick={() => setAirportInfoModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <InfoIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Airport Information</h3>
            <p className="opacity-90">Get guides for airports worldwide</p>
          </button>
          
          <button
            type="button"
            onClick={() => setShowAirportGuide(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white text-left hover:shadow-xl transition-all duration-300"
          >
            <ChecklistIcon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Travel Checklist</h3>
            <p className="opacity-90">Essential airport travel preparation</p>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Services</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by airport, service type, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Country</label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {countries.map((country, index) => (
                  <option key={index} value={country === 'All Countries' ? '' : country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration (Short to Long)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Airport</label>
              <select
                name="airport"
                value={filters.airport}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {airports.map((airport, index) => (
                  <option key={index} value={airport === 'All Airports' ? '' : airport}>
                    {airport}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
              <select
                name="serviceType"
                value={filters.serviceType}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {serviceTypes.map((type, index) => (
                  <option key={index} value={type === 'All Services' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {languages.map((language, index) => (
                  <option key={index} value={language === 'All Languages' ? '' : language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    country: '',
                    airport: '',
                    serviceType: '',
                    language: '',
                    availability: 'available'
                  });
                  setSearchQuery('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Clear All Filters
              </button>
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
            {['All Services', 'Meet & Greet', 'Airport Transfers', 'VIP Services', 'Student Arrival', 'Family Packages'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Meet & Greet') {
                    setFilters({...filters, serviceType: 'Meet & Greet'});
                  } else if (tab === 'Airport Transfers') {
                    setFilters({...filters, serviceType: 'Airport Transfer'});
                  } else if (tab === 'VIP Services') {
                    setFilters({...filters, serviceType: 'VIP Services'});
                  } else if (tab === 'Student Arrival') {
                    setFilters({...filters, serviceType: 'Meet & Greet'});
                  } else if (tab === 'Family Packages') {
                    setFilters({...filters, serviceType: 'Meet & Greet'});
                  } else {
                    setFilters({
                      country: '',
                      airport: '',
                      serviceType: '',
                      language: '',
                      availability: 'available'
                    });
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Services Section */}
        {activeTab === 'All Services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Airport Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading airport services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredServices.length} Airport Services Available
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Airport Assistance
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RECAPPLY Airport Services?</h2>
            <div className="space-y-4">
              {[
                {
                  title: '24/7 Airport Support',
                  description: 'Round-the-clock assistance at major airports worldwide'
                },
                {
                  title: 'Bilingual Representatives',
                  description: 'Multilingual staff for seamless communication'
                },
                {
                  title: 'Comprehensive Assistance',
                  description: 'From arrival gate to final destination'
                },
                {
                  title: 'Verified Service Providers',
                  description: 'All partners thoroughly vetted for safety and reliability'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-6">Our Airport Services Include</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <FlightLandIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Meet & Greet Service</h3>
                  <p className="opacity-90">Personal welcome and assistance through airport procedures</p>
                </div>
              </div>
              <div className="flex items-center">
                <AirportShuttleIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Airport Transfers</h3>
                  <p className="opacity-90">Reliable transportation to accommodation or next destination</p>
                </div>
              </div>
              <div className="flex items-center">
                <SupportAgentIcon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Emergency Assistance</h3>
                  <p className="opacity-90">24/7 support for flight delays, lost luggage, and emergencies</p>
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
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Stress-Free!</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Let us handle the airport experience so you can focus on your educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Book Airport Service Now
            </button>
            <button
              type="button"
              onClick={() => setShowAirportGuide(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Get Travel Checklist
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
        handleSelectChange={handleSelectChange}
        handleBookingSubmit={handleBookingSubmit}
        airports={airports}
        isSubmitting={isSubmitting}
      />
      
      <ServiceDetailModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        savedServices={savedServices}
        toggleSaveService={toggleSaveService}
        onBookNow={handleBookNow}
        onShowAirportInfo={handleShowAirportInfo}
      />
      
      <AirportInfoModal
        isOpen={airportInfoModalOpen}
        onClose={() => setAirportInfoModalOpen(false)}
        currentAirport={currentAirport}
        airportGuides={airportGuides}
        onShowAirportGuide={(airport) => {
          setCurrentAirport(airport);
          setAirportInfoModalOpen(false);
          setShowAirportGuide(true);
        }}
      />
      
      <AirportGuideModal
        isOpen={showAirportGuide}
        onClose={() => setShowAirportGuide(false)}
        currentAirport={currentAirport}
        airportChecklist={airportChecklist}
        onDownloadGuide={handleDownloadGuide}
      />
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeAllModals}
        title={modalTitle}
        message={modalMessage}
      />
      
      <ErrorModal
        isOpen={showErrorModal}
        onClose={closeAllModals}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};