// * react/next
import { useCreateChat } from './useCreateChat';

// * components
import CreateChatBanner from './CreateChatBanner';
import CreateChatPanel from './CreateChatPanel';

export default function CreateChat() {
    const {
        models: {
            createChat
        },
        commands: {
            createChatWindow
        }
    } = useCreateChat()

    return (
        <div className='flex items-center justify-center w-full'>
            {
                createChat 
                ? <CreateChatPanel createChatWindow={createChatWindow}/>
                : <CreateChatBanner createChatWindow={createChatWindow}/>
            }
        </div>
    )
}