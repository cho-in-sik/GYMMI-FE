import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
});

// 토큰 갱신
const refreshAccessToken = async () => {
  try {
    console.log('Refreshing access token...');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/reissue`,
      {
        refreshToken,
      }
    );
    console.log(res);

    if (res && res.data) {
      console.log('Access token refreshed successfully');
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      customAxios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    }
  } catch (error) {
    console.log(error);
    console.error('Failed to refresh token', error);
    // refresh token도 유효하지 않다면 로그아웃 처리 또는 사용자에게 로그인 요청
    localStorage.clear();
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  }
};

// 토큰 유효성 검사
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return customAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);

customAxios.interceptors.request.use(
  (config) => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
