'use client';

import { createWorkspace } from '@/api/workspace';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useWorkSpaceStore } from '@/hooks/useWorkSpaceStore';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();

  const { groupMaker, add3Page, clearData } = useWorkSpaceStore();
  const [task, setTask] = useState(groupMaker.task);
  const [tag, setTag] = useState(groupMaker.tag);
  const [description, setDescription] = useState(groupMaker.description);

  const [error, setError] = useState('');

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
    if (task.length < 1) {
      return;
    }
    try {
      const res = await createWorkspace(data);

      if (res.status === 200) {
        setError('');
        clearData();
        router.push(`/workspace-list/mygroup`);
      }
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 400) {
        setError('태그는 한글, 영어만 가능합니다.');
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          setError('알수 없는 에러입니다.');
        } else {
          setError(error?.response?.data.message);
        }
      }
    }
  };

  return (
    <>
      <Progress indicatorColor='bg-black' value={99} className='h-[1px] mb-9' />
      <div className='grid w-full max-w-sm items-center mb-11'>
        <Label
          htmlFor='task'
          className='text-xs text-[#1F2937] font-normal mb-3'
        >
          <div className='flex'>
            <span className='mr-3'>5. 테스크를 작성해주세요!</span>
            <span className='text-[10px] text-[#D1D5DB]'>
              꼴등이 일등에게 하는 벌칙
            </span>
          </div>
        </Label>
        <div className='flex flex-col justify-between'>
          <Input
            required
            type='text'
            id='task'
            placeholder='일등에게 맛있는 밥 사주기'
            className='w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB]'
            value={task}
            onChange={handleFormChange}
          />
          {task.length < 1 && (
            <span className='text-[10px] text-[#EF4444] mt-2'>
              테스크를 1자 이상 작성해주세요.
            </span>
          )}
        </div>
      </div>
      <div className='grid w-full max-w-sm items-center mb-11'>
        <Label
          htmlFor='tag'
          className='text-xs text-[#1F2937] font-normal mb-3'
        >
          선택) 그룹을 나타내는 태그를 적어주세요!
        </Label>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='tag'
            maxLength={10}
            placeholder='헬스, 러닝, 필라테스 등'
            className='w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB] mr-1'
            onChange={handleFormChange}
            value={tag}
          />
          <div className='w-full flex justify-between items-center'>
            {error && (
              <span className='text-[10px] text-[#F87171]'>{error}</span>
            )}
            <div className=''>
              <span className='text-xs text-[#D1D5DB] text-right'>{`${tag.length}/10`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='grid w-full max-w-sm items-center mb-11'>
        <Label
          htmlFor='description'
          className='text-xs text-[#1F2937] font-normal mb-3'
        >
          선택) 간단한 그룹 설명을 해주세요!
        </Label>
        <div className='flex justify-between items-center'>
          <Input
            type='text'
            id='description'
            placeholder='그룹목표, 소개 등'
            className='w-full h-[52px] bg-[#F9FAFB] placeholder:text-base placeholder:text-[#D1D5DB]'
            value={description}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div
        onClick={handleSubmit}
        className='w-full flex justify-center items-center'
      >
        <button className='fixed bottom-10 w-11/12 h-11 bg-[#3B82F6] rounded-lg text-base text-white'>
          그룹 만들기 완료
        </button>
      </div>
    </>
  );
}
