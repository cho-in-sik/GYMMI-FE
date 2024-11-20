'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import noGroup from '@/../public/svgs/noGroup.svg';

import { workspaceHistoryDataConst } from '@/constants/queryKey';
import { workspaceHistorys } from '@/api/workspace';

import WorkspaceScoreBoard from './_components/WorkspaceScoreBoard';
import WorkspaceGimmiTitle from './_components/WorkspaceGimmiTitle';
import WorkHistoryList from './_components/WorkoutHistoryList';

import useWorkoutHistoryIds from '@/hooks/workoutHistory/useWorkoutHistoryIds';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

import type { THistorys, TQueryTypes } from '@/types/workspaceHistory';

function useUserInfo(): TQueryTypes {
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get('userId') || '0', 10);
  const name = searchParams.get('name');
  const workout = searchParams.get('workout') === 'false';
  const achievementScore = parseInt(
    searchParams.get('achievementScore') || '0',
    10
  );

  return {
    userId,
    name: name || '',
    workout,
    achievementScore,
  };
}

function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const queryData = useUserInfo();
  const { workoutHistoryIds, handleWorkoutHistory } = useWorkoutHistoryIds();

  const { data: workspaceHistoryDatas, status } = useQuery({
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
  if (status === 'pending')
    return (
      <p className='text-[10px] text-center'>데이터를 불러오는 중입니다.</p>
    );

  if (status === 'error')
    return (
      <p className='text-[10px] text-center'>데이터를 불러올 수 없습니다.</p>
    );

  return (
    <div className='h-screen'>
      <WorkspaceGimmiTitle queryData={queryData} />

      <WorkspaceScoreBoard
        workspaceHistoryDatas={workspaceHistoryDatas?.data}
      />

      <div className='bg-white rounded-lg relative min-h-80 max-h-96 overflow-y-auto'>
        <div className='w-full pt-2 pb-5' defaultValue='myHistory'>
          <span className='text-[#9CA3AF] text-xs pl-5'>
            {'<개인별 운동 히스토리 목록>'}
          </span>
          {workspaceHistoryDatas?.data.workoutHistories.length === 0 ? (
            <div className='h-[230px] flex items-center justify-center flex-col'>
              <Image src={noGroup} alt='noGroup' className='h-[73px]' />
              <span className='text-[#4B5563] text-sm mt-5'>
                아직 운동 히스토리가 없습니다.
              </span>
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
