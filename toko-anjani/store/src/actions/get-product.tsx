import { Product } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch product:', res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export default getProduct;
