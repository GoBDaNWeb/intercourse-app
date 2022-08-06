// * react/next
import {memo} from 'react'

// * components
import SidebarForm from './SidebarForm';
import SidebarProfile from './SidebarProfile';
import Logo from './Logo';

export default memo(function Sidebar({children}) {
    return (
        <div id='sidebar' className={`xl:w-[35%] sm:w-[26.5rem] w-full transition-all duration-[0.4s] max-w-[700px] fixed xl:relative top-0 left-0 bottom-0 right-0 flex flex-col items-between justify-between h-full bg-secondary z-50 overflow-hidden`}>
            <div className='h-full flex flex-col overflow-hidden'>
                <div className='flex flex-col w-full items-center px-4 pt-4 border-b-2 border-solid border-gray-200 dark:border-gray-800'>
                    <Logo/>
                    <SidebarForm/>
                </div>
                {children}
            </div>
            <SidebarProfile/>
        </div>
    )
})