// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setSearchValue, handleTypeChats} from 'store/chatSlice'

// * icons
import {AiOutlineSearch} from 'react-icons/ai'

export default function SidebarForm() {
    const {isPrivatChats} = useSelector(state => state.chat)

    const dispatch = useDispatch()

    // ** записывает изменения в переменную
    const onChange = (e) => {
        const {value} = e.target
        dispatch(setSearchValue(value))
    }
    return (
        <div className='flex flex-col gap-2 items-center justify-center h-full w-full px-2'>
            <div className='flex items-center rounded-full border-2 border-solid border-gray-200 dark:border-gray-800 h-12 w-full bg-opacity-80 text-secondary px-4 mt-2'>
                <div className=' text-4xl'>
                    <AiOutlineSearch/>
                </div>
                <input 
                    onChange={onChange}
                    className="w-full bg-transparent outline-none text-xl font-semibold px-2 text-secondary"
                    type="text" 
                    placeholder='Search chat'
                />
            </div>
            <div className='flex justify-center items-center px-4 mb-2 gap-[1px]'>
                <button 
                    onClick={() => dispatch(handleTypeChats())}
                    className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-l-full  text-primary font-semibold w-40 ${isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                >
                    privat chats
                </button>
                <button 
                    onClick={() => dispatch(handleTypeChats())}
                    className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-r-full text-primary font-semibold w-40 ${!isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                >
                    group chats
                </button>
            </div>
        </div>
    )
}