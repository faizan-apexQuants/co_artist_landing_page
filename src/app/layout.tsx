import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Co-Artist Studio | Where Artists Collide",
  description: "A vibrant community studio bringing together musicians, dancers, visual artists, performers, and creative minds. Experience unforgettable events that celebrate every form of artistic expression.",
  keywords: "co-artist, studio, events, music, dance, art, community, performances, theatre, visual arts",
  openGraph: {
    title: "Co-Artist Studio | Where Artists Collide",
    description: "Join our vibrant community of artists. Experience unforgettable music, dance, theatre, and art events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
