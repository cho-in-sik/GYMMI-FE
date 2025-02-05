'use client';

import { useRouter } from 'next/navigation';

import { leaveWorkspace, startWorkspace } from '@/api/workspace';

export const useHandleStart = (workspaceId: number) => {
  return async () => {
    try {
      const res = await startWorkspace(workspaceId);

      if (res.status === 200) {
        window.location.replace(`/workspace/${workspaceId}`);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
};

export const useHandleLeave = (workspaceId: number) => {
  const router = useRouter();
  return async () => {
    try {
      const res = await leaveWorkspace(workspaceId);

      if (res.status === 200) {
        router.push('/workspace-list/mygroup');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
