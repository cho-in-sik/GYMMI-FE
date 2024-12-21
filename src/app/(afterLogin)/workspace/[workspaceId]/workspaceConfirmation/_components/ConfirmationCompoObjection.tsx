import Image from 'next/image';

import confirmationIsObjectionArr from '@/../public/svgs/workspace/workspaceConfirmaion/confirmationIsObjectionArr.svg';
import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';

interface IConfirmationCompoObjectionProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
}

export default function ConfirmationCompoObjection({
  workoutConfirmationPage,
}: IConfirmationCompoObjectionProps) {
  const handleObjection = () => {
    const targetElement = document.getElementById(
      `confirmation-${workoutConfirmationPage.objectionId}`
    );

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  };
  return (
    <div
      onClick={handleObjection}
      className={`${
        workoutConfirmationPage.isMine ? 'bg-[#FFEDA6]' : 'bg-[#FDFDFD]'
      } w-56 h-full py-2 px-2 rounded-lg drop-shadow-lg`}
    >
      <div className='flex px-3 pb-1'>
        <Image
          src={confirmationIsObjectionArr}
          alt='confirmationIsObjectionArr'
        />
        <span className='text-[#D1D5DB] text-[10px] pl-2'>
          {workoutConfirmationPage.nickname}님의 인증으로 이동
        </span>
      </div>
      <span className='text-sm'>
        {workoutConfirmationPage.nickname}님의 운동인증이 이의신청 되었어요.
      </span>
    </div>
  );
}
