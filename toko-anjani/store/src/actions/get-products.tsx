import qs from "query-string";
import { Product } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts;
