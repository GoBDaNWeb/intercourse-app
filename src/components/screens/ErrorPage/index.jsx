// * react/next
import Head from "next/head";

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>
                    404
                </title>
            </Head>
            <div className='w-full h-full bg-primary flex items-center justify-center'>
                <h3 className='text-primary text-center text-3xl font-semibold'>
                    ooops.... <br/>
                    it looks like you went to the wrong place
                </h3>
            </div>
        </>
    )
}

export default Custom404