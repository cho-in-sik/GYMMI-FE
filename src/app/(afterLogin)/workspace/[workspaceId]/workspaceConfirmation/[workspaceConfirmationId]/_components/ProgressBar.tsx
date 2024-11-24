import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import voteChecked from '@/../public/svgs/workspace/workspaceConfirmaion/voteChecked.svg';

interface ProgressProps {
  comment: string;
}

export default function ProgressBar({ comment }: ProgressProps) {
  return (
    <div className='relative'>
      <Progress indicatorColor='bg-[#FFEDA6]' className='h-10 my-2' />
      <div className='text-sm text-[#848D99] absolute left-5 inset-y-2.5 flex justify-start gap-x-56'>
        {comment}
        <Image src={voteChecked} alt='voteChecked' />
      </div>
    </div>
  );
}
