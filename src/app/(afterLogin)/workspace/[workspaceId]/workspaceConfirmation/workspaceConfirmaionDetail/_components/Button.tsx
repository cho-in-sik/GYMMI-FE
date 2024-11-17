interface ButtonProps {
  comment: string;
}

export default function Button({ comment }: ButtonProps) {
  return (
    <div
      className={`${
        comment === '이의 신청하기' ? 'w-[360px] h-11' : 'h-10'
      } bg-[#EFF6FF] rounded-[35px] flex justify-center`}
    >
      <button className='text-base text-[#848D99]'> {comment} </button>
    </div>
  );
}
