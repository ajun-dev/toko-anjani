import { Banner } from "../types";

const URL = `https://admin-toko-anjani-2eahvn7ax-twentyones-projects-d1a10e32.vercel.app/api/2e7ed42a-6aef-4701-9476-51f24c40312f/banners`;

const getBanners = async (): Promise<Banner[]> => {
  try {
    const res = await fetch(URL, { 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch banners:', res.status, res.statusText);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON banners response");
      return [];
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

export default getBanners;
