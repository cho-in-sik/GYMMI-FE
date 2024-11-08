'use client';

import radius from '@/../public/svgs/workspace/workspaceHistory/radius.svg';
import radiusClicked from '@/../public/svgs/workspace/workspaceHistory/radiusClicked.svg';
import detailHistoryRadius from '@/../public/svgs/workspace/workspaceHistory/detailHistoryRadius.svg';
import arrow from '@/../public/svgs/workspace/workspaceHistory/arrow.svg';
import verticalLine from '@/../public/svgs/workspace/verticalLine.svg';
import detailVertical from '@/../public/svgs/workspace/workspaceHistory/detailVertical.svg';
import detailVerticalIsToggled from '@/../public/svgs/workspace/workspaceHistory/detailVerticalIsToggled.svg';
import noGroup from '@/../public/svgs/noGroup.svg';

import speechBubble1 from '@/../public/svgs/workspace/speechBubble/speechBubble1.svg';
import speechBubble2 from '@/../public/svgs/workspace/speechBubble/speechBubble2.svg';
import speechBubble3 from '@/../public/svgs/workspace/speechBubble/speechBubble3.svg';

import { workspaceHistoryData } from '@/constants/queryKey';
import { historyDetails, workspaceHistorys } from '@/api/workspace';

import { Tabs } from '@/components/ui/tabs';
import WorkspaceTitle from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceTitle';
import WorkspaceGimmi from '@/app/(afterLogin)/workspace/[workspaceId]/_components/WorkspaceGimmi';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type TScoreData = {
  id: number;
  label: string;
  value: number | string;
};

type THistorys = {
  id: number;
  isApproved: string;
  createdAt: string;
  sumOfScore: number;
};

const bubbleMessage = [
  {
    message: `곧 있으면
    다음 레벨이야!!
    화이팅하자구 1`,
  },
  {
    message: `곧 있으면
    다음 레벨이야!!
    화이팅하자구 2`,
  },
  {
    message: `곧 있으면
    다음 레벨이야!!
    화이팅하자구 3`,
  },
  {
    message: `곧 있으면
    다음 레벨이야!!
    화이팅하자구 4`,
  },
  {
    message: `곧 있으면
    다음 레벨이야!!
    화이팅하자구 5`,
  },
];

interface IQueryTypes {
  userId: number;
  name: string;
  workout: boolean;
  achievementScore: number;
}

type TDetailHistorys = {
  count: number;
  id: number;
  mission: string;
  totalScore: number;
};

type THistoryDetails = {
  id: number;
  details: TDetailHistorys[];
};

