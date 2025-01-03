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
import { Checkbox } from "@/components/ui/checkbox";

import { formSchema as trialFormSchema, defaultValues as trialDefaultValues } from '../formSchema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { uploadApplication } from '../server-functions/upload-application';

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
    setTrialLoading(true);

    try {
      await uploadApplication(values);

      toast({
        title: "Successfully submitted application!",
        description: "Application was succesfully sumitted, you will be redirected to home page",
        variant: "default"
      })

      router.push('/');
    } catch (e: unknown) {
      console.log(e);
      toast({
        title: "Error! Something went wrong.",
        description: "We couldn't submit your application to database. Please try again.",
        variant: "destructive"
      })
    } finally {
      setTrialLoading(false);
    }
  }

  return (
    <Form {...trialForm}>
      <form onSubmit={trialForm.handleSubmit(submitTrialApplication)} className="space-y-8 w-full mt-12">
        <h2 className="scroll-m-20 text-4xl tracking-tight mt-6 font-semibold first:mt-0">
        SECTION I: INVESTIGATOR INFORMATION
        </h2>
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
        Investigator Contact Information:
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
        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
        Study Coordinator:
        </h2>
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
          If yes, please provide your Study Coordinator&apos;s contact information below.
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

                    <FormField
            control={trialForm.control}
            name="investigator.studyCoordinator.employmentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is their employment type? (select all that apply)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="fullTime"
                        checked={field.value?.includes('fullTime')}
                        onCheckedChange={(checked) => {
                          const value = field.value || [];
                          if (checked) {
                            field.onChange([...value, 'fullTime']);
                          } else {
                            field.onChange(value.filter((v) => v !== 'fullTime'));
                          }
                        }}
                      />
                      <label htmlFor="fullTime">Full time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="partTime"
                        checked={field.value?.includes('partTime')}
                        onCheckedChange={(checked) => {
                          const value = field.value || [];
                          if (checked) {
                            field.onChange([...value, 'partTime']);
                          } else {
                            field.onChange(value.filter((v) => v !== 'partTime'));
                          }
                        }}
                      />
                      <label htmlFor="partTime">Part time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="casual"
                        checked={field.value?.includes('casual')}
                        onCheckedChange={(checked) => {
                          const value = field.value || [];
                          if (checked) {
                            field.onChange([...value, 'casual']);
                          } else {
                            field.onChange(value.filter((v) => v !== 'casual'));
                          }
                        }}
                      />
                      <label htmlFor="casual">Casual</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="contract"
                        checked={field.value?.includes('contract')}
                        onCheckedChange={(checked) => {
                          const value = field.value || [];
                          if (checked) {
                            field.onChange([...value, 'contract']);
                          } else {
                            field.onChange(value.filter((v) => v !== 'contract'));
                          }
                        }}
                      />
                      <label htmlFor="contract">Contract</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={trialForm.control}
            name="investigator.studyCoordinator.contractEndDate"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is the Study Coordinator&apos;s contract end date?</FormLabel>
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Input 
                      type="date"
                      {...field}
                      value={field.value || ''}
                      disabled={field.value === 'N/A'}
                    />
                  </FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="naCheckbox"
                      checked={field.value === 'N/A'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange('N/A');
                        } else {
                          field.onChange('');
                        }
                      }}
                    />
                    <label htmlFor="naCheckbox">N/A</label>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

        <h2 className="scroll-m-20 text-3xl tracking-tight mt-6 font-semibold first:mt-0">
        Study Coordinator Contact Information:
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
              <FormLabel>Are you board certified or equivalent in your country?</FormLabel>
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
              <FormLabel>If yes, in what specialty area(s) do you have board certification/equivalent in your country?</FormLabel>
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
              <FormLabel>Does your clinical site have and follow Standard Operating Procedures
(SOPs) for the conduct of clinical research? Please note, these will need to be
shared with our coordinating site.</FormLabel>
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
          name="clinicalSite.patientMedicalRecordMaintenance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How does your clinical site maintain patient medical records?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Maintain both paper and electronic patient medical record" />
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
        {/* <div className='pt-1'>
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
        </div> */}
        
        
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
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Unknown" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Unknown
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
              <FormLabel>Approximately how many metastatic bone disease (MBD) patients with
              disease in the proximal femur do you treat surgically each year?</FormLabel>
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
        name="clinicalSite.canPerformAllSurgeries"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are you comfortable doing ALL of the following surgical procedures in a patient with MBD of the proximal femur: internal fixation of the proximal femur, femoral endoprosthetic reconstruction, hip arthroplasty?</FormLabel>
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
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />  

      <FormField
        control={trialForm.control}
        name="clinicalSite.surgeriesCompletedAtSite"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are all of the surgical procedures mentioned above completed at your site?</FormLabel>
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
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={trialForm.control}
        name="clinicalSite.surgeriesNotCompletedExplanation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>If no, please explain:</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
  control={trialForm.control}
  name="clinicalSite.coordinatorAllowedDuringSurgery"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Is it permitted at your site for the Study Coordinator to be present during surgery?</FormLabel>
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
            <FormLabel className="font-normal">Yes</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="no" />
            </FormControl>
            <FormLabel className="font-normal">No</FormLabel>
          </FormItem>
        </RadioGroup>
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
              <FormLabel>Are you comfortable with your patients with MBD of the proximal femur being
randomized to either reconstruction or internal fixation (i.e. do you have
clinical equipoise)? The inclusion and exclusion criteria are listed below:</FormLabel>
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
        <div className="mt-8 mb-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-6 py-3 text-left font-semibold border-b">
                    Inclusion Criteria
                  </th>
                  <th className="bg-gray-100 px-6 py-3 text-left font-semibold border-b">
                    Exclusion Criteria
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-6 py-4">
                    Life expectancy of at least 6 months
                  </td>
                  <td className="border-b px-6 py-4">
                    Lesions isolated to the femoral neck
                  </td>
                </tr>
                <tr>
                  <td className="border-b px-6 py-4">
                    Lesions in the proximal femur (femoral neck, intertrochanteric region, subtrochanteric region, and combinations thereof)
                  </td>
                  <td className="border-b px-6 py-4">
                    Lesion with any femoral head involvement
                  </td>
                </tr>
                <tr>
                  <td className="border-b px-6 py-4">
                    Low or intermediate risk for perioperative morbidity and/or mortality
                  </td>
                  <td className="border-b px-6 py-4">
                    High risk for perioperative morbidity and/or mortality
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    No more than 75% and no less than 25% bone loss
                  </td>
                  <td className="px-6 py-4">
                    Multidisciplinary decision that resection of the entire lesion would be indicated
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <FormField
          control={trialForm.control}
          name="clinicalTrialQuestions.logisticalChallenges"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you foresee any logistical challenges with ensuring that the surgical
              equipment will be available at your site for either randomized group?
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
              Do you anticipate any challenges with documenting the following study event
              data for each study participant: Local recurrence, reoperations, death (if
              applicable)?
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
              Do you anticipate any challenges with administering questionnaires for study
participants to complete, including a log recording days at home, at your clinical site at the 2 week, 6 week, 4 month, 6 month, 9 month, &amp; 12 month
post-surgery study visits?
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
              Do you anticipate any clinical site-specific challenges with maintaining 1-year
              study participant follow-up?
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