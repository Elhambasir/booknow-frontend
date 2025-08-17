import React from 'react'
import { getPackages } from "@/services/packageService";
import Index from './_components/Index';

export default async function page() {
  const vehicles = await getPackages();
  return (
    <Index vehicles={vehicles?.data} />
  )
}
