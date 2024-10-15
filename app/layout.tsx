import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/providers/Providers";
import { CartProvider } from "@/providers/CartContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-B4226NM7RK`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B4226NM7RK', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
