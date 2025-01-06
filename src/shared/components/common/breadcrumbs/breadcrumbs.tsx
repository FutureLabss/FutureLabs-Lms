import React from "react";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";

// interface BreadcrumbProps {
//   customItems?: { label: string; path?: string }[];
// }

const routeLabels: { [key: string]: string } = {
  user: "User",
};

function Breadcrumb() {
  const router = useRouter();
  const { pathname } = router;

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const handleNavigation = (path: string | undefined) => {
    if (path) {
      router.push(path);
    }
  };

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      label: routeLabels[segment] || segment,
      path,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <button
        className="flex items-center justify-center space-x-3 text-gray-500"
        onClick={() => router.back()}
      >
        <button className=" text-gray-500 border-2 border-gray-700 py-1 px-1 rounded-md">
          <FaLongArrowAltLeft />
        </button>
        <span className="text-sm">Go Back</span>
      </button>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <span>/</span>
          <button
            className={`hover:text-primary text-sm ${
              item.path ? "text-gray-500" : "text-primary"
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumb;
