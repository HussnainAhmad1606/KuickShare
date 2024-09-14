import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function EnterCodeModal ({setEntry,setIsProtected,shareCode, isModalOpen, setIsModalOpen}:any) {

  const [password, setPassword] = useState("");


  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  const checkPassword = async() => {
    const res = await fetch("/api/entry/validate-entry-passcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shareCode: shareCode, passcode: password }),
    
    })
    const data = await res.json();
    if(data.type === "error") {
      toast.error(data.message);
      return;
    }
    toast.success("Passcode Correct")
    setIsProtected(false);
    setEntry(data.entry);
    console.log(data.entry)
    closeModal();
  }


  return (
  <>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
          onClick={closeModal} // Closes modal if background is clicked
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Password Protected</h2>
             
            </div>

            {/* Modal Body */}
            <div className="mt-4">
              <p className="text-gray-700">This entry is password protected, enter password to show content</p>

              <div className="my-5 flex items-center" >
              <h1 className="text-3xl font-bold mx-5">{}</h1>
            <div className="flex flex-col space-y-1.5">
           
              <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" placeholder="Enter Passcode" />
            </div>
            </div>
        
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={checkPassword}
                className="px-4 py-2 text-white rounded"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

