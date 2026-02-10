"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { CategoryColumn } from "./columns";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category Id berhasil di copy");
    setMenuOpen(false);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category berhasil dihapus");
    } catch {
      toast.error("Cek kembali data dan koneksi mu");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Button clicked! menuOpen:" + menuOpen);
            setMenuOpen(!menuOpen);
          }}
          className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors"
          type="button"
        >
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 z-50 mt-1 w-36 rounded-md border bg-popover text-popover-foreground shadow-md">
            <div className="p-1">
              <button
                onClick={() => onCopy(data.id)}
                className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Id
              </button>
              <button
                onClick={() => {
                  router.push(`/${params.storeId}/categories/${data.id}`);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Edit className="mr-2 h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setOpen(true);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
