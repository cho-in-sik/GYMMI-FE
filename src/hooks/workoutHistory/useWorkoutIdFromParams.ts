import { useParams } from 'next/navigation';

export default function useWorkoutIdFromParams() {
  const workspaceId = useParams();

  return Number(workspaceId.workspaceId);
}
