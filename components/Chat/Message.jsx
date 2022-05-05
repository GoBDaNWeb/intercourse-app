import moment from 'moment';
import TheirAvatar from 'components/profile/TheirAvatar'
import {useEffect} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

export default function Message({message, lastMessage}) {
    const isFirstMessageByUser = !lastMessage || lastMessage.user_id !== message.user_id;
    const {isTheirProfileOpen} = useSelector(state => state.profile)

    const dispatch = useDispatch()

    // ! Удалить
    useEffect(() => {
        console.log(message)
    }, [message])

    return (
        <div className="relative flex items-start justify-start gap-2 w-full min-h-10 ">
            {isFirstMessageByUser && message
             && <div 
                    onClick={() => {
                        dispatch(setTheirProfileData(message.user_id))
                        if (!isTheirProfileOpen) {
                            dispatch(handleOpenTheirProfile())
                        }
                    }}
                    className="their-avatar-resolve group absolute -left-14 top-2 flex items-center justify-center font-semibold text-2xl text-white w-12 h-12 grad-1 rounded-full shadow-custom cursor-pointer"
                >
                    <TheirAvatar user_id={message.user_id} size={48} text_size={'xl'}/>
                <div className='min-w-12 absolute top-0 left-12 flex flex-col items-center p-2 pointer-events-none rounded-xl group-hover:pointer-events-auto bg-primary opacity-0 their-avatar-child transition z-50 shadow-custom'>
                    <TheirAvatar user_id={message.user_id} size={102} text_size={'6xl'}/> 
                    <div className='flex items-center text-primary gap-2'>
                        <h5 className='text-lg whitespace-nowrap'>
                            {message.author}
                        </h5>
                        <AiOutlineStar/>
                    </div>
                </div>
            </div>
            }
            <div className='min-h-10 min-w-20 max-w-[70%]'>
                {
                    isFirstMessageByUser && message
                    && <h6 className=' mb-4 italic font-semibold text-black opacity-50 absolute '>
                        {message.author}
                        </h6>
                }
                <div className={`flex gap-2 items-end  bg-white p-2 rounded-2xl shadow-custom ${isFirstMessageByUser ? 'mt-6' : ''}`}>
                    <div >
                        {message.message}
                    </div>
                    <span className="text-sm bg-black bg-opacity-10 px-2 rounded-full">
                    {moment(message.inserted_at).format('h:mm')}
                    </span>
                </div>
            </div>
            
        </div>
    )
}