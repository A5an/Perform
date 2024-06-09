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
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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

  const submitArticle = async (values: z.infer<typeof formSchema>) => {
    if (file) {
      const date = new Date();
      const fileName = `${file.name}_${date.toISOString()}.${file.type}`;
      const filePath = `${fileName}`;

      const { error, data } = await supabase.storage
        .from('freelance_pdf_files') 
        .upload(filePath, file);

        if (data) {
          await prisma.article.create({
            data: {
              title: values.title,
              pdfUrl: data.path,
              description: values.description,
            }
          })
        }
    } else {
      toast("You must upload pdf document!", {
        description: "Error! PDF document must be attached",
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitArticle)} className="space-y-8">
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description of article is optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SingleFileDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file?: File) => {
              setFile(file);
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}