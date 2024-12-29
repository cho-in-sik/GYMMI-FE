'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollTop() {
  const pathName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;
}
