'use client';

import { myWorkspaces } from '@/api/workspace';
import { Progress } from '@/components/ui/progress';
import { workspace } from '@/constants/queryKey';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import NoWorkspace from './NoWorkspace';

export default function MyWorkspacelits() {
  const { data } = useQuery({
    queryKey: [workspace.mylists],
    queryFn: () => myWorkspaces(),
  });

  return (
    <div className="relative">
      {data?.data.length === 0 ? (
        <NoWorkspace />
      ) : (
        <div>
          {data?.data.map((item: any) => {
            return (
              <Link href={`/workspace/${item.id}`} key={item.id}>
                <div
                  className={`${
                    item.status === 'PREPARING'
                      ? 'bg-[#FEF9C3] '
                      : 'bg-[#60A5FA] '
                  } w-full rounded-lg p-4 mb-7 ${
                    item.status === 'FULLY_COMPLETED' ? 'opacity-50' : null
                  }`}
                >
                  <div
                    className={`${
                      item.status === 'PREPARING'
                        ? 'text-black '
                        : 'text-white '
                    }`}
                  >
                    <h2 className="text-2xl mb-3.5 ">{item.name}</h2>
                    <div className="text-[10px] ">
                      <span>{`태그: ${item.tag}`}</span>
                      {item.tag === '' ? null : <span>, </span>}

                      <span>
                        {item.createdAt.replace(
                          /(\d{4})-(\d{2})-(\d{2})T.*/,
                          '$1$2$3',
                        )}
                      </span>
                    </div>
                    <div className="text-[10px]  mb-3.5">
                      <span>{`테스크 점수: ${item.goalScore}점`}</span>
                      <span>, </span>
                      <span>{`방장: ${item.creator}`}</span>
                    </div>
                    {item.status === 'PREPARING' ? null : (
                      <Progress
                        indicatorColor="bg-[#1E40AF]"
                        className={`h-1.5 ${
                          item.status === 'PREPARING' && 'bg-white'
                        }`}
                        value={(item.achievementScore / item.goalScore) * 100}
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
