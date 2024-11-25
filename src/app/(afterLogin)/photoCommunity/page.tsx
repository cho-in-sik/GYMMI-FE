'use client';

import Image from 'next/image';
import registerPhoto from '@/../public/svgs/photoCommunity/registerPhoto.svg';
import Link from 'next/link';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getFeeds } from '@/api/photoCommunity';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    any,
    Error
  >({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getFeeds(pageParam);
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // console.log('lastPage:', lastPage);
      return lastPage?.nextPage || undefined;
    },
  });
  console.log(data?.pages[0].data);

  const { ref, inView } = useInView({
    //아래 ref div가 보이고 나서 몇픽셀정도가 호출될건가? -> 보이자마자 호출하기에 0으로 설정
    threshold: 0,
    //아래 ref div가 보이고 나서 몇초후에 이벤트 발생할지
    delay: 0,
  });

  useEffect(() => {
    //처음엔 false 화면에 안보이면 false임, 보이면 true로 변함
    if (inView) {
      //데이터 가져오고 있는데 또 가져오지 않기 위해 isFetching까지
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);
  return (
    <div>
      <div className="flex justify-center items-center font-galmuri text-xl font-medium -mt-7 mb-6">
        GYMMI Photo
      </div>
      <div className="grid grid-cols-2 gap-4 h-full mb-32 relative">
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2">1</div>
        <div className="w-full h-44 bg-[#F4F8FB] rounded-lg">2</div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2 col-start-2">
          3
        </div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg col-start-1">4</div>
        <div className="w-full h-44 bg-[#F4F8FB] rounded-lg">5</div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg col-start-2 -mt-20">
          6
        </div>

        <Link href={'/photoCommunity/register'}>
          <div className="fixed bottom-28 right-4 bg-[#3B82F6] rounded-full transform transition-transform duration-200 hover:scale-110 active:scale-95">
            <Image src={registerPhoto} alt="photo-register" />
          </div>
        </Link>
      </div>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
