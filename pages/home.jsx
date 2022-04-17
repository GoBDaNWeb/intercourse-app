import { Howl } from 'howler';
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

    return (
        <div className='flex flex-col w-full h-full items-center justify-center gap-2'>
            {/* <div className='flex justify-center items-start gap-4 mt-14'>
                <button onClick={() => callSound('/notification.mp3')}>
                    Song
                </button>
            </div> */}
            <CreateChat/>
        </div>
    )
}