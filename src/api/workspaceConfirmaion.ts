import customAxios from '@/utils/cutstomAxios';

interface workoutConfirmationsProps {
  workspaceId: number;
  page: number;
}

const workoutConfirmations = async ({
  workspaceId,
  page,
}: workoutConfirmationsProps) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-confirmations?pageNumber=${page}`
  );
  return res;
};

export { workoutConfirmations };
