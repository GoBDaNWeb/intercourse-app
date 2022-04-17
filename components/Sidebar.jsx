import {AiOutlineSearch} from 'react-icons/ai'
import Image from 'next/image'
import ChatContext from './../context/ChatContext';
import {useContext} from 'react'

export default function Sidebar({children}) {
    const {handleTypeChats, isPersonalChats, setSearchValue} = useContext(ChatContext)

    const onChange = (e) => {
        const {value} = e.target
        setSearchValue(value)
    }

    return (
        <div className="w-[35%] flex flex-col items-center h-full bg-[#537072] shadow-custom-gor z-50">
            <div className='flex w-full items-center h-14 bg-[#2C4A52] rounded-br-[30px] shadow-custom px-4'>
                <div className='flex items-center'>
                    <Image
                        src='/Logo.svg'
                        alt="Logo" 
                        width={47} 
                        height={47} 
                    />
                    <h3 className='mt-2 font-bold text-xl text-white'>
                        Intercourse
                    </h3>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center w-[90%]'>
                <div className='flex items-center  rounded-full h-14 bg-[#2C4A52] bg-opacity-80 text-gray-200 px-4 mt-8'>
                    <div className=' text-4xl'>
                        <AiOutlineSearch/>
                    </div>
                    <input 
                        onChange={(e) => onChange(e)}
                        className="w-full bg-transparent outline-none text-xl font-semibold px-2 text-gray-300"
                        type="text" 
                        placeholder='Search'
                    />
                </div>
                <div className='flex justify-center items-center gap-[1px]'>
                    <button 
                        onClick={() => handleTypeChats()}
                        className={`bg-[#2C4A52] bg-opacity-80 py-2 rounded-l-full  text-white w-40 ${isPersonalChats ? 'bg-[#1e3035] pointer-events-none' : ''}`}
                    >
                        personal chats
                    </button>
                    <button 
                        onClick={() => handleTypeChats()}
                        className={`bg-[#2C4A52] bg-opacity-80 py-2 rounded-r-full text-white w-40 ${!isPersonalChats ? 'bg-[#1e3035] pointer-events-none' : ''}`}
                    >
                        group chats
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}