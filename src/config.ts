import { register } from "module";

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5155',
    endpoints: {
      products: '/Products/GetAll'
    }
  },
  authApi: {
    baseUrl: process.env.AUTH_API || 'http://localhost',
    endpoints: {
      login: 'Authentication/Login',
      register: "Authentication/Register",
      refreshAccessToken: "Authentication/RefreshAccessToken",
      logout: "Authentication/Logout"
    }
  }
};