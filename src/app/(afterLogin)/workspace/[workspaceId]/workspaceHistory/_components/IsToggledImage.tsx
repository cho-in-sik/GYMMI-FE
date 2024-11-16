'use client';

import Image from 'next/image';

import detailVertical from '@/../public/svgs/workspace/workspaceHistory/detailVertical.svg';
import detailVerticalIsToggled from '@/../public/svgs/workspace/workspaceHistory/detailVerticalIsToggled.svg';

interface IsToggledImageProps {
  index: number;
  isToggled: boolean;
  workoutHistoriesLength: number;
}

function IsToggledImage({
  index,
  isToggled,
  workoutHistoriesLength,
}: IsToggledImageProps) {
  const isLastIndex = index === workoutHistoriesLength - 1;
  return (
    <>
      {isLastIndex ? (
        <></>
      ) : (
        <div>
          {isToggled ? (
            <Image
              src={detailVerticalIsToggled}
              alt='detailVerticalIsToggled'
            />
          ) : (
            <Image src={detailVertical} alt='detailVertical' />
          )}
        </div>
      )}
    </>
  );
}
export default IsToggledImage;
