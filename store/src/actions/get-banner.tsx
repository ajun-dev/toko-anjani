import { Banner } from "../types";

const URL = `https://admin-toko-anjani-2eahvn7ax-twentyones-projects-d1a10e32.vercel.app/api/2e7ed42a-6aef-4701-9476-51f24c40312f/banners`;

const getBanner = async (id: string): Promise<Banner | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    
    if (!res.ok) {
      console.error('Failed to fetch banner:', res.status);
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON banner response");
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};

export default getBanner;
