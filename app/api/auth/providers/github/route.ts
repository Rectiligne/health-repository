import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const params = new URL(request.url).searchParams;
    const code = params.get("code");

    const gitlabId = process.env.NEXT_PUBLIC_GITHUB_ID;
    const gitlabSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET;

    // Get the access token from the code provided by the OAuth provider
    const queryParams =
      `?client_id=${gitlabId}&client_secret=${gitlabSecret}&code=` + code;

    const res = await fetch(
      "https://github.com/login/oauth/access_token" + queryParams,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();

    // Get github userID
    const res1 = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const user_data = await res1.json();

    // Save the access token and the user in the database
    const account = await prisma.account.upsert({
      where: {
        user_provider_unique: {
          provider: "github",
          userId: session!.user.id,
        },
      },
      update: {
        access_token: data.access_token,
      },
      create: {
        userId: session!.user.id,
        type: "github",
        access_token: data.access_token,
        provider: "github",
        providerAccountId: `${user_data.id}`,
        endpoint: "https://api.github.com",
      },
    });

    //TODO : Redirect to https://github.com/apps/health-repository/installations/new/permissions?target_id=48626779

    return NextResponse.redirect(new URL("/settings/providers", request.url));
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
