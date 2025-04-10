import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { removeCookie } from "@/lib/cookieService";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

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
      await axios.post("/logout").then(async () => {
        mutate(null, false);
        await removeCookie("authToken");
      });
    }

    window.location.href = redirectUrl;
  };

  const socialLogin = (provider) => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/${provider}`;
  };

  const updateDob = async ({ setErrors, setIsLoading, ...props }) => {
    axios
      .post("/api/profile/dob", props)
      .then((res) => {
        res.data;
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRedirectPathIfAuthenticated = (redirectIfAuthenticated) => {
    if (user && !user.email_verified_at) return "/verify-email";
    if (!user?.country || !user?.state) return "/account-details";
    if (!user?.profile_handle) return "/profile-details";
    return redirectIfAuthenticated;
  };

  const isAdminMiddleware = () => middleware === "admin";
  const isGuestOrAuthMiddleware = () =>
    middleware === "guest" || middleware === "auth";
  const isAdminRoute = () => pathname.startsWith("/admin");
  const isVerifyEmailPage = () => pathname === "/verify-email";
  const isUserAdmin = () => user?.roles?.some((role) => role.name === "admin");

  const handleUnauthenticatedAccess = () => {
    if (isAdminMiddleware()) {
      router.replace("/admin/login");
    } else if (middleware === "auth") {
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (isGuestOrAuthMiddleware() && user && !user.dob) {
      router.push("/consent");
      return;
    }

    if (isGuestOrAuthMiddleware() && redirectIfAuthenticated && user)
      router.push(getRedirectPathIfAuthenticated(redirectIfAuthenticated));

    if (isAdminMiddleware() && redirectIfAuthenticated && user && isUserAdmin())
      router.push(redirectIfAuthenticated);

    if (isAdminRoute() && user && !isUserAdmin()) router.push("/admin");

    if (isVerifyEmailPage() && user?.email_verified_at)
      router.push(redirectIfAuthenticated);

    if (isAdminRoute()) {
      if (user && !isUserAdmin()) {
        window.location.href = "/login";
      }

      if (!user && error) {
        handleUnauthenticatedAccess();
        return;
      }
    }

    if (!user && error) {
      handleUnauthenticatedAccess();
      return;
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
    socialLogin,
    updateDob,
    isUserAdmin,
  };
};
