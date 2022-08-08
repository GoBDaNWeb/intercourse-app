// * react/next
import {memo} from 'react'

// * redux 
import {useSelector, useDispatch} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

// * components
import Avatar from 'components/shared/Avatar'

// * moment
import moment from 'moment';

const Message = memo(({messageData, lastMessage}) => {
    const {isTheirProfileOpen} = useSelector(state => state.profile)

    const {user_id, author_avatar, author, message, inserted_at} = messageData

    const isFirstMessageByUser = !lastMessage || lastMessage.user_id !== user_id;
    const firstMessageCondition = isFirstMessageByUser && messageData

    const dispatch = useDispatch()

    const openProfile = () => {
        dispatch(setTheirProfileData(message.user_id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    return (
        <div className="relative flex items-start justify-start gap-2 w-full min-h-10 ">
            {
                firstMessageCondition
                && (
                    <div 
                        onClick={openProfile}
                        className="their-avatar-resolve group absolute -left-14 top-2 flex items-center justify-center font-semibold text-2xl text-white w-12 h-12 grad-1 rounded-full shadow-custom cursor-pointer"
                    >
                        <Avatar 
                            avatar={author_avatar} 
                            username={author} 
                            size={48} 
                            text_size={'xl'}
                        />
                    </div>
                ) 
            }
            <div className='min-h-10 min-w-20 max-w-[70%]'>
                {
                    isFirstMessageByUser && message
                    && (
                        <h6 className=' mb-4 italic font-semibold text-primary opacity-50 absolute '>
                            {author}
                        </h6>
                    )
                }
                <div className={`flex gap-2 items-end  bg-white p-2 rounded-2xl shadow-custom ${isFirstMessageByUser ? 'mt-6' : ''}`}>
                    <div >
                        {message}
                    </div>
                    <span className="text-sm bg-black bg-opacity-10 px-2 rounded-full">
                        {moment(inserted_at).format('h:mm')}
                    </span>
                </div>
            </div>
            
        </div>
    )
})

Message.displayName = 'Message';

export default Message