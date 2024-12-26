import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { DialogTrigger } from '@/components/ui/dialog';

import objectedWorkoutVoteIcon from '@/../public/svgs/workspace/workspaceConfirmaion/objectedWorkoutVoteIcon.svg';
import ProgressBar from './ProgressBar';
import RemaineTime from './RemaineTime';
import {
  workoutObjections,
  workoutObjectionsVote,
} from '@/api/workspaceConfirmaion';

interface IConfirmationObjectionCompo {
  seachParams: ReadonlyURLSearchParams;
  workspaceId: number;
  objectionId: number;
}

export default function ConfirmationObjectionCompo({
  seachParams,
  workspaceId,
  objectionId,
}: IConfirmationObjectionCompo) {
  console.log(seachParams);
  const [isObjectionVote, setIsObjection] = useState<boolean | null>(null);

  const isObjection = seachParams.get('isObjection') === 'false';

  const { data: workoutObjection } = useQuery({
    queryKey: ['workoutObjection', workspaceId, objectionId],
    queryFn: () =>
      workoutObjections({
        workspaceId,
        objectionId,
      }),
    enabled: !isObjection,
  });

  const handleVote = (isObjection: boolean) => {
    setIsObjection((prev) => (prev === isObjection ? null : isObjection));
  };

  const queryClient = useQueryClient();

  const OBJECTTIONVOTE_QUERYKEY = {
    workoutObjection: (workspaceId: number, objectionId: number) => [
      'workoutObjection',
      workspaceId,
      objectionId,
    ],
  };

  const objectionVote = useMutation({
    mutationFn: workoutObjectionsVote,
    onSuccess: (data) => {
      console.log('Success:', data);
      alert('이의 신청 투표가 성공적으로 제출되었습니다.');

      queryClient.invalidateQueries({
        queryKey: OBJECTTIONVOTE_QUERYKEY.workoutObjection(
          workspaceId,
          objectionId
        ),
      });
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
    <div>
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
            !workoutObjection?.data.inInProgress ? 'h-44' : 'h-42'
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
            <div className='h-11 bg-[#3B82F6] text-[#FFFFFF] rounded-[35px] mt-4 flex justify-center items-center opacity-60'>
              <span className='text-base'>투표 종료</span>
            </div>
          ) : (
            <div>
              <ProgressBar
                comment='찬성하기'
                progressValue={appovalCount}
                onClick={() => {
                  if (!workoutObjection?.data.voteCompletion) handleVote(true);
                }}
                isObjectionVote={isObjectionVote === true}
              />
              <ProgressBar
                comment='반대하기'
                progressValue={rejectionCount}
                onClick={() => {
                  if (!workoutObjection?.data.voteCompletion) handleVote(false);
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
                    disabled={objectionVote.isPending}
                  >
                    투표하기
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
