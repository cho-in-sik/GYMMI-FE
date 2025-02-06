'use client';

import Image from 'next/image';

import radius from '@/../public/svgs/workspace/workspaceHistory/radius.svg';
import radiusClicked from '@/../public/svgs/workspace/workspaceHistory/radiusClicked.svg';
import arrow from '@/../public/svgs/workspace/workspaceHistory/arrow.svg';
import detailHistoryRadius from '@/../public/svgs/workspace/workspaceHistory/detailHistoryRadius.svg';

import {
  IWorkHistoryListProps,
  TDetailHistorys,
} from '@/types/workspaceHistory';

import IsToggledImage from './IsToggledImage';
import ApproveStatusMsg from './ApproveStatusMsg';
import { useWorkspaceHistoryListQuery } from '@/hooks/workoutHistory/react-query/useWorkspaceHistory';

export default function WorkHistoryList({
  index,
  workoutHistoryIds,
  workspaceId,
  workspaceHistoryData,
  userId,
  workoutHistoriesLength,
  handleWorkoutHistory,
}: IWorkHistoryListProps) {
  const isToggled = workoutHistoryIds.includes(workspaceHistoryData.id);
  const isLastIndex = index === workoutHistoriesLength - 1;

  const workspaceHistoryDataId = workspaceHistoryData.id;

  const { workoutHistorydetails } = useWorkspaceHistoryListQuery({
    workspaceId,
    userId,
    workspaceHistoryDataId,
    isToggled,
  });

  return (
    <div className={`${isLastIndex && 'pb-5'} flex`}>
      <span className='text-[#9C9EA3] text-[10px]'>
        {`${workspaceHistoryData.createdAt.substring(
          5,
          7
        )}/${workspaceHistoryData.createdAt.substring(8, 10)}`}
      </span>
      <div className='flex flex-col items-center px-5'>
        <Image
          src={isToggled ? radiusClicked : radius}
          alt={isToggled ? 'radiusClicked' : 'radius'}
        />
        <IsToggledImage isToggled={isToggled} isLastIndex={isLastIndex} />
      </div>
      <div>
        <div
          onClick={() => {
            handleWorkoutHistory(workspaceHistoryData.id);
          }}
        >
          <span
            className={`text-base flex -mt-1 ${
              isToggled ? 'text-[#4B5563]' : 'text-[#6B7280]'
            }`}
          >
            {workspaceHistoryData.sumOfScore}점 운동 기록
            {isToggled ? (
              <></>
            ) : (
              <Image src={arrow} alt='arrow' className='w-[4px] ml-2' />
            )}
          </span>
        </div>
        <ApproveStatusMsg isApproved={workspaceHistoryData.isApproved} />
        {isToggled && (
          <div className='w-40 min-h-8 bg-[#FDFDFD] drop-shadow-md rounded-lg mt-2 pt-1 pb-2'>
            <div>
              {workoutHistorydetails?.data.map(
                (historyDetail: TDetailHistorys) => (
                  <div className='h-5 flex items-center' key={historyDetail.id}>
                    <Image
                      className='mx-2'
                      src={detailHistoryRadius}
                      alt='detailRadius'
                    />
                    <div>
                      <span className='text-[#4B5563] text-xs'>
                        {historyDetail.mission} {historyDetail.count} 회 -{' '}
                        {historyDetail.totalScore}p
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
