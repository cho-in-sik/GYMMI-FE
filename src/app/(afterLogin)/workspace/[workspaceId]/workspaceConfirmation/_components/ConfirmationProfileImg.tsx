import Image from 'next/image';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';

import { imageLoader } from '@/utils/image';

type TProfileImageUrlParams = {
  profileImageUrlParams: string;
};

export default function ConfirmationProfileImg({
  profileImageUrlParams,
}: TProfileImageUrlParams) {
  return (
    <div>
      {profileImageUrlParams === 'default.png' ? (
        <Image
          src={profileIcon}
          alt='profileIcon'
          width={40}
          height={40}
          className='border rounded-full'
        />
      ) : (
        <Image
          src={profileImageUrlParams}
          alt='profileIcon'
          loader={() => imageLoader(profileImageUrlParams)}
          width={40}
          height={40}
          className='w-10 h-10 rounded-full'
          placeholder='blur'
          blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
        />
      )}
    </div>
  );
}
