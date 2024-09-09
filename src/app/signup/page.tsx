"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export default function LoginForm() {


  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

 
  const createAccount = () => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        age: age,
        role: role
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
          if (data.success) {
            toast.success(data.message)
            router.push("/");
          }
          else {
            toast.error(data.message)

          }
        
      });
  
  };

  return (
  <div className="h-[100vh] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        
        
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              type="email"
              placeholder="psycho"
              required
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" type="password" />
          </div>

  
          <Button onClick={createAccount} type="submit" className="w-full">
            Create an account
          </Button>

        </div>





        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}