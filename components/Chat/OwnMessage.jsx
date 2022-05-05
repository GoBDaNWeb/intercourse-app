import moment from 'moment';
import {BsPencil} from 'react-icons/bs'
import {updateMessage} from '../../utils/Store'

export default function OwnMessage({message}) {

    const update = () => {
        updateMessage()
    }

    return (
        <div className="flex items-center justify-end w-full min-h-10 pl-40 group">

            <div className="flex gap-2 items-end min-h-10 min-w-20 max-w-[85%] bg-[#21978B] text-white p-2 rounded-2xl shadow-custom">
                <div >
                    {message.message}
                </div>
                <div className='relative w-12'>
                    <span className="absolute right-0 bottom-0 text-sm bg-black bg-opacity-10 px-2 rounded-full group-hover:opacity-0 transition">
                        {moment(message.inserted_at).format('h:mm')}
                    </span>
                    <div className='absolute right-0 bottom-0 p-1 bg-black bg-opacity-10 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer'>
                        <BsPencil/>
                    </div>
                </div>
            </div>
        </div>
    )
}