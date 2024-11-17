import Image from 'next/image';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';
import confirmDetailNoImage from '@/../public/svgs/workspace/workspaceConfirmaion/confirmDetailNoImage.svg';

export default function Page() {
  return (
    <div className='px-4'>
      <div className='flex ml-1 mt-1.5'>
        <Image className='w-11 h-11' src={profileIcon} alt='profileIcon' />
        <div className='flex flex-col ml-3 mt-1'>
          <span className='text-base text-[#1F2937]'>짱짱승현</span>
          <span className='text-[10px] text-[#848D99]'>jdyjsh77</span>
        </div>
      </div>
      <div className='my-5'>
        <span className='text-base text-[#1F2937]'>
          오늘 운동은 어쩌고 저쩌고 등등을 했고, 목표에 얼마정도 달성을 해서 ~
        </span>
        <div className='w-[360px] h-[360px] bg-[#E5E7EB] mt-5 flex justify-center'>
          <Image src={confirmDetailNoImage} alt='confirmDetailNoImage' />
        </div>
      </div>
      <div className='w-[360px] h-11 bg-[#EFF6FF] rounded-[35px] flex justify-center'>
        <button className='text-base text-[#848D99]'>이의 신청하기</button>
      </div>
    </div>
  );
}
