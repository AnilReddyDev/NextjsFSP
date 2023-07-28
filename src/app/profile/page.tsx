"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import React from "react";

export default function page() {
  const router = useRouter();
  const [Loading,isLoading] = React.useState(false);
  const onLogOut = async ()=>{
      try {
        isLoading(true)
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/login')
      } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
        
      }finally{
        isLoading(false)
      }
  }
  return (
    
    <div className="flex flex-col items-center justify-center h-screen  ">
        <h1 className="text-center text-2xl items-center">Profile Page</h1>
        <button onClick={onLogOut} className="p-3 bg-sky-700">Logout</button>
        <p className="text-xl">{Loading ? "Processing......." : ""}</p>
    </div>
  )
}
