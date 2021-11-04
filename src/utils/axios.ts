import axios from "axios";

axios.defaults.baseURL = "https://wookie.codesubmit.io";

axios.interceptors.request.use(
  (config: any) => {
    const token = "Wookie2021";
    if (token && config.headers) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (!error.response || error.response?.status !== 200) {
    throw Error("Sorry, something went wrong. Please try again later.");
  }
  throw error.response;
});

export default axios;
