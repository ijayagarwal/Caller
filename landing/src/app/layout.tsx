import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CallAgent — The AI sales agent that actually closes",
  description:
    "Your AI sales agent. Calls every lead, handles objections in their language, books real meetings, follows up across WhatsApp and email. You pay per meeting attended — never per minute.",
  metadataBase: new URL("https://www.callagent.dev"),
  openGraph: {
    title: "CallAgent — The AI sales agent that actually closes",
    description:
      "An autonomous voice agent that runs your entire sales motion: call → pitch → handle objections → book meeting → follow up. Pay per meeting attended.",
    url: "https://www.callagent.dev",
    siteName: "CallAgent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CallAgent — The AI sales agent that actually closes",
    description: "Pay per meeting booked, not per minute. Native Hindi, Hinglish, English. Coming soon.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
