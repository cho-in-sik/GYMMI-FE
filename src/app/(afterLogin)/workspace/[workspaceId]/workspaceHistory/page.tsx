'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import radius from '@/../public/svgs/workspace/workspaceHistory/radius.svg';
import radiusClicked from '@/../public/svgs/workspace/workspaceHistory/radiusClicked.svg';
import detailHistoryRadius from '@/../public/svgs/workspace/workspaceHistory/detailHistoryRadius.svg';
import arrow from '@/../public/svgs/workspace/workspaceHistory/arrow.svg';
import detailVertical from '@/../public/svgs/workspace/workspaceHistory/detailVertical.svg';
import detailVerticalIsToggled from '@/../public/svgs/workspace/workspaceHistory/detailVerticalIsToggled.svg';
import noGroup from '@/../public/svgs/noGroup.svg';

import { workspaceHistoryData } from '@/constants/queryKey';
import { cheerUpMessages } from '@/constants/cheerUpMessage';
import { historyDetails, workspaceHistorys } from '@/api/workspace';

import WorkspaceScoreBoard from './_components/WorkspaceScoreBoard';
import WorkspaceGimmiTitle from './_components/WorkspaceGimmiTitle';

import type {
  THistorys,
  TQueryTypes,
  TDetailHistorys,
  THistoryDetails,
} from '@/types/workspaceHistory';

const cheerUpMessage = cheerUpMessages;

