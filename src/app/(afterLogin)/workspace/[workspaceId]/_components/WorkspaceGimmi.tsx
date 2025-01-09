import mainLogo0 from '@/../public/svgs/mainLogo0.svg';
import mainLogo25 from '@/../public/svgs/mainLogo25.svg';
import mainLogo50 from '@/../public/svgs/mainLogo50.svg';
import mainLogo75 from '@/../public/svgs/mainLogo75.svg';

import Image from 'next/image';

type TWorkspaceGimmi = {
  workout: boolean;
  achievementScore: number;
};

function WorkspaceGimmi({ workout, achievementScore }: TWorkspaceGimmi) {
  return (
    <div className={`${!workout ? 'w-48' : 'w-40 mb-2'}`}>
      {achievementScore < 25 && achievementScore >= 0 ? (
        <Image src={mainLogo0} alt='mainLogo0' />
      ) : null}
      {achievementScore < 50 && achievementScore >= 25 ? (
        <Image src={mainLogo25} alt='mainLogo25' />
      ) : null}
      {achievementScore < 75 && achievementScore >= 50 ? (
        <Image src={mainLogo50} alt='mainLogo50' />
      ) : null}
      {achievementScore <= 100 && achievementScore >= 75 ? (
        <Image src={mainLogo75} alt='mainLogo75' />
      ) : null}
    </div>
  );
}
export default WorkspaceGimmi;
