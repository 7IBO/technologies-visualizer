import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";

export const metadata = {
  title: "Technologies Visualizer",
  description: "A visualizer to see what technologies websites uses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800 flex justify-center items-center min-h-screen">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
