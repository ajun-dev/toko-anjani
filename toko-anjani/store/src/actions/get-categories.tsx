import { Category } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    if (!process.env.PUBLIC_API_URL) {
      throw new Error("PUBLIC_API_URL is not configured");
    }

    const res = await fetch(URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;
