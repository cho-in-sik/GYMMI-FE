export interface IWorkoutConfirmationPageProps {
  createdAt: string;
  dayOfTheWeek: string;
  nickname: string;
  profileImageUrl: string;
  workoutConfirmationId: number;
  workoutConfirmationImageUrl: string;
  isMine: boolean;
  isObjection: boolean;
  objectionId: number;
}

export interface IWorkoutConfirmationObjectionListPageProps {
  createdAt: string;
  objectionId: number;
  targetWorkerNickname: string;
  voteCompletion: boolean;
  workoutConfirmationId: number;
}
