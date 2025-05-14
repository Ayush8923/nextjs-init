import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import collection from "@/apis/collection";
import { PAGINATION_SIZE } from "@/lib/common";
import { CigarData } from "@/lib/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface UseHumidorCigarsOptions {
  humidorId: number;
  query: string;
  enabled: boolean;
  onInitialLoad?: () => void;
  filters?: { [key: string]: string };
}

export function useHumidorCigars({
  humidorId,
  query,
  enabled,
  onInitialLoad,
  filters,
}: UseHumidorCigarsOptions) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!enabled || !humidorId) return null;
    if (previousPageData && !previousPageData.data.length) return null;

    return JSON.stringify({
      page: pageIndex + 1,
      limit: PAGINATION_SIZE,
      name: query,
      key: "humidor",
      ...filters,
    });
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    async (key) => {
      const keyParams = JSON.parse(key);
      return collection.getHumidorCigars(humidorId, keyParams);
    },
    {
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

  return {
    cigars,
    setSize,
    isLoading,
    isValidating,
    isReachingEnd,
  };
}
