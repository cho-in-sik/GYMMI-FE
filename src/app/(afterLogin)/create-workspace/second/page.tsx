'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import plus from '@/../public/svgs/plus.svg';
import delIcon from '@/../public/svgs/delete.svg';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useWorkSpaceStore } from '@/hooks/useWorkSpaceStore';

interface InputItem {
  id: number;
  mission: string;
  score: number;
  placeholder?: string;
}

export default function Page() {
  const { groupMaker, add2Page } = useWorkSpaceStore();

  const [goalScore, setGoalScore] = useState(groupMaker.goalScore);
  const nextID = useRef<number>(groupMaker.missionBoard.length);
  const [inputItems, setInputItems] = useState<InputItem[]>(
    groupMaker.missionBoard,
  );
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  console.log(groupMaker);
  console.log(inputItems);

  useEffect(() => {
    if (inputItems.length === 0) {
      setDisabled(true);
    }
    if (
      goalScore === 0 ||
      (goalScore as number) < 100 ||
      (goalScore as number) > 1000 ||
      (goalScore as number) % 10 !== 0
    ) {
      setError('형식에 맞게 작성해주세요.');
      setDisabled(true);
    } else {
      setError('');
    }

    if (error === '' && inputItems.length !== 0) {
      setDisabled(false);
    }
  }, [goalScore, error, inputItems]);

  console.log('disabled', disabled);
  console.log('error', error);

  const handleNext = () => {
    add2Page({ missionBoard: inputItems, goalScore });
  };

  // 추가
  function addInput() {
    if (inputItems.length > 16) return;
    const input = {
      id: nextID.current,
      mission: '',
      score: 0,
    };

    setInputItems([...inputItems, input]);
    nextID.current += 1;
  }

  // 삭제
  function deleteInput(id: number) {
    setInputItems(inputItems.filter((item) => item.id !== id));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (index > inputItems.length) return;
    const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
    inputItemsCopy[index].mission = e.target.value;
    setInputItems(inputItemsCopy);
  }

  function scoreHandleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
    inputItemsCopy[index].score = e.currentTarget.valueAsNumber;
    setInputItems(inputItemsCopy);
  }

  return (
    <>
      <Progress value={66} className="h-[1px] mb-9" />
      <div className="grid w-full max-w-sm items-center mb-11">
        <div className="flex items-center">
          <Label
            htmlFor="goal"
            className="text-sm text-[#6B7280] font-normal mb-2 mr-2"
          >
            3. 그룹의 목표점수를 설정해주세요!
          </Label>
          <span className="text-[#D1D5DB] text-[8px]">
            100~1000점까지 가능해요
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Input
            autoFocus
            required
            type="number"
            id="goal"
            placeholder="10 단위로만 설정가능해요"
            className="w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB]"
            value={goalScore}
            onChange={(e) => setGoalScore(e.currentTarget.valueAsNumber)}
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center">
        <div className="flex items-center">
          <Label
            htmlFor="mission"
            className="text-xs text-[#6B7280] font-normal mb-2 mr-2"
          >
            4. 미션 항목을 만들어주세요!
          </Label>
          <span className="text-[#D1D5DB] text-[8px]">
            최대 15개까지 설정 가능해요.
          </span>
        </div>

        <div
          className="w-full h-8 flex justify-center items-center mb-3 mt-1"
          onClick={addInput}
        >
          <Image src={plus} alt="plus" />
        </div>
        {inputItems.map((item, index) => (
          <div className="flex justify-between items-center mb-3" key={index}>
            <Input
              maxLength={15}
              type="text"
              id="mission"
              className="w-8/12 h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB] relative"
              placeholder={item.placeholder}
              onChange={(e) => handleChange(e, index)}
              value={item.mission}
            />
            <div
              className="flex justify-center items-center absolute right-36"
              onClick={() => deleteInput(item.id)}
            >
              <Image src={delIcon} alt="delete-icon" />
            </div>
            <div className="flex justify-center items-center w-24 h-[52px] text-[#6B7280] rounded-lg text-[12px]">
              <Input
                id="mission"
                type="number"
                className="w-full h-full bg-[#E5E7EB] text-center"
                value={`${item.score}`}
                onChange={(e) => scoreHandleChange(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href={'/create-workspace/third'}>
        <div
          className="w-full flex justify-center items-center"
          onClick={handleNext}
        >
          <button
            disabled={disabled}
            className="fixed bottom-10 w-11/12 h-11 bg-[#DBEAFE] rounded-lg text-base text-[#6B7280]"
          >
            계속하기
          </button>
        </div>
      </Link>
    </>
  );
}
