import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
      {/* 이의 신청 팝업창 */}
      <Dialog>
        <div className='w-[360px] h-11 bg-[#EFF6FF] rounded-[35px] flex justify-center'>
          <DialogTrigger asChild>
            <button className='text-base text-[#848D99]'>이의 신청하기</button>
          </DialogTrigger>

          <DialogContent className='w-72 h-[190px] rounded-lg'>
            <DialogHeader>
              <DialogTitle className='font-normal text-base text-[#1F2937]'>
                이의 신청 이유를 입력해주세요.
              </DialogTitle>
            </DialogHeader>
            <div>
              <input
                defaultValue='이의 신청 이유'
                className='w-60 h-10 rounded-lg bg-[#F9FAFB] text-sm text-[#B7C4D5] pl-3'
              />
              <span className='text-[8px] text-[#F87171] ml-2'>
                이의 신청 이유는 10자 이상 작성해주세요.
              </span>
            </div>
            <DialogFooter>
              <div>
                <hr className='absolute left-1/2 -translate-x-1/2 w-72 border-l border-[#E5E7EB]' />
                <div className='flex justify-between mx-7'>
                  <button className='text-sm text-[#B7C4D5]'>cancel</button>
                  <hr className='h-[45px] border-l border-[#E5E7EB]' />
                  <button className='text-sm text-[#3B82F6] mr-3'>OK</button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
