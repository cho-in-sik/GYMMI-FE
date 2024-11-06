import { create } from 'zustand';

type TMission = {
  id: number;
  mission: string;
  score: number;
  count: number;
};

type TWorkoutInfo = {
  imageUrl: string;
  comment: string;
  willLink: boolean;
  missions: TMission[];
};

interface IW {
  workoutInfo: TWorkoutInfo;
  updateMission: (mission: TMission) => void;
  clearData: () => void;
}

const initialValue: TWorkoutInfo = {
  imageUrl: '',
  comment: '',
  willLink: true,
  missions: [],
};

export const useWorkoutStore = create<IW>((set) => ({
  workoutInfo: initialValue,
  updateMission: (mission: TMission) =>
    set((state) => {
      const existingMissionIndex = state.workoutInfo.missions.findIndex(
        (m) => m.id === mission.id,
      );

      let updatedMissions;
      if (mission.count === 0) {
        updatedMissions = state.workoutInfo.missions.filter(
          (m) => m.id !== mission.id,
        );
      } else if (existingMissionIndex > -1) {
        updatedMissions = state.workoutInfo.missions.map((m) =>
          m.id === mission.id ? mission : m,
        );
      } else {
        updatedMissions = [...state.workoutInfo.missions, mission];
      }

      return {
        workoutInfo: { ...state.workoutInfo, missions: updatedMissions },
      };
    }),
  clearData: () => set({ workoutInfo: initialValue }),
}));