function Page() {
  const workspaceId = useParams();
  const workspaceIdNumber = Number(workspaceId.workspaceId);

  const [workoutHistory, setWorkoutHistory] = useState<number[]>([]);
  const [workoutHistoryId, setWorkoutHistoryId] = useState<number>(0);
  const [randomMessage, setRandomMessage] = useState(``);
  const [queryData, setQueryData] = useState<IQueryTypes | null>(null);

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
    const randomIndex = Math.floor(Math.random() * bubbleMessage.length);
    setRandomMessage(bubbleMessage[randomIndex].message);
  }, []);

  const handleWorkoutHistory = (id: number) => {
    setWorkoutHistory((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setWorkoutHistoryId(id);

    setIsWorkoutHistoryDetail(true);
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

  const scoreDatas = [
    {
      id: 1,
      label: '일일 최고 운동점수',
      value: `${workspaceHistoryDatas?.data.totalContributedScore}`,
    },
    {
      id: 2,
      label: '누적 운동 기록 횟수',
      value: workspaceHistoryDatas?.data.bestDailyScore,
    },
    {
      id: 3,
      label: '1등과의 격차',
      value: workspaceHistoryDatas?.data.gabScoreFromFirst,
    },
  ];

  const { data: workspaceHistoryDetail } = useQuery({
    queryKey: [
      [
        workspaceHistoryData.workspaceHistoryDataDetail,
        workspaceIdNumber,
        queryData?.userId,
        workoutHistory,
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
      workoutHistory.forEach((id) => {
        if (!historyDetailMissions.some((mission) => mission.id === id)) {
          setHistoryDetailMissions((prev) => [
            ...prev,
            { id, details: workspaceHistoryDetail.data },
          ]);
        }
      });
    }
  }, [workspaceHistoryDetail, workoutHistory, historyDetailMissions]);

  const matchingHistory = historyDetailMissions.find(
    (mission) => mission.id === workoutHistoryId
  );

  return (
    <div className='h-screen'>
      {queryData && (
        <>
          <WorkspaceTitle name={queryData.name} workout={queryData.workout} />
          <div className='flex justify-center items-end gap-x-6 h-48 mb-5'>
            <WorkspaceGimmi
              workout={queryData.workout}
              achievementScore={queryData.achievementScore}
            />
            <div className='pb-28 relative'>
              <span className='text-[#4B5563] text-[10px] absolute top-5 right-5 left-6'>
                {randomMessage}
              </span>
              <Image src={speechBubble3} alt='speechBubble3' />
              <Image
                className='ml-3 my-2'
                src={speechBubble2}
                alt='speechBubble2'
              />
              <Image src={speechBubble1} alt='speechBubble1' />
            </div>
          </div>
        </>
      )}
      <div className='h-14 bg-white rounded-lg mb-4'>
        <Tabs className='w-full' defaultValue='totalScore'>
          {!workspaceHistoryDatas ? (
            <div className='h-[50px] flex justify-center items-center'>
              <p className='text-[#4B5563] text-sm'>점수 데이터가 없습니다.</p>
            </div>
          ) : (
            <div className='flex gap-x-4 pl-7 pt-2 justify-items-center'>
              <div className='flex flex-col items-center'>
                <span className='text-[#9C9EA3] text-[10px]'>총 점수</span>
                <span className='text-[#1F2937] text-base'>
                  {workspaceHistoryDatas?.data.totalContributedScore}점
                </span>
              </div>
              <Image src={verticalLine} alt='verticalLine' />
              {scoreDatas.map((scoreData: TScoreData) => {
                return (
                  <div
                    className='flex flex-col items-center justify-center'
                    key={scoreData.id}
                  >
                    <span className='text-[#9C9EA3] text-[10px]'>
                      {scoreData.label}
                    </span>
                    <span className='text-[#1F2937] text-sm pt-1'>
                      {scoreData.value}점
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Tabs>
      </div>
      <div className='bg-white rounded-lg relative min-h-80 max-h-96 overflow-y-auto'>
        <Tabs className='w-full pt-2 pb-5' defaultValue='myHistory'>
          <span className='text-[#9CA3AF] text-xs pl-5'>
            {'<개인별 운동 히스토리 목록>'}
          </span>
          {!workspaceHistoryDatas ? (
            <div className='h-[230px] flex items-center justify-center flex-col'>
              <Image src={noGroup} alt='noGroup' className='h-[73px]' />
              <span className='text-[#4B5563] text-sm mt-5'>
                아직 운동 히스토리가 없습니다.
              </span>
            </div>
          ) : (
            <div className='pt-4 pl-8'>
              {workspaceHistoryDatas?.data.workoutHistories.map(
                (workspaceHistoryData: THistorys, index: number) => {
                  const isToggled = workoutHistory.includes(
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
                      <div className='flex flex-col items-center px-3'>
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
                            {matchingHistory?.details.map(
                              (dataHistory: TDetailHistorys) => (
                                <div
                                  className='h-5 flex items-center'
                                  key={dataHistory.id}
                                >
                                  <Image
                                    className='mx-2'
                                    src={detailHistoryRadius}
                                    alt='detailRadius'
                                  />
                                  <div>
                                    <span className='text-[#4B5563] text-xs'>
                                      {dataHistory.mission} {dataHistory.count}{' '}
                                      회 - {dataHistory.totalScore}p
                                    </span>
                                  </div>
                                </div>
                              )
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
        </Tabs>
      </div>
    </div>
  );
}
export default Page;
