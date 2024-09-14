"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import ShareCodeModal from "@/components/ShareCodeModal"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, User } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useUserStore } from "@/store/store"
import { DateTimePicker } from '@/components/ui/datetime-picker';
export default function CardWithForm() {
  const [date12, setDate12] = React.useState<Date | undefined>(undefined);

  const {IsLogin, Username} = useUserStore();
  const [expiryCriteria, setExpiryCriteria] = React.useState("no");
  const [views, setViews] = React.useState(0);
  const [date, setDate] = React.useState(null);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [passcode, setPasscode] = React.useState("");
  const [type, setType] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [shareCode, setShareCode] = React.useState("3")


  const show = async() => {
    const data = {
      content:content,
      title: title,
      type: type,
      passcode: passcode,
      expiryCriteria: expiryCriteria,
      views: views,
      date: date12,
      username: Username
    }

    const req = await fetch("/api/entry/create-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await req.json()
    console.log(res);
    setShareCode(res.shareCode);
    setIsModalOpen(true);
  }
  return (
    <div className="flex justify-center items-center min-h-[120vh]">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Generate Link</CardTitle>
        <CardDescription>Give the info about content you want to share & click Generate</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input value={title} onChange={e=>setTitle(e.target.value)} id="name" placeholder="Name of link" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content/Link to share</Label>
              <Textarea value={content} onChange={e=>setContent(e.target.value)} id="content" placeholder="Content" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger  id="type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expiry">Expiry Criteria</Label>
              <Select onValueChange={(value) => setExpiryCriteria(value)}>
                <SelectTrigger  id="expiry">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="no">No Expiry</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="time">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
           {
           IsLogin==false&&expiryCriteria=="no"?(
              <div className="flex flex-col space-y-1.5">
              <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>You are not Logged in</AlertTitle>
        <AlertDescription>
          Make sure to add expiry criteria, you would not be able to edit it later
        </AlertDescription>
      </Alert>
              </div>
            ):null
           }


            {
              expiryCriteria=="views"?(
                <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passcode">Views</Label>
              <Input value={views} onChange={e=>setViews(Number(e.target.value))} id="passcode" placeholder="Enter views when this link will expire" />
            </div>
              ):null
            }
            {
              expiryCriteria=="time"?(
                <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passcode">Date</Label>
              <div className="flex flex-col gap-3 lg:flex-row">
      <div className="flex flex-col gap-2">
         <DateTimePicker hourCycle={12} value={date12} onChange={setDate12} />
      </div>
            </div>

            </div>

              ):null
            }
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passcode">Passcode</Label>
              <Input value={passcode} onChange={e=>setPasscode(e.target.value)} id="passcode" placeholder="Passcode of link" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={show}>Generate</Button>
      </CardFooter>
    </Card>

    <ShareCodeModal shareCode={shareCode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}
