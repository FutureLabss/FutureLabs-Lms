import { AdminMenuLookup } from "@/core/menu.const";
import { usePathname } from "next/navigation";

export default function useActiveMenu() {
  const currentPath = usePathname();
  const currentMenuItem = AdminMenuLookup[currentPath];
  return currentMenuItem;
}
