import type { Metadata } from "next";
import IconaClient from "./client";

export const metadata: Metadata = {
  title: "Icona - Professional Icon Library | Joly UI",
  description:
    "Browse and customize 200+ icon sets with thousands of professional icons. Built-in SVG editor, instant copy, and download. Free and open source.",
  keywords: [
    "icon library",
    "svg icons",
    "icon editor",
    "free icons",
    "font awesome",
    "material icons",
    "lucide icons",
    "heroicons",
    "icon sets",
    "svg editor",
  ],
  openGraph: {
    title: "Icona - Professional Icon Library",
    description:
      "Browse and customize 200+ icon sets. Built-in SVG editor with color customization, rotation, and instant download.",
    type: "website",
  },
};

export default function IconaPage() {
  return <IconaClient />;
}
