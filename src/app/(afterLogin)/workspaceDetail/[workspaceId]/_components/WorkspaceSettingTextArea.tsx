import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import editPencil from '@/../public/svgs/workspace/editPencil.svg';

interface WorkspaceSettingTextAreaProps {
  textAreaName: string;
  id: string;
  placeholder: string;
  value: string;
  isCreator: boolean;
  isPreparing: boolean;
  textAreaOnChange: Dispatch<SetStateAction<string>> | any;
  setIsEditBtn: Dispatch<SetStateAction<boolean>>;
  error: string;
}

export default function WorkspaceSettingTextArea({
  textAreaName,
  id,
  placeholder,
  value,
  isCreator,
  isPreparing,
  textAreaOnChange,
  setIsEditBtn,
  error,
}: WorkspaceSettingTextAreaProps) {
  const taskArea = id === 'task' && !isPreparing;
  const tagArea = id === 'tag' && value.length >= 10;
  const tagError = id === 'tag' && error.length !== 0;

  return (
    <div className='mb-9 relative'>
      <label htmlFor='description' className='text-xl'>
        {textAreaName}
      </label>
      <textarea
        disabled={!isCreator || taskArea}
        id={id}
        placeholder={placeholder}
        className={`w-full h-20 bg-[#F9FAFB] rounded-lg p-3 mt-5 placeholder:text-xs placeholder:pt-1 ${
          value && 'text-base text-[#1F2937]'
        }`}
        value={value}
        onChange={(e) => textAreaOnChange(e.target.value)}
      />
      {!isCreator ||
        (!taskArea && (
          <div
            className='w-6 h-60 absolute right-0 top-16'
            onClick={() => setIsEditBtn((prev) => !prev)}
          >
            <Image src={editPencil} alt='edit' />
          </div>
        ))}
      {tagArea && (
        <div className='text-[10px] text-[#EF4444] '>
          태그는 10자까지만 가능합니다.
        </div>
      )}
      {tagError && <div className='text-[10px] text-[#EF4444]'>{error}</div>}
    </div>
  );
}
