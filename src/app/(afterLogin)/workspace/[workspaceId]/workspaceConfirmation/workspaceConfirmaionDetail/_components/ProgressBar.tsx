import { Progress } from '@/components/ui/progress';

interface ProgressProps {
  comment: string;
}

export default function ProgressBar({ comment }: ProgressProps) {
  return (
    <div className='relative'>
      <Progress indicatorColor='bg-[#FFEDA6]' className='h-10 my-2' />
      <div className='text-sm text-[#848D99] absolute left-5 inset-y-2.5 flex justify-start '>
        {comment}
      </div>
    </div>
  );
}
