'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { workspaceHistoryDataConst } from '@/constants/queryKey';
import { workspaceHistorys } from '@/api/workspace';

import WorkspaceScoreBoard from './_components/WorkspaceScoreBoard';
import WorkspaceGimmiTitle from './_components/WorkspaceGimmiTitle';
import WorkHistoryList from './_components/WorkoutHistoryList';

import useWorkoutHistoryIds from '@/hooks/workoutHistory/useWorkoutHistoryIds';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

import type { THistorys, TQueryTypes } from '@/types/workspaceHistory';
import NoDataUI from '../../_components/NoDataUI';
import ScrollTop from '../workspaceConfirmation/_components/ScrollTop';

function useUserInfo(): TQueryTypes {
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get('userId') || '0', 10);
  const workout = searchParams.get('workout') === 'false';
  const achievementScore = parseInt(
    searchParams.get('achievementScore') || '0',
    10
  );

  return {
    userId,
    workout,
    achievementScore,
  };
}

function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const queryData = useUserInfo();
  const { workoutHistoryIds, handleWorkoutHistory } = useWorkoutHistoryIds();

  const { data: workspaceHistoryDatas } = useQuery({
    queryKey: [
      [
        workspaceHistoryDataConst.workspaceHistoryData,
        workspaceId,
        queryData.userId,
      ],
    ],
    queryFn: () =>
      workspaceHistorys({
        workspaceId,
        userId: queryData.userId,
      }),
  });

  return (
    <div className='h-screen'>
      <ScrollTop />
      <WorkspaceGimmiTitle
        queryData={queryData}
        personNickName={workspaceHistoryDatas?.data.nickname}
      />

      <WorkspaceScoreBoard
        workspaceHistoryDatas={workspaceHistoryDatas?.data}
      />

      <div className='bg-white rounded-lg relative min-h-80 max-h-96 overflow-y-auto'>
        <div className='w-full pt-2 pb-5' defaultValue='myHistory'>
          <span className='text-[#9CA3AF] text-xs pl-5'>
            {'<개인별 운동 히스토리 목록>'}
          </span>
          {workspaceHistoryDatas?.data.workoutHistories.length === 0 ? (
            <div className='h-[230px]'>
              <NoDataUI content={'아직 운동 히스토리가 없어요.'} />
            </div>
          ) : (
            <div className='pt-4 pl-6'>
              {workspaceHistoryDatas?.data.workoutHistories.map(
                (workspaceHistoryData: THistorys, index: number) => {
                  return (
                    <WorkHistoryList
                      key={workspaceHistoryData.id}
                      index={index}
                      workoutHistoryIds={workoutHistoryIds}
                      workspaceId={workspaceId}
                      workspaceHistoryData={workspaceHistoryData}
                      userId={queryData.userId}
                      workoutHistoriesLength={
                        workspaceHistoryDatas?.data.workoutHistories.length
                      }
                      handleWorkoutHistory={handleWorkoutHistory}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Page;
