import { Category } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    if (!process.env.PUBLIC_API_URL) {
      throw new Error("PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${URL}/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export default getCategory;
