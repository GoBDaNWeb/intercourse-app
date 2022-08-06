// * react/next
import {useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch} from 'react-redux'
import {setOpenMenuGroupChatHeader} from 'store/chatSlice'


export function useGroupChatHeader() {
    const dispatch = useDispatch()
    const router = useRouter()
    
    useEffect(() => {
        dispatch(setOpenMenuGroupChatHeader(false))
    }, [router.query.id])
}