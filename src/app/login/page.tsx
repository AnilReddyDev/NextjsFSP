"use client";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [Loading,isLoading] = React.useState(false);
    const [button,isButtonDisabled] = React.useState(false);

    const onLogin = async ()=>{   
        try {
            isLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login is successfull",response.data);
            router.push("/")
        } catch (error:any) {
            alert("Invalid email or password!")
            console.log("Login failed",error.message);
            toast.error(error.message)
        }finally{
            isLoading(false)
        }

    }

    return (
        <>
            <div className="w-auto max-h-screen flex justify-center items-center  flex-col p-20 ">
            <div className="p-5 bg-slate-50 rounded-md font-medium flex flex-col justify-center items-center">
               <h1 className="text-2xl font-mono text-black">Login</h1>
                <hr />
                <div className="p-5">
                <label htmlFor="email" className="text-xl font-mono text-black">Email Id : </label>
                <input
                    className="text-black p-2  bg-slate-200 rounded-sm"
                    type="email"
                    id="email"
                    value={user.email}
                    placeholder="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                    <br />
                <div className="p-5">
                <label htmlFor="password" className="text-xl font-mono text-black">Password : </label>
                <input
                    className="text-black p-2 bg-slate-200 rounded-sm" 
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div >
                    <button onClick={onLogin} className=" p-2 mx-5 bg-orange-600 font-bold font-mono rounded-sm">Login</button>
                </div>
                <div className="p-5">
                    <Link href="/signup" className="text-blue-600 underline">Signup now</Link>
                </div>
                <p className="text-sm font-mono text-black ">{Loading ? "Processing......." : ""}</p>
               </div>
            </div>
        </>
    )
}