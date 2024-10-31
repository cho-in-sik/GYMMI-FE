'use client';

import plus from '@/../public/svgs/plus.svg';
import filledCheck from '@/../public/svgs/workspace/filledCheck.svg';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import registerIcon from '@/../public/svgs/workspace/registerOff.svg';
import registerOnIcon from '@/../public/svgs/workspace/registerOn.svg';

import emptyStar from '@/../public/svgs/workspace/emptyStar.svg';
import filledStar from '@/../public/svgs/workspace/filledStar.svg';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { userMissions } from '@/api/workspace';
import { useState } from 'react';

type TMission = {
  id: number;
  mission: string;
  score: number;
};

export default function Page() {
  const { workspaceId } = useParams();
  const [activeNumber, setActiveNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<TMission | null>(null);
  const [counts, setCounts] = useState<Array<{ id: number; count: number }>>(
    [],
  );

  const { data } = useQuery({
    queryKey: ['missions'],
    queryFn: () => userMissions(Number(workspaceId)),
  });

  console.log(counts);

  const updateCount = (missionId: number, newCount: number) => {
    setCounts((prevCounts) => {
      if (newCount === 0) {
        return prevCounts.filter((item) => item.id !== missionId);
      }

      const existing = prevCounts.find((item) => item.id === missionId);
      if (existing) {
        return prevCounts.map((item) =>
          item.id === missionId ? { ...item, count: newCount } : item,
        );
      } else {
        return [...prevCounts, { id: missionId, count: newCount }];
      }
    });
  };

  const handleAddClick = () => {
    if (selectedMission) {
      updateCount(selectedMission.id, activeNumber);
      setActiveNumber(0);
      setOpen(false);
    }
  };

  // 특정 미션의 count 가져오는 함수
  const getMissionCount = (missionId: number) => {
    const mission = counts.find((item) => item.id === missionId);
    return mission ? mission.count : 0;
  };

  // 특정 미션이 완료되었는지 확인하는 함수 (count가 1 이상일 때 완료)
  const isMissionCompleted = (missionId: number) => {
    return getMissionCount(missionId) > 0;
  };

  return (
    <div className="">
      <div className="flex justify-start items-center text-xs gap-2 mb-4">
        <div className="px-3 py-1 bg-[#9CA3AF] rounded-xl text-white">전체</div>
        <div className="px-3 py-1 bg-[#F9FAFB] text-[#9CA3AF] rounded-xl">
          즐겨찾기
        </div>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {data?.map((item: TMission) => (
            <div
              className="w-full h-16 py-3 px-4 rounded-lg bg-[#FEFCE8] flex justify-between items-center"
              key={item.id}
            >
              <div className="flex flex-col">
                <h3 className="text-base">{item.mission}</h3>
                <span className="text-xs font-normal">{`${item.score}점`}</span>
              </div>

              <div>
                <DrawerTrigger asChild id={item.id.toString()}>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedMission(item);
                      setActiveNumber(getMissionCount(item.id));
                    }}
                  >
                    <Image
                      src={isMissionCompleted(item.id) ? filledCheck : plus}
                      alt="icon"
                    />
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ))}
        </div>
        <DrawerContent>
          <div className="w-full max-w-sm">
            <DrawerHeader>
              <div className="flex justify-between">
                <DrawerTitle className="mb-2">
                  {selectedMission
                    ? selectedMission.mission
                    : '선택된 미션이 없습니다'}
                </DrawerTitle>
                <div>
                  <Image src={emptyStar} alt="empty-star" />
                </div>
              </div>

              <DrawerDescription>
                {selectedMission ? `${selectedMission.score}점` : ''}
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <div className="w-full py-2 px-5 rounded-full bg-[#F3F4F6] flex justify-between mb-2">
                <button
                  className="text-2xl"
                  onClick={() =>
                    setActiveNumber((prev) => Math.max(prev - 1, 0))
                  }
                >
                  -
                </button>
                <div className="text-2xl">{activeNumber}</div>
                <button
                  className="text-2xl"
                  onClick={() => setActiveNumber((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="w-full py-3 rounded-full bg-main text-white"
                onClick={handleAddClick}
              >
                추가하기
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="w-full fixed bottom-10">
        <div className="w-full">
          <button
            className={`py-3 w-[85%] ${
              counts.length > 0 ? 'bg-main text-white' : 'bg-[#EFF6FF]'
            } rounded-full flex justify-center items-center text-base`}
          >
            <div className="absolute left-4">
              {counts.length > 0 ? (
                <Image src={registerOnIcon} alt="registerOnIcon" />
              ) : (
                <Image src={registerIcon} alt="registerIcon" />
              )}
            </div>
            <span>등록하러 가기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
