import Link from 'next/link';
import { Globe, Pen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UploadNewsForm } from '../upload/pdf/components/upload-news-form';

export const dynamic = "force-dynamic";

export default async function ContactUs() {
  const articles = await prisma.article.findMany();

  return (
    <div className='max-w-6xl mx-auto'>
      <main className='container gap-8 px-4 py-12 md:px-6 lg:py-16 mt-4'>
        <div className="flex lg:flex-row flex-col justify-between gap-8">
          <div>
            <h1 className="text-5xl font-extrabold mb-12">News</h1>
            
            <div className="flex flex-col items-start justify-center mt-10">
            <div className="grid grid-cols-1 gap-4">              
              {articles.length > 0 ? articles.map((article) => (
                <div key={article.id}>
                  <Link
                    href={`/articles/${article.id}`}
                    className="text-left transition-colors"
                    prefetch={false}
                  >
                    <h3 className="text-teal-600 dark:text-gray-50 text-3xl font-bold capitalize underline hover:no-underline">{article.title}</h3>
                  </Link>
                  <p className='text-lg my-1'>{formatDate(article.createdAt)}</p>
                  <Link
                    href={`/articles/${article.id}`}
                    className={cn(buttonVariants(), "bg-teal-600 font-bold my-1")}
                  >
                    Read More
                  </Link>
                </div>
              )) : (
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Currently there are no news available
                </h4>
              )}
            </div>
          </div>
          <div>
          <h1 className="text-5xl font-extrabold mb-12 mt-12">Write Article For The News On Home Page</h1>
          <UploadNewsForm />
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function formatDate(date: Date) {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const postedDate = `Posted on ${formattedDate}`;

  return postedDate;
}
