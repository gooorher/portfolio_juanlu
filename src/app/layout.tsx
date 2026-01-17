import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SoundManager } from "@/components/ui/SoundManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Lucas Gordillo | AI Product Support Engineer",
  description: "Product Support Engineer specializing in LLM integration, API troubleshooting, and production AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Prevent browser scroll restoration
                if (window.history.scrollRestoration) {
                  window.history.scrollRestoration = 'manual';
                }
                
                // Only force top scroll if no hash in URL
                if (!window.location.hash) {
                  // Disable smooth scrolling temporarily
                  document.documentElement.style.scrollBehavior = 'auto';
                  window.scrollTo(0, 0);
                  
                  // Re-enable after mount
                  requestAnimationFrame(() => {
                    document.documentElement.style.scrollBehavior = '';
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[10000] px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Skip to content
          </a>
          <CustomCursor />
          <SoundManager />
          <Navigation />
          <main id="main-content" className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
