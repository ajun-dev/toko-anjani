"use client";

import { Store } from "@prisma/client";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface StoreSwitcherProps {
  items: Store[];
  className?: string;
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const params = useParams();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-800 dark:to-gray-950 border border-gray-800 dark:border-gray-700">
        <span className="font-semibold text-white">
          {currentStore?.label}
        </span>
      </div>
    </div>
  );
};

export default StoreSwitcher;
