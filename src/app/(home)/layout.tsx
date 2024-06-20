"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SVGProps, useState } from "react";
import { Nav } from './upload/components/nav';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { Menu } from './upload/components/menu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen)
  }

  return (
    <>
      <header className="my-4 top-0 left-0 right-0 z-[999] max-w-6xl mx-auto">
        <div className="container mx-auto flex items-center justify-start px-4 md:px-6">
          <div className="relative w-96 h-28">
            <Link href="#" className="flex items-center" prefetch={false}>
              <Image
                src={"/logo.png"}
                alt="Perform logotype"
                className="object-contain"
                fill
              />
            </Link>
          </div>
          <Nav />
          <Menu open={isMenuOpen} setOpen={setIsMenuOpen}>
            <Button 
              variant="ghost" 
              className="lg:hidden ml-auto" 
              onClick={toggleMenu}
            >
              <span className='mr-2'>Menu</span>
              <MenuIcon />
            </Button>
          </Menu>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="lg:container mr-auto lg:mx-auto max-w-fit grid grid-cols-1 lg:grid-cols-3 lg:gap-44 px-4 md:px-6">
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Contact Us
            </h3>
            <p className="text-lg text-gray-900 dark:text-gray-50 font-bold">
              PERFORM Trial
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Methods Centre
              <br />
              Juravinski Hospital – Lakeview Lodge
              <br />
              711 Concession St, Level 3 Room 11
              <br />
              Hamilton, ON, Canada, L8V 1C3
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Email:{" "}
              <a href="mailto:info@performtrial.com">ghertm@mcmaster.ca</a>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Sponsoring Institution
            </h3>
            <div className="w-48 h-24 relative mb-4">
              <Image
                src={"/fwdwebsite/mcmaster_logo_transparent.png"}
                alt="Perform logotype"
                className="object-cover"
                fill
              />
            </div>

            <div className="w-48 h-24 relative">
              <Image
                src={"/fwdwebsite/UMB-Logo.jpeg"}
                alt="Perform logotype"
                className="object-cover"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Funders
            </h3>

            <div className="w-56 h-24 relative mb-4">
              <Image
                src={"/fwdwebsite/ccsri-300x110.jpg"}
                alt="Perform logotype"
                className="object-cover"
                fill
              />
            </div>
            <div className="w-56 h-24 relative">
              <Image
                src={"/fwdwebsite/NIH-logo.png"}
                alt="Perform logotype"
                className="object-cover"
                fill
              />
            </div>            
          </div>
        </div>
      </footer>
    </>
  );
}
