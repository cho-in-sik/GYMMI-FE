'use client';

import good from '@/../public/svgs/good.svg';

import { Progress } from '@/components/ui/progress';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

import { infoWorkspace, leaveWorkspace, startWorkspace } from '@/api/workspace';
import { workspace } from '@/constants/queryKey';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import WorkspaceTitle from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceTitle';
import WorkspaceGimmi from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceGimmi';
import ScrollTop from './workspaceConfirmation/_components/ScrollTop';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import WorkspaceCompleteModal from './_components/WorkspaceCompleteModal';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useWorkSpaceStatus } from '@/hooks/useWorkSpaceStatus';
import WorkspaceUser from './_components/WorkspaceUser';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const { updateStatus, clearData } = useWorkSpaceStatus();

  const router = useRouter();

  const [workout, setWorkout] = useState(false);

  const { data: infoWork, isSuccess } = useQuery({
    queryKey: [workspace.info, workspaceId, workout],
    queryFn: () => infoWorkspace(workspaceId),
  });

  let achievementScore =
    (infoWork?.data.achievementScore / infoWork?.data.goalScore) * 100;

  if (achievementScore > 100) {
    achievementScore = 100;
  }

  const handleStart = async () => {
    try {
      const res = await startWorkspace(workspaceId);

      if (res.status === 200) {
        window.location.replace(`/workspace/${workspaceId}`);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  const handleLeave = async () => {
    try {
      const res = await leaveWorkspace(workspaceId);

      if (res.status === 200) {
        router.push('/workspace-list/mygroup');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            achievementScore={achievementScore}
          />
        </div>
        {/* 회원 클릭 전 */}
        <div>
          <div className='flex flex-col mb-5'>
            <div className='text-[10px] text-[#4B5563] mb-3.5'>목표 달성률</div>
            <Progress
              indicatorColor='bg-main'
              className='h-1.5 bg-[#ffff] mb-1'
              value={achievementScore}
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
            achievementScore={achievementScore}
          />
        </div>
      </div>
      {/* 조건으로 유저 닉네임과 방장 같으면 뭐시기 넣어주기 */}
      {infoWork?.data.status === 'PREPARING' &&
        infoWork?.data.isCreator === true && (
          <div className='px-4 fixed bottom-11 left-0 w-full flex justify-between items-center'>
            <div>
              <button
                // opacity & disabled
                disabled={infoWork?.data.workers.length === 1 ? true : false}
                className={`w-[171px] py-2.5 bg-main text-white text-base rounded-lg ${
                  infoWork?.data.workers.length === 1 && 'opacity-40'
                }`}
                onClick={handleStart}
              >
                그룹 시작하기
              </button>
            </div>
            <div>
              <button
                disabled={infoWork?.data.workers.length > 1 ? true : false}
                className={`w-[171px] py-2.5 bg-[#ffffff] text-main text-base rounded-lg ${
                  infoWork?.data.workers.length > 1 && 'opacity-60'
                }`}
                onClick={handleLeave}
              >
                그룹 없애기
              </button>
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
              onClick={handleLeave}
            >
              yes
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
