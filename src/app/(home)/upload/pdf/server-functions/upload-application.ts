"use server";

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { formSchema } from '../formSchema';

export async function uploadApplication(values: z.infer<typeof formSchema>) {
  const address = await prisma.address.create({
    data: {
      streetNo: values.investigator.address.streetNo,
      streetName: values.investigator.address.streetName,
      postalCode: values.investigator.address.postalCode,
      city: values.investigator.address.city,
      state: values.investigator.address.state,
      country: values.investigator.address.country,
    },
  });

  const contactInfo = await prisma.contactInfo.create({
    data: {
      workPhone: values.investigator.contact.workPhone,
      mobilePhone: values.investigator.contact.mobilePhone,
      email: values.investigator.contact.email,
    },
  });

  const investigator = await prisma.investigator.create({
    data: {
      firstName: values.investigator.firstName,
      lastName: values.investigator.lastName,
      address: {
        connect: { id: address.id },
      },
      contact: {
        connect: { id: contactInfo.id },
      },
      hasDedicatedStudyCoordinator: values.investigator.hasDedicatedStudyCoordinator,
      studyCoordinator: values.investigator.studyCoordinator ? {
        create: {
          firstName: values.investigator.studyCoordinator.firstName,
          lastName: values.investigator.studyCoordinator.lastName,
          address: {
            create: {
              streetNo: values.investigator.studyCoordinator.address?.streetNo,
              streetName: values.investigator.studyCoordinator.address?.streetName,
              postalCode: values.investigator.studyCoordinator.address?.postalCode,
              city: values.investigator.studyCoordinator.address?.city,
              state: values.investigator.studyCoordinator.address?.state,
              country: values.investigator.studyCoordinator.address?.country,
            },
          },
          contact: {
            create: {
              workPhone: values.investigator.studyCoordinator.contact?.workPhone,
              mobilePhone: values.investigator.studyCoordinator.contact?.mobilePhone,
              email: values.investigator.studyCoordinator.contact?.email ?? "",
            },
          },
        },
      } : undefined,
    },
  });

  return investigator;
}
