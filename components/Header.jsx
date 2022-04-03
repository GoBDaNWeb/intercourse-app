import Image from 'next/image';

export default function Header() {
    return (
        <div className="fixed w-full h-20 bg-[#273345] text-white z-50 px-6">
            <div className='flex items-center h-full'>
                <Image
					src='/Logo.svg'
					alt="Logo" 
					width={47} 
					height={47} 
				/>
                <span className='mt-2 font-bold text-xl'>
                    Intercourse
                </span>
            </div>
        </div>
    )
}