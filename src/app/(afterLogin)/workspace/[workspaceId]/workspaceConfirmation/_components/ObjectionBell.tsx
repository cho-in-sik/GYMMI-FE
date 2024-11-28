'use client';

import Link from 'next/link';
import Image from 'next/image';

import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import objectionBell from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBell.svg';
import objectionBellFilled from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFilled.svg';

export default function ObjectionBell() {
  const workspaceId = useWorkoutIdFromParams();
  return (
    <Link
      href={`/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmationObjectionList`}
    >
      <div className=' fixed bottom-10 right-10 z-50'>
        {/* {voteInCompeletionCount === 0 ? (
          <Image
            src={objectionBell}
            alt='objectionBell'
            className='w-14 h-14'
          />
        ) : (
          <Image
            src={objectionBellFilled}
            alt='objectionBellFilled'
            className='w-14 h-14'
          />
        )} */}
      </div>
    </Link>
  );
}
