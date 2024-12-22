import { useEffect } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

interface IUseInfiniteQuerysProps<TParams, TData> {
  queryKey: any[];
  dataReqFn: (params: TParams & { page: number }) => Promise<TData>;
  params?: TParams;
  inView: boolean;
}

export default function useInfiniteQuerys<
  TParams extends Record<string, any>,
  TData
>({
  queryKey,
  dataReqFn,
  params = {} as TParams,
  inView,
}: IUseInfiniteQuerysProps<TParams, TData>) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    TData,
    Error,
    InfiniteData<TData>
  >({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await dataReqFn({
        ...params,
        page: pageParam as number,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages) => {
      if (lastPage?.data.data) {
        if (lastPage.data.data.length < 10) {
          return undefined;
        }
        return allPages.length;
      }

      if (lastPage?.data) {
        if (lastPage.data.length < 10) {
          return undefined;
        }
        return allPages.length;
      }

      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return data;
}
