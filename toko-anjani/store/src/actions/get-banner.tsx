import { Banner } from "../types";

const URL = `https://admin-toko-anjani-a9sj8o9oz-twentyones-projects-d1a10e32.vercel.app/api/76c89a5b-6289-4bc0-bf35-75377fb90aa5/banners`;

const getBanner = async (id: string): Promise<Banner | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    
    if (!res.ok) {
      console.error('Failed to fetch banner:', res.status);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};

export default getBanner;
