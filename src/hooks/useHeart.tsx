import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useHeart({
  id,
  queryKey,
  bookmarkFn,
  initialBookmarkState,
  initialCount,
}: {
  id: number | string;
  queryKey: string;
  bookmarkFn: (id: number | string) => Promise<any>;
  initialBookmarkState: boolean;
  initialCount: number;
}) {
  const queryClient = useQueryClient();
  const [like, setLike] = useState(initialBookmarkState);
  const [count, setCount] = useState(initialCount);

  const mutation = useMutation({
    mutationFn: async () => bookmarkFn(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKey, id] });

      const previousData = queryClient.getQueryData([queryKey, id]);

      queryClient.setQueryData([queryKey, id], (prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          hasMyThumbsUp: !like,
          thumpsUpCount: prev.thumpsUpCount + (like ? -1 : 1),
        };
      });

      setLike((prev) => !prev);
      setCount((prev) => prev + (like ? -1 : 1)); // 즉시 반영

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKey, id], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, id] });
    },
  });

  useEffect(() => {
    setLike(initialBookmarkState);
    setCount(initialCount);
  }, [initialBookmarkState, initialCount]);

  const toggleBookmark = () => {
    mutation.mutate();
  };

  return { like, toggleBookmark, count };
}
