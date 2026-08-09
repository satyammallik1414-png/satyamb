import { NextResponse } from "next/server";
import { getProgress, updateProgress, resetProgress } from "@/lib/db";

export async function GET() {
  try {
    const data = getProgress();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = updateProgress(body);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const reset = resetProgress();
    return NextResponse.json(reset);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
