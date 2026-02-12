"use client";

import { Store } from "@prisma/client";
import { useParams } from "next/navigation";
import { Store as StoreIcon } from "lucide-react";
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
      <div className="flex items-center gap-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700">
        <StoreIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentStore?.label}
        </span>
      </div>
    </div>
  );
};

export default StoreSwitcher;
