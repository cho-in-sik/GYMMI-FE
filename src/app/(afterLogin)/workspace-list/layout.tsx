import { ReactNode } from 'react';
import UpperLayout from './_components/UpperLayout';
import NavBar from '@/app/(afterLogin)/_components/NavBar';

//여기에서만 네브바 넣기 - 워크스페이스 부분,

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="bg-[#D6E8FF] w-full">
      <UpperLayout />
      <div className="w-full bg-white h-full rounded-t-2xl px-[26px] py-3.5 mb-14">
        {children}
      </div>
      <NavBar />
    </div>
  );
}
