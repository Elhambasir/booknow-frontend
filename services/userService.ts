import { fetchAPI } from "@/lib/api-wrapper";
import qs from "qs";
import { BookingSelectInterface, TripType } from "@/types";
import { currentUser } from "@/lib/utils";
import { serverConfig } from "@/lib/config/server";
const BASE_URL = serverConfig.NEXT_PUBLIC_API_URL;
export const RescheduleBooking = async (
  payload: {
    date: any;
    time: string;
    return_date?: any;
    return_time?: string;
  },
  documentId: string,
  authToken: string
) => {
  const path = `/api/bookings/${documentId}`;
  const url = new URL(path, BASE_URL);
  const body = {
    data: {
      ...payload,
    },
  };
  return await fetchAPI(url.href, {
    method: "PUT",
    authToken,
    body: body,
  });
};
export const cancelBooking = async (id: string, reason: string, authToken: string) => {
  const path = `/api/bookings/cancel-by-customer/${id}`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI<BookingSelectInterface>(url.href, {
    method: "POST",
    authToken,
    body: {
      data: {
        reason: reason,
      }
    }
  });
}

export const getUserBookings = async ({
  searchParams,
}: {
  searchParams: { page: string; pageSize: string };
}) => {
  const user = await currentUser();
  if (!user) return null;
  if (!user?.jwt) return null;
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
      sort: ["id:desc"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const path = `/api/bookings?${query}`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI<BookingSelectInterface>(url.href, {
    method: "GET",
    authToken: user.jwt,
  });
};

export const createUserDetails = async (
  payload: {
    phone_number: string;
    birth_date: Date;
    gender: string;
    user: number;
  },
  authToken: string
) => {
  const path = `/api/user-details`;
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
export const updateUserDetails = async (
  payload: {
    phone_number: string;
    birth_date: Date;
    gender: string;
  },
  documentId: string,
  authToken: string
) => {
  const path = `/api/user-details/${documentId}`;
  const url = new URL(path, BASE_URL);
  const body = {
    data: {
      ...payload,
    },
  };
  return await fetchAPI(url.href, {
    method: "PUT",
    authToken,
    body: body,
  });
};
export const updateUser = async (
  payload: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  },
  id: number,
  authToken: string
) => {
  const path = `/api/users/${id}`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "PUT",
    authToken,
    body: payload,
  });
};

// Get user by id
export const getUserById = async (id: string, authToken: string) => {
  const path = `/api/users/${id}?populate[user_detail]=true`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI(url.href, {
    method: "GET",
    authToken,
  });
};
// Get user by identifier
export const getUserByIdentifier = async (identifier: string) => {
  const path = "/api/auth/local";
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
  searchParams: { page: string; pageSize: string };
}) => {
  const user = await currentUser();
  if (!user) return null;
  if (!user?.jwt) return null;
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
      sort: ["id:desc"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const path = `/api/bookings?${query}`;
  const url = new URL(path, BASE_URL);
  return await fetchAPI<TripType>(url.href, {
    method: "GET",
    authToken: user.jwt,
  });
};
