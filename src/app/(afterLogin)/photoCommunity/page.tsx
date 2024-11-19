import Image from 'next/image';
import registerPhoto from '@/../public/svgs/photoCommunity/registerPhoto.svg';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <div className="flex justify-center items-center font-galmuri text-xl font-medium -mt-7 mb-6">
        GYMMI Photo
      </div>
      <div className="grid grid-cols-2 gap-4 h-full mb-32 relative">
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2">1</div>
        <div className="w-full h-44 bg-[#F4F8FB] rounded-lg">2</div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg row-span-2 col-start-2">
          3
        </div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg col-start-1">4</div>
        <div className="w-full h-44 bg-[#F4F8FB] rounded-lg">5</div>
        <div className="w-full h-64 bg-[#E6EAEF] rounded-lg col-start-2 -mt-20">
          6
        </div>

        <Link href={'/photoCommunity/register'}>
          <div className="fixed bottom-28 right-4 bg-[#3B82F6] rounded-full transform transition-transform duration-200 hover:scale-110 active:scale-95">
            <Image src={registerPhoto} alt="photo-register" />
          </div>
        </Link>
      </div>
    </div>
  );
}
