'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import nextArrow from '@/../public/svgs/nextArrow.svg';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { allWorkspaces, alreadyIn, joinWorkspace } from '@/api/workspace';
import { useInfiniteQuery } from '@tanstack/react-query';
import { workspace } from '@/constants/queryKey';

import { workspaceList } from '@/constants/workSpace';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import NoWorkspace from './NoWorkspace';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function AllGroupTabs() {
  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(workspaceList.complete);
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const router = useRouter();

  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    any,
    Error
  >({
    queryKey: [workspace.all_lists, tabValue, search],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await allWorkspaces({
        type: tabValue,
        keyword: search,
        page: pageParam,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.nextPage || undefined;
    },
  });
  const allGroupeTabsData = data?.pages.flatMap((pages) => pages.data);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //워크스페이스 아이디 받아서 전해주기
      const res = await joinWorkspace({
        password,
        workspaceId: currentWorkspaceId,
      });
      if (res.status === 200) {
        router.push(`/workspace/${currentWorkspaceId}`);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setError('비밀번호가 일치하지 않습니다.');
      }
      console.error(error);
    }
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleTabChange = (e: React.MouseEvent) => {
    setTabValue(e.currentTarget.id);
  };

  const handleAlreadyIn = async (workspaceId: number) => {
    try {
      const res = await alreadyIn(workspaceId);

      if (res.data.isWorker === true) {
        router.push(`/workspace/${workspaceId}`);
        return;
      }
      if (res.data.isFull) {
        alert('방 인원이 전부 찼습니다!');
      }
    } catch (error) {
      setIsFirstDialogOpen(true);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  return (
    <div>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search your group'
          className='bg-slate-100 w-full h-10 rounded-3xl placeholder:text-[10px] p-4 pt-3'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger
            value='before-p'
            id={workspaceList.prepare}
            onClick={handleTabChange}
          >
            진행전
          </TabsTrigger>
          <TabsTrigger
            value='ing-p'
            id={workspaceList.inProgress}
            onClick={handleTabChange}
          >
            진행중
          </TabsTrigger>
          <TabsTrigger
            value='all'
            id={workspaceList.complete}
            onClick={handleTabChange}
          >
            모두
          </TabsTrigger>
        </TabsList>
        <div className='border-b-2 mt-2 w-full mb-4'></div>
        <TabsContent value='before-p' className='relative'>
          {allGroupeTabsData?.length !== 0 ? (
            <div>
              {allGroupeTabsData?.map((item: any) => (
                <Dialog
                  key={item.id}
                  open={isFirstDialogOpen}
                  onOpenChange={(open) => {
                    setIsFirstDialogOpen(open);
                    setCurrentWorkspaceId(item.id); // workspaceId 저장
                  }}
                >
                  <DialogTrigger asChild>
                    <div
                      onClick={() => handleAlreadyIn(item.id)}
                      className='w-full h-20 bg-[#FEF9C3] rounded-lg flex justify-between items-center px-3.5 my-6'
                    >
                      <h1 className='text-[22px]'>{item.name}</h1>
                      <div>
                        <Image src={nextArrow} alt='next-arrow' />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='w-9/12 rounded-lg h-44 p-0'>
                    <DialogHeader className='flex justify-end'>
                      <DialogTitle className='text-xs'>
                        비밀번호를 입력해주세요
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <div className='w-full h-full'>
                        <form onSubmit={onSubmit}>
                          <div className='mx-8'>
                            <input
                              type='number'
                              placeholder='숫자 4자리를 입력해주세요.'
                              className='bg-[#F3F4F6] w-full h-11 py-4 pl-4 rounded-lg placeholder:text-[10px]'
                              value={password}
                              onChange={(e) => handlePassword(e)}
                            />
                          </div>
                          {error && (
                            <span className='ml-8 text-[8px] text-[#EF4444]'>
                              {error}
                            </span>
                          )}
                          <div
                            className={`w-full border-t-[1px] ${
                              error ? 'mt-3 pt-3' : 'mt-6 pt-4'
                            } flex justify-around items-center`}
                          >
                            <DialogClose asChild>
                              <span className='text-sm text-[#D1D5DB]'>
                                cancel
                              </span>
                            </DialogClose>

                            <button
                              type='submit'
                              className='text-sm text-[#3B82F6]'
                            >
                              join
                            </button>
                          </div>
                        </form>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <NoWorkspace />
          )}
        </TabsContent>
        <TabsContent value='ing-p' className='relative'>
          {allGroupeTabsData?.length !== 0 ? (
            <div>
              {allGroupeTabsData?.map((item: any) => (
                <div
                  key={item.id}
                  className={`w-full h-20 bg-[#60A5FA] rounded-lg flex justify-evenly items-start px-3.5 flex-col my-6 ${
                    item.status === 'FULLY_COMPLETED' && 'opacity-50'
                  }`}
                  onClick={() => handleAlreadyIn(item.id)}
                >
                  <h2 className='text-[22px] -mb-3 text-white'>{item.name}</h2>
                  <Progress
                    indicatorColor='bg-[#1E40AF]'
                    className='h-1.5'
                    value={(item.achievementScore / item.goalScore) * 100}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoWorkspace />
          )}
        </TabsContent>
        <TabsContent value='all' className='relative'>
          {allGroupeTabsData?.length !== 0 ? (
            <div>
              {allGroupeTabsData?.map((item: any) => (
                <div key={item.id}>
                  {item.status === workspaceList.inProgress ? (
                    <div
                      className={`w-full h-20 bg-[#60A5FA] rounded-lg flex justify-evenly items-start px-3.5 flex-col my-6 ${
                        item.status === 'FULLY_COMPLETED' && 'opacity-50'
                      }`}
                      onClick={() => handleAlreadyIn(item.id)}
                    >
                      <h2 className='text-[22px] -mb-3 text-white'>
                        {item.name}
                      </h2>
                      <Progress
                        indicatorColor='bg-[#1E40AF]'
                        className='h-1.5'
                        value={(item.achievementScore / item.goalScore) * 100}
                      />
                    </div>
                  ) : (
                    <Dialog
                      key={item.id}
                      open={isFirstDialogOpen}
                      onOpenChange={(open) => {
                        setIsFirstDialogOpen(open);
                        setCurrentWorkspaceId(item.id); // workspaceId 저장
                      }}
                    >
                      <DialogTrigger asChild>
                        <div
                          onClick={() => handleAlreadyIn(item.id)}
                          className='w-full h-20 bg-[#FEF9C3] rounded-lg flex justify-between items-center px-3.5 my-6'
                        >
                          <h1 className='text-[22px]'>{item.name}</h1>
                          <div>
                            <Image src={nextArrow} alt='next-arrow' />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className='w-9/12 rounded-lg h-44 p-0'>
                        <DialogHeader className='flex justify-end'>
                          <DialogTitle className='text-xs'>
                            비밀번호를 입력해주세요
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <div className='w-full h-full'>
                            <form onSubmit={onSubmit}>
                              <div className='mx-8'>
                                <input
                                  type='number'
                                  placeholder='숫자 4자리를 입력해주세요.'
                                  className='bg-[#F3F4F6] w-full h-11 py-4 pl-4 rounded-lg placeholder:text-[10px]'
                                  value={password}
                                  onChange={(e) => handlePassword(e)}
                                />
                              </div>
                              {error && (
                                <span className='ml-8 text-[8px] text-[#EF4444]'>
                                  {error}
                                </span>
                              )}
                              <div
                                className={`w-full border-t-[1px] ${
                                  error ? 'mt-3 pt-3' : 'mt-6 pt-4'
                                } flex justify-around items-center`}
                              >
                                <DialogClose asChild>
                                  <span className='text-sm text-[#D1D5DB]'>
                                    cancel
                                  </span>
                                </DialogClose>

                                <button
                                  type='submit'
                                  className='text-sm text-[#3B82F6]'
                                >
                                  join
                                </button>
                              </div>
                            </form>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <NoWorkspace />
          )}
        </TabsContent>
      </Tabs>
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
