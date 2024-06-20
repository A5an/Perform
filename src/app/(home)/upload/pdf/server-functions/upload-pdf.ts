"use server";

import { prisma } from '@/lib/prisma';

interface UploadPDF {
  title: string;
  pdfUrl: string;
  description: string;
  password: string;
}

const secretPassword = process.env.SECRET_PASSWORD_NEWS;

export async function uploadPDF({ description, pdfUrl, title, password }: UploadPDF) {
  if (password !== secretPassword) {
    return {
      message: "Password is wrong. Try again please!"
    }
  }

  const res = await prisma.article.create({
    data: {
      title,
      pdfUrl,
      description,
    }
  })

  return res;
}