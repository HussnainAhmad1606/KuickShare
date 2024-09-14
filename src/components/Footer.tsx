"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export default function Footer() {
  return (
    <div className="flex justify-center items-center">

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="https://github.com/HussnainAhmad1606/" target="_blank">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Developed by: Psycho Coder
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}
