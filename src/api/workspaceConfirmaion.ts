import customAxios from '@/utils/cutstomAxios';

interface workoutConfirmationsProps {
  workspaceId: number;
  page: number;
}

interface workoutConfirmaionsDetailProps {
  workspaceId: number;
  workoutConfirmationId: number;
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

const workoutConfirmaionsDetail = async ({
  workspaceId,
  workoutConfirmationId,
}: workoutConfirmaionsDetailProps) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-confirmations/${workoutConfirmationId}`
  );
  return res;
};

export { workoutConfirmations, workoutConfirmaionsDetail };
