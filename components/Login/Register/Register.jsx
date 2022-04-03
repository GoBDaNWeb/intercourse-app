export default function Register({handleRegister}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center  text-3xl font-bold text-gray-100 mb-6'>create new account</h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <input 
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your Email'
                />
                <input 
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="password" 
                    placeholder='Enter your password'
                />
                <input 
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="password"
                    placeholder='Confirm your password'
                />
                <button className='bg-white w-36 h-10 rounded-2xl font-bold'>
                    Sign Up
                </button>
            </div>
            <div>
                <h3 
                    onClick={() => handleRegister()}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Dont have account?
                </h3>
            </div>
        </div>
    )
}