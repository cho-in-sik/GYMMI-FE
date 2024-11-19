import { useState } from 'react';

export default function useWorkoutHistoryIds() {
  const [workoutHistoryIds, setWorkoutHistoryIds] = useState<number[]>([]);
  const toggleWorkoutHistoryIds = (id: number) => {
    setWorkoutHistoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWorkoutHistory = (id: number) => {
    toggleWorkoutHistoryIds(id);
  };

  return { workoutHistoryIds, handleWorkoutHistory };
}
