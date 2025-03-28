export const AGE_LIMIT = 21;

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
