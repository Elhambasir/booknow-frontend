// hooks/useBookings.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api-wrapper";
import { getStrapiURL } from "@/lib/get-strapi-url";
import qs from "qs";
import { BookingSelectInterface } from "@/types";
import { useSession } from "next-auth/react";

interface BookingsQueryParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export const useBookings = ({
  page = 1,
  pageSize = 3,
  status = "all",
  search = "",
}: BookingsQueryParams = {}) => {
  const { data: session } = useSession();

  const fetchBookings = async () => {
    if (!session?.user?.jwt) return null;

    const query = qs.stringify(
      {
        populate: {
          package: true,
          return: true,
        },
        pagination: {
          page,
          pageSize,
        },
        filters: {
          user: {
            id: {
              $eq: session.user.id,
            },
          },
          $or: [
            {
              booking: {
                $null: true,
              },
            },
          ],
          ...(status !== "all" && {
            booking_status: {
              $eq: status,
            },
          }),
          ...(search && {
            $or: [
              {
                from: {
                  address: {
                    $containsi: search,
                  },
                },
              },
              {
                to: {
                  address: {
                    $containsi: search,
                  },
                },
              },
            ],
          }),
        },
        sort: ["id:desc"],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const path = `/api/bookings?${query}`;
    const BASE_URL = getStrapiURL();
    const url = new URL(path, BASE_URL);
    return await fetchAPI<{
      data: BookingSelectInterface[];
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    }>(url.href, {
      method: "GET",
      authToken: session.user.jwt,
    });
  };

  return useQuery({
    queryKey: ["bookings", { page, pageSize, status, search }],
    queryFn: fetchBookings,
    enabled: !!session?.user?.jwt,
  });
};