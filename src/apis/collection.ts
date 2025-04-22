import axios from "@/lib/axios";
import { getQueryString } from "@/lib/common";
import {
  CigarDetailsApiData,
  CreateHumidorData,
  RequestParams,
  UserData,
} from "@/lib/types";

const createHumidor = async ({
  setError,
  setIsLoading,
  router,
  humidorData,
  selectedHumidorImage,
}: CreateHumidorData) => {
  setIsLoading(true);
  setError([]);
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

  try {
    await axios.post("/api/humidors", humidorFormData);
    router.replace("/collection/humidors/add/saved");
  } catch (error: any) {
    if (error.response?.status !== 422) throw error;
    setError(error.response.data.errors);
    setIsLoading(false);
  }
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
  const url = `/api/users/${user?.id}/cigars/?${getQueryString(params)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

export default {
  createHumidor,
  getHumidors,
  storeCigar,
  getCigarsMeta,
  create,
  getUserCigars,
};
