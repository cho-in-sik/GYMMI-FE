'use client';

import pencil from '@/../public/svgs/workspace/pencil.svg';
import photo from '@/../public/svgs/workspace/photo.svg';
import plus from '@/../public/svgs/plus.svg';
import checkedCircle from '@/../public/svgs/workspace/checkedCircle.svg';
import nonCheckedCircle from '@/../public/svgs/workspace/nonCheckedCircle.svg';
import warning from '@/../public/svgs/workspace/warning.svg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useRef, useState } from 'react';

const items = [
  {
    id: 0,
    mission: '풀업 1세트(10회)',
    score: 10,
  },
  {
    id: 1,
    mission: '벤치프레스 1세트(10회)',
    score: 10,
  },
  {
    id: 2,
    mission: '스쿼트 1세트(10회)',
    score: 10,
  },
  {
    id: 3,
    mission: '오버헤드프레스 1세트(10회)',
    score: 7,
  },
];

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [comment, setComment] = useState('');

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };
  return (
    <div className="">
      <div className="mb-6">
        <Label htmlFor="photo" className="flex items-center justify-start mb-2">
          <Image src={photo} alt="photo" className="mr-1" />
          <span className="text-base mr-1">사진 등록</span>
          <span className="text-base">(필수)</span>
        </Label>
        <div className="flex justify-start items-end gap-1">
          <div
            className="w-24 h-24 bg-[#F9FAFB] rounded-lg flex justify-center items-center"
            onClick={handleClick}
          >
            <Image src={plus} alt="plus" />
          </div>
          <span className="text-[10px] text-[#B7C4D5] flex">
            <Image src={nonCheckedCircle} alt="check" className="mr-1" />
            사진 커뮤니티에도 사진을 등록할까요?
          </span>
          <input
            required
            id="photo"
            type="file"
            className="hidden"
            ref={fileInputRef}
          />
        </div>
      </div>
      <hr className="-mx-6 mb-6" />
      <div className="mb-2">
        <Label
          htmlFor="pencil"
          className="flex items-center justify-start mb-2"
        >
          <Image src={pencil} alt="pencil" className="mr-1" />
          <span className="text-base mr-1">코멘트 작성</span>
          <span className="text-base">(선택)</span>
        </Label>
        <div>
          <textarea
            id="pencil"
            className="bg-[#F9FAFB] px-3 py-[10px] w-full h-24 rounded-lg appearance-none focus:outline-none placeholder:text-xs text-xs"
            placeholder="운동에 대한 간단한 코멘트를 작성해주세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center items-start mb-2">
        <Image src={warning} alt="warning" />
        <span className="text-[10px] text-[#F87171]">
          성의없는 운동인증은 이의제기를 받을 수 있습니다. 또한 운동인증은 하루
          최대 3번까지만 등록 가능합니다.
        </span>
      </div>
      {/* 나중에 여기 아래 div태그 h 크기 바꾸기!!  */}
      <div className="-mx-6 bg-[#EFF6FF] min-h-full">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <div
              key={item.id}
              className={`px-6 py-4 ${
                !isLast ? 'border-b' : null
              } border-[#E5E7EB] flex justify-between items-center`}
            >
              <div>
                <h3>{item.mission}</h3>
                <h5 className="text-xs font-light">{`${item.score}점`}</h5>
              </div>
              <div className="text-2xl mr-4">3</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
