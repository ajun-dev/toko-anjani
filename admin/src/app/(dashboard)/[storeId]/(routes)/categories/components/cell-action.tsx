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
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  const handleToggleMenu = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setMenuOpen(!menuOpen);
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
          ref={buttonRef}
          onClick={handleToggleMenu}
          className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors"
          type="button"
          style={{ pointerEvents: "auto" }}
        >
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div 
            className="fixed z-50 w-40 rounded-md border bg-white dark:bg-gray-950 shadow-lg"
            style={{ top: `${menuPosition.top}px`, right: `${menuPosition.right}px`, pointerEvents: "auto" }}
          >
            <div className="p-1 space-y-1">
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
              }}
              className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </button>
            <button
              onClick={() => {
                setOpen(true);
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
