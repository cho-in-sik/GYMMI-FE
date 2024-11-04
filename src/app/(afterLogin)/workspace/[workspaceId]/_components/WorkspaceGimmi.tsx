import mainLogo0 from '@/../public/svgs/mainLogo0.svg';
import mainLogo25 from '@/../public/svgs/mainLogo25.svg';
import mainLogo50 from '@/../public/svgs/mainLogo50.svg';
import mainLogo75 from '@/../public/svgs/mainLogo75.svg';

import Image from 'next/image';

type TWorkspaceGimmi = {
  workout: boolean;
  percent: number;
};

function WorkspaceGimmi({ workout, percent }: TWorkspaceGimmi) {
  return (
    <div className={`${!workout ? 'w-48' : 'w-[136px]'}`}>
      {percent < 25 && percent >= 0 ? (
        <Image src={mainLogo0} alt='mainLogo0' />
      ) : null}
      {percent < 50 && percent >= 25 ? (
        <Image src={mainLogo25} alt='mainLogo25' />
      ) : null}
      {percent < 75 && percent >= 50 ? (
        <Image src={mainLogo50} alt='mainLogo50' />
      ) : null}
      {percent <= 100 && percent >= 75 ? (
        <Image src={mainLogo75} alt='mainLogo75' />
      ) : null}
    </div>
  );
}
export default WorkspaceGimmi;
