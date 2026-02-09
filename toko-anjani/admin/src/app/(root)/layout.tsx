import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });
  
  if (store) {
    redirect(`/${store.id}`);
  }

  // Auto-create default store "Toko Anjani" for new users
  const newStore = await db.store.create({
    data: {
      name: "Toko Anjani",
      userId,
    },
  });

  redirect(`/${newStore.id}`);
}
