import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

interface IConfirmationPageProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
}

export default function ConfirmationCompoTime({
  workoutConfirmationPage,
}: IConfirmationPageProps) {
  return (
    <div
      className={`${
        workoutConfirmationPage.isMine ? 'mr-2' : 'ml-2'
      } flex items-end `}
    >
      <span className='text-[10px] text-[#9CA3AF]'>
        {workoutConfirmationPage.createdAt.substring(11, 16)}
      </span>
    </div>
  );
}
