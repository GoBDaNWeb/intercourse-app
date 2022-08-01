// * react/next
import { useEffect, useState } from 'react'

// * supabase
import {fetchCurrentUser} from 'utils/Store'


export default function TheirAvatar({ avatar, username, size, text_size, children }) {
    return (
            <div 
                className='relative flex justify-center text-8xl font-bold text-accent items-center grad-1 rounded-full group'
                style={{ height: size, width: size }}
            >
                {
                    avatar 
                    ? (
                        <img
                            src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/avatars/${avatar}`}
                            className="rounded-full"
                            style={{ height: size, width: size }}
                        />
                    ) : (
                        <div className={`text-white text-${text_size}`}>
                            { username && username[0].toUpperCase()}
                        </div>
                    )
                }
                {children}
            </div>
        )
}