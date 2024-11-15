'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import settings from '@/../public/svgs/workspace/settings.svg';
import BackArrow from '../_components/BackArrow';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const workspaceId = useSelectedLayoutSegment();
  const workspaceIdNumber = Number(workspaceId);

  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const pathName = usePathname();
  const segments = pathName.split('/');
  const currentSegment = segments[segments.length - 1];

  useEffect(() => {
    setActiveSegment(currentSegment);
  }, [currentSegment]);

  const navItems = [
    {
      name: '그룹홈',
      path: `/workspace/${workspaceIdNumber}`,
      segments: [workspaceId, 'workspaceHistory'],
    },
    {
      name: '운동하기',
      path: `/workspace/${workspaceIdNumber}/workout`,
      segments: ['workout', 'register'],
    },
    {
      name: '그룹채팅',
      path: `/workspace/${workspaceIdNumber}/chat`,
      segments: 'chat',
    },
    {
      name: '운동인증',
      path: `/workspace/${workspaceIdNumber}/auth`,
      segments: 'auth',
    },
  ];

  return (
    <div className='h-full'>
      <div className='px-4 pt-12'>
        <div className='flex justify-between'>
          <BackArrow />
          <Link href={`/workspaceDetail/${workspaceIdNumber}`}>
            <div>
              <Image className='w-6 h-6' src={settings} alt='settings' />
            </div>
          </Link>
        </div>
        <nav className='my-3'>
          <hr className='border-1 border-[#E5E7EB] w-screen -mx-4' />
          <ul className='flex text-sm gap-x-11 sm:gap-x-8 lg:gap-x-12 justify-center my-2.5 text-[#E5E7EB]'>
            {navItems.map((navItem) => (
              <Link href={navItem.path} key={navItem.name}>
                <li
                  className={`${
                    navItem.segments &&
                    activeSegment !== null &&
                    navItem.segments.includes(activeSegment)
                      ? 'text-[#4B5563]'
                      : navItem.segments === activeSegment
                      ? 'text-[#4B5563]'
                      : 'text-[#E5E7EB]'
                  }`}
                >
                  {navItem.name}
                </li>
              </Link>
            ))}
          </ul>
          <hr className='border-1 border-[#E5E7EB] w-screen -mx-4' />
        </nav>
      </div>
      <div className='px-4 bg-custom-gradient2'>{children}</div>
    </div>
  );
}
