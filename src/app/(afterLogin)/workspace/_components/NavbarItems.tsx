'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavbarItemsProps {
  workspaceId: number;
  currentSegment: string;
}

function NavbarItems({ workspaceId, currentSegment }: NavbarItemsProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  useEffect(() => {
    setActiveSegment(currentSegment);
  }, [currentSegment]);

  const navItems = [
    {
      name: '그룹홈',
      path: `/workspace/${workspaceId}`,
      segments: [workspaceId, 'workspaceHistory'],
    },
    {
      name: '운동하기',
      path: `/workspace/${workspaceId}/workout`,
      segments: ['workout', 'register'],
    },
    {
      name: '그룹채팅',
      path: `/workspace/${workspaceId}/chat`,
      segments: 'chat',
    },
    {
      name: '운동인증',
      path: `/workspace/${workspaceId}/auth`,
      segments: 'auth',
    },
  ];
  return (
    <>
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
    </>
  );
}

export default NavbarItems;
