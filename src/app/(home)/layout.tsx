"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SVGProps } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  return (
    <>
      <header className="my-4 top-0 left-0 right-0 z-[999]">
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
            <NavigationMenu className=''>
              <NavigationMenuList className=''>
                <NavigationMenuItem className=''>
                  <NavigationMenuTrigger className={cn("text-black mx-4 text-xl", pathname === "/about" ? "hover:no-underline underline" : "hover:underline no-underline")}>
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenu className='w-full animate-none'>
                      <NavigationMenuList className='w-full animate-none'>
                        <NavigationMenuItem className='w-full animate-none'>
                          <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                            Protocol Development
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className='w-full animate-none'>
                            <Link href="/about" legacyBehavior passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                                Patient Survey
                              </NavigationMenuLink>
                            </Link>
                            <Link href="/about" legacyBehavior passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                                Investigator Meeting
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                        Trial Summary
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                        Protocol
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                        Research Priorities In Sarcoma
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                        Systematic Review
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className=''>
              <NavigationMenuList className=''>
                <NavigationMenuItem className=''>
                  <NavigationMenuTrigger className={cn("text-black mx-4 text-xl", pathname === "/collabaration" ? "hover:no-underline underline" : "hover:underline no-underline")}>
                    Collabaration
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link href="/collabaration" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                        Investigator Application
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className=''>
              <NavigationMenuList className=''>
                <NavigationMenuItem className=''>
                  <NavigationMenuTrigger className={cn("text-black mx-4 text-xl", pathname === "/recources" ? "hover:no-underline underline" : "hover:underline no-underline")}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                  <NavigationMenu className='w-full animate-none'>
                      <NavigationMenuList className='w-full animate-none'>
                        <NavigationMenuItem className='w-full animate-none'>
                          <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start py-11")}>
                            Investigator Recources
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className='w-full animate-none'>
                            <Link href="/recources" legacyBehavior passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                                Newsletters
                              </NavigationMenuLink>
                            </Link>
                            <Link href="/recources" legacyBehavior passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>
                                SAFETY Protocol
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <Link href="/recources" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start py-11")}>
                        Patient Recources
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              href="/contact-us"
              className={cn("text-black ml-16 text-xl", pathname === "/contact-us" ? "hover:no-underline underline" : "hover:underline no-underline")}
              prefetch={false}
            >
              Contact Us
            </Link>
            <Link
              href="/news"
              className={cn("text-black ml-16 text-xl", pathname === "/news" ? "hover:no-underline underline" : "hover:underline no-underline")}
              prefetch={false}
            >
              News
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
      <main>{children}</main>
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
                Email: info@performtrial.com
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
                PERFORM is proudly sponsored by the Orthopedic Research Foundation, a non-profit organization dedicated to supporting advancements in orthopedic surgery and patient care.
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
                <span className="text-gray-600 dark:text-gray-400">Orthopedic Research Foundation</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">Funders</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                PERFORM is funded by a diverse group of investors and healthcare foundations who believe in our mission to improve treatment options for patients with metastatic bone disease.
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
    </>
  );
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