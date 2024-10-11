import plus from '@/../public/svgs/plus.svg';
import Image from 'next/image';

export default function Page() {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="h-screen">
      <div className="flex justify-start items-center text-xs gap-2 mb-4">
        <div className="px-3 py-1 bg-slate-300 rounded-xl">전체</div>
        <div className="px-3 py-1 bg-slate-300 rounded-xl">즐겨찾기</div>
      </div>
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
              <Image src={plus} alt="plus" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
