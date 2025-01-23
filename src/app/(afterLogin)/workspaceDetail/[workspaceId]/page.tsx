'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { detailUpdate, detailWorkspace } from '@/api/workspace';
import BackArrow from '../../_components/BackArrow';
import WorkspaceSettingTextArea from './_components/WorkspaceSettingTextArea';
import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();

  const [task, setTask] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');

  const [isEditBtn, setIsEditBtn] = useState(false);

  const [error, setError] = useState('');

  const { data: workspaceSetting } = useQuery({
    queryKey: ['workspaceDetail', workspaceId],
    queryFn: () => detailWorkspace(workspaceId),
  });

  useEffect(() => {
    if (workspaceSetting) {
      setDescription(workspaceSetting.data.description || '');
      setTag(workspaceSetting.data.tag || '');
      setTask(workspaceSetting.data.task);
    }
  }, [workspaceSetting]);

  const handleUpdate = async () => {
    const data = { tag, description, task };
    try {
      setIsEditBtn(false);
      setError('');
      await detailUpdate({ workspaceId, data, task });
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        setError('태그는 한글, 영어만 가능합니다.');
      }
    }
  };

  return (
    <div className='px-6 py-12 h-screen'>
      <div className='w-6'>
        <BackArrow />
      </div>
      <div className='relative h-full mt-5 flex flex-col justify-between'>
        <div>
          <div className='mb-9'>
            <h1 className='text-xl mb-5'>워크스페이스 비밀번호 확인</h1>
            <div className='w-24 h-12 rounded-lg bg-[#F9FAFB] flex justify-center items-center'>
              <span>{workspaceSetting?.data.password}</span>
            </div>
          </div>
          <WorkspaceSettingTextArea
            textAreaName='그룹 테스크'
            id='task'
            placeholder='워크스페이스 시작 전 테스크를 변경할 수 있어요!'
            value={task}
            isCreator={workspaceSetting?.data.isCreator}
            isPreparing={workspaceSetting?.data.isPreparing}
            textAreaOnChange={setTask}
            setIsEditBtn={setIsEditBtn}
            error={error}
          />
          <WorkspaceSettingTextArea
            textAreaName='그룹 태그'
            id='tag'
            placeholder='그룹 태그를 추가해주세요!'
            value={tag}
            isCreator={workspaceSetting?.data.isCreator}
            isPreparing={workspaceSetting?.data.isPreparing}
            textAreaOnChange={setTag}
            setIsEditBtn={setIsEditBtn}
            error={error}
          />
          <WorkspaceSettingTextArea
            textAreaName='그룹 설명'
            id='description'
            placeholder='그룹 설명을 추가해주세요!'
            value={description}
            isCreator={workspaceSetting?.data.isCreator}
            isPreparing={workspaceSetting?.data.isPreparing}
            textAreaOnChange={setDescription}
            setIsEditBtn={setIsEditBtn}
            error={error}
          />
        </div>

        {workspaceSetting?.data.isCreator && isEditBtn && (
          <div className='w-full flex justify-center items-center bg-main rounded-lg py-3 mb-10'>
            <button className='text-white text-base' onClick={handleUpdate}>
              수정 완료하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
