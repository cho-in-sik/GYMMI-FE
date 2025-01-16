import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

interface IWorkspaceCompleteModalProps {
  workspaceId: number;
  status: string;
  isObjectionInProgress: boolean;
}

export default function WorkspaceCompleteModal({
  workspaceId,
  status,
  isObjectionInProgress,
}: IWorkspaceCompleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'COMPLETED') {
      setIsOpen(true);
    }
  }, [status]);

  const handleModalChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalChange}>
      <DialogTitle />
      <DialogContent className='w-4/6 rounded-lg'>
        <DialogDescription>
          <div className='text-center text-black'>
            {isObjectionInProgress ? (
              <span>
                테스크를 보기 위해서는
                <br />
                이의신청을 모두 완료해야해요!
              </span>
            ) : (
              <span>
                워크스페이스 목표를 모두 달성했어요!
                <br />
                테스크를 확인하러갈까요?
              </span>
            )}
          </div>
        </DialogDescription>
        <hr className='-mx-6' />
        <DialogFooter>
          <div className='flex justify-around items-center gap-x-10 text-gray-600 -mb-2'>
            {!isObjectionInProgress && (
              <DialogClose asChild>
                <button className='text-sm rounded-lg text-[#D1D5DB]'>
                  cancel
                </button>
              </DialogClose>
            )}
            <Link
              href={
                isObjectionInProgress
                  ? `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmationObjectionList`
                  : `/workspace-complete/${workspaceId}`
              }
            >
              <button className='text-sm rounded-lg text-blue-500 px-4 '>
                yes
              </button>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
