import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import {
  UserSchemaLogIn,
  UserSchemaUpdate,
} from "../../../components/schema/auth/user.schema";

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
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, ...left } = UserSchemaUpdate.parse(body);

    console.log(email, left);

    const existingUserbyEmail = await prisma.user.findUnique({
      where: { email },
    });
    console.log(existingUserbyEmail);
    if (!existingUserbyEmail) {
      return NextResponse.json(
        { user: null, error: "User does not exist" },
        { status: 404 }
      );
    }

    console.log(left);
    const user = await prisma.user.update({
      where: { email },
      data: {
        email,
        ...left,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User updated" },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
