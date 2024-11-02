"use client";

import speechBubble1 from "@/../public/svgs/workspace/speechBubble/speechBubble1.svg";
import speechBubble2 from "@/../public/svgs/workspace/speechBubble/speechBubble2.svg";
import speechBubble3 from "@/../public/svgs/workspace/speechBubble/speechBubble3.svg";
import verticalLine from "@/../public/svgs/workspace/verticalLine.svg";

import mainLogo0 from "@/../public/svgs/mainLogo0.svg";
import mainLogo25 from "@/../public/svgs/mainLogo25.svg";
import mainLogo50 from "@/../public/svgs/mainLogo50.svg";
import mainLogo75 from "@/../public/svgs/mainLogo75.svg";

import radius from "@/../public/svgs/workspace/workspaceHistory/radius.svg";
import radiusClicked from "@/../public/svgs/workspace/workspaceHistory/radiusClicked.svg";
import detailHistoryRadius from "@/../public/svgs/workspace/workspaceHistory/detailHistoryRadius.svg";
import arrow from "@/../public/svgs/workspace/workspaceHistory/arrow.svg";

import noImage from "@/../public/images/deafultProfile.png";

import good from "@/../public/svgs/good.svg";
import creator from "@/../public/svgs/creator.svg";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { infoWorkspace, leaveWorkspace, startWorkspace } from "@/api/workspace";
import { useQuery } from "@tanstack/react-query";
import { workspace } from "@/constants/queryKey";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import { imageLoader } from "@/utils/image";

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

type TDetailHistorys = {
  id: number;
  mission: string;
  count: number;
  totalScore: number;
};

