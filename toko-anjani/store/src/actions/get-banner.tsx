import { Banner } from "../types";

const URL = `${process.env.PUBLIC_API_URL}/banners`;

const getBanner = async (id: string): Promise<Banner | null> => {
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching banner:", error);
    return null;
  }
};

export default getBanner;
