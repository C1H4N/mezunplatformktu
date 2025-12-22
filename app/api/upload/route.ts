import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    try {
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json({ error: "Error saving file" }, { status: 500 });
    }

    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      success: true 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
