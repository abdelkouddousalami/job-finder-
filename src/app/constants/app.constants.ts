export const APP_CONSTANTS = {
  APP_NAME: 'JobFinder',
  VERSION: '1.0.0',
  COPYRIGHT: '2026 JobFinder. All rights reserved.',
  
  STORAGE_KEYS: {
    USER: 'jobfinder_user',
    TOKEN: 'jobfinder_token',
    THEME: 'jobfinder_theme',
    LANGUAGE: 'jobfinder_language'
  },
  
  API_ENDPOINTS: {
    JOBS: '/jobs',
    USERS: '/users',
    APPLICATIONS: '/applications',
    FAVORITES: '/favorites'
  },
  
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZE_OPTIONS: [12, 24, 48, 96]
  },
  
  JOB_TYPES: [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Remote'
  ],
  
  EXPERIENCE_LEVELS: [
    'Entry Level',
    'Junior',
    'Mid-Level',
    'Senior',
    'Lead',
    'Manager'
  ],
  
  POPULAR_LOCATIONS: [
    'Berlin',
    'Munich',
    'Hamburg',
    'Frankfurt',
    'Cologne',
    'Remote'
  ],
  
  DATE_FORMATS: {
    SHORT: 'MM/dd/yyyy',
    LONG: 'MMMM dd, yyyy',
    ISO: 'yyyy-MM-dd'
  },
  
  ANIMATION_DURATIONS: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500
  },
  
  DEBOUNCE_TIME: 300,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
};
