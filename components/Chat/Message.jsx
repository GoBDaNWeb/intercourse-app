import moment from 'moment';

export default function Message({message}) {
    return (
        <div className="flex items-center justify-start gap-2 w-full min-h-10 ">
            <div className="flex items-center justify-center font-semibold text-2xl text-white w-12 h-12 bg-gray-500 rounded-full shadow-custom">
                A
            </div>
            <div className="flex gap-2 items-end min-h-10 min-w-20 max-w-[80%] bg-white p-2 rounded-2xl shadow-custom">
                <div >
                    {message.message}
                </div>
                <span className="text-sm bg-black bg-opacity-10 px-2 rounded-full">
                {moment(message.inserted_at).format('h:mm')}
                </span>
            </div>
        </div>
    )
}