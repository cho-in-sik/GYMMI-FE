import customAxios from '@/utils/cutstomAxios';
import axios from 'axios';

type TBookmark = {
  workspaceId: number;
  missionId?: number;
};

type TWorkout = {
  workspaceId: number;
  data: {};
};

const postBookmark = async ({ workspaceId, missionId }: TBookmark) => {
  const res = await customAxios.post(
    `/workspace/${workspaceId}/missions/${missionId}`,
  );
  return res;
};

const getBookmarks = async (workspaceId: number) => {
  try {
    const res = await customAxios.get(
      `/workspace/${workspaceId}/missions/favorite`,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const s3GetPresignedUrls = async () => {
  const res = await customAxios.get('/images/workout-proof/presignedUrl');

  return res;
};
const s3PutPresifnedUrls = async (file: File) => {
  try {
    const {
      data: { imageUrl, presignedUrl },
    } = await s3GetPresignedUrls();

    const res = await axios.put(presignedUrl, file, {});

    if (res.status === 200) {
      return imageUrl;
    }
  } catch (error) {
    console.log(error);
  }
};

const workout = async ({ workspaceId, data }: TWorkout) => {
  const res = await customAxios.post(
    `/workspaces/${workspaceId}/missions`,
    data,
  );

  return res;
};

export {
  postBookmark,
  getBookmarks,
  workout,
  s3GetPresignedUrls,
  s3PutPresifnedUrls,
};
