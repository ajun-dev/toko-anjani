import db from "@/lib/db";

const DashboardPage = async ({ params } : {params: Promise<{storeId: string}>}) => {
  const { storeId } = await params;
  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return (
    <div>
        Active Store: {store?.name}
    </div>
    )
};

export default DashboardPage;
