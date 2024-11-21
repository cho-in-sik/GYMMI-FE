import customAxios from '@/utils/cutstomAxios';
import axios from 'axios';
import { comment } from 'postcss';

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
