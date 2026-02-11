import { Store } from "../types";

const STORE_ID = "2e7ed42a-6aef-4701-9476-51f24c40312f";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://admin-toko-anjani.vercel.app"}/api/stores/${STORE_ID}`;

interface StoreData {
  id: string;
  name: string;
  userId: string;
}

const getStore = async (): Promise<StoreData | null> => {
  try {
    const res = await fetch(API_URL, { 
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.error('Failed to fetch store:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching store:', error);
    return null;
  }
};

export default getStore;
