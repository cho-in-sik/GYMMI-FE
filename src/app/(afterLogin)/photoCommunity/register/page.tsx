import { Label } from '@/components/ui/label';
import photo from '@/../public/svgs/workspace/photo.svg';
import plus from '@/../public/svgs/plus.svg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="mt-4">
      <div className="text-2xl text-[#374151] font-yungothic font-semibold tracking-wider mb-6">
        <h1>운동 내용을</h1>
        <h1>커뮤니티에 공유해보세요!</h1>
      </div>
      <hr className="-mx-6 mb-6" />
      <div>
        <Label htmlFor="photo" className="flex items-center justify-start mb-2">
          <Image src={photo} alt="photo" className="mr-1" />
          <span className="text-base mr-1">사진 등록</span>
        </Label>
        <div className="w-24 h-24 bg-[#F9FAFB] rounded-lg flex justify-center items-center relative">
          <span className="absolute right-0 -top-2 text-white bg-red-500 rounded-full">
            x
          </span>
          <Image src={plus} alt="plus" />
        </div>
      </div>
    </div>
  );
}
