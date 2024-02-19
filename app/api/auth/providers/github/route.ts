import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const code = params.get("code");

  const queryParams =
    "?client_id=f18f8a8579d1509224df&client_secret=27a3078d0792d8217d6ece555c75a83b410800d1&code=" +
    code;

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

  return new NextResponse(code, { status: 200 });
}
