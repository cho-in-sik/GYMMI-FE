import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';
import ConfirmationProfile from './ConfirmationProfile';
import ConfirmationCompoObjection from './ConfirmationCompoObjection';
import ConfirmationCompoConfirm from './ConfirmationCompoConfirm';
import ConfirmationCompoTime from './ConfirmationCompoTime';

interface IConfirmationCompoProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
  workspaceId: number;
}

export default function ConfirmationCompo({
  workoutConfirmationPage,
  workspaceId,
}: IConfirmationCompoProps) {
  return (
    <div className='my-10'>
      <ConfirmationProfile workoutConfirmationPage={workoutConfirmationPage} />
      <div
        className={`${
          workoutConfirmationPage.isMine && 'flex-row-reverse'
        } ml-10 mt-1 flex `}
      >
        {workoutConfirmationPage.isObjection ? (
          <ConfirmationCompoObjection
            workoutConfirmationPage={workoutConfirmationPage}
          />
        ) : (
          <ConfirmationCompoConfirm
            workoutConfirmationPage={workoutConfirmationPage}
            workspaceId={workspaceId}
          />
        )}
        <ConfirmationCompoTime
          workoutConfirmationPage={workoutConfirmationPage}
        />
      </div>
    </div>
  );
}
