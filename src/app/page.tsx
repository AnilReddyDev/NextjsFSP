"use client";
// import Image from 'next/image'
import Link from "next/link"
import axios from "axios"
import React from "react";
import { useEffect } from "react";
export default function Home() {

  const [userData,setUserData] = React.useState({username:""});

  const getUserData = async ()=>{
    try {
      const res = await axios.get("/api/users/currentUser")
      setUserData(res.data.data);
    } catch (error:any) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    getUserData();
  }, [])
  
  return (
   <div className="bg-black h-screen flex justify-center items-center flex-col">
    <div className="px-10 py-16 bg-slate-50 rounded-md font-medium flex flex-col justify-between">
    <div>
    <h1 className="font-mono text-2xl text-black px-1 py-2">Hey! {userData.username}</h1>
    <h1 className="font-mono text-2xl text-black px-1 py-2">How's your day going!</h1>
    </div>
    <Link className="bg-orange-600 font-bold font-mono rounded-sm mx-1 my-4 px-4 py-2 w-40" href="/profile">check profile</Link>
    </div>
   </div>
  )
}
