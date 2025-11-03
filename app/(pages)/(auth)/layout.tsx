import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session kontrolü
  const session = await auth();

  if (session) {
    // Login yoksa giriş sayfasına yönlendir
    return redirect("/");
  }

  return <main>{children}</main>;
}
