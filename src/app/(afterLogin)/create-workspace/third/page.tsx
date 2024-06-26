'use client';

import { createWorkspace } from '@/api/workspace';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useWorkSpaceStore } from '@/hooks/useWorkSpaceStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();

  const { groupMaker, add3Page } = useWorkSpaceStore();
  const [task, setTask] = useState(groupMaker.task);
  const [tag, setTag] = useState(groupMaker.tag);
  const [description, setDescription] = useState(groupMaker.description);

  // console.log(groupMaker);
  const submitData = { ...groupMaker };

  const data = {
    name: submitData.name,
    headCount: submitData.headCount,
    goalScore: submitData.goalScore,
    description: submitData.description,
    tag: submitData.tag,
    missionBoard: submitData.missionBoard.map((item) => ({
      mission: item.mission,
      score: item.score,
    })),
    task: submitData.task,
  };
  console.log(submitData);
  console.log(data);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    if (id === 'task') {
      setTask(e.target.value);
    }
    if (id === 'tag') {
      setTag(e.target.value);
    }
    if (id === 'description') {
      setDescription(e.target.value);
    }
    add3Page({ task, tag, description });
  };

  const handleSubmit = async () => {
    console.log(data);
    if (task.length < 1) return;
    try {
      const res = await createWorkspace(data);
      console.log(res);
      if (res.status === 200) {
        router.push(`/workspace-list/mygroup`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Progress value={99} className="h-[1px] mb-9" />
      <div className="grid w-full max-w-sm items-center mb-11">
        <Label
          htmlFor="task"
          className="text-xs text-[#1F2937] font-normal mb-3"
        >
          5. 본인의 테스크를 작성해주세요!
        </Label>
        <div className="flex justify-between items-center">
          <Input
            required
            type="text"
            id="task"
            placeholder="일등에게 맛있는 밥 사주기"
            className="w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB]"
            value={task}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center mb-11">
        <Label
          htmlFor="tag"
          className="text-xs text-[#1F2937] font-normal mb-3"
        >
          + 그룹을 나타내는 태그를 적어주세요! (선택)
        </Label>
        <div className="flex items-center">
          <Input
            type="text"
            id="tag"
            maxLength={10}
            placeholder="헬스, 러닝, 필라테스 등"
            className="w-[210px] h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB] mr-1"
            onChange={handleFormChange}
            value={tag}
          />
          <span className="text-xs text-[#D1D5DB]">{`${tag.length}/10`}</span>
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center mb-11">
        <Label
          htmlFor="description"
          className="text-xs text-[#1F2937] font-normal mb-3"
        >
          + 간단한 그룹 설명을 해주세요! (선택)
        </Label>
        <div className="flex justify-between items-center">
          <Input
            type="text"
            id="description"
            placeholder="그룹목표, 소개 등"
            className="w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB]"
            value={description}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="w-full flex justify-center items-center"
      >
        <button className="fixed bottom-10 w-11/12 h-11 bg-[#3B82F6] rounded-lg text-base text-white">
          그룹 만들기 완료
        </button>
      </div>
    </>
  );
}
