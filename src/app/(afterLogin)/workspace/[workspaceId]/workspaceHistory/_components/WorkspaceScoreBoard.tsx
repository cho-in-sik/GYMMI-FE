'use client';

import Image from 'next/image';

import verticalLine from '@/../public/svgs/workspace/verticalLine.svg';
import type { TScoreData } from '@/types/workspaceHistory';
import type { TWorkspaceHistory } from '@/types/\bworkSpace';

interface WorkspaceScoreBoardProps {
  workspaceHistoryDatas: TWorkspaceHistory;
}

function WorkspaceScoreBoard({
  workspaceHistoryDatas,
}: WorkspaceScoreBoardProps) {
  const scoreDatas = [
    {
      id: 1,
      label: '일일 최고 운동점수',
      value: workspaceHistoryDatas?.bestDailyScore,
    },
    {
      id: 2,
      label: '누적 운동 기록 횟수',
      value: workspaceHistoryDatas?.totalWorkoutCount,
    },
    {
      id: 3,
      label: '1등과의 격차',
      value: workspaceHistoryDatas?.gabScoreFromFirst,
    },
  ];
  return (
    <div className='h-14 bg-white rounded-lg mb-4'>
      <div className='w-full' defaultValue='totalScore'>
        <div className='flex gap-x-4 pl-7 pt-2 justify-items-center'>
          <div className='flex flex-col items-center'>
            <span className='text-[#9C9EA3] text-[10px]'>총 점수</span>
            <span className='text-[#1F2937] text-base'>
              {workspaceHistoryDatas?.totalContributedScore}점
            </span>
          </div>
          <Image src={verticalLine} alt='verticalLine' />
          {scoreDatas.map((scoreData: TScoreData) => {
            return (
              <div
                className='flex flex-col items-center justify-center'
                key={scoreData.id}
              >
                <span className='text-[#9C9EA3] text-[10px]'>
                  {scoreData.label}
                </span>
                <span className='text-[#1F2937] text-sm pt-1'>
                  {scoreData.value}점
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceScoreBoard;
