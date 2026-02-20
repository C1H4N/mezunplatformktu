import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h2>
      <p className="text-muted mb-8">Aradığınız sayfa mevcut değil.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-[#ffffff] rounded-md hover:bg-primary-hover transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
