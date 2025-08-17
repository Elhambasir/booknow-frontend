import { fetchAPI } from "@/lib/api-wrapper";
import { getStrapiURL } from "@/lib/get-strapi-url";
import { BookingCreateInterface } from "@/types";
export const createPaypalOrders = async (
  payload: BookingCreateInterface,
  authToken: string
) => {
  const path = `/api/paypal-orders`;
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  const body = {
    data: payload,
  };
  return await fetchAPI(url.href, {
    method: "POST",
    authToken,
    body: body,
  });
};