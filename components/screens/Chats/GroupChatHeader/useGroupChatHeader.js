// * react/next
import {useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setOpenMenuGroupChatHeader} from 'store/chatSlice'


export function useGroupChatHeader() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {groupChatData} = useSelector(state => state.chat)

    useEffect(() => {
        dispatch(setOpenMenuGroupChatHeader(false))
    }, [router.query.id])

    return {
        models: {
            groupChatData
        }
    }
}