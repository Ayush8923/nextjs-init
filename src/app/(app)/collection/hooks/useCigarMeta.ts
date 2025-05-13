import collection from "@/apis/collection";
import useSWR from "swr";

export const useCigarMeta = () => {
  const { data, error } = useSWR("/api/cigars/meta", collection.getCigarsMeta);

  return {
    cigarMetaData: data,
    isLoading: !error && !data,
  };
};
