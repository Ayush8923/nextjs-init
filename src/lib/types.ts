export type ConsentFormData = {
  dob: string;
};

export type SignUpFormData = {
  email: string;
  dob: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type PasswordResetFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type AccountDetailsFormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  email: string;
  phoneNumber: string;
  referredBy?: string;
  country?: { name: string };
  state?: { name: string };
};

export type ProfileDetailsFormData = {
  profileImage?: any;
  profileHandle?: any;
};

export type CountryData = {
  id: number;
};

export type ProfileUpdateApiData = {
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  country?: string;
  state?: string;
  phone?: string;
  suffix?: string;
  referred_by?: string;
  profileDetailsFormData?: {
    profileHandle?: string;
  };
  selectedProfileImage?: any;
};

export type CigarData = {
  name: string;
  vitola: string;
  dimensions: string;
  wrapper: string;
  brand: string;
  filler: string;
  origin: string;
  strength: string;
  flavour: string;
  manufacturer: string;
  rating: string;
};

export type AdminApiProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
