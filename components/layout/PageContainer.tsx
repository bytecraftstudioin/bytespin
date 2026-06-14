import Navbar from "@/components/layout/Navbar";

export default function PageContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-black mb-10">
          {title}
        </h1>

        {children}
      </div>
    </main>
  );
}