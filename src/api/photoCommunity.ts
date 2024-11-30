import customAxios from '@/utils/cutstomAxios';
import axios from 'axios';
import { Router } from 'next/router';

export const getFeeds = async (pageNumber: any) => {
  try {
    const res = await customAxios.get(`/photos?pageNumber=${pageNumber}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postFeed = async (filename: any, comment: string) => {
  console.log(filename);
  try {
    const res = await customAxios.post('/photos', { filename, comment });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const feedDetails = async (photoId: any) => {
  try {
    const res = await customAxios.get(`/photos/${photoId}`);

    return res.data;
  } catch (error: any) {
    if (error?.response?.data.errorCode === 'NOT_FOUND') {
      window.location.href = '/photoCommunity';
    }
    console.log('error', error);
  }
};

export const feedHeart = async (photoId: any) => {
  try {
    const res = await customAxios.post(`/photos/${photoId}/thumps-up`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteFeed = async (photoId: any) => {
  try {
    const res = await customAxios.delete(`/photos/${photoId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const s3GetPresignedUrls = async () => {
  const res = await customAxios.get('/images/photo/presignedUrl');
  console.log(1);
  console.log(res);
  return res;
};
export const s3PutPresifnedUrlsPhoto = async (file: File) => {
  try {
    const {
      data: { filename, presignedUrl },
    } = await s3GetPresignedUrls();

    const res = await axios.put(presignedUrl, file);

    if (res.status === 200) {
      return filename;
    }
  } catch (error) {
    console.log(error);
  }
};
