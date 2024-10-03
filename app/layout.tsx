import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { MovieProvider } from "./context/moviesContext";
import { Toaster } from "react-hot-toast";
import { ReviewProvider } from "./context/ReviewContext";

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
  title: "Movie Review - SaasMonk",
  description: "A simple movie review app built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <MovieProvider>
          <ReviewProvider>
            <Header />
            {children}
          </ReviewProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
