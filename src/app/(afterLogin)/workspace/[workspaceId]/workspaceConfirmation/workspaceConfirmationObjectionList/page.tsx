'use client';

import Image from 'next/image';

import ObjectionListButton from './_components/ObjectionListButton';
import objectionBellFill from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFill.svg';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { useInfiniteQuery } from '@tanstack/react-query';
import { workoutConfirmationObjectionLists } from '@/api/workspaceConfirmaion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface workoutConfirmationObjectionListPageProps {
  createdAt: string;
  objectionId: number;
  targetWorkerNickname: string;
  voteCompletion: boolean;
  workoutConfirmationId: number;
}

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [statusButton, setStatusButton] = useState('open');
  const [ref, inView] = useInView();

  const {
    data: workoutConfirmationObjectionList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['workoutConfirmations', workspaceId, statusButton],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await workoutConfirmationObjectionLists({
        workspaceId,
        page: pageParam,
        status: statusButton,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.data.nextPage ? lastPage?.data.nextPage : undefined;
    },
  });
  console.log(workoutConfirmationObjectionList);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const workoutConfirmationObjectionListPages =
    workoutConfirmationObjectionList?.pages.flatMap((pages) => pages.data);

  return (
    <div className='h-max px-4 pb-3'>
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
      </div>
      {workoutConfirmationObjectionListPages?.map(
        (
          workoutConfirmationObjectionListPage: workoutConfirmationObjectionListPageProps
        ) => {
          return (
            <div
              key={workoutConfirmationObjectionListPage.objectionId}
              className={`${
                workoutConfirmationObjectionListPage.voteCompletion
                  ? 'bg-[#F5F5F5]'
                  : 'bg-[FFFFFF]'
              } -mx-4 p-4`}
            >
              <Link
                href={{
                  pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmaionDetail`,
                  query: {
                    workoutConfirmationId:
                      workoutConfirmationObjectionListPage.workoutConfirmationId,
                    isObjection:
                      workoutConfirmationObjectionListPage.objectionId !== null,
                    objectionId:
                      workoutConfirmationObjectionListPage.objectionId,
                  },
                }}
              >
                <div className='flex'>
                  <Image
                    src={objectionBellFill}
                    alt='ogjectionBellFill'
                    className={`${
                      workoutConfirmationObjectionListPage.voteCompletion
                        ? 'fill-gray-100'
                        : 'fill-gray-900'
                    }`}
                  />
                  <div className='text-[#1F2937] flex flex-col pl-5 gap-y-1'>
                    <span className='text-base'>
                      {
                        workoutConfirmationObjectionListPage.targetWorkerNickname
                      }
                      님의 인증이 이의신청되었어요.
                    </span>
                    <span className='text-xs'>
                      {' '}
                      {workoutConfirmationObjectionListPage.createdAt.substring(
                        0,
                        10
                      )}{' '}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      )}
      <div ref={ref} />
    </div>
  );
}
