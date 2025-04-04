import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, setIsLoading, ...props }) => {
    setIsLoading(true);
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = async ({ setErrors, setStatus, setIsLoading, ...props }) => {
    setIsLoading(true);
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    setIsLoading,
    email,
  }) => {
    setIsLoading(true);
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    setIsLoading,
    ...props
  }) => {
    setIsLoading(true);
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resendEmailVerification = ({ setStatus, setIsLoading }) => {
    setIsLoading(true);
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async (redirectUrl) => {
    if (!error) {
      await axios.post("/logout").then(() => mutate(null, false));
    }

    router.replace(redirectUrl);
  };

  const getRedirectPathIfAuthenticated = (redirectIfAuthenticated) => {
    if (user && !user.email_verified_at) return "/verify-email";
    if (!user?.first_name) return "/account-details";
    if (!user?.profile_handle) return "/profile-details";
    return redirectIfAuthenticated;
  };

  useEffect(() => {
    if (
      (middleware === "guest" || middleware === "auth") &&
      redirectIfAuthenticated &&
      user
    )
      router.push(getRedirectPathIfAuthenticated(redirectIfAuthenticated));

    if (middleware === "admin" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);

    if (!user && error) {
      if (middleware === "admin") {
        router.replace("/admin/login");
      } else if (middleware === "auth") {
        router.replace("/login");
      }
    }
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
