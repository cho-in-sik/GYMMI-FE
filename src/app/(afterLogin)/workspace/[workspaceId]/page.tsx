'use client';

import noImage from '@/../public/images/deafultProfile.png';

import good from '@/../public/svgs/good.svg';
import creator from '@/../public/svgs/creator.svg';

import { Progress } from '@/components/ui/progress';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { infoWorkspace, leaveWorkspace, startWorkspace } from '@/api/workspace';
import { workspace } from '@/constants/queryKey';
import { imageLoader } from '@/utils/image';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import WorkspaceTitle from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceTitle';
import WorkspaceGimmi from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceGimmi';

type THistoryType = {
  workspaceId: number;
  userId: number | null;
  name: string;
  workout: boolean;
  achievementScore: number;
};

export default function Page() {
  const { workspaceId } = useParams();
  const workspaceIdNumber = Number(workspaceId);

  const router = useRouter();

  const [workout, setWorkout] = useState(false);

  const { data: infoWork } = useQuery({
    queryKey: [workspace.info, workspaceIdNumber, workout],
    queryFn: () => infoWorkspace(workspaceIdNumber),
  });

  const [isOpen, setIsOpen] = useState(false);

  let achievementScore =
    (infoWork?.data.achievementScore / infoWork?.data.goalScore) * 100;

  if (achievementScore > 100) {
    achievementScore = 100;
  }

  useEffect(() => {
    if (infoWork?.data.status === 'COMPLETED') {
      setIsOpen(true);
    }
  }, [infoWork]);

  const handleModalChange = (open: any) => {
    setIsOpen(open);
  };

  const handleUserId = (user: { userId: number; isMyself: boolean }) => {
    clickPageMove({
      workspaceId: workspaceIdNumber,
      userId: user.userId,
      name: infoWork?.data.name,
      workout,
      achievementScore,
    });
  };

  const handleStart = async () => {
    try {
      const res = await startWorkspace(workspaceIdNumber);
      console.log(res);
      if (res.status === 200) {
        window.location.replace(`/workspace/${workspaceIdNumber}`);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  const handleLeave = async () => {
    try {
      const res = await leaveWorkspace(workspaceIdNumber);
      console.log(res);
      if (res.status === 200) {
        router.push('/workspace-list/mygroup');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickPageMove = ({
    workspaceId,
    userId,
    name,
    workout,
    achievementScore,
  }: THistoryType) => {
    const queryString = `?userId=${userId}&name=${name}&workout=${workout}&achievementScore=${achievementScore}`;
    router.push(`/workspace/${workspaceId}/workspaceHistory${queryString}`);
  };

  return (
    <div className='h-screen'>
      <Dialog open={isOpen} onOpenChange={handleModalChange}>
        <DialogContent className='w-4/6 rounded-lg'>
          <DialogDescription>
            <div className='mb-4 text-center text-black'>
              워크스페이스 목표를 모두 달성했어요! <br /> 테스크를 확인하러
              갈까요?
            </div>
          </DialogDescription>
          <DialogFooter className='border-t-[1px]'>
            <div className='pt-4 flex justify-between text-gray-600'>
              <DialogClose asChild>
                <div className='text-sm rounded-lg text-[#D1D5DB] px-4 '>
                  cancel
                </div>
              </DialogClose>
              <Link href={`/workspace-complete/${workspaceIdNumber}`}>
                <div className='text-sm rounded-lg text-blue-500 px-4 '>
                  yes
                </div>
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <div className='overflow-auto'>
            {infoWork?.data.workers.map((user: any) => {
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
                      user.isMyself ? 'bg-[#C8F68B]' : 'bg-[#DBEAFE] '
                    } rounded-xl flex items-center justify-between px-3.5`}
                  >
                    <div className='h-8 w-8 rounded-full bg-white mr-3.5 flex items-center justify-center relative'>
                      {user.isCreator && (
                        <Image
                          src={creator}
                          alt='creator'
                          className='absolute -top-1 -left-1 z-10'
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
                className={`w-40 py-2.5 bg-main text-white text-base rounded-lg ${
                  infoWork?.data.workers.length === 1 && 'opacity-30'
                }`}
                onClick={handleStart}
              >
                그룹 시작하기
              </button>
            </div>
            <div>
              <button
                disabled={infoWork?.data.workers.length > 1 ? true : false}
                className={`w-40 py-2.5 text-main text-base rounded-lg ${
                  infoWork?.data.workers.length > 1
                    ? 'bg-custom-blue'
                    : 'bg-white'
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
              <div className='px-7 fixed bottom-11 left-0 w-full'>
                <button className='w-full py-3.5 bg-main text-white text-base rounded-lg'>
                  그룹 나가기
                </button>
              </div>
            )}
        </DialogTrigger>
        <DialogContent className='w-4/6 rounded-lg h-[138px]'>
          <DialogDescription className='flex items-center justify-center -mb-6'>
            <span className='text-[#1F2937]'>그룹을 나가시겠습니까?</span>
          </DialogDescription>
          <DialogFooter>
            <div className='w-full flex items-center justify-between text-sm font-light'>
              <DialogClose asChild>
                <span className='text-sm bg-main py-1 px-7 rounded-lg text-white'>
                  cancel
                </span>
              </DialogClose>
              <span
                className='text-sm bg-[#EFF6FF] py-1 px-10 rounded-lg text-main'
                onClick={handleLeave}
              >
                yes
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
