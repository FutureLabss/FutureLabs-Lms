import React from 'react'
import UserLayout, { layoutInterface } from '@/shared/layouts/userLayout';
import PrerecordedComponent from '@/shared/components/userDashboard/courses/prerecorded';
import Breadcrumb from '@/shared/components/common/breadcrumbs/breadcrumbs';

export default function SingleCoursePage() {
    return (
        <div className=''>
            <Breadcrumb />
            <PrerecordedComponent />
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
SingleCoursePage.Layout = Layout;
