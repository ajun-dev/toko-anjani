import { Category } from "../types";

const URL = `https://admin-toko-anjani-a9sj8o9oz-twentyones-projects-d1a10e32.vercel.app/api/76c89a5b-6289-4bc0-bf35-75377fb90aa5/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    
    if (!res.ok) {
      console.error('Failed to fetch category:', res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

export default getCategory;
