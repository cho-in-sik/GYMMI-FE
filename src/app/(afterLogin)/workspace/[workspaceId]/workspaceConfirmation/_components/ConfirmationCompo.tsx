import Link from 'next/link';
import Image from 'next/image';

import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';
import ConfirmationProfile from './ConfirmationProfile';
import ConfirmationCompoObjection from './ConfirmationCompoObjection';

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
                  workoutConfirmationPage.isMine
                    ? 'bg-[#FFEDA6]'
                    : 'bg-[#FDFDFD]'
                } w-[150px] h-[150px] pl-2 pt-1 rounded-lg drop-shadow-lg`}
              >
                <span className='text-[#1F2937] text-sm'>
                  운동인증을 올렸어요!
                </span>
                <div className='flex gap-x-2 mt-1'>
                  <div className='w-[105px] h-[105px] flex items-center justify-center relative'>
                    {/* <Image
                  src={
                    workoutConfirmationPage.workoutConfirmationImageUrl
                  }
                  alt='workoutConfirmationImageUrl'
                  loader={({ src }) => src}
                  fill
                  sizes='105px'
                  className='object-cover'
                /> */}
                  </div>
                  <div className='flex items-end'>...</div>
                </div>
              </div>
            </Link>
          </div>
        )}
        <div
          className={`${
            workoutConfirmationPage.isMine ? 'mr-2' : 'ml-2'
          } flex items-end `}
        >
          <span className='text-[10px] text-[#9CA3AF]'>
            {workoutConfirmationPage.createdAt.substring(11, 16)}
          </span>
        </div>
      </div>
    </div>
  );
}
