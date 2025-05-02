import axios from "@/lib/axios";
import { ProfileUpdateApiData } from "@/lib/types";

const profileUpdate = async ({
  setErrors,
  setIsLoading,
  ...props
}: ProfileUpdateApiData) => {
  setIsLoading(true);
  setErrors([]);
  axios
    .post("/api/profile/details", props)
    .then((res) => {
      res.data;
      window.location.href = "/profile-details";
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      setErrors(error.response.data.errors);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

const profileImageUpdate = async ({
  setErrors,
  setIsLoading,
  ...props
}: ProfileUpdateApiData) => {
  setIsLoading(true);
  const profileDetailsFormData = new FormData();
  profileDetailsFormData.append(
    "profile_handle",
    props?.profileDetailsFormData?.profileHandle || ""
  );
  if (props?.selectedProfileImage) {
    profileDetailsFormData.append("profile_image", props?.selectedProfileImage);
  }
  axios
    .post("/api/profile/image", profileDetailsFormData)
    .then((res) => {
      res.data;
      window.location.replace("/dashboard");
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      setErrors(error.response.data.errors);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default {
  profileUpdate,
  profileImageUpdate,
};
