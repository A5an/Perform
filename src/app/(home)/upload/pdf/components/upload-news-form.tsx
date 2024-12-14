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
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const UploadNewsForm = () => {
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      password: "",
    },
  })

  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const submitArticle = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
  
    try {
      let pdfUrl = "";
  
      // Check if a file was uploaded
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
  
        if (res.url) {
          pdfUrl = res.url;
        } else {
          toast({
            title: "Error uploading file.",
            description: "We couldn't upload your PDF file. Please try again.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }
  
      // Proceed to upload the article with or without a PDF URL
      const result = await uploadPDF({
        title: values.title,
        pdfUrl: pdfUrl, // This will be an empty string if no PDF was uploaded
        description: values.description ?? "",
        password: values.password,
      });
  
      if ('message' in result) {
        toast({
          title: "Error!",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Article Uploaded!",
          description: "Your article was uploaded successfully.",
          variant: "default",
        });
        router.push('/');
      }
    } catch (e: unknown) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <FormLabel className='required'>Description</FormLabel> {/* Updated label */}
              <FormControl>
                <Textarea placeholder="Description of article (optional)" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="mt-4">
          <FormLabel>News PDF (optional)</FormLabel> {/* Updated label */}
          <SingleFileDropzone
            width={400}
            height={200}
            className='w-full h-52'
            value={file}
            onChange={(file?: File) => {
              setFile(file);
            }}
          />
        </div>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='required'>Password</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the secret password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className='w-max py-1 bg-teal-600'>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send News
        </Button>
      </form>
    </Form>
  )
}