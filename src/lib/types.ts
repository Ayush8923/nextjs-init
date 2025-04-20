import { Dispatch, SetStateAction } from "react";

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
  setErrors: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  id: number;
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
  image_url: string;
};

export type AdminApiProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type AddingHumidorFormData = {
  humidorName: string;
  humidorType: string;
  cigarHoldingCapacity?: number;
  humidificationMethod: string;
  customHumidificationMethod?: string;
};

export type CreateHumidorData = {
  setError: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  router: any;
  humidorData: AddingHumidorFormData;
  selectedHumidorImage?: File | null;
};

export type MembersData = {
  first_name: string;
  last_name: string;
  profile_handle: string;
  state: string;
  email: string;
  phone: string;
  dob: string;
  referred_by: string;
  user_cigars_count: string;
};

export type CigarDetailsFormData = {
  id?: number;
  humidorId?: number;
  name?: string;
  manufacturer?: string;
  origin?: string;
  quantity?: number;
  price?: number;
  addedAt?: string;
  rating?: string;
  image_url?: string;
  brand?: string;
  vitola?: string;
  length?: string;
  ringGauge?: string;
  strength?: string;
  wrapper?: string;
  binder?: string;
  filler?: string;
  color?: string;
  flavour?: string;
};

export type CigarDetailsApiData = {
  cigarDetails: CigarDetailsFormData;
  humidorId?: number;
  cigarId?: number;
  image?: File | null;
};
