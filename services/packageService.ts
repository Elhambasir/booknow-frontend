import { IPackage } from '@/types/booking';

const token = 'Bearer 10cab899b4dbefd370551e4bb4342934dffeed4c641344e3115c0ee1f89c21b05494b8ef1f78d6cb5be89c1a5f45733d94654d2eaf6e7ec13135654a86bded9ecf62de80da565b72795dbf98aebd4999f7c655bf63aeef1711d3aa07b84dc6ca225ee012436998b5ac336ff01d7afda675c22216e6c67cdc57d45b1902e53761';
const api = 'https://booknowapi.gmdirecthire.co.uk';

export async function getPackages(): Promise<{ data: IPackage[] } | null> {
  try {
    const response = await fetch(
      `${api}/api/packages/?populate=image&sort[order]=asc`,
      {
        headers: {
          Authorization: token,
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