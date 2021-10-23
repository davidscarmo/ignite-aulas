import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../context/AuthContext";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];
export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "nextauth.refreshToken": refreshToken } = cookies;
        const originalConfig = error.config;
        if (!isRefreshing) {
          isRefreshing = true;
          api
            .post<any>("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token, refreshToken: newRefreshToken } = response.data;

              setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 38, // 30 days
                path: "/",
              });
              setCookie(undefined, "nextauth.refreshToken", newRefreshToken, {
                maxAge: 60 * 60 * 24 * 38, // 30 days
                path: "/",
              });

              api.defaults.headers["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) => request.onSucess(token));
              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSucess: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        signOut();
      }
    }
    return Promise.reject(error);
  }
);
