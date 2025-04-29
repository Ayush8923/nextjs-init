import { RequestParams } from "./types";

export const AGE_LIMIT = 21;
export const PAGINATION_SIZE = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today < new Date(birthDate.setFullYear(today.getFullYear())) ? 1 : 0);
  return age;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
};

export const getImagePreviewUrl = (
  event: React.ChangeEvent<HTMLInputElement>
): string => {
  const file = event.target.files?.[0];
  return file ? URL.createObjectURL(file) : "";
};

export const formatDate = (dateString: string, isFullDate: boolean = false) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const options: Intl.DateTimeFormatOptions = { month: "short" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  const year = `’ ${String(date.getFullYear()).slice(2)}`;

  return isFullDate ? `${day} ${month}${year}` : `${month} ${year}`;
};

export const getTotalPages = (pages: number) => {
  const totalPages = Math.ceil((pages || 0) / PAGINATION_SIZE);
  return totalPages;
};

export const todayAsDateInputValue = () =>
  new Date().toISOString().slice(0, 10);

export const formatArrayToLabelValueOptions = (array: []) => {
  return array?.map((item: any) => ({
    label: item,
    value: item,
  }));
};

export const getQueryString = (params: RequestParams = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
};
