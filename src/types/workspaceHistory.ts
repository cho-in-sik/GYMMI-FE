type TScoreData = {
  id: number;
  label: string;
  value: number | string;
};

type THistorys = {
  id: number;
  isApproved: string;
  createdAt: string;
  sumOfScore: number;
};

type TQueryTypes = {
  userId: number;
  name: string;
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

export type {
  TScoreData,
  THistorys,
  TQueryTypes,
  TDetailHistorys,
  THistoryDetails,
};
