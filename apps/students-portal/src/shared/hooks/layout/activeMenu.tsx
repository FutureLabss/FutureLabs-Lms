import { AdminMenuLookup } from "@/core/menu.const";
import { usePathname } from "next/navigation";
import { useIsMounted } from "@/shared/hooks/useActiveMenu";

export default function useActiveMenu() {
  const pathname = usePathname();
  const mounted = useIsMounted();

  if (!mounted || !pathname) return null; // prevents flicker

  const keys = Object.keys(AdminMenuLookup).sort((a, b) => b.length - a.length);

  const currentMenuItem = keys.find((menuPath) => {
    return pathname === menuPath || pathname.startsWith(menuPath + "/");
  });

  return currentMenuItem ? AdminMenuLookup[currentMenuItem] : null;
}
