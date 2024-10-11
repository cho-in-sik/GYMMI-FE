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
import { DialogContent } from '@radix-ui/react-dialog';
import Image from 'next/image';

export default function Page() {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="h-screen">
      <div className="flex justify-start items-center text-xs gap-2 mb-4">
        <div className="px-3 py-1 bg-slate-300 rounded-xl">전체</div>
        <div className="px-3 py-1 bg-slate-300 rounded-xl">즐겨찾기</div>
      </div>
      <Drawer>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {items.map((item) => (
            <div
              className="w-full h-16 py-3 px-4 rounded-lg bg-slate-400 flex justify-between items-center"
              key={item.id}
            >
              <div className=" flex flex-col">
                <h3 className="text-base">풀업 1세트(10회)</h3>
                <span className="text-xs">10점</span>
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
              <DrawerTitle className="mb-2">풀업 1세트(10회)</DrawerTitle>
              <DrawerDescription>10점</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <div className="w-full py-3 px-5 rounded-full bg-slate-200 flex justify-between">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
              <button className="w-full py-3 rounded-full bg-slate-300">
                추가하기
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="w-full absolute bottom-10">
        <div className="w-full">
          <button className="py-4 w-10/12 bg-slate-300 rounded-full">
            등록하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
