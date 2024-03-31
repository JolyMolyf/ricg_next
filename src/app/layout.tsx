import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paulina Szkoli",
  description: "Next platform",
};

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}
