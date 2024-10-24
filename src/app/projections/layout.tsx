import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perspective Projection",
  description:
    "3D to 2D: A visual representation of 3D objects to 2D projection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
