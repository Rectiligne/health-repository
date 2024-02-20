import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, ...providers } = body;

    const groupedProviders = Object.keys(providers).reduce((acc: any, key) => {
      const prefix = key.split("_")[0]; // Get the prefix of the attribute
      if (!acc[prefix]) {
        acc[prefix] = {};
      }
      const leftPart = key.split("_").slice(1).join("_");
      acc[prefix][leftPart] = providers[key];
      return acc;
    }, {});

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const transaction = Object.keys(groupedProviders).map((provider) => {
      return prisma.account.upsert({
        where: {
          provider: provider,
        },
        update: {
          ...groupedProviders[provider],
        },
        create: {
          provider: provider,
          ...groupedProviders[provider],
          user_id: user?.id,
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
