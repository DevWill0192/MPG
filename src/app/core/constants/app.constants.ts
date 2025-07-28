export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    CURRENT_USER: 'user_data',
    AUTH_TOKEN: 'auth_token',
    API_KEY: 'ae74d02abb695e4dc96b82bf87376017'
  },
  ROUTES: {
    HOME: '/home',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile'
  },
  API_ENDPOINTS: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    USER_PROFILE: '/user/profile'
  },
  VALIDATION: {
    EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD_MIN_LENGTH: 6
  }
};
