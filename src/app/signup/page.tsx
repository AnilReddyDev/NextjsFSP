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
        dob:"",
        email: "",
        password: "",
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
            if (button== true) {
                alert("Error! Enter all fields")
            }else{
                alert("Email already exisits!")
            }
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }
        finally{
            isLoading(false)
        }
    }
    useEffect(() => {
        if ( user.username > "" && user.email > "" && user.password >"" && user.dob > ""){
            isButtonDisabled(false);
        }
        else{
            isButtonDisabled(true)
        }
    }, [user])
    
    return (
        <>
            <div className="w-auto max-h-screen flex justify-center items-center  flex-col p-20 ">
            <div className="p-5 bg-slate-50 rounded-md font-medium flex flex-col justify-center items-center">
                <h1 className="text-2xl font-mono text-black">Signup</h1>
                <hr />

                <div className="p-5">
                <label htmlFor="username" className="text-xl font-mono text-black">Username : </label>
                <input
                    className="text-black p-2  bg-slate-200 rounded-sm"
                    type="text"
                    id="username"
                    value={user.username}
                    placeholder="username"
                    onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>

                <div className="p-5">
                <label htmlFor="dob" className="text-xl font-mono text-black">Date fo birth : </label>
                <input
                    className="text-black p-2  bg-slate-200 rounded-sm"
                    type="date"
                    id="dob"
                    value={user.dob}
                    placeholder="dob"
                    onChange={(e) => setUser({ ...user, dob: e.target.value })} />
                </div>

                <div className="p-5">
                <label htmlFor="email" className="text-xl font-mono text-black">Email id : </label>
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
                    className="text-black p-2  bg-slate-200 rounded-sm"
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div className="p-5">
                    <button onClick={onSignUp} className="p-3 bg-orange-600 font-bold font-mono rounded-sm">{button ? "No signup" :"Signup"}</button>
                </div>
                <div>
                    <Link href="/login" className="text-blue-600 underline">Login Now</Link>
                </div>
                <p className="font-mono text-black  text-sm p-3">{Loading ? "Processing......." : ""}</p>
                </div>
            </div>
        </>
    )
}