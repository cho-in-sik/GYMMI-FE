'use client';

import { useInView } from 'react-intersection-observer';

import { workoutConfirmations } from '@/api/workspaceConfirmaion';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

import ObjectionBell from './_components/ObjectionBell';
import IsSameDateAsPrevious from './_components/IsSameDataAsPrevious';
import ConfirmationCompo from './_components/ConfirmationCompo';
import useInfiniteQuerys from '@/hooks/workoutConfirmation/ useInfiniteQuerys';

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
                {/* 이의신청 컴포넌트 */}
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
