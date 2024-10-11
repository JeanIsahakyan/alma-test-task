import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from '@/store/StoreProvider';


export const metadata: Metadata = {
  title: "Lead forms",
  description: "Lead forms app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
      <body>
      {children}
      </body>
      </html>
    </StoreProvider>
  );
}
