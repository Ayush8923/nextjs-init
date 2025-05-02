import collection from "@/apis/collection";
import { UserData } from "@/lib/types";
import useSWR from "swr";

type UserCigarProps = {
  user: UserData;
  cigarId: number;
};

export const useCigar = ({ user, cigarId }: UserCigarProps) => {
  const shouldFetch = user && cigarId;

  const { data, error, mutate } = useSWR(
    shouldFetch ? `/api/users/${user.id}/cigars/${cigarId}` : null,
    () => collection.getCigarById(user, cigarId)
  );

  return {
    cigar: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
