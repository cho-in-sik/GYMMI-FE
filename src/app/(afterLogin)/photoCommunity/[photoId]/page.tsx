'use client';

import Image from 'next/image';
import basicIcon from '@/../public/images/basicIcon.png';
import settings from '@/../public/svgs/photoCommunity/settings.svg';
import heart from '@/../public/svgs/photoCommunity/heart.svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { feedDetails } from '@/api/photoCommunity';
import { formatDate } from '@/utils/date';
import { s3ImageLoader } from '@/utils/image';

type TPhotoDetail = {
  comment: string;
  createdAt: string;
  isModified: boolean;
  photoImageUrl: string;
  profileImageUrl: string;
  thumpsUpCount: number;
};

export default function Page() {
  const { photoId } = useParams();
  const { data } = useQuery<TPhotoDetail>({
    queryKey: ['photoDetails', photoId],
    queryFn: () => feedDetails(photoId),
  });
  console.log(data);

  return (
    <div>
      <div className="mt-4 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-3">
          <Image
            src={
              data?.profileImageUrl === 'default.png'
                ? basicIcon
                : data?.profileImageUrl!
            }
            alt="no-image"
            className="h-11 w-11"
          />
          <div className="text-base">경환2</div>
        </div>
        <div>
          <Image src={settings} alt="settings" />
        </div>
      </div>
      <div className="bg-[#E5E7EB] w-full h-96 max-w-96 max-h-96 relative mb-4">
        <Image
          src={data?.photoImageUrl!}
          alt="detail-image"
          loader={() => s3ImageLoader(data?.photoImageUrl)}
          fill
        />
      </div>
      <div className="flex justify-start items-center gap-1 mb-3">
        <Image src={heart} alt="empty-heart" />
        <span className="text-[#848D99]">{data?.thumpsUpCount}</span>
      </div>
      <div className="text-base font-yungothic leading-5 font-medium mb-2">
        {data?.comment}
      </div>
      <div className="text-xs text-[#848D99]">
        <span>{formatDate(data?.createdAt!)}</span>
        <span>수정됨</span>
      </div>
    </div>
  );
}
