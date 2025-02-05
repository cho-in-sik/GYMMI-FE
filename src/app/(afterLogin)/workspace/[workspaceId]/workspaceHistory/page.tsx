'use client';

import WorkspaceScoreBoard from './_components/WorkspaceScoreBoard';
import WorkspaceGimmiTitle from './_components/WorkspaceGimmiTitle';
import WorkHistoryList from './_components/WorkoutHistoryList';

import useWorkoutHistoryIds from '@/hooks/workoutHistory/useWorkoutHistoryIds';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

import type { THistorys } from '@/types/workspaceHistory';
import NoDataUI from '../../_components/NoDataUI';
import ScrollTop from '../workspaceConfirmation/_components/ScrollTop';
import useUserInfoSearchParams from '@/hooks/workoutHistory/useUserInfoSearchParams';
import { useWorkspaceHistoryQuery } from '@/hooks/workoutHistory/react-query/useWorkspaceHistory';

function Page() {
  const workspaceId = useWorkoutIdFromParams();

  const queryData = useUserInfoSearchParams();
  const queryDataUserId = queryData.userId;

  const { workoutHistoryIds, handleWorkoutHistory } = useWorkoutHistoryIds();

  const { workspaceHistoryDatas } = useWorkspaceHistoryQuery({
    workspaceId,
    queryDataUserId,
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
                      userId={queryDataUserId}
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
