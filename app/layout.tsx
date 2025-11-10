import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JolyUI - Beautiful & Accessible React UI Components",
  description:
    "A custom registry of reusable components designed for use with shadcn/ui. Free and open source, forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <RootProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
          </RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
