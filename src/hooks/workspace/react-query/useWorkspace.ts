import { useQuery } from '@tanstack/react-query';

import { infoWorkspace } from '@/api/workspace';
import { workspace } from '@/constants/queryKey';

interface IUseWorkspaceInfoWorkProps {
  workspaceId: number;
  workout: boolean;
}

export const useWorkspaceInfoWork = ({
  workspaceId,
  workout,
}: IUseWorkspaceInfoWorkProps) => {
  const { data: infoWork, isSuccess } = useQuery({
    queryKey: [workspace.info, workspaceId, workout],
    queryFn: () => infoWorkspace(workspaceId),
  });
  return { infoWork, isSuccess };
};
