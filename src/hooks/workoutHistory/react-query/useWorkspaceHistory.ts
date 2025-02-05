'use client';

import { useQuery } from '@tanstack/react-query';

import { historyDetails, workspaceHistorys } from '@/api/workspace';
import { workspaceHistoryDataConst } from '@/constants/queryKey';

interface IUseWorkspaceHistoryQueryProps {
  workspaceId: number;
  queryDataUserId: number;
}

interface IUseWorkspaceHistoryListQueryProps {
  workspaceId: number;
  userId: number;
  workspaceHistoryDataId: number;
  isToggled: boolean;
}

export const useWorkspaceHistoryQuery = ({
  workspaceId,
  queryDataUserId,
}: IUseWorkspaceHistoryQueryProps) => {
  const { data: workspaceHistoryDatas } = useQuery({
    queryKey: [
      [
        workspaceHistoryDataConst.workspaceHistoryData,
        workspaceId,
        queryDataUserId,
      ],
    ],
    queryFn: () =>
      workspaceHistorys({
        workspaceId,
        userId: queryDataUserId,
      }),
  });
  return { workspaceHistoryDatas };
};

export const useWorkspaceHistoryListQuery = ({
  workspaceId,
  userId,
  workspaceHistoryDataId,
  isToggled,
}: IUseWorkspaceHistoryListQueryProps) => {
  const { data: workoutHistorydetails } = useQuery({
    queryKey: [
      [
        workspaceHistoryDataConst.workspaceHistoryDataDetail,
        workspaceId,
        userId,
        workspaceHistoryDataId,
      ],
    ],
    queryFn: () =>
      historyDetails({
        workspaceId,
        userId,
        workoutHistoryId: workspaceHistoryDataId,
      }),
    enabled: isToggled,
  });
  return { workoutHistorydetails };
};
