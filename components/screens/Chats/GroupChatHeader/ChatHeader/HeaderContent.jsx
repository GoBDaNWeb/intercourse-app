// * react/next
import {useContext } from 'react'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * icons
import {IoMdSettings} from 'react-icons/io'

export default function HeaderContent() {
    const {isOpenMenu, setIsOpenMenu, groupChatData} = useContext(GroupChatContext)

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center gap-2 text-primary font-semibold text-2xl'>
                <h4 className='relative'>
                    {groupChatData?.chat_title} 
                    <span 
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
                        className='absolute right-[-30px] bottom-1 group-hover:opacity-100 opacity-0 transition cursor-pointer'
                    >
                        <IoMdSettings/>
                    </span>
                </h4>
            </div>
        </div>
    )
}