// * react
import {memo, useCallback} from 'react'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setSearchValue, handleTypeChats} from 'store/sidebarSlice'

// * components 
import SearchInput from 'components/ui/SearchInput'
import SidebarButton from 'components/ui/SidebarButton'

const SidebarForm = memo(() => {
    const {isPrivatChats} = useSelector(state => state.sidebar)

    const dispatch = useDispatch()

    const onChange = useCallback(e => {
        const {value} = e.target
        dispatch(setSearchValue(value))
    }, [])
    
    return (
        <div className='flex flex-col gap-2 items-center justify-center h-full w-full px-2'>
            <SearchInput fn={onChange}/>
            <div className='flex justify-center items-center px-4 mb-2 gap-[1px]'>
                <SidebarButton 
                    fn={() => dispatch(handleTypeChats())}
                    isLeft={true}
                    condition={isPrivatChats}
                    text='private chats'
                />
                <SidebarButton 
                    fn={() => dispatch(handleTypeChats())}
                    isLeft={false}
                    condition={!isPrivatChats}
                    text='group chats'
                />
                {/* <button 
                    onClick={() => dispatch(handleTypeChats())}
                    className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-l-full font-semibold w-40 ${isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                >
                    privat chats
                </button>
                <button 
                    onClick={() => dispatch(handleTypeChats())}
                    className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-r-full font-semibold w-40 ${!isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                >
                    group chats
                </button> */}
            </div>
        </div>
    )
})

SidebarForm.displayName = 'SidebarForm';

export default SidebarForm