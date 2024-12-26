'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DialogDescription } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import {
  workoutConfirmaionsDetail,
  workoutObjectionReason,
} from '@/api/workspaceConfirmaion';

import ScrollTop from '../_components/ScrollTop';
import ConfirmationDetailProfile from './_components/ConfirmationDetailProfile';
import { IWorkspaceConfirmationDetailProps } from '@/types/workoutConfirmation';
import ConfirmationDetailImage from './_components/ConfimationDetailImage';
import ConfirmationobjectionCompo from './_components/ConfirmationObjectionCompo';

export default function Page() {
  const [reasonInput, setReasonInput] = useState('');
  const router = useRouter();
  const workspaceId = useWorkoutIdFromParams();
  const seachParams = useSearchParams();
  const workoutConfirmationId = parseInt(
    seachParams.get('workoutConfirmationId') || '0',
    10
  );

  const objectionId = parseInt(seachParams.get('objectionId') || '0', 10);

  const { data: workspaceConfirmationDetail } = useQuery<{
    data: IWorkspaceConfirmationDetailProps;
  }>({
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

    if (reasonInput.length < 10) {
      alert('10자 이상 작성하셔야 합니다.');
    }

    if (reasonInput.length >= 10) {
      objectionReason.mutate({
        workspaceId,
        workoutConfirmationId,
        objectionReason: reasonInput,
      });
    }
  };

  return (
    <div className='h-screen'>
      <ScrollTop />
      <ConfirmationDetailProfile
        workspaceConfirmationDetail={workspaceConfirmationDetail?.data}
      />
      <div className='my-5'>
        <span className='text-base text-[#1F2937]'>
          {workspaceConfirmationDetail?.data.comment}
        </span>
        <ConfirmationDetailImage
          workspaceConfirmationDetail={workspaceConfirmationDetail?.data}
        />
      </div>

      {/* 이의 신청 팝업창 */}
      <Dialog>
        <ConfirmationobjectionCompo
          seachParams={seachParams}
          workspaceId={workspaceId}
          objectionId={objectionId}
        />

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
