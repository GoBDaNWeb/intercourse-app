import Header from './Header';

export default function Layout({children}) {
    return (
        <div className='min-h-screen w-full bg-[#DFDED7] '>
            <Header/>
            {children}
        </div>
    )
}