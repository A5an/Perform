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
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '@/components/ui/textarea';
import { uploadPDF } from './server-functions/upload-pdf';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).optional().nullable(),
})

export default function UploadPDF() {
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

  const submitArticle = async (values: z.infer<typeof formSchema>) => {
    if (file) {
      setLoading(true);
      const date = new Date();
      const fileName = `${date.toISOString()}.${file.type}`;
      const filePath = `${fileName}`;

      try {
        const { error, data: pathname } = await supabase.storage
          .from('freelance_pdf_files') 
          .upload(filePath, file);
        const { data } = supabase.storage.from('freelance_pdf_files').getPublicUrl(pathname?.path ?? "")

        if (data.publicUrl) {
          try {
            await uploadPDF({
              title: values.title,
              pdfUrl: data.publicUrl,
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
    <div className='max-w-6xl mx-auto'>
      <main className='container flex justify-center gap-8 px-4 py-12 md:px-6 lg:py-16 mt-16 max-w-[500px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitArticle)} className="space-y-8 w-full">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Upload Your PDF File
              </h2>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description of article is optional" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SingleFileDropzone
                width={400}
                height={200}
                className='w-full h-52'
                value={file}
                onChange={(file?: File) => {
                  setFile(file);
                }}
              />
              <Button disabled={loading} className='w-full py-1'>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload Article
              </Button>
            </form>
          </Form>
      </main>
    </div>
  );
}