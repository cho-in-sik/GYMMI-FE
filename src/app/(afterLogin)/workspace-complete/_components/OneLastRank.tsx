import Image from 'next/image';

interface OneLastRankProps {
  rankPrize: any;
  name: string;
  contributeScore: number;
  rank: number;
  height: string;
}

export default function OneLastRank({
  rankPrize,
  name,
  contributeScore,
  rank,
  height,
}: OneLastRankProps) {
  return (
    <div className='w-40 flex flex-col items-center justify-end ml-1'>
      <div className='flex gap-x-3'>
        <Image src={rankPrize} alt='RankPrize' className='w-14 h-14' />
        <div className='flex flex-col justify-center items-center'>
          <span className='text-xl text-[#4B5563] font-bold'>{name}</span>
          <span className='text-[10px] text-[#6B7280]'>
            총 {contributeScore}점
          </span>
        </div>
      </div>
      <div
        className={`w-full h-${height} bg-[#F3F4F6] rounded-t-lg mt-5 flex items-end justify-center`}
      >
        <div className='text-sm text-[#9CA3AF] pb-0.5'>{rank}</div>
      </div>
    </div>
  );
}
