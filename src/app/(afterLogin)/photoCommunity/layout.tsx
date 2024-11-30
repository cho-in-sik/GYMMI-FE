import { ReactNode } from 'react';
import BackArrow from '@/app/(afterLogin)/_components/BackArrow';
import NavBar from '../_components/NavBar';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="px-4 pt-12">
        <BackArrow />
      </div>
      <div className="px-4">{children}</div>
      <NavBar />
    </div>
  );
}
