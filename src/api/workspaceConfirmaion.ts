import customAxios from '@/utils/cutstomAxios';

interface IworkoutConfirmationsProps {
  workspaceId: number;
  page: number;
}

interface IworkoutConfirmaionsDetailProps {
  workspaceId: number;
  workoutConfirmationId: number;
}

interface IworkoutObjectionReasonProps extends IworkoutConfirmaionsDetailProps {
  objectionReason: string;
}

const workoutConfirmations = async ({
  workspaceId,
  page,
}: IworkoutConfirmationsProps) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-confirmations?pageNumber=${page}`
  );
  return res;
};

const workoutConfirmaionsDetail = async ({
  workspaceId,
  workoutConfirmationId,
}: IworkoutConfirmaionsDetailProps) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/workout-confirmations/${workoutConfirmationId}`
  );
  return res;
};

const workoutObjectionReason = async ({
  workspaceId,
  workoutConfirmationId,
  objectionReason,
}: IworkoutObjectionReasonProps) => {
  const res = await customAxios.post(
    `/workspaces/${workspaceId}/workout-confirmations/${workoutConfirmationId}`,
    { reason: objectionReason }
  );
  return res;
};

export {
  workoutConfirmations,
  workoutConfirmaionsDetail,
  workoutObjectionReason,
};
