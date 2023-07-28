export default function page({params} : any) {
    return (
        <div className="flex items-center justify-center h-screen  ">
          <h1 className="text-center text-2xl items-center">Profile Page {params.id}</h1>
          
      </div>
    )
  }
  