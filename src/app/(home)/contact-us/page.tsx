import Link from 'next/link';
import { Globe, Pen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const dynamic = "force-dynamic";

export default async function ContactUs() {
  const articles = await prisma.article.findMany();

  return (
    <div className='max-w-6xl mx-auto'>
      <main className='container gap-8 px-4 py-12 md:px-6 lg:py-16 mt-4'>
        <div className="flex lg:flex-row flex-col justify-between gap-8">
          <div className="w-72">
            <h1 className="text-5xl font-extrabold mb-12">Contact Us</h1>
            
            <section className="space-y-8">
              <div>
                <strong className="text-2xl block mb-4">Coordinating Site Location</strong>
                <p>Surgery Methods Centre</p>
                <p>Department of Surgery</p>
                <p>McMaster University</p>
                
                <strong className="text-2xl block mt-4 mb-4">Address</strong>
                <p>711 Concession Street</p>
                <p>Lakeview Lodge | L3, R6</p>
                <p>Hamilton, ON L8V 1C3</p>
              </div>

              <div>
                <strong className="text-2xl block mb-4">Principal Investigator</strong>
                <p>Michelle Ghert</p>
                <p className="mt-2">
                  <strong>Email: </strong>
                  <a href="mailto:ghertm@mcmaster.ca" className="text-teal-600 hover:underline">
                    ghertm@mcmaster.ca
                  </a>
                </p>
              </div>

              <div>
                <strong className="text-2xl block mb-4">Research Coordinator</strong>
                <p>Olivia Virag</p>
                <p className="mt-2">
                  <strong>Email: </strong>
                  <a href="mailto:viragoe@mcmaster.ca" className="text-teal-600 hover:underline">
                    viragoe@mcmaster.ca
                  </a>
                </p>
              </div>
            </section>
          </div>
          <div className='w-96'>
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
