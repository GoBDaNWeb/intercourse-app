export default function Message() {
    return (
        <div className="flex items-center justify-start gap-2 w-full h-10 my-1">
            <div className="flex items-center justify-center font-semibold text-2xl text-white w-12 h-12 bg-gray-500 rounded-full">
                G
            </div>
            <div className="flex gap-2 items-end min-h-10 min-w-20 bg-white p-2 rounded-2xl">
                <div >
                    Lorem ipsum dolor sit amet consectetur.
                </div>
                <span className="text-sm bg-black bg-opacity-10 px-2 rounded-full">17:23</span>
            </div>
        </div>
    )
}