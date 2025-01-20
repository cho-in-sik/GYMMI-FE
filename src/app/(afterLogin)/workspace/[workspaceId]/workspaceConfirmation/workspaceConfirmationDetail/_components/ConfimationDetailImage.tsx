import Image from 'next/image';

import confirmDetailNoImage from '@/../public/svgs/workspace/workspaceConfirmaion/confirmDetailNoImage.svg';
import { IWorkspaceConfirmationDetailProps } from '@/types/workoutConfirmation';
import { s3ImageLoader } from '@/utils/image';

interface IConfirmationDetailImage {
  workspaceConfirmationDetail: IWorkspaceConfirmationDetailProps | undefined;
}

export default function ConfirmationDetailImage({
  workspaceConfirmationDetail,
}: IConfirmationDetailImage) {
  return (
    <div className='w-full h-[380px] bg-[#E5E7EB] mt-5 flex justify-center relative'>
      {workspaceConfirmationDetail?.workoutConfirmationImageUrl === '' ? (
        <Image src={confirmDetailNoImage} alt='confirmDetailNoImage' />
      ) : (
        <Image
          src={workspaceConfirmationDetail?.workoutConfirmationImageUrl}
          alt='Image'
          loader={() =>
            s3ImageLoader(
              workspaceConfirmationDetail?.workoutConfirmationImageUrl
            )
          }
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
    </div>
  );
}
