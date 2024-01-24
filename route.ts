
/**
 * @description
 * Public routes are routes that can be accessed without authentication
 */
export const publicRoutes = [
    '/'
]

/**
 * @description
 * Auth routes are routes that can be accessed to authenticate
 * The user, such as login and register
 */
export const authRoutes = [
    '/auth/login',
    '/auth/error',
    '/auth/register',
]

/**
 * @description
 * apiAuthPrefix is the prefix for all api routes
 */
export const apiAuthPrefix = '/api/auth'

export const REDIRECT_AUTH = '/dashboard'