'use client';

import Image from 'next/image';

import speechBubble1 from '@/../public/svgs/workspace/speechBubble/speechBubble1.svg';
import speechBubble2 from '@/../public/svgs/workspace/speechBubble/speechBubble2.svg';
import speechBubble3 from '@/../public/svgs/workspace/speechBubble/speechBubble3.svg';

import WorkspaceTitle from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceTitle';
import WorkspaceGimmi from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceGimmi';

import type { TQueryTypes } from '@/types/workspaceHistory';
import { useEffect, useState } from 'react';
import { cheerUpMessages } from '@/constants/cheerUpMessage';

type TWorkspaceGimmiTitleTypes = {
  queryData: TQueryTypes | null;
};

function WorkspaceGimmiTitle({ queryData }: TWorkspaceGimmiTitleTypes) {
  const [randomMessage, setRandomMessage] = useState(``);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cheerUpMessages.length);
    setRandomMessage(cheerUpMessages[randomIndex].message);
  }, []);

  return (
    <div>
      {queryData && (
        <>
          <WorkspaceTitle name={queryData.name} workout={queryData.workout} />
          <div className='flex justify-center items-end gap-x-2 h-48 mb-5'>
            <WorkspaceGimmi
              workout={queryData.workout}
              achievementScore={queryData.achievementScore}
            />
            <div className='pb-28 relative'>
              <span className='text-[#4B5563] text-[10px] absolute top-5 right-5 left-6'>
                {randomMessage}
              </span>
              <Image src={speechBubble3} alt='speechBubble3' />
              <Image
                className='ml-3 my-2'
                src={speechBubble2}
                alt='speechBubble2'
              />
              <Image src={speechBubble1} alt='speechBubble1' />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default WorkspaceGimmiTitle;
