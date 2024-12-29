import { IWorkoutObjectionProps } from '@/types/workoutConfirmation';
import ProgressBar from '../ProgressBar';
import { Dispatch, SetStateAction } from 'react';

interface IConfirmationObjectionProgressBarsProps {
  isObjectionVote: boolean | null;
  setIsObjectionVote: Dispatch<SetStateAction<boolean | null>>;
  workoutObjection: IWorkoutObjectionProps;
}

export default function ConfirmationObjectionProgressBars({
  isObjectionVote,
  setIsObjectionVote,
  workoutObjection,
}: IConfirmationObjectionProgressBarsProps) {
  const handleVote = (isObjection: boolean) => {
    setIsObjectionVote((prev) => (prev === isObjection ? null : isObjection));
  };

  const appovalCount =
    (workoutObjection?.approvalCount / workoutObjection?.headCount) * 100;
  const rejectionCount =
    (workoutObjection?.rejectionCount / workoutObjection?.headCount) * 100;

  if (appovalCount > 100 || rejectionCount > 100) {
    appovalCount === 100 || rejectionCount === 100;
  }
  return (
    <div>
      <ProgressBar
        comment='찬성하기'
        progressValue={appovalCount}
        onClick={() => {
          if (!workoutObjection?.voteCompletion) handleVote(true);
        }}
        isObjectionVote={isObjectionVote === true}
      />
      <ProgressBar
        comment='반대하기'
        progressValue={rejectionCount}
        onClick={() => {
          if (!workoutObjection?.voteCompletion) handleVote(false);
        }}
        isObjectionVote={isObjectionVote === false}
      />
    </div>
  );
}
