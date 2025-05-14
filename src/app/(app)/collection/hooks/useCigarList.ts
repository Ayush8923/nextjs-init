import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import collection from "@/apis/collection";
import { PAGINATION_SIZE } from "@/lib/common";
import { CigarData } from "@/lib/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { UserData } from "@/lib/types";

interface UseCigarListOptions {
  query: string;
  user: UserData;
  enabled: boolean;
  onInitialLoad?: () => void;
  filters?: { [key: string]: string };
}

export function useCigarList({
  query,
  user,
  enabled,
  onInitialLoad,
  filters,
}: UseCigarListOptions) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!enabled || !user) return null;
    if (previousPageData && !previousPageData.data.length) return null;

    return [
      { page: pageIndex + 1, limit: PAGINATION_SIZE, name: query, ...filters },
      user,
    ];
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    collection.getUserCigars,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: onInitialLoad,
    }
  );

  const cigars: CigarData[] = data
    ? [].concat(...data.map((page) => page.data))
    : [];

  const isReachingEnd =
    data && data[data.length - 1]?.data.length < PAGINATION_SIZE;

  const isLoading = !data && !error && enabled;

  useInfiniteScroll({
    isLoading: isValidating,
    hasMore: !isReachingEnd,
    onLoadMore: () => setSize((prev) => prev + 1),
  });

  useEffect(() => {
    if (enabled) setSize(1);
  }, [query, enabled]);

  return { cigars, setSize, isLoading, isValidating };
}
