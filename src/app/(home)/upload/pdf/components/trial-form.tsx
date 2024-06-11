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
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
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
        <Button disabled={trialLoading} className='w-max py-1 bg-teal-600'>
          {trialLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send
        </Button>
      </form>
    </Form>
  )
}