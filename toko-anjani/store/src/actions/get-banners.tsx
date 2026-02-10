import { Banner } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/banners`;

const getBanners = async (): Promise<Banner[]> => {
  try {
    const res = await fetch(URL, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch banners:', res.status);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

export default getBanners;
