// import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
   <div className="bg-black max-h-screen h-96 flex justify-end items-center flex-col">
    <h1 className="text-white font-mono text-2xl">Home Page</h1>
    <Link className="underline font-mono" href="/profile">goto profile</Link>
   </div>
  )
}
