'use client';

import Image from 'next/image';
// import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import backArrow from '@/../public/svgs/backArrow.svg';
import onePrize from '@/../public/svgs/workspace/workspaceHistory/onePrize.svg';
import lastPrize from '@/../public/svgs/workspace/workspaceHistory/lastPrize.svg';
// import { completeWorkspace } from '@/api/workspace';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import OneLastRank from '../_components/OneLastRank';
import TaskRankMenber from '../_components/TaskRankMenbers';
import TaskContent from '../_components/TaskContent';

const mockData = {
  task: '맛있는 밥 사주기',
  workers: [
    {
      name: '팀원1',
      rank: 1,
      contributeScore: 600,
    },
    {
      name: '팀원2',
      rank: 2,
      contributeScore: 500,
    },
    {
      name: '팀원3',
      rank: 3,
      contributeScore: 300,
    },
    {
      name: '팀원4',
      rank: 4,
      contributeScore: 200,
    },
    {
      name: '팀원5',
      rank: 5,
      contributeScore: 100,
    },
    {
      name: '팀원6',
      rank: 6,
      contributeScore: 50,
    },
  ],
};

export default function Page() {
  const router = useRouter();
  const workspaceId = useWorkoutIdFromParams();
  // const { data: completeWorkspaceInfo } = useQuery({
  //   queryKey: ['complete', workspaceId],
  //   queryFn: () => completeWorkspace(workspaceId),
  // });

  return (
    <div className={`w-full h-full px-5 py-11 bg-[#EFF6FF]`}>
      <div className='mb-5' onClick={() => router.back()}>
        <Image src={backArrow} alt='backArrow' />
      </div>
      <div>
        <div className='font-galmuri text-xl ml-5 flex flex-col gap-y-1'>
          <span>워크스페이스 목표를</span>
          <span>모두 달성했어요!</span>
        </div>
        <TaskContent task={mockData.task} />

        <div className='w-full bg-[#FFFFFF] rounded-2xl mt-3'>
          <div className='px-6 py-5'>
            <div className='text-xl text-[#4B5563] flex flex-col gap-y-1'>
              <span>
                <strong className='text-[#EF4444]'>최종순위</strong>를 확인 후
              </span>
              <span>테스크를 수행해보세요!</span>
            </div>
            <div className='flex justify-between mt-8'>
              <OneLastRank
                rankPrize={onePrize}
                name={mockData.workers[0].name}
                contributeScore={mockData.workers[0].contributeScore}
                rank={mockData.workers[0].rank}
                height='32'
              />
              <OneLastRank
                rankPrize={lastPrize}
                name={mockData.workers[mockData.workers.length - 1].name}
                contributeScore={
                  mockData.workers[mockData.workers.length - 1].contributeScore
                }
                rank={mockData.workers[mockData.workers.length - 1].rank}
                height='9'
              />
            </div>
            <div className='mt-5 mb-8'>
              <span className='text-[10px] text-[#6B7280] '>팀별 순위</span>
              <TaskRankMenber workers={mockData.workers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
