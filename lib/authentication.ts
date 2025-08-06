import { fetchAPI } from "./api-wrapper";
import { getStrapiURL } from "./get-strapi-url";

// login
export const login = async (identifier: string, password: string) => {
  const path = "/api/auth/local";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  const authToken = process.env.NEXT_PUBLIC_BOOK_NOW_BACKEND_TOKEN;
  const response = await fetchAPI(url.href, {
    method: "POST",
    authToken,
    body: {
      data: {
        identifier,
        password,
      },
    },
  });
  return response;
};
