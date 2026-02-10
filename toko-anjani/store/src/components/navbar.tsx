import Link from "next/link";
import Image from "next/image";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-8 gap-x-2 items-center">
            <Image
              src="/logo.svg"
              alt="Toko Anjani Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="hidden sm:inline font-bold text-lg">TOKO ANJANI</span>
          </Link>
          <MainNav data={categories} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
