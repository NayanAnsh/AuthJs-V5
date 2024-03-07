/**
 * An array of rouetes which do  not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of rouetes which require authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];
/**
 * The  route is a API route
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The  default redirect path after logggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
