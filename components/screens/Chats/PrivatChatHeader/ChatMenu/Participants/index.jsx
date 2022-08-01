// * react/next
import { useState, useEffect, useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * redux 
import {useSelector} from 'react-redux'

// * supabase
import {fetchCurrentUser} from 'utils/Store'

// * components
import Creator from './Creator'
import Interlocutor from './Interlocutor'

export default function Participants() {  
    return (
        <div className='flex justify-between w-full px-10'>
            <div className='flex flex-col text-primary gap-4'>
                <h4>Creator</h4>
                <Creator/>
            </div>
            <div className='flex flex-col items-end text-primary gap-4'>
                <h4>interlocutor</h4>
                <Interlocutor/>
            </div>
        </div>
    )
}