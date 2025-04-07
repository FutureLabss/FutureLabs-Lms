import React from "react";
import { Theme } from "@radix-ui/themes";
// import AdminDashbord from "@/pages/dashbord";
import Login from "@/pages/login";

const Home: React.FC = () => {
  return (
    <div>
      <Theme>
        {/* <h1>Homepage working</h1> */}
        {/* <AdminDashbord /> */}
        <Login />
      </Theme>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {}, // Ensure this is a valid object
  };
}

export default Home;
