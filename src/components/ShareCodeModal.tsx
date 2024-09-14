import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ShareCodeModal ({shareCode, isModalOpen, setIsModalOpen}:any) {
  


  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  const copyToClipboard = () => {
    try {
        navigator.clipboard.writeText(shareCode)
        toast.success("Share Code copied to clipboard");
    }
    catch(error) {
        toast.error("Error occured while copying code")
    }

  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
     

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
              <h2 className="text-xl font-semibold">Entry Created</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4">
              <p className="text-gray-700">Here is the share code for this entry</p>

              <div className="my-5 flex items-center" >
              <h1 className="text-3xl font-bold mx-5">{shareCode}</h1>
              <Button onClick={copyToClipboard}>{<Copy/>}</Button>
              </div>
              <b>How to access?</b>
              <p>Go to https://kuick-share.vercel.app/entry/<b>{shareCode}</b></p>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeModal}
                className="px-4 py-2 text-white rounded hover:bg-red-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

