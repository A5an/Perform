"use client";

import Link from "next/link"
import Image from 'next/image'
import dynamic from "next/dynamic"

import { SVGProps, useMemo } from 'react'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Globe, LogOut, Pen } from 'lucide-react';

export default function Home() {
  const pathname = usePathname()

  const LeafletMap = useMemo(
    () => dynamic(() => import("./components/map"), { ssr: false }),
    []
  );

  return (
    <div>
      <div className='max-w-6xl mx-auto'>
        <header className="my-4 top-0 left-0 right-0 z-10">
          <div className="container mx-auto flex items-center justify-start px-4 md:px-6">
            <div className='relative w-96 h-24'>
              <Link href="#" className="flex items-center" prefetch={false}>
                <Image 
                  src={"/logo.png"}
                  alt="Perform logotype"
                  className='object-contain'
                  fill
                />
              </Link>
            </div>
            <nav className="hidden flex-col space-y-4 md:flex md:flex-row md:space-y-0 md:space-x-4">
              <Link
                href="/"
                className={cn("text-black ml-16 text-xl", pathname === "/" ? "hover:no-underline underline" : "hover:underline no-underline")}
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/upload/pdf"
                className={cn("text-black ml-16 text-xl", pathname === "/upload/pdf" ? "hover:no-underline underline" : "hover:underline no-underline")}
                prefetch={false}
              >
                Upload Your PDF
              </Link>
            </nav>
          </div>
        </header>
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
            <LeafletMap />
          </div>
        </main>
        <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:py-16">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">About Our Company</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Acme Inc is a leading provider of innovative solutions for businesses of all sizes. Our team of experts is
              dedicated to helping our clients achieve their goals and succeed in today's competitive market.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We pride ourselves on our commitment to quality, customer service, and continuous improvement. Our products
              and services are designed to meet the unique needs of each of our clients, and we work tirelessly to ensure
              their satisfaction.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Explore Our Services</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="#"
                className="flex h-full w-full flex-col items-start justify-center rounded-lg bg-gray-100 p-6 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">Web Development</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team of experts can help you build a custom website that meets your business needs.
                </p>
              </Link>
              <Link
                href="#"
                className="flex h-full w-full flex-col items-start justify-center rounded-lg bg-gray-100 p-6 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">Digital Marketing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We can help you reach your target audience and grow your business through effective digital marketing
                  strategies.
                </p>
              </Link>
              <Link
                href="#"
                className="flex h-full w-full flex-col items-start justify-center rounded-lg bg-gray-100 p-6 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">IT Consulting</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team of experts can provide you with the guidance and support you need to make informed decisions
                  about your technology investments.
                </p>
              </Link>
              <Link
                href="#"
                className="flex h-full w-full flex-col items-start justify-center rounded-lg bg-gray-100 p-6 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">Cloud Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We can help you migrate your business to the cloud and take advantage of the latest cloud-based
                  technologies.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                123 Main Street
                <br />
                Anytown, USA 12345
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Phone: (123) 456-7890
                <br />
                Email: info@acmeinc.com
              </p>
              <div className="flex items-center mt-4">
                <FacebookIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
                <TwitterIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
                <LinkedinIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">Sponsoring Institution</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Acme Inc is proudly sponsored by the Acme Foundation, a non-profit organization dedicated to supporting
                innovative businesses and entrepreneurs.
              </p>
              <div className="flex flex-col items-center mt-4">
                <div className='w-96 h-24 relative'>
                  <Image 
                    src={"/logo.png"}
                    alt="Perform logotype"
                    className='object-contain'
                    fill
                  />
                </div>
                <span className="text-gray-600 dark:text-gray-400">Acme Foundation</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">Funders</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Acme Inc is funded by a diverse group of investors and venture capitalists who believe in our mission and
                vision.
              </p>
              <div className="flex flex-col items-center mt-4 gap-8">
              <div className='w-96 h-24 relative'>
                  <Image 
                    src={"/logo.png"}
                    alt="Perform logotype"
                    className='object-contain'
                    fill
                  />
                </div>
                <div className='w-96 h-24 relative'>
                  <Image 
                    src={"/logo.png"}
                    alt="Perform logotype"
                    className='object-contain'
                    fill
                  />
                </div>
                <div className='w-96 h-24 relative'>
                  <Image 
                    src={"/logo.png"}
                    alt="Perform logotype"
                    className='object-contain'
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InboxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}


function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}