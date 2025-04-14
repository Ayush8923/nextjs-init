import axios from "@/lib/axios";
import { CreateHumidorData } from "@/lib/types";

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
    await axios.post("/api/humidor", humidorFormData);
    router.push("/collection/add-humidor/saved");
  } catch (error: any) {
    if (error.response?.status !== 422) throw error;
    setError(error.response.data.errors);
  } finally {
    setIsLoading(false);
  }
};

export default {
  createHumidor,
};
