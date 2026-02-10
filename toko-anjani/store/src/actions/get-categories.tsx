import { Category } from "../types";

const URL = `https://admin-toko-anjani-a9sj8o9oz-twentyones-projects-d1a10e32.vercel.app/api/76c89a5b-6289-4bc0-bf35-75377fb90aa5/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);
    
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default getCategories;
