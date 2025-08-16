/**
 * Public Routes is an array of routes that shows the path
 * that users can access with need for authentication
 *
 * @type {string[]}
 *
 */
export const publicRoutes = ["/","/about","/services","/booking","/airports","/blog","/contact","/payment","/thank-you"];

/**
 * Auth Routes: Are array of paths that used for authentication purposes
 * These paths redirect users to the main page of the site
 * @type {string[]}
 *
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/password/forgot-password",
  "/auth/password/reset-password",
  "/auth/email-confirmation"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export const privateRoutes = ["/profile"];
/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
