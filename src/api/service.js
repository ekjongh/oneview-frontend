// axios 호출 Interface 생성
import axios from "axios";
import { API_URL } from "./config";

// 사용할 axios의 기본설정 등록
const service = axios.create({
  browserBaseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// WEB > WAS Request시 사용할 Config 설정
service.interceptors.request.use(
  async (config) => {
    // 정상 로그인 시, sessionStorage에 Token정보를 "userInfo" Key로 저장중
    const userInfo = sessionStorage.getItem("userInfo");
    const accessToken = userInfo ? JSON.parse(userInfo).access : null;
    // Request Config Header에 WAS에서 받은 Access Token 추가
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
// Access Token 만료로 Fail 발생 시, Session Stroage에 있는 Refresh Token을 이용하여 새로운 Access Token을 발급받은 후 재설정.
service.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 422) &&
      !originalRequest._retry
    ) {
      // Refresh 동작은 한번만, 두번째 부터는 _retry attr을 확인 후 시도안함.
      originalRequest._retry = true;
      const sessionObj = sessionStorage.getItem("userInfo");
      let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userInfo.refresh;
      axios
        .post(`${API_URL}jwt/refresh`)
        .then((res) => {
          const access_token = res.data.access;
          if (userInfo) {
            originalRequest.headers["Authorization"] = "Bearer " + access_token;
            userInfo.access = access_token;
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          }
          return axios(originalRequest);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
    return Promise.reject(error);
  }
);

// 각 메소드별 함수를 생성해 주세요.
export default {
  async get(...options) {
    try {
      const res = await service.get(...options);
      return res;
    } catch (e) {
      return e;
    }
  },

  async put(...options) {
    try {
      const res = await service.put(...options);
      return res;
    } catch (e) {
      return e;
    }
  },

  async post(...options) {
    try {
      const res = await service.post(...options);
      return res;
    } catch (e) {
      alert("POST ERROR!");
      return e;
    }
  },

  async logout(url, token) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log("HEADER: ", axios.defaults.headers.common["Authorization"]);
      const res = await axios.post(url);
      return res;
    } catch (e) {
      alert("LOGOUT ERROR!");
      return e;
    }
  },

  //   async put(...options) {
  //     // 공통
  //   },

  async delete(...options) {
    try {
      const res = await service.delete(...options);
      return res;
    } catch (e) {
      return e;
    }
  },
};
