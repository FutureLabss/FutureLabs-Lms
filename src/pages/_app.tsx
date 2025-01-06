import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import getQueryClientConfig from "@/core/config/query.config";
import React from "react";
import AuthContext from "@/shared/context/auth";
import { QueryClientProvider } from "react-query";
import Loader from "@/shared/components/common/loader";
import NotificationComponent from "@/shared/components/common/notification";

type Page = NextPage & { Layout?: React.FC };
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = getQueryClientConfig();
  const PageComponent = Component as Page;
  const Layout = PageComponent.Layout ? PageComponent.Layout : React.Fragment;
  return (
    <>
      <Loader />
      <NotificationComponent />
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <Layout>
            <PageComponent {...pageProps} />
          </Layout>
        </AuthContext>
      </QueryClientProvider>
    </>
  );
}


