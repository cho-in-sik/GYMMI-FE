'use client';

import Link from 'next/link';
import Image from 'next/image';

import objectionBell from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBell.svg';
import objectionBellFilled from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFilled.svg';

interface IObjectionProps {
  workspaceId: number;
  workoutConfirmationVoteInCompletionCount: number[] | undefined;
}

export default function ObjectionBell({
  workspaceId,
  workoutConfirmationVoteInCompletionCount,
}: IObjectionProps) {
  const voteInCompeletionCount = workoutConfirmationVoteInCompletionCount?.some(
    (count) => count > 0
  );
  return (
    <Link
      href={`/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmationObjectionList`}
    >
      <div className='fixed bottom-14 right-2 z-50'>
        {voteInCompeletionCount ? (
          <div className='relative'>
            <span className='h-3 w-3 animate-ping absolute top-1 right-2 rounded-full bg-sky-400 opacity-75' />
            <Image
              src={objectionBellFilled}
              alt='objectionBellFilled'
              className='w-14 h-14'
            />
          </div>
        ) : (
          <Image
            src={objectionBell}
            alt='objectionBell'
            className='w-14 h-14'
          />
        )}
      </div>
    </Link>
  );
}
