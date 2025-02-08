'use client';

import { TQueryTypes } from '@/types/workspaceHistory';
import { useSearchParams } from 'next/navigation';

export default function useUserInfoSearchParams(): TQueryTypes {
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get('userId') || '0', 10);
  const workout = searchParams.get('workout') === 'false';
  const achievementScore = parseInt(
    searchParams.get('achievementScore') || '0',
    10
  );

  return {
    userId,
    workout,
    achievementScore,
  };
}
