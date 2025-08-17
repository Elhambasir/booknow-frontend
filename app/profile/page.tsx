import React from 'react'
import UserProfilePage from './_components/Index'
import { getUserBookings, getUserById } from '@/lib/user'
import { auth } from '@/auth';
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string,
    page: string,
    pageSize: string,
  }>;
}) {
  const { tab, page, pageSize } = await searchParams;
  const session = await auth();
  const user =  await getUserById(session?.user.id, session?.user.jwt);
  const userBookings = await getUserBookings( { searchParams: {
    page, pageSize
  }} );
  return (
    <UserProfilePage userDetails={user} tab={tab} userBooking={userBookings.data} />
  )
}
