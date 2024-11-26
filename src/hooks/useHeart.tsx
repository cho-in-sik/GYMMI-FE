import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedHeart } from '@/api/photoCommunity';

export default function useBookmark({
  id,
  queryKey,
  bookmarkFn,
  initialBookmarkState,
}: {
  id: any;
  queryKey: string;
  bookmarkFn: (id: any) => Promise<any>;
  initialBookmarkState: boolean | null;
}) {
  const queryClient = useQueryClient();
  const [like, setLike] = useState(initialBookmarkState || false);

  const mutation = useMutation({
    mutationFn: async () => {
      await bookmarkFn(id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [queryKey, id],
      });

      const prevDetails = queryClient.getQueryData([queryKey, id]);

      queryClient.setQueryData([queryKey, id], (prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
        };
      });

      return { prevDetails };
    },
    onError: (_error, _, context) => {
      if (context?.prevDetails) {
        queryClient.setQueryData([queryKey, id], context.prevDetails);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey, id],
      });
    },
  });

  // `initialBookmarkState` 값이 변경될 때 (즉, 서버에서 받아온 `data.bookmark`가 로드될 때) `like` 상태를 업데이트
  useEffect(() => {
    if (initialBookmarkState !== null) {
      setLike(initialBookmarkState);
    }
  }, [initialBookmarkState]);

  const toggleBookmark = () => {
    mutation.mutate();
    setLike((prev) => !prev); // 낙관적으로 상태를 업데이트
  };

  return {
    like,
    toggleBookmark,
  };
}
