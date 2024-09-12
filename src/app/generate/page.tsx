"use client"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export default function CardWithForm() {
  const [expiryCriteria, setExpiryCriteria] = React.useState("no");
  const [views, setViews] = React.useState(0);
  const [date, set] = React.useState(null);

  const show = () => {
    console.log(expiryCriteria)
  }
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
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
              <Input id="name" placeholder="Name of link" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content/Link to share</Label>
              <Textarea id="content" placeholder="Content" />
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
                  <SelectItem value="time">Time/Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
           {
           expiryCriteria=="no"?(
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


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passcode">Passcode</Label>
              <Input id="passcode" placeholder="Passcode of link" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={show}>Generate</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
