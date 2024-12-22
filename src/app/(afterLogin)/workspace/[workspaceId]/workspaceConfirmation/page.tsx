'use client';

import { useInView } from 'react-intersection-observer';

import { workoutConfirmations } from '@/api/workspaceConfirmaion';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

import ObjectionBell from './_components/ObjectionBell';
import IsSameDateAsPrevious from './_components/IsSameDataAsPrevious';
import ConfirmationCompo from './_components/ConfirmationCompo';
import useInfiniteQuerys from '@/hooks/workoutConfirmation/ useInfiniteQuerys';
import { useEffect, useRef } from 'react';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [ref, inView] = useInView({ threshold: 0, delay: 0 });

  const workoutConfirmation = useInfiniteQuerys({
    queryKey: ['workoutConfirmations', workspaceId],
    dataReqFn: workoutConfirmations,
    params: { workspaceId },
    inView,
  });

  const workoutConfirmationPages = workoutConfirmation?.pages.flatMap(
    (pages) => pages.data.data
  );
  const workoutConfirmationVoteInCompletionCount =
    workoutConfirmation?.pages.flatMap(
      (pages) => pages.data.voteIncompletionCount
    );

  return (
    <div className='h-max'>
      <div className='-mx-4 px-4 bg-[#F1F7FF] -mt-3 pb-3'>
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
        <ObjectionBell
          workspaceId={workspaceId}
          workoutConfirmationVoteInCompletionCount={
            workoutConfirmationVoteInCompletionCount
          }
        />
      </div>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
