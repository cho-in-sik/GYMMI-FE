'use client';

import Image from 'next/image';

import ObjectionListButton from './_components/ObjectionListButton';
import objectionBellFill from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFill.svg';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { useInfiniteQuery } from '@tanstack/react-query';
import { workoutConfirmationObjectionLists } from '@/api/workspaceConfirmaion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [statusButton, setStatusButton] = useState('open');
  console.log(statusButton);
  const [ref, inView] = useInView();

  // const {
  //   data: workoutConfirmationObjectionList,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ['workoutConfirmations', workspaceId],
  //   queryFn: async ({ pageParam = 0 }) => {
  //     const data = await workoutConfirmationObjectionLists({
  //       workspaceId,
  //       page: pageParam,
  //       status: statusButton,
  //     });
  //     return data;
  //   },
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => {
  //     return lastPage?.data.nextPage ? lastPage?.data.nextPage : undefined;
  //   },
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='h-max px-4 pb-3'>
      <span className='text-2xl text-[#374151]'>이의 신청 알림 목록</span>
      <hr className='border-1 border-[#E5E7EB] w-screen -mx-4 mt-6' />
      <div className='flex my-4'>
        <ObjectionListButton
          comment='모두'
          onClick={() => setStatusButton('open')}
        />
        <ObjectionListButton
          comment='투표 안함'
          onClick={() => setStatusButton('incompletion')}
        />
      </div>
      <div className='flex bg-[#F5F5F5] -mx-4 p-4'>
        <Image src={objectionBellFill} alt='ogjectionBellFill' />
        <div className='text-[#1F2937] flex flex-col pl-5 gap-y-1'>
          <span className='text-base'>
            인ㅅ1ㄱ1님의 인증이 이의신청되었어요.
          </span>
          <span className='text-xs'>24.11.20</span>
        </div>
      </div>
    </div>
  );
}
