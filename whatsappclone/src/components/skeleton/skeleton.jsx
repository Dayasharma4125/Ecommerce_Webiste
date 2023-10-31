function SkeletonH() {
    let s = []
    for (let i = 0; i < 12; i++) {
        s.push(<div className="flex justify-start  animate-pulse relative overflow-hidden items-center flex-col p-3 m-3 border-transparent border-solid border-2 rounded-xl " key={i} >
            <div className=" bg-gray-950 w-full  rounded-xl   h-56" ></div>
            <div className=" bg-gray-950 w-full  rounded-xl my-2 h-7" ></div>
            <div className=" bg-gray-950 w-full rounded-xl  h-7" ></div>
        </div>)
    }
    return (
        <div className="skeleton container mx-auto">
            <div className=" animate-pulse  h-32 mx-auto rounded-xl w-11/12 bg-gray-950"></div>
            <div className="grid grid-cols-1 ms:grid-cols-1 medium:grid-cols-2 medium:gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  lg:gap-1 3xl:grid-cols-5 xl:gap-1 gap-4">
                {s}
            </div>
        </div>
    )
}

export default SkeletonH