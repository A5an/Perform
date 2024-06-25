"use client"

import {
  CredenzaBody,
  CredenzaClose,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/complex/credenza"
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deleteArticleAction } from '../server-functions/delete-article'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  password: z.string(),
})

interface DeleteFormProps {
  articleId: string;
}

export const DeleteForm = ({ articleId }: DeleteFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteArticle = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      await deleteArticleAction({ id: articleId, password: values.password })

      toast({
        title: "Successfully deleted article!",
        description: "Article was succesfully deleted, you will be redirected to home page",
        variant: "default"
      })
      router.push('/');
    } catch (e: unknown) {
      toast({
        title: "Error! Something went wrong.",
        description: "We couldn't save your article to database. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CredenzaHeader>
        <CredenzaTitle>Do you realy want to delete this article?</CredenzaTitle>
        <CredenzaDescription>
          It&apos;ll be deleted without any opportunity to restore it.
        </CredenzaDescription>
      </CredenzaHeader>
      <CredenzaBody>
        If you&apos;re ready to process, enter password.
        <Form {...form}>
          <form onSubmit={form.handleSubmit(deleteArticle)} className="space-y-8 w-full mt-12">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='required'>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Secret password is required for deleting article on this website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className='w-max py-1 bg-red-600'>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </form>
        </Form>
      </CredenzaBody>
      <CredenzaFooter>
        <CredenzaClose asChild>
          <button disabled={loading}>Close</button>
        </CredenzaClose>
      </CredenzaFooter>
    </>
  )
}