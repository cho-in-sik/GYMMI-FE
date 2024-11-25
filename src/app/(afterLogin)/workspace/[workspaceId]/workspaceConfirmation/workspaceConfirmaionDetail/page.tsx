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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import {
  workoutConfirmaionsDetail,
  workoutObjectionReason,
  workoutObjections,
  workoutObjectionsVote,
} from '@/api/workspaceConfirmaion';
import { useState } from 'react';

export default function Page() {
  const [reasonInput, setReasonInput] = useState('');
  const [isObjectionVote, setIsObjection] = useState<boolean | null>(null);
  console.log(typeof isObjectionVote);

  const router = useRouter();

  const workspaceId = useWorkoutIdFromParams();
  const seachParams = useSearchParams();
  const workoutConfirmationId = parseInt(
    seachParams.get('workoutConfirmationId') || '0',
    10
  );
  const isObjection = seachParams.get('isObjection') === 'false';

  const objectionId = parseInt(seachParams.get('objectionId') || '0', 10);

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
    enabled: isObjection,
  });

  const { data: workoutObjection } = useQuery({
    queryKey: ['workoutObjection', workspaceId, objectionId],
    queryFn: () =>
      workoutObjections({
        workspaceId,
        objectionId,
      }),
    enabled: !isObjection,
  });
  console.log(workoutObjection);

  const objectionReason = useMutation({
    mutationFn: workoutObjectionReason,
    onSuccess: (data) => {
      console.log('Success:', data);
      alert('이의 신청이 성공적으로 제출되었습니다.');
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('이의 신청 제출 중 오류가 발생했습니다.');
    },
  });

  const handleReasonPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    objectionReason.mutate({
      workspaceId,
      workoutConfirmationId,
      objectionReason: reasonInput,
    });
  };

  const handleVote = (isVote: boolean) => {
    if (isObjectionVote === isVote) {
      setIsObjection(null);
    } else {
      setIsObjection(isVote);
    }
  };

  const objectionVote = useMutation({
    mutationFn: workoutObjectionsVote,
    onSuccess: (data) => {
      console.log('Success:', data);
      alert('이의 신청 투표가 성공적으로 제출되었습니다.');
      router.push(`/workspace/${workspaceId}/workspaceConfirmation`);
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('이의 신청 투표 중 오류가 발생했습니다.');
    },
  });

  const handleVotePost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isObjectionVote === null) {
      alert('이의신청 투표를 진행해주세요.');
    }

    if (isObjectionVote !== null) {
      objectionVote.mutate({
        workspaceId,
        objectionId,
        objectionVote: isObjectionVote,
      });
    }
  };

  return (
    <div className='h-screen px-4'>
      <div className='flex ml-1 mt-1.5'>
        {workspaceConfirmationDetail?.data.profileImageUrl === 'default.png' ? (
          <Image src={profileIcon} alt='profileIcon' className='w-11 h-11' />
        ) : (
          <Image
            src={workspaceConfirmationDetail?.data.profileImageUrl}
            alt='userProfileIcon'
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
        {isObjection ? (
          <DialogTrigger asChild>
            <div
              className={
                ' w-[360px] h-11 bg-[#EFF6FF] rounded-[35px] flex justify-center'
              }
            >
              <button className='text-base text-[#848D99]'>
                이의 신청하기
              </button>
            </div>
          </DialogTrigger>
        ) : (
          <div className='w-[360px] h-64 border border-[#E5E7EB] rounded-lg p-3'>
            <div className='flex'>
              <Image
                src={objectedWorkoutVoteIcon}
                alt='objectedWorkoutVoteIcon'
              />
              <span className='text-base text-[#1F2937] ml-1'>
                이의 신청 투표
              </span>
            </div>
            <p className='text-[10px] text-[#1F2937] my-2'>
              {workoutObjection?.data.reason}
            </p>
            <div className='flex justify-end mb-2'>
              <span className='text-[10px] text-[#848D99]'>
                남은 투표 시간 23:58:00{' '}
                {workoutObjection?.data.voteParticipationCount}명 참여
              </span>
            </div>
            <ProgressBar
              comment='찬성하기'
              progressValue={0}
              onClick={() => handleVote(true)}
              isObjectionVote={isObjectionVote}
            />
            <ProgressBar
              comment='반대하기'
              progressValue={0}
              onClick={() => handleVote(false)}
              isObjectionVote={isObjectionVote}
            />
            <div
              className={`h-11 ${
                isObjectionVote !== null
                  ? 'bg-[#3B82F6] text-[#FFFFFF]'
                  : 'bg-[#EFF6FF] text-[#3B82F6]'
              } rounded-[35px] flex justify-center`}
            >
              <button className='text-base w-full' onClick={handleVotePost}>
                투표하기
              </button>
            </div>
          </div>
        )}

        <DialogContent
          className={`w-72 ${
            reasonInput.length <= 10 ? 'h-[190px]' : 'h-[165px]'
          } rounded-lg`}
        >
          <DialogHeader>
            <DialogTitle className='-mb-2' />
            <DialogDescription className='text-base text-[#1F2937]'>
              이의 신청 이유를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div>
            <input
              className='w-60 h-10 rounded-lg bg-[#F9FAFB] text-sm text-[#B7C4D5] pl-3'
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
            />
            {reasonInput.length <= 10 ? (
              <span className='text-[8px] text-[#F87171] ml-2'>
                이의 신청 이유는 10자 이상 작성해주세요.
              </span>
            ) : (
              <></>
            )}
          </div>
          <DialogFooter>
            <div>
              <hr className='absolute left-1/2 -translate-x-1/2 w-72 border-l border-[#E5E7EB]' />
              <div className='flex justify-between mx-7'>
                <DialogClose asChild>
                  <span className='text-sm text-[#B7C4D5]'>cancel</span>
                </DialogClose>
                <hr className='h-[45px] border-l border-[#E5E7EB]' />
                <button
                  className='text-sm text-[#3B82F6] mr-3'
                  onClick={handleReasonPost}
                >
                  OK
                </button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
