import { IWorkspaceIsCreatorButtonProps } from '@/types/workSpace';

export default function WorkspaceIsCreatorButton({
  workerLength,
  buttonStyle,
  onClickFn,
  buttonName,
}: IWorkspaceIsCreatorButtonProps) {
  return (
    <div>
      <button
        disabled={workerLength > 1 ? true : false}
        className={`w-[171px] py-2.5 ${buttonStyle} text-base rounded-lg`}
        onClick={onClickFn}
      >
        {buttonName}
      </button>
    </div>
  );
}
