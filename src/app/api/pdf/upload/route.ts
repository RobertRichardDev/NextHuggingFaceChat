import fs from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const tempDir = path.join(process.cwd(), 'src/doc');
    const filePath = path.join(tempDir, 'document.pdf');

    await fs.mkdir(tempDir, { recursive: true });

    await fs.writeFile(filePath, buffer);

    console.log("File uploaded");

    return NextResponse.json({
      msg: "Archivo subido correctamente"
    });
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}