function Page() {
  const workspaceId = useParams();
  const workspaceIdNumber = Number(workspaceId.workspaceId);

  const [workoutHistoryId, setWorkoutHistoryId] = useState<number>(0);
  const [workoutHistoryIds, setWorkoutHistoryIds] = useState<number[]>([]);

  const [randomMessage, setRandomMessage] = useState(``);
  const [queryData, setQueryData] = useState<TQueryTypes | null>(null);

  const [historyDetailMissions, setHistoryDetailMissions] = useState<
    THistoryDetails[]
  >([]);

  const [isWorkoutHistoryDetail, setIsWorkoutHistoryDetail] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = parseInt(searchParams.get('userId') || '0', 10);
    const name = searchParams.get('name');
    const workout = searchParams.get('workout') === 'false';
    const achievementScore = parseInt(
      searchParams.get('achievementScore') || '0',
      10
    );
    setQueryData({
      userId: userId,
      name: name || '',
      workout: workout,
      achievementScore: achievementScore,
    });
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cheerUpMessage.length);
    setRandomMessage(cheerUpMessage[randomIndex].message);
  }, []);

  const clickedWorkoutHistoryIds = (id: number) => {
    setWorkoutHistoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clickedWorkoutHistoryId = (id: number) => {
    setWorkoutHistoryId(id);
  };

  const toggleWorkoutHistoryDetails = () => {
    setIsWorkoutHistoryDetail(true);
  };

  const handleWorkoutHistory = (id: number) => {
    clickedWorkoutHistoryIds(id);
    clickedWorkoutHistoryId(id);
    toggleWorkoutHistoryDetails();
  };

  const { data: workspaceHistoryDatas } = useQuery({
    queryKey: [
      [
        workspaceHistoryData.workspaceHistoryData,
        workspaceIdNumber,
        queryData?.userId,
      ],
    ],
    queryFn: () => {
      if (queryData?.userId !== undefined) {
        return workspaceHistorys({
          workspaceId: workspaceIdNumber,
          userId: queryData?.userId,
        });
      }
    },
  });

  const { data: workspaceHistoryDetail } = useQuery({
    queryKey: [
      [
        workspaceHistoryData.workspaceHistoryDataDetail,
        workspaceIdNumber,
        queryData?.userId,
        workoutHistoryId,
      ],
    ],
    queryFn: () => {
      if (queryData?.userId !== undefined) {
        return historyDetails({
          workspaceId: workspaceIdNumber,
          userId: queryData?.userId,
          workoutHistoryId,
        });
      }
    },
    enabled: isWorkoutHistoryDetail,
  });

  useEffect(() => {
    if (workspaceHistoryDetail) {
      setHistoryDetailMissions((prev) => {
        const isworkDetail = prev.some(
          (mission) => mission.id === workoutHistoryId
        );

        if (!isworkDetail) {
          return [
            ...prev,
            { id: workoutHistoryId, details: workspaceHistoryDetail.data },
          ];
        }
        return prev;
      });
    }
  }, [workspaceHistoryDetail, workoutHistoryId]);
  console.log(historyDetailMissions);
  return (
    <div className='h-screen'>
      <WorkspaceGimmiTitle
        queryData={queryData}
        randomMessage={randomMessage}
      />

      <WorkspaceScoreBoard
        workspaceHistoryDatas={workspaceHistoryDatas?.data}
      />

      <div className='bg-white rounded-lg relative min-h-80 max-h-96 overflow-y-auto'>
        <div className='w-full pt-2 pb-5' defaultValue='myHistory'>
          <span className='text-[#9CA3AF] text-xs pl-5'>
            {'<개인별 운동 히스토리 목록>'}
          </span>
          {workspaceHistoryDatas?.data.workoutHistories.length === 0 ? (
            <div className='h-[230px] flex items-center justify-center flex-col'>
              <Image src={noGroup} alt='noGroup' className='h-[73px]' />
              <span className='text-[#4B5563] text-sm mt-5'>
                아직 운동 히스토리가 없습니다.
              </span>
            </div>
          ) : (
            <div className='pt-4 pl-6'>
              {workspaceHistoryDatas?.data.workoutHistories.map(
                (workspaceHistoryData: THistorys, index: number) => {
                  const isToggled = workoutHistoryIds.includes(
                    workspaceHistoryData.id
                  );
                  const isLastIndex =
                    index ===
                    workspaceHistoryDatas?.data.workoutHistories.length - 1;

                  return (
                    <div className='flex' key={workspaceHistoryData.id}>
                      <span className='text-[#9C9EA3] text-[10px]'>
                        {workspaceHistoryData.createdAt[index] ===
                        workspaceHistoryData.createdAt ? (
                          <></>
                        ) : (
                          workspaceHistoryData.createdAt.substring(5, 10)
                        )}
                      </span>
                      <div className='flex flex-col items-center px-5'>
                        <Image
                          src={isToggled ? radiusClicked : radius}
                          alt={isToggled ? 'radiusClicked' : 'radius'}
                        />
                        {isLastIndex ? (
                          <></>
                        ) : (
                          <div>
                            {isToggled ? (
                              <Image
                                src={detailVerticalIsToggled}
                                alt='detailVerticalIsToggled'
                              />
                            ) : (
                              <Image
                                src={detailVertical}
                                alt='detailVertical'
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <div
                          onClick={() => {
                            handleWorkoutHistory(workspaceHistoryData.id);
                          }}
                        >
                          <span
                            className={`text-base flex -mt-1 ${
                              isToggled ? 'text-[#4B5563]' : 'text-[#6B7280]'
                            }`}
                          >
                            {workspaceHistoryData.sumOfScore}점 운동 기록
                            {isToggled ? (
                              <></>
                            ) : (
                              <Image
                                src={arrow}
                                alt='arrow'
                                className='w-[4px] ml-2'
                              />
                            )}
                          </span>
                        </div>
                        {workspaceHistoryData.isApproved ? (
                          <span className='text-xs text-[#6B7280]'>
                            인증 완료
                          </span>
                        ) : (
                          <span className='text-xs text-[#F87171]'>
                            인증 거부
                          </span>
                        )}
                        {isToggled && (
                          <div className='w-40 min-h-[85px] bg-[#FDFDFD] drop-shadow-md rounded-lg mt-2 pt-1 pb-2'>
                            {historyDetailMissions[index]?.details ? (
                              historyDetailMissions[index]?.details.map(
                                (historyDetail: TDetailHistorys) => {
                                  return (
                                    <div
                                      className='h-5 flex items-center'
                                      key={historyDetail.id}
                                    >
                                      <Image
                                        className='mx-2'
                                        src={detailHistoryRadius}
                                        alt='detailRadius'
                                      />
                                      <div>
                                        <span className='text-[#4B5563] text-xs'>
                                          {historyDetail.mission}{' '}
                                          {historyDetail.count} 회 -{' '}
                                          {historyDetail.totalScore}p
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <p className='text-[10px] text-center'>
                                데이터를 불러오는 중입니다.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Page;
