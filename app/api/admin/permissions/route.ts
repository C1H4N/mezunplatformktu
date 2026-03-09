import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { defaultPermissions, PermissionsConfig } from "@/app/lib/permissions";
import { promises as fs } from "fs";
import path from "path";

const PERMISSIONS_FILE = path.join(process.cwd(), "data", "permissions.json");

async function loadPermissions(): Promise<PermissionsConfig> {
  try {
    const raw = await fs.readFile(PERMISSIONS_FILE, "utf-8");
    return { ...defaultPermissions, ...JSON.parse(raw) };
  } catch {
    return defaultPermissions;
  }
}

async function savePermissions(data: PermissionsConfig): Promise<void> {
  await fs.mkdir(path.dirname(PERMISSIONS_FILE), { recursive: true });
  await fs.writeFile(PERMISSIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }
    const perms = await loadPermissions();
    return NextResponse.json(perms);
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }
    const body: PermissionsConfig = await req.json();

    // ADMIN rolü her zaman tam yetkili kalmalı
    if (body.ADMIN) {
      const allKeys = Object.keys(body.ADMIN.permissions) as Array<string>;
      allKeys.forEach((k) => {
        body.ADMIN.permissions[k as keyof typeof body.ADMIN.permissions] = true;
      });
    }

    await savePermissions(body);
    return NextResponse.json({ message: "Yetkiler kaydedildi" });
  } catch (error) {
    console.error("Error saving permissions:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
