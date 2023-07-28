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
            router.push("profile")
        } catch (error:any) {
            console.log("Login failed",error.message);
            toast.error(error.message)
        }finally{
            isLoading(false)
        }

    }

    return (
        <>
            <div className="w-auto max-h-screen flex justify-center items-center  flex-col p-20 ">
                <h1 className="text-2xl">Login</h1>
                <hr />
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
                <div>
                    <button onClick={onLogin} className="p-3 bg-orange-400">Login</button>
                </div>
                <div className="p-5">
                    <Link href="/signup">Signup now</Link>
                </div>
                <p className="text-xl">{Loading ? "Processing......." : ""}</p>
            </div>
        </>
    )
}