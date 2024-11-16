'use client';

interface ApproveStatusMsgProps {
  isApproved: boolean;
}

function ApproveStatusMsg({ isApproved }: ApproveStatusMsgProps) {
  return (
    <>
      {isApproved ? (
        <span className='text-xs text-[#6B7280]'>인증 완료</span>
      ) : (
        <span className='text-xs text-[#F87171]'>인증 거부</span>
      )}
    </>
  );
}
export default ApproveStatusMsg;
