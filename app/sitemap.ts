import { MetadataRoute } from "next";
import { skillsHandbookConfig } from "@/data/skills";

const siteUrl = "https://book.do-seung.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const now = new Date();

  const questionUrls: MetadataRoute.Sitemap = skillsHandbookConfig.items.map((item) => {
    const lastModified = new Date(item.updatedAt);
    const daysSinceUpdate = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
    
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "monthly";
    let priority = 0.7;

    if (daysSinceUpdate < 7) {
      changeFrequency = "daily";
      priority = 0.9;
    } else if (daysSinceUpdate < 30) {
      changeFrequency = "weekly";
      priority = 0.8;
    }

    return {
      url: `${baseUrl}/#${item.id}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...questionUrls,
  ];
}
