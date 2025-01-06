import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";

export default function UserAssignmentPage(){
    return(
        <div>

        </div>
    )
}
function Layout(props: layoutInterface) {
        return (
            <UserLayout
                {...props}
                title="Pre recorded courses for you"
                description=""
            />
        );
      }
      UserAssignmentPage.Layout = Layout;