import Link from "next/link"

import { Globe, LogOut, Pen } from 'lucide-react';
import { MyLeafletMap } from './components/leafelt-map';
import { prisma } from '@/lib/prisma';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await prisma.article.findMany({});

  return (
    <div>
      <div className='max-w-6xl mx-auto'>
        <main className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6 lg:py-8">
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
          <div className="col-span-2 flex items-center justify-center">
            <MyLeafletMap />
          </div>
        </main>
        <section className="container mx-auto grid grid-cols-2 justify-between items-start gap-12 px-4 py-12 md:grid-cols-2 md:px-6 lg:py-16">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">What is the PERFORM trial?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Cancers that spread in the body often end up in the skeleton, particularly in the hip bones (proximal femur). Hip bones that are weakened or broken from cancer have historically been stabilized with hardware (metal nails, screws and plates) to avoid or to fix cancer-related fractures. However, cancer treatments continue to improve, and many patients with cancer in their hip bones are living longer. </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
            Although this is a positive development, patients that have hip stabilizing surgery are now living longer than the hardware was designed to last and, as a result, these patients are experiencing many more problems in the years after surgery, including cancer recurrence and hardware breakage. In the meantime, surgeons have begun to consider removing the entire section of the affected bone and replacing it with a large hip replacement (endoprosthetic replacement). This is more complex than the usual surgery, and may have higher risks for complications, but is less likely to result in problems such as cancer recurrence and hardware breakage. Research to support a more invasive surgery is very weak as there have yet to be any clinical trials to determine which surgery is better overall. The Proximal FEmur Resection or InternalFixation fOR Metastases (PERFORM) trial will assign patients by chance (randomize) to 1 of the 2 surgeries. The patients will be followed for 1 year to see which surgery results in better cancer- and surgery-related, as well as quality-of-life, outcomes.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our Methods Center and participating clinical sites collectively possess the methodological, logisticaland clinical expertise required to successfully confirm the feasibility of the PERFORM trial. Ultimately, this trial has the potential to effect significant changes in orthopaedic oncology clinical practice and improve the oncologic, functional, and quality of life outcomes of patients with cancers that have metastasized to their proximal femur. While the introduction of a more invasive yet more durable procedure would represent a paradigm shift in the approach to this patient population, the challenge weconfront is to support this practice change with high-quality, concrete evidence.
              </p>
          </div>
          <div className="flex flex-col items-start justify-center">
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
        </section>
      </div>
    </div>
  )
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