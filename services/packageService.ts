import { IPackage } from '@/types';

const token = process.env.BOOK_NOW_BACKEND_TOKEN;
const api =  process.env.NEXT_PUBLIC_API_URL;

export async function getPackages(): Promise<{ data: IPackage[] } | null> {
  try {
    const response = await fetch(
      `${api}/api/packages/?populate=image&sort[order]=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    return null;
  }
}