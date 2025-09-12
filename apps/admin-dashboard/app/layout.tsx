// "use client";
// import type React from "react";
// import "@/app/globals.css";
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import { NotificationsProvider } from "@/components/notifications-provider";
// import { QueryClient, QueryClientProvider } from "react-query";

// const inter = Inter({ subsets: ["latin"] });

// // export const metadata = {
// //   title: "Admin Dashboard",
// //   description: "Admin Dashboard for Educational Platform",
// //   generator: "v0.dev",
// // };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       cacheTime: 1000 * 60 * 60,
//       retry: 1,
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//     },
//   },
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="light"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <NotificationsProvider>{children}</NotificationsProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </body>
//     </html>
//   );
// }

// import "./globals.css";

"use client";

import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationsProvider } from "@/components/notifications-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/hooks/use-auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <NotificationsProvider>{children}</NotificationsProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
