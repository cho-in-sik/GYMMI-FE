import Image from 'next/image';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';

export default function Page() {
  return (
    <div className='h-screen px-4 -mt-3 bg-[#F1F7FF]'>
      <div className='flex justify-center'>
        <div className='w-20 h-5 my-4 bg-[#F9FAFB] rounded flex justify-center'>
          <span className='text-[10px] text-[#4B5563]'>날짜</span>
        </div>
      </div>
      <div className='my-5'>
        <div className='flex'>
          <Image src={profileIcon} alt='profileIcon' />
          <div className='ml-2 mt-1 justify-center'>
            <span className='text-[#1F2937] text-xs'>짱짱승현</span>
          </div>
        </div>
        <div className='ml-10 mt-1 flex'>
          <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FDFDFD] rounded-lg drop-shadow-lg'>
            <span className='text-[#1F2937] text-sm'>운동인증을 올렸어요!</span>
            <div className='w-[105px] h-[105px] mt-2 bg-[#D1D5DB]'></div>
          </div>
          <div className='ml-2 flex items-end'>
            <span className='text-[10px] text-[#9CA3AF]'>오후 7:03</span>
          </div>
        </div>
      </div>
      {/* 사용자 자신이 인증을 올렸을 때 */}
      <div className='my-10'>
        <div className='ml-10 mt-1 flex justify-end'>
          <div className='mr-2 flex items-end'>
            <span className='text-[10px] text-[#9CA3AF]'>오후 7:03</span>
          </div>
          <div className='w-[150px] h-[150px] pl-2 pt-1 bg-[#FFEDA6] rounded-lg drop-shadow-lg'>
            <span className='text-[#1F2937] text-sm'>운동인증을 올렸어요!</span>
            <div className='w-[105px] h-[105px] mt-2 bg-[#D1D5DB]'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
