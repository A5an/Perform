import Link from "next/link"

import { Globe, LogOut, Pen } from 'lucide-react';
import { MyLeafletMap } from './components/leafelt-map';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const articles = await prisma.article.findMany({});

  return (
    <div>
      <div className='max-w-6xl mx-auto'>
        <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6 lg:py-16 mt-24">
          <div className="flex flex-col items-center justify-center gap-4 col-span-1">
            <Link
              href="/"
              className="flex h-full w-full flex-col items-center justify-center bg-teal-500 p-6 text-center transition-colors hover:bg-teal-100 hover:text-black text-white"
              prefetch={false}
            >
              <div className="flex justify-between items-center font-bold w-full px-4">
                <div className="text-left">
                  <p className="text-2xl">Safety Audits</p>
                  <p>More Information</p>
                </div>
                <div>
                  <Globe className='w-8 h-8' />
                </div>
              </div>
            </Link>
            <Link
              href="/"
              className="flex h-full w-full flex-col items-center justify-center bg-teal-500 p-6 text-center transition-colors hover:bg-teal-100 hover:text-black text-white"
              prefetch={false}
            >
              <div className="flex justify-between items-center font-bold w-full px-4">
                <div className="text-left">
                  <p className="text-2xl">Training and Education</p>
                  <p>More Information</p>
                </div>
                <div>
                  <Pen className='w-8 h-8' />
                </div>
              </div>
            </Link>
            <Link
              href="/"
              className="flex h-full w-full flex-col items-center justify-center bg-teal-500 p-6 text-center transition-colors hover:bg-teal-100 hover:text-black text-white"
              prefetch={false}
            >
              <div className="flex justify-between items-center font-bold w-full px-4">
                <div className="text-left">
                  <p className="text-2xl">Risk Management Consulting</p>
                  <p>More Information</p>
                </div>
                <div>
                  <LogOut className='w-8 h-8' />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <MyLeafletMap />
          </div>
        </main>
        <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:py-16">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">About The Trial</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              PERFORM is at the forefront of advancing orthopedic treatments for patients with metastatic bone disease. Our dedicated team of healthcare professionals and researchers is committed to improving patient outcomes through innovative surgical techniques and cutting-edge research.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We pride ourselves on our commitment to excellence, patient care, and continuous improvement. Our services are designed to address the unique challenges faced by patients with metastatic bone disease, ensuring they receive the highest standard of care.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">What do we do</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              <b>Clinical Research</b><br></br>
              Our team of experts conducts rigorous clinical trials to develop and refine surgical techniques for proximal femur resection and internal fixation for metastases.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              <b>Patient Education</b><br></br>
              We provide comprehensive educational resources to help patients understand their condition and treatment options, empowering them to make informed decisions about their care.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              <b>Consultation Services</b><br></br>
              Our experienced orthopedic surgeons offer consultation services to healthcare providers, ensuring the best possible treatment plans for patients with complex bone metastases.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              <b>Post-Surgical Support</b><br></br>
              We offer a range of post-surgical support services, including physical therapy and rehabilitation programs, to help patients recover and regain mobility following their procedures.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Explore Our Articles</h2>
            <div className="grid grid-cols-2 gap-4">              
              {articles.length > 0 ? articles.map((article) => (
                <Link
                  href={`/articles/${article.id}`}
                  className="flex h-full w-full flex-col items-start justify-center rounded-lg bg-gray-100 p-6 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 min-w-52"
                  prefetch={false}
                  key={article.id}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {article.description}
                  </p>
                </Link>
              )) : (
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Currently there are no articles available
                </h4>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}