import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import { Lock } from "lucide-react"

export default function EntryCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center">
        <CardTitle>Link Title</CardTitle><Lock className="ml-5 text-1xl"/>
        </div>
        <CardDescription>Link Description.</CardDescription>
      </CardHeader>
      <CardContent>
      <Badge>Badge</Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Open</Button>
      </CardFooter>
    </Card>
  )
}
