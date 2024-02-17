import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { UserSchemaLogIn } from "./user.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = UserSchemaLogIn.parse(body);

    const existingUserbyEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserbyEmail) {
      return NextResponse.json(
        { user: null, error: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User created" },
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(error.message);
  }
}
