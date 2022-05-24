// * react/next
import {useEffect} from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

// * redux
import { useSelector, useDispatch } from 'react-redux';
import {handleOpenSidebar} from 'store/sidebarSlice';

// * supabase
import {updateUserStatus} from 'utils/Store'

// * components
import CreateChat from 'components/CreateChat'


export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}

export default function Main() {
    const {user} = useSelector(state => state.auth)
    const {isOpen} = useSelector(state => state.sidebar)

    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener("visibilitychange", function(){

            if (document.hidden){
                if(user !== null) {
                    updateUserStatus(user.id, 'OFFLINE')
                }
                console.log('Вкладка не активна');
        
            } else {
                if(user !== null) {
                    updateUserStatus(user.id, 'ONLINE')
                }
                console.log('Вкладка активна');    
        
            }
        
        });
    })

    return (
        <div id='main' className='z-50 border-l-2 border-solid border-gray-200 dark:border-gray-800 transition-all duration-[0.4s] fixed xl:relative top-0 left-0 bottom-0 right-0 flex w-full h-full items-center justify-center bg-primary gap-2 overflow-hidden'>
            <div 
                onClick={() => dispatch(handleOpenSidebar())}
                className='z-50 bg-secondary absolute rounded-full left-4 top-3 w-12 h-12 flex items-center justify-center xl:hidden'
            >
                <div className={`w-6 h-[2px] bg-accent after:w-6 after:h-[2px] after:bg-accent after:absolute after:top-4 before:w-4 before:h-[2px] before:bg-accent before:absolute before:bottom-4 ${isOpen ? 'h-0 before:w-6 before:rotate-[45deg] before:bottom-[23px] after:rotate-[-45deg] after:top-[23px] transition-all' : ''}`}>
                </div>
            </div>
            <CreateChat/>
        </div>
    )
}