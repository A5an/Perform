"use server";

import { prisma } from '@/lib/prisma';

interface DeletePDF {
  id: string;
  password: string;
}

const secretPassword = process.env.SECRET_PASSWORD_NEWS;

export async function deleteArticleAction({ id, password }: DeletePDF) {
  if (password !== secretPassword) {
    return {
      message: "Password is wrong. Try again please!"
    }
  }

  await prisma.article.delete({
    where: {
      id,
    }
  })

  return 'success';
}