"use server";

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { formSchema } from '../formSchema';

export async function uploadApplication(values: z.infer<typeof formSchema>) {
  const res = await prisma.investigator.create({
    data: {
      firstName: values.investigator.firstName,
      lastName: values.investigator.lastName,
    }
  })

  return res;
}