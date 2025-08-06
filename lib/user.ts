import { fetchAPI } from "@/lib/api-wrapper";
import { getStrapiURL } from "@/lib/get-strapi-url";
import qs from "qs";
import { currentUser } from "@/lib/utils";
import { TripType } from "@/types";
// Get user by id
export const getUserById = async (id: string) => {
  const path = `/api/users/${id}`;
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  const authToken = process.env.BOOK_NOW_BACKEND_TOKEN;
  return await fetchAPI(url.href, {
    method: "GET",
    authToken,
  });
};
// Get user by identifier
export const getUserByIdentifier = async (identifier: string) => {
  const path = "/api/auth/local";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  return await fetchAPI(url.href, {
    method: "GET",
    body: {
      identifier,
    },
  });
};

export const getUserProfile = async () => {
  const user = await currentUser();
  const query = qs.stringify({
    populate: ["user_detail"],
  });
  const path = "/api/users/me?" + query;
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  if (!user) return null;
  if (!user.jwt) return null;
  if (!user.id) return null;
  return await fetchAPI(url.href, {
    method: "GET",
    authToken: user.jwt,
  });
};

export const getBookings = async ({
    searchParams,
  }: {
    searchParams: { page: string; pageSize: string }
  }) => {
    const user = await currentUser()
    if (!user) return null
    if (!user?.jwt) return null
    const query = qs.stringify(
      {
        populate: {
          package: true,
          return: true,
        },
        pagination: {
          page: searchParams?.page || 1,
          pageSize: searchParams?.pageSize || 3,
        },
        filters: {
          user: {
            id: {
              $eq: user?.id,
            },
          },
          $or: [
            {
              booking: {
                $null: true,
              },
            },
          ],
        },
        sort: ['id:desc'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    const path = `/api/bookings?${query}`;
    const BASE_URL = getStrapiURL();
    const url = new URL(path, BASE_URL);
    return await fetchAPI<TripType>(url.href, {
        method: "GET",
        authToken: user.jwt,
    });
  }