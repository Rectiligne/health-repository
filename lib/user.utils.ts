import prisma from "@/lib/prisma";

export const getUser = async (email: string, include: any = {}) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include,
  });
};
