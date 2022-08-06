// * react/next
import { useEffect } from 'react'
import {useRouter} from 'next/router'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {setOpenMenuPrivatChatHeader} from 'store/chatSlice'

export function usePrivatChatHeader() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {privatChatData} = useSelector(state => state.chat)

    useEffect(() => {
        dispatch(setOpenMenuPrivatChatHeader(false))
    }, [router.query.id])

    return {
        models: {
            privatChatData
        }
    }
}