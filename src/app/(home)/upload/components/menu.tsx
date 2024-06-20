"use client"

import * as React from "react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from '@/components/ui/scroll-area'

interface MenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const Menu = ({ open, setOpen, children }: MenuProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className='h-full'>
          <ScrollArea className='h-full overflow-h-auto'>
        <DrawerHeader className="text-left">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 h-full">
            <div className='border-b py-4'>
              <Link href='/' onClick={() => setOpen(false)}>Home</Link>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-b">
                <div className='flex justify-between items-center'>
                  <Link href='/' onClick={() => setOpen(false)}>About</Link>
                  <AccordionTrigger className='border-l px-4'></AccordionTrigger>
                </div>
                <AccordionContent className='pl-2'>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Trial Summary</Link>
                  </div>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Protocol</Link>
                  </div>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Research Priorities in Sarcoma</Link>
                  </div>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Systematic Review</Link>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-b">
                      <div className='flex justify-between items-center'>
                        <Link href='/' onClick={() => setOpen(false)}>Protocol Development</Link>
                        <AccordionTrigger className='border-l px-4'></AccordionTrigger>
                      </div>
                      <AccordionContent className='pl-2'>
                        <div className='border-b py-4'>
                          <Link href='/' onClick={() => setOpen(false)}>Patient Survey</Link>
                        </div>
                        <div className='border-b py-4'>
                          <Link href='/' onClick={() => setOpen(false)}>Investigator Meeting</Link>
                        </div>                      
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-b">
                <div className='flex justify-between items-center'>
                  <Link href='/' onClick={() => setOpen(false)}>Collaboration</Link>
                  <AccordionTrigger className='border-l px-4'></AccordionTrigger>
                </div>
                <AccordionContent className='pl-2'>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Investigator Application Form</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-b">
                <div className='flex justify-between items-center'>
                  <Link href='/' onClick={() => setOpen(false)}>Resources</Link>
                  <AccordionTrigger className='border-l px-4'></AccordionTrigger>
                </div>
                <AccordionContent className='pl-2'>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Investigator Resources</Link>
                  </div>
                  <div className='border-b py-4'>
                    <Link href='/' onClick={() => setOpen(false)}>Patient Resources</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className='border-b py-4'>
              <Link href='/' onClick={() => setOpen(false)}>Contact Us</Link>
            </div>
            <div className='border-b py-4'>
              <Link href='/' onClick={() => setOpen(false)}>News</Link>
            </div>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}