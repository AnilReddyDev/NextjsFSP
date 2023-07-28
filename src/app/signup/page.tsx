"use client";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    })
    const [button,isButtonDisabled]=React.useState(true);
    const [Loading,isLoading] = React.useState(false)
    const onSignUp = async ()=>{
        try {
            isLoading(true)
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success", response.data);
            router.push("login")
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }
        finally{
            isLoading(false)
        }
    }
    useEffect(() => {
        if ( user.username > "" && user.email > "" && user.password >"" ){
            isButtonDisabled(false);
        }
        else{
            isButtonDisabled(true)
        }
    }, [user])
    
    return (
        <>
            <div className="w-auto max-h-screen flex justify-center items-center  flex-col p-20 ">
                <h1 className="text-2xl">Signup</h1>
                <hr />
                <div className="p-5">
                <label htmlFor="username" className="text-xl">username : </label>
                <input
                    className="text-black p-2"
                    type="text"
                    id="username"
                    value={user.username}
                    placeholder="username"
                    onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div className="p-5">
                <label htmlFor="email" className="text-xl">email id : </label>
                <input
                    className="text-black p-2"
                    type="email"
                    id="email"
                    value={user.email}
                    placeholder="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                    <br />
                <div className="p-5">
                <label htmlFor="password" className="text-xl">password : </label>
                <input
                    className="text-black p-2"
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div className="p-5">
                    <button onClick={onSignUp} className="p-3 bg-orange-400">{button ? "No signup" :"Signup"}</button>
                </div>
                <div>
                    <Link href="/login">Login Now</Link>
                </div>
                <p className="text-xl">{Loading ? "Processing......." : ""}</p>
            </div>
        </>
    )
}