import { UploadNewsForm } from './components/upload-news-form';
import { TrialApplicationForm } from './components/trial-form';
import Link from 'next/link';
import { Globe, Pen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const dynamic = "force-dynamic";

export default async function TrialForms() {
  const articles = await prisma.article.findMany();

  return (
    <div className='max-w-6xl mx-auto'>
      <main className='container gap-8 px-4 py-12 md:px-6 lg:py-16 mt-16'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Write Article For The News On Home Page
        </h1>
        <div className="flex justify-between gap-8">
          <div>
            <UploadNewsForm />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-12">
              Physician Clinical Trial Application
            </h1>
            <TrialApplicationForm />
          </div>
          <div>
            <div className="flex flex-col items-center justify-center gap-4 col-span-1">
              <Link
                href="/"
                className="flex h-full w-full flex-col items-center justify-center bg-custom-blue p-6 text-center transition-colors hover:bg-teal-100 hover:text-black text-white"
                prefetch={false}
              >
                <div className="flex justify-between items-center font-bold w-full px-4">
                  <div className="text-left">
                    <p className="text-2xl">PERFORM Trial Centres</p>
                    <p>More Information</p>
                  </div>
                  <div>
                    <Globe className='w-8 h-8' />
                  </div>
                </div>
              </Link>
              <Link
                href="/upload/pdf"
                className="flex h-full w-full flex-col items-center justify-center bg-custom-blue p-6 text-center transition-colors hover:bg-teal-100 hover:text-black text-white"
                prefetch={false}
              >
                <div className="flex justify-between items-center font-bold w-full px-4">
                  <div className="text-left">
                    <p className="text-2xl">Become A PERFORM Investigator</p>
                    <p>More Information</p>
                  </div>
                  <div>
                    <Pen className='w-8 h-8' />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-start justify-center mt-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Latest News from PERFORM</h2>
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