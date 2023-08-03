"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";

export default function page() {
  const router = useRouter();
  const [Loading,isLoading] = React.useState(false);
  const [userData,setUserData] = React.useState("")

  const getUserData =async ()=>{
    const res = await axios.get("/api/users/currentUser")
    console.log(res.data);
    setUserData(res.data.data._id);
    
  }


  

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
        <h1 className="text-center text-2xl items-center m-4">Profile Page</h1>

        <h2 className="bg-green-600 p-4">{userData==="" ? "No User Data Available" : 
              <Link href={`/profile/${userData}`}>show user data</Link> }</h2>
        {/* <h2 className="m-4">Name:{userData.username}</h2> */}
        <button onClick={onLogOut} className="p-3 m-4 bg-sky-700">Logout</button>
        <button onClick={getUserData} className="p-3 bg-sky-700">getdata</button>
        <p className="text-xl">{Loading ? "Processing......." : ""}</p>
    </div>
  )
}
