import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    console.log(file.name, file.size, file.type);

    return NextResponse.json({
      msg: "Archivo subido correctamente"
    });
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}