import customAxios from '@/utils/cutstomAxios';

type TBookmark = {
  workspaceId: number;
  missionId: number;
};

const postBookmark = async ({ workspaceId, missionId }: TBookmark) => {
  const res = customAxios.post(
    `/workspace/${workspaceId}/missions/${missionId}`,
  );
  return res;
};

const getBookmark = async ({ workspaceId }: TBookmark) => {
  const res = customAxios.get(`/workspace/${workspaceId}/missions/favorite`);
  return res;
};

const workout = async ({ workspaceId }: TBookmark) => {
  const res = customAxios.post(`/workspace/${workspaceId}/missions`);
  return res;
};
