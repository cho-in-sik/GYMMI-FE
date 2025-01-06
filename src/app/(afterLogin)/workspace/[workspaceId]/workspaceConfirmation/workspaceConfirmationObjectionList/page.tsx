'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ObjectionListButton from './_components/ObjectionListButton';

import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import useInfiniteQuerys from '@/hooks/workoutConfirmation/ useInfiniteQuerys';
import { workoutConfirmationObjectionLists } from '@/api/workspaceConfirmaion';
import WorkoutConfirmationObjectionList from './_components/WorkoutConfirmationObjectionList';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [statusButton, setStatusButton] = useState('open');
  const [ref, inView] = useInView();

  const workoutConfirmationObjectionList = useInfiniteQuerys({
    queryKey: ['workoutConfirmations', workspaceId, statusButton],
    dataReqFn: workoutConfirmationObjectionLists,
    params: { workspaceId, status: statusButton },
    inView,
  });

  const workoutConfirmationObjectionListPages =
    workoutConfirmationObjectionList?.pages.flatMap((pages) => pages.data);

  return (
    <div className='h-max pb-3'>
      <span className='text-2xl text-[#374151]'>이의 신청 알림 목록</span>
      <hr className='border-1 border-[#E5E7EB] w-screen -mx-4 mt-6' />
      <div className='flex my-4'>
        <ObjectionListButton
          comment='모두'
          onClick={() => setStatusButton('open')}
          isClick={statusButton === 'open'}
        />
        <ObjectionListButton
          comment='투표 안함'
          onClick={() => setStatusButton('incompletion')}
          isClick={statusButton === 'incompletion'}
        />
        {/* <ObjectionListButton
          comment='완료됨'
          onClick={() => setStatusButton('incompletion')}
          isClick={statusButton === 'incompletion'}
        /> */}
      </div>
      <WorkoutConfirmationObjectionList
        workoutConfirmationObjectionListPages={
          workoutConfirmationObjectionListPages
        }
        workspaceId={workspaceId}
      />
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
