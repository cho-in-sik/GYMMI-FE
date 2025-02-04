import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { TabsContent } from '@radix-ui/react-tabs';

import nextArrow from '@/../public/svgs/nextArrow.svg';
import { alreadyIn, joinWorkspace } from '@/api/workspace';
import { IAllGroupeTabsDataProps } from '@/types/workSpace';
import NoWorkspace from './NoWorkspace';

interface IBeforePProps {
  allGroupeTabsData: IAllGroupeTabsDataProps[];
}

export default function BeforeP({ allGroupeTabsData }: IBeforePProps) {
  const router = useRouter();

  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(0);

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
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
  // 훅으로 빼기
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

  return (
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
                          <span className='text-sm text-[#D1D5DB]'>cancel</span>
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
  );
}
