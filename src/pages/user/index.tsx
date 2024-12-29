import EmptyState from "@/shared/components/common/emptyState/empty";
import PreAppBar from "@/shared/components/layouts/appbar";
import UserLayout from "@/shared/layouts/userLayout";
import { useState } from "react";
// import { layoutInterface } from "@/shared/layouts/userLayout";

export default function DashboardPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };
  return (
    <UserLayout title={""} description={""} >
      <PreAppBar display={false} onToggle={toggleDrawer} />
          <EmptyState />
    </UserLayout>
  );
}

// function Layout(props: layoutInterface) {
//   return (
//       <UserLayout
//           {...props}
//           title="Administrator Dashboard"
//           description="view platform summary"
//       />
//   );
// }
// DashboardPage.Layout = Layout;
