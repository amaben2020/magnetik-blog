import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "./components/elements/navbar";
import PageLayout from "./components/templates/page-layout";
import "./globals.css";
import { ThemeProvider } from "./provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavigationBar />

            <main className="bg-gray-600 dark:bg-black">
              <PageLayout>{children}</PageLayout>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
