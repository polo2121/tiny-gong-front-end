import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen ">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 py-6 px-4">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
