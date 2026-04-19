import "@/src/ui/global.css";
import "@/src/ui/pagecontainer.css";
import "@/src/ui/variables.css";
import styles from "./layout.module.css";
import { Inter } from "next/font/google";

import AuthProvider from "@/src/lib/providers/AuthProvider"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
         <div className={styles.layout}>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
