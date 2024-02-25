import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { where } = body;

    const accounts = await prisma.account.findMany({
      where,
    });

    return NextResponse.json({ data: accounts }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
