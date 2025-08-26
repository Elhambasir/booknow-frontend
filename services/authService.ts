import { fetchAPI } from "@/lib/api-wrapper";
import { clientConfig } from "@/lib/config";

const BASE_URL = clientConfig.NEXT_PUBLIC_API_URL;

export const ChangeMyPassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
  authToken: string
) => {
  const path = `/api/auth/change-password`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "POST",
    body: {
      currentPassword,
      password,
      passwordConfirmation,
    },
    authToken,
  });
};
export const ResetMyPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  const path = `/api/auth/reset-password`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "POST",
    body: {
      code,
      password,
      passwordConfirmation,
    },
  });
};
export const SendOtp = async (email: string) => {
  const path = `/api/auth/send-email-confirmation`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "POST",
    body: {
      email,
    },
  });
};
export const ConfirmEmail = async (otp: string) => {
  const path = `/api/auth/email-confirmation?otp=${otp}`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "GET",
  });
};
