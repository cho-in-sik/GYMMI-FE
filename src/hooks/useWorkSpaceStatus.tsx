import { create } from 'zustand';

export const useWorkSpaceStatus = create<{
  workSpaceStatus: string;
  updateStatus: (status: string) => void;
  clearData: () => void;
}>((set) => ({
  workSpaceStatus: 'IN_PROGRESS',
  updateStatus: (status: string) =>
    set(() => ({
      workSpaceStatus: status,
    })),
  clearData: () => set({ workSpaceStatus: 'IN_PROGRESS' }),
}));
