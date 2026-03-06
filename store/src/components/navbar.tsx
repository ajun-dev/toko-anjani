import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import getStore from "@/actions/get-store";

export const revalidate = 0;

const Navbar = async () => {
  const [categories, store] = await Promise.all([
    getCategories(),
    getStore()
  ]);

  const storeName = store?.name || "TOKO ANJANI";

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-8 gap-x-2">
            <p className="font-bold text-xl">{storeName}</p>
          </Link>
          <MainNav data={categories} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
