import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomeUser } from "@/components/WelcomeUser";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "Admin System",
  icons: {
    icon: "/img/bank.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={` ${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            storageKey="dashboard-theme"
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex">
              <div className="hidden md:block h-[100vh] w-[250px]">
                <Sidebar />
              </div>
              <div className="p-5 flex flex-col w-full md:max-w-[1140px]">
                <WelcomeUser />

                {children}
              </div>
            </div>
          </ThemeProvider>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
