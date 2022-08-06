// * components
import Creator from './Creator'
import Interlocutor from './Interlocutor'
import {useParticipants} from './useParticipants'
export default function Participants() {  
    const {
        models: {
            privatChatData,
        }
    } = useParticipants()

    return (
        <>
            {
                privatChatData
                && (
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
        </>
        
    )
}