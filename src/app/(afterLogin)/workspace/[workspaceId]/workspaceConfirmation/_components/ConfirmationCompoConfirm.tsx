import Link from 'next/link';
import Image from 'next/image';

import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

interface IConfirmationCompoConfirmProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
  workspaceId: number;
}

export default function ConfirmationCompoConfirm({
  workoutConfirmationPage,
  workspaceId,
}: IConfirmationCompoConfirmProps) {
  return (
    <div id={`confirmation-${workoutConfirmationPage.objectionId}`}>
      <Link
        href={{
          pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmaionDetail`,
          query: {
            workoutConfirmationId:
              workoutConfirmationPage.workoutConfirmationId,
            isObjection:
              workoutConfirmationPage.isObjection ||
              workoutConfirmationPage.objectionId !== null,
            objectionId: workoutConfirmationPage.objectionId,
          },
        }}
      >
        <div
          className={`${
            workoutConfirmationPage.isMine ? 'bg-[#FFEDA6]' : 'bg-[#FDFDFD]'
          } w-[150px] h-[150px] pl-2 pt-1 rounded-lg drop-shadow-lg`}
        >
          <span className='text-[#1F2937] text-sm'>운동인증을 올렸어요!</span>
          <div className='flex gap-x-2 mt-1'>
            <div className='w-[105px] h-[105px] flex items-center justify-center relative'>
              <Image
                src={workoutConfirmationPage.workoutConfirmationImageUrl}
                alt='workoutConfirmationImageUrl'
                loader={({ src }) => src}
                loading='lazy'
                sizes='105px'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex items-end'>...</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
