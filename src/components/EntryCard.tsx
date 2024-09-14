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

import { Badge } from "@/components/ui/badge"

import { Lock } from "lucide-react"
import Link from "next/link"

export default function EntryCard({entry, deleteEntry}: {entry: any, deleteEntry: any}) {
 
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center">
        <CardTitle>{entry?.title}</CardTitle>
        {
          entry?.passcodeHash==""?null:(
            <Badge className="ml-2">
              <Lock size={16} />
            </Badge>
          )
        }
        </div>

        <CardDescription>Created: {new Date(entry?.createdAt).toLocaleString()}</CardDescription>
        <CardDescription>Encrypted Content:</CardDescription>
        <CardDescription>{entry?.encryptedContent}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>

        <Link href={`/entry/${entry?.shareCode}`}>
        Open
        </Link>
        </Button>
        <Button onClick={()=> {
          deleteEntry(entry?.shareCode);
        }} variant={"destructive"}>

        Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
