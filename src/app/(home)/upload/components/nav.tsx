"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col space-y-4 lg:flex lg:flex-row lg:space-y-0 lg:space-x-4">
      <Link
        href="/"
        className={cn(
          "text-black ml-8 text-xl",
          pathname === "/"
            ? "hover:no-underline underline"
            : "hover:underline no-underline"
        )}
        prefetch={false}
      >
        Home
      </Link>
      <NavigationMenu className="">
        <NavigationMenuList className="">
          <NavigationMenuItem className="">
            <NavigationMenuTrigger
              className={cn(
                "text-black mx-4 text-xl",
                pathname === "/about"
                  ? "hover:no-underline underline"
                  : "hover:underline no-underline"
              )}
            >
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenu className="w-full animate-none">
                <NavigationMenuList className="w-full animate-none">
                  <NavigationMenuItem className="w-full animate-none">
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full whitespace-nowrap justify-start"
                      )}
                    >
                      Protocol Development
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full animate-none">
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full whitespace-nowrap justify-start"
                          )}
                        >
                          Patient Survey
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full whitespace-nowrap justify-start"
                          )}
                        >
                          Investigator Meeting
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start"
                  )}
                >
                  Trial Summary
                </NavigationMenuLink>
              </Link>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start"
                  )}
                >
                  Protocol
                </NavigationMenuLink>
              </Link>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start"
                  )}
                >
                  Research Priorities In Sarcoma
                </NavigationMenuLink>
              </Link>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start"
                  )}
                >
                  Systematic Review
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="">
        <NavigationMenuList className="">
          <NavigationMenuItem className="">
            <NavigationMenuTrigger
              className={cn(
                "text-black mx-4 text-xl",
                pathname === "/collabaration"
                  ? "hover:no-underline underline"
                  : "hover:underline no-underline"
              )}
            >
              Collaboration
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/collabaration" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start"
                  )}
                >
                  Investigator Application
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="">
        <NavigationMenuList className="">
          <NavigationMenuItem className="">
            <NavigationMenuTrigger
              className={cn(
                "text-black mx-4 text-xl",
                pathname === "/recources"
                  ? "hover:no-underline underline"
                  : "hover:underline no-underline"
              )}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenu className="w-full animate-none">
                <NavigationMenuList className="w-full animate-none">
                  <NavigationMenuItem className="w-full animate-none">
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full whitespace-nowrap justify-start py-11"
                      )}
                    >
                      Investigator Recources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full animate-none">
                      <Link href="/recources" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full whitespace-nowrap justify-start"
                          )}
                        >
                          Newsletters
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/recources" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full whitespace-nowrap justify-start"
                          )}
                        >
                          SAFETY Protocol
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href="/recources" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full whitespace-nowrap justify-start py-11"
                  )}
                >
                  Patient Recources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/contact-us"
        className={cn(
          "text-black ml-16 text-xl",
          pathname === "/contact-us"
            ? "hover:no-underline underline"
            : "hover:underline no-underline"
        )}
        prefetch={false}
      >
        Contact Us
      </Link>
      <Link
        href="/news"
        className={cn(
          "text-black ml-16 text-xl",
          pathname === "/news"
            ? "hover:no-underline underline"
            : "hover:underline no-underline"
        )}
        prefetch={false}
      >
        News
      </Link>
    </nav>
  )
}