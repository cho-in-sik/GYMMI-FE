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
import { useEffect, useState } from 'react';
import RemaineTime from './_components/RemaineTime';
import { imageLoader } from '@/utils/image';

export default function Page() {
  const [reasonInput, setReasonInput] = useState('');
  const [isObjectionVote, setIsObjection] = useState<boolean | null>(null);

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

  const objectionReason = useMutation({
    mutationFn: workoutObjectionReason,
    onSuccess: (data) => {
      console.log('Success:', data);
      alert('이의 신청이 성공적으로 제출되었습니다.');
      router.push(`/workspace/${workspaceId}/workspaceConfirmation`);
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('이의 신청 제출 중 오류가 발생했습니다.');
    },
  });

  const handleReasonPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (reasonInput.length <= 10) {
      alert('10자 이상 작성하셔야 합니다.');
    }

    if (reasonInput.length >= 11) {
      objectionReason.mutate({
        workspaceId,
        workoutConfirmationId,
        objectionReason: reasonInput,
      });
    }
  };

  const handleVote = (isObjection: boolean) => {
    setIsObjection((prev) => (prev === isObjection ? null : isObjection));
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

  const appovalCount =
    (workoutObjection?.data.approvalCount / workoutObjection?.data.headCount) *
    100;
  const rejectionCount =
    (workoutObjection?.data.rejectionCount / workoutObjection?.data.headCount) *
    100;
  if (appovalCount > 100 || rejectionCount > 100) {
    appovalCount === 100 || rejectionCount === 100;
  }

  return (
    <div className='h-screen px-4'>
      <div className='flex ml-1 mt-1.5'>
        {workspaceConfirmationDetail?.data.profileImageUrl === 'default.png' ? (
          <Image src={profileIcon} alt='profileIcon' className='w-11 h-11' />
        ) : (
          <Image
            src={workspaceConfirmationDetail?.data.profileImageUrl}
            alt='userProfileIcon'
            className='w-11 h-11 rounded-full'
            loader={() =>
              imageLoader(workspaceConfirmationDetail?.data.profileImageUrl)
            }
            width={30}
            height={30}
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
        <div className='w-full h-[380px] bg-[#E5E7EB] mt-5 flex justify-center relative'>
          {workspaceConfirmationDetail?.data.workoutConfirmationImageUrl ===
          '' ? (
            <Image src={confirmDetailNoImage} alt='confirmDetailNoImage' />
          ) : (
            <Image
              src={
                workspaceConfirmationDetail?.data.workoutConfirmationImageUrl
              }
              alt='Image'
              loader={({ src }) => src}
              fill
              sizes='360px'
            />
          )}
        </div>
      </div>

      {/* 이의 신청 팝업창 */}
      <Dialog>
        {isObjection ? (
          <div
            className={
              ' w-full h-11 bg-[#EFF6FF] rounded-[35px] flex justify-center'
            }
          >
            <DialogTrigger asChild>
              <button className='w-full text-base text-[#848D99]'>
                이의 신청하기
              </button>
            </DialogTrigger>
          </div>
        ) : (
          <div
            className={`w-full ${
              !workoutObjection?.data.inInProgress ? 'h-44' : 'h-64'
            } border border-[#E5E7EB] rounded-lg p-3`}
          >
            <div className='flex'>
              <Image
                src={objectedWorkoutVoteIcon}
                alt='objectedWorkoutVoteIcon'
              />
              <span className='text-base text-[#1F2937] ml-1'>
                {!workoutObjection?.data.inInProgress
                  ? `투표 결과: ${
                      workoutObjection?.data.confirmationCompletion
                        ? '찬성'
                        : '반대'
                    }`
                  : '이의 신청 투표'}
              </span>
            </div>
            <p className='text-[10px] text-[#1F2937] my-2'>
              {workoutObjection?.data.reason}
            </p>
            <div className='flex justify-end mb-2'>
              <span className='text-[10px] text-[#848D99]'>
                {!workoutObjection?.data.inInProgress ? (
                  '투표 종료'
                ) : (
                  <>
                    투표 종료까지{' '}
                    <RemaineTime deadline={workoutObjection?.data.deadline} />
                  </>
                )}
                {' * '}
                {workoutObjection?.data.voteParticipationCount}명 참여
              </span>
            </div>
            {!workoutObjection?.data.inInProgress ? (
              <div className='h-11 bg-[#3B82F6] text-[#FFFFFF] rounded-[35px] mt-4 flex justify-center items-center'>
                <span className='text-base'>투표 종료</span>
              </div>
            ) : (
              <>
                <ProgressBar
                  comment='찬성하기'
                  progressValue={appovalCount}
                  onClick={() => {
                    if (!workoutObjection?.data.voteCompletion)
                      handleVote(true);
                  }}
                  isObjectionVote={isObjectionVote === true}
                />
                <ProgressBar
                  comment='반대하기'
                  progressValue={rejectionCount}
                  onClick={() => {
                    if (!workoutObjection?.data.voteCompletion)
                      handleVote(false);
                  }}
                  isObjectionVote={isObjectionVote === false}
                />
                <div
                  className={`h-11 ${
                    isObjectionVote !== null ||
                    workoutObjection?.data.voteCompletion
                      ? 'bg-[#3B82F6] text-[#FFFFFF]'
                      : 'bg-[#EFF6FF] text-[#3B82F6]'
                  } rounded-[35px] flex justify-center`}
                >
                  {workoutObjection?.data.voteCompletion ? (
                    <div className='text-base flex items-center'>투표완료</div>
                  ) : (
                    <button
                      className='text-base w-full'
                      onClick={handleVotePost}
                    >
                      투표하기
                    </button>
                  )}
                </div>
              </>
            )}
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
              <div className='flex justify-between mx-7 items-center'>
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
