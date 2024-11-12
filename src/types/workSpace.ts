interface IMission {
  mission: string;
  score: number;
}

export interface IWorkspaceDetail {
  creator: number;
  name: string;
  headCount: number;
  goalScore: number;
  description: string;
  missionBoard: IMission[];
  task: string;
}

export interface IWorkspace {
  id: number;
  name: string;
  creator: string;
  status: '진행중' | '진행전' | '완료됨';
  createdAt: Date;
  achievementRate: number;
  tag: string;
  taskScore?: number;
  title?: string;
}

interface IMissionBoard {
  id: number;
  mission: string;
  score: number;
  placeholder?: string;
}
export interface IWorkspaceInputs {
  name: string;
  headCount: number | string;
  goalScore: number | string;
  description: string;
  tag: string;
  missionBoard: IMissionBoard[];
  task: string;
  checked: boolean;
}
export interface IW {
  groupMaker: IWorkspaceInputs;
  add1Page: ({ name, headCount }: any) => void;
  add2Page: ({ missionBoard, goalScore }: any) => void;
  add3Page: ({ task, description }: any) => void;
  clearData: () => void;
}

interface IUser {
  id: number;
  name: string;
  contributionScore: number;
  rank: number;
  isCreator: boolean;
  isMyself: boolean;
  profileImage: string;
}

export interface IInfoWork {
  name: string;
  headCount: number;
  status: string;
  goalScore: number;
  description: string;
  achievementScore: number;
  isCreator: boolean;
  workers: IUser[];
}

interface IWorker {
  id: number;
  name: string;
  contributeScore: number;
  rank: number;
  isCreator: boolean;
  isMyself: boolean;
  profileImage: string;
}

export interface IInfoWorkData {
  name: string;
  headCount: number;
  status: string;
  goalScore: number;
  description: string;
  achievementScore: number;
  isCreator: boolean;
  workers: IWorker[];
}

interface IWorkoutHistory {
  id: number;
  isApproved: string;
  createdAt: string;
  sumOfScore: number;
}

export interface IWorkspaceHistory {
  totalContributedScore: number;
  bestDailyScore: number;
  totalWorkoutCount: number;
  scoreGapFromFirst: number;
  workoutHistories: IWorkoutHistory[];
}
