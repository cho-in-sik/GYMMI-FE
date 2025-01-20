import ConfirmationProfileImg from '../../_components/ConfirmationProfileImg';
import { IWorkspaceConfirmationDetailProps } from '@/types/workoutConfirmation';

interface IConfirmationDetailProfileProps {
  workspaceConfirmationDetail: IWorkspaceConfirmationDetailProps | undefined;
}

export default function ConfirmationDetailProfile({
  workspaceConfirmationDetail,
}: IConfirmationDetailProfileProps) {
  return (
    <div className='flex items-center ml-1 mt-1.5'>
      <ConfirmationProfileImg
        profileImageUrlParams={workspaceConfirmationDetail?.profileImageUrl}
      />
      <div className='flex flex-col ml-3 mt-1'>
        <span className='text-base text-[#1F2937]'>
          {workspaceConfirmationDetail?.nickname}
        </span>
        <span className='text-[10px] text-[#848D99]'>
          {workspaceConfirmationDetail?.loginId}
        </span>
      </div>
    </div>
  );
}
