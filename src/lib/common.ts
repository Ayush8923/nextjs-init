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
