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

import { uploadPDF } from '../server-functions/upload-pdf';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).optional().nullable(),
})

export const UploadNewsForm = () => {
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const submitArticle = async (values: z.infer<typeof formSchema>) => {
    if (file) {
      setLoading(true);
      const date = new Date();
      const fileName = `${date.toISOString()}.${file.type}`;

      try {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        if (res.url) {
          try {
            await uploadPDF({
              title: values.title,
              pdfUrl: res.url,
              description: values.description ?? "",
            })

            toast({
              title: "Successfully uploaded article!",
              description: "Article was succesfully uploaded, you will be redirected to home page",
              variant: "default"
            })

            router.push('/');
          } catch (e: unknown) {
            toast({
              title: "Error! Something went wrong.",
              description: "We couldn't save your article to database. Please try again.",
              variant: "destructive"
            })
          }
        } else {
          toast({
            title: "Error! Something went wrong.",
            description: "We couldn't save your article to database. Please try again.",
            variant: "destructive"
          })
        }
        setLoading(false);
      } catch (e: unknown) {
        toast({
          title: "Error! Something went wrong.",
          description: "We couldn't save your article to database. Please try again.",
          variant: "destructive"
        })
      }
    } else {
      toast({
        title: "You must upload pdf document!",
        description: "Error! PDF must be attached",
        variant: "destructive",        
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitArticle)} className="space-y-8 w-full mt-12">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='required'>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title of article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='required'>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of article is optional" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className='required'>Description</FormLabel>
        <SingleFileDropzone
          width={400}
          height={200}
          className='w-full h-52'
          value={file}
          onChange={(file?: File) => {
            setFile(file);
          }}
        />
        <Button disabled={loading} className='w-max py-1 bg-teal-600'>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send News
        </Button>
      </form>
    </Form>
  )
}