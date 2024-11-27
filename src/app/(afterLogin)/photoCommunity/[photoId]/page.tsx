'use client';

import Image from 'next/image';
import basicIcon from '@/../public/images/basicIcon.png';
import settings from '@/../public/svgs/photoCommunity/settings.svg';
import heart from '@/../public/svgs/photoCommunity/heart.svg';
import filledHeart from '@/../public/svgs/photoCommunity/filledHeart.svg';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { feedDetails, feedHeart } from '@/api/photoCommunity';
import { formatDate } from '@/utils/date';
import { s3ImageLoader } from '@/utils/image';
import useHeart from '@/hooks/useHeart';

type TPhotoDetail = {
  comment: string;
  createdAt: string;
  isModified: boolean;
  photoImageUrl: string;
  profileImageUrl: string;
  thumpsUpCount: number;
  nickname: string;
  hasMyThumbsUp: boolean;
  isMine: boolean;
};

export default function Page() {
  const { photoId } = useParams();

  const photoIdString = Array.isArray(photoId) ? photoId[0] : photoId;
  const photoIdNumber = Number(photoIdString);

  const { data } = useQuery<TPhotoDetail>({
    queryKey: ['photoDetails', photoIdNumber],
    queryFn: () => feedDetails(photoIdNumber),
  });

  const { like, toggleBookmark, count } = useHeart({
    id: photoIdNumber,
    queryKey: 'photoDetails',
    bookmarkFn: feedHeart,
    initialBookmarkState: data?.hasMyThumbsUp || false,
    initialCount: data?.thumpsUpCount || 0,
  });

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
          <div className="text-base">{data?.nickname}</div>
        </div>

        <div>{data?.isMine && <Image src={settings} alt="settings" />}</div>
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
        <button onClick={toggleBookmark}>
          <Image
            src={like ? filledHeart : heart}
            alt={like ? 'filled-heart' : 'empty-heart'}
          />
        </button>
        <span className="text-[#848D99]">{count}</span>
      </div>

      <div className="text-base font-yungothic leading-5 font-medium mb-2">
        {data?.comment}
      </div>
      <div className="text-xs text-[#848D99]">
        <span>{formatDate(data?.createdAt!)} </span>
        {data?.isModified && <span>수정됨</span>}
      </div>
    </div>
  );
}
