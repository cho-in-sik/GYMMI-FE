import Image from 'next/image';

import completeTask from '@/../public/images/completeTask.png';

interface TaskContentProps {
  task: string;
}

export default function TaskContent({ task }: TaskContentProps) {
  return (
    <div className='w-full bg-[#FFFFFF] rounded-2xl mt-7 flex'>
      <div className='min-h-24 h-full  flex flex-col pt-3 pb-4 pl-6 justify-center'>
        <span className='pt-2 pb-1 text-sm text-[#4B5563]'>그룹 테스크</span>
        <div className='w-52 h-full flex items-center'>
          <span className='text-2xl text-[#EF4444] font-bold'>{task}</span>
        </div>
      </div>
      <div className='absolute right-2 top-[70px]'>
        <Image src={completeTask} alt='completeTask' className='w-56 h-56' />
      </div>
    </div>
  );
}
