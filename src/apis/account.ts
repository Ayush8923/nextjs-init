import axios from "@/lib/axios";
import { ProfileUpdateApiData } from "@/lib/types";

const profileUpdate = async ({ ...props }: ProfileUpdateApiData) => {
  const response = await axios.post("/api/profile/details", props);
  return response?.data;
};

const profileImageUpdate = async ({ ...props }: ProfileUpdateApiData) => {
  const profileDetailsFormData = new FormData();
  profileDetailsFormData.append(
    "profile_handle",
    props?.profileDetailsFormData?.profileHandle || ""
  );
  if (props?.selectedProfileImage) {
    profileDetailsFormData.append("profile_image", props?.selectedProfileImage);
  }
  const response = await axios.post(
    "/api/profile/image",
    profileDetailsFormData
  );
  return response?.data;
};

export default {
  profileUpdate,
  profileImageUpdate,
};
