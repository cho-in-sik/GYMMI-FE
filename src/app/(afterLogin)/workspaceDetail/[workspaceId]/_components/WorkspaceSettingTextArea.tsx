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
}

export default function WorkspaceSettingTextArea({
  textAreaName,
  id,
  placeholder,
  value,
  isCreator,
  isPreparing,
  textAreaOnChange,
}: WorkspaceSettingTextAreaProps) {
  const taskArea = id === 'task' && !isPreparing;

  return (
    <div className='mb-9 relative'>
      <label htmlFor='description' className='text-xl'>
        {textAreaName}
      </label>
      <textarea
        disabled={!isCreator || taskArea}
        id={id}
        placeholder={placeholder}
        className='w-full h-full bg-[#F9FAFB] rounded-lg p-3 mt-5 placeholder:text-xs placeholder:pt-1'
        value={value}
        onChange={(e) => textAreaOnChange(e.target.value)}
      />
      {!isCreator ||
        (!taskArea && (
          <div className='absolute right-3 top-16'>
            <Image src={editPencil} alt='edit' />
          </div>
        ))}
    </div>
  );
}
