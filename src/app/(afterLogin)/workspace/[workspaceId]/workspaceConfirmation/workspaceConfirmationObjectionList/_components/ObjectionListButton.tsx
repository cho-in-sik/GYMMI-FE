interface ObjectionListButtonProps {
  comment: string;
  onClick: () => void;
}

export default function ObjectionListButton({
  comment,
  onClick,
}: ObjectionListButtonProps) {
  return (
    <div
      className={`${
        comment === '투표 안함' ? 'w-16' : 'w-14'
      } h-6 bg-[#F9FAFB] text-[#9CA3AF] rounded-xl mr-3 flex justify-center items-center`}
      onClick={onClick}
    >
      <span className='text-xs'> {comment} </span>
    </div>
  );
}
