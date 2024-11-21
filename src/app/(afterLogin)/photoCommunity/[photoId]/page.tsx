'use client';

import Image from 'next/image';
import basicIcon from '@/../public/images/basicIcon.png';
import settings from '@/../public/svgs/photoCommunity/settings.svg';
import heart from '@/../public/svgs/photoCommunity/heart.svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { feedDetails } from '@/api/photoCommunity';

export default function Page() {
  const { photoId } = useParams();
  const { data } = useQuery({
    queryKey: ['photoDetails', photoId],
    queryFn: () => feedDetails(photoId),
  });
  console.log(data);

  return (
    <div>
      <div className="mt-4 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-3">
          <Image src={basicIcon} alt="no-image" className="h-11 w-11" />
          <div className="text-base">경환2</div>
        </div>
        <div>
          <Image src={settings} alt="settings" />
        </div>
      </div>
      <div className="bg-[#E5E7EB] w-full h-96 max-w-96 max-h-96 relative mb-4">
        <Image src={basicIcon} alt="detail-image" fill />
      </div>
      <div className="flex justify-start items-center gap-1 mb-3">
        <Image src={heart} alt="empty-heart" />
        <span className="text-[#848D99]">4</span>
      </div>
      <div className="text-base font-yungothic leading-5 font-medium mb-2">
        오늘은 운동으 렁쩌고 저쩌고 등등을 했고 ㅁㄴㅇㅁ
        sadfdfasdfasdfㄴㅇㄹㅁㅇ
      </div>
      <div className="text-xs text-[#848D99]">
        <span>2024년 11월 14일 </span>
        <span>수정됨</span>
      </div>
    </div>
  );
}
