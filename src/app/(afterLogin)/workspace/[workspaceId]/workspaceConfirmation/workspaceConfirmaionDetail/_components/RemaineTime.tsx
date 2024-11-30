import { useEffect, useState } from 'react';

interface RemaineTimeProps {
  deadline: string;
}

const RemaineTime = ({ deadline }: RemaineTimeProps) => {
  const [remaineTime, setRemaineTime] = useState('00시 00분');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const remineTime = end - now;

      if (remineTime <= 0) {
        setRemaineTime('00시 00분');
        clearInterval(interval);
      } else {
        const hours = Math.floor(remineTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remineTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        setRemaineTime(`${hours}시간 ${minutes}분`);
      }
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 사라질 때 타이머 종료
  }, [deadline]);

  return <span>{remaineTime}</span>;
};

export default RemaineTime;
