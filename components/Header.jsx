import Image from 'next/image';
import {ImExit} from 'react-icons/im'
import UserContext from './../context/UserContext';
import {useContext} from 'react'

export default function Header() {
    const {signOut} = useContext(UserContext)

    return (
        <div className="fixed w-full h-20 bg-[#273345] text-white z-50 px-6">
            <div className='flex justify-between items-center h-full'>
                <div className='flex items-center'>
                    <Image
                        src='/Logo.svg'
                        alt="Logo" 
                        width={47} 
                        height={47} 
                    />
                    <h3 className='mt-2 font-bold text-xl'>
                        Intercourse
                    </h3>
                </div>
                <div 
                    onClick={() => signOut()}
                    className='flex flex-col items-center cursor-pointer'
                >
                    <ImExit className='text-2xl'/>
                    <h5 className='text-sm font-bold'>
                        Sign Out
                    </h5>
                </div>
            </div>
        </div>
    )
}