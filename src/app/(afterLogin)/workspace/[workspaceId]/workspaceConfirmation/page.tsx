'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';
import noGroup from '@/../public/svgs/noGroup.svg';
import { workoutConfirmations } from '@/api/workspaceConfirmaion';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

interface IworkoutConfirmtionPageProps {
  createdAt: string;
  dayOfTheWeek: string;
  nickname: string;
  profileImageUrl: string;
  workoutConfirmationId: number;
  workoutConfirmationImageUrl: string;
  isMine: boolean;
  isObjection: boolean;
  objectionId: number;
}

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();

  const [ref, inView] = useInView();

  const {
    data: workoutConfirmation,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['workoutConfirmations', workspaceId],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await workoutConfirmations({
        workspaceId,
        page: pageParam,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data?.length < 11 ? undefined : allPages.length;
    },
  });
  console.log(workoutConfirmation);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isFetching)
    return (
      <div className='h-[230px] flex items-center justify-center flex-col'>
        <Image src={noGroup} alt='noGroup' className='h-[73px]' />
        <span className='text-[#4B5563] text-sm mt-5'>
          인증 목록을 불러오는 중입니다.
        </span>
      </div>
    );

  return (
    <div className='h-max px-4 -mt-3 pb-3 bg-[#F1F7FF]'>
      {workoutConfirmation?.pages[0].data?.map(
        (
          workoutConfirmationPage: IworkoutConfirmtionPageProps,
          index: number
        ) => {
          const isSameDateAsPrevious =
            index > 0 &&
            workoutConfirmation?.pages[0].data[index - 1]?.createdAt.substring(
              0,
              10
            ) === workoutConfirmationPage.createdAt.substring(0, 10);
          return (
            <div key={workoutConfirmationPage.workoutConfirmationId}>
              {!isSameDateAsPrevious && (
                <div className='flex justify-center'>
                  <div className='w-20 h-5 my-3 bg-[#F9FAFB] rounded flex justify-center'>
                    <span className='text-[10px] text-[#4B5563]'>
                      {workoutConfirmationPage.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
              )}

              {workoutConfirmationPage.isMine ? (
                <div className='my-10'>
                  <div className='ml-10 mt-1 flex justify-end'>
                    <div className='mr-2 flex items-end'>
                      <span className='text-[10px] text-[#9CA3AF]'>
                        {workoutConfirmationPage.createdAt.substring(11, 16)}
                      </span>
                    </div>
                    <Link
                      href={{
                        pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmaionDetail`,
                        query: {
                          workoutConfirmationId:
                            workoutConfirmationPage.workoutConfirmationId,
                          isObjection: workoutConfirmationPage.isObjection,
                          objectionId: workoutConfirmationPage.objectionId,
                        },
                      }}
                    >
                      {workoutConfirmationPage.isObjection ? (
                        <div className='w-56 h-14 bg-[#FDFDFD] py-1 px-2 rounded-lg drop-shadow-lg'>
                          <span className='text-sm'>
                            {workoutConfirmationPage.nickname}님의{' '}
                            {workoutConfirmationPage.createdAt.substring(5, 10)}
                            의 운동인증이 이의신청 되었어요. ...
                          </span>
                        </div>
                      ) : (
                        <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FFEDA6] rounded-lg drop-shadow-lg'>
                          <span className='text-[#1F2937] text-sm'>
                            운동인증을 올렸어요!
                          </span>
                          <div className='flex gap-x-2 '>
                            {/* <div className='w-[105px] h-[105px]'>
                          <Image
                            src={
                              workoutConfirmationPage.workoutConfirmationImageUrl
                            }
                            alt='workoutConfirmationImageUrl'
                        />
                        </div> */}
                            <div className='justify-start'>...</div>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='my-4'>
                  <div className='flex'>
                    {workoutConfirmationPage.profileImageUrl ===
                    'default.png' ? (
                      <Image src={profileIcon} alt='profileIcon' />
                    ) : (
                      <Image
                        src={workoutConfirmationPage.profileImageUrl}
                        alt='profileIcon'
                      />
                    )}

                    <div className='ml-2 mt-1 justify-center'>
                      <span className='text-[#1F2937] text-xs'>
                        {workoutConfirmationPage.nickname}
                      </span>
                    </div>
                  </div>
                  <div className='ml-10 mt-1 flex'>
                    <Link
                      href={{
                        pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmaionDetail`,
                        query: {
                          workoutConfirmationId:
                            workoutConfirmationPage.workoutConfirmationId,
                          isObjection: workoutConfirmationPage.isObjection,
                          objectionId: workoutConfirmationPage.objectionId,
                        },
                      }}
                    >
                      {workoutConfirmationPage.isObjection ? (
                        <div className='w-56 h-14 bg-[#FDFDFD] py-1 px-2 rounded-lg drop-shadow-lg'>
                          <span className='text-sm'>
                            {workoutConfirmationPage.nickname}님의{' '}
                            {workoutConfirmationPage.createdAt.substring(5, 10)}
                            의 운동인증이 이의신청 되었어요. ...
                          </span>
                        </div>
                      ) : (
                        <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FDFDFD] rounded-lg drop-shadow-lg'>
                          <span className='text-[#1F2937] text-sm'>
                            운동인증을 올렸어요!
                          </span>
                          <div className='flex gap-x-2 '>
                            {/* <div className='w-[105px] h-[105px]'>
                        <Image
                          src={
                            workoutConfirmationPage.workoutConfirmationImageUrl
                          }
                          alt='workoutConfirmationImageUrl'
                      />
                      </div> */}
                            <div className='justify-start'>...</div>
                          </div>
                        </div>
                      )}
                    </Link>
                    <div className='ml-2 flex items-end'>
                      <span className='text-[10px] text-[#9CA3AF]'>
                        {workoutConfirmationPage.createdAt.substring(11, 16)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }
      )}
      <div ref={ref} />
    </div>
  );
}
