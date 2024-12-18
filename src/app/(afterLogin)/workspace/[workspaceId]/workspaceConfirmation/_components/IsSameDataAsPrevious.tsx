import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

interface IIsSameDateAsPreviousProps {
  workoutConfirmationPages: IWorkoutConfirmationPageProps[];
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
  index: number;
}

export default function IsSameDateAsPrevious({
  workoutConfirmationPages,
  workoutConfirmationPage,
  index,
}: IIsSameDateAsPreviousProps) {
  const isSameDateAsPrevious =
    index > 0 &&
    workoutConfirmationPages[index - 1]?.createdAt.substring(0, 10) ===
      workoutConfirmationPage.createdAt.substring(0, 10);
  return (
    <div>
      {!isSameDateAsPrevious && (
        <div className='flex justify-center'>
          <div className='w-20 h-5 my-3 bg-[#F9FAFB] rounded flex justify-center'>
            <span className='text-[10px] text-[#4B5563]'>
              {workoutConfirmationPage.createdAt.substring(0, 10)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
