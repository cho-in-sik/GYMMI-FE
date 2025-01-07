'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import backArrow from '@/../public/svgs/backArrow.svg';
import onePrize from '@/../public/svgs/workspace/workspaceHistory/onePrize.svg';
import completeTask from '@/../public/images/completeTask.png';
import { completeWorkspace } from '@/api/workspace';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

export default function Page() {
  const router = useRouter();
  const workspaceId = useWorkoutIdFromParams();
  // const { data: completeWorkspaceInfo } = useQuery({
  //   queryKey: ['complete', workspaceId],
  //   queryFn: () => completeWorkspace(workspaceId),
  // });

  return (
    <div className={`w-full h-screen px-5 py-11 bg-[#ffffff]`}>
      <div className='mb-5' onClick={() => router.back()}>
        <Image src={backArrow} alt='backArrow' />
      </div>
      <div>
        <div className='font-galmuri text-xl ml-5 flex flex-col gap-y-1'>
          <span>워크스페이스 목표를</span>
          <span>모두 달성했어요!</span>
        </div>
        <div className='w-full h-24 bg-[#F2F3F5] rounded-2xl mt-7 flex'>
          <div className='flex flex-col gap-y-1 py-3 pl-6 justify-center'>
            <span className='text-sm text-[#848D99]'>그룹 테스크</span>
            <span className='text-2xl text-[#4B5563] font-bold'>
              맛있는 밥 사주기
            </span>
          </div>
          <div className='absolute right-2 top-[70px]'>
            <Image src={completeTask} alt='completeTask' />
          </div>
        </div>
        <div className='w-full bg-[#F2F3F5] rounded-2xl mt-3'>
          <div className='px-6 py-5'>
            <div className='text-xl text-[#9CA3AF] flex flex-col gap-y-1'>
              <span>
                <strong className='text-[#4B5563]'>최종순위</strong>를 확인 후
              </span>
              <span>테스크를 수행해보세요!</span>
            </div>
            <div className='flex justify-between mt-8'>
              <div className='w-40 flex flex-col items-center'>
                <div className='flex'>
                  <Image src={onePrize} alt='onePrize' className='w-14 h-14' />
                  <div className='flex flex-col justify-center items-center'>
                    <span className='text-xl text-[#4B5563] font-bold'>
                      1등 닉네임
                    </span>
                    <span className='text-[10px] text-[#6B7280]'>
                      총 1등 점수
                    </span>
                  </div>
                </div>
                <div className='w-full h-32 bg-[#fdfdff] rounded-t-lg mt-5 flex items-end justify-center'>
                  <div className='text-sm text-[#D9D9D9] pb-0.5'>1</div>
                </div>
              </div>
              <div className='w-40 flex flex-col items-center justify-end ml-1'>
                <div className='flex flex-col items-center'>
                  <span className='text-xl text-[#4B5563] font-bold'>
                    4등 닉네임
                  </span>
                  <span className='text-[10px] text-[#6B7280]'>4등 점수</span>
                </div>
                <div className='w-full h-9 bg-[#fdfdff] rounded-t-lg mt-5 flex items-end justify-center'>
                  <div className='text-sm text-[#D9D9D9] pb-0.5'>4</div>
                </div>
              </div>
            </div>
            <div className='mt-5 mb-8'>
              <span className='text-[10px] text-[#6B7280] '>팀별 순위</span>
              <div className='h-12 bg-[#ffffff] rounded-lg flex items-center'>
                <div className='pl-5'>2</div>
                <div className='w-full px-7 flex justify-between'>
                  <span className='text-base text-[#7E7E7E]'>팀원 닉네임</span>
                  <span className='text-base text-[#7E7E7E]'>팀별 점수</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
