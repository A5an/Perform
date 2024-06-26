import { Source_Sans_3 } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';

import "leaflet/dist/leaflet.css"

import "./globals.css";
import { EdgeStoreProvider } from '@/lib/edgestore/edgestore';

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        <EdgeStoreProvider>
          <>{children}</>
        </EdgeStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
