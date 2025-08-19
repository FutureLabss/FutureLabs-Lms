import { AdminMenuLookup } from "@/core/menu.const";
import { usePathname } from "next/navigation";

export default function useActiveMenu() {
  const pathname = usePathname();

  // Sort keys so that longer matches are checked first
  const keys = Object.keys(AdminMenuLookup).sort((a, b) => b.length - a.length);

  const currentMenuItem = keys.find((menuPath) => {
    return pathname === menuPath || pathname.startsWith(menuPath + "/");
  });

  return currentMenuItem ? AdminMenuLookup[currentMenuItem] : null;
}
