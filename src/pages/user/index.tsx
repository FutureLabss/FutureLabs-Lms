import EmptyState from "@/shared/components/common/emptyState/empty";
import PreAppBar from "@/shared/components/layouts/appbar";
import UserLayout from "@/shared/layouts/userLayout";
import { useState } from "react";

export default function DashboardPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };
  return (
    <UserLayout title={""} description={""} >
      <PreAppBar display={showDrawer} onToggle={toggleDrawer} />
          <EmptyState />
    </UserLayout>
  );
}

