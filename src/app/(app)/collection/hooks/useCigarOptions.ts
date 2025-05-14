import collection from "@/apis/collection";
import useSWR from "swr";

export const useCigarOptions = () => {
  const { data, error } = useSWR(
    "/api/cigars/options",
    collection.getCigarsMeta
  );

  return {
    cigarOptionsData: data,
    isLoading: !error && !data,
  };
};
