import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';
import ConfirmationProfileImg from './ConfirmationProfileImg';

interface IConfirmationProfileProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
}

export default function ConfirmationProfile({
  workoutConfirmationPage,
}: IConfirmationProfileProps) {
  return (
    <div>
      {!workoutConfirmationPage.isMine && (
        <div className='flex'>
          <ConfirmationProfileImg
            profileImageUrlParams={workoutConfirmationPage.profileImageUrl}
          />

          <div className='ml-2 mt-1 justify-center'>
            <span className='text-[#1F2937] text-xs'>
              {workoutConfirmationPage.nickname}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
