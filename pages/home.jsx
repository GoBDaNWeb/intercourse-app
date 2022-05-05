import { Howl } from 'howler';
import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {updateUserStatus} from 'utils/Store'
import CreateChat from './../components/Chat/CreateChat';



export default function Home() {
    

    // useEffect(() => {
    //     const callSound = (src) => {
    //         const sound = new Howl({
    //             src,
    //             html5: true
    //         })
    //         sound.play()
    //     }
    // }, []) 

    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        document.addEventListener("visibilitychange", function(){

            if (document.hidden){
                if(user !== null) {
                    updateUserStatus(user.id, 'OFFLINE')
                }
                console.log('Вкладка не активна');
        
            } else {
                if(user !== null) {
                    updateUserStatus(user.id, 'ONLINE')
                }
                console.log('Вкладка активна');    
        
            }
        
        });
    })

    return (
        <div className='flex flex-col w-full h-full items-center justify-center bg-primary gap-2 overflow-hidden'>
            {/* <div className='flex justify-center items-start gap-4 mt-14'>
                <button onClick={() => callSound('/notification.mp3')}>
                    Song
                </button>
            </div> */}
            <CreateChat/>
        </div>
    )
}