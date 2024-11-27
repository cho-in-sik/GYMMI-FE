'use client';

import Image from 'next/image';
import basicIcon from '@/../public/images/basicIcon.png';
import settings from '@/../public/svgs/photoCommunity/settings.svg';
import heart from '@/../public/svgs/photoCommunity/heart.svg';
import filledHeart from '@/../public/svgs/photoCommunity/filledHeart.svg';
import deleteFeedIcon from '@/../public/svgs/photoCommunity/deleteFeed.svg';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { deleteFeed, feedDetails, feedHeart } from '@/api/photoCommunity';
import { formatDate } from '@/utils/date';
import { s3ImageLoader } from '@/utils/image';
import useHeart from '@/hooks/useHeart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

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
  const router = useRouter();
  const { photoId } = useParams();

  const [open, setOpen] = useState(false);

  const photoIdString = Array.isArray(photoId) ? photoId[0] : photoId;
  const photoIdNumber = Number(photoIdString);

  const { data, isError } = useQuery<TPhotoDetail>({
    queryKey: ['photoDetails', photoIdNumber],
    queryFn: () => feedDetails(photoIdNumber),
  });

  if (isError) router.push('/photoCommunity');

  const { like, toggleBookmark, count } = useHeart({
    id: photoIdNumber,
    queryKey: 'photoDetails',
    bookmarkFn: feedHeart,
    initialBookmarkState: data?.hasMyThumbsUp || false,
    initialCount: data?.thumpsUpCount || 0,
  });

  const deleteFeedMutation = useMutation({
    mutationFn: () => deleteFeed(photoId),
    onSuccess: () => {
      router.push('/photoCommunity');
      console.log('요청 성공');
    },
    onError: () => {
      console.error('에러 발생');
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });

  return (
    <div>
      <div className="mt-4 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-3">
          {!data?.photoImageUrl ? null : (
            <Image
              src={
                data?.profileImageUrl === 'default.png'
                  ? basicIcon
                  : data?.profileImageUrl!
              }
              alt="no-image"
              className="h-11 w-11"
            />
          )}

          <div className="text-base">{data?.nickname}</div>
        </div>

        <Select>
          <SelectTrigger>
            <div>{data?.isMine && <Image src={settings} alt="settings" />}</div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delete">
              <div
                className="flex justify-start items-center"
                onClick={() => setOpen(true)}
              >
                <div className="mr-2 ml-4">
                  <Image src={deleteFeedIcon} alt="delete-feed" />
                </div>
                <div className="text-[#F87171]">삭제하기</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-[#E5E7EB] w-full h-96 max-w-96 max-h-96 relative mb-4">
        {!data?.photoImageUrl ? null : (
          <Image
            src={data?.photoImageUrl!}
            alt="detail-image"
            loader={() => s3ImageLoader(data?.photoImageUrl)}
            fill
          />
        )}
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

      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className="w-9/12 rounded-lg h-36 font-yungothic">
          <div className="text-center text-sm mt-4 mb-4">
            정말 게시물을 삭제하시겠습니까?
          </div>

          <div className="flex justify-around items-center border-t-[1px] -mx-6">
            <DialogClose>
              <div
                className="text-[#F87171] py-3 px-12 border-r-[1px] font-light"
                onClick={() => setOpen(false)}
              >
                cancel
              </div>
            </DialogClose>
            <div
              className="text-[#D1D5DB] py-3 px-12"
              onClick={() => deleteFeedMutation.mutate()}
            >
              Yes
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
