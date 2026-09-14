import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insure Wisely — One Parent. One Plan. Protect What Matters.",
  description:
    "Insurance doesn't have to be complicated or driven by fear. Insure Wisely helps you understand your options, choose what fits your needs, and feel more confident about tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-navy-900 bg-white selection:bg-coral-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
