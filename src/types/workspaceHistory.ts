type TScoreData = {
  id: number;
  label: string;
  value: number | string;
};

type THistorys = {
  id: number;
  isApproved: boolean;
  createdAt: string;
  sumOfScore: number;
};

type TQueryTypes = {
  userId: number;
  workout: boolean;
  achievementScore: number;
};

type TDetailHistorys = {
  id: number;
  count: number;
  mission: string;
  totalScore: number;
};

type THistoryDetails = {
  id: number;
  details: TDetailHistorys[];
};

interface IWorkHistoryListProps {
  index: number;
  workspaceHistoryData: THistorys;
  workoutHistoryIds: number[];
  workspaceId: number;
  userId: number;
  workoutHistoriesLength: number;
  handleWorkoutHistory: (id: number) => void;
}

export type {
  TScoreData,
  THistorys,
  TQueryTypes,
  TDetailHistorys,
  THistoryDetails,
  IWorkHistoryListProps,
};
