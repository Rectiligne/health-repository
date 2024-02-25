import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getAccessToken } from "@/lib/providers.utils";
import { getUser } from "@/lib/user.utils";
import { Provider } from "@/types/provider.type";
import { Account } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUser(session!.user.email!, { accounts: true });

    const gitlabEndPoint =
      (
        (user!.accounts as Partial<Account>[]).find(
          (acc: Partial<Account>) =>
            acc.provider === "gitlab" && acc.userId === session!.user.id
        ) as Account
      )?.endpoint ?? "gitlab.com";

    const params = new URL(request.url).searchParams;

    const code = params.get("code");
    const client_id = process.env.NEXT_PUBLIC_GITLAB_ID;
    const client_secret = process.env.NEXT_PUBLIC_GITLAB_SECRET;
    const grant_type = "authorization_code";
    const redirect_uri = `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/auth/providers/gitlab`;

    const queryParams = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=${grant_type}&redirect_uri=${redirect_uri}`;

    const { access_token, refresh_token, created_at, expires_in, ...left } =
      await getAccessToken(
        `https://${gitlabEndPoint}/oauth/token${queryParams}`
      );

    const res1 = await fetch(
      `https://${gitlabEndPoint}/api/v4/user?access_token=${access_token}`,
      {
        method: "GET",
      }
    );

    const user_data = await res1.json();

    // Save the access token and the user in the database
    await prisma.account.upsert({
      where: {
        user_provider_unique: {
          provider: "gitlab",
          userId: session!.user.id,
        },
      },
      update: {
        access_token,
        refresh_token,
        expires_at: new Date(created_at! * 1000 + expires_in! * 1000),
      },
      create: {
        userId: session!.user.id,
        type: Provider.GIT,
        access_token,
        provider: "gitlab",
        providerAccountId: `${user_data.id}`,
        refresh_token,
        expires_at: new Date(created_at! * 1000 + expires_in! * 1000),
      },
    });

    return NextResponse.redirect(new URL("/settings/providers", request.url));
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
