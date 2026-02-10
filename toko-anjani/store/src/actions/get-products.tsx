import qs from "query-string";
import { Product } from "../types";

const URL = `https://admin-toko-anjani-a9sj8o9oz-twentyones-projects-d1a10e32.vercel.app/api/76c89a5b-6289-4bc0-bf35-75377fb90aa5/products`;

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

    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON products response");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts;
