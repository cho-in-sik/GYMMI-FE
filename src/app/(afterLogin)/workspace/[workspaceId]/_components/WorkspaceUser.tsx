import Image from 'next/image';
import { IWorker, THistoryType } from '@/types/workSpace';
import { imageLoader } from '@/utils/image';
import creator from '@/../public/svgs/creator.svg';
import noImage from '@/../public/images/deafultProfile.png';
import { useRouter } from 'next/navigation';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { Dispatch, SetStateAction } from 'react';

interface IWorkspaceUserProps {
  infoWorkUser: IWorker[];
  setWorkout: Dispatch<SetStateAction<boolean>>;
  workout: boolean;
  achievementScore: number;
}

export default function WorkspaceUser({
  infoWorkUser,
  setWorkout,
  workout,
  achievementScore,
}: IWorkspaceUserProps) {
  const router = useRouter();
  const workspaceId = useWorkoutIdFromParams();

  const handleUserId = (user: { userId: number; isMyself: boolean }) => {
    clickPageMove({
      workspaceId: workspaceId,
      userId: user.userId,
      workout,
      achievementScore,
    });
  };

  const clickPageMove = ({
    workspaceId,
    userId,
    workout,
    achievementScore,
  }: THistoryType) => {
    const queryString = `?userId=${userId}&workout=${workout}&achievementScore=${achievementScore}`;
    router.push(`/workspace/${workspaceId}/workspaceHistory${queryString}`);
  };

  return (
    <div className='overflow-auto'>
      {infoWorkUser?.map((user: IWorker) => {
        return (
          <div
            className='mb-4 text-[#4B5563]'
            key={user.id}
            onClick={() => {
              setWorkout(true);

              handleUserId({
                userId: user.id,
                isMyself: user.isMyself,
              });
            }}
          >
            <div
              className={`w-full h-16 ${
                user.isMyself ? 'bg-[#C8F68B]' : 'bg-[#FFFFFF] '
              } rounded-xl flex items-center justify-between px-3.5`}
            >
              <div className='h-8 w-8 rounded-full bg-white mr-3.5 flex items-center justify-center relative'>
                {user.isCreator && (
                  <Image
                    src={creator}
                    alt='creator'
                    className='absolute -top-1 -left-1 z-[1]'
                  />
                )}
                {user.profileImage === 'default.png' ? (
                  <Image src={noImage} alt='no-image' />
                ) : (
                  <Image
                    className='rounded-full'
                    src={user.profileImage}
                    alt='profil-image'
                    layout='fill'
                    loader={() => imageLoader(user.profileImage)}
                  />
                )}
              </div>
              <div className='flex-1'>{user.name}</div>
              <div>{`${user.contributeScore} P`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
