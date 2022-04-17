import moment from 'moment';

export default function OwnMessage({message}) {
    return (
        <div className="flex items-center justify-end w-full min-h-10 pl-40">
            <div className="flex gap-2 items-end min-h-10 min-w-20 bg-white p-2 rounded-2xl shadow-custom">
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