import plus from '@/../public/svgs/plus.svg';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import registerIcon from '@/../public/svgs/workspace/registerOff.svg';
import registerOnIcon from '@/../public/svgs/workspace/registerOn.svg';

import emptyStar from '@/../public/svgs/workspace/emptyStar.svg';
import filledStar from '@/../public/svgs/workspace/filledStar.svg';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="">
      <div className="flex justify-start items-center text-xs gap-2 mb-4">
        <div className="px-3 py-1 bg-[#9CA3AF] rounded-xl text-white">전체</div>
        <div className="px-3 py-1 bg-[#F9FAFB] text-[#9CA3AF] rounded-xl">
          즐겨찾기
        </div>
      </div>
      <Drawer>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {items.map((item) => (
            <div
              className="w-full h-16 py-3 px-4 rounded-lg bg-[#FEFCE8] flex justify-between items-center"
              key={item.id}
            >
              <div className=" flex flex-col">
                <h3 className="text-base">풀업 1세트(10회)</h3>
                <span className="text-xs font-normal">10점</span>
              </div>

              <div>
                <DrawerTrigger asChild>
                  <Image src={plus} alt="plus" />
                </DrawerTrigger>
              </div>
            </div>
          ))}
        </div>
        <DrawerContent>
          <div className="w-full max-w-sm">
            <DrawerHeader>
              <div className="flex justify-between">
                <DrawerTitle className="mb-2">풀업 1세트(10회)</DrawerTitle>
                <div>
                  <Image src={emptyStar} alt="empty-star" />
                </div>
              </div>

              <DrawerDescription>10점</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <div className="w-full py-2 px-5 rounded-full bg-[#F3F4F6] flex justify-between mb-2">
                <button className="text-2xl">-</button>
                <div className="text-2xl">1</div>
                <button className="text-2xl">+</button>
              </div>
              <button className="w-full py-3 rounded-full bg-main text-white">
                추가하기
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="w-full fixed bottom-10">
        <div className="w-full">
          <button className="py-3 w-[85%] bg-[#EFF6FF] rounded-full flex justify-center items-center text-base">
            <div>
              <Image src={registerIcon} alt="registerIcon" />
            </div>
            등록하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
