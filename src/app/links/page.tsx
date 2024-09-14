"use client"
import React, { useEffect, useState } from 'react'
import EntryCard from "@/components/EntryCard";
import api from '@/utils/api';
import { toast } from 'react-hot-toast';
function page() {
  const [entries, setEntries] = useState([]);
  const getEntries = async () => {
    const response = await api.post('/entry/get-user-entries');
    console.log(response.data);
    setEntries(response.data.entries);
  }

  const deleteEntry = async (shareCode: string) => {
    const response = await api.post("/entry/delete-entry", {shareCode: shareCode});

    console.log(response);
    if (response.data.type == "success"){
      toast.success(response.data.message);
      setEntries(entries.filter((entry) => entry.shareCode != shareCode));
    }
    else {
      toast.error(response.data.message);

    }
  }

  useEffect(() => {
    getEntries();
  }, [])
  
  return (
    <div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {
        entries.map((entry, index) => {
          return <EntryCard deleteEntry={deleteEntry} key={index} entry={entry}/>
        })
      }
      </div>
    
    </div>
  )
}

export default page