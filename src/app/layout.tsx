import type { Metadata } from "next";
import { LearningProvider } from "@/components/learning-provider";
import { Shell } from "@/components/shell";
import { configured } from "@/lib/supabase/config";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "AI Systems Engineer — Learning Roadmap",
    template: "%s · engineer.",
  },
  description:
    "From programming fundamentals to intelligent, scalable AI systems. A practical curriculum with detailed lessons, projects and personal progress tracking.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('engineer-theme')||'system';document.documentElement.dataset.theme=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch{}`,
          }}
        />
      </head>
      <body>
        <LearningProvider configured={configured}>
          <Shell>{children}</Shell>
        </LearningProvider>
      </body>
    </html>
  );
}
