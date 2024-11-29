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
import {
  allWorkspaces,
  alreadyIn,
  joinWorkspace,
  matchPassword,
} from '@/api/workspace';
import { useInfiniteQuery } from '@tanstack/react-query';
import { workspace } from '@/constants/queryKey';

import { workspaceList } from '@/constants/workSpace';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import NoWorkspace from './NoWorkspace';

export default function AllGroupTabs() {
  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(workspaceList.complete);
  const [password, setPassword] = useState('');
  const [task, setTask] = useState('');

  const [error, setError] = useState('');

  const router = useRouter();

  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);

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
      // console.log('lastPage:', lastPage);
      return lastPage?.nextPage || undefined;
    },
  });

  const nextDialog = async (e: any) => {
    e.preventDefault();
    try {
      const res = await matchPassword({
        workspaceId: currentWorkspaceId,
        password,
      });
      console.log(res);

      if (res?.data.sameness === true) {
        setIsFirstDialogOpen(false);
        setIsSecondDialogOpen(true);
      } else {
        setError('잘못된 비밀번호입니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //워크스페이스 아이디 받아서 전해주기
      const res = await joinWorkspace({
        password,
        task,
        workspaceId: currentWorkspaceId,
      });
      console.log(res);
      if (res.status === 200) {
        router.push(`/workspace/${currentWorkspaceId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
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
    const res = await alreadyIn(workspaceId);
    console.log(res);

    if (res.data.isWorker === true) {
      setIsFirstDialogOpen(false);
      router.push(`/workspace/${workspaceId}`);
      return;
    }
    if (res.data.isFull) {
      setIsFirstDialogOpen(false);
      alert('방 인원이 전부 찼습니다!');
    }
  };

  const { ref, inView } = useInView({
    //아래 ref div가 보이고 나서 몇픽셀정도가 호출될건가? -> 보이자마자 호출하기에 0으로 설정
    threshold: 0,
    //아래 ref div가 보이고 나서 몇초후에 이벤트 발생할지
    delay: 0,
  });

  useEffect(() => {
    //처음엔 false 화면에 안보이면 false임, 보이면 true로 변함
    if (inView) {
      //데이터 가져오고 있는데 또 가져오지 않기 위해 isFetching까지
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  //전체적으로 client component 더 분리해보기 (일단 로직 작성 하고 나서 )
  return (
    <>
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
          {data?.pages[0].data.length !== 0 ? (
            <div>
              {data?.pages[0].data.map((item: any) => (
                <Dialog
                  key={item.id}
                  open={isFirstDialogOpen}
                  onOpenChange={(open) => {
                    setError('');
                    setIsFirstDialogOpen(open);
                    setCurrentWorkspaceId(item.id); // workspaceId 저장
                  }}
                >
                  {/* 여기에 온클릭으로 api 확인해보기 */}
                  <DialogTrigger
                    asChild
                    onClick={() => handleAlreadyIn(item.id)}
                  >
                    <div className='w-full h-20 bg-[#FEF9C3] rounded-lg flex justify-between items-center px-3.5 my-6'>
                      <h1 className='text-[22px]'>{item.name}</h1>
                      <div>
                        <Image src={nextArrow} alt='next-arrow' />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='w-9/12 rounded-lg h-44'>
                    <DialogHeader className='text-xs mb-2'>
                      비밀번호를 입력해주세요
                    </DialogHeader>
                    <DialogDescription className=''>
                      <div className='flex justify-center items-center'>
                        <form onSubmit={nextDialog}>
                          <input
                            type='number'
                            placeholder='숫자 4자리를 입력해주세요.'
                            className='bg-[#F3F4F6] w-56 h-[41px] px-2 rounded-lg placeholder:text-[10px]'
                            value={password}
                            onChange={(e) => handlePassword(e)}
                          />
                          {error !== '' && (
                            <span className='text-[8px] text-[#EF4444] pl-4'>
                              {error}
                            </span>
                          )}
                          <div className='flex justify-around items-center border-t-[1px] -mx-6 my-2'>
                            <DialogClose asChild>
                              <span className='text-sm text-[#D1D5DB] py-2 px-12 border-r-[1px]'>
                                cancel
                              </span>
                            </DialogClose>
                            <button
                              type='submit'
                              className='text-sm text-[#3B82F6] py-2 px-12'
                            >
                              next
                            </button>
                          </div>
                        </form>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                  <Dialog
                    open={isSecondDialogOpen}
                    onOpenChange={(open) => {
                      setError('');
                      setIsSecondDialogOpen(open);
                    }}
                  >
                    <DialogContent className='w-9/12 rounded-lg h-40 '>
                      <DialogHeader className='text-xs'>
                        테스크를 입력해주세요
                      </DialogHeader>
                      <DialogDescription className='-mb-4'>
                        <div className='flex justify-center items-center'>
                          <form>
                            <input
                              type='text'
                              placeholder='ex) 1등에게 맛있는 밥 사주기!'
                              className='bg-[#F3F4F6] w-full h-[41px] px-10 rounded-lg placeholder:text-[10px]'
                              value={task}
                              onChange={(e) => setTask(e.target.value)}
                            />
                          </form>
                        </div>
                        {error !== '' ? (
                          <span className='text-[8px] text-[#EF4444] pl-4'>
                            {error}
                          </span>
                        ) : null}
                      </DialogDescription>
                      <DialogFooter>
                        <div className='border-t-[0.5px] w-full flex items-center justify-between  px-8 pt-2.5'>
                          <DialogClose asChild>
                            <span className='text-sm text-[#D1D5DB]'>
                              cancel
                            </span>
                          </DialogClose>

                          <button
                            className='text-sm text-[#3B82F6]'
                            onClick={onSubmit}
                          >
                            join
                          </button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Dialog>
              ))}
            </div>
          ) : (
            <NoWorkspace />
          )}
        </TabsContent>
        <TabsContent value='ing-p' className='relative'>
          {data?.pages[0].data.length !== 0 ? (
            <div>
              {data?.pages[0].data.map((item: any) => (
                <div
                  key={item.id}
                  className='w-full h-20 bg-[#60A5FA] rounded-lg flex justify-evenly items-start px-3.5 flex-col my-6'
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
          {data?.pages[0].data.length !== 0 ? (
            <div>
              {data?.pages[0].data.map((item: any) => (
                <div key={item.key}>
                  {item.status === workspaceList.inProgress ? (
                    <div
                      className='w-full h-20 bg-[#60A5FA] rounded-lg flex justify-evenly items-start px-3.5 flex-col my-6'
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
                      <DialogTrigger
                        asChild
                        onClick={() => handleAlreadyIn(item.id)}
                      >
                        <div className='w-full h-20 bg-[#FEF9C3] rounded-lg flex justify-between items-center px-3.5 my-6'>
                          <h1 className='text-[22px]'>{item.name}</h1>
                          <div>
                            <Image src={nextArrow} alt='next-arrow' />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className='w-9/12 rounded-lg h-44'>
                        <DialogHeader className='text-xs mb-2'>
                          비밀번호를 입력해주세요
                        </DialogHeader>
                        <DialogDescription className=''>
                          <div className='flex justify-center items-center'>
                            <form onSubmit={nextDialog}>
                              <input
                                type='number'
                                placeholder='숫자 4자리를 입력해주세요.'
                                className='bg-[#F3F4F6] w-56 h-[41px] px-2 rounded-lg placeholder:text-[10px]'
                                value={password}
                                onChange={(e) => handlePassword(e)}
                              />
                              {error !== '' && (
                                <span className='text-[8px] text-[#EF4444] pl-4'>
                                  {error}
                                </span>
                              )}
                              <div className='flex justify-around items-center border-t-[1px] -mx-6 my-2'>
                                <DialogClose asChild>
                                  <span className='text-sm text-[#D1D5DB] py-2 px-12 border-r-[1px]'>
                                    cancel
                                  </span>
                                </DialogClose>
                                <button
                                  type='submit'
                                  className='text-sm text-[#3B82F6] py-2 px-12'
                                >
                                  next
                                </button>
                              </div>
                            </form>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                      <Dialog
                        open={isSecondDialogOpen}
                        onOpenChange={(open) => {
                          setError('');
                          setIsSecondDialogOpen(open);
                        }}
                      >
                        <DialogContent className='w-9/12 rounded-lg h-40 '>
                          <DialogHeader className='text-xs'>
                            테스크를 입력해주세요
                          </DialogHeader>
                          <DialogDescription className='-mb-4'>
                            <div className='flex justify-center items-center'>
                              <form>
                                <input
                                  type='text'
                                  placeholder='ex) 1등에게 맛있는 밥 사주기!'
                                  className='bg-[#F3F4F6] w-full h-[41px] px-10 rounded-lg placeholder:text-[10px]'
                                  value={task}
                                  onChange={(e) => setTask(e.target.value)}
                                />
                              </form>
                            </div>
                            {error !== '' ? (
                              <span className='text-[8px] text-[#EF4444] pl-4'>
                                {error}
                              </span>
                            ) : null}
                          </DialogDescription>
                          <DialogFooter>
                            <div className='border-t-[0.5px] w-full flex items-center justify-between  px-8 pt-2.5'>
                              <DialogClose asChild>
                                <span className='text-sm text-[#D1D5DB]'>
                                  cancel
                                </span>
                              </DialogClose>
                              <span
                                className='text-sm text-[#3B82F6]'
                                onClick={onSubmit}
                              >
                                join
                              </span>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
    </>
  );
}
