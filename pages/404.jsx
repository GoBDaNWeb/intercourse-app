// * react/next
import {useRouter} from 'next/router'

// * icons
import {BsArrowLeftShort} from 'react-icons/bs'

export default function Custom404() {
    const router = useRouter()

    return (
        <div className='w-full h-full bg-primary flex items-center justify-center'>
            <div className='flex flex-col items-center gap-5'>
                <h3 className='text-primary text-center text-3xl font-semibold'>
                    ooops.... <br/>
                    it looks like you went to the wrong place
                </h3>
                <button
                    onClick={() => router.back()}
                    className='flex items-center gap-1 text-primary text-lg'
                >
                   <BsArrowLeftShort/> go back
                </button>
            </div>
        </div>
    )
}