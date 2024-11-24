'use client';

import Image from 'next/image';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import objectedWorkoutVoteIcon from '@/../public/svgs/workspace/workspaceConfirmaion/objectedWorkoutVoteIcon.svg';
import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';
import confirmDetailNoImage from '@/../public/svgs/workspace/workspaceConfirmaion/confirmDetailNoImage.svg';

import ProgressBar from './_components/ProgressBar';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { workoutConfirmaionsDetail } from '@/api/workspaceConfirmaion';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const seachParams = useSearchParams();
  const workoutConfirmationId = parseInt(
    seachParams.get('workoutConfirmationId') || '0',
    10
  );

  const { data: workspaceConfirmationDetail } = useQuery({
    queryKey: [
      'workspaceConfimationDetail',
      workspaceId,
      workoutConfirmationId,
    ],
    queryFn: () =>
      workoutConfirmaionsDetail({
        workspaceId,
        workoutConfirmationId,
      }),
  });
  console.log(workspaceConfirmationDetail);

  return (
    <div className='h-screen px-4'>
      <div className='flex ml-1 mt-1.5'>
        {workspaceConfirmationDetail?.data.profileImageUrl === 'default.png' ? (
          <Image src={profileIcon} alt='profileIcon' className='w-11 h-11' />
        ) : (
          <Image
            src={workspaceConfirmationDetail?.data.profileImageUrl}
            alt='profileIcon'
            className='w-11 h-11'
          />
        )}
        <div className='flex flex-col ml-3 mt-1'>
          <span className='text-base text-[#1F2937]'>
            {workspaceConfirmationDetail?.data.nickname}
          </span>
          <span className='text-[10px] text-[#848D99]'>
            {workspaceConfirmationDetail?.data.loginId}
          </span>
        </div>
      </div>
      <div className='my-5'>
        <span className='text-base text-[#1F2937]'>
          {workspaceConfirmationDetail?.data.comment}
        </span>
        <div className='w-[360px] h-[360px] bg-[#E5E7EB] mt-5 flex justify-center'>
          {workspaceConfirmationDetail?.data.workoutConfirmationImageUrl ===
          '' ? (
            <Image src={confirmDetailNoImage} alt='confirmDetailNoImage' />
          ) : (
            // <Image
            //   src={
            //     workspaceConfirmationDetail?.data.workoutConfirmationImageUrl
            //   }
            //   alt='Image'
            // />
            <></>
          )}
        </div>
      </div>

      {/* 이의 신청 팝업창 */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={
              ' w-[360px] h-11 bg-[#EFF6FF] rounded-[35px] flex justify-center'
            }
          >
            <button className='text-base text-[#848D99]'>이의 신청하기</button>
          </div>
        </DialogTrigger>

        <DialogContent className='w-72 h-[190px] rounded-lg'>
          <DialogHeader>
            <DialogTitle className='-mb-2' />
            <DialogDescription className='text-base text-[#1F2937]'>
              이의 신청 이유를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div>
            <input className='w-60 h-10 rounded-lg bg-[#F9FAFB] text-sm text-[#B7C4D5] pl-3' />
            <span className='text-[8px] text-[#F87171] ml-2'>
              이의 신청 이유는 10자 이상 작성해주세요.
            </span>
          </div>
          <DialogFooter>
            <div>
              <hr className='absolute left-1/2 -translate-x-1/2 w-72 border-l border-[#E5E7EB]' />
              <div className='flex justify-between mx-7'>
                <DialogClose asChild>
                  <button className='text-sm text-[#B7C4D5]'>cancel</button>
                </DialogClose>
                <hr className='h-[45px] border-l border-[#E5E7EB]' />
                <button className='text-sm text-[#3B82F6] mr-3'>OK</button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 이의 신청 투표 컴포넌트 */}
      {/* <div className='w-[360px] h-64 border border-[#E5E7EB] rounded-lg p-3'>
        <div className='flex'>
          <Image src={objectedWorkoutVoteIcon} alt='objectedWorkoutVoteIcon' />
          <span className='text-base text-[#1F2937] ml-1'>이의 신청 투표</span>
        </div>
        <p className='text-[10px] text-[#1F2937] my-2'>
          이의제기란 적합성평가기관이 희망하는 인정상태와 관련하여 KAB가 내린
          인정결정사항에 대하여 재고하여 줄 것을 요청하는 것을 의미하며~
        </p>
        <div className='flex justify-end mb-2'>
          <span className='text-[10px] text-[#848D99]'>
            남은 투표 시간 23:58:00 2명 참여
          </span>
        </div>
        <ProgressBar comment='찬성하기' />
        <ProgressBar comment='반대하기' />
        <Button comment='투표하기' />
      </div> */}
    </div>
  );
}
