import { Banner } from "../types";

const URL = `https://admin-toko-anjani-a9sj8o9oz-twentyones-projects-d1a10e32.vercel.app/api/76c89a5b-6289-4bc0-bf35-75377fb90aa5/banners`;

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
