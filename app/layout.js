import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/src/components/layout/header";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Insomnia",
  description: "Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-gray-900")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
