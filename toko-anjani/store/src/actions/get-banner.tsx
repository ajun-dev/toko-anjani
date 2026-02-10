import { Banner } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/banners`;

const getBanner = async (id: string): Promise<Banner | null> => {
  try {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });
    
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
