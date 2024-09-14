"use client"
import React, { useEffect, useState } from 'react';
import EnterCodeModal from "@/components/EnterCodeModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'timeago.js';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea"
import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

function page({params}:any) {
    const {shareCode} = params;
    const [entry, setEntry] = useState<any>(null);
    const [passcode, setPasscode] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isProtected, setIsProtected] = useState(true);
    const [msg, setMsg] = useState("Content is Protected");

    const increaseAccessCount = async() => {
        const res = await fetch(`/api/entry/increase-access-count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({shareCode: shareCode})
        });
        const data = await res.json();
        console.log(data);
    }
    const getEntry = async() => {
        const res = await fetch(`/api/entry/get-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({shareCode: shareCode})
        });
        const data = await res.json();
       if (data.type == "success") {
        if (data.isProtected) {
          setIsModalOpen(true);
          setIsProtected(true);
      }
      else {
        setIsProtected(false);
        setEntry(data.entry);
        increaseAccessCount();
      }
      }
      else {
        setIsModalOpen(false);
        toast.error(data.message);
        setMsg(data.message)
      }
    }

    useEffect(() => {
      getEntry();
    }, [])

    const copyToClipboard = async() => {
     
        await navigator.clipboard.writeText(entry?.content);
        toast.success('Copied to clipboard');
    
    }
    



  return (
    <div>
        <EnterCodeModal increaseAccessCount={increaseAccessCount} setEntry={setEntry} shareCode={shareCode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsProtected={setIsProtected}/>
        {
          isProtected?(
            <div className='flex justify-center items-center w-full h-screen'>
            <h1 className='font-bold text-4xl'>{msg}</h1>
              </div>
          ):(
           <div className='flex justify-center items-center h-[120vh] w-full'>
             <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Entry Details</CardTitle>
        <CardDescription>Type: {entry?.type}</CardDescription>
        <CardDescription>Created: {format(new Date(entry?.createdAt))}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input value={entry?.title} id="name" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className='flex justify-between items-center'>
              <Label htmlFor="content">Content</Label>
              <div>{<Copy onClick={copyToClipboard}/>}</div>
              </div>
              <Textarea value={entry?.content} placeholder=""  />
            </div>
          </div>
        </form>
      </CardContent>
   
    </Card>
            </div>
          )

        }
    </div>
  )
}

export default page