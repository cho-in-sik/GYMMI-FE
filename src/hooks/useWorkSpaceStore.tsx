import { IW, IWorkspaceInputs } from '@/types/workSpace';
import { create } from 'zustand';

const initialValue = {
  name: '',
  headCount: '',
  goalScore: '',
  description: '',
  tag: '',
  missionBoard: [
    { id: 0, mission: '', placeholder: 'ex 풀업 10회', score: 0 },
    { id: 1, mission: '', placeholder: 'ex 벤치프레스 10회', score: 0 },
    { id: 2, mission: '', placeholder: 'ex 스쿼트 10회', score: 0 },
    { id: 3, mission: '', placeholder: 'ex 러닝 20분', score: 0 },
    { id: 4, mission: '', placeholder: 'ex 런지 10회', score: 0 },
  ],
  task: '',
  checked: false,
};

export const useWorkSpaceStore = create<IW>((set) => ({
  groupMaker: initialValue,
  add1Page: ({ name, headCount, checked }: IWorkspaceInputs) =>
    set((state) => ({
      groupMaker: { ...state.groupMaker, name, headCount, checked },
    })),
  add2Page: ({ missionBoard, goalScore }: IWorkspaceInputs) =>
    set((state) => ({
      groupMaker: {
        ...state.groupMaker,
        missionBoard,
        goalScore,
      },
    })),
  add3Page: ({ task, tag, description }: IWorkspaceInputs) =>
    set((state) => ({
      groupMaker: {
        ...state.groupMaker,
        task,
        description,
        tag,
      },
    })),
  clearData: () => set({ groupMaker: initialValue }),
}));
