import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await db.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Image
          src="/logo.svg"
          alt="Toko Anjani Logo"
          width={40}
          height={40}
          className="w-10 h-10"
          priority
        />
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
