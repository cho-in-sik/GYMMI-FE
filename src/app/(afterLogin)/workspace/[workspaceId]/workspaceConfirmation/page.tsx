'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';

import { workoutConfirmations } from '@/api/workspaceConfirmaion';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { imageLoader } from '@/utils/image';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';
import ObjectionBell from './_components/ObjectionBell';
import IsSameDateAsPrevious from './_components/IsSameDataAsPrevious';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();

  const [ref, inView] = useInView({ threshold: 0, delay: 0 });

  // 커스텀 훅으로 분리하기
  const {
    data: workoutConfirmation,
    fetchNextPage,
    hasNextPage,
    isFetching,
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
      return lastPage?.data.length === 0 ? undefined : allPages.length;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const workoutConfirmationPages = workoutConfirmation?.pages.flatMap(
    (pages) => pages.data
  );

  return (
    <div className='h-max'>
      <div className='-mx-4 px-4 -mt-3 pb-3 bg-[#F1F7FF]'>
        <ObjectionBell />
        {workoutConfirmationPages?.map(
          (
            workoutConfirmationPage: IWorkoutConfirmationPageProps,
            index: number
          ) => {
            return (
              <div
                key={`${workoutConfirmationPage.workoutConfirmationId}-${
                  workoutConfirmationPage.objectionId || 'noObjection'
                }-${workoutConfirmationPage.createdAt}`}
              >
                {/* 운동 인증에서 같은 날짜의 운동들 & 날짜 컴포넌트 */}
                <IsSameDateAsPrevious
                  workoutConfirmationPages={workoutConfirmationPages}
                  workoutConfirmationPage={workoutConfirmationPage}
                  index={index}
                />
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
                            isObjection:
                              workoutConfirmationPage.isObjection ||
                              workoutConfirmationPage.objectionId !== null,
                            objectionId: workoutConfirmationPage.objectionId,
                          },
                        }}
                      >
                        {workoutConfirmationPage.isObjection ? (
                          <div className='w-56 h-14 bg-[#FFEDA6] py-1 px-2 rounded-lg drop-shadow-lg'>
                            <span className='text-sm'>
                              {workoutConfirmationPage.nickname}님의 운동인증이
                              이의신청 되었어요.
                            </span>
                          </div>
                        ) : (
                          <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FFEDA6] rounded-lg drop-shadow-lg'>
                            <span className='text-[#1F2937] text-sm'>
                              운동인증을 올렸어요!
                            </span>
                            <div className='flex gap-x-2 mt-1'>
                              <div className='w-[105px] h-[105px] flex items-center justify-center relative'>
                                {/* <Image
                                  src={
                                    workoutConfirmationPage.workoutConfirmationImageUrl
                                  }
                                  alt='workoutConfirmationImageUrl'
                                  loader={({ src }) => src}
                                  fill
                                  sizes='105px'
                                  className='object-cover'
                                /> */}
                              </div>
                              <div className='flex items-end'>...</div>
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
                          loader={() =>
                            imageLoader(workoutConfirmationPage.profileImageUrl)
                          }
                          width={30}
                          height={30}
                          className='w-9 h-9 rounded-full'
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
                            isObjection:
                              workoutConfirmationPage.isObjection ||
                              workoutConfirmationPage.objectionId !== null,
                            objectionId: workoutConfirmationPage.objectionId,
                          },
                        }}
                      >
                        {workoutConfirmationPage.isObjection ? (
                          <div className='w-56 h-14 bg-[#FDFDFD] py-1 px-2 rounded-lg drop-shadow-lg'>
                            <span className='text-sm'>
                              {workoutConfirmationPage.nickname}님의 운동인증이
                              이의신청 되었어요.
                            </span>
                          </div>
                        ) : (
                          <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FDFDFD] rounded-lg drop-shadow-lg'>
                            <span className='text-[#1F2937] text-sm'>
                              운동인증을 올렸어요!
                            </span>
                            <div className='flex gap-x-2 mt-1'>
                              <div className='w-[105px] h-[105px] flex items-center relative'>
                                {/* <Image
                                  src={
                                    workoutConfirmationPage.workoutConfirmationImageUrl
                                  }
                                  alt='workoutConfirmationImageUrl'
                                  loader={({ src }) => src}
                                  fill
                                  className='object-cover'
                                /> */}
                              </div>
                              <div className='flex items-end'>...</div>
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
      </div>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
