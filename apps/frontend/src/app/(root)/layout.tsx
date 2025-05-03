import Footer from "@/components/base/footer/Footer";
import Header from "@/components/base/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-clip">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
