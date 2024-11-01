import { workspace } from "@/constants/queryKey";
import { IWorkspaceInputs } from "@/types/\bworkSpace";
import customAxios from "@/utils/cutstomAxios";

type SearchProps = {
  type?: string;
  keyword?: string;
  page: any;
};

type JoinWorkspace = {
  password: string;
  task: string;
  workspaceId: number;
};

interface IMissions {
  id: number;
  count: number;
}

type Mission = {
  workspaceId: number;
  missions: IMissions[];
};
type MissionRecord = {
  workspaceId: any;
  userId: number;
};

type PasswordCheck = {
  workspaceId: number;
  password: string;
};

type TWorkspaceHistory = {
  workspaceId: number;
  userId: number;
};

type THistoryDetail = TWorkspaceHistory & {
  workoutHistoryId: number;
};

const myWorkspaces = async (page: number = 0) => {
  const res = await customAxios.get(`/workspaces/my?page=${page}`);
  return res;
};

const allWorkspaces = async ({ type, keyword = "", page = 0 }: SearchProps) => {
  if (type === "COMPLETED") {
    type = "";
  }
  const res = await customAxios.get(
    `/workspaces?status=${type}&keyword=${keyword}&page=${page}`
  );

  return res;
};

const createWorkspace = async (data: any) => {
  const res = await customAxios.post("/workspaces", data);
  return res;
};

const matchPassword = async ({ workspaceId, password }: PasswordCheck) => {
  const res = await customAxios.post(
    `/workspaces/${workspaceId}/match-password`,
    { password }
  );

  return res;
};

const joinWorkspace = async ({
  password,
  task,
  workspaceId,
}: JoinWorkspace) => {
  const formData = { password, task };
  const res = await customAxios.post(
    `/workspaces/${workspaceId}/join`,
    formData
  );
  return res;
};
const leaveWorkspace = async (workspaceId: number) => {
  const res = await customAxios.post(`/workspaces/${workspaceId}/leave`);
  return res;
};

const startWorkspace = async (workspaceId: number) => {
  const res = await customAxios.patch(`/workspaces/${workspaceId}/start`);
  return res;
};

const infoWorkspace = async (workspaceId: number) => {
  const res = await customAxios.get(`/workspaces/${workspaceId}`);
  return res;
};

const detailWorkspace = async (workspaceId: number) => {
  const res = await customAxios.get(`/workspaces/${workspaceId}/introduction`);
  return res;
};
const detailUpdate = async ({ workspaceId, data }: any) => {
  const res = await customAxios.put(`/workspaces/${workspaceId}/edit`, data);
  return res;
};

const missionsWorkspace = async (workspaceId: number) => {
  const res = await customAxios.get(`/workspaces/${workspaceId}/missions`);
  return res;
};

const missionsRecord = async ({ workspaceId, userId }: MissionRecord) => {
  const res = await customAxios.get(
    `/workspaces/${workspaceId}/workings/${userId}`
  );
  return res;
};

const postMissions = async ({ workspaceId, missions }: any) => {
  const id = Number(workspaceId);
  console.log(missions);
  const res = await customAxios.post(`/workspaces/${id}/missions`, missions);
  return res;
};

const userMissions = async ({ workspaceId, userId }: MissionRecord) => {
  const res = await customAxios.get(
    `/workspaces/${workspaceId}/workings/${userId}`
  );
  return res;
};

const completeWorkspace = async (workspaceId: number) => {
  const res = await customAxios.get(`/workspaces/${workspaceId}/tasks`);
  return res;
};

const alreadyIn = async (workspaceId: number) => {
  const res = customAxios.get(`/workspaces/${workspaceId}/enter`);
  return res;
};

// 워크스페이스 히스토리
const workspaceHistorys = async ({
  workspaceId,
  userId,
}: TWorkspaceHistory) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-context/${userId}`
  );
  return res;
};

// 히스토리 상세 운동 목록
const historyDetails = async ({
  workspaceId,
  userId,
  workoutHistoryId,
}: THistoryDetail) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-histories/${userId}/${workoutHistoryId}`
  );
  return res;
};

export {
  myWorkspaces,
  allWorkspaces,
  createWorkspace,
  joinWorkspace,
  startWorkspace,
  leaveWorkspace,
  infoWorkspace,
  matchPassword,
  missionsWorkspace,
  postMissions,
  missionsRecord,
  userMissions,
  detailWorkspace,
  detailUpdate,
  completeWorkspace,
  alreadyIn,
  workspaceHistorys,
  historyDetails,
};
