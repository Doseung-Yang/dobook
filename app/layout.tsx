import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "도북",
  description: "개발 면접 대비 나만의 핸드북",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
