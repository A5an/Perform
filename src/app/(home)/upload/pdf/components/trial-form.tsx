'use client';

import { SingleFileDropzone } from '@/components/complex/single-file-dropzone';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '@/lib/edgestore/edgestore';

import { formSchema as trialFormSchema, defaultValues as trialDefaultValues } from '../formSchema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const TrialApplicationForm = () => {
  const trialForm = useForm<z.infer<typeof trialFormSchema>>({
    resolver: zodResolver(trialFormSchema),
    defaultValues: trialDefaultValues,
  })
  const [file, setFile] = useState<File>();
  const { toast } = useToast()
  const [trialLoading, setTrialLoading] = useState<boolean>(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const submitTrialApplication = async (values: z.infer<typeof trialFormSchema>) => {
    console.log(values);
  }

  return (
    <Form {...trialForm}>
      <form onSubmit={trialForm.handleSubmit(submitTrialApplication)} className="space-y-8 w-full mt-12">
        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
          Investigator Name:
        </h2>
        <FormField
          control={trialForm.control}
          name="investigator.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='required'>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='required'>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
          Investigator Address:
        </h2>
        <FormField
          control={trialForm.control}
          name="investigator.address.streetNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street No</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.address.streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.address.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal / Zip Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town / City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province / State (if Applicable)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.address.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.contact.workPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={trialForm.control}
          name="investigator.contact.mobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={trialForm.control}
          name="investigator.contact.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={trialForm.control}
          name="investigator.hasDedicatedStudyCoordinator"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have a dedicated Study Coordinator?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-2xl tracking-tight mt-6 font-semibold first:mt-0">
          If yes, please provide your Study Coordinator's contact information below.
        </h3>
        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
          Study Coordinator Name:
        </h2>
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
          Study Coordinator Work Address:
        </h2>
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.streetNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street No</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal / Zip Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town / City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province / State (if Applicable)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.address.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.contact.workPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.contact.mobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={trialForm.control}
          name="investigator.studyCoordinator.contact.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="scroll-m-20 text-4xl tracking-tight mt-6 font-semibold first:mt-0">
          SECTION II: CLINICAL SITE QUESTIONS
        </h2>
        <FormField
          control={trialForm.control}
          name="clinicalSite.affiliatedHospital"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Affiliated Hospital:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.affiliatedUniversity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Affiliated University:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.otherSiteInvestigators"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Other Site Investigator(s):</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.specialtyArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your specialty area of practice?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.isBoardCertified"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you board certified?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.boardCertificationSpecialties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, in what specialty area(s) do you have board certification?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.hasGCPTraining"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have you received Good Clinical Practice (ICH-GCP) training within the past two years?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.hasRegulatedTrialsExperience"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have experience conducting regulated trials (e.g., Health Canada, US Food and Drug Administration, European Medicines Agency, etc.)?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.clinicalTrialsParticipated"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How many clinical trials have you previously participated in?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      1
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      2
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      3
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      4
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5+" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      5+
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.isParticipatingInIndustryTrials"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you currently participating in any industry-sponsored clinical trials?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.researchCoordinatorHasGCPTraining"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Has your Research Coordinator received Good Clinical Practice (ICH-GCP) training within the past two years?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.studyCoordinatorRegulatedTrialsExperience"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Does your Study Coordinator have experience conducting regulated trials (e.g., Health Canada,US Food and Drug Administration, European Medicines Agency, etc.)?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.studyCoordinatorClinicalTrialsWorkedOn"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How many clinical trials has your Study Coordinator previously worked on?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      1
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      2
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      3
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      4
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5+" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      5+
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.hasSOPs"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Does your clinical site have and follow Standard Operating Procedures (SOPs) for the conduct of clinical research?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-1'>
          <FormLabel>If yes, please submit a copy of the Table of Contents as PDF file (5MB max)</FormLabel>
          <SingleFileDropzone
            width={400}
            height={100}
            className='w-full h-52'
            value={file}
            onChange={(file?: File) => {
              setFile(file);
            }}
          />
        </div>
        <FormField
          control={trialForm.control}
          name="clinicalSite.patientMedicalRecordMaintenance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How does your clinical site maintain patient medical records?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Maintain original paper patient medical record" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Maintain original paper patient medical record
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Maintain both paper and electronic patient medical record" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Maintain both paper and electronic patient medical record
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Maintain the entire patient medical record in a computerized system" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Maintain the entire patient medical record in a computerized system
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.allowsMcMasterReview"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Would personnel from the McMaster University Methods Center be permitted to review medical records for remote and in-person monitoring purposes?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.allowsDeIdentifiedNotesSubmission"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Is your clinical site permitted to submit de-identified participant clinical notes to the McMaster University Methods Center for adjudication purposes?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.newPrimaryExtremitySarcomasTreatedYearly"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Approximately how many new primary extremity soft-tissue sarcomas do you treat each year?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="<10" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {"<10"}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="10-19" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      10-19
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="20-29" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      20-29
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="30-39" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      30-39
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="40+" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      40+
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.postOpSurveillancePractice"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>What is your standard practice for post-operative surveillance for lung metastases in soft-tissue sarcoma patients?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Chest CT scan" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Chest CT scan
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CXR" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      CXR
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Other" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Other
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.postOpSurveillanceOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If other, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.imagingModalitiesAvailable"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are both imaging modalities (CT scan and CXR) available at your clinical site?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.followUpFrequencyFirstTwoYears"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>In the first two post-operative years, how often do you typically see soft-tissue sarcoma patients for follow-up?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Every 3 Months" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Every 3 Months
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Every 6 Months" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Every 6 Months
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Other" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Other
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalSite.followUpFrequencyOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If other, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="scroll-m-20 text-4xl tracking-tight mt-6 font-semibold first:mt-0">
          SECTION III: CLINICAL TRIAL QUESTIONS
        </h2>
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.comfortableWithRandomization"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you comfortable with your soft-tissue sarcoma patients being randomized to a surveillance regimen that may be more or less intensive than your standard practice?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>
            PERFORM trial participants will be randomized to one of four treatment arms:
            <br></br>
            {"1) Clinical assessment + CXR every 3 months for 2 years;"}
            <br></br>
            {"2) Clinical assessment + chest CT scan every 3 months for 2 years;"}
            <br></br>
            {"3) Clinical assessment + CXR every 6 months for 2 years; or"}
            <br></br>
            {"4) Clinical assessment + chest CT scan every 6 months for 2 years"}
          </FormLabel>
        </div>
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.logisticalChallenges"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you foresee any logistical challenges with ensuring that study participants at your clinical site obtain the prescribed thoracic imaging and are assessed in clinic at the appropriate frequency?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.logisticalChallengesDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.challengesWithDocumentingEvents"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you anticipate any challenges with documenting the following study event data for each study participant (if applicable)?
                <br></br>
                ▪ Oncologic events (such as local recurrence or systemic relapse); and
                <br></br>
                ▪ Treatment-related complications (including chemotherapy-related complications [such as febrile neutropenia, fungal infections or sepsis] and thoracotomy-related complications [such as pneumothorax or surgical site infections])
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.documentingEventsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.challengesWithAdministeringQuestionnaires"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you anticipate any challenges with administering the following questionnaires to study participants at your clinical site at the 6M, 12M, 18M, 24M, 36M, 48M and 60M study visits?
                <br></br>
                ▪ PROMIS Cancer-Anxiety Questionnaire;
                <br></br>
                ▪ PROMIS Satisfaction with Social Roles and Activities Questionnaire; and
                <br></br>
                ▪ EQ-5D Questionnaire
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.administeringQuestionnairesDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.challengesWithFiveYearFollowUp"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you anticipate any clinical site-specific challenges with maintaining 5-year study participant follow-up?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.fiveYearFollowUpDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.challengesWithDocumentingCosts"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you anticipate any challenges with documenting the following clinical site-specific data?
                <br></br>
                ▪ Follow-up care costs (such as costs associated with orthopaedic oncology clinic visits, thoracic imaging [both CT and CXR], imaging interpretation and hospital parking);
                <br></br>
                ▪ Costs associated with unplanned re-operations (such as costs associated with OR time, anesthesia time and type, surgeon time, scrub nurse time, surgical supplies, pain medication and hospital
                admission);
                <br></br>
                ▪ Costs associated with oncologic events (such as costs associated with medical oncology visits, radiation oncology visits, chemotherapy and radiation); and
                <br></br>
                ▪ Costs associated with treatment-related complications (such as costs associated with hospital admission, medications and surgery)
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.documentingCostsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify:</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.interestedInParticipating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Based on the information provided, are you interested in participating in the PERFORM trial?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: string) => {field.onChange(value === "yes" ? true : false)}}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.additionalRelevantInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is there anything else we should know that may be relevant to your participation in the PERFORM trial?</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={trialLoading} className='w-max py-1 bg-teal-600'>
          {trialLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send
        </Button>
      </form>
    </Form>
  )
}