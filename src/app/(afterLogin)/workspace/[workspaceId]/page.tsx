'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import good from '@/../public/svgs/good.svg';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

import { Progress } from '@/components/ui/progress';
import WorkspaceTitle from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceTitle';
import WorkspaceGimmi from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceGimmi';
import ScrollTop from './workspaceConfirmation/_components/ScrollTop';
import WorkspaceCompleteModal from './_components/WorkspaceCompleteModal';
import WorkspaceUser from './_components/WorkspaceUser';

import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import { useWorkSpaceStatus } from '@/hooks/useWorkSpaceStatus';
import { useWorkspaceInfoWork } from '@/hooks/workspace/react-query/useWorkspace';
import { useAchievementScore } from '@/hooks/workspace/useAchievementScore';
import { useHandleLeave, useHandleStart } from '@/hooks/workspace/useHandle';
import WorkspaceIsCreatorButton from './_components/WorkspaceIsCreatorButton';

export default function Page() {
  const [workout, setWorkout] = useState(false);

  const workspaceId = useWorkoutIdFromParams();

  const { infoWork, isSuccess } = useWorkspaceInfoWork({
    workspaceId,
    workout,
  });
  const achievementScore = infoWork?.data.achievementScore;
  const goalScore = infoWork?.data.goalScore;

  const achievementTotalScore = useAchievementScore({
    achievementScore,
    goalScore,
  });

  const { updateStatus, clearData } = useWorkSpaceStatus();

  const handleStart = useHandleStart(workspaceId);

  const handleLeave = useHandleLeave(workspaceId);

  useEffect(() => {
    if (isSuccess && infoWork?.data.status) {
      updateStatus(infoWork?.data?.status);
    } else {
      clearData();
    }
  }, [infoWork, isSuccess, updateStatus, clearData]);

  return (
    <div className='h-screen'>
      <ScrollTop />
      <WorkspaceCompleteModal
        workspaceId={workspaceId}
        status={infoWork?.data.status}
        isObjectionInProgress={infoWork?.data.isObjectionInProgress}
      />

      <div className='mb-14'>
        <WorkspaceTitle name={infoWork?.data.name} workout={workout} />
        <div className={`flex justify-center items-end gap-x-6 h-48 mb-4 `}>
          <WorkspaceGimmi
            workout={workout}
            achievementScore={achievementTotalScore}
          />
        </div>
        {/* 회원 클릭 전 */}
        <div>
          <div className='flex flex-col mb-5'>
            <div className='text-[10px] text-[#4B5563] mb-3.5'>목표 달성률</div>
            <Progress
              indicatorColor='bg-main'
              className='h-1.5 bg-[#ffff] mb-1'
              value={achievementTotalScore}
            />
            <div className='text-[10px] text-[#4B5563] text-right'>{`${infoWork?.data.achievementScore}/${infoWork?.data.goalScore}점`}</div>
          </div>
          <div className='flex items-center mb-2'>
            <Image src={good} alt='good' className='w-5 h-5 mr-1.5' />
            <span className='text-xs text-[#4B5563]'>획득 점수</span>
          </div>

          {/* 여기에 유저들 매핑해주기 */}
          <WorkspaceUser
            infoWorkUser={infoWork?.data.workers}
            setWorkout={setWorkout}
            workout={workout}
            achievementScore={achievementTotalScore}
          />
        </div>
      </div>
      {/* 조건으로 유저 닉네임과 방장 같으면 뭐시기 넣어주기 */}
      {infoWork?.data.status === 'PREPARING' &&
        infoWork?.data.isCreator === true && (
          <div className='px-4 fixed bottom-11 left-0 w-full flex justify-between items-center'>
            <div
              className={`${
                infoWork?.data.workers.length === 1 && 'opacity-40'
              }`}
            >
              <WorkspaceIsCreatorButton
                workerLength={infoWork?.data.workers.length}
                buttonStyle={'bg-main text-white'}
                onClickFn={() => handleStart()}
                buttonName={'그룹 시작하기'}
              />
            </div>

            <div
              className={`${infoWork?.data.workers.length > 1 && 'opacity-60'}`}
            >
              <WorkspaceIsCreatorButton
                workerLength={infoWork?.data.workers.length}
                buttonStyle={'bg-[#ffffff] text-main'}
                onClickFn={() => handleLeave()}
                buttonName={'그룹 없애기'}
              />
            </div>
          </div>
        )}

      <Dialog>
        <DialogTrigger asChild>
          {infoWork?.data.status === 'PREPARING' &&
            infoWork?.data.isCreator === false && (
              <div className='w-full px-4 fixed bottom-11 left-0'>
                <button className='w-full py-3.5 bg-main text-white text-base rounded-lg'>
                  그룹 나가기
                </button>
              </div>
            )}
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className='w-9/12 h-36 rounded-lg'>
          <DialogDescription className='flex items-end justify-center my-4'>
            <span className='text-[#1F2937] text-sm'>
              그룹을 나가시겠습니까?
            </span>
          </DialogDescription>

          <div className='flex justify-around items-center border-t-[1px] -mx-6 pt-3.5'>
            <DialogClose asChild>
              <button className='text-sm rounded-lg text-main'>cancel</button>
            </DialogClose>
            <span
              className='text-sm rounded-lg text-[#D1D5DB]'
              onClick={() => handleLeave()}
            >
              yes
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
