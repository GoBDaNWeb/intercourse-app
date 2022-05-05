import {AiFillSetting} from 'react-icons/ai'
import {MdOutlineKeyboardArrowUp} from 'react-icons/md'
import {ImExit} from 'react-icons/im'
import { useState, useContext } from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import {signOut} from '../store/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserStatus} from '../utils/Store'

export default function Menu() {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    // ** делает элемент menu активным
    const handle = () => {
        setIsActive(!isActive)
    }

    const signOutFunc = () => {
        updateUserStatus(user.id, 'ONLINE', 'OFFLINE')
        dispatch(signOut())
        router.push('/')
    }

    const variant = {
        open: {
            height: '24rem',
            transition: {
                duration: 0.2,
                type: 'spring',
                damping: 25,
                stiffness: 400,
            },
        },
        close: {
            height: '3rem',
            transition: {
                duration: 0.2,
                type: 'spring',
                damping: 35,
                stiffness: 400,
            },
        }
    }

    return (
        <div className='z-50'>
            {/* <div className="absolute flex flex-col gap-2 right-4 bottom-4 z-50">
                <motion.div 
                    className={`flex items-end justify-center bg-[#2C4A52] transition w-12 rounded-[20px]`}
                    variants={variant}
                    animate={isActive ? 'open' : 'close'}
                >
                    <button 
                        onClick={handle}
                        className='text-5xl text-white rounded-full'
                    >
                        <MdOutlineKeyboardArrowUp className='rounded-full'/>
                    </button>
                </motion.div>
                <div className="flex flex-col items-center justify-between bg-[#2C4A52] h-32 w-12 rounded-[20px] text-white py-4 shadow-custom">
                    <button className='text-4xl'>
                        <AiFillSetting/>
                    </button>
                    <button 
                        onClick={() => signOutFunc()}
                        className='text-3xl pl-2'
                    >
                        <ImExit/>
                    </button>
                </div>
            </div> */}
        </div>
    )
}