import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session kontrolü
  const session = await auth();

  if (!session) {
    // Login yoksa giriş sayfasına yönlendir
    return redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
