import { fetchAPI } from "@/lib/api-wrapper";
import { getStrapiURL } from "@/lib/get-strapi-url";

export const ChangeMyPassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
  authToken: string
) => {
  const path = `/api/auth/change-password`;
  const BASE_URL = getStrapiURL();
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
  const BASE_URL = getStrapiURL();
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
  const BASE_URL = getStrapiURL();
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
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "GET",
  });
};
