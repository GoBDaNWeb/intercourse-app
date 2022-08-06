// * react/next
import { useEffect } from 'react'
import {useRouter} from 'next/router'

// * redux 
import {useDispatch} from 'react-redux'
import {setOpenMenuPrivatChatHeader} from 'store/chatSlice'

export function usePrivatChatHeader() {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setOpenMenuPrivatChatHeader(false))
    }, [router.query.id])
}