'use client';

import Image from 'next/image';
// import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import backArrow from '@/../public/svgs/backArrow.svg';
import onePrize from '@/../public/svgs/workspace/workspaceHistory/onePrize.svg';
import lastPrize from '@/../public/svgs/workspace/workspaceHistory/lastPrize.svg';
import taskRank from '@/../public/svgs/workspace/taskRank.svg';
import completeTask from '@/../public/images/completeTask.png';
// import { completeWorkspace } from '@/api/workspace';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import OneLastRank from '../_components/OneLastRank';

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
        <div className='w-full h-24 bg-[#FFFFFF] rounded-2xl mt-7 flex'>
          <div className='flex flex-col py-3 pl-6 justify-center'>
            <span className='pt-2 text-sm text-[#4B5563]'>그룹 테스크</span>
            <div className='w-52 h-full flex items-center'>
              <span className='text-2xl text-[#EF4444] font-bold'>
                {mockData.task}
              </span>
            </div>
          </div>
          <div className='absolute right-2 top-[70px]'>
            <Image src={completeTask} alt='completeTask' />
          </div>
        </div>
        <div className='w-full bg-[#FFFFFF] rounded-2xl mt-3'>
          <div className='px-6 py-5'>
            <div className='text-xl text-[#4B5563] flex flex-col gap-y-1'>
              <span>
                <strong className='text-[#EF4444]'>최종순위</strong>를 확인 후
              </span>
              <span>테스크를 수행해보세요!</span>
            </div>
            <div className='flex justify-between mt-8'>
              <div className='w-40 flex flex-col items-center'>
                <OneLastRank
                  rankPrize={onePrize}
                  rankName={mockData.workers[0].name}
                  rankContributeScore={mockData.workers[0].contributeScore}
                />
                <div className='w-full h-32 bg-[#F3F4F6] rounded-t-lg mt-5 flex items-end justify-center'>
                  <div className='text-sm text-[#9CA3AF] pb-0.5'>
                    {' '}
                    {mockData.workers[0].rank}{' '}
                  </div>
                </div>
              </div>
              <div className='w-40 flex flex-col items-center justify-end ml-1'>
                <OneLastRank
                  rankPrize={lastPrize}
                  rankName={mockData.workers[mockData.workers.length - 1].name}
                  rankContributeScore={
                    mockData.workers[mockData.workers.length - 1]
                      .contributeScore
                  }
                />
                <div className='w-full h-9 bg-[#F3F4F6] rounded-t-lg mt-5 flex items-end justify-center'>
                  <div className='text-sm text-[#9CA3AF] pb-0.5'>
                    {' '}
                    {mockData.workers[mockData.workers.length - 1].rank}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 mb-8'>
              <span className='text-[10px] text-[#6B7280] '>팀별 순위</span>
              {mockData.workers.map((worker) => (
                <div
                  key={worker.rank}
                  className='h-12 bg-[#F9FAFB] shadow-md rounded-lg flex items-center mb-3 relative'
                >
                  <div className='ml-4'>
                    <Image src={taskRank} alt='taskRank' />
                    <span className='absolute left-[23px] top-4 text-xs text-[#6B7280]'>
                      {worker.rank}
                    </span>
                  </div>
                  <div className='w-full pl-4 pr-7 flex justify-between'>
                    <span className='text-base text-[#7E7E7E]'>
                      {' '}
                      {worker.name}{' '}
                    </span>
                    <span className='text-base text-[#7E7E7E]'>
                      {' '}
                      {worker.contributeScore} P{' '}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
