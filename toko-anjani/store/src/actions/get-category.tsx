import { Category } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });
    
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
