import Image from 'next/image';

interface OneLastRankProps {
  rankPrize: any;
  rankName: string;
  rankContributeScore: number;
}

export default function OneLastRank({
  rankPrize,
  rankName,
  rankContributeScore,
}: OneLastRankProps) {
  return (
    <div className='flex gap-x-3'>
      <Image src={rankPrize} alt='RankPrize' className='w-14 h-14' />
      <div className='flex flex-col justify-center items-center'>
        <span className='text-xl text-[#4B5563] font-bold'>{rankName}</span>
        <span className='text-[10px] text-[#6B7280]'>
          총 {rankContributeScore}점
        </span>
      </div>
    </div>
  );
}
