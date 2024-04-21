import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";

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
        <SpeedInsights/>
        <ReduxProvider>
          <NavBar/>
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
