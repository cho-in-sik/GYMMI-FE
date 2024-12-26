import { workoutObjectionReason } from '@/api/workspaceConfirmaion';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IConfirmationDetailObjectionInputProps {
  workoutConfirmationId: number;
}

export default function ConfirmationDetailObjectionInput({
  workoutConfirmationId,
}: IConfirmationDetailObjectionInputProps) {
  const router = useRouter();
  const [reasonInput, setReasonInput] = useState('');
  const workspaceId = useWorkoutIdFromParams();

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
    <DialogContent
      className={`w-72 ${
        reasonInput.length <= 9 ? 'h-[190px]' : 'h-[165px]'
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
  );
}
