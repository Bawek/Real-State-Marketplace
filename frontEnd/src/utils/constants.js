// API Constants
export const API_BASE_URL = 'http://localhost:5000/api';

// Property Types
export const PROPERTY_TYPES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  CONDO: 'condo',
  TOWNHOUSE: 'townhouse',
  VILLA: 'villa',
  LAND: 'land',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  AGENT: 'agent',
  LANDLORD: 'landlord',
  ADMIN: 'admin',
};

// Property Status
export const PROPERTY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SOLD: 'sold',
  RENTED: 'rented',
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Message Status
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_PROPERTY: 10,
};

// Form Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 2000,
  TITLE_MAX_LENGTH: 100,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// UI Constants
export const UI = {
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  INFINITE_SCROLL_THRESHOLD: 100,
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  PROPERTIES: '/properties',
  CREATE_PROPERTY: '/properties/create',
  PROPERTY_DETAILS: '/property/:id',
  EDIT_PROPERTY: '/property/:id/edit',
  MESSAGES: '/messages',
  MESSAGE_THREAD: '/messages/:id',
  APPOINTMENTS: '/appointments',
  APPOINTMENT_DETAILS: '/appointments/:id',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  SETTINGS: '/settings',
  ABOUT: '/about',
  POLICY: '/policy',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
};

// Breadcrumbs
export const BREADCRUMBS = {
  HOME: { label: 'Home', href: ROUTES.HOME },
  PROPERTIES: { label: 'Properties', href: ROUTES.PROPERTIES },
  DASHBOARD: { label: 'Dashboard', href: ROUTES.DASHBOARD },
  MESSAGES: { label: 'Messages', href: ROUTES.MESSAGES },
  APPOINTMENTS: { label: 'Appointments', href: ROUTES.APPOINTMENTS },
  PROFILE: { label: 'Profile', href: ROUTES.PROFILE },
};

// Sort Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_HIGH: 'price_high',
  PRICE_LOW: 'price_low',
  SIZE_HIGH: 'size_high',
  SIZE_LOW: 'size_low',
  BEDROOMS_HIGH: 'bedrooms_high',
  BEDROOMS_LOW: 'bedrooms_low',
};

// Filter Options
export const FILTER_OPTIONS = {
  PRICE_RANGES: [
    { label: 'Under $100K', min: 0, max: 100000 },
    { label: '$100K - $200K', min: 100000, max: 200000 },
    { label: '$200K - $300K', min: 200000, max: 300000 },
    { label: '$300K - $500K', min: 300000, max: 500000 },
    { label: '$500K - $750K', min: 500000, max: 750000 },
    { label: '$750K - $1M', min: 750000, max: 1000000 },
    { label: 'Over $1M', min: 1000000, max: null },
  ],
  BEDROOMS: [1, 2, 3, 4, 5],
  BATHROOMS: [1, 2, 3, 4],
  PROPERTY_TYPES: [
    { value: PROPERTY_TYPES.HOUSE, label: 'House' },
    { value: PROPERTY_TYPES.APARTMENT, label: 'Apartment' },
    { value: PROPERTY_TYPES.CONDO, label: 'Condo' },
    { value: PROPERTY_TYPES.TOWNHOUSE, label: 'Townhouse' },
    { value: PROPERTY_TYPES.VILLA, label: 'Villa' },
    { value: PROPERTY_TYPES.LAND, label: 'Land' },
  ],
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6B7280',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

export default {
  API_BASE_URL,
  PROPERTY_TYPES,
  USER_ROLES,
  PROPERTY_STATUS,
  APPOINTMENT_STATUS,
  MESSAGE_STATUS,
  PAGINATION,
  FILE_UPLOAD,
  VALIDATION,
  UI,
  ROUTES,
  BREADCRUMBS,
  SORT_OPTIONS,
  FILTER_OPTIONS,
  COLORS,
  BREAKPOINTS,
};
