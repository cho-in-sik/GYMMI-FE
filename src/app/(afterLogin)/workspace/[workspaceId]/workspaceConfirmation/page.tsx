'use client';

import { useInView } from 'react-intersection-observer';

import { workoutConfirmations } from '@/api/workspaceConfirmaion';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

import ObjectionBell from './_components/ObjectionBell';
import IsSameDateAsPrevious from './_components/IsSameDataAsPrevious';
import ConfirmationCompo from './_components/ConfirmationCompo';
import useInfiniteQuerys from '@/hooks/workoutConfirmation/ useInfiniteQuerys';
import { useEffect, useRef, useState } from 'react';
import NoDataUI from '../../_components/NoDataUI';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [initialObserve, setInitialObserve] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const isInitialRender = useRef<boolean>(true);

  const workoutConfirmation = useInfiniteQuerys({
    queryKey: ['workoutConfirmations', workspaceId],
    dataReqFn: workoutConfirmations,
    params: { workspaceId },
    inView: inView && initialObserve,
  });

  const workoutConfirmationPages = workoutConfirmation?.pages
    .slice()
    .reverse()
    .flatMap((pages) => pages.data.data);

  const workoutConfirmationVoteInCompletionCount =
    workoutConfirmation?.pages.flatMap(
      (pages) => pages.data.voteIncompletionCount
    );

  useEffect(() => {
    if (
      isInitialRender.current &&
      workoutConfirmationPages &&
      workoutConfirmationPages.length
    )
      setTimeout(() => {
        scrollBottomRef.current?.scrollIntoView({
          behavior: 'auto',
        });
        isInitialRender.current = false;
        setTimeout(() => {
          setInitialObserve(true);
        }, 100);
      }, 100);
  }, [workoutConfirmationPages]);

  return (
    <div className='h-full'>
      <div className='-mx-4 px-4 bg-[#F1F7FF] -mt-3 pb-3'>
        {workoutConfirmationPages?.length === 0 ? (
          <div>
            <NoDataUI content='아직 운동 인증이 없어요.' />
          </div>
        ) : (
          <div>
            <div ref={ref} />
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
            <div ref={scrollBottomRef} />
          </div>
        )}
        <ObjectionBell
          workspaceId={workspaceId}
          workoutConfirmationVoteInCompletionCount={
            workoutConfirmationVoteInCompletionCount
          }
        />
      </div>
    </div>
  );
}
