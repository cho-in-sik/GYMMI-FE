import customAxios from '@/utils/cutstomAxios';

export const postFcmToken = async (token: string) => {
  const res = await customAxios.patch('/fcm/token', { token });
  return res;
};
