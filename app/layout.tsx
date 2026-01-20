import type { Metadata } from "next";
import "./globals.css";
import { skillsHandbookConfig } from "@/data/skills";
import { StructuredData } from "@/components/seo/StructuredData";

const siteUrl = "https://book.do-seung.com";

const totalItems = skillsHandbookConfig.items.length;
const enhancedDescription = `${skillsHandbookConfig.description} 총 ${totalItems}개 이상의 개발 면접 질문과 답변을 제공합니다. Express, NestJS, TypeScript, React, Node.js, 데이터베이스, 인프라 등 다양한 기술 스택에 대한 실무 중심의 면접 준비 자료를 확인하세요.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${skillsHandbookConfig.title} - 개발 면접 질문 답변 모음집`,
    template: `%s | ${skillsHandbookConfig.title}`,
    absolute: `${skillsHandbookConfig.title} - 개발 면접 질문 답변 모음집`,
  },
  description: enhancedDescription,
  keywords: [
    "개발 면접",
    "프로그래밍 질문",
    "기술 면접",
    "코딩 인터뷰",
    "개발자 핸드북",
    "면접 준비",
    "기술 스택",
    "프로그래밍 학습",
    "개발 지식",
    "CS 지식",
    "Express",
    "NestJS",
    "TypeScript",
    "React",
    "Node.js",
    "데이터베이스",
    "인프라",
    "AWS",
    "Docker",
    "Kubernetes",
    "면접 질문",
    "면접 답변",
    "개발자 면접",
    "백엔드 면접",
    "프론트엔드 면접",
    "풀스택 면접",
  ],
  authors: [{ name: "도북", url: siteUrl }],
  creator: "도북",
  publisher: "도북",
  applicationName: skillsHandbookConfig.title,
  category: "교육",
  classification: "개발 학습 자료",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ko-KR": siteUrl,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: `${skillsHandbookConfig.title} - 개발 면접 질문 답변 모음집`,
    description: enhancedDescription,
    siteName: skillsHandbookConfig.title,
    images: [
      {
        url: `${siteUrl}/dobook.png`,
        width: 1200,
        height: 630,
        alt: skillsHandbookConfig.title,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/dobook.png",
    apple: "/dobook.png",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className="antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
