"use server";

import { prisma } from '@/lib/prisma';

interface UploadPDF {
  title: string;
  pdfUrl: string;
  description: string;
}

export async function uploadPDF({ description, pdfUrl, title }: UploadPDF) {
  const res = await prisma.article.create({
    data: {
      title,
      pdfUrl,
      description,
    }
  })

  return res;
}