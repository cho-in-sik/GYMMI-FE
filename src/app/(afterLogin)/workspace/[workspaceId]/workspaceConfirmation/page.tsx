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
import ConfirmationCompo from './_components/ConfirmationCompo';

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
  console.log(workoutConfirmationPages);

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
                <ConfirmationCompo
                  workoutConfirmationPage={workoutConfirmationPage}
                  workspaceId={workspaceId}
                />
              </div>
            );
          }
        )}
      </div>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
