import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function UserSelectCard({user, selectedUsers, selectUser}) {


    return (
        <motion.div 
            onClick={() => selectUser(user)}
            className={`flex-col bg-black bg-opacity-50 font-semibold w-full text-gray-300 min-h-14 rounded-[20px] flex flex-wrap justify-center items-center px-2 py-2 gap-1 cursor-pointer hover:bg-opacity-70 transition ${selectedUsers.includes(user) ? 'bg-opacity-100 text-gray-100' : ''}`}
        >
            <h5>
                {user.username || user.username_google}
            </h5>
            <h6 className='text-sm font-light'>
                ({user.email})
            </h6>
        </motion.div>
    )
}