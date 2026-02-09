import qs from "query-string";
import { Product } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    if (!process.env.PUBLIC_API_URL) {
      throw new Error("PUBLIC_API_URL is not configured");
    }

    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProducts;