const mockDatas = {
  totalContributedScore: 200,
  bestDailyScore: 100,
  totalWorkoutCount: 12,
  scoreGapFromFirst: 40,
  workoutHistories: [
    {
      id: 1, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 2, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 3, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 4, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 5, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 6, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
    {
      id: 7, //
      isApproved: "true",
      createdAt: "2024-05-06",
      sumOfScore: 100,
    },
  ],
};

// 히스토리 정보 가져오면 여기서 점수들 정보를 배열로 저장
const scoreDatas = [
  {
    id: 1,
    label: "일일 최고 운동점수",
    value: `${mockDatas.totalContributedScore}`,
  },
  { id: 2, label: "누적 운동 기록 횟수", value: mockDatas.bestDailyScore },
  { id: 3, label: "1등과의 격차", value: mockDatas.scoreGapFromFirst },
];

const mockDataHistorys = [
  {
    id: 1,
    mission: "데드리프트",
    count: 7,
    totalScore: 100,
  },
  {
    id: 2,
    mission: "데드리프트",
    count: 7,
    totalScore: 100,
  },
  {
    id: 3,
    mission: "데드리프트",
    count: 7,
    totalScore: 100,
  },
  {
    id: 4,
    mission: "데드리프트",
    count: 7,
    totalScore: 100,
  },
];

// 응원 메세지 저장
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

export default function Page() {
  const { workspaceId } = useParams();
  const router = useRouter();

  const [randomMessage, setRandomMessage] = useState(``);

  const [workout, setWorkout] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: [workspace.info, workspaceId, workout],
    queryFn: () => infoWorkspace(Number(workspaceId)),
  });

  const [isOpen, setIsOpen] = useState(false);

  let percent = (data?.data.achievementScore / data?.data.goalScore) * 100;

  if (percent > 100) {
    percent = 100;
  }

  // 사용자가 페이지에 들어왔을 때 랜덤한 메세지를 보여준다.
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * bubbleMessage.length);
    setRandomMessage(bubbleMessage[randomIndex].message);
  }, []);

  useEffect(() => {
    if (data?.data.status === "COMPLETED") {
      setIsOpen(true);
    }
  }, [data]);

  const handleModalChange = (open: any) => {
    setIsOpen(open);
  };

  const handleWorkoutHistory = (id: number) => {
    setWorkoutHistory((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWorkout = async (v: any) => {
    setWorkout((v) => !v);
  };

  const handleStart = async () => {
    try {
      const res = await startWorkspace(Number(workspaceId));
      console.log(res);
      if (res.status === 200) {
        window.location.replace(`/workspace/${workspaceId}`);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  const handleLeave = async () => {
    try {
      const res = await leaveWorkspace(Number(workspaceId));
      console.log(res);
      if (res.status === 200) {
        router.push("/workspace-list/mygroup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <Dialog open={isOpen} onOpenChange={handleModalChange}>
        <DialogContent className="w-4/6 rounded-lg">
          <DialogDescription>
            <div className="mb-4 text-center text-black">
              워크스페이스 목표를 모두 달성했어요! <br /> 테스크를 확인하러
              갈까요?
            </div>
          </DialogDescription>
          <DialogFooter className="border-t-[1px]">
            <div className="pt-4 flex justify-between text-gray-600">
              <DialogClose asChild>
                <div className="text-sm rounded-lg text-[#D1D5DB] px-4 ">
                  cancel
                </div>
              </DialogClose>
              <Link href={`/workspace-complete/${workspaceId}`}>
                <div className="text-sm rounded-lg text-blue-500 px-4 ">
                  yes
                </div>
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-14">
        <div className={`flex items-end ${!workout ? "mb-8" : "mb-3"}`}>
          <h1 className="font-galmuri text-[28px] ml-2">{data?.data.name}</h1>
        </div>
        <div
          className={`flex justify-center items-end gap-x-6 ${
            !workout ? "h-48 mb-9" : "h-52 mb-5"
          }`}
        >
          <div className={`${!workout ? "w-48" : "w-[136px]"}`}>
            {percent < 25 && percent >= 0 ? (
              <Image src={mainLogo0} alt="mainLogo0" />
            ) : null}
            {percent < 50 && percent >= 25 ? (
              <Image src={mainLogo25} alt="mainLogo25" />
            ) : null}
            {percent < 75 && percent >= 50 ? (
              <Image src={mainLogo50} alt="mainLogo50" />
            ) : null}
            {percent <= 100 && percent >= 75 ? (
              <Image src={mainLogo75} alt="mainLogo75" />
            ) : null}
          </div>
          {!workout ? (
            <></>
          ) : (
            <div className="pb-28 relative">
              <span className="text-[#4B5563] text-[10px] absolute top-5 right-5 left-6">
                {randomMessage}
              </span>
              <Image src={speechBubble3} alt="speechBubble3" />
              <Image
                className="ml-3 my-2"
                src={speechBubble2}
                alt="speechBubble2"
              />
              <Image src={speechBubble1} alt="speechBubble1" />
            </div>
          )}
        </div>

        {/* 회원 클릭 전 */}
        {!workout ? (
          <div>
            <div className="flex flex-col mb-5">
              <div className="text-[10px] text-[#4B5563] mb-3.5">
                목표 달성률
              </div>
              <Progress
                indicatorColor="bg-main"
                className="h-1.5 bg-[#ffff] mb-1"
                value={percent}
              />
              <div className="text-[10px] text-[#4B5563] text-right">{`${data?.data.achievementScore}/${data?.data.goalScore}점`}</div>
            </div>
            <div className="flex items-center mb-2">
              <Image src={good} alt="good" className="w-5 h-5 mr-1.5" />
              <span className="text-xs text-[#4B5563]">획득 점수</span>
            </div>
            {/* 여기에 유저들 매핑해주기 */}
            <div className="overflow-auto">
              {data?.data.workers.map((user: any) => {
                return (
                  <div
                    className="mb-4 text-[#4B5563]"
                    key={user.id}
                    onClick={() =>
                      handleWorkout({
                        userId: user.id,
                        isMyself: user.isMyself,
                      })
                    }
                  >
                    <div
                      className={`w-full h-16 ${
                        user.isMyself ? "bg-[#C8F68B]" : "bg-[#DBEAFE] "
                      } rounded-xl flex items-center justify-between px-3.5`}
                    >
                      <div className="h-8 w-8 rounded-full bg-white mr-3.5 flex items-center justify-center relative">
                        {user.isCreator && (
                          <Image
                            src={creator}
                            alt="creator"
                            className="absolute -top-1 -left-1 z-10"
                          />
                        )}
                        {user.profileImage === "default.png" ? (
                          <Image src={noImage} alt="no-image" />
                        ) : (
                          <Image
                            className="rounded-full"
                            src={user.profileImage}
                            alt="profil-image"
                            layout="fill"
                            loader={() => imageLoader(user.profileImage)}
                          />
                        )}
                      </div>
                      <div className="flex-1">{user.name}</div>
                      <div>{`${user.contributeScore} P`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // 회원 클릭 후
          <div>
            <div className=" h-[50px] bg-white rounded-lg mb-4">
              <Tabs className="w-full" defaultValue="totalScore">
                <div className="flex gap-x-6 pl-7 pt-2 justify-items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[#9C9EA3] text-[8px]">총 점수</span>
                    <span className="text-[#1F2937]">
                      {mockDatas.totalContributedScore}점
                    </span>
                  </div>
                  <Image src={verticalLine} alt="verticalLine" />
                  {scoreDatas.map((scoreData: TScoreData) => {
                    return (
                      <div
                        className="flex flex-col items-center justify-center"
                        key={scoreData.id}
                      >
                        <span className="text-[#9C9EA3] text-[8px]">
                          {scoreData.label}
                        </span>
                        <span className="text-[#1F2937] text-xs pt-1">
                          {scoreData.value}점
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Tabs>
            </div>
            <div className="bg-white rounded-lg relative min-h-80 max-h-96 overflow-y-auto">
              <Tabs className="w-full pl-5 pt-2" defaultValue="myHistory">
                <span className="text-[#9CA3AF] text-xs">
                  {"<개인별 운동 히스토리>"}
                </span>
                <div className="pt-4">
                  {mockDatas.workoutHistories.map(
                    (mockData: THistorys, index: number) => {
                      const isToggled = workoutHistory.includes(mockData.id);
                      const isLastIndex =
                        index === mockDatas.workoutHistories.length - 1;

                      return (
                        <div className="flex pb-4" key={mockData.id}>
                          <span className="text-[#9C9EA3] text-[10px]">
                            {mockData.createdAt.substring(5)}
                          </span>
                          <div className="flex flex-col items-center px-3">
                            <Image
                              src={isToggled ? radiusClicked : radius}
                              alt={isToggled ? "radiusClicked" : "radius"}
                            />
                            {isLastIndex ? (
                              <></>
                            ) : (
                              <hr className="w-[1px] h-full border-0 bg-[#BFDBFE] -mb-4" />
                            )}
                          </div>
                          <div>
                            <div
                              onClick={() => {
                                handleWorkoutHistory(mockData.id);
                              }}
                            >
                              <span
                                className={`text-sm flex ${
                                  isToggled
                                    ? "text-[#4B5563]"
                                    : "text-[#6B7280]"
                                }`}
                              >
                                {mockData.sumOfScore}점 운동 기록
                                {isToggled ? (
                                  <></>
                                ) : (
                                  <Image
                                    src={arrow}
                                    alt="arrow"
                                    className="w-[4px] ml-2"
                                  />
                                )}
                              </span>
                            </div>
                            {mockData.isApproved ? (
                              <span className="text-xs text-[#6B7280]">
                                인증 완료
                              </span>
                            ) : (
                              <span className="text-xs text-[#F87171]">
                                인증 기각
                              </span>
                            )}
                            {isToggled && (
                              <div className="w-36 min-h-20 bg-[#DBEAFE] rounded-lg mt-2 pt-1 pb-2">
                                {mockDataHistorys.map(
                                  (dataHistory: TDetailHistorys) => {
                                    return (
                                      <div
                                        className="h-5 flex items-center"
                                        key={dataHistory.id}
                                      >
                                        <Image
                                          className="mx-2"
                                          src={detailHistoryRadius}
                                          alt="detailRadius"
                                        />
                                        <div>
                                          <span className="text-[#4B5563] text-[10px]">
                                            {dataHistory.mission}{" "}
                                            {dataHistory.count}회 -{" "}
                                            {dataHistory.totalScore}p
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        )}
      </div>
      {/* 조건으로 유저 닉네임과 방장 같으면 뭐시기 넣어주기 */}
      {data?.data.status === "PREPARING" && data?.data.isCreator === true && (
        <div className="px-4 fixed bottom-11 left-0 w-full flex justify-between items-center">
          <div>
            <button
              // opacity & disabled
              disabled={data?.data.workers.length === 1 ? true : false}
              className={`w-40 py-2.5 bg-main text-white text-base rounded-lg ${
                data?.data.workers.length === 1 && "opacity-30"
              }`}
              onClick={handleStart}
            >
              그룹 시작하기
            </button>
          </div>
          <div>
            <button
              disabled={data?.data.workers.length > 1 ? true : false}
              className={`w-40 py-2.5 text-main text-base rounded-lg ${
                data?.data.workers.length > 1 ? "bg-custom-blue" : "bg-white"
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
          {data?.data.status === "PREPARING" &&
            data?.data.isCreator === false && (
              <div className="px-7 fixed bottom-11 left-0 w-full">
                <button className="w-full py-3.5 bg-main text-white text-base rounded-lg">
                  그룹 나가기
                </button>
              </div>
            )}
        </DialogTrigger>
        <DialogContent className="w-4/6 rounded-lg h-[138px]">
          <DialogDescription className="flex items-center justify-center -mb-6">
            <span className="text-[#1F2937]">그룹을 나가시겠습니까?</span>
          </DialogDescription>
          <DialogFooter>
            <div className="w-full flex items-center justify-between text-sm font-light">
              <DialogClose asChild>
                <span className="text-sm bg-main py-1 px-7 rounded-lg text-white">
                  cancel
                </span>
              </DialogClose>
              <span
                className="text-sm bg-[#EFF6FF] py-1 px-10 rounded-lg text-main"
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
