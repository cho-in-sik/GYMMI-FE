import { useQuery } from '@tanstack/react-query';

import ConfirmationDetailImage from './ConfimationDetailImage';
import ConfirmationDetailProfile from './ConfirmationDetailProfile';
import { IWorkspaceConfirmationDetailProps } from '@/types/workoutConfirmation';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { workoutConfirmaionsDetail } from '@/api/workspaceConfirmaion';

interface IConfirmationDetailCompoProps {
  workoutConfirmationId: number;
}

export default function ConfirmationDetailCompo({
  workoutConfirmationId,
}: IConfirmationDetailCompoProps) {
  const workspaceId = useWorkoutIdFromParams();

  const { data: workspaceConfirmationDetail } = useQuery<{
    data: IWorkspaceConfirmationDetailProps;
  }>({
    queryKey: [
      'workspaceConfimationDetail',
      workspaceId,
      workoutConfirmationId,
    ],
    queryFn: () =>
      workoutConfirmaionsDetail({
        workspaceId,
        workoutConfirmationId,
      }),
  });
  return (
    <div>
      <ConfirmationDetailProfile
        workspaceConfirmationDetail={workspaceConfirmationDetail?.data}
      />
      <div className='my-5'>
        <span className='text-base text-[#1F2937]'>
          {workspaceConfirmationDetail?.data.comment}
        </span>
        <ConfirmationDetailImage
          workspaceConfirmationDetail={workspaceConfirmationDetail?.data}
        />
      </div>
    </div>
  );
}
