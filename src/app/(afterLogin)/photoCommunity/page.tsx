'use client';

import Image from 'next/image';
import registerPhoto from '@/../public/svgs/photoCommunity/registerPhoto.svg';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeeds } from '@/api/photoCommunity';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { s3ImageLoader } from '@/utils/image';

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getFeeds(pageParam);
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log('all', allPages);
      return lastPage?.data.length === 0 ? undefined : allPages.length; // 현재까지 로드된 페이지 수를 기반으로 계산
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  // 모든 데이터를 병합
  const photos = data?.pages.flatMap((page) => page?.data) || [];

  // 6개씩 나누기
  const chunkedPhotos = [];
  for (let i = 0; i < photos.length; i += 6) {
    chunkedPhotos.push(photos.slice(i, i + 6));
  }

  // CSS 클래스 배열 (1~6번의 스타일 유지)
  const cssClasses = [
    'w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2',
    'w-full h-44 bg-[#F4F8FB] rounded-lg',
    'w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2 col-start-2',
    'w-full h-64 bg-[#E6EAEF] rounded-lg col-start-1',
    'w-full h-44 bg-[#F4F8FB] rounded-lg',
    'w-full h-64 bg-[#E6EAEF] rounded-lg col-start-2 -mt-20',
  ];

  return (
    <div>
      <div className="flex justify-center items-center font-galmuri text-xl font-medium -mt-7 mb-6">
        GYMMI Photo
      </div>
      {chunkedPhotos.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          className="grid grid-cols-2 gap-4 h-full mb-4 relative"
        >
          {chunk.map((photo, index) => (
            <div
              key={photo.photoId}
              className={`${cssClasses[index]} relative`}
            >
              <Link href={`/photoCommunity/${photo.photoId}`}>
                <Image
                  src={photo.photoImageUrl}
                  alt={`Photo ${photo.photoId}`}
                  fill
                  className="rounded-lg object-cover"
                  loader={() => s3ImageLoader(photo.photoImageUrl)}
                />
              </Link>
            </div>
          ))}
        </div>
      ))}
      <Link href={'/photoCommunity/register'}>
        <div className="fixed bottom-28 right-4 bg-[#3B82F6] rounded-full transform transition-transform duration-200 hover:scale-110 active:scale-95">
          <Image src={registerPhoto} alt="photo-register" />
        </div>
      </Link>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
