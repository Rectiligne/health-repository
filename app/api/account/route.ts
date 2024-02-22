import prisma from "@/lib/prisma";
import { groupByPrefix } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, ...providers } = body;

    const groupedProviders = groupByPrefix(providers);

    const transaction = Object.keys(groupedProviders).map((provider) => {
      return prisma.account.updateMany({
        where: {
          AND: {
            provider,
            userId: user_id,
          },
        },
        data: {
          ...groupedProviders[provider],
        },
      });
    });

    await prisma.$transaction(transaction);

    return NextResponse.json(
      { message: "Provider(s) created" },
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
