import Image from 'next/image';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';

import { imageLoader } from '@/utils/image';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

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
          {workoutConfirmationPage.profileImageUrl === 'default.png' ? (
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
      )}
    </div>
  );
}
