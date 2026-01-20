import { MetadataRoute } from "next";
import { skillsHandbookConfig } from "@/data/skills";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: skillsHandbookConfig.title,
    short_name: "도북",
    description: skillsHandbookConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/dobook.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/dobook.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "productivity"],
    lang: "ko-KR",
    dir: "ltr",
  };
}
