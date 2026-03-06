import qs from "query-string";
import { Product } from "../types";

const URL = `https://admin-toko-anjani-2eahvn7ax-twentyones-projects-d1a10e32.vercel.app/api/2e7ed42a-6aef-4701-9476-51f24c40312f/products`;

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
