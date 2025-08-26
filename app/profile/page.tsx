import React from 'react'
import UserProfilePage from './_components/Index'
import { getUserById } from '@/services/userService';
import { auth } from '@/auth';
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string,
  }>;
}) {
  const { tab } = await searchParams;
  const session = await auth();
  const user =  await getUserById(session?.user.id, session?.user.jwt);
 
  return (
    <UserProfilePage userDetails={user} tab={tab} />
  )
}
