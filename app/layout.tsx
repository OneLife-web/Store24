import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], // Subset if needed, Google Fonts fetches automatically
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Weight range for variable font (use a range or specific weights)
  variable: "--font-poppins", // Custom CSS variable for font usage
});

export const metadata: Metadata = {
  title: "Store45",
  description: "Store45 dropshipping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        </body>
    </html>
  );
}
