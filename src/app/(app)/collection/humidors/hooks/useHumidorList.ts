import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import collection from "@/apis/collection";
import { PAGINATION_SIZE } from "@/lib/common";
import { HumidorsData } from "@/lib/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface UseHumidorListOptions {
  query: string;
  enabled: boolean;
  onInitialLoad?: () => void;
}

export function useHumidorList({
  query,
  enabled,
  onInitialLoad,
}: UseHumidorListOptions) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!enabled) return null;
    if (previousPageData && !previousPageData.data.length) return null;
    return {
      page: pageIndex + 1,
      limit: PAGINATION_SIZE,
      name: query,
    };
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    collection.getHumidors,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: onInitialLoad,
    }
  );

  const humidors: HumidorsData[] = data
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

  return { humidors, isLoading, isValidating };
}
