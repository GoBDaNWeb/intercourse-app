import Header from './Header';
import { useContext } from 'react';
import UserContext from './../context/UserContext';
import { useRouter } from 'next/router';

export default function Layout({children}) {
    const {user} = useContext(UserContext)
    const router = useRouter()

    return (
        <div className='min-h-screen w-full bg-[#DFDED7] '>
            {
               router.pathname === '/home' && <Header/>
            }
            {children}
        </div>
    )
}