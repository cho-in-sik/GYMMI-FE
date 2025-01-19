import Image from 'next/image';

import noGroup from '@/../public/svgs/noGroup.svg';

interface INoDataUI {
  content: string;
}

export default function NoDataUI({ content }: INoDataUI) {
  return (
    <div className='h-full flex items-center justify-center flex-col'>
      <Image src={noGroup} alt='noGroup' className='h-[73px]' />
      <span className='text-[#4B5563] text-sm mt-5'>{content}</span>
    </div>
  );
}
