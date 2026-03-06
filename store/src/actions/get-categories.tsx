import { Category } from "../types";

const URL = `https://admin-toko-anjani-2eahvn7ax-twentyones-projects-d1a10e32.vercel.app/api/2e7ed42a-6aef-4701-9476-51f24c40312f/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);
    
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON categories response");
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default getCategories;
