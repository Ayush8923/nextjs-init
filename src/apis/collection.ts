import axios from "@/lib/axios";
import { getQueryString } from "@/lib/common";
import {
  CigarDetailsApiData,
  CreateHumidorData,
  RequestParams,
  UserData,
} from "@/lib/types";

const createHumidor = async ({
  humidorData,
  selectedHumidorImage,
}: CreateHumidorData) => {
  const humidorFormData = new FormData();
  humidorFormData.append("name", humidorData.humidorName);
  humidorFormData.append("type", humidorData.humidorType);
  humidorFormData.append(
    "capacity",
    humidorData.cigarHoldingCapacity?.toString() ?? ""
  );
  humidorFormData.append(
    "humidification_method",
    humidorData.humidificationMethod === "other"
      ? (humidorData.customHumidificationMethod ?? "")
      : (humidorData.humidificationMethod ?? "")
  );
  if (selectedHumidorImage) {
    humidorFormData.append("image", selectedHumidorImage);
  }
  const response = await axios.post("/api/humidors", humidorFormData);
  return response?.data;
};

const getHumidors = async (params: RequestParams = {}) => {
  const url = `/api/humidors?${getQueryString(params)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const storeCigar = async ({
  cigarDetails,
  humidorId,
  cigarId,
}: CigarDetailsApiData) => {
  const apiUrl = `/api/humidors/${humidorId}/cigars/${cigarId}`;
  await axios.put(apiUrl, cigarDetails);
};

const getCigarsMeta = async () => {
  try {
    const res = await axios.get("/api/cigars/options");
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const create = async ({ cigarDetails, image }: CigarDetailsApiData) => {
  const formData = new FormData();

  const {
    name,
    brand,
    manufacturer,
    origin,
    wrapper,
    binder,
    filler,
    vitola,
    strength,
    color,
    length,
    ringGauge,
    flavour,
  } = cigarDetails;

  const fields: Record<string, string | undefined> = {
    name,
    brand,
    manufacturer,
    origin,
    wrapper,
    binder,
    filler,
    vitola,
    strength,
    color,
    dimensions: `${length} x ${ringGauge}`,
  };

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });

  (flavour?.split(/[\s,]+/) ?? []).forEach((f) => {
    formData.append("flavour[]", f);
  });

  if (image) {
    formData.append("image", image);
  }

  const { data } = await axios.post("/api/cigars", formData);
  return data;
};

const getUserCigars = async (params: RequestParams = {}, user: UserData) => {
  const url = `/api/users/${user?.id}/cigars?${getQueryString(params)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const getCigarById = async (user: UserData, cigarId: number) => {
  try {
    const url = `/api/users/${user?.id}/cigars/${cigarId}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const getHumidorById = async (humidorId: number) => {
  try {
    const url = `/api/humidors/${humidorId}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const getHumidorCigars = async (
  humidorId: number,
  keyParams: RequestParams = {}
) => {
  try {
    const url = `/api/humidors/${humidorId}/cigars?${getQueryString(keyParams)}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const deleteHumidor = async (humidorId: number) => {
  const response = await axios.delete(`/api/humidors/${humidorId}`);
  return response?.data;
};

const deleteCigarFromHumidor = async (cigarId: number) => {
  const response = await axios.delete(`/api/humidor-cigar/${cigarId}`);
  return response?.data;
};

const finishCigar = async (cigarId: number) => {
  const response = await axios.post(`/api/humidor-cigar/${cigarId}/finished`);
  return response?.data;
};

export default {
  createHumidor,
  getHumidors,
  storeCigar,
  getCigarsMeta,
  create,
  getUserCigars,
  getCigarById,
  getHumidorById,
  getHumidorCigars,
  deleteHumidor,
  deleteCigarFromHumidor,
  finishCigar,
};
