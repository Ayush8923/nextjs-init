import axios from "@/lib/axios";
import { ProfileUpdateApiData } from "@/lib/types";

const profileUpdate = async ({
  setErrors,
  setIsLoading,
  router,
  ...props
}: ProfileUpdateApiData) => {
  setIsLoading(true);
  setErrors([]);
  axios
    .post("/api/profile/details", props)
    .then((res) => {
      res.data;
      router.push("/profile-details");
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
  router,
  ...props
}: ProfileUpdateApiData) => {
  setIsLoading(true);
  const profileDetailsFormData = new FormData();
  profileDetailsFormData.append(
    "profile_name",
    props?.profileDetailsFormData?.profileName || ""
  );
  if (props?.selectedProfileImage) {
    profileDetailsFormData.append("profile_image", props?.selectedProfileImage);
  }
  axios
    .post("/api/profile/image", profileDetailsFormData)
    .then((res) => {
      res.data;
      router.push("/dashboard");
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
