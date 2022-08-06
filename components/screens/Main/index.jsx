// * react/next
import Head from "next/head";

// * hooks
import {useMain} from './useMain'

// * components
import CreateChat from './CreateChat'
import Burger from 'components/shared/Burger'

export default function Main() {
    useMain()
    
    return (
        <>
            <Head>
                <title>
                    Main
                </title>
            </Head>
            <div id='main' className='z-50 border-l-2 border-solid border-gray-200 dark:border-gray-800 transition-all duration-[0.4s] fixed xl:relative top-0 left-0 bottom-0 right-0 flex w-full h-full items-center justify-center bg-primary gap-2 overflow-hidden'> 
                <Burger/> 
                <CreateChat/>
            </div>
        </>
    )
}