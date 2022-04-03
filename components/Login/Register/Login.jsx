export default function Login({handleRegister}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center  text-3xl font-bold text-gray-100 mb-6'>Login in to your account</h2>
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
                <button 
                    className='bg-white w-36 h-10 rounded-2xl font-bold'
                >
                    Sign In
                </button>
            </div>
            <div className='flex gap-2'>
                <h3 
                    onClick={() => handleRegister()}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Dont have account?
                </h3>
                |
                <h3
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Forgot password?
                </h3>
            </div>
        </div>
    )
}