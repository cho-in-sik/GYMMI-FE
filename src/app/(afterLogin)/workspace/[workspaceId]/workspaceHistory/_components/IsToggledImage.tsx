import Image from 'next/image';

import detailVertical from '@/../public/svgs/workspace/workspaceHistory/detailVertical.svg';
import detailVerticalIsToggled from '@/../public/svgs/workspace/workspaceHistory/detailVerticalIsToggled.svg';

interface IsToggledImageProps {
  isToggled: boolean;
  isLastIndex: boolean;
}

function IsToggledImage({ isToggled, isLastIndex }: IsToggledImageProps) {
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
