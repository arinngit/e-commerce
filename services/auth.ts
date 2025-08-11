import { config } from "@/config";
import axios from "axios";
import { register } from "module";

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(
      `${config.authApi.baseUrl}/${config.authApi.endpoints.login}`,
      {
        email,
        password,
      }
    );
    return response.data;
  },

  async register(email: string, password: string) {
    const response = await axios.post(
      `${config.authApi.baseUrl}/${config.authApi.endpoints.register}`,
      {
        email,
        password,
      }
    );
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await axios.post(
      `${config.authApi.baseUrl}/${config.authApi.endpoints.refreshAccessToken}`,
      {
        refreshToken,
      }
    );
    return response.data.accessToken;
  },

  async logout(accessToken: string) {
    await axios.delete(
      `${config.authApi.baseUrl}/${config.authApi.endpoints.logout}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};
