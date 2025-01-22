import Image from 'next/image';

import taskRank from '@/../public/svgs/workspace/taskRank.svg';

interface workerProps {
  name: string;
  rank: number;
  contributeScore: number;
}

interface TaskRankMenbersProps {
  workers: workerProps[];
}

export default function TaskRankMenbers({ workers }: TaskRankMenbersProps) {
  return (
    <div>
      {workers?.map((worker) => (
        <div
          key={worker.rank}
          className='h-12 bg-[#F9FAFB] shadow-md rounded-lg flex items-center mb-3 relative'
        >
          <div className='ml-4'>
            <Image src={taskRank} alt='taskRank' />
            <span className='absolute left-[23px] top-4 text-xs text-[#6B7280]'>
              {worker.rank}
            </span>
          </div>
          <div className='w-full pl-4 pr-7 flex justify-between'>
            <span className='text-base text-[#7E7E7E]'>{worker.name}</span>
            <span className='text-base text-[#7E7E7E]'>
              {worker.contributeScore} P
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
