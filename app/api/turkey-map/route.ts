import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), "mezun_son.html");
    const content = await fs.readFile(filePath, "utf8");

    // Yalnızca SVG'yi ayıkla (id=svg-turkiye-haritasi)
    const match = content.match(/<svg[^>]*id=["']svg-turkiye-haritasi["'][\s\S]*?<\/svg>/i);
    if (!match) {
      return new NextResponse("SVG not found", { status: 404 });
    }

    const svg = match[0]
      // Gömülü style veya script yoksa bırak; varsa güvenlik için kaldır
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+="[^"]*"/g, "");

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


