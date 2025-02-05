import { leaveWorkspace, startWorkspace } from '@/api/workspace';
import { redirect } from 'next/navigation';

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
  return async () => {
    try {
      const res = await leaveWorkspace(workspaceId);

      if (res.status === 200) {
        redirect('/workspace-list/mygroup');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
