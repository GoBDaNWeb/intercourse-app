// * react/next 
import {useState} from 'react'
import { useRouter } from 'next/router';

// * redux 
import { useSelector} from 'react-redux'

// * supabase
import { addMessage} from 'supabase/modules/message'

export function useChatFooter() {
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')

    const {user, avatar} = useSelector(state => state.auth)
    const {theme} = useSelector(state => state.theme)

    const router = useRouter()
    const { id: chatId } = router.query

    const callSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play()
    }

    // ** следит за иземениями в value
    const onChange = (e) => {
        const {value} = e.target 
        setValue(value)
    }

    // ** функция добавляет выбранный emoji в value 
    const onEmojiClick = (event, emojiObject) => {
        setValue(value + emojiObject.emoji)
    }

    // ** функция монтирует/размонтирует элемент emojiPicker
    const handlePicker = () => {
        setShowPicker(showPicker = !showPicker)
    }

    // ** функция отправки сообщения 
    const sendMessage = (value) => {
        const authorCondition =  user.user_metadata.name ? user.user_metadata.name : user.user_metadata.username
        const message = {
            message: value,
            user_id: user.id,
            chat_id: chatId,
            author: authorCondition,
            author_avatar: avatar
        }
        addMessage(message)
        callSound('/sendMessage.mp3')
    }

    const sendMessageMouse = () => {
        sendMessage(value)
        setValue('')
    }

    const sendMessageEnter = (e) => {
        if(e.code === 'Enter') {
            sendMessage(value)
            setValue('')
        }
    }

    return {
        models: {
            user,
            theme,
            showPicker,
            value
        },
        commands: {
            onEmojiClick,
            handlePicker,
            sendMessageEnter,
            sendMessageMouse,
            onChange
        }
    }
}