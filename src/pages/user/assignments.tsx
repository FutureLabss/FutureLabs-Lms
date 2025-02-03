import { assignmentsData, headers } from "@/core/const/tabledata";
// import Pagination from "@/shared/components/pagination";
import Table from "@/shared/components/table";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";

export default function UserAssignmentPage(){
    return(
        <div>
            <Table headers={headers} data={assignmentsData} search={true} pagination={{ pageSize: 4 }} />
        </div>
    )
}
function Layouts(props: layoutInterface) {
        return (
            <UserLayout
                {...props}
                title="Assignments"
                description="View and manage your course assignments"
            />
        );
      }
      UserAssignmentPage.Layout = Layouts;