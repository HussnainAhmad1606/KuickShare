"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/store";
import { Menu, Router, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import ResponsiveNavDrawer from "./ResponsiveNavDrawer";
import { useRouter } from "next/navigation";
import { AvatarDropDown } from "./AvatarDropDown";
import { toast } from "react-hot-toast";
import { buttonVariants } from "@/components/ui/button"

const Navbar = () => {
  const router = useRouter()


  const [isOpen, setIsOpen] = useState(false)

  // const tokenVerification = async () => {
  //   var token = localStorage.getItem("sycofusion_token");
  //   var user = JSON.parse(localStorage.getItem("sycofusion_user"));
  //   console.log("User set", user)
  //   if (token || user) {
  //     setUser(user);
  //     setIsLogin(true)
  //   }
  //   else {
  //     router.push('login')
  //   }
  // };

  const logout = () => {
    localStorage.removeItem("toppr_token");

    toast.success("Logged out successfully");
  };

  // useEffect(() => {
  //   tokenVerification();
  // }, []);

  return (
    <>
      <div className='bg-background text-foreground flex w-full justify-between font-roboto shadow-md'>
        <Link href={"/"} className="ml-4">
          <Image alt="logo" width={60} height={60} src={"/logo.png"} />
        </Link>
        <nav className='hidden justify-end w-[70%] lg:flex'>
          <ul className='flex text-secondary-200 items-center justify-between lg:py-4 gap-x-4'>
            <li><a className="hover:text-foreground/60 transition-colors" href="/">Home</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/forum">Forum</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/about">About</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/contact">Contact</a></li>
            <SeparatorHorizontal orientation="vertical" className="w-[2px] bg-muted-foreground" />
          </ul>
          <div className="flex items-center justify-center mx-4">
     
                <div className="flex gap-x-4">
                  <Button asChild  variant="outline"><Link href="/generate">Generate</Link></Button>
                  <Button asChild><Link href="/login">Login</Link></Button>
                  <Button asChild><Link href="/signup">Sign up</Link></Button>
                  
                </div>
            
          </div>
        </nav>
        <div className='lg:hidden'>
          <Button asChild variant="ghost" size="icon" className='m-4 block lg:hidden' onClick={() => setIsOpen(false)}>
            <Menu />
          </Button>
        </div>
      </div>
      <ResponsiveNavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;