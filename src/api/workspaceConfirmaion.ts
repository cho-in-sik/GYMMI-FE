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

interface IworkoutObjectionsProps {
  workspaceId: number;
  objectionId: number;
}

interface IworkoutOnjectionsVoteProps extends IworkoutObjectionsProps {
  objectionVote: boolean | null;
}

interface IworkoutConfirmationObjectionListProps
  extends IworkoutConfirmationsProps {
  status: string;
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

const workoutObjections = async ({
  workspaceId,
  objectionId,
}: IworkoutObjectionsProps) => {
  const res = await customAxios.get(
    `/workspaces/${workspaceId}/objections/${objectionId}`
  );
  return res;
};

const workoutObjectionsVote = async ({
  workspaceId,
  objectionId,
  objectionVote,
}: IworkoutOnjectionsVoteProps) => {
  const res = await customAxios.post(
    `/workspaces/${workspaceId}/objections/${objectionId}`,
    { willApprove: objectionVote }
  );
  return res;
};

const workoutConfirmationObjectionLists = async ({
  workspaceId,
  page,
  status,
}: IworkoutConfirmationObjectionListProps) => {
  const res = customAxios.get(
    `/workspaces/${workspaceId}/objections?pageNumber=${page}&status=${status}`
  );
  return res;
};

export {
  workoutConfirmations,
  workoutConfirmaionsDetail,
  workoutObjectionReason,
  workoutObjections,
  workoutObjectionsVote,
  workoutConfirmationObjectionLists,
};